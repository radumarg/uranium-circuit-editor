<template>
  <div :step="step" :qbit="qbit" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width: 100%; height: 100%; max-width: 40px; max-height: 40px; min-width: 40px; min-height: 40px;"/>
  </div>
</template>

<script>
import ControlVerticalTransitionCellBase from "./ControlVerticalTransitionCellBase";
export default {
  name: "VerticalTransitionCellLong",
  extends: ControlVerticalTransitionCellBase,
  props: {
    'name': String,
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
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (window.useColoredGates){
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