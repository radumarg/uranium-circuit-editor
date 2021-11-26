import { 
  getDuplicateValues,
  arraysHaveElementsInCommon,
} from "../store/modules/javaScriptUtils";

import { 
  getUserInterfaceSetting
} from "../store/modules/applicationWideReusableUnits.js";

import { 
  seatIsTaken,
  qbitIsTaken,
  seatsAreTaken
} from "../store/modules/gatesTable.js";

import { 
  isDefined 
} from "../store/modules/editorHelper.js";

export const controlsMixin = {
  props: {
    'controls': Array,
    'controlstates': Array,
  },
  data() {
    return {
      editControlsModalCloseIsHovered: false,
      editControlsModalSaveIsHovered:  false,
      editControlsPlusIsHovered:  false,
      editControlsMinusIsHovered:  false,
      moveGateOneQubitUpwardsIsHovered: false,
      moveGateOneQubitDownwardsIsHovered: false,
      alignControlsUpwardsIsHovered: false,
      alignControlsDownwardsIsHovered: false,
      controlsNew: [...this.controls],
      controlstatesNew: [...this.controlstates],
      numberOfControls: this.controls.length,
      options: [
        { value: '1', text: '|1⟩' },
        { value: '0', text: '|0⟩' },
        { value: '+', text: '|+⟩' },
        { value: '-', text: '|-⟩' },
        { value: '+i', text: '|+i⟩' },
        { value: '-i', text: '|-i⟩' },
      ],
    }
  },
  computed: {
    gateImageSrcPopup: function() {
      if (this.name) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          return require("../assets/colored-gates/" + this.name + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + ".svg");
        }
      } else {
        return String.empty;
      }
    },
  },
  methods: {
    editControlsModalSize(){
      if (this.controlsNew.length <= 7){
        return "lg";
      } else {
        return "xl";
      }
    },
    getEmbededTableStyle(){
      let maxWidth = (this.controlsNew.length > 7) ? 880 : 600;
      return `overflow-x:scroll; max-width: ${maxWidth}px; min-height: 195px; max-height: 195px;`
    },
    getEmbedTableCellStyle(){
      let width = (this.controlsNew.length > 7) ? 880 : 560;
      return `width: ${width}px; min-width: ${width}px; max-width: ${width}px`;
    },
    emptySlotsInEditControlsModal(){
      let visibleControls = (this.controlsNew.length > 7) ? 11 : 7;
      return Math.max(0, visibleControls - this.controlsNew.length);
    },
    numberOfColumnsInEditControlsModal(){
      let visibleControls = (this.controlsNew.length > 7) ? 11 : 7;
      return 2 + Math.max(this.controlsNew.length, visibleControls);
    },
    hideEditControlsModal: function() {
      this.$refs['edit-controls-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleEditControls: function(){
      this.editControlsModalCloseIsHovered = false;
      this.editControlsModalSaveIsHovered = false;
      this.editControlsPlusIsHovered = false;
      this.editControlsMinusIsHovered = false;
      this.moveGateOneQubitUpwardsIsHovered = false;
      this.moveGateOneQubitDownwardsIsHovered = false;
      this.alignControlsUpwardsIsHovered = false;
      this.alignControlsDownwardsIsHovered = false;
      this.$refs['initial-modal-dialog'].hide();
      this.$refs['edit-controls-modal-dialog'].show();
    },
    handleEditControlsHover(hovered) {
      this.editControlsIsHovered = hovered;
    },
    handleEditControlsModalCloseHover(hovered) {
      this.editControlsModalCloseIsHovered = hovered;
    },
    handleEditControlsModalSaveHover(hovered) {
      this.editControlsModalSaveIsHovered = hovered;
    },
    handleEditControlsPlusHover(hovered) {
      this.editControlsPlusIsHovered = hovered;
    },
    handleEditControlsMinusHover(hovered) {
      this.editControlsMinusIsHovered = hovered;
    },
    handleMoveGateOneQubitUpwardsHover(hovered) {
      this.moveGateOneQubitUpwardsIsHovered = hovered;
    },
    handleMoveGateOneQubitDownwardsHover(hovered) {
      this.moveGateOneQubitDownwardsIsHovered = hovered;
    },
    handleAlignControlsUpwardsHover(hovered) {
      this.alignControlsUpwardsIsHovered = hovered;
    },
    handleAlignControlsDownwardsHover(hovered) {
      this.alignControlsDownwardsIsHovered = hovered;
    },
    handleEditControlsModalSave: function(){
      let duplicateControls = getDuplicateValues(this.controlsNew);
      if (arraysHaveElementsInCommon(this.$data.controlsNew, this.$data.targetsNew)){
        alert("Control and target qubits must differ!");
      } else if (duplicateControls.length > 0){
        alert("Duplicate controls: " + JSON.stringify(duplicateControls));
      } else {
        this.handleSave();
        this.$refs['edit-controls-modal-dialog'].hide();
      }
    },
    stubImageSrcPopup: function(controlIndex) {
      if (this.name) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          return require("../assets/colored-gates/ctrl-" + this.name + "-stub-" + this.controlstatesNew[controlIndex] + ".svg");
        } else {
          return require("../assets/blue-gates/ctrl-" + this.name + "-stub-" + this.controlstatesNew[controlIndex] + ".svg");
        }
      } else {
        return String.empty;
      }
    },
    onControlStateChange(){ 
      // need to refresh control state icon image
      this.$forceUpdate();
    },
    onNumberControlsChange(){ 
      if (this.numberOfControls < this.controlsNew.length){
        this.controlsNew = this.controlsNew.slice(0, this.numberOfControls);
        this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls);
      } else {
        this.addControl();
      }
      this.$forceUpdate();
    },
    addControl(){
      let newControl = null;
      let minQubit = Math.min(...this.targetsNew, ...this.controlsNew);
      let maxQubit = Math.max(...this.targetsNew, ...this.controlsNew);
      
      if (minQubit > 0 && !seatIsTaken(this.$store.state.circuitEditorModule, minQubit - 1, this.step)){
        newControl = minQubit - 1;
      } else if (!seatIsTaken(this.$store.state.circuitEditorModule, maxQubit + 1, this.step)){
        newControl = maxQubit + 1;
      } else {
        let qbit = minQubit + 1;
        while (qbit < maxQubit) {
          if (!qbitIsTaken(this.$store.state.circuitEditorModule, qbit, this.step)){
            newControl = qbit;
            break;
          }
          qbit += 1;
        }
      }

      if (isDefined(newControl)){
        this.controlsNew.push(newControl);
        this.controlstatesNew.push('1');
        this.numberOfControls = this.controlsNew.length;
      } else {
        alert("No empty seat left to add new control!");
      }
    },
    removeControl(){ 
      if (this.numberOfControls >= 1){
        this.controlsNew = this.controlsNew.slice(0, this.numberOfControls - 1);
        this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls - 1);
        this.numberOfControls = this.controlsNew.length;
      }
    },
    moveGateOneQubitUpwards(){
      let proposedTargets = [...this.targetsNew];
      let proposedControls = [...this.controlsNew];

      if (Math.min(...proposedTargets) > 0 && Math.min(...proposedControls) > 0){
        for (let i = 0; i < proposedTargets.length; i++){
          proposedTargets[i] -= 1;
        }
        for (let i = 0; i < proposedControls.length; i++){
          proposedControls[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached!");
        return;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, this.step, existingQbits)){
        alert("There are no free seats to move control upwards!");
      } else {
        this.targetsNew = proposedTargets;
        this.controlsNew = proposedControls;
        this.$forceUpdate(); 
      }
    },
    moveGateOneQubitDownwards(){
      let proposedTargets = [...this.targetsNew];
      let proposedControls = [...this.controlsNew];

      for (let i = 0; i < proposedTargets.length; i++){
        proposedTargets[i] += 1;
      }
      for (let i = 0; i < proposedControls.length; i++){
        proposedControls[i] += 1;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, this.step, existingQbits)){
        alert("There are no free seats to move control downwards!");
      } else {
        this.targetsNew = proposedTargets;
        this.controlsNew = proposedControls;
        this.$forceUpdate(); 
      }
    },
    alignControlsUpwardsFromTargetQubit(){
      let startUp = Math.min(...this.$data.targetsNew);
      let startDown = Math.max(...this.$data.targetsNew);
      for (let i = 0; i < this.controlsNew.length; i++){
        if (startUp - i >= 1){
          this.controlsNew[i] = startUp - i - 1;
        } else {
          this.controlsNew[i] = startDown + i - startUp + 1;
        }
      }
      this.$forceUpdate();
    },
    alignControlsDownwardsFromTargetQubit(){
      let start = Math.max(...this.$data.targetsNew);
      for (let i = 0; i < this.controlsNew.length; i++){
        this.controlsNew[i] = start + i + 1;
      }
      this.$forceUpdate();
    },
  }
}

