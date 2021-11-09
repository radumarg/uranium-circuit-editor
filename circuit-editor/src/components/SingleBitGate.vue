<template>
  <div v-on:click="handleClick">

    <img :src="gateImageSrcEditor" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="initial-modal-dialog" size="sm" centered hide-footer hide-header>

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
              <b-icon v-if="closeIsHovered" title="Close dialog" v-on:click="hideModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
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
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNew[0]" placeholder="qbit" type="number" id="qbit-new" style="width:75px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleExpandGateHover">
              <b-icon v-if="expandGateIsHovered" v-on:click="handleExpandGate()" icon="files" v-b-tooltip.hover title="Replicate gate" style="color: #7952b3;" font-scale="1.5"></b-icon>
              <b-icon v-else icon="files" v-on:click="handleExpandGate()" style="color: #7952b3;" font-scale="1.3"></b-icon>
              </div>
          </td>
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

    <b-modal ref="replicate-gate-modal-dialog" size="lg" width="100px" centered hide-footer hide-header>
      <table>
        <tr>
          <td colspan="6">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleReplicateGateModalCloseHover">
              <b-icon v-if="replicateGateModalCloseIsHovered" v-on:click="hideReplicateGateModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideReplicateGateModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td width="100px" class="td-2nd-modal">
            First Qubit:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="qbitFirst" placeholder="q" type="number" id="qbit-start" style="width:75px;"></b-form-input>
          </td>
          <td width="100px" class="td-2nd-modal">
            Last Qubit:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="qbitLast" placeholder="q" type="number" id="qbit-stop" style="width:75px;"></b-form-input>
          </td>
          <td width="200px" class="td-2nd-modal">
            Condition - 'q' based <br/>javascript expression:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model="qbitConditionExpression" placeholder="q >= 0" type="text" id="qbit-cond" style="width:120px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td width="100px" class="td-2nd-modal">
            First Step:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="stepFirst" placeholder="s" type="number" id="step-start" style="width:75px;"></b-form-input>
          </td>
          <td width="100px" class="td-2nd-modal">
            Last Step:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="stepLast" placeholder="s" type="number" id="step-stop" style="width:75px;"></b-form-input>
          </td>
          <td width="200px" class="td-2nd-modal">
            Condition - 's' based <br/>javascript expression:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model="stepConditionExpression" placeholder="s >= 0" type="text" id="step-cond" style="width:120px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td colspan="3" width="300px" class="td-2nd-modal">
            Conjugate Condition - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="conjugateConditionExpression" placeholder="" type="text" id="conjugate-cond" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td colspan="6" class="td-2nd-modal">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleReplicateGateModalSaveHover">
              <b-icon v-if="replicateGateModalSaveIsHovered" v-on:click="handleReplicateGateModalSave()" icon="check" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="check" v-on:click="handleReplicateGateModalSave()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>
    </b-modal>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { handleSelectEvent, isDefined } from "../store/modules/editorHelper.js";
export default {
  name: "SingleBitGate",
  props: {
    'step' : Number,
    'targets': Array,
    'qrow': Number,
    'img': String,
    'title': String,
    'name': String,
    'id': String,
  },
  data() {
    return {
      trashIsHovered: false,
      closeIsHovered: false,
      replicateGateModalCloseIsHovered: false,
      saveIsHovered:  false,
      replicateGateModalSaveIsHovered:  false,
      expandLeftIsHovered:  false,
      expandRightIsHovered:  false,
      expandUpIsHovered:  false,
      expandDownIsHovered:  false,
      expandGateIsHovered:  false,
      editControlsIsHovered:  false,
      targetsNew: [...this.targets],
      qbitFirst: this.targets[0],
      qbitLast: this.targets[0],
      stepFirst: this.step,
      stepLast: this.step,
      stepConditionExpression: "s >= 0",
      qbitConditionExpression: "q >= 0",
      conjugateConditionExpression: `(q - ${this.targets[0]}) == (s - ${this.step})`
    }
  },
  computed: {
    gateImageSrcEditor: function() {
      if (this.img) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
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
        if (getUserInterfaceSetting('colored-gates') === 'true'){
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
    ...mapActions('circuitEditorModule/', ['insertQbitInCircuit', 'insertStepInCircuit', 'removeGateFromCircuitByUser', 'repositionSimpleGateInCircuit', 'replicateGate']),
    ...mapGetters("circuitEditorModule/", ["getMaximumStepIndex", "getMaximumQbitIndex"]),
    handleClick: function (event) {
      if (event.ctrlKey) {
        this.selectImage();
      } else {
        this.showModal();
      }
    },
    selectImage: function() {
      handleSelectEvent(this.targets[0], this.step);
    },
    showModal: function() {
      this.trashIsHovered = false;
      this.closeIsHovered = false;
      this.replicateGateModalCloseIsHovered = false;
      this.saveIsHovered = false;
      this.replicateGateModalSaveIsHovered = false;
      this.expandLeftIsHovered = false;
      this.expandRightIsHovered = false;
      this.expandUpIsHovered = false;
      this.expandDownIsHovered = false;
      this.expandGateIsHovered = false;
      this.editControlsIsHovered = false;
      this.$data.targetsNew = [...this.targets];
      if (this.targets.length > 1){
        this.$data.qbit2Expression = this.targets[1].toString();
      }
      if (this.root){
        if (this.root.includes("1/2^")){
          this.$data.rootNewK = this.root.replace("1/2^", "");
          this.$data.rootKExpression = this.root.replace("1/2^", "");
          this.$data.rootNewT = null;
          this.$data.rootTExpression = null;
        } else {
          this.$data.rootNewT= this.root.replace("1/", "");
          this.$data.rootTExpression = this.root.replace("1/", "");
          this.$data.rootNewK = null;
          this.$data.rootKExpression = null;
        }
      }
      if (this.controls && this.controls.length > 0){
        this.$data.controlsNew = [...this.controls];
        this.$data.controlsExpression = this.controls[0].toString();
      }
      if (this.controlstates && this.controlstates.length > 0){
        this.$data.controlstatesNew = [...this.controlstates];
        this.$data.controlstatesExpression =  this.controlstates[0];
      }
      if (isDefined(this.phi)){
        this.$data.phiNew = this.phi;
        this.$data.phiExpression = this.phi.toString();
      }
      if (isDefined(this.theta)){
        this.$data.thetaNew = this.theta;
        this.$data.thetaExpression = this.theta.toString();
      }
      if (isDefined(this.lambda)){
        this.$data.lambdaNew = this.lambda;
        this.$data.lambdaExpression = this.lambda.toString();
      }
      if (isDefined(this.bit)){
        this.$data.bitNew = this.bit;
        this.$data.bitExpression = 'q';
      }
      this.$refs['initial-modal-dialog'].show();
    },
    hideModal: function() {
      this.$refs['initial-modal-dialog'].hide();
    },
    hideReplicateGateModal: function() {
      this.$refs['replicate-gate-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleTrashHover(hovered) {
      this.trashIsHovered = hovered;
    },
    handleCloseHover(hovered) {
      this.closeIsHovered = hovered;
    },
    handleReplicateGateModalCloseHover(hovered) {
      this.replicateGateModalCloseIsHovered = hovered;
    },
    handleSaveHover(hovered) {
      this.saveIsHovered = hovered;
    },
    handleReplicateGateModalSaveHover(hovered) {
      this.replicateGateModalSaveIsHovered = hovered;
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
    handleExpandGateHover(hovered) {
      this.expandGateIsHovered = hovered;
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
    expandCircuitUp: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex() + 1) {
        alert("Please increase the number targets in the circuit first.");
        return;
      }
      let controls = [];
      if (this.controls){
        controls = [...this.controls];
      }
      let qbit = Math.min(...this.targets, ...controls);
      this.insertQbitInCircuit(qbit);
    },
    expandCircuitDown: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex() + 1) {
        alert("Please increase the number targets in the circuit first.");
        return;
      }
      let controls = [];
      if (this.controls){
        controls = [...this.controls];
      }
      let qbit = Math.max(...this.targets, ...controls);
      this.insertQbitInCircuit(qbit + 1);
    },
    handleDeleteGate: function(){
      this.removeGateFromCircuitByUser({'step': this.step, 'targets': this.targets});
    },
    handleSave: function(){
      if (!Number.isInteger(this.$data.targetsNew[0])){
        alert("Please enter an integer number!");
        return;
      }
      let targetsOld = [...this.targets];
      let promise = this.repositionSimpleGateInCircuit({
        'step': this.step, 
        'targets': [...this.targets],
        'name': this.name, 
        'img': this.img,
        'targetsNew': [...this.$data.targetsNew]
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNew = [...targetsOld];
          this.targets = [...targetsOld];
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleReplicateGateModalSave: function(){
      let promise = this.replicateGate({
        'step': this.step,
        'targets': [...this.targets],
        'name': this.name, 
        'stepFirst': this.stepFirst,
        'stepLast': this.stepLast,
        'stepConditionExpression': this.stepConditionExpression,
        'qbitFirst': this.qbitFirst,
        'qbitLast': this.qbitLast,
        'qbitConditionExpression': this.qbitConditionExpression,
        'conjugateConditionExpression': this.conjugateConditionExpression,
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {},
      );
      this.$refs['replicate-gate-modal-dialog'].hide();
    },
    handleExpandGate: function(){
      this.$refs['initial-modal-dialog'].hide();
      this.$refs['replicate-gate-modal-dialog'].show();
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData("gateName", target.name);
      event.dataTransfer.setData("drag-origin", "gate");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("originalTargets", [...this.targets]);
      event.dataTransfer.setData("originalStep", this.step);
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
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
.td-2nd-modal {
  padding: 5px;
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