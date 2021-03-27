<template>
  <div>
    <img :src="gateImageSource" draggable="false" style="width:100%;height:100%;" />
  </div>
</template>

<script>

export default {
  name: "SwapCircle", 
  computed: {
    gateImageSource: function() {
      if (window.useColoredGates){
        return require("../assets/colored-gates/swap-circle-small.svg");
      } else {
        return require("../assets/blue-gates/swap-circle-small.svg");
      }
    },
  },
};
</script>

<style scoped>
img {
  display: block;
}
</style>