<template>

  <b-container fluid="xs" class="h-100">

    <b-container v-if="liveSimulation" fluid="xs" style="height: 100%;">
      <b-row no-gutters style="height: 100%;">
        <b-col class="single-tab" style="width: 100%;">
          <Editor id="editor1" />
        </b-col>
        <b-col style="max-width: 370px;" class="single-tab">
          <b-tabs content-class="mt-1" style="height: 100%;">
            <b-tab title="Probabilities" v-on:click="onProbabilitiesTabChanged" style="height: 100%;">
              <HorizontalColumnChart style="height: 100%;"/>
            </b-tab>
            <b-tab title="State-Vector (Max 8-Q)" v-on:click="onStatevectorTabChanged">
              <StateVectorChart style="height: 100%;"/>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>

    <b-tabs content-class="mt-1 flex-grow-1"  class="h-100 d-flex flex-column">
      <b-tab title="Circuit" ref="circuitTab" class="h-10">
        <Editor id="editor2" class="editor"/>
      </b-tab>
      <b-tab title="Column Chart" v-on:click="onTabChanged" class="h-100">
        <VerticalColumnChart class="chart-in-tab"/>
      </b-tab>
      <b-tab title="Pie Chart" v-on:click="onTabChanged" class="h-100">
        <PieChart class="chart-in-tab" />
      </b-tab>
    </b-tabs>

  </b-container>

</template>

<script>
import { mapGetters } from "vuex";
import Editor from "./Editor";
import HorizontalColumnChart from "./HorizontalColumnChart";
import StateVectorChart from "./StateVectorChart";
import VerticalColumnChart from "./VerticalColumnChart";
import PieChart from "./PieChart";
import { getStateProbabilities, getTopEntriesStateProbabilities } from "../store/modules/simulationCharts.js";
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";

export default {
  name: "App",
  components: {
    Editor,
    HorizontalColumnChart,
    StateVectorChart,
    VerticalColumnChart,
    PieChart,
  },
  data() {
    return {
      lastSimulatedCircuit: undefined,
      liveSimulation: getUserInterfaceSetting("live-simulation") === 'true',
    }
  },
  created() {
    this.$root.$on('switchToLiveSimulationMode', (simulatingLive) => {this.adjustView(simulatingLive);});
    this.$root.$on('circuitModifiedFromMenu', () => {this.switchToEditorTab()});
    this.$root.$on('switchLegendBase', () => {this.switchToEditorTab(); this.$data.lastSimulatedCircuit = null;});
    this.$root.$on('switchEndianess', () => {this.endianessChange()});
  },
  methods: {
    ...mapGetters("circuitEditorModule/", ["getMaximumQbitIndex"]),
    onTabChanged: function() {
      
      let maxQubitIndex = this.getMaximumQbitIndex()(window.currentCircuitId);

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
      
      let circuitStates = this.$store.state.circuitEditorModule;
      if (this.$data.lastSimulatedCircuit !== JSON.stringify(circuitStates[window.currentCircuitId])){
        this.$data.lastSimulatedCircuit = JSON.stringify(circuitStates[window.currentCircuitId]);
        this.$root.$emit("showSpinners");
        var element = document.getElementById("editor2");
        var positionInfo = element.getBoundingClientRect();
        this.triggerSimulationJob(circuitStates, positionInfo); 
      } 
    },
    onProbabilitiesTabChanged: function() {
      this.$root.$emit("probabilitiesTabActivated", true);
      this.$root.$emit("statevectorTabActivated", false);
    },
    onStatevectorTabChanged: function() {
      this.$root.$emit("probabilitiesTabActivated", false);
      this.$root.$emit("statevectorTabActivated", true);
    },
    triggerSimulationJob:  async function(circuitStates, positionInfo){
      let stateProbabilities = await getStateProbabilities(circuitStates);
      this.$root.$emit("showColumnChart", stateProbabilities, positionInfo.width, positionInfo.height);
      this.$root.$emit("showPieChart", getTopEntriesStateProbabilities(stateProbabilities), positionInfo.width, positionInfo.height);
    },
    endianessChange(){
      let circuitStates = this.$store.state.circuitEditorModule;
      this.$data.lastSimulatedCircuit = JSON.stringify(circuitStates[window.currentCircuitId]);
      this.$root.$emit("showSpinners");
      var element = document.getElementById("editor2");
      var positionInfo = element.getBoundingClientRect();
      this.triggerSimulationJob(circuitStates, positionInfo);
    },
    adjustView: function(simulatingLive){
      this.$data.liveSimulation = simulatingLive;
      this.$forceUpdate();
    },
    switchToEditorTab: function(){
      this.$refs.circuitTab.activate();
    },
  },
};
</script>

<style>

.single-tab {
  overflow-x: scroll;
  height: calc(var(--circuit-height));
}

.chart-in-tab {
  overflow-x: scroll;
  overflow-y: scroll;
}

.editor {
  overflow-x: scroll;
  overflow-y: scroll;
  height: calc(var(--tab-circuit-height));
  max-height: calc(var(--tab-circuit-height));
  min-height: calc(var(--tab-circuit-height));
}


</style>
