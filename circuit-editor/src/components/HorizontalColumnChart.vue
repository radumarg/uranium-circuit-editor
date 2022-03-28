<template>
   <JSCharting :options="chartOptionsProbabilities" ref="chartProbabilities" class="chart"></JSCharting>
</template>

<script>

// Questions? 
// JavaScript chart library: https://jscharting.com/
// Vue-js plugin: https://github.com/jscharting/jscharting-vue/blob/master/README.md

import { mapGetters } from "vuex";
import JSCharting from 'jscharting-vue';
import { JSC } from 'jscharting-vue';
import { getStateProbabilities, getBinnedProbabilities, getMeasureGates} from "../store/modules/simulationCharts.js";
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";


export default {
   name: 'HorizontalColumnChart',
   data() {
      return {
        activated: true,
        chartOptionsProbabilities: {
          type: 'horizontal column',
          axisToZoom: "x",
          yAxis_label_text: "Probability",
          legend_visible: false,
          toolbar: {
              items: {
                RESET: {
                    position: 'inside top left',
                    margin_top: 10,
                    margin_left: 20,
                    width: 58,
                    height: 33,
                    events_click: this.reset
                },
              }
          },
          yAxis: {
              scale: {
                range: { min: 0},
              },
              formatString: 'F6',
          },
          events_selection: this.selectionHandler, 
        },
        stateProbabilities: undefined,
        minRange: undefined, 
        maxRange: undefined,
        tooManyQubitsAlertShown: false,
        qubits: 0,
        measureGates: {},
        defaultNumberOfBins: 128,
        liveSimulation: getUserInterfaceSetting("live-simulation") === 'true',
      }
   },
   methods: {
      ...mapGetters("circuitEditorModule/", ["getMaximumQbitIndex"]),
      updateData(probabilitiesDTO) {
         const [binnedStateProbabilities, maxProbability] = probabilitiesDTO;
         this.$data.chartOptionsProbabilities = {
            type: 'horizontal column',
            axisToZoom: "x",
            yAxis_label_text: "Probability",
            legend_visible: false,
            series: [
               {
                  points: binnedStateProbabilities,
                  color: "#448AFF"
               }
            ],
            yAxis: {
               scale: {
                  range: { min: 0, max: maxProbability * 1.01},
                  interval: maxProbability/5.0,
               }
            },
         };
      },
      runSimulation: async function (circuitState) {
        if (this.$data.liveSimulation == true && this.$data.activated) {
          let maxQubitIndex = this.getMaximumQbitIndex();
          let measureGates = getMeasureGates(circuitState);
          if (maxQubitIndex == -1){
              this.$data.stateProbabilities = [];
              this.$data.minRange = 0;
              this.$data.maxRange = 1024;
              this.$data.qubits = 0;
              this.$data.measureGates = {};
          } else if (maxQubitIndex < 20){
              let stateProbabilities = await getStateProbabilities(circuitState);
              this.$data.stateProbabilities = stateProbabilities;
              if (this.$data.qubits != maxQubitIndex + 1 ||                      // qubit added/removed
                  this.$data.measureGates != measureGates){                      // measure gates added/removed
                this.$data.minRange = 0;
                this.$data.maxRange = this.$data.stateProbabilities.length;
                this.$data.measureGates = measureGates;
              }
          } else {
              if (!this.$data.tooManyQubitsAlertShown) {
                this.$data.tooManyQubitsAlertShown = true;
                alert("At most 20 qubits can be simulated in live simulation mode! We suggest to uncheck the live simulation checkbox or reduce the number of qubits.");
              }
              this.$data.stateProbabilities = [];   
          }
          this.$data.qubits = maxQubitIndex + 1;
          let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateProbabilities.length);
          this.updateData(getBinnedProbabilities(this.$data.stateProbabilities, this.$data.minRange, this.$data.maxRange, numberOfBins));
        }        
      },
      selectionHandler(ev) { 
        let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateProbabilities.length);
        if (this.$data.maxRange - this.$data.minRange > numberOfBins)
        {
          var yRange = JSC.sortBy(ev.xAxis);

          yRange[0] = Math.floor(yRange[0]);
          yRange[1] = Math.ceil(yRange[1]);

          yRange[0] = Math.max(0.0, yRange[0]);
          yRange[1] = Math.max(0.0, yRange[1]);
          
          if (yRange[1] > 0.0){
              let min = this.$data.minRange;
              let max = this.$data.maxRange;
              let delta = max - min;
              this.$data.minRange = Math.floor(min + yRange[0] * delta / numberOfBins);
              this.$data.maxRange = Math.ceil(min + yRange[1] * delta / numberOfBins);
              this.updateData(getBinnedProbabilities(this.$data.stateProbabilities, this.$data.minRange, this.$data.maxRange, numberOfBins));
          }
        }
        return false; 
      }, 
      reset(){ 
        this.$data.minRange = 0;
        this.$data.maxRange = this.$data.stateProbabilities.length;
        let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateProbabilities.length);
        this.updateData(getBinnedProbabilities(this.$data.stateProbabilities, 0, this.$data.stateProbabilities.length, numberOfBins));
      },
      updateView(simulatingLive){
        this.$data.liveSimulation = simulatingLive;
        this.runSimulation(this.$store.state.circuitEditorModule[window.currentCircuitId], simulatingLive && this.$data.activated);
      },
      tabActivated(activated){
        this.$data.activated = activated;
        this.runSimulation(this.$store.state.circuitEditorModule[window.currentCircuitId], true);
      },
   },
   options: {
      responsive: true,
      maintainAspectRatio: false,
      mutable: true,
   },
   components: {
      JSCharting
   },
   created() {
      this.$root.$on('triggerSimulationRun', (circuitState) => {this.runSimulation(circuitState)});
      this.$root.$on('switchLegendBase', () => {this.runSimulation(this.$store.state.circuitEditorModule[window.currentCircuitId])});
      this.$root.$on('switchToLiveSimulationMode', (simulatingLive) => {this.updateView(simulatingLive)});
      this.$root.$on('probabilitiesTabActivated', (activated) => {this.tabActivated(activated)});
      this.$root.$on('switchEndianess', () => {this.runSimulation(this.$store.state.circuitEditorModule[window.currentCircuitId], false)});
      this.$root.$on('currentCircuitSwitch', () => {this.runSimulation(this.$store.state.circuitEditorModule[window.currentCircuitId])});
   },
}
</script>

<style>

.chart {
  position: absolute;
  width: 100%;
  height: 100%;
  border-left: 2px solid;
  background-color: white;
}

</style>