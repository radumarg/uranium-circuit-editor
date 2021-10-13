<template>
   <div :step="step" :qrow="qrow" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import TwoTargetQubitVerticalTransitionCellBase from "./TwoTargetQubitVerticalTransitionCellBase";
export default {
  name: "VerticalTransitionCellLongSwapOrFredkin",
  extends: TwoTargetQubitVerticalTransitionCellBase,
  methods: {
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/ising-line-long.svg");
      } else {
        image.src = require("../assets/blue-gates/ising-line-long.svg");
      }
    },
  },
  computed: {
    gateImageSource: function() {
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        return require("../assets/colored-gates/ising-line-long.svg");
      } else {
        return require("../assets/blue-gates/ising-line-long.svg");
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