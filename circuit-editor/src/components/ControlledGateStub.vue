<template>
  <div>
    <img :src="gateImageSource" @dragend="dragEnd" @dragstart="dragStart" alt="Controlled Gates Stubs" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import Vue from 'vue';
import { createDragImageGhost, hideTooltips } from "../store/modules/utils.js";
export default {
  name: "ControlledGateStub",
  props: {
    'step' : Number, 
    'qbit': Number,
    'qbit2': Number,
    'qrow': Number,
    'title': String,
    'name': String,
    'gate': String,
    'control': Number,
    'controlstate': Number,
    'control2': Number,
    'controlstate2': Number,
    'theta': Number,
    'phi': Number,
    'lambda': Number,
    'root': String,
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
    dragStart: function(event) {
      hideTooltips();
      event.dataTransfer.setData("drag-origin", "stub");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("gateName", this.gate);
      event.dataTransfer.setData("originalQbit", this.qbit);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControl", this.control);
      event.dataTransfer.setData("controlstate", this.controlstate);
      if (this.qbit2 != null){
        event.dataTransfer.setData("originalQbit2", this.qbit2);
      }
      if (this.control2 != null){
        event.dataTransfer.setData("originalControl2", this.control2);
      }
      if (this.controlstate2 != null){
        event.dataTransfer.setData("controlstate2", this.controlstate2);
      }
      if (!isNaN(this.theta) && this.theta != null) {
        event.dataTransfer.setData("theta", this.theta);
      }
      if (!isNaN(this.phi) && this.phi != null){
        event.dataTransfer.setData("phi", this.phi);
      }
      if (!isNaN(this.lambda) && this.lambda != null){
        event.dataTransfer.setData("lambda", this.lambda);
      }
      if (this.root != null && this.root !== undefined){
        event.dataTransfer.setData("root", this.root);
      }
      const target = event.target;
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
  }
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>