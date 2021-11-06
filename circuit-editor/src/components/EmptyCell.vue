<template>
  <div
    :step="step"
    :qrow="qrow"
    @dragover.prevent
    @drop.prevent="handleDropEvent"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    v-on:dblclick="showModal()"
    v-on:click="selectIfCtrlDown"
  >
    <img
      src="../assets/gray-line.svg"
      :id="id"
      draggable="false"
      style="
        width: 100%;
        height: 100%;
        max-width: 40px;
        max-height: 40px;
        min-width: 40px;
        min-height: 40px;
      "
    />

    <b-modal ref="modal-dialog" size="sm" centered hide-footer hide-header>
      <table style="table-layout: fixed">
        <tr>
          <td colspan="2"></td>
          <td>
            <div v-b-hover="handleExpandUpHover">
              <b-icon
                v-if="expandUpIsHovered"
                icon="chevron-bar-up"
                v-on:click="expandCircuitUp()"
                v-b-tooltip.hover
                title="Add qbit before"
                style="color: #7952b3"
                font-scale="1.6"
              ></b-icon>
              <b-icon
                v-else
                icon="chevron-bar-up"
                v-on:click="expandCircuitUp()"
                v-b-tooltip.hover
                title="Add qbit before"
                style="color: #7952b3"
                font-scale="1.4"
              ></b-icon>
            </div>
          </td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>
            <div v-b-hover="handleExpandLeftHover">
              <b-icon
                v-if="expandLeftIsHovered"
                icon="chevron-bar-left"
                v-on:click="expandCircuitLeft()"
                v-b-tooltip.hover
                title="Add step to the left"
                style="color: #7952b3"
                font-scale="1.6"
              ></b-icon>
              <b-icon
                v-else
                icon="chevron-bar-left"
                v-on:click="expandCircuitLeft()"
                v-b-tooltip.hover
                title="Add step to the left"
                style="color: #7952b3"
                font-scale="1.4"
              ></b-icon>
            </div>
          </td>
          <td padding="20px">
            <div v-b-hover="handleRemoveQbitHover">
              <b-icon
                v-if="removeQbitIsHovered"
                icon="x-circle"
                v-on:click="removeQbit()"
                v-b-tooltip.hover
                title="Remove Qbit"
                style="color: #7952b3"
                font-scale="2.0"
              ></b-icon>
              <b-icon
                v-else
                icon="x-circle"
                v-on:click="removeQbit()"
                v-b-tooltip.hover
                title="Remove Qbit"
                style="color: #7952b3"
                font-scale="1.8"
              ></b-icon>
            </div>
          </td>
          <td>
            <div v-b-hover="handleCloseHover">
              <b-icon
                v-if="closeIsHovered"
                v-on:click="hideModal()"
                v-b-tooltip.hover
                title="Close dialog"
                icon="x-square"
                style="color: #7952b3"
                font-scale="1.6"
              ></b-icon>
              <b-icon
                v-else
                icon="x-square"
                v-on:click="hideModal()"
                v-b-tooltip.hover
                title="Close dialog"
                style="color: #7952b3"
                font-scale="1.4"
              ></b-icon>
            </div>
          </td>
          <td padding="20px">
            <div v-b-hover="handleRemoveStepHover">
              <b-icon
                v-if="removeStepIsHovered"
                icon="x-circle-fill"
                v-on:click="removeStep()"
                v-b-tooltip.hover
                title="Remove Step"
                style="color: #7952b3"
                font-scale="2.0"
              ></b-icon>
              <b-icon
                v-else
                icon="x-circle-fill"
                v-on:click="removeStep()"
                v-b-tooltip.hover
                title="Remove Step"
                style="color: #7952b3"
                font-scale="1.8"
              ></b-icon>
            </div>
          </td>
          <td>
            <div v-b-hover="handleExpandRightHover">
              <b-icon
                v-if="expandRightIsHovered"
                icon="chevron-bar-right"
                v-on:click="expandCircuitRight()"
                v-b-tooltip.hover
                title="Add step to the right"
                style="color: #7952b3"
                font-scale="1.6"
              ></b-icon>
              <b-icon
                v-else
                icon="chevron-bar-right"
                v-on:click="expandCircuitRight()"
                v-b-tooltip.hover
                title="Add step to the right"
                style="color: #7952b3"
                font-scale="1.4"
              ></b-icon>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td>
            <div v-b-hover="handleExpandDownHover">
              <b-icon
                v-if="expandDownIsHovered"
                icon="chevron-bar-down"
                v-on:click="expandCircuitDown()"
                v-b-tooltip.hover
                title="Add qbit after"
                style="color: #7952b3"
                font-scale="1.6"
              ></b-icon>
              <b-icon
                v-else
                icon="chevron-bar-down"
                v-on:click="expandCircuitDown()"
                v-b-tooltip.hover
                title="Add qbit after"
                style="color: #7952b3"
                font-scale="1.4"
              ></b-icon>
            </div>
          </td>
          <td colspan="2"></td>
        </tr>
      </table>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { seatsAreTaken } from "../store/modules/gatesTable.js";
import { handleSelectEvent, isDefined } from "../store/modules/editorHelper.js";
export default {
  name: "EmptyCell",
  props: {
    step: Number,
    qrow: Number,
    id: String,
  },
  data() {
    return {
      closeIsHovered: false,
      expandLeftIsHovered: false,
      expandRightIsHovered: false,
      expandUpIsHovered: false,
      expandDownIsHovered: false,
      removeQbitIsHovered: false,
      removeStepIsHovered: false,
    };
  },
  methods: {
    ...mapActions("circuitEditorModule/", [
      "insertQbitInCircuit",
      "insertStepInCircuit",
      "insertGateInCircuit",
      "removeGateFromCircuit",
      "removeQbitFromCircuit",
      "removeStepFromCircuit",
    ]),
    ...mapGetters("circuitEditorModule/", [
      "getMaximumStepIndex",
      "getMaximumQbitIndex",
    ]),
    selectIfCtrlDown: function (event) {
      if (event.ctrlKey) {
        handleSelectEvent(this.qrow, this.step);
      }
    },
    showModal: function () {
      this.$refs["modal-dialog"].show();
      this.closeIsHovered = false;
      this.expandLeftIsHovered = false;
      this.expandRightIsHovered = false;
      this.expandUpIsHovered = false;
      this.expandDownIsHovered = false;
      this.removeQbitIsHovered = false;
      this.removeStepIsHovered = false;
    },
    hideModal: function () {
      this.$refs["modal-dialog"].hide();
    },
    handleCloseHover(hovered) {
      this.closeIsHovered = hovered;
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
    handleRemoveQbitHover(hovered) {
      this.removeQbitIsHovered = hovered;
    },
    handleRemoveStepHover(hovered) {
      this.removeStepIsHovered = hovered;
    },
    handleDragOver() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/red-line.svg");
    },
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/gray-line.svg");
    },
    expandCircuitLeft: function () {
      if (window.gatesTable.columns / 2 == this.getMaximumStepIndex() + 2) {
        alert("Please increase the number of steps in the circuit first.");
        return;
      }
      this.insertStepInCircuit(this.step);
    },
    expandCircuitRight: function () {
      if (window.gatesTable.columns / 2 == this.getMaximumStepIndex() + 2) {
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
      this.insertQbitInCircuit(this.qrow);
    },
    expandCircuitDown: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex() + 1) {
        alert("Please increase the number targets in the circuit first.");
        return;
      }
      this.insertQbitInCircuit(this.qrow + 1);
    },
    removeQbit: function () {
      let dto = { qbit: this.qrow };
      this.removeQbitFromCircuit(dto);
      this.$refs["modal-dialog"].hide();
    },
    removeStep: function () {
      let dto = { step: this.step };
      this.removeStepFromCircuit(dto);
      this.$refs["modal-dialog"].hide();
    },
    handleDropEvent: function (event) {
      let draggedQbit = null;
      if (event.dataTransfer.types.includes("dragged-qbit")) {
        draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      }
      if (event.shiftKey && draggedQbit) {
        // shift key is pressed and draggedQbit not null means
        // we are not doing drag & drop from the gates pallete
        let dragOrigin = event.dataTransfer.getData("drag-origin");
        if (dragOrigin == 'stub'){
          let step = parseInt(event.currentTarget.getAttribute("step"));
          let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
          if (step != originalStep){
            alert("To duplicate a gate drag a target qubit not control qubit!");
            this.handleDragLeave();
          } else {
            this.addNewControlToControlledGate(event);
          }
        } else{
          this.addNewGateToCircuit(event);
        }
      } else {
        this.removeDraggedGateAndAddNewGateToCircuit(event);
      }
    },
    addNewControlToControlledGate: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let targets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));         

      // add the new gate mandatory params
      let dto = { step: step, targets: [...targets], name: gateName };

      dto["controls"] = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      dto["controls"].push(dropQbit);

      dto["controlstates"] = event.dataTransfer.getData("controlstates").split(",");
      dto["controlstates"].push('1');
      
      if (event.dataTransfer.types.includes("phi")) {
        let phi = parseFloat(event.dataTransfer.getData("phi"));
        dto["phi"] = phi;
      }
      if (event.dataTransfer.types.includes("theta")) {
        let theta = parseFloat(event.dataTransfer.getData("theta"));
        dto["theta"] = theta;
      }
      if (event.dataTransfer.types.includes("lambda")) {
        let lambda = parseFloat(event.dataTransfer.getData("lambda"));
        dto["lambda"] = lambda;
      }
      if (event.dataTransfer.types.includes("root")) {
        let root = event.dataTransfer.getData("root");
        dto["root"] = root;
      }

      this.removeGateFromCircuit(dto);
      this.insertGateInCircuit(dto);
    },
    addNewGateToCircuit: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let qbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let step = parseInt(event.currentTarget.getAttribute("step"));            
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");

      // add the new gate mandatory params
      let dto = { step: step, targets: [qbit], controls: [], name: gateName, };

      let qbitDelta = draggedQbit - qbit;

      // add optional params, notice lower case needed for types.includes
      if (originalTargets.length == 2) {
        let originalTarget = originalTargets[0];
        let originalTarget2 = originalTargets[1];
        if (draggedQbit == originalTarget) {
          dto["targets"].push(originalTarget2 - qbitDelta);
        } else if (draggedQbit == originalTarget2) {
          dto["targets"].length = 0; // reset array
          dto["targets"][0] = originalTarget - qbitDelta;
          dto["targets"].push(qbit);
        }
      }
      if (event.dataTransfer.types.includes("originalcontrols")) {
        let controls =  JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
        dto["controls"] = controls.map( function(value) { return value - qbitDelta; } );
      }
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstates = event.dataTransfer.getData("controlstates").split(",");
        dto["controlstates"] = controlstates;
      }
      if (event.dataTransfer.types.includes("phi")) {
        let phi = parseFloat(event.dataTransfer.getData("phi"));
        dto["phi"] = phi;
      }
      if (event.dataTransfer.types.includes("theta")) {
        let theta = parseFloat(event.dataTransfer.getData("theta"));
        dto["theta"] = theta;
      }
      if (event.dataTransfer.types.includes("lambda")) {
        let lambda = parseFloat(event.dataTransfer.getData("lambda"));
        dto["lambda"] = lambda;
      }
      if (event.dataTransfer.types.includes("root")) {
        let root = event.dataTransfer.getData("root");
        dto["root"] = root;
      }
      if (event.dataTransfer.types.includes("bit")) {
        let bit = parseInt(event.dataTransfer.getData("bit"));
        dto["bit"] = bit;
      }

      let proposedQbits = [
        ...dto["targets"],
        ...dto["controls"],
      ]

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          proposedQbits,
          step
        )
      ) {
        alert(
          "Cannot add this gate here, not all required qubits are available!"
        );
        this.handleDragLeave();
        return;
      }

      this.insertGateInCircuit(dto);
    },
    removeDraggedGateAndAddNewGateToCircuit: function (event) {
      let qbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let gateName = event.dataTransfer.getData("gateName");
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      let originalControls = [];
      
      let draggedQbit = null;
      if (event.dataTransfer.types.includes("dragged-qbit")) {
        draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      }
      
      // add the new gate mandatory params
      let dto = { step: step, targets: [qbit], name: gateName };
      
      if (dragOrigin == "stub") {
        dto["targets"] = originalTargets;
      } else if (originalTargets.length > 1) {
        let delta = originalTargets[1] - originalTargets[0];
        if (draggedQbit == originalTargets[0]){
          dto["targets"].push(qbit + delta);
        } else {
          dto["targets"].push(qbit - delta);
        }
      }
      // notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("originalcontrols")) {
        originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
        dto["controls"] = originalControls;
      }
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstates = event.dataTransfer.getData("controlstates").split(",");
        dto["controlstates"] = controlstates;
      }
      if (event.dataTransfer.types.includes("phi")) {
        let phi = parseFloat(event.dataTransfer.getData("phi"));
        dto["phi"] = phi;
      }
      if (event.dataTransfer.types.includes("theta")) {
        let theta = parseFloat(event.dataTransfer.getData("theta"));
        dto["theta"] = theta;
      }
      if (event.dataTransfer.types.includes("lambda")) {
        let lambda = parseFloat(event.dataTransfer.getData("lambda"));
        dto["lambda"] = lambda;
      }
      if (event.dataTransfer.types.includes("root")) {
        let root = event.dataTransfer.getData("root");
        dto["root"] = root;
      }
      if (event.dataTransfer.types.includes("bit")) {
        let bit = parseInt(event.dataTransfer.getData("bit"));
        dto["bit"] = bit;
      }
      
      let existingQbits = [
        ...originalTargets,
        ...originalControls,
      ].filter((qbit) => isDefined(qbit));

      let success = true;
      
      if (step != originalStep) {
        existingQbits = [];
        if (dragOrigin == "stub") {
           // the drag event was initiated from a controlled gate stub
          alert("The control qbit must be positioned in the same row with target qbit!");
          success = false;
        }
      }

      if (success){
        if (gateName.includes("ctrl-")) {
          if (!dto["controls"]) {
            dto["controls"] = [];
          }
          if (!dto["controlstates"]) {
            dto["controlstates"] = ['1'];
          }
          if (dragOrigin != "stub"){
            let delta = qbit - draggedQbit;
            dto["controls"] = originalControls.map(val => val + delta).filter(val => val >= 0);
          } else {
            dto["controls"] = dto["controls"].map(function(item) { return item == draggedQbit ? qbit : item; });
          }
          success = this.repositionControlledGate(dto, qbit, step, originalStep, existingQbits); 
        }
        
        if (success && 
            (gateName.includes("swap") || gateName == "xx" || gateName == "yy" || gateName == "zz")
        ) {
          success = this.repositionTwoTargetQubitsGate(dto, qbit, step, originalStep, existingQbits);
        }
      }
      
      if (success) {
        // At this point all targets have been asigned value, will
        // start by removing the old gate and then will insert a new one

        // step1 - remove original gate if drag event started from a cell
        // in editor (not originating from gates pallete)
        if (isDefined(originalTargets) && isDefined(originalStep)) {
          let dtoOriginal = { step: originalStep, targets: [...originalTargets] };
          this.removeGateFromCircuit(dtoOriginal);
        }

        // step2 - add the new gate to the circuit
        this.insertGateInCircuit(dto);
      } else {
        // remove red line shown on mouse over event
        this.handleDragLeave();
      }
    },
    repositionControlledGate: function (dto, qbit, step, originalStep, existingQbits) {
      // If this was a controlled gate and was draged from the gate panel than the control bit is not assigned
      if (dto["controls"].length == 0) {
        if (!this.findBestFitForControlledGate(dto, qbit, step, existingQbits)) {
          return false;
        }
      }

      let proposedQbits = [
        ...dto["targets"],
        ...dto["controls"],
      ].filter((qbit) => isDefined(qbit));

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          proposedQbits,
          step,
          existingQbits,
        )
      ) {
        if (step != originalStep) {
          //  Try to Reposition the control bit in case dragging from one step to another
          if (!this.findBestFitForControlledGate(dto, qbit, step, existingQbits)) {
            return false;
          }
        } else {
          alert("At least a gate already exists in the targets ranging between the proposed target and proposed control!");
          return false;
        }
      }
      return true;
    },
    findBestFitForControlledGate: function (dto, qbit, step, existingQbits) {
      // TODO:fix
      dto["controls"] = [qbit - 1];
      let proposedQbits = [
        ...dto["targets"],
        ...dto["controls"],
      ].filter((qbit) => isDefined(qbit));
      if (
        (dto["controls"][0] < 0) || seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, step, existingQbits)
      ) {
        // TODO:fix
        dto["controls"] = [qbit + 1];
        proposedQbits = [
          ...dto["targets"],
          ...dto["controls"],
        ].filter((qbit) => isDefined(qbit));
        if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, step, existingQbits)
        ) {
          alert("Cannot allocate controll qubit!");
          return false;
        }
      }
      return true;
    },
    repositionTwoTargetQubitsGate: function(dto, qbit, step, originalStep, existingQbits){
      if (dto["targets"].length == 1) {
        if (!this.findBestFitForTwoTargetQubitsGate(dto, qbit, step, existingQbits)) {
          return false;
        }
      }
      //TODO: review
      let proposedQbits = [ ...dto["targets"]];

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          proposedQbits,
          step,
          existingQbits
        )
      ) {
        //  Try to reposition the target bits if necessary in case dragging from one step to another
        if (step != originalStep) {
          if (!this.findBestFitForTwoTargetQubitsGate(dto, qbit, step, existingQbits)) {
            return false;
          }
        } else {
          alert(
            "At least a gate already exists in the targets ranging between the proposed target qubits!"
          );
          return false;
        }
      }

      return true;
    },
    findBestFitForTwoTargetQubitsGate: function (dto, qbit, step, existingQbits) {
      dto["targets"] = [qbit, qbit + 1];
      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          dto["targets"],
          step,
          existingQbits
        )
      ) {
          if (qbit == 0) {
            alert("Cannot allocate second target qubit for this gate!");
            return false;
          }
          dto["targets"] = [qbit, qbit - 1];
          if (
            seatsAreTaken(
              this.$store.state.circuitEditorModule,
              dto["targets"],
              step,
              existingQbits
            )
          ) {
            alert(
              "At least a gate already exists in the targets ranging between the proposed target qubits!"
            );
            return false;
          }
      }
      return true;
    },
  },
};
</script>

<style scoped>
table {
  text-align: center;
  table-layout: fixed;
  width: 100%;
}
th,
td {
  padding: 1px;
  width: 88px;
  max-width: 88px;
  height: 88px;
  max-height: 88px;
}

img {
  display: inline-block;
}
</style>