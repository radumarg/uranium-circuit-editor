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
    hideEditControlsModal: function() {
      this.$refs['edit-controls-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleEditControls: function(){
      this.editControlsModalCloseIsHovered = false;
      this.editControlsModalSaveIsHovered = false;
      this.editControlsPlusIsHovered = false;
      this.editControlsMinusIsHovered = false;
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
    removeControl(){

    },
    addControl(){
      
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
    emptySlotsInEditControlsModal(){
      let visibleControls = 7;
      if (this.controlsNew.length > 7) visibleControls = 11;
      return Math.max(0, visibleControls - this.controlsNew.length);
    },
    numberOfColumnsInEditControlsModal(){
      let visibleControls = 7;
      if (this.controlsNew.length > 7) visibleControls = 11;
      return 2 + Math.max(this.controlsNew.length, visibleControls);
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
  }
}

