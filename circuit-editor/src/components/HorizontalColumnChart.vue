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
import { getStateVector, getBinnedStateVector} from "../store/modules/simulationCharts.js";

export default {
   name: 'columnChart',
   data() {
      return {
         chartOptions: {
            type: 'horizontal column',
            axisToZoom: "x",
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
            events_selection: this.selectionHandler, 
         },
         stateVector: undefined,
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
      updateData(binnedStateVector) {
         this.$data.chartOptions = {
            series: [
               {
                  points: binnedStateVector,
                  color: "#448AFF"
               }
            ],
         };
      },
      runSimulation: function (circuitState) {
         if (this.$data.liveSimulation == true) {
            let maxQubitIndex = this.getMaximumQbitIndex();
            if (maxQubitIndex == -1){
               this.$data.stateVector = [];
               this.$data.minRange = 0;
               this.$data.maxRange = 1024;
               this.$data.qubits = 0;
            } else if (maxQubitIndex < 20){
               let stateVector = getStateVector(circuitState);
               this.$data.stateVector = [...stateVector];
               if (this.$data.qubits != maxQubitIndex + 1){
                  this.$data.minRange = 0;
                  this.$data.maxRange = this.$data.stateVector.length;
               }
            } else {
               if (!this.$data.tooManyQubitsAlertShown) {
                  this.$data.tooManyQubitsAlertShown = true;
                  alert("At most 20 qubits can be simulated in live simulation mode! We suggest to uncheck the live simulation checkbox or reduce the number of qubits.");
               }
               this.$data.stateVector = [];   
            }
            this.$data.qubits = maxQubitIndex + 1;
            let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateVector.length);
            this.updateData(getBinnedStateVector(this.$data.stateVector, this.$data.minRange, this.$data.maxRange, numberOfBins));
         }        
      },
      selectionHandler(ev) { 
         let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateVector.length);
         if (this.$data.maxRange - this.$data.minRange > numberOfBins)
         {
            var yRange = JSC.sortBy(ev.xAxis);
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
               this.updateData(getBinnedStateVector(this.$data.stateVector, this.$data.minRange, this.$data.maxRange, numberOfBins));
            }
         }
         return false; 
      }, 
      reset(){ 
         this.$data.minRange = 0;
         this.$data.maxRange = this.$data.stateVector.length;
         let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateVector.length);
         this.updateData(getBinnedStateVector(this.$data.stateVector, 0, this.$data.stateVector.length, numberOfBins));
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
      this.$root.$on('switchToLiveSimulationMode', (simulatingLive) => {this.updateView(simulatingLive)});
   },
}
</script>

<style>

.chart {
  position: absolute;
  overflow: auto;
  width: 100%;
  height: 100%;
  border-left: 2px solid;
  background-color: white;
}

</style>