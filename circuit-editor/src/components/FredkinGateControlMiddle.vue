<template>
  <div>
    <img :src="gateImageSource" @dragstart="dragStart" alt="Controlled bit for Fredkin gate" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>

export default {
  name: "FredkinGateControlMiddle",
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
        return require("../assets/colored-gates/fredkin-control-middle-" + this.controlstate + ".svg");
      } else {
        return require("../assets/blue-gates/fredkin-control-middle-" + this.controlstate + ".svg");
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
    }
  },
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>