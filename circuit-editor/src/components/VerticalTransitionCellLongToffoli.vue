<template>
  <div :step="step" :qbit="qbit" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width: 100%; height: 100%; max-width: 40px; max-height: 40px; min-width: 40px; min-height: 40px;"/>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
export default {
  name: "VerticalTransitionCellLongToffoli",
  computed: {
    gateImageSource: function() {
      if (Vue.$cookies.get('colored-gates') === 'true'){
        return require("../assets/colored-gates/pauli-line-long.svg");
      } else {
        return require("../assets/blue-gates/pauli-line-long.svg");
      }
    },
  },
  props: {
    step: Number,
    qbit: Number,
    id: String,
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDropEvent: function () {
      let originalQbit = event.dataTransfer.getData("originalQbit");
      let originalStep = event.dataTransfer.getData("originalStep");
      let originalControl = event.dataTransfer.getData("originalControl");
      let controlstate = event.dataTransfer.getData("controlstate");
      let originalControl2 = event.dataTransfer.getData("originalControl2");
      let controlstate2 = event.dataTransfer.getData("controlstate2");
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      let draggedQbit = event.dataTransfer.getData("dragged-qbit");
      let gateName = event.dataTransfer.getData("gateName");
      let step = event.currentTarget.getAttribute("step");
      let qbit = event.currentTarget.getAttribute("qbit");
      let dropQbit = this.id.split('_').shift();
   
      if (originalStep == null || step != originalStep || qbit != originalQbit) {
        this.handleDragLeave();
        return;
      }

      // add the new gate mandatory params
      let dto = { step: step, name: gateName, qbit: originalQbit, control: originalControl, controlstate: controlstate, control2: originalControl2, controlstate2: controlstate2};
      

      if (dragOrigin == "stub"){
        if (draggedQbit == originalControl){
          dto["control"] = dropQbit;
        } else {
          dto["control2"] = dropQbit;
        }
      } else {
        dto["qbit"] = dropQbit;
      }

      if (dto["control"] == dto["control2"]){
        this.handleDragLeave();
        return;
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
        image.src = require("../assets/colored-gates/pauli-line-long.svg");
      } else {
        image.src = require("../assets/blue-gates/pauli-line-long.svg");
      }
    },
  },
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>