<template>
  <div :step="step" :qrow="qrow" :qbit="qbit" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width: 100%; height: 100%; max-width: 40px; max-height: 40px; min-width: 40px; min-height: 40px;"/>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
export default {
  name: "VerticalTransitionCellLong",
  props: {
    'name': String,
    'step': Number,
    'qrow': Number,
    'qbit': Number,
    'id': String,
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
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDropEvent: function (event) {
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let qbit = parseInt(event.currentTarget.getAttribute("qbit"));
      let originalQbit = parseInt(event.dataTransfer.getData("originalQbit"));
      if (step == originalStep || qbit == originalQbit) {
        if (event.shiftKey) {
          this.addNewControl(event);
        } else {
          this.repositionControl(event);
        }
      } else {
        this.handleDragLeave();
      }
    },
    addNewControl: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalQbit = parseInt(event.dataTransfer.getData("originalQbit"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let controls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlstates = event.dataTransfer.getData("controlstates").split(",");

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "qbit": originalQbit, "controls": controls, "controlstates": controlstates};

      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      dto["controls"].push(dropQbit);
      dto["controlstates"].push("1");

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

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'qbit': originalQbit});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    repositionControl: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      let originalQbit = parseInt(event.dataTransfer.getData("originalQbit"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let controls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let controlstates = event.dataTransfer.getData("controlstates").split(",");
      let draggedQubit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "qbit": originalQbit, "controls": controls, "controlstates": controlstates};

      // adjust dto based on drop location
      if (dragOrigin == "stub") {
        let controlIndex = controls.indexOf(draggedQubit);
        dto["controls"][controlIndex] = dropQbit;
      } else {
        dto["qbit"] = dropQbit;
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

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'qbit': originalQbit});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    handleDragOver() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/vertical-red-line-long.svg");
    },
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (Vue.$cookies.get('colored-gates') === 'true'){
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