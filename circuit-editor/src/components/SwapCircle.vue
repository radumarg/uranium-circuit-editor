<template>
  <div>
    <img :src="gateImageSource" :id="id" draggable="false" style="width:100%;height:100%;" />
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "SwapCircle", 
  computed: {
    gateImageSource: function() {
      if (Vue.$cookies.get('colored-gates') === 'true'){
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