<template>
  <div id="toolbar">
    <md-toolbar style="background-color: lightslategrey;" class="rounded mb-0">
      <md-button v-b-toggle.sidebar-right class="md-raised md-primary md-help-button">
        ?
        <md-tooltip md-direction="left">Get Help</md-tooltip>
      </md-button>
      <md-button class="md-raised md-primary md-help-button" v-on:click="showChangeQbitsStepsModal()">
        ±
        <md-tooltip md-direction="left">Change number of Steps/Qbits</md-tooltip>
      </md-button>
      <md-button class="md-raised md-primary md-button-undo-redo" v-on:click="undo()">
        ⟲
        <md-tooltip md-direction="left">Undo</md-tooltip>
      </md-button>
      <md-button class="md-raised md-primary md-button-undo-redo" v-on:click="redo()">
        ⟳
        <md-tooltip md-direction="left">Redo</md-tooltip>
      </md-button>
      <md-button class="md-raised md-primary md-button" v-on:click="toggleTooltips()">
        ttips
        <md-tooltip md-direction="left">Show Tooltips</md-tooltip>
      </md-button>

      <div class="md-toolbar-offset">
        <table>
          <tr>
            <td>
              <md-checkbox class="md-primary" v-model="darkTheme" v-on:change="switchTheme()">Dark Theme</md-checkbox>
            </td>
            <td>
              <md-checkbox class="md-primary" v-model="liveSimulation" v-on:change="switchSimulationMode()">Live Simulation</md-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <md-checkbox class="md-primary" v-model="colorGates" v-on:change="switchGateColors()">Color Gates</md-checkbox>
            </td>
            <td>
              <md-checkbox class="md-primary" v-model="statesAreShownInBase2" v-on:change="switchLegendBase()">Base 2 States</md-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="md-toolbar-section-end">
        <md-button class="md-raised md-primary" v-on:click="resetCircuit()">
          Reset
          <md-tooltip md-direction="left">New Empty Circuit</md-tooltip>
        </md-button>
        <md-button class="md-raised md-primary" v-on:click="openFile()">
          Open
          <md-tooltip md-direction="left">Load Circuit from Disk</md-tooltip>
        </md-button>
        <md-button class="md-raised md-primary" v-on:click="saveFile()">
          Save
          <md-tooltip md-direction="left">Save Circuit</md-tooltip>
        </md-button>
        <md-button class="md-raised md-primary" v-on:click="saveImages()">
          Image
          <md-tooltip md-direction="left">Save Circuit as Image</md-tooltip>
        </md-button>
      </div>
    </md-toolbar> 

    <!-- input form used to open json files to read circuit state from -->
    <input id="file-input" type="file" style="display:none;" />

    <b-modal ref="change-steps-qubits-dialog" size="sm"  centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td colspan="3" valign="top">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleCloseHover">
              <b-icon v-if="closeIsHovered" v-on:click="hideModal()" v-b-tooltip.hover title="Close dialog" icon="x-square" style="color: #7952b3; float: right;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideModal()" v-b-tooltip.hover title="Close dialog" style="color: #7952b3; float: right;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td width="35px"></td>
          <td v-b-tooltip.hover width="80px" style="padding: 5px;">Qbits:</td>
          <td width="110px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="qbitsNew" placeholder="qbits" type="number" id="qbits-new" style="width:80px;"></b-form-input>
          </td>
          <td width="30px"></td>
        </tr>
        <tr>
          <td width="35px"></td>
          <td v-b-tooltip.hover width="80px" style="padding: 5px;">Steps:</td>
          <td width="110px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="stepsNew" placeholder="steps" type="number" id="steps" style="width:80px;"></b-form-input>
          </td>
          <td width="30px"></td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSaveStepsAndQbits()" icon="check" v-b-tooltip.hover title="Save changes" style="color: #7952b3; float: right;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSaveStepsAndQbits()" icon="check" style="color: #7952b3; float: right;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>

    </b-modal>

  </div>
  
</template>

<script>
import Vue from 'vue';
import * as htmlToImage from 'html-to-image';
import JQuery from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import { getNoQbits, getNoSteps, getNumberOfRowsThatFit, getNumberOfColumnsThatFit } from "../store/modules/gatesTable.js";
import {save_circuit} from "../store/modules/circuitSaveAndRetrieve.js";
import { setCookiesIfNotAltreadySet } from "../store/modules/applicationWideReusableUnits.js";
import {sendWorkerMessage} from '../store/modules/worker-api';
export default {
  name: "ToolBar",
  data() {
    setCookiesIfNotAltreadySet();
    return {
      darkTheme: Vue.$cookies.get("dark-theme") === 'true',
      colorGates: Vue.$cookies.get("colored-gates") === 'true',
      liveSimulation: Vue.$cookies.get("live-simulation") === 'true',
      statesAreShownInBase2: Vue.$cookies.get("legend-base") === '2',
      closeIsHovered: false,
      saveIsHovered:  false,
      qbitsNew: 0,
      stepsNew: 0,
      history: [],
      historyUnRoll: [],
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type == 'circuitEditorModule/insertGate' || 
          mutation.type == 'circuitEditorModule/insertGates' ||
          mutation.type == 'circuitEditorModule/insertQbit' ||
          mutation.type == 'circuitEditorModule/insertStep' ||
          mutation.type == 'circuitEditorModule/removeGate' || 
          mutation.type == 'circuitEditorModule/removeGates' ||
          mutation.type == 'circuitEditorModule/removeQbit' || 
          mutation.type == 'circuitEditorModule/removeStep'){
        this.$root.$emit("triggerSimulationRun", state.circuitEditorModule);
        this.history.push(JSON.stringify(state));
        this.historyUnRoll = [];
        // validate circuit in a separate thread
        sendWorkerMessage(state.circuitEditorModule);
      }      
    });
  },
  mounted() {
    let darkTheme = (Vue.$cookies.get("dark-theme") === 'true')
    this.$root.$emit("switchThemeDark", darkTheme);
    if (this.$store.state.circuitEditorModule.steps.length > 0){
      this.$root.$emit("triggerSimulationRun", this.$store.state.circuitEditorModule);
      this.history.push(JSON.stringify(this.$store.state));
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['emptyCircuit', 'updateCircuit', 'refreshCircuit']),
    ...mapGetters("circuitEditorModule/", ["getCircuitState", "getMaximumStepIndex", "getMaximumQbitIndex"]),
    undo: function() {
      if (this.history.length > 0) {
        let prev_state = this.history.pop();
        this.historyUnRoll.push(prev_state);
        if (this.history.length > 0){
           let current_state = JSON.parse(this.history[this.history.length - 1]);
           this.updateCircuit(current_state.circuitEditorModule);
           this.$root.$emit("triggerSimulationRun", current_state.circuitEditorModule);
        } else {
          this.emptyCircuit();
          this.$root.$emit("triggerSimulationRun", this.$store.state.circuitEditorModule);
        }
      }
    },
    redo: function() {
      if(this.historyUnRoll.length > 0){
        let json_txt = this.historyUnRoll.pop();
        this.history.push(json_txt);
        let current_state = JSON.parse(json_txt);
        this.updateCircuit(current_state.circuitEditorModule);
        this.$root.$emit("triggerSimulationRun", current_state.circuitEditorModule);
      }
    },
    toggleTooltips: function() {    
      this.refreshCircuit();  
      if (window.toolTipsAreShown){ 
        JQuery('[data-toggle="tooltip"], .tooltip').tooltip("hide");
      } else {
        JQuery('[data-toggle="tooltip"], .tooltip').tooltip({placement: "bottom"});
        JQuery('[data-toggle="tooltip"], .tooltip').tooltip("show");
      }
      window.toolTipsAreShown = !window.toolTipsAreShown;
    },
    showChangeQbitsStepsModal: function() {
      this.$data.qbitsNew = parseInt(window.gatesTable.rows / 2);
      this.$data.stepsNew = parseInt(window.gatesTable.columns / 2),
      this.$refs['change-steps-qubits-dialog'].show();
      this.closeIsHovered = false;
      this.saveIsHovered = false;
    },
    hideModal: function() {
      this.$refs['change-steps-qubits-dialog'].hide();
    },
    handleCloseHover(hovered) {
      this.closeIsHovered = hovered;
    },
    handleSaveHover(hovered) {
      this.saveIsHovered = hovered;
    },
    handleSaveStepsAndQbits: function(){
      let qbitsNew = Math.max(this.getMaximumQbitIndex() + 1, this.$data.qbitsNew);
      let stepsNew = Math.max(this.getMaximumStepIndex() + 1, this.$data.stepsNew);
      let qubitsThatFitScreen = getNumberOfRowsThatFit() / 2;
      let stepsThatFitScreen = getNumberOfColumnsThatFit() / 2;
      let newrows = 2 * qbitsNew;
      let newcolumns = 2 * stepsNew;
      if (newrows != window.gatesTable.rows || newcolumns != window.gatesTable.columns){
        if (qbitsNew < qubitsThatFitScreen || stepsNew < stepsThatFitScreen) {
          if (!confirm("Unused higher end steps and qubits are simply being ignored. \
While you are allowed to reduce the number of steps or qubits under the area of circuit that fits your display, \
it does not make much sense doing that unless you intend to save the circuit as an SVG image next. Do you want to continue?")) {
           return;
          }
        }
        window.gatesTable.rows = newrows;
        window.gatesTable.columns = newcolumns;
        this.$refs['change-steps-qubits-dialog'].hide();
        this.refreshCircuit();
      }
    },
    openFile: function() {
      document
        .getElementById("file-input")
        .addEventListener("change", this.readSingleFile, false);
      document.getElementById("file-input").click();
      this.history = [];
      this.historyUnRoll = [];
    },
    saveImages: function() {
      var node = document.getElementById('gatesTable');
      htmlToImage.toSvg(node,)
      .then(function (blob) {
        var link = document.createElement('a');
        link.download = 'circuit.svg';
        link.href = blob;
        link.click();
      }).catch(function (error) {
        alert(error)
      });
    },
    saveFile: function() {
      let state = this.getCircuitState();
      const yaml = require('js-yaml');
      let yamlState = yaml.safeDump(state);
      if (window.circuitId){
        save_circuit(yamlState);
      } else {
        this.download("circuit.yaml", yamlState);
      }
    },
    download: function(filename, text) {
      // add temp element for downloading files with user
      // consent, works on all HTML5 Ready browsers
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },  
    readSingleFile: function(event) {
      if (event.target.files.length !== 1) {
        return;
      }
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = this.commitCircuitState;
      reader.readAsText(file);
    },
    resetCircuit: function() {
      this.emptyCircuit();
      this.history = [];
      this.historyUnRoll = [];
      let state = this.getCircuitState();
      window.gatesTable.rows = window.initialRows;
      window.gatesTable.columns = window.initialColumns;
      this.$root.$emit("triggerSimulationRun", state.circuitEditorModule);
      this.$root.$emit("circuitModifiedFromMenu");
    },
    switchTheme: function(){
      Vue.$cookies.set('dark-theme', this.darkTheme);
      this.$root.$emit("switchThemeDark", this.darkTheme);
    },
    switchGateColors: function(){
      Vue.$cookies.set('colored-gates', this.colorGates);
      this.$root.$emit("switchThemeDark", this.darkTheme);
      this.$root.$emit("switchGateColors");
      this.refreshCircuit();
    },
    switchLegendBase: function(){
      if (this.statesAreShownInBase2 == true){
        Vue.$cookies.set('legend-base', '2');
      } else {
        Vue.$cookies.set('legend-base', '10');
      }
      this.$root.$emit("switchLegendBase");
    },
    switchSimulationMode: function(){
      Vue.$cookies.set('live-simulation', this.liveSimulation);
      this.$root.$emit("switchToLiveSimulationMode", this.liveSimulation);
    },
    commitCircuitState: function(event) {
      const yaml = require('js-yaml');
      var contents = event.target.result;
      let jsonObj = yaml.safeLoad(contents);
      let qbits = getNoQbits(jsonObj);
      let steps = getNoSteps(jsonObj);
      window.gatesTable.rows = Math.max(2 * qbits + 2, window.initialRows);
      window.gatesTable.columns = Math.max(2 * steps + 2, window.initialColumns);
      this.updateCircuit(jsonObj);
      this.history.push(JSON.stringify(this.$store.state));
      this.$root.$emit("triggerSimulationRun", jsonObj);
      this.$root.$emit("circuitModifiedFromMenu");
    }
  }
};
</script>

<style scoped>
/* does not work */
.md-toolbar {
  background-color: slategrey;
}

.md-button {
  font-size: 17px;
}

.md-button-undo-redo {
  font-size: 30px;
}

.md-help-button {
  font-size: 28px;
}

.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
}

.md-checkbox{
  height: 20px; 
  margin: 5px;
  font-size: 14px;
  color: white;
  font-weight: bold;
}

</style>

