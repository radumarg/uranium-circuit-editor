<template functional>
  <div id="empty-transition-cell">
    <img src="../assets/gray-line-short.svg" draggable="false" style="width:100%;height:100%;max-width:10px;max-height:40px;min-width:10px;min-height:40px;" />
  </div>
</template>

<script>

export default {
  name: "HorizontalTransitionCell"
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>