<template>
   <div :step="step" :qrow="qrow" :targets="targets" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { mapActions } from 'vuex';
export default {
  name: "VerticalTransitionCellLongFredkin",
  props: {
    step: Number,
    qbit: Number,
    qbit2: Number,
    qrow: Number,
    id: String,
  },
  computed: {
    gateImageSource: function() {
      if (getUserInterfaceSetting('colored-gates') === 'true'){
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
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/swap-line-long.svg");
      } else {
        image.src = require("../assets/blue-gates/swap-line-long.svg");
      }
    },
    handleDropEvent: function (event) {
      let originalTarget = parseInt(event.dataTransfer.getData("originalTarget"));
      let originalTarget2 = parseInt(event.dataTransfer.getData("originalTarget2"));
      let originalControl = parseInt(event.dataTransfer.getData("originalControl"));
      let controlstate = event.dataTransfer.getData("controlstate");
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let qbit = parseInt(event.currentTarget.getAttribute("qbit"));
  
      if (originalStep == null || step != originalStep || qbit != originalTarget) {
        this.handleDragLeave();
        return;
      }

      // add the new gate mandatory params
      let dto = { step: step, name: gateName, qbit: originalTarget, qbit2: originalTarget2, control: originalControl, controlstate: controlstate };
      
      if (dragOrigin == "stub"){
        dto["control"] = dropQbit;
      } else {
        if (draggedQbit == originalTarget){
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
      this.removeGateFromCircuit({'step': originalStep, 'qbit': originalTarget});

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