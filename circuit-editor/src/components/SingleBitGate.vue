<template>
  <div v-on:click="showModal()">

    <img :src="gateImageSrcEditor" :title="title" :name="name" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="modal-dialog" size="sm"  centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleTrashHover">
              <b-icon v-if="trashIsHovered" v-on:click="handleDeleteGate()" icon="trash" v-b-tooltip.hover title="Delete gate" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="trash" v-on:click="handleDeleteGate()" style="color: #7952b3;" font-scale="1.4"></b-icon>
              </div>
          </td>
          <td colspan="2">
            <div v-b-hover="handleExpandUpHover">
              <b-icon v-if="expandUpIsHovered" icon="chevron-bar-up" v-on:click="expandCircuitUp()" v-b-tooltip.hover title="Add qbit before" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-up" v-on:click="expandCircuitUp()" v-b-tooltip.hover title="Add qbit before" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleCloseHover">
              <b-icon v-if="closeIsHovered" v-on:click="hideModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-b-hover="handleExpandLeftHover">
              <b-icon v-if="expandLeftIsHovered" icon="chevron-bar-left" v-on:click="expandCircuitLeft()" v-b-tooltip.hover title="Add step to the left" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-left" v-on:click="expandCircuitLeft()" v-b-tooltip.hover title="Add step to the left" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td colspan="2" style="padding: 10px;">
            <img :src="gateImageSrcPopup" style="width:120px;height:120px;" />
          </td>
          <td>
            <div v-b-hover="handleExpandRightHover">
              <b-icon v-if="expandRightIsHovered" icon="chevron-bar-right" v-on:click="expandCircuitRight()" v-b-tooltip.hover title="Add step to the right" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-right" v-on:click="expandCircuitRight()" v-b-tooltip.hover title="Add step to the right" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Target qubit" width="100px" style="padding: 5px;">Target:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input @keyup.enter.native="handleSave()" v-model="qbitNew" placeholder="qbit" type="number" id="qbit-new" style="width:75px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">
            <div v-b-hover="handleExpandDownHover">
              <b-icon v-if="expandDownIsHovered" icon="chevron-bar-down" v-on:click="expandCircuitDown()" v-b-tooltip.hover title="Add qbit after" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-down" v-on:click="expandCircuitDown()" v-b-tooltip.hover title="Add qbit after" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
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
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "SingleBitGate",
  props: {
    'step' : Number, 
    'qbit': Number,
    'qrow': Number,
    'img': String,
    'title': String,
    'name': String,
  },
  data() {
    return {
      trashIsHovered: false,
      closeIsHovered: false,
      saveIsHovered:  false,
      expandLeftIsHovered:  false,
      expandRightIsHovered:  false,
      expandUpIsHovered:  false,
      expandDownIsHovered:  false,
      qbitNew: this.qbit
    }
  },
  computed: {
    gateImageSrcEditor: function() {
      if (this.img) {
        if (window.useColoredGates){
          return require("../assets/colored-gates/" + this.img + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.img + ".svg");
        }
      } else {
        return String.empty;
      }
    },
    gateImageSrcPopup: function() {
      if (this.name) {
        if (window.useColoredGates){
          return require("../assets/colored-gates/" + this.name + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + ".svg");
        }
      } else {
        return String.empty;
      }
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertQbitInCircuit', 'insertStepInCircuit', 'removeGateFromCircuitByUser', 'repositionSimpleGateInCircuit']),
    ...mapGetters("circuitEditorModule/", ["getMaximumStepIndex", "getMaximumQbitIndex"]),
    showModal: function() {
      this.trashIsHovered = false;
      this.closeIsHovered = false;
      this.saveIsHovered = false;
      this.expandLeftIsHovered = false;
      this.expandRightIsHovered = false;
      this.expandUpIsHovered = false;
      this.expandDownIsHovered = false;
      this.$data.qbitNew = this.qbit;
      if (this.qbit2 || this.qbit2 == 0){
        this.$data.qbit2New = this.qbit2;
      }
      if (this.root){
        if (this.root.includes("1/2^")){
          this.$data.rootNewK = this.root.replace("1/2^", "");
          this.$data.rootNewT = null;
        } else {
          this.$data.rootNewT= this.root.replace("1/", "");
          this.$data.rootNewK = null;
        }
      }
      if (this.control || this.control == 0){
        this.$data.controlNew = this.control;
      }
      if (this.controlstate || this.controlstate == 0){
        this.$data.controlstateNew = this.controlstate;
      }
      if (this.control2 || this.control2 == 0){
        this.$data.controlNew2 = this.control2;
      }
      if (this.controlstate2 || this.controlstate2 == 0){
        this.$data.controlstateNew2 = this.controlstate2;
      }
      if (this.phi  || this.phi == 0){
        this.$data.phiNew = this.phi;
      }
      if (this.theta || this.theta == 0){
        this.$data.thetaNew = this.theta;
      }
      if (this.lambda || this.lambda == 0){
        this.$data.lambdaNew = this.lambda;
      }
      if (this.bit  || this.bit == 0){
        this.$data.bitNew = this.bit;
      }
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
    handleExpandLeftHover(hovered) {
      this.expandLeftIsHovered = hovered;
    },
    handleExpandRightHover(hovered) {
      this.expandRightIsHovered = hovered;
    },
    handleExpandUpHover(hovered) {
      this.expandUpIsHovered = hovered;
    },
    handleExpandDownHover(hovered) {
      this.expandDownIsHovered = hovered;
    },
    expandCircuitLeft: function(){
      if (window.gatesTable.columns/2 == this.getMaximumStepIndex() + 2){
        alert("Please increase the number of steps in the circuit first.");
        return;
      }
      this.insertStepInCircuit(this.step);
    },
    expandCircuitRight: function(){
      if (window.gatesTable.columns/2 == this.getMaximumStepIndex() + 2){
        alert("Please increase the number of steps in the circuit first.");
        return;
      }
      this.insertStepInCircuit(this.step + 1);
    },
     expandCircuitUp: function(){
      if (window.gatesTable.rows/2 == this.getMaximumQbitIndex() + 1){
         alert("Please increase the number qbits in the circuit first.");
        return;
      }
      this.insertQbitInCircuit(this.qbit);
    },
    expandCircuitDown: function(){
      if (window.gatesTable.rows/2 == this.getMaximumQbitIndex() + 1 ){
         alert("Please increase the number qbits in the circuit first.");
        return;
      }
      this.insertQbitInCircuit(this.qbit + 1);
    },
    handleDeleteGate: function(){
      this.removeGateFromCircuitByUser({'step': this.step, 'qbit': this.qbit});
    },
    handleSave: function(){
      let qbitOld = this.qbit;
      let promise = this.repositionSimpleGateInCircuit({
        'step': this.step, 
        'qbit': this.qbit,
        'name': this.name, 
        'img': this.img,
        'qbitNew': this.$data.qbitNew
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.qbitNew = this.qbit = qbitOld;
        }
      );
      this.$refs['modal-dialog'].hide();
    },
    dragStart: function(event) {
      const target = event.target;
      event.dataTransfer.setData("gateName", target.name);
      event.dataTransfer.setData("drag-origin", "gate");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("originalQbit", this.qbit);
      event.dataTransfer.setData("originalStep", this.step);
    }
  },
}
</script>

<style scoped>
table {
  text-align: center;
  table-layout: fixed;
}
th,
td {
  padding: 1px;
}
.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
}

img {
  display: inline-block;
}

</style>