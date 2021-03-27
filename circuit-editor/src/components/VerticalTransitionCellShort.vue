<template>
  <div>
    <img :src="gateImageSource" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:10px;min-width:40px;min-height:10px;" />
  </div>
</template>

<script>

export default {
  name: "VerticalTransitionCellShort",
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
};
</script>

<style scoped>
img {
  display: block;
}
</style>