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
    stubImageSrcPopup: function() {
      let controlstate1 = 1;
      if (this.name) {
        if (Vue.$cookies.get('colored-gates') === 'true'){
          return require("../assets/colored-gates/" + this.name + "-stub-" + controlstate1 + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + "-stub-" + controlstate1 + ".svg");
        }
      } else {
        return String.empty;
      }
    },
  },
  methods: {
    editControlsModalSize(){
      if (this.controls.length <= 6){
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
  }
}

