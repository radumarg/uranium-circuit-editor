import { 
  getDuplicateValues,
  arraysHaveElementsInCommon,
} from "../store/modules/javaScriptUtils";

import { 
  getUserInterfaceSetting
} from "../store/modules/applicationWideReusableUnits.js";

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
      ],
    }
  },
  computed: {
    gateImageSrcPopup: function() {
      if (this.name) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          return require("../assets/colored-gates/" + this.name + "-1.svg");
        } else {
          return require("../assets/blue-gates/" + this.name + "-1.svg");
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
      return `overflow-x:scroll; max-width: ${maxWidth}px;`
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
          return require("../assets/colored-gates/" + this.name + "-stub-" + this.controlstatesNew[controlIndex] + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + "-stub-" + this.controlstatesNew[controlIndex] + ".svg");
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
        if (this.numberOfControls > 0){
          this.controlsNew = this.controlsNew.slice(0, this.numberOfControls);
          this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls);
        } else {
          this.numberOfControls = 1;
          this.controlsNew = [this.controlsNew[0]];
          this.controlstatesNew = [this.controlstatesNew[0]];
        }
      } else {
        let lastControl = this.controlsNew[this.controlsNew.length - 1];
        for (let i = 0; i < this.numberOfControls - this.controlsNew.length; i++){
          lastControl++;
          while (this.$data.targetsNew.includes(lastControl)) {
            lastControl++;
          }
          this.controlsNew.push(lastControl);
          this.controlstatesNew.push('1');
        }
      }
      this.$forceUpdate();
    },
    addControl(){
      this.numberOfControls += 1;
      let lastControl = this.controlsNew[this.controlsNew.length - 1] + 1;
      while (this.$data.targetsNew.includes(lastControl)) {
        lastControl++;
      }
      this.controlsNew.push(lastControl);
      this.controlstatesNew.push('1');
    },
    removeControl(){ 
      if (this.numberOfControls > 1){
        this.numberOfControls -= 1;
        this.controlsNew = this.controlsNew.slice(0, this.numberOfControls);
        this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls);
      }
    },
    moveGateOneQubitUpwards(){
      if (Math.min(...this.$data.targetsNew) > 0 && Math.min(...this.$data.controlsNew) > 0){
        for (let i = 0; i < this.$data.targetsNew.length; i++){
          this.targetsNew[i] -= 1;
        }
        for (let i = 0; i < this.$data.controlsNew.length; i++){
          this.controlsNew[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached.")
      }
      this.$forceUpdate();
    },
    moveGateOneQubitDownwards(){
      for (let i = 0; i < this.targetsNew.length; i++){
        this.targetsNew[i] += 1;
      }
      for (let i = 0; i < this.controlsNew.length; i++){
        this.controlsNew[i] += 1;
      }
      this.$forceUpdate();
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

