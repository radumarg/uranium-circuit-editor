<template>
  <div v-on:click="handleClick">
    
    <img :src="gateImageSource" :id="id" @dragend="dragEnd" @dragstart="dragStart" alt="Controlled Gates Stubs" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  
    <b-modal ref="modal-dialog" size="sm"  centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleTrashHover">
              <b-icon v-if="trashIsHovered" v-on:click="handleDeleteControl()" icon="trash" title="Delete control" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="trash" v-on:click="handleDeleteControl()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td class="center" colspan="2">
            <div v-b-hover="handleExpandUpHover">
              <b-icon v-if="expandUpIsHovered" icon="chevron-bar-up" v-on:click="expandCircuitUp()" title="Add qbit before" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-up" v-on:click="expandCircuitUp()" title="Add qbit before" style="color: #7952b3;" font-scale="1.4"></b-icon>
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
          <td></td>
          <td colspan="2" style="padding: 35px;">
            <div class="d-flex justify-content-center align-items-center">
              <img :src="stubImageSrc()" style="width:40px; height:auto;" />
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="mid-cell">
            <div v-b-hover="handleExpandLeftHover">
              <b-icon v-if="expandLeftIsHovered" icon="chevron-bar-left" v-on:click="expandCircuitLeft()" title="Add step to the left" style="color: #7952b3;" font-scale="1.5"></b-icon>
              <b-icon v-else icon="chevron-bar-left" v-on:click="expandCircuitLeft()" title="Add step to the left" style="color: #7952b3;" font-scale="1.3"></b-icon>
            </div>
          </td>
          <td colspan="2">
          </td>
          <td class="mid-cell">
            <div v-b-hover="handleExpandRightHover">
              <b-icon v-if="expandRightIsHovered" icon="chevron-bar-right" v-on:click="expandCircuitRight()" title="Add step to the right" style="color: #7952b3;" font-scale="1.5"></b-icon>
              <b-icon v-else icon="chevron-bar-right" v-on:click="expandCircuitRight()" title="Add step to the right" style="color: #7952b3;" font-scale="1.3"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="input-fields-cell">Control state:</td>
          <td class="input-fields-cell">
            <b-form-select  @keyup.enter.native="handleSave()" v-model="controlstateNew"  placeholder="controlstate" :options="options" id="controlstate-new" style="min-width: 72px; max-width: 72px;"></b-form-select>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td class="input-fields-cell">Control qubit:</td>
          <td class="input-fields-cell"> 
            <b-form-input readonly min="0" @keyup.enter.native="handleSave()" v-model.number="control" placeholder="qbit" type="number" id="control-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4" style="padding: 5px;"></td>
        </tr>
        <tr>
          <td></td>
          <td class="center" colspan="2">
            <div v-b-hover="handleExpandDownHover">
              <b-icon v-if="expandDownIsHovered" icon="chevron-bar-down" v-on:click="expandCircuitDown()" title="Add qbit after" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-down" v-on:click="expandCircuitDown()" title="Add qbit after" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
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
import { mapActions, mapGetters } from 'vuex';
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { handleSelectEvent, isDefined } from "../store/modules/editorHelper.js";
export default {
  name: "ControlledGateStub",
  props: {
    'step' : Number, 
    'targets': Array,
    'qrow': Number,
    'title': String,
    'name': String,
    'gate': String,
    'controls': Array,
    'controlstates': Array,
    'control': Number,
    'controlstate': String,
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
      expandLeftIsHovered:  false,
      expandRightIsHovered:  false,
      expandUpIsHovered:  false,
      expandDownIsHovered:  false,
      expandGateIsHovered:  false,
      editControlsIsHovered:  false,
      controlstateNew: this.controlstate,
      options: [
        { value: '1', text: '|1⟩' },
        { value: '0', text: '|0⟩' },
        { value: '+', text: '|+⟩' },
        { value: '-', text: '|-⟩' },
        { value: '+i', text: '|+i⟩' },
        { value: '-i', text: '|-i⟩' },
      ],
    }
  },
  computed: {
    gateImageSource: function() {
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        return require("../assets/colored-gates/" + this.name + ".svg");
      } else {
        return require("../assets/blue-gates/" + this.name + ".svg");
      }
    },
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['repositionSimpleGateInCircuit', 'insertQbitInCircuit', 'insertStepInCircuit',]),
    ...mapGetters("circuitEditorModule/", ["getMaximumStepIndex", "getMaximumQbitIndex"]),
    showModal: function() {
      this.trashIsHovered = false;
      this.closeIsHovered = false;
      this.saveIsHovered = false;
      this.expandLeftIsHovered = false;
      this.expandRightIsHovered = false;
      this.expandUpIsHovered = false;
      this.expandDownIsHovered = false;
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
      let controlIndex = this.controls.indexOf(this.control);
      let controlStatesNew = [...this.controlstates];
      controlStatesNew[controlIndex] = this.$data.controlstateNew;
      let dto = {
        'name': this.gate,
        'step': this.step, 
        'targets': [...this.targets],
        'controls': [...this.controls],
        'targetsNew': [...this.targets],
        'controlsNew': [...this.controls],
        'controlstatesNew': controlStatesNew,
      }
      if (isDefined(this.phi)) {
        dto['phiNew'] = this.phi;
      }
      if (isDefined(this.theta)) {
        dto['thetaNew'] = this.theta;
      }
      if (isDefined(this.lambda)) {
        dto['lambdaNew'] = this.lambda;
      }
      if (isDefined(this.root)) {
        dto['rootNew'] = this.root;
      }
      let promise = this.repositionSimpleGateInCircuit(dto);
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {},
      );
      this.$refs['modal-dialog'].hide();
    },
    handleDeleteControl: function(){
      let controlStatesNew = [...this.controlstates]
      let controlsNew = [...this.controls];
      let controlIndex = this.controls.indexOf(this.control);
      controlStatesNew.splice(controlIndex, 1);
      controlsNew.splice(controlIndex, 1);
      let dto = {
        'name': this.gate,
        'step': this.step, 
        'targets': [...this.targets],
        'controls': [...this.controls],
        'targetsNew': [...this.targets],
        'controlsNew': [...controlsNew],
        'controlstatesNew': [...controlStatesNew],
      }
      if (isDefined(this.phi)) {
        dto['phiNew'] = this.phi;
      }
      if (isDefined(this.theta)) {
        dto['thetaNew'] = this.theta;
      }
      if (isDefined(this.lambda)) {
        dto['lambdaNew'] = this.lambda;
      }
      if (isDefined(this.root)) {
        dto['rootNew'] = this.root;
      }
      let promise = this.repositionSimpleGateInCircuit(dto);
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {}
      );
      this.$refs['modal-dialog'].hide();
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
      this.hideModal();
      this.insertStepInCircuit(this.step);
    },
    expandCircuitRight: function(){
      if (window.gatesTable.columns/2 == this.getMaximumStepIndex() + 2){
        alert("Please increase the number of steps in the circuit first.");
        return;
      }
      this.hideModal();
      this.insertStepInCircuit(this.step + 1);
    },
    expandCircuitUp: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex() + 1) {
        alert("Please increase the number qubits in the circuit first.");
        return;
      }
      this.hideModal();
      this.insertQbitInCircuit(this.control);
    },
    expandCircuitDown: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex() + 1) {
        alert("Please increase the number qubits in the circuit first.");
        return;
      }
      this.hideModal();
      this.insertQbitInCircuit(this.control + 1);
    },
    stubImageSrc: function() {
      if (this.gate) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          return require("../assets/colored-gates/ctrl-" + this.gate + "-stub-" + this.controlstateNew + ".svg");
        } else {
          return require("../assets/blue-gates/ctrl-" + this.gate + "-stub-" + this.controlstateNew + ".svg");
        }
      } else {
        return String.empty;
      }
    },
    handleClick: function (event) {
      if (event.ctrlKey) {
        this.selectImage();
      } else if (window.currKey == 'd' || window.currKey == 'D') {
        this.handleDeleteControl();
      }  else {
        this.showModal();
      }
    },
    selectImage: function() {
      handleSelectEvent(this.qrow, this.step);
    },
    dragStart: function(event) {
      hideTooltips();
      event.dataTransfer.setData("drag-origin", "stub");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("gateName", this.gate);
      event.dataTransfer.setData("originalTargets",  [...this.targets]);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControls", [...this.controls]);
      event.dataTransfer.setData("controlstates", [...this.controlstates]);
      if (isDefined(this.theta)) {
        event.dataTransfer.setData("theta", this.theta);
      }
      if (isDefined(this.phi)){
        event.dataTransfer.setData("phi", this.phi);
      }
      if (isDefined(this.lambda)){
        event.dataTransfer.setData("lambda", this.lambda);
      }
      if (isDefined(this.root)){
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

.no-resize-cell{
  padding: 5px;
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

.mid-cell {
  text-align: center;
  padding: 5px;
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

.center {
  text-align: center;
}

.input-fields-cell {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}

img {
  display: inline-block;
}
</style>