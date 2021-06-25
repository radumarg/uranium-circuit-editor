<template>
   <div :step="step" :qbit="qbit" :qbit2="qbit2" @dragover.prevent @drop.prevent="handleDropEvent" @dragover="handleDragOver" @dragleave="handleDragLeave">
    <img :src="gateImageSource" :id="id" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>
import Vue from 'vue';
import TwoTargetQubitVerticalTransitionCellBase from "./TwoTargetQubitVerticalTransitionCellBase";
export default {
  name: "VerticalTransitionCellLongSwapOrFredkin",
  extends: TwoTargetQubitVerticalTransitionCellBase,
  methods: {
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (Vue.$cookies.get('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/swap-line-long.svg");
      } else {
        image.src = require("../assets/blue-gates/swap-line-long.svg");
      }
    },
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
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>