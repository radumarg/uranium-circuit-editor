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
            <img :src="gateImageSrcPopup" id="popup-gate-image" style="width:120px;height:auto;" />
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
            <b-form-input @keyup.enter.native="handleSave()" v-model="qbitNew" placeholder="qbit" type="number" id="qbit-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Control qubit" width="100px" style="padding: 5px;">Control:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input @keyup.enter.native="handleSave()" v-model="controlNew" placeholder="control" type="number" id="control-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Control state" width="100px" style="padding: 5px;">Ctrl-State:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-select v-model="controlstateNew" :options="options" style="width:90px;" id="controlstate-new" v-on:change="updatePopupGateIamge()"></b-form-select>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Gate parameter" width="100px" style="padding: 5px;">Phi:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input @keyup.enter.native="handleSave()" v-model="phiNew" placeholder="phi" type="number" id="phi-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Gate parameter" width="100px" style="padding: 5px;">Lambda:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input @keyup.enter.native="handleSave()" v-model="lambdaNew" placeholder="lambda" type="number" id="lambda-new" style="width:90px;"></b-form-input>
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
import { mapActions } from 'vuex';
import UnitaryBiParametricSingleBitGate from "./UnitaryBiParametricSingleBitGate";
export default {
  name: "ControlledUnitaryBiParametricSingleBitGate",
  extends: UnitaryBiParametricSingleBitGate,
  props: {
    'control': Number,
    'controlstate': Number,
  },
  data() {
    return {
      controlNew: this.control,
      controlstateNew: this.controlstate,
      options: [
        { value: '1', text: '|1⟩' },
        { value: '0', text: '|0⟩' },
      ],
    }
  },
  watch: {
    control: function() {
      // need this in order to update controlNew
      // when doing drag & drop on the stub
      this.$data.controlNew = this.control;
      this.$data.controlstateNew = this.controlstate;
    }
  },
  computed: {
    gateImageSrcPopup: function() {
      if (this.name) {
        if (window.useColoredGates){
          return require("../assets/colored-gates/" + this.name + "-" + this.controlstate + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + "-" + this.controlstate + ".svg");
        }
      } else {
        return String.empty;
      }
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['repositionControlledGateInCircuit']),
    handleSave: function(){
      if (this.$data.qbitNew == this.$data.controlNew){
        alert("Control and target qubits must differ!");
        return;
      }
      let qbitOld = this.qbit;
      let controlOld = this.control;
      let controlstateOld = this.controlstate;
      let phiOld = this.phi;
      let lambdaOld = this.lambda;
      let promise = this.repositionControlledGateInCircuit({
        'step': this.step, 
        'qbit': this.qbit, 
        'control': this.control,
        'controlstate': this.controlstate,
        'name': this.name, 
        'qbitNew': this.$data.qbitNew, 
        'phiNew': this.$data.phiNew,
        'lambdaNew': this.$data.lambdaNew,
        'controlNew': this.$data.controlNew,
        'controlstateNew': this.$data.controlstateNew,
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.qbitNew = this.qbit = qbitOld;
          this.$data.controlNew = this.control = controlOld;
          this.$data.controlstateNew = this.controlstate = controlstateOld;
          this.$data.phiNew = this.phi = phiOld;
          this.$data.lambdaNew = this.lambda = lambdaOld;
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
      event.dataTransfer.setData("originalControl", this.control);
      event.dataTransfer.setData("controlstate", this.controlstate);
      event.dataTransfer.setData("phi", this.phi);
      event.dataTransfer.setData("lambda", this.lambda);
    },
    updatePopupGateIamge(){
      var img = document.getElementById("popup-gate-image");
      if (window.useColoredGates){
          img.src = require("../assets/colored-gates/" + this.name + "-" + this.$data.controlstateNew + ".svg");
        } else {
          img.src = require("../assets/blue-gates/" + this.name + "-" + this.$data.controlstateNew + ".svg");
        }
    },
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