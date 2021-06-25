<template>
   <div :step="step" :qbit="qbit" :qbit2="qbit2" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
export default {
  name: "VerticalTransitionCellLongFredkin",
  props: {
    step: Number,
    qbit: Number,
    qbit2: Number,
    id: String,
  },
  computed: {
    gateImageSource: function() {
      if (Vue.$cookies.get('colored-gates') === 'true'){
        return require("../assets/colored-gates/swap-line-long.svg");
      } else {
        return require("../assets/blue-gates/swap-line-long.svg");
      }
    },
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (Vue.$cookies.get('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/swap-line-long.svg");
      } else {
        image.src = require("../assets/blue-gates/swap-line-long.svg");
      }
    },
    handleDropEvent: function () {
      let originalQbit = event.dataTransfer.getData("originalQbit");
      let originalQbit2 = event.dataTransfer.getData("originalQbit2");
      let originalControl = event.dataTransfer.getData("originalControl");
      let controlstate = event.dataTransfer.getData("controlstate");
      let originalStep = event.dataTransfer.getData("originalStep");
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
      let dto = { step: step, name: gateName, qbit: originalQbit, qbit2: originalQbit2, control: originalControl, controlstate: controlstate };
      
      if (dragOrigin == "stub"){
        dto["control"] = dropQbit;
      } else {
        if (draggedQbit == originalQbit){
          dto["qbit"] = dropQbit;
        } else {
          dto["qbit2"] = dropQbit;
        }
      }

      if (dto["qbit"] == dto["qbit2"] || dto["control"] == dto["qbit"] || dto["control"] == dto["qbit2"]){
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
  },
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>