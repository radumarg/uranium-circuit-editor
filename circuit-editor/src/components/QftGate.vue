<template>
  <div :step="step" :qrow="qrow" v-on:click="handleClick" @dragenter.prevent @dragover.prevent @drop.prevent="handleDropEvent">

    <img :src="gateImageSrcEditor" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
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
            <div v-b-hover="handleExpandUpHover">
              <b-icon v-if="expandUpIsHovered" icon="chevron-bar-up" v-on:click="expandCircuitUp()" title="Add qbit before" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-up" v-on:click="expandCircuitUp()" title="Add qbit before" style="color: #7952b3;" font-scale="1.4"></b-icon>
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
              <b-icon v-if="expandLeftIsHovered" icon="chevron-bar-left" v-on:click="expandCircuitLeft()" title="Add step to the left" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-left" v-on:click="expandCircuitLeft()" title="Add step to the left" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td colspan="2" style="padding: 10px;">
            <img :src="gateImageSrcPopup" style="width:120px;height:120px;" />
          </td>
          <td>
            <div v-b-hover="handleExpandRightHover">
              <b-icon v-if="expandRightIsHovered" icon="chevron-bar-right" v-on:click="expandCircuitRight()" title="Add step to the right" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-right" v-on:click="expandCircuitRight()" title="Add step to the right" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td title="First target qubit" width="110px" style="padding: 5px;">Target First:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNewFirst" placeholder="qbit" type="number" id="qbit-new" style="width:75px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="Last target qubit" width="110px" style="padding: 5px;">Target Last:</td>
          <td width="100px" style="padding: 5px;">
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNewLast" placeholder="qbit" type="number" id="qbit-new" style="width:75px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
           <td title="Edit control qubits" width="100px" style="padding: 5px;">Controls:</td>
           <td width="100px" style="padding: 5px;">
             <div v-b-hover="handleEditControlsHover">
              <b-icon v-if="editControlsIsHovered" icon="pencil-fill" v-on:click="handleEditControls()" title="Edit controls" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="pencil" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td style="padding: 5px;">
            <div v-b-hover="handleMoveGateOneQubitDownwardsHover">
              <b-icon v-if="moveGateOneQubitDownwardsIsHovered" icon="arrow-down-square-fill" v-on:click="moveGateOneQubitDownwards()" title="Move gate one qubit downwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-down-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td style="padding: 5px;">
            <div v-b-hover="handleMoveGateOneQubitUpwardsHover">
              <b-icon v-if="moveGateOneQubitUpwardsIsHovered" icon="arrow-up-square-fill" v-on:click="moveGateOneQubitUpwards()" title="Move gate one qubit upwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-up-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
          </td>
          <td colspan="2">
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

    <b-modal ref="edit-controls-modal-dialog" :size="editControlsModalSize()" centered hide-footer hide-header>
      <table>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsPlusHover">
              <b-icon v-if="editControlsPlusIsHovered" v-on:click="addControl()" title="Add control" icon="plus" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="plus" v-on:click="addControl()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td :colspan="numberOfColumnsInEditControlsModal() + 2">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsModalCloseHover">
              <b-icon v-if="editControlsModalCloseIsHovered" v-on:click="hideEditControlsModal()" title="Close dialog" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideEditControlsModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td :colspan="numberOfColumnsInEditControlsModal()" rowspan="4" :style="getEditControlsEmbedTableCellStyle()" class="text-center">
            <b-table-simple :style="getEditControlsEmbededTableStyle()" :responsive="true" borderless>
              <b-tr>
                <b-td v-for="(control, index) in controlsNew.length" v-bind:key="index" class="embedded-table-cell">
                  <img :src="stubImageSrcPopup(control - 1)" style="width:30px; height:auto;" />
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 1000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td v-for="(controlstate, index) in controlstatesNew" v-bind:key="index + 4000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-select v-model="controlstatesNew[index]" @change="onControlStateChange()"  placeholder="controlstate" :options="options" id="controlstate-new" style="min-width: 72px; max-width: 72px;"></b-form-select>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 5000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td v-for="(control, index) in controlsNew" v-bind:key="index + 2000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-input min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="controlsNew[index]" placeholder="control" type="number" id="control-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 3000"  class="embedded-table-cell" />
              </b-tr>
            </b-table-simple>
          </td>
          <td title="Target qubit">Target First:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model="targetsNew[0]" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="No control qubits">Target Last:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model="targetsNew[targetsNew.length - 1]" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="No control qubits">Controls:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input min="0" v-model.number="numberOfControls" @change="onNumberControlsChange()" @keyup.enter.native="handleEditControlsModalSave()" placeholder="controls" type="number" id="number-controls" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td style="padding: 8px;">
            <div v-b-hover="handleAlignControlsUpwardsHover">
              <b-icon v-if="alignControlsUpwardsIsHovered" icon="caret-up-fill" v-on:click="alignControlsUpwardsFromTargetQubit()" title="Align controls upwards from target qubit" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="caret-up" style="color: #7952b3;" font-scale="1.8"></b-icon>
             </div>
          </td>
          <td style="padding: 8px;">
            <div v-b-hover="handleAlignControlsDownwardsHover">
              <b-icon v-if="alignControlsDownwardsIsHovered" icon="caret-down-fill" v-on:click="alignControlsDownwardsFromTargetQubit()" title="Align controls downwards from target qubit" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="caret-down" style="color: #7952b3;" font-scale="1.8"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsMinusHover">
              <b-icon v-if="editControlsMinusIsHovered" v-on:click="removeControl()" title="Remove control" icon="dash" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="dash" v-on:click="removeControl()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td :colspan="numberOfColumnsInEditControlsModal() + 2">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsModalSaveHover">
              <b-icon v-if="editControlsModalSaveIsHovered" v-on:click="handleEditControlsModalSave()" title="Save changes" icon="check" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="check" v-on:click="handleEditControlsModalSave()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>
    </b-modal>

  </div>
</template>


<script>
import { mapActions } from 'vuex';
import { arraysAreEqual } from "../store/modules/javaScriptUtils.js";
import { controlsMixin } from "../mixins/controlsMixin.js";
import { getClosestControlledGates } from "../store/modules/editorHelper.js";
import { seatsAreTaken } from "../store/modules/gatesTable.js";
import SingleQbitGate from "./SingleQbitGate";
import { createDragImageGhost, getUserInterfaceSetting, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
export default {
  name: "QftGate",
  extends: SingleQbitGate,
  mixins: [controlsMixin],
  data() {
    return {
      targetsNewFirst: this.targets[0],
      targetsNewLast: this.targets[this.targets.length - 1],
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'repositionElementaryGateInCircuit', 'removeGateFromCircuit']),
    initializeData: function () {
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
      this.$data.numberOfControls = this.controls.length;
      this.$data.targetsNewFirst = this.targets[0];
      this.$data.targetsNewLast = this.targets[this.targets.length - 1];
    },
    handleSave: function(){
      if (!Number.isInteger(this.$data.targetsNewFirst)){
        alert("Please enter an integer number for the first target qubit!");
        return;
      }
      if (!Number.isInteger(this.$data.targetsNewLast)){
        alert("Please enter an integer number for the last qubit!");
        return;
      }
      if (this.$data.targetsNewFirst > this.$data.targetsNewLast) {
        let tmp = this.$data.targetsNewFirst;
        this.$data.targetsNewFirst = this.$data.targetsNewLast;
        this.$data.targetsNewLast = tmp;
      }
      let targetsOld = [...this.targets];
      let targetsNew = [];
      for (let i = this.$data.targetsNewFirst; i <= this.$data.targetsNewLast; i++) {
        if (!targetsNew.includes(i))
          targetsNew.push(i);
      }
      let promise = this.repositionGateInCircuit({
        'step': this.step,
        'name': this.name,
        'img': this.img,
        'targets': [...this.targets],
        'controls': [...this.controls],
        'targetsNew': [...targetsNew],
        'controlsNew': [...this.$data.controlsNew],
        'controlstatesNew': [...this.$data.controlstatesNew],
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNewFirst = targetsOld[0];
          this.$data.targetsNewLast = targetsOld[this.targetsOld.length - 1];
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleDropEvent: function (event) {
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let circuitState = this.$store.state.circuitEditorModule[window.currentCircuitId];
      let closestGates = getClosestControlledGates(circuitState, step, dropQbit);

      if (step == originalStep && closestGates.length == 1 && dropQbit != draggedQbit) {

        let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
        let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
        let closestGateTargets = closestGates[0].targets ? closestGates[0].targets : [];

        if (
            // make sure we will not modify a different gate than the one we are dragging from
            arraysAreEqual(closestGateTargets, originalTargets) &&
            (draggedQbit == originalTargets[0] || draggedQbit == originalTargets[originalTargets.length - 1])
          ) {
            this.repositionGate(event);
          } else {
            this.handleDragLeave();
          }
      } else {
        this.handleDragLeave();
      }
    },
    repositionGate: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      let controlstates = [];
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstatesData = event.dataTransfer.getData("controlstates");
        if (controlstatesData) {
          controlstates = controlstatesData.split(",");
        }
      }

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "controls": originalControls, "controlstates": controlstates};

      if (draggedQbit ==  originalTargets[0]) {
        let min = dropQbit;
        let max = originalTargets[originalTargets.length - 1];
        dto["targets"] = Array.from({length: max - min + 1}, (_, i) => i + min);
      } else if (draggedQbit == originalTargets[originalTargets.length - 1]) {
        let min = originalTargets[0];
        let max = dropQbit;
        dto["targets"] = Array.from({length: max - min + 1}, (_, i) => i + min);
      } else {
        // not strictly needed, this is defensive coding
        return;
      }

      // step1 - remove original gate if drag event started from a cell
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    moveGateOneQubitUpwards() {
      let proposedTargets = [...this.$data.targetsNew];
      let proposedControls = [...this.$data.controlsNew];

      if (Math.min(...proposedTargets) > 0 && Math.min(...proposedControls) > 0) {
        for (let i = 0; i < proposedTargets.length; i++) {
          proposedTargets[i] -= 1;
        }
        for (let i = 0; i < proposedControls.length; i++) {
          proposedControls[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached!");
        return;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control upwards!");
      } else {
        this.$data.targetsNew = proposedTargets;
        this.$data.controlsNew = proposedControls;
        this.$data.targetsNewFirst = this.$data.targetsNew[0];
        this.$data.targetsNewLast = this.$data.targetsNew[this.$data.targetsNew.length - 1];
        this.$forceUpdate();
      }
    },
    moveGateOneQubitDownwards() {
      let proposedTargets = [...this.$data.targetsNew];
      let proposedControls = [...this.$data.controlsNew];

      for (let i = 0; i < proposedTargets.length; i++) {
        proposedTargets[i] += 1;
      }
      for (let i = 0; i < proposedControls.length; i++) {
        proposedControls[i] += 1;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control downwards!");
      } else {
        this.$data.targetsNew = proposedTargets;
        this.$data.controlsNew = proposedControls;
        this.$data.targetsNewFirst = this.$data.targetsNew[0];
        this.$data.targetsNewLast = this.$data.targetsNew[this.$data.targetsNew.length - 1];
        this.$forceUpdate();
      }
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData("gateName", target.name);
      event.dataTransfer.setData("drag-origin", "gate");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("originalTargets", [...this.targets]);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControls", [...this.controls]);
      event.dataTransfer.setData("controlstates", [...this.controlstates]);
      let dragImageGhost = createDragImageGhost(target);
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
    handleDragOver() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/red-line.svg");
    },
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/" + this.img + ".svg");
      } else {
        image.src = require("../assets/blue-gates/" + this.img + ".svg");
      }
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
.no-resize-cell {
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

.embedded-table-cell {
  padding: 7px;
  text-align: center;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 79px;
  min-width: 79px;
  max-width: 79px;
}


img {
  display: inline-block;
}

</style>