<template>
  <b-tabs content-class="mt-1">
    <b-tab title="Circuit" active style="padding-top:0px;">
        <Editor />
    </b-tab>
    <b-tab title="BarChart">
        <BarChart />
    </b-tab>
    <b-tab title="PieChart">
        <PieChart />
    </b-tab>
  </b-tabs>
</template>

<script>
import Editor from "./Editor";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

export default {
  name: "App",
  components: {
    Editor,
    BarChart,
    PieChart,
  },
  methods: {
  },
  created() {
  },
};
</script>

<style>

.b-tab {
  margin-top: 0 !important;
}


</style>
