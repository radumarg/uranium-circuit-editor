<template>
  <div>
    <img :src="gateImageSource" :id="id" @dragend="dragEnd" @dragstart="dragStart" alt="Controlled bit for Fredkin gate" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
export default {
  name: "FredkinGateControlMiddle",
  props: {
    'step' : Number, 
    'targets': Array,
    'qbit2': Number,
    'title': String,
    'name': String,
    'gate': String,
    'control': Number,
    'controlstate':  String,
    'qrow': Number,
  },
  computed: {
    gateImageSource: function() {
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        return require("../assets/colored-gates/fredkin-control-middle-" + this.controlstate + ".svg");
      } else {
        return require("../assets/blue-gates/fredkin-control-middle-" + this.controlstate + ".svg");
      }
    },
  },
  methods: {
    dragStart: function(event) {
      hideTooltips();
      event.dataTransfer.setData("drag-origin", "stub");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("gateName", this.gate);
      event.dataTransfer.setData("originalTargets", [...this.targets]);
      event.dataTransfer.setData("originalTarget2", this.qbit2);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControls", [...this.controls]);
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