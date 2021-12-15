<template>
  <b-container fluid="xs" class="h-100">
    <b-row no-gutters class="brow">
      <b-col cols="6">
        <JSCharting :options="chartOptionsReal" ref="chartReal" class="chart" :key="updateKey"></JSCharting>
      </b-col> 
      <b-col>
        <JSCharting :options="chartOptionsImaginary" ref="chartImaginary" class="chart" :key="updateKey"></JSCharting>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

// Questions? 
// JavaScript chart library: https://jscharting.com/
// Vue-js plugin: https://github.com/jscharting/jscharting-vue/blob/master/README.md

import { mapGetters } from "vuex";
import JSCharting from 'jscharting-vue';
import { getStateVectorEntries} from "../store/modules/simulationCharts.js";
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";

export default {
   name: 'StateVectorChart',
   data() {
      return {
        chartOptionsReal: {
          type: 'horizontal column',
          yAxis_label_text: "Magnitude",
          legend_visible: false,
          yAxis: {
            scale: {
              range: { min: -1.0, max: 1.0},
              interval: 0.25,
            },
            formatString: 'F2',
          },
          annotations: [
            {
              label: { text: 'Real Values', style_fontSize: '15px' },
              position: 'top center',
            },
          ],
        },
        chartOptionsImaginary: {
          type: 'horizontal column',
          yAxis_label_text: "Magnitude",
          legend_visible: false,
          xAxis: {
            visible: false
          },
          yAxis: {
            scale: {
              range: { min: -1.0, max: 1.0},
              interval: 0.25,
            },
            formatString: 'F2',
          },
          annotations: [
            {
              label: { text: 'Imaginary Values', style_fontSize: '15px' },
              position: 'top center',
            },
          ],
        },
        liveSimulation: getUserInterfaceSetting("live-simulation") === 'true',
        activated: false,
        updateKey: 0,
      }
   },
   methods: {
      ...mapGetters("circuitEditorModule/", ["getMaximumQbitIndex"]),
      updateData(realEntries, imaginaryEntries, maxScale) {
        this.$data.chartOptionsReal = {
          type: 'horizontal column',
          yAxis_label_text: "Magnitude",
          legend_visible: false,
          series: [
            {
              points: realEntries,
              color: "#448AFF"
            }
          ],
          yAxis: {
            scale: {
              range: { min: -1.0 * maxScale, max: maxScale},
              interval: maxScale / 4,
            },
            formatString: 'F2',
          },
          annotations: [
            {
              label: { text: 'Real Values', style_fontSize: '15px' },
              position: 'top center',
            },
          ],
        },
        this.$data.chartOptionsImaginary = {
          type: 'horizontal column',
          yAxis_label_text: "Magnitude",
          legend_visible: false,
          series: [
            {
              points:  imaginaryEntries,
              color: "#f44336"
            }
          ],
          xAxis: {
            visible: false
          },
          yAxis: {
            scale: {
              range: { min: -1.0 * maxScale, max: maxScale},
              interval: maxScale / 4,
            },
            formatString: 'F2',
          },
          annotations: [
            {
              label: { text: 'Imaginary Values', style_fontSize: '15px' },
              position: 'top center',
            },
          ],
        }
      },
      runSimulation: async function (circuitState, forceReRender = false) {
        if (this.$data.liveSimulation == true && this.$data.activated) {
          let qubits = this.getMaximumQbitIndex() + 1;
          if (qubits == -1){
            this.updateData([], [], 1.0);
          } else if (qubits <= 8){
            let stateVectorEntries = await getStateVectorEntries(circuitState, qubits);
            let stateVectorRealEntries = stateVectorEntries["real"];
            let stateVectorImaginaryEntries = stateVectorEntries["imaginary"];
            let maxScale = 1.1 * stateVectorEntries["max"];
            this.updateData([], [], maxScale);
            this.updateData(stateVectorRealEntries, stateVectorImaginaryEntries, maxScale);
          } else {
            this.updateData([], [], 1.0);
          }
          if (forceReRender) {
            this.forceRerender();
          }
        }        
      },
      updateView(simulatingLive){
        this.$data.liveSimulation = simulatingLive;
        this.runSimulation(this.$store.state.circuitEditorModule, simulatingLive == true);
      },
      tabActivated(activated){
        this.$data.activated = activated;
        this.runSimulation(this.$store.state.circuitEditorModule, true);
      },
      forceRerender() {
        // this creates a memory leak
        this.updateKey += 1;
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
      this.$root.$on('statevectorTabActivated', (activated) => {this.tabActivated(activated)});
   },
}
</script>

<style>

.brow {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 0px;
}


.chart {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 0px;
}

</style>