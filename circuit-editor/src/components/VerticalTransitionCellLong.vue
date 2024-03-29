<template>
  <div :step="step" :qrow="qrow" :targets="targets" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width: 100%; height: 100%; max-width: 40px; max-height: 40px; min-width: 40px; min-height: 40px;"/>
  </div>
</template>

<script>
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { gateHasVariableTargets, getClosestControlledGates, getMatchingTargets, isDefined } from "../store/modules/editorHelper.js";
import { arraysAreEqual } from "../store/modules/javaScriptUtils.js";
import { mapActions } from 'vuex';
export default {
  name: "VerticalTransitionCellLong",
  props: {
    'name': String,
    'step': Number,
    'qrow': Number,
    'targets': Array,
    'controls': Array,
    'id': String,
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
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDropEvent: function (event) {
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let gateName = event.dataTransfer.getData("gateName");
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalGates = event.dataTransfer.getData("gates") ? JSON.parse(event.dataTransfer.getData("gates")) : [];
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let circuitState = this.$store.state.circuitEditorModule[window.currentCircuitId];
      let closestGates = getClosestControlledGates(circuitState, step, dropQbit);
      let closestGateTargets = closestGates[0].targets ? closestGates[0].targets : [];
      let closestGateGates = closestGates[0].gates ? closestGates[0].gates : [];
      
      if (step == originalStep && 
          // make sure we will not modify a different gate than the one we are dragging from
          (
            (closestGateGates.length > 0 && JSON.stringify(closestGateGates) == JSON.stringify(originalGates)) || 
            (closestGateGates.length == 0 && arraysAreEqual(closestGateTargets, originalTargets))
          )
      ) {
        let qmin = Math.min(dropQbit, ...originalTargets);
        let qmax = Math.max(dropQbit, ...originalTargets);
        if (dragOrigin == "gate" && gateName == "sn") {
          let newTargets = Array.from({length: qmax - qmin + 1}, (_, i) => i + qmin);
          this.repositionGate(event, newTargets);
        } else if (dragOrigin == "gate" && gateName == "circuit") {
          let delta = dropQbit - draggedQbit;
          let newTargets = originalTargets.map(function(value) { return value + delta; });
          if (newTargets.some(x => x < 0)) {
              alert("Negative target qubits not allowed.");
              this.handleDragLeave();
          } else {
            this.repositionGate(event, newTargets);
          }
        } else if (dragOrigin == "gate" && gateHasVariableTargets(gateName)) {
          let targetsExpression = event.dataTransfer.getData("targets_expression");
          let newTargets = getMatchingTargets(qmin, qmax, targetsExpression);
          if (newTargets.length > 0) {
            this.repositionGate(event, newTargets);
          } else {
            alert("The list of matching tragets is empty.");
            this.handleDragLeave();
          }
        } else if (event.shiftKey) {
          if (originalControls.includes(draggedQbit)){
            this.addNewControl(event);
          } else {
            if (closestGateGates.length > 0) {
              this.addNewAggregatedGate(event);
            } else {
              this.handleDragLeave();
            }
          }
        } else {
          if (originalControls.includes(draggedQbit)){
            this.repositionControl(event);
          } else if (originalTargets.includes(draggedQbit)) {
            this.repositionTarget(event);
          } else {
            this.handleDragLeave();
          }
        }
      } else if (dragOrigin == "control") {
        this.findDropGateAndAddNewControl(event);
      } else {
        this.handleDragLeave();
      }
    },
    addNewControl: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlstates = event.dataTransfer.getData("controlstates").split(",");
      let draggedQubit = parseInt(event.dataTransfer.getData("dragged-qbit"));

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "targets": originalTargets, "controls": originalControls, "controlstates": controlstates};

      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let controlIndex = originalControls.indexOf(draggedQubit);

      dto["controls"].push(dropQbit);
      dto["controlstates"].push(controlstates[controlIndex]);

      if (event.dataTransfer.types.includes("gates")) {
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        dto["gates"] = JSON.parse(JSON.stringify(gates));
      }

      // add optional params, notice lower case needed for types.includes
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

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    addNewAggregatedGate: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlstates = event.dataTransfer.getData("controlstates").split(",");
      let gates = JSON.parse(event.dataTransfer.getData("gates"));
      let draggedQubit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "gates": gates, "targets": originalTargets, "controls": originalControls, "controlstates": controlstates};

      for (let i = 0; i < dto["gates"].length; i++) {
        let gate = dto["gates"][i];

        if (gate.targets.includes(draggedQubit)) {
          let aggregatedGate = { "name": gate.name, targets: [dropQbit] };

          if (isDefined(gate.phi)) {
            let phi = gate.phi;
            aggregatedGate["phi"] = phi;
          }
          if (isDefined(gate.theta)) {
            let theta = gate.theta;
            aggregatedGate["theta"] = theta;
          }
          if (isDefined(gate.lambda)) {
            let lambda = gate.lambda;
            aggregatedGate["lambda"] = lambda;
          }
          if (gate.root) {
            let root = gate.root;
            dto["root"] = root;
          }

          dto["gates"].push(aggregatedGate);
          break;
        }
      }

      // step1 - remove original gate if drag event started from a cell
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    repositionControl: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlstates = event.dataTransfer.getData("controlstates").split(",");
      let draggedQubit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "targets": originalTargets, "controls": [...originalControls], "controlstates": controlstates};

      // adjust dto based on drop location
      let controlIndex = originalControls.indexOf(draggedQubit);
      dto["controls"][controlIndex] = dropQbit;

      if (event.dataTransfer.types.includes("gates")) {
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        dto["gates"] = JSON.parse(JSON.stringify(gates));
      }

      // add optional params, notice lower case needed for types.includes
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

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    repositionTarget: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let draggedQubit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      let controlstates = [];
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstatesData = event.dataTransfer.getData("controlstates");
        if (controlstatesData) {
          controlstates = controlstatesData.split(",");
        }
      }

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "targets": [...originalTargets], "controls": originalControls, "controlstates": controlstates};

      // adjust dto based on drop location
      let targetIndex = originalTargets.indexOf(draggedQubit);
      dto["targets"][targetIndex] = dropQbit;

      if (event.dataTransfer.types.includes("gates")) {
        let gates = JSON.parse(event.dataTransfer.getData("gates"));
        for (let i = 0; i < gates.length; i++) {
          let aggregatedGate = gates[i];
          for (let j = 0; j < aggregatedGate.targets.length; j++) {
            let target = aggregatedGate.targets[j];
            if (target == draggedQubit) {
              aggregatedGate.targets[j] = dropQbit;
              break;
            }
          }
        }
        dto["gates"] = [...gates];
      }

      // add optional params, notice lower case needed for types.includes
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

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    repositionGate: function (event, newTargets) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlstates = event.dataTransfer.getData("controlstates").split(",");

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "targets": [...newTargets], "controls": originalControls, "controlstates": controlstates };

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

      // step1 - remove original gate if drag event started from a cell
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    findDropGateAndAddNewControl: function (event) {
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let circuitState = this.$store.state.circuitEditorModule[window.currentCircuitId];
      let closestGates = getClosestControlledGates(circuitState, step, dropQbit);
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
      if (closestGate["circuit_power"] != null && closestGate["circuit_power"] != undefined) {
        let circuitPower = closestGate["circuit_power"];
        dto["circuit_power"] = circuitPower;
      }
      if (closestGate["targets_expression"]) {
        let targetsExpression = closestGate.targets_expression;
        dto["targets_expression"] = targetsExpression;
      }

      this.removeGateFromCircuit(dto);
      this.insertGateInCircuit(dto);
    },
    handleDragOver() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/vertical-red-line-long.svg");
    },
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/" + this.name + ".svg");
      } else {
        image.src = require("../assets/blue-gates/" + this.name + ".svg");
      }
    },
  }
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>