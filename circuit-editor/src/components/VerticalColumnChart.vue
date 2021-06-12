<template>
   <b-container fluid="xs" class="h-100">
      <b-row class="justify-content-center h-100" style="background-color:white;" align-v="center" align-h="center">
         <b-col></b-col>
         <b-col>
            <div id="spinnerContainerColumns" style="display:block;">
               <b-spinner variant="primary" label="Loading ..." style="width:450px; height:450px;"></b-spinner>
            </div>
            <div id="chartContainerColumns" class="chartDiv" style="display:none;">
               <JSCharting :options="chartOptions" id="columnChart"></JSCharting>
            </div>
         </b-col>
         <b-col></b-col>
      </b-row>
   </b-container>
</template>

<script>

// Questions? 
// JavaScript chart library: https://jscharting.com/
// Vue-js plugin: https://github.com/jscharting/jscharting-vue/blob/master/README.md

import JSCharting from 'jscharting-vue';
import { mapGetters } from "vuex";
import { JSC } from 'jscharting-vue';
import { getBinnedStateVector } from "../store/modules/simulationCharts.js";

export default {
   name: 'columnChart',
   data() {
      return {
         chartOptions: {
            type: 'vertical column',
            axisToZoom: "x",
            toolbar: {
               items: {
                  RESET: {
                     position: 'inside top left',
                     margin_top: 15,
                     margin_left: 20,
                     width: 58,
                     height: 33,
                     events_click: this.reset
                  },
                  export: {
                     position: 'inside top left',
                     margin_top: 15,
                     width: 54,
                     height: 33,
                     outline: { color: 'rgb(123,123,123)' },
                     fill: 'rgb(220,220,220)',
                     radius: 3,
                     icon: {
                        padding: 0,
                        outline: { color: 'rgb(123,123,123)' },
                        fill: 'rgb(255,255,255)',
                        path:
                           'm5 27h4.9v-6.9h10.3v6.9h6.8v-22h-4.9v10h-12.2v-10h-4.9zm4.9-12h12.3v-10h-12.3zm0 12h10.3v-6.9h-10.3zm4.1-5.3v2.5zm18.4-16v20.4m4-14.2h12.3l-6.1 8.3z'
                     },
                     states: {
                        hover: {
                           fill: 'rgb(220,220,220)',
                           icon: {
                           outerShape: 'none',
                           outline: { color: 'rgb(98,98,149)' }
                           }
                        },
                        select: {
                           fill: 'rgb(220,220,220)',
                           icon: {
                           outerShape: 'none',
                           outline: { color: 'rgb(98,98,149)' }
                           }
                        }
                     },
                     items: {
                        print_visible: false,
                        svg_visible: false,
                        png: { label_text: 'Save as PNG' },
                        jpg: { label_text: 'Save as JPG' },
                        pdf: { label_text: 'Save as PDF' }
                     },
                     defaultItem: {
                        margin: [-0.5, 0.5, 0.5, -0.5],
                        icon: 'none',
                        padding: [2, 2, 2, 10],
                        fill: 'rgb(255,255,255)',
                        outline: { color: 'none' },
                        opacity: 1,
                        label: { color: 'rgb(0,0,0)' },
                        states: {
                           hover: {
                           opacity: 1,
                           fill: 'rgb(144,144,144)',
                           label: { color: 'rgb(255,255,255)' }
                           }
                        }
                     },
                     itemsBox: {
                        width: 100,
                        layout: 'vertical',
                        margin: 0,
                        fill: 'rgb(255,255,255)',
                        outline: { color: 'rgb(123,123,123)' }
                     }
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
         qubits: 0,
         defaultNumberOfBins: 128,
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
      showSpinner: function () {
         let chartDiv = document.getElementById("chartContainerColumns");
         chartDiv.style.display = "none";
         let spinnerDiv = document.getElementById("spinnerContainerColumns");
         spinnerDiv.style.display = "block";
      },
      showChart: function (stateVector, width, height) {
         
         // save state vector
         this.$data.stateVector = [...stateVector];

         // reset plot range if number of qubits has changed
         let maxQubitIndex = this.getMaximumQbitIndex();
         if (maxQubitIndex == -1) {
            this.$data.minRange = 0;
            this.$data.maxRange = 1024;
            this.$data.qubits = 0;
         } else if (this.$data.qubits != maxQubitIndex + 1){
            this.$data.minRange = 0;
            this.$data.maxRange = this.$data.stateVector.length;
            this.$data.qubits = maxQubitIndex + 1;
         }

         // update plot
         let numberOfBins = Math.min(this.$data.defaultNumberOfBins, this.$data.stateVector.length);
         if (this.$data.stateVector.length == 0){
            // needed to show empty plot
            numberOfBins = this.$data.defaultNumberOfBins;
         }
         this.updateData(getBinnedStateVector(this.$data.stateVector, this.$data.minRange, this.$data.maxRange, numberOfBins));

         // adjust chart size
         let element = document.getElementById("columnChart");
         element.style.width = parseInt(width - 150) + "px";
         element.style.height = parseInt(height - 150) + "px";

         //show chart
         let spinnerDiv = document.getElementById("spinnerContainerColumns");
         spinnerDiv.style.display = "none";
         let chartDiv = document.getElementById("chartContainerColumns");
         chartDiv.style.display = "block";
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
      this.$root.$on('showSpinners', () => {this.showSpinner()});
      this.$root.$on('showColumnChart', (stateVector, width, height) => {this.showChart(stateVector, width, height)});
   },
}
</script>

<style>

.chartDiv {
   padding-bottom: 50px;
}

</style>