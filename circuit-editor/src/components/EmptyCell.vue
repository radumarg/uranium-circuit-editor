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
import { getAggregatedGatesTargets, handleSelectEvent, isDefined, getClosestControlledGates, stepContainsGates } from "../store/modules/editorHelper.js";
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
      "insertGatesInCircuit",
      "removeGateFromCircuit",
      "removeBarrierFromCircuit",
      "removeQbitFromCircuit",
      "removeStepFromCircuit",
      "refreshCircuit"
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
      let dto = { targets: [this.qrow] };
      this.removeQbitFromCircuit(dto);
      this.$refs["modal-dialog"].hide();
      this.refreshCircuit();
    },
    removeStep: function () {
      let dto = { step: this.step };
      this.removeStepFromCircuit(dto);
      this.$refs["modal-dialog"].hide();
      this.refreshCircuit();
    },
    handleDropEvent: function (event) {

      let step = parseInt(event.currentTarget.getAttribute("step"));
      let circuitState = this.$store.state.circuitEditorModule[window.currentCircuitId];
      let gateName = event.dataTransfer.getData("gateName");

      let draggedQbit = null;
      if (event.dataTransfer.types.includes("dragged-qbit")) {
        draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      }

      let dragOrigin = event.dataTransfer.getData("drag-origin");
      if (!dragOrigin){
        // handles the case where we are dragging by accident the gates pallete 
        // tab title, don't know how to disable the drag action for these
        this.handleDragLeave();
        return;
      }
      
      if (event.shiftKey &&
         (isDefined(draggedQbit) || dragOrigin == "barrier")
        ) {
        // shift key is pressed and draggedQbit not null means
        // we are not doing drag & drop from the gates pallete
        if (dragOrigin == "stub") {
          let originalStep = parseInt(
            event.dataTransfer.getData("originalStep")
          );
          if (step != originalStep) {
            alert("To duplicate a gate drag a target qubit not control qubit!");
            this.handleDragLeave();
          } else {
            this.addNewControlToControlledGate(event);
          }
        } else if (dragOrigin == "barrier") {
          if (stepContainsGates(circuitState, step)){
            alert("Cannot add barrier here, this step already contains some gates.");
            this.handleDragLeave();
          } else {
            this.addNewGateToCircuit(event);
          }
        } else {
          this.addNewGateToCircuit(event);
        }
      } else if (event.altKey && isDefined(draggedQbit)) {
        // alt key is pressed and draggedQbit not null means
        // we are not doing drag & drop from the gates pallete
        this.addNewGateArray(event);
      } else {
        if (dragOrigin == "control") {
          this.findClosestGateAndAddNewControl(event);
        } else {
          if (gateName == "barrier" && stepContainsGates(circuitState, step)){
            alert("Cannot add barrier here, this step already contains some gates.");
            this.handleDragLeave();
          } else {
            this.removeDraggedGateAndAddNewGateToCircuit(event);
          }
        }
      }
    },
    findClosestGateAndAddNewControl: function (event) {
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let circuitState = this.$store.state.circuitEditorModule[window.currentCircuitId];
      let closestGates = getClosestControlledGates(circuitState, step, dropQbit);
      if (closestGates.length >= 2) {
        alert(
          "There is no unique closest gate to attach control to. Please use the gate popup dialog in order to add a new control to your desired gate."
        );
        this.handleDragLeave();
      } else if (closestGates.length == 1) {
        let closestGate = closestGates[0];
        let controlState = event.dataTransfer.getData("controlState");

        let controls = [];
        let controlstates = [];
        if (Object.prototype.hasOwnProperty.call(closestGate, "controls")) {
          for (let i = 0; i < closestGate.controls.length; i++) {
            controls.push(closestGate.controls[i].target);
            controlstates.push(closestGate.controls[i].state);
          }
        }
        controls.push(dropQbit);
        controlstates.push(controlState);

        let dto = { step: step, name: closestGate.name, controls: [...controls], controlstates: [...controlstates] };

        if (closestGate["targets"]) {
          let targets = closestGate.targets;
          dto["targets"] = [...targets];
        }
        if (closestGate["gates"]) {
          let gates = closestGate.gates;
          dto["gates"] = JSON.parse(JSON.stringify(gates));
        }
      
        if (isDefined(closestGate["phi"])) {
          let phi = closestGate.phi;
          dto["phi"] = phi;
        }
        if (isDefined(closestGate.theta)) {
          let theta = closestGate.theta;
          dto["theta"] = theta;
        }
        if (isDefined(closestGate["lambda"])) {
          let lambda = closestGate.lambda;
          dto["lambda"] = lambda;
        }
        if (closestGate["root"]) {
          let root = closestGate.root;
          dto["root"] = root;
        }
        if (closestGate["circuit_id"]) {
          let circuitId = closestGate.circuit_id;
          dto["circuit_id"] = circuitId;
        }
        if (closestGate["circuit_abbreviation"]) {
          let circuitAbbreviation = closestGate.circuit_abbreviation;
          dto["circuit_abbreviation"] = circuitAbbreviation;
        }
        if (isDefined(closestGate["circuit_power"])) {
          let circuitPower = closestGate.circuit_power;
          dto["circuit_power"] = circuitPower;
        }
        if (isDefined(closestGate["targets_expression"])) {
          let targetsExpression = closestGate.targets_expression;
          dto["targets_expression"] = targetsExpression;
        }

        this.removeGateFromCircuit(dto);
        this.insertGateInCircuit(dto);
      } else {
        this.handleDragLeave();
      }
    },
    addNewControlToControlledGate: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let targets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let draggedQubit = parseInt(event.dataTransfer.getData("dragged-qbit"));

      // add the new gate mandatory params
      let dto = { step: step, targets: [...targets], name: gateName };

      dto["controls"] = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlIndex = dto["controls"].indexOf(draggedQubit);
      dto["controls"].push(dropQbit);

      dto["controlstates"] = event.dataTransfer.getData("controlstates").split(",");
      dto["controlstates"].push(dto["controlstates"][controlIndex]);
      
      if (event.dataTransfer.types.includes("gates")) {
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        dto["gates"] = JSON.parse(JSON.stringify(gates));
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
      if (event.dataTransfer.types.includes("circuit_id")) {
        let circuitId = event.dataTransfer.getData("circuit_id");
        dto["circuit_id"] = circuitId;
      }
      if (event.dataTransfer.types.includes("circuit_abbreviation")) {
        let circuitAbbreviation = event.dataTransfer.getData("circuit_abbreviation");
        dto["circuit_abbreviation"] = circuitAbbreviation;
      }
      if (event.dataTransfer.types.includes("circuit_power")) {
        let circuitPower = event.dataTransfer.getData("circuit_power");
        dto["circuit_power"] = circuitPower;
      }
      if (event.dataTransfer.types.includes("targets_expression")) {
        let targetsExpression = event.dataTransfer.getData("targets_expression");
        dto["targets_expression"] = targetsExpression;
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
      let qbitDelta = draggedQbit - qbit;

      // add the new gate mandatory params
      let dto = { step: step, targets: originalTargets.map(function(value) { return value - qbitDelta; }), controls: [], name: gateName, };

      // add optional params, notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("originalcontrols")) {
        let controls =  JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
        dto["controls"] = controls.map( function(value) { return value - qbitDelta; } );
      }
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstates = event.dataTransfer.getData("controlstates");
        if (controlstates) {
          dto["controlstates"] = controlstates.split(",");
        }
      }
      if (event.dataTransfer.types.includes("gates")) {
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        for (let i = 0; i < gates.length; i++) {
          gates[i].targets = gates[i].targets.map( function(value) { return value - qbitDelta; } );
        }
        dto["gates"] = JSON.parse(JSON.stringify(gates));
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
        dto["bit"] = qbit;
      }
      if (event.dataTransfer.types.includes("circuit_id")) {
        let circuitId = event.dataTransfer.getData("circuit_id");
        dto["circuit_id"] = circuitId;
      }
      if (event.dataTransfer.types.includes("circuit_abbreviation")) {
        let circuitAbbreviation = event.dataTransfer.getData("circuit_abbreviation");
        dto["circuit_abbreviation"] = circuitAbbreviation;
      }
      if (event.dataTransfer.types.includes("circuit_power")) {
        let circuitPower = event.dataTransfer.getData("circuit_power");
        dto["circuit_power"] = circuitPower;
      }
      if (event.dataTransfer.types.includes("targets_expression")) {
        let targetsExpression = event.dataTransfer.getData("targets_expression");
        dto["targets_expression"] = targetsExpression;
      }

      let proposedQbits = [...dto["targets"], ...dto["controls"], ...getAggregatedGatesTargets(dto)].filter(x => isDefined(x));

      if (proposedQbits.some(x => x < 0)) {
        alert("Cannot add this gate here, some of the propoesd qubits are negative!");
        this.handleDragLeave();
        return;
      }

      if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, step)) {
        alert("Cannot add this gate here, not all required qubits are available!");
        this.handleDragLeave();
        return;
      }

      this.insertGateInCircuit(dto);
    },
    addNewGateArray: function (event) {

      let dragOrigin = event.dataTransfer.getData("drag-origin");
      if (dragOrigin == "stub"){
        this.handleDragLeave();
        return;
      }

      let qbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let gateName = event.dataTransfer.getData("gateName");

      let dto = { step: step, targets: [], controls: [], name: gateName, };

      if (event.dataTransfer.types.includes("originalcontrols")) {
        let controls =  JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
        dto["controls"] = controls;
      }
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstates = event.dataTransfer.getData("controlstates");
        if (controlstates) {
          dto["controlstates"] = controlstates.split(",");
        }
      }
      if (event.dataTransfer.types.includes("gates")) {
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        dto["gates"] = JSON.parse(JSON.stringify(gates));
      } else {
        dto["targets"] = [...originalTargets];
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
        dto["bit"] = qbit;
      }
      if (event.dataTransfer.types.includes("circuit_id")) {
        let circuitId = event.dataTransfer.getData("circuit_id");
        dto["circuit_id"] = circuitId;
      }
      if (event.dataTransfer.types.includes("circuit_abbreviation")) {
        let circuitAbbreviation = event.dataTransfer.getData("circuit_abbreviation");
        dto["circuit_abbreviation"] = circuitAbbreviation;
      }
      if (event.dataTransfer.types.includes("circuit_power")) {
        let circuitPower = event.dataTransfer.getData("circuit_power");
        dto["circuit_power"] = circuitPower;
      }
      if (event.dataTransfer.types.includes("targets_expression")) {
        let targetsExpression = event.dataTransfer.getData("targets_expression");
        dto["targets_expression"] = targetsExpression;
      }

      let dtos = [];

      // replicate gate in a vertical or horizontal array
      if (step == originalStep) {
        if (originalTargets.length > 1 || dto["controls"].length > 0) {
          if (gateName == "aggregate") {
            alert("Only single qubit gates can be replicated in a vertical array using this gesture.");
          } else {
            alert("Only single qubit gates can be replicated in a vertical array using this gesture. You might want to use the replicate gate dialog instead.");
          }
        } else  {
          let currentQubit = Math.min(qbit, originalTargets[0]);
          let lastQubit = Math.max(qbit, originalTargets[0]);
          while (currentQubit <= lastQubit){
            if (!seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], [currentQubit], step)) {
              let dtoNew = JSON.parse(JSON.stringify(dto));
              dtoNew["targets"] = [currentQubit];
              dtos.push(dtoNew);
            }
            currentQubit += 1;
          }
        }
      } else if (originalTargets.includes(qbit)) {
        let currentStep = Math.min(step, originalStep);
        let lastStep = Math.max(step, originalStep);
        while (currentStep <= lastStep){
          if (currentStep != originalStep){
            let proposedQbits = [...dto["targets"], ...dto["controls"], ...getAggregatedGatesTargets(dto)].filter(x => isDefined(x));
            if (!seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, currentStep)) {
              let dtoNew = JSON.parse(JSON.stringify(dto));
              dtoNew.step = currentStep;
              dtos.push(dtoNew);
            }
          }
          currentStep += 1;
        }
      }

      if (dtos.length > 0){
        this.insertGatesInCircuit({"dtos": dtos, "existingStep": null, "existingQbit": null});
      } else {
        this.handleDragLeave();
      }
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
      let delta = 0;

      if (event.dataTransfer.types.includes("dragged-qbit")) {
        draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
        delta = qbit - draggedQbit;
      }

      // add the new gate mandatory params
      let dto = { step: step, targets: [qbit], name: gateName, controls: [], controlstates: [] };
      
      if (dragOrigin == "stub") {
        dto["targets"] = originalTargets;
      } else if (dragOrigin && dragOrigin != "gates-pallete") {
        if (step == originalStep){
          if (gateName == "qft" || gateName == "qft-dagger") {
            let min = Math.min(...originalTargets, qbit);
            let max = Math.max(...originalTargets, qbit);
            dto["targets"] = Array.from({length: max - min + 1}, (_, i) => i + min);
          } else {
            dto["targets"] = originalTargets.map(function(item) { return item == draggedQbit ? qbit : item; });
          }
        } else {
          dto["targets"] = originalTargets.map(function(value) {return value + delta;}).filter(val => val >= 0);
        }
      }
      // notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("originalcontrols")) {
        originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
        if (step == originalStep){
          if (dragOrigin == "stub"){
            dto["controls"] = originalControls.map(function(item) { return item == draggedQbit ? qbit : item; });
          } else {
            dto["controls"] = [...originalControls];
          }
        } else {
          if (dragOrigin == "stub"){
            dto["controls"] = originalControls.map(function(item) { return item == draggedQbit ? qbit : item; });
          } else {
            dto["controls"] = originalControls.map(val => val + delta).filter(val => val >= 0);
          }
        }
      }
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstates = event.dataTransfer.getData("controlstates");
        if (controlstates) {
          dto["controlstates"] = controlstates.split(",");
        }
      }

      let originalAggregatedGateTargets = [];
      if (event.dataTransfer.types.includes("gates")) {
        dto["gates"] = [];
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        for (let i = 0; i < gates.length; i++) {
          let gate = gates[i];
          for (let j = 0; j < gate.targets.length; j++) {
            let target = gate.targets[j];
            originalAggregatedGateTargets.push(target);
            if (step != originalStep){
              gate.targets[j] += delta;
            } else if (draggedQbit == target) {
              gate.targets[j] = qbit;
            }
          }
          dto["gates"].push(JSON.parse(JSON.stringify(gate)));
        }
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
        // in case we relocate the gate, it makes much
        //  more sense to assign bit to the new qbit
        dto["bit"] = qbit;
      }
      if (event.dataTransfer.types.includes("circuit_id")) {
        let circuitId = event.dataTransfer.getData("circuit_id");
        dto["circuit_id"] = circuitId;
      }
      if (event.dataTransfer.types.includes("circuit_abbreviation")) {
        let circuitAbbreviation = event.dataTransfer.getData("circuit_abbreviation");
        dto["circuit_abbreviation"] = circuitAbbreviation;
      }
      if (event.dataTransfer.types.includes("circuit_power")) {
        let circuitPower = event.dataTransfer.getData("circuit_power");
        dto["circuit_power"] = circuitPower;
      }
      if (event.dataTransfer.types.includes("targets_expression")) {
        let targetsExpression = event.dataTransfer.getData("targets_expression");
        dto["targets_expression"] = targetsExpression;
      }

      let existingQbits = [
        ...originalTargets,
        ...originalControls,
        ...originalAggregatedGateTargets
      ];
      
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
        success = this.maybeAdjustGate(gateName, dto, qbit, step, originalStep, existingQbits); 
      }
      
      if (success && dto["gates"]) {
        let aggregatedGatesTargets = getAggregatedGatesTargets(dto);
 
        if (aggregatedGatesTargets.some(x => x < 0)) {
          alert("Negative target qubits not allowed!")
          success = false;
        }
      }
      
      if (success) {
        // At this point all targets have been asigned value, will
        // start by removing the old gate and then will insert a new one

        // step1 - remove original gate if drag event started from a cell
        // in editor (not originating from gates pallete)
        if ((originalTargets.length > 0 || gateName == "barrier") && isDefined(originalStep)) {
          if (gateName == "barrier") {
            let dtoOriginal = { step: originalStep }
            this.removeBarrierFromCircuit(dtoOriginal);
          } else {
            let dtoOriginal = { step: originalStep, targets: [...originalTargets] }
            this.removeGateFromCircuit(dtoOriginal);
          }
        }

        // step2 - add the new gate to the circuit
        this.insertGateInCircuit(dto);
      } else {
        // remove red line shown on mouse over event
        this.handleDragLeave();
      }
    },
    maybeAdjustGate: function (gateName, dto, qbit, step, originalStep, existingQbits) {

      let success = true;

      if ((gateName.includes("swap") ||
          gateName == "xx" ||
          gateName == "yy" ||
          gateName == "zz" ||
          gateName == "xy" ||
          gateName == "cross-resonance" ||
          gateName == "cross-resonance-dagger" ||
          gateName == "molmer-sorensen" ||
          gateName == "molmer-sorensen-dagger" ||
          gateName == "magic" ||
          gateName == "magic-dagger" ||
          gateName == "canonical" ||
          gateName == "givens" ||
          gateName == "berkeley" ||
          gateName == "berkeley-dagger" ||
          gateName == "w" ||
          gateName == "a" ||
          gateName == "ecp" ||
          gateName == "ecp-dagger"
        ) && dto["targets"].length == 1) {
        success = this.tryAppendingSecondTargetQubit(dto, qbit, step, existingQbits);
      }

      let proposedQbits = [...dto["targets"], ...dto["controls"], ...getAggregatedGatesTargets(dto)].filter(x => isDefined(x));
      
      if (success && seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, step, existingQbits)){
        if (step != originalStep) {
          alert("There are not enough free seats in order to move the gate here.");
        } else {
          alert("Some of the requested qubits are already occupied by another gate(s)! Note that since you have dragged the gate within the same step\
the action which was attempted was to adjust the dragged qubit not to move the gate to a new position"); 
        }
        success = false;
      }

      return success;
    },
    tryAppendingSecondTargetQubit(dto, qbit, step, existingQbits) {
      dto["targets"] = [qbit, qbit + 1];
      let proposedQbits = [...dto["targets"], ...dto["controls"], ...getAggregatedGatesTargets(dto)].filter(x => isDefined(x));
      if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, step, existingQbits)) {
        if (qbit == 0) {
          alert("Cannot allocate second target qubit for this gate!");
          return false;
        }
        dto["targets"] = [qbit, qbit - 1];
        proposedQbits = [...dto["targets"], ...dto["controls"], ...getAggregatedGatesTargets(dto)].filter(x => isDefined(x));
        if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, step, existingQbits)) {
          alert("Cannot allocate second target qubit for this gate!");
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
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
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