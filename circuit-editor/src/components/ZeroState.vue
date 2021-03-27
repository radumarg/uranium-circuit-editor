<template>
  <div id="empty-cell">
    <img src="../assets/zero-state.svg" :title="title" draggable="false" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;" />
  </div>
</template>

<script>

export default {
  name: "ZeroState", 
  props: {
    'title': String,
  },
};
</script>

<style scoped>
img {
  display: inline-block;
}
</style>