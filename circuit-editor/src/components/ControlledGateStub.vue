<template>
  <div v-on:click="handleClick">
    
    <img :src="gateImageSource" :id="id" @dragend="dragEnd" @dragstart="dragStart" alt="Controlled Gates Stubs" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  
    <b-modal ref="modal-dialog" size="sm"  centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleTrashHover">
              <b-icon v-if="trashIsHovered" v-on:click="handleDeleteControl()" icon="trash" v-b-tooltip.hover title="Delete gate" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="trash" v-on:click="handleDeleteControl()" style="color: #7952b3;" font-scale="1.4"></b-icon>
              </div>
          </td>
          <td colspan="2"></td>
          <td class="no-resize-cell">
            <div v-b-hover="handleCloseHover">
              <b-icon v-if="closeIsHovered" v-on:click="hideModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2" style="padding: 25px;">
            <div class="d-flex justify-content-center align-items-center">
              <img :src="stubImageSrcPopup()" style="width:30px; height:auto;" />
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Target qubit" style="padding: 5px;">Control state:</td>
          <td style="padding: 5px;">
            <b-form-select  @keyup.enter.native="handleSave()" v-model="controlstatesNew" @change="onControlStateChange()"  placeholder="controlstate" :options="options" id="controlstate-new" style="min-width: 72px; max-width: 72px;"></b-form-select>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Target qubit" style="padding: 5px;">Control qubit:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model="controlNew" placeholder="qbit" type="number" id="control-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4" style="padding: 10px;"></td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSave()" icon="check" v-b-tooltip.hover title="Save changes" style="color: #7952b3;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSave()" icon="check" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>

    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue';
import { createDragImageGhost, hideTooltips } from "../store/modules/utils.js";
import { handleSelectEvent } from "../store/modules/editorHelper.js";
export default {
  name: "ControlledGateStub",
  props: {
    'step' : Number, 
    'qbit': Number,
    'qbit2': Number,
    'qrow': Number,
    'title': String,
    'name': String,
    'gate': String,
    'control': Number,
    'controlstate': Number,
    'control2': Number,
    'controlstate2': Number,
    'theta': Number,
    'phi': Number,
    'lambda': Number,
    'root': String,
    'id': String,
  },
  data() {
    return {
      trashIsHovered: false,
      closeIsHovered: false,
      saveIsHovered:  false,
      controlNew: this.control,
      controlstatesNew: this.controlstate,
      options: [
        { value: 1, text: '|1⟩' },
        { value: 0, text: '|0⟩' },
      ],
    }
  },
  computed: {
    gateImageSource: function() {
      if (Vue.$cookies.get('colored-gates') === 'true'){
        return require("../assets/colored-gates/" + this.name + ".svg");
      } else {
        return require("../assets/blue-gates/" + this.name + ".svg");
      }
    },
  },
  methods: {
    showModal: function() {
      this.trashIsHovered = false;
      this.closeIsHovered = false;
      this.saveIsHovered = false;
      this.$refs['modal-dialog'].show();
    },
    hideModal: function() {
      this.$refs['modal-dialog'].hide();
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
    handleSave() {
    },
    handleDeleteControl: function(){
      
    },
    onControlStateChange(){ 
      // need to refresh control state icon image
      this.$forceUpdate();
    },
    stubImageSrcPopup: function() {
      return require("../assets/colored-gates/ctrl-s-stub-1.svg");
      // if (this.name) {
      //   if (Vue.$cookies.get('colored-gates') === 'true'){
      //     return require("../assets/colored-gates/" + this.name + "-stub-" + this.controlstatesNew + ".svg");
      //   } else {
      //     return require("../assets/blue-gates/" + this.name + "-stub-" + this.controlstatesNew + ".svg");
      //   }
      // } else {
      //   return String.empty;
      // }
    },
    handleClick: function (event) {
      if (event.ctrlKey) {
        this.selectImage();
      }  else {
        this.showModal();
      }
    },
    selectImage: function() {
      handleSelectEvent(this.qbit, this.step);
    },
    dragStart: function(event) {
      hideTooltips();
      event.dataTransfer.setData("drag-origin", "stub");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("gateName", this.gate);
      event.dataTransfer.setData("originalQbit", this.qbit);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControl", this.control);
      event.dataTransfer.setData("controlstate", this.controlstate);
      if (this.qbit2 != null){
        event.dataTransfer.setData("originalQbit2", this.qbit2);
      }
      if (this.control2 != null){
        event.dataTransfer.setData("originalControl2", this.control2);
      }
      if (this.controlstate2 != null){
        event.dataTransfer.setData("controlstate2", this.controlstate2);
      }
      if (!isNaN(this.theta) && this.theta != null) {
        event.dataTransfer.setData("theta", this.theta);
      }
      if (!isNaN(this.phi) && this.phi != null){
        event.dataTransfer.setData("phi", this.phi);
      }
      if (!isNaN(this.lambda) && this.lambda != null){
        event.dataTransfer.setData("lambda", this.lambda);
      }
      if (this.root != null && this.root !== undefined){
        event.dataTransfer.setData("root", this.root);
      }
      const target = event.target;
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
  }
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>