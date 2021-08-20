import Vue from 'vue';

export const controlsMixin = {
  props: {
    'control': Number,
    'controls': Array,
    'controlstate': Number,
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
      controlsNew: this.controls,
      controlstatesNew: this.controlstates,
      numberOfControls: this.controls.length,
    }
  },
  computed: {
    gateImageSrcPopup: function() {
      if (this.name) {
        if (Vue.$cookies.get('colored-gates') === 'true'){
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
      // let promise = this.duplicateGate({
      //   'step': this.step,
      //   'qbit': this.qbit,
      //   'name': this.name, 
      // });
      // promise.then(
      //   // eslint-disable-next-line no-unused-vars
      //   result => {}, 
      //   // eslint-disable-next-line no-unused-vars
      //   error => {},
      // );
      this.$refs['edit-controls-modal-dialog'].hide();
    },
    handleControlsValidation(){
      alert("hei");
    },
    stubImageSrcPopup: function(controlIndex) {
      if (this.name) {
        if (Vue.$cookies.get('colored-gates') === 'true'){
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
          this.controlsNew.push(lastControl);
          this.controlstatesNew.push(1);
        }
      }
      this.$forceUpdate();
    },
    addControl(){
      this.numberOfControls += 1;
      let lastControl = this.controlsNew[this.controlsNew.length - 1] + 1;
      this.controlsNew.push(lastControl);
      this.controlstatesNew.push(1);
    },
    removeControl(){ 
      if (this.numberOfControls > 1){
        this.numberOfControls -= 1;
        this.controlsNew = this.controlsNew.slice(0, this.numberOfControls);
        this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls);
      }
    },
    moveGateOneQubitUpwards(){
    },
    moveGateOneQubitDownwards(){
    },
    alignControlsUpwardsFromTargetQubit(){
    },
    alignControlsDownardsFromTargetQubit(){
    },
  }
}

