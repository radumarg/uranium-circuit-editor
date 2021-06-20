<template>
   <JSCharting :options="chartOptions" ref="chart" class="chart"></JSCharting>
</template>

<script>

// Questions? 
// JavaScript chart library: https://jscharting.com/
// Vue-js plugin: https://github.com/jscharting/jscharting-vue/blob/master/README.md

import Vue from 'vue';
import { mapGetters } from "vuex";
import JSCharting from 'jscharting-vue';
import { JSC } from 'jscharting-vue';
import { getStateProbabilities, getBinnedProbabilities} from "../store/modules/simulationCharts.js";
//import { max } from 'jscharting';

export default {
   name: 'columnChart',
   data() {
      return {
         chartOptions: {
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
            series: [
               {
                  name: 'Probability',
                  points: []
               }
            ],
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
         defaultNumberOfBins: 128,
         liveSimulation: Vue.$cookies.get("live-simulation") === 'true',
      }
   },
   methods: {
      ...mapGetters("circuitEditorModule/", ["getMaximumQbitIndex"]),
      updateData(probabilitiesDTO) {
         const [binnedStateProbabilities, maxProbability] = probabilitiesDTO;
         this.$data.chartOptions = {
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
         if (this.$data.liveSimulation == true) {
            let maxQubitIndex = this.getMaximumQbitIndex();
            if (maxQubitIndex == -1){
               this.$data.stateProbabilities = [];
               this.$data.minRange = 0;
               this.$data.maxRange = 1024;
               this.$data.qubits = 0;
            } else if (maxQubitIndex < 20){
               let stateProbabilities = await getStateProbabilities(circuitState);
               this.$data.stateProbabilities = [...stateProbabilities];
               if (this.$data.qubits != maxQubitIndex + 1){
                  this.$data.minRange = 0;
                  this.$data.maxRange = this.$data.stateProbabilities.length;
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
               let mid = (min + max) / 2.0;
               let delta = max - min;
               this.$data.minRange = Math.floor(min + yRange[0] * delta / numberOfBins);
               this.$data.maxRange = Math.ceil(min + yRange[1] * delta / numberOfBins);
               if (this.$data.maxRange - this.$data.minRange < numberOfBins){
                  this.$data.minRange = Math.floor(mid - numberOfBins / 2.0);
                  this.$data.maxRange = Math.ceil(mid + numberOfBins / 2.0);
               }
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
         this.runSimulation(this.$store.state.circuitEditorModule);
      }
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
      this.$root.$on('switchLegendBase', () => {this.runSimulation(this.$store.state.circuitEditorModule)});
      this.$root.$on('switchToLiveSimulationMode', (simulatingLive) => {this.updateView(simulatingLive)});
   },
}
</script>

<style>

.chart {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-left: 2px solid;
  background-color: white;
}

</style>