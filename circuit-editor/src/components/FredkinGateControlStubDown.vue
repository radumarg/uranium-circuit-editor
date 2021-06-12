<template>
  <div>
    <img :src="gateImageSource" @dragend="dragEnd" @dragstart="dragStart" alt="Controlled bit for Fredkin gate" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import { createDragImageGhost } from "../store/modules/utils.js";
export default {
  name: "FredkinGateControlStubDown",
  props: {
    'step' : Number, 
    'qbit': Number,
    'qbit2': Number,
    'title': String,
    'name': String,
    'gate': String,
    'control': Number,
    'controlstate': Number,
    'qrow': Number,
  },
  computed: {
    gateImageSource: function() {
      if (window.useColoredGates){
        return require("../assets/colored-gates/ctrl-swap-stub-down-1.svg");
      } else {
        return require("../assets/blue-gates/ctrl-swap-stub-down-1.svg");
      }
    },
  },
  methods: {
    dragStart: function(event) {
      event.dataTransfer.setData("drag-origin", "stub");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("gateName", this.gate);
      event.dataTransfer.setData("originalQbit", this.qbit);
      event.dataTransfer.setData("originalQbit2", this.qbit2);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControl", this.control);
      event.dataTransfer.setData("controlstate", this.controlstate);
      const target = event.target;
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
  },
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>