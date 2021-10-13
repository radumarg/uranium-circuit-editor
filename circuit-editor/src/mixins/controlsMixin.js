import { 
  getDuplicateValues,
} from "../store/modules/javaScriptUtils";

import { 
  getUserInterfaceSetting
} from "../store/modules/applicationWideReusableUnits.js";

import {
  isDefined,
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
      if (this.$data.controlsNew.includes(this.$data.qbitNew)){
        alert("Control and target qubits must differ!");
      } else if (isDefined(this.$data.qbit2New) && this.$data.controlsNew.includes(this.$data.qbit2New)){
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
          while (lastControl == this.$data.qbitNew 
            || lastControl == this.$data.qbit2New) {
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
      while (lastControl == this.$data.qbitNew 
          || lastControl == this.$data.qbit2New) {
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
      if (this.$data.qbitNew > 0 && Math.min(...this.controlsNew) > 0){
        this.$data.qbitNew -= 1;
        if (isDefined(this.$data.qbit2New)) this.$data.qbit2New -= 1;
        for (let i = 0; i < this.controlsNew.length; i++){
          this.controlsNew[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached.")
      }
    },
    moveGateOneQubitDownwards(){
      this.$data.qbitNew += 1;
      if (isDefined(this.$data.qbit2New)) this.$data.qbit2New += 1;
      for (let i = 0; i < this.controlsNew.length; i++){
        this.controlsNew[i] += 1;
      }
    },
    alignControlsUpwardsFromTargetQubit(){
      let startUp = this.$data.qbitNew;
      let startDown = this.$data.qbitNew;
      if (isDefined(this.$data.qbit2New)){
        startUp = Math.min(startUp, this.$data.qbit2New);
        startDown = Math.max(startDown, this.$data.qbit2New);
      }
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
      let start = this.$data.qbitNew;
      if (isDefined(this.$data.qbit2New)){
        start = Math.max(start, this.$data.qbit2New)
      }
      for (let i = 0; i < this.controlsNew.length; i++){
        this.controlsNew[i] = start + i + 1;
      }
      this.$forceUpdate();
    },
  }
}

