<template>
  <div v-on:click="handleClick">

    <img :src="require('../assets/barrier.svg')" :id="id" title="barrier" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="initial-modal-dialog" size="sm" centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleTrashHover">
              <b-icon v-if="trashIsHovered" v-on:click="handleDeleteGate()" icon="trash" title="Delete gate" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="trash" v-on:click="handleDeleteGate()" style="color: #7952b3;" font-scale="1.4"></b-icon>
              </div>
          </td>
          <td colspan="2">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleCloseHover">
              <b-icon v-if="closeIsHovered" title="Close dialog" v-on:click="hideModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td colspan="2" style="padding: 10px;">
            <img :src="require('../assets/barrier.svg')" style="width:120px;height:120px;" />
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td></td>
          <td title="Target qubit" width="100px" style="padding: 5px;">Step:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="stepNew" placeholder="step" type="number" id="step-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
          </td>
          <td colspan="2">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSave()" icon="check" title="Save changes" style="color: #7952b3;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSave()" icon="check" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>
    </b-modal>

  </div>
</template>


<script>
import { mapActions } from 'vuex';
import { createDragImageGhost, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
export default {
  name: "Barrier",
  props: {
    'step' : Number,
    'name': String,
    'id': String,
  },
  data() {
    return {
      trashIsHovered: false,
      closeIsHovered: false,
      saveIsHovered:  false,
      stepNew: this.step,
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['repositionBarrierInCircuit', 'removeBarrierFromCircuitByUser']),
    handleClick: function () {
    if (window.currKey == 'd' || window.currKey == 'D') {
        this.removeBarrierFromCircuit({'step': this.step});
      } else {
        this.showModal();
      }
    },
    showModal: function() {
      this.trashIsHovered = false;
      this.closeIsHovered = false;
      this.saveIsHovered = false;
      this.$refs['initial-modal-dialog'].show();
    },
    hideModal: function() {
      this.$refs['initial-modal-dialog'].hide();
    },
    handleTrashHover(hovered) {
      this.trashIsHovered = hovered;
    },
    handleCloseHover(hovered) {
      this.closeIsHovered = hovered;
    },
    handleSaveHover(hovered) {
      this.saveIsHovered = hovered;
    },
    handleSave: function(){
      if (!Number.isInteger(this.$data.stepNew)){
        alert("Please enter an integer number for the new step!");
        return;
      }
      let stepOld = this.step;
      let promise = this.repositionBarrierInCircuit({
        'name': 'barrier',
        'originalStep': this.step,
        'step': this.$data.stepNew,
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.stepNew = stepOld;
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleDeleteGate: function(){
      this.removeBarrierFromCircuitByUser({'step': this.step});
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData('gateName', 'barrier');
      event.dataTransfer.setData('drag-origin', 'barrier');
      event.dataTransfer.setData('originalStep', this.step);
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById('dragged-gate-ghost');
      document.body.removeChild(dragImageGhost);
    },
  },
}
</script>

<style scoped>
table {
  text-align: center;
  table-layout: fixed;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
th,
td {
  padding: 1px;
}
.td-2nd-modal {
  padding: 5px;
}
.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

img {
  display: inline-block;
}

</style>