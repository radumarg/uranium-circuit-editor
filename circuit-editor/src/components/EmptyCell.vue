<template>
  <div
    :step="step"
    :qbit="qbit"
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
    qbit: Number,
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
        handleSelectEvent(this.qbit, this.step);
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
        alert("Please increase the number qbits in the circuit first.");
        return;
      }
      this.insertQbitInCircuit(this.qbit);
    },
    expandCircuitDown: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex() + 1) {
        alert("Please increase the number qbits in the circuit first.");
        return;
      }
      this.insertQbitInCircuit(this.qbit + 1);
    },
    removeQbit: function () {
      let dto = { qbit: this.qbit };
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
        this.addNewGateToCircuit(event);
      } else {
        this.removeDraggedGateAndAddNewGateToCircuit(event);
      }
    },
    addNewGateToCircuit: function (event) {
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      if (dragOrigin != "gate") {
        alert("To duplicate a gate drag a target qubit not control qubit!");
        this.handleDragLeave();
        return;
      }
      
      let draggedQbit = null;
      if (event.dataTransfer.types.includes("dragged-qbit")) {
        draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      }
      
      let qbit = parseInt(event.currentTarget.getAttribute("qbit"));
      let qbitDelta = draggedQbit - qbit;
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let gateName = event.dataTransfer.getData("gateName");
      let controls = [];

      // add the new gate mandatory params
      let dto = { step: step, qbit: qbit, name: gateName };

      // add optional params, notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("originalqbit2")) {
        let originalQbit = parseInt(event.dataTransfer.getData("originalQbit"));
        let originalQbit2 = parseInt(event.dataTransfer.getData("originalQbit2"));
        if (draggedQbit == originalQbit) {
          dto["qbit2"] = parseInt(originalQbit2) - qbitDelta;
        } else if (draggedQbit == originalQbit2) {
          dto["qbit"] = originalQbit - qbitDelta;
          dto["qbit2"] = qbit;
        }
      }
      if (event.dataTransfer.types.includes("originalcontrols")) {
        controls =  JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
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
        dto["qbit"],
        dto["qbit2"],
        ...controls,
      ].filter((qbit) => isDefined(qbit));

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          null,
          proposedQbits,
          step
        )
      ) {
        alert(
          "Cannot replicate this gate here, not all required qubits are available!"
        );
        this.handleDragLeave();
        return;
      }

      this.insertGateInCircuit(dto);
    },
    removeDraggedGateAndAddNewGateToCircuit: function (event) {
      let qbit = parseInt(event.currentTarget.getAttribute("qbit"));
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let gateName = event.dataTransfer.getData("gateName");
      let originalQbit = parseInt(event.dataTransfer.getData("originalQbit"));
      let originalQbit2 = parseInt(event.dataTransfer.getData("originalQbit2"));
      let originalControls = [];
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      
      let draggedQbit = null;
      if (event.dataTransfer.types.includes("dragged-qbit")) {
        draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      }
      
      // add the new gate mandatory params
      let dto = { step: step, qbit: qbit, name: gateName };
      
      // add optional params, notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("originalqbit2")) {
        let qbit2 = parseInt(event.dataTransfer.getData("originalQbit2"));
        dto["qbit2"] = qbit2;
      }
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
        originalQbit,
        originalQbit2,
        ...originalControls,
      ].filter((qbit) => isDefined(qbit));

      // In case the drag event was initiated from a controlled gate stub
      if (step != originalStep) {
        if (dragOrigin == "stub") {
          alert(
            "The control qbit must be positioned in the same row with target qbit!"
          );
          this.handleDragLeave();
          return;
        }
        existingQbits = [];
      }

      if (gateName.includes("ctrl-")) {
        if (!dto["controls"]){
          dto["controls"] = [];
        }
        let success = this.repositionControlledGate(dto, dragOrigin, qbit, step, originalQbit, originalStep, existingQbits);
        if (!success) return;
      } else if (
        gateName.includes("swap") ||
        gateName == "xx" ||
        gateName == "yy" ||
        gateName == "zz"
      ) {
        let success = this.repositionTwoTargetQubitsGate(dto, qbit, step, originalQbit, originalQbit2, originalStep, existingQbits, draggedQbit);
        if (!success) return;
      }
      
      // At this point all qbits have been asigned value, will
      // start by removing the old gate and then will insert a new one

      // step1 - remove original gate if drag event started from a cell
      // in editor (not originating from gates pallete)
      if (isDefined(originalQbit) && isDefined(originalStep)) {
        let dto = { step: originalStep, qbit: originalQbit };
        this.removeGateFromCircuit(dto);
      }
      
      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    placeControlledGate: function (
      dto,
      qbit,
      step,
      originalStep,
      existingQbits
    ) {
      // If this was a controlled gate and was draged from the gate panel than the control bit is not assigned
      if (dto["controls"].length == 0) {
        if (!this.findBestFitForControlledGate(dto, qbit, step, existingQbits)) {
          return false;
        }
      }

      let proposedQbits = [
        dto["qbit"],
        dto["qbit2"],
        ...dto["controls"],
      ].filter((qbit) => isDefined(qbit));

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
        if (step != originalStep) {
          //  Try to Reposition the control bit in case dragging from one step to another
          if (!this.findBestFitForControlledGate(dto, qbit, step, existingQbits)) {
            return false;
          }
        } else {
          alert(
            "At least a gate already exists in the qbits ranging between the proposed target and proposed control!"
          );
          return false;
        }
      }
      return true;
    },
    repositionControlledGate: function (dto, dragOrigin, qbit, step, originalQbit, originalStep, existingQbits) {
      
      //TODO: fix
      if (dragOrigin == "stub") {
        dto["qbit"] = originalQbit;
        dto["control"] = qbit;
      } else {
        if (dto["control"] == dto["qbit"]) dto["control"] = null;
      }
      
      let success = this.placeControlledGate(
        dto,
        qbit,
        step,
        originalStep,
        existingQbits
      );

      if (!success){
        this.handleDragLeave();
      }

      return success;
    },
    findBestFitForControlledGate: function (dto, qbit, step, existingQbits) {
      // TODO:fix
      dto["controls"] = [parseInt(qbit) - 1];
      let proposedQbits = [
        dto["qbit"],
        dto["qbit2"],
        ...dto["controls"],
      ].filter((qbit) => isDefined(qbit));
      if (
        (dto["controls"][0] < 0) || seatsAreTaken(this.$store.state.circuitEditorModule, existingQbits, proposedQbits, step)
      ) {
        // TODO:fix
        dto["controls"] = [parseInt(qbit) + 1];
        proposedQbits = [
          dto["qbit"],
          dto["qbit2"],
          ...dto["controls"],
        ].filter((qbit) => isDefined(qbit));
        if (seatsAreTaken(this.$store.state.circuitEditorModule, existingQbits, proposedQbits, step)
        ) {
          alert("Cannot allocate controll qubit!");
          return false;
        }
      }
      return true;
    },
    repositionToffoliGate: function (dto, qbit, step, originalQbit, originalStep, existingQbits, originalControl, originalControl2, draggedQbit) {

      if (draggedQbit != null) {
        if (draggedQbit == originalControl) {
          dto["control"] = qbit;
          dto["qbit"] = originalQbit;
        } else if (draggedQbit == originalControl2) {
          dto["control2"] = qbit;
          dto["qbit"] = originalQbit;
        } else {
          if (qbit == originalControl) dto["control"] = null;
          else if (qbit == originalControl2) dto["control2"] = null;
        }
      }

      let success = this.placeToffoliGate(
        dto,
        qbit,
        step,
        originalStep,
        existingQbits
      );
      
      if (!success){
        this.handleDragLeave();
      }

      return success;
    },
    placeToffoliGate: function (dto, qbit, step, originalStep, existingQbits) {
      // If gate was draged from the gate panel than the control bits are not assigned
      if (dto["control"] == null || dto["control2"] == null) {
        if (!this.findBestFitForToffoliGate(dto, qbit, step, existingQbits)) {
          return false;
        }
      }

      let proposedQbits = [
        dto["qbit"],
        dto["qbit2"],
        dto["control"],
        dto["control2"],
      ].filter((qbit) => isDefined(qbit));

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
        //  Try to reposition the control bits if necessary in case dragging from one step to another
        if (step != originalStep) {
          if (!this.findBestFitForToffoliGate(dto, qbit, step, existingQbits)) {
            return false;
          }
        } else {
          alert(
            "At least a gate already exists in the qbits ranging between the proposed target and proposed controls!"
          );
          return false;
        }
      }
      return true;
    },
    findBestFitForToffoliGate: function (dto, qbit, step, existingQbits) {
      dto["qbit"] = parseInt(qbit);
      dto["control"] = dto["qbit"] - 1;
      dto["control2"] = dto["qbit"] - 2;
      let proposedQbits = [
        dto["qbit"],
        dto["control"],
        dto["control2"],
      ].filter((qbit) => isDefined(qbit));
      if (
        (dto["control"] < 0) || (dto["control2"] < 0) || seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
        dto["control"] = dto["qbit"] - 1;
        dto["control2"] = dto["qbit"] + 1;
        proposedQbits = [
          dto["qbit"],
          dto["control"],
          dto["control2"],
        ].filter((qbit) => isDefined(qbit));
        if (
          (dto["control"] < 0) || seatsAreTaken(this.$store.state.circuitEditorModule, existingQbits, proposedQbits, step)
        ) {
          dto["control"] = dto["qbit"] + 1;
          dto["control2"] = dto["qbit"] + 2;
          proposedQbits = [
          dto["qbit"],
          dto["control"],
          dto["control2"],
        ].filter((qbit) => isDefined(qbit));
          if (
            seatsAreTaken(this.$store.state.circuitEditorModule, existingQbits, proposedQbits, step)
          ) {
            alert(
              "Cannot allocate both two control qubits!"
            );
            return false;
          }
        }
      }
      return true;
    },
    repositionTwoTargetQubitsGate: function(dto, qbit, step, originalQbit, originalQbit2, originalStep, existingQbits, draggedQbit){

      if (
        (draggedQbit == originalQbit2 && qbit == originalQbit) ||
        (draggedQbit == originalQbit && qbit == originalQbit2)
      ) {
          dto["qbit"] = qbit;
          dto["qbit2"] = null;
      } else if (draggedQbit != null) {
        if (draggedQbit == originalQbit) {
          dto["qbit"] = qbit;
          dto["qbit2"] = originalQbit2;
        } else if (draggedQbit == originalQbit2) {
          dto["qbit"] = originalQbit;
          dto["qbit2"] = qbit;
        }
      } else {
        dto["qbit"] = qbit;
      }

      let success = this.placeTwoTargetQubitsGate(
        dto,
        qbit,
        step,
        originalStep,
        existingQbits
      );

      if (!success){
        this.handleDragLeave();
      }
      
      return success;
    },
    placeTwoTargetQubitsGate: function (
      dto,
      qbit,
      step,
      originalStep,
      existingQbits
    ) {
      if (dto["qbit2"] == null) {
        if (!this.findBestFitForTwoTargetQubitsGate(dto, qbit, step, existingQbits)) {
          return false;
        }
      }

      let proposedQbits = [
        dto["qbit"],
        dto["qbit2"],
      ].filter((qbit) => isDefined(qbit));

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
        //  Try to reposition the target bits if necessary in case dragging from one step to another
        if (step != originalStep) {
          if (!this.findBestFitForTwoTargetQubitsGate(dto, qbit, step, existingQbits)) {
            return false;
          }
        } else {
          alert(
            "At least a gate already exists in the qbits ranging between the proposed target qubits!"
          );
          return false;
        }
      }

      return true;
    },
    findBestFitForTwoTargetQubitsGate: function (dto, qbit, step, existingQbits) {
      dto["qbit"] = parseInt(qbit);
      dto["qbit2"] = dto["qbit"] + 1;
      let proposedQbits = [dto["qbit"], dto["qbit2"]];
      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
          dto["qbit2"] = dto["qbit"] - 1;
          if (dto["qbit2"] < 0) {
            alert("Cannot allocate second target qubit for this gate!");
            return false;
          }
          let proposedQbits = [dto["qbit"], dto["qbit2"]];
          if (
            seatsAreTaken(
              this.$store.state.circuitEditorModule,
              existingQbits,
              proposedQbits,
              step
            )
          ) {
            alert(
              "At least a gate already exists in the qbits ranging between the proposed target qubits!"
            );
            return false;
          }
      }
      return true;
    },
    repositionFredkinGate: function(dto, qbit, step, originalQbit, originalQbit2, originalStep, existingQbits, draggedQbit){
      if (
          (draggedQbit == originalQbit2 && qbit == originalQbit) ||
          (draggedQbit == originalQbit && qbit == originalQbit2)
        ) {
        dto["qbit"] = qbit;
        dto["qbit2"] = null;
      } else if (draggedQbit != null) {
        if (draggedQbit == originalQbit) {
          if (dto["qbit2"] == dto["qbit"]) dto["qbit2"] = null;
          if (dto["control"] == dto["qbit"]) dto["control"] = null;
        } else if (draggedQbit == originalQbit2) {
          dto["qbit2"] = qbit;
          dto["qbit"] = originalQbit;
          if (dto["qbit"] == dto["qbit2"]) dto["qbit2"] = null;
          if (dto["control"] == dto["qbit2"]) dto["control"] = null;
        } else {
          dto["control"] = qbit;
          dto["qbit"] = originalQbit;
          dto["qbit2"] = originalQbit2;
        }
      }

      let success = this.placeFredkinGate(
        dto,
        qbit,
        step,
        originalStep,
        existingQbits
      );

      if (!success){
        this.handleDragLeave();
      }

      return success;
    },
    placeFredkinGate: function (dto, qbit, step, originalStep, existingQbits) {
      // If gate was draged from the gate panel than the control bits are not assigned
      if (dto["qbit2"] == null || dto["control"] == null) {
        if (!this.findBestFitForFredkinGate(dto, qbit, step, existingQbits)) {
          return false;
        }
      }

      let proposedQbits = [
        dto["qbit"],
        dto["qbit2"],
        dto["control"],
      ].filter((qbit) => isDefined(qbit));

      if (
        seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
        //  Try to reposition the control bits if necessary in case dragging from one step to another
        if (step != originalStep) {
          if (!this.findBestFitForFredkinGate(dto, qbit, step, existingQbits)) {
            return false;
          }
        } else {
          alert(
            "At least a gate already exists in the qbits ranging between the proposed target and controls!"
          );
          return false;
        }
      }
      return true;
    },
    findBestFitForFredkinGate: function (dto, qbit, step, existingQbits) {
      dto["qbit"] = parseInt(qbit);
      dto["qbit2"] = dto["qbit"] - 1;
      dto["control"] = dto["qbit"] - 2;
      let proposedQbits = [
        dto["qbit"],
        dto["qbit2"],
        dto["control"],
      ].filter((qbit) => isDefined(qbit));
      if (
        (dto["qbit2"] < 0) || (dto["control"] < 0) || seatsAreTaken(
          this.$store.state.circuitEditorModule,
          existingQbits,
          proposedQbits,
          step
        )
      ) {
        dto["qbit2"] = dto["qbit"] + 1;
        dto["control"] = dto["qbit"] - 1;
        proposedQbits = [
          dto["qbit"],
          dto["qbit2"],
          dto["control"],
        ].filter((qbit) => isDefined(qbit));
        if (
          (dto["control"] < 0) || seatsAreTaken(this.$store.state.circuitEditorModule, existingQbits, proposedQbits, step)
        ) {
          dto["qbit2"] = dto["qbit"] + 1;
          dto["control"] = dto["qbit"] + 2;
          proposedQbits = [ 
          dto["qbit"],
          dto["qbit2"],
          dto["control"],
        ].filter((qbit) => isDefined(qbit));
          if (
            seatsAreTaken(this.$store.state.circuitEditorModule, existingQbits, proposedQbits, step)
          ) {
            alert(
              "Cannot allocate both the control and the target bit!"
            );
            return false;
          }
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