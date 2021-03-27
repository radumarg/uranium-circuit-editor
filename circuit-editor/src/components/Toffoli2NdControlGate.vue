<template>
  <div>
    <img :src="gateImageSource" @dragstart="dragStart" alt="Toffoli 2nd control bit" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>

export default {
  name: "Toffoli2NdControlGate",
  props: {
    'step' : Number, 
    'qbit': Number,
    'title': String,
    'name': String,
    'gate': String,
    'control': Number,
    'controlstate': Number,
    'control2': Number,
    'controlstate2': Number,
    'qrow': Number,
  },
  computed: {
    gateImageSource: function() {
      if (window.useColoredGates){
        return require("../assets/colored-gates/" + this.name + ".svg");
      } else {
        return require("../assets/blue-gates/" + this.name + ".svg");
      }
    },
  },
  methods: {
    dragStart: function(event) {
      event.dataTransfer.setData("drag-origin", "stub");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("gateName", this.gate);
      event.dataTransfer.setData("originalQbit", this.qbit);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControl", this.control);
      event.dataTransfer.setData("controlstate", this.controlstate);
      event.dataTransfer.setData("originalControl2", this.control2);
      event.dataTransfer.setData("controlstate2", this.controlstate2);
    }
  },
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>