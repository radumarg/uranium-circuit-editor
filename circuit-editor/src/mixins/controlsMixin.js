export const controlsMixin = {
  data() {
    return {
      editControlsModalCloseIsHovered: false,
      editControlsModalSaveIsHovered:  false,
    }
  },
  methods: {
    hideEditControlsModal: function() {
      this.$refs['edit-controls-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleEditControls: function(){
      this.editControlsModalCloseIsHovered = false;
      this.editControlsModalSaveIsHovered = false;
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
  }
}

