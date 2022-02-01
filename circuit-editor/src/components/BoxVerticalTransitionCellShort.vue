<template>
  <div id="box-short-rectangle-cell">
    <img :src="gateImageSrcEditor" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:10px;min-width:40px;min-height:10px;" />
  </div>
</template>

<script>
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
export default {
  name: "BoxVerticalTransitionCellShort",
  computed: {
    gateImageSrcEditor: function() {
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        return require("../assets/colored-gates/box-middle-short.svg");
      } else {
        return require("../assets/blue-gates/box-middle-short.svg");
      }
    },
  }
};
</script>

<style scoped>
img {
  display: block;
}
</style>