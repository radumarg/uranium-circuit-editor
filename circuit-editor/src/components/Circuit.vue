<template>

  <b-container fluid="xs" class="h-100">

    <b-container fluid="xs" class="h-100" :style="{display: liveSimulation ? 'block' : 'none'}" id="splittedEditor">
      <b-row no-gutters class="h-100">
        <b-col><Editor id="editor1"/></b-col>
        <b-col cols="3">
          <HorizontalColumnChart />
        </b-col>
      </b-row>
    </b-container>

    <b-tabs content-class="mt-1" :style="{display: !liveSimulation ? 'block' : 'none'}" id="tabbedEditor">
      <b-tab title="Circuit" ref="circuitTab">
        <Editor id="editor2" style="height:calc(100% - 48px)"/>
      </b-tab>
      <b-tab title="Column Chart" v-on:click="onTabChanged" class="single-tab">
        <VerticalColumnChart />
      </b-tab>
      <b-tab title="Pie Chart" v-on:click="onTabChanged" class="single-tab">
        <PieChart />
      </b-tab>
    </b-tabs>

  </b-container>

</template>

<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import Editor from "./Editor";
import HorizontalColumnChart from "./HorizontalColumnChart";
import VerticalColumnChart from "./VerticalColumnChart";
import PieChart from "./PieChart";
import { getStateProbabilities, getTopEntriesStateProbabilities } from "../store/modules/simulationCharts.js";

export default {
  name: "App",
  components: {
    Editor,
    HorizontalColumnChart,
    VerticalColumnChart,
    PieChart,
  },
  data() {
    return {
      lastSimulatedCircuit: undefined,
      liveSimulation: Vue.$cookies.get("live-simulation") === 'true',
    }
  },
  methods: {
    ...mapGetters("circuitEditorModule/", ["getMaximumQbitIndex"]),
    onTabChanged: function() {
      
      let maxQubitIndex = this.getMaximumQbitIndex();

      if (maxQubitIndex == -1) {
        this.$root.$emit("showColumnChart", []);
        this.$root.$emit("showPieChart", []);
        return;
      }

      if (maxQubitIndex > 26) {
        alert("Cannot simulate more than 27 qubits!");
        this.$root.$emit("showColumnChart", []);
        this.$root.$emit("showPieChart", []);
        return;
      }
      
      let circuitState = this.$store.state.circuitEditorModule;
      if (this.$data.lastSimulatedCircuit !== JSON.stringify(circuitState)){
        this.$data.lastSimulatedCircuit = JSON.stringify(circuitState);        
        this.$root.$emit("showSpinners");
        var element = document.getElementById("editor2");
        var positionInfo = element.getBoundingClientRect();
        this.triggerSimulationJob(circuitState, positionInfo); 
      } 
    },
    triggerSimulationJob:  async function(circuitState, positionInfo){
      let stateProbabilities = await getStateProbabilities(circuitState);
      this.$root.$emit("showColumnChart", stateProbabilities, positionInfo.width, positionInfo.height);
      this.$root.$emit("showPieChart", getTopEntriesStateProbabilities(stateProbabilities), positionInfo.width, positionInfo.height);
    },
    adjustView: function(simulatingLive){
      let tabbedEditor = document.getElementById("tabbedEditor");
      if (simulatingLive == true){
        tabbedEditor.style.display = "none";
      } else {
        tabbedEditor.style.display = "block";
      }
      
      let splittedEditor = document.getElementById("splittedEditor");
      if (simulatingLive == true){
        splittedEditor.style.display = "block";
      } else {
        splittedEditor.style.display = "none";
      }

      this.$refs.circuitTab.activate();
    },
    switchToEditorTab: function(){
      this.$refs.circuitTab.activate();
    },
  },
  created() {
      this.$root.$on('switchToLiveSimulationMode', (simulatingLive) => {this.adjustView(simulatingLive)});
      this.$root.$on('circuitModifiedFromMenu', () => {this.switchToEditorTab()});
      this.$root.$on('switchLegendBase', () => {this.switchToEditorTab(); this.$data.lastSimulatedCircuit = null;});
   },
};
</script>

<style>

.single-tab {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

</style>
