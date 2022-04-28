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

      &nbsp;&nbsp;
      <!-- 
        Please not that while all other controls from tool bar, tool bar included are Vue Material controls, b-form-select is a BootstrapVue control.
        At some point we should migrate the entire toolbar to BootstrapVue, Vue Material is less customizable than BootstrapVue.  
      -->
      <b-form-select style="width:120px; max-width: 120px; min-width: 120px;" v-model="zoomLevel" v-on:change="switchZoomLevel()" :options="zoomLevels" size="sm" class="mt-1"></b-form-select>

      <div class="md-toolbar-offset">
        <table>
          <tr>
            <td>
              <md-checkbox class="md-primary" v-model="darkTheme" v-on:change="switchTheme()">Dark Theme</md-checkbox>
            </td>
            <td>
              <md-checkbox class="md-primary" v-model="liveSimulation" v-on:change="switchSimulationMode()">Live Simulation</md-checkbox>
            </td>
            <td>
              <md-checkbox class="md-primary" v-model="bigEndianOrdering" v-on:change="switchQubitOrdering()">
                Bigendian Ordering
                <md-tooltip md-direction="left">Ordering of qubits in state vectors</md-tooltip>
              </md-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <md-checkbox class="md-primary" v-model="colorGates" v-on:change="switchGateColors()">Color Gates</md-checkbox>
            </td>
            <td>
              <md-checkbox class="md-primary" v-model="statesAreShownInBase2" v-on:change="switchLegendBase()">
                Base 2 States
                <md-tooltip md-direction="left">Base used to display state vectors</md-tooltip>
              </md-checkbox>
            </td>
            <td>
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
            <b-form-input min="0" @keyup.enter.native="handleSaveStepsAndQbits()" v-model.number="qbitsNew" placeholder="qbits" type="number" id="qbits-new" style="width:80px;"></b-form-input>
          </td>
          <td width="30px"></td>
        </tr>
        <tr>
          <td width="35px"></td>
          <td v-b-tooltip.hover width="80px" style="padding: 5px;">Steps:</td>
          <td width="110px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSaveStepsAndQbits()" v-model.number="stepsNew" placeholder="steps" type="number" id="steps" style="width:80px;"></b-form-input>
          </td>
          <td width="30px"></td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSaveStepsAndQbits()" icon="check" title="Save changes" style="color: #7952b3; float: right;" font-scale="1.7"></b-icon>
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
import { setCookiesIfNotAlreadySet, getUserInterfaceSetting, setUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import {sendWorkerMessage} from '../store/modules/worker-api';
export default {
  name: "ToolBar",
  data() {
    setCookiesIfNotAlreadySet();
    return {
      darkTheme: getUserInterfaceSetting("dark-theme") === 'true',
      colorGates: getUserInterfaceSetting("colored-gates") === 'true',
      liveSimulation: getUserInterfaceSetting("live-simulation") === 'true',
      statesAreShownInBase2: getUserInterfaceSetting("legend-base") === '2',
      bigEndianOrdering: getUserInterfaceSetting("big-endian-ordering") === 'true',
      zoomLevel: getUserInterfaceSetting("zoom-level"),
      zoomLevels: [
          { value: '120', text: 'Zoom: 120%' },
          { value: '115', text: 'Zoom: 115%' },
          { value: '110', text: 'Zoom: 110%' },
          { value: '105', text: 'Zoom: 105%' },
          { value: '100', text: 'Zoom: 100%' },
          { value: '95', text: 'Zoom: 95%' },
          { value: '90', text: 'Zoom: 90%' },
          { value: '85', text: 'Zoom: 85%' },
          { value: '80', text: 'Zoom: 80%' },
          { value: '75', text: 'Zoom: 75%' },
          { value: '70', text: 'Zoom: 70%' },
          { value: '65', text: 'Zoom: 65%' },
          { value: '60', text: 'Zoom: 60%' },
          { value: '55', text: 'Zoom: 55%' },
          { value: '50', text: 'Zoom: 50%' },
          { value: '45', text: 'Zoom: 45%' },
          { value: '40', text: 'Zoom: 40%' },
          { value: '35', text: 'Zoom: 35%' },
          { value: '30', text: 'Zoom: 30%' },
          { value: '25', text: 'Zoom: 25%' },
        ],
      closeIsHovered: false,
      saveIsHovered:  false,
      qbitsNew: 0,
      stepsNew: 0,
      history: this.initializeProjectHistory(),
      historyUnRoll: this.initializeProjectHistory(),
    }
  },
  created() {
    this.unsubscribeLoadProject = this.$store.subscribe((mutation, state) => {
      if (mutation.type == 'circuitEditorModule/loadProject') {
        this.$root.$emit("triggerSimulationRun", state.circuitEditorModule[window.currentCircuitId]);
        this.$root.$emit("projectLoaded");
        this.projectLoaded(state);
      }
    });
    this.unsubscribeEditProject = this.$store.subscribe((mutation, state) => {
      if (mutation.type == 'circuitEditorModule/insertGate' ||
          mutation.type == 'circuitEditorModule/insertGates' ||
          mutation.type == 'circuitEditorModule/insertQbit' ||
          mutation.type == 'circuitEditorModule/insertStep' ||
          mutation.type == 'circuitEditorModule/removeGate' ||
          mutation.type == 'circuitEditorModule/removeBarrier' ||
          mutation.type == 'circuitEditorModule/removeGates' ||
          mutation.type == 'circuitEditorModule/removeQbit' ||
          mutation.type == 'circuitEditorModule/removeStep'){
        this.$root.$emit("triggerSimulationRun", state.circuitEditorModule[window.currentCircuitId]);
        // validate circuit in a separate thread
        sendWorkerMessage(state.circuitEditorModule[window.currentCircuitId]);
        this.history[window.currentCircuitId].push(JSON.stringify(state.circuitEditorModule[window.currentCircuitId]));
        this.historyUnRoll[window.currentCircuitId] = [];
      }      
    });
  },
  mounted() {
    let darkTheme = (getUserInterfaceSetting("dark-theme") === 'true')
    this.$root.$emit("switchThemeDark", darkTheme);
  },
  beforeDestroy() {
    this.unsubscribeLoadProject();
    this.unsubscribeEditProject();
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['emptyCircuit', 'updateCircuit', 'refreshCircuit']),
    ...mapGetters("circuitEditorModule/", ["getCircuitState", "getMaximumStepIndex", "getMaximumQbitIndex"]),
    projectLoaded: function(state) {
      this.history = this.initializeProjectHistory();
      this.historyUnRoll = this.initializeProjectHistory();
      if (state.circuitEditorModule[window.currentCircuitId].steps.length > 0){
        let circuit = state.circuitEditorModule[window.currentCircuitId];
        this.history[window.currentCircuitId] = [];
        this.historyUnRoll[window.currentCircuitId] = [];
        this.history[window.currentCircuitId].push(JSON.stringify(circuit));
        this.historyUnRoll[window.currentCircuitId].push(JSON.stringify(circuit));
      }
    },
    undo: function() {
      if (this.history[window.currentCircuitId].length > 0) {
        let prev_state = this.history[window.currentCircuitId].pop();
        this.historyUnRoll[window.currentCircuitId].push(prev_state);
        if (this.history[window.currentCircuitId].length > 0){
           let lastIndex = this.history[window.currentCircuitId].length - 1;
           let current_state = JSON.parse(this.history[window.currentCircuitId][lastIndex]);
           this.updateCircuit(current_state);
           this.$root.$emit("triggerSimulationRun", current_state);
        } else {
          this.emptyCircuit();
          this.$root.$emit("triggerSimulationRun", this.$store.state.circuitEditorModule[window.currentCircuitId]);
        }
      }
    },
    redo: function() {
      if(this.historyUnRoll[window.currentCircuitId].length > 0){
        let json_txt = this.historyUnRoll[window.currentCircuitId].pop();
        this.history[window.currentCircuitId].push(json_txt);
        let current_state = JSON.parse(json_txt);
        this.updateCircuit(current_state);
        this.$root.$emit("triggerSimulationRun", current_state);
      }
    },
    initializeProjectHistory: function() {
      let projectHistory = {};
      for (let i = 0; i < window.circuitIds.length; i++) {
        let id = window.circuitIds[i];
        projectHistory[id] = [];
      }
      return projectHistory;
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
      let fileInput = document.getElementById("file-input");
      fileInput.value = null;
      fileInput.onchange = () => {
            let files =  Array.from(fileInput.files);
            if (files.length == 1) {
              this.readSingleFile(files[0]);
            }
        };
      fileInput.click();
    },
    saveImages: function() {
      var node = document.getElementById('gatesTable');
      htmlToImage.toPng(node)
      .then(function (blob) {
        var link = document.createElement('a');
        link.download = 'circuit.png';
        link.href = blob;
        link.click();
      }).catch(function (error) {
        alert(error)
      });
    },
    saveFile: function() {
      let state = this.$store.state.circuitEditorModule;
      window.alertedOnFaliedSavingCircuit = false;
      const yaml = require('js-yaml');
      for (const [key, value] of Object.entries(state)) {
        let circuitId = key;
        let circuitState = value;
        let yamlState = yaml.safeDump(circuitState);
        if (window.projectId != null && window.projectId > 0) {
          save_circuit(circuitId, yamlState);
        } else {
          if (circuitId == window.currentCircuitId) {
            this.download(`circuit.yaml`, yamlState);
          }
        }
      }
    },
    download: function(filename, text) {
      // add temporary element for downloading files with user
      // consent, works on all HTML5 Ready browsers
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },  
    readSingleFile: function(file) {
      var reader = new FileReader();
      reader.onload = this.commitCircuitState;
      reader.readAsText(file);
    },
    resetCircuit: function() {
      this.emptyCircuit();
      this.history[window.currentCircuitId] = [];
      this.historyUnRoll[window.currentCircuitId] = [];
      let state = this.getCircuitState();
      window.gatesTable.rows = window.initialRows;
      window.gatesTable.columns = window.initialColumns;
      this.$root.$emit("triggerSimulationRun", state);
      this.$root.$emit("circuitModifiedFromMenu");
      if (window.toolTipsAreShown){
        JQuery('[data-toggle="tooltip"], .tooltip').tooltip("hide");
        window.toolTipsAreShown = false;
      }
    },
    switchTheme: function(){
      setUserInterfaceSetting('dark-theme', this.darkTheme);
      this.$root.$emit("switchThemeDark", this.darkTheme);
    },
    switchGateColors: function(){
      setUserInterfaceSetting('colored-gates', this.colorGates);
      this.$root.$emit("switchThemeDark", this.darkTheme);
      this.$root.$emit("switchGateColors");
      this.refreshCircuit();
    },
    switchLegendBase: function(){
      if (this.statesAreShownInBase2 == true){
        setUserInterfaceSetting('legend-base', '2');
      } else {
        setUserInterfaceSetting('legend-base', '10');
      }
      this.$root.$emit("switchLegendBase");
    },
    switchSimulationMode: function(){
      setUserInterfaceSetting('live-simulation', this.liveSimulation);
      this.$root.$emit("switchToLiveSimulationMode", this.liveSimulation);
    },
    switchQubitOrdering: function(){
      setUserInterfaceSetting('big-endian-ordering', this.bigEndianOrdering);
      this.$root.$emit("switchEndianess");
    },
    switchZoomLevel: function(){
      if (Vue.$cookies.get('functionality_cookies') === 'accepted'){
        setUserInterfaceSetting('zoom-level', this.zoomLevel);
        window.location.reload();
      } else {
        alert("You have not accepted functionality cookies hence changing page zoom level will not work. You can remove all cookies \
for this domain from the lock image in the browser url box, reload the page and when prompted accept functionality cookies. \
If you do not want to accept cookies, you can zoom the page yourself from the keyboard.");
        this.zoomLevel = '100';
      }
    },
    commitCircuitState: function(event) {
      const yaml = require('js-yaml');
      var contents = event.target.result;
      let jsonObj = yaml.safeLoad(contents);
      if (!jsonObj.version || jsonObj.version == "1.0" || jsonObj.version == "1.1") {
        alert("Unfortunately this circuit format is outdated. Please delete this circuit and create a new one.");
        return;
      }
      let qbits = getNoQbits(jsonObj);
      let steps = getNoSteps(jsonObj);
      window.gatesTable.rows = Math.max(2 * qbits + 2, window.initialRows);
      window.gatesTable.columns = Math.max(2 * steps + 2, window.initialColumns);
      this.history[window.currentCircuitId] = [];
      this.historyUnRoll[window.currentCircuitId] = [];
      this.updateCircuit(jsonObj);
      let circuit = this.$store.state.circuitEditorModule[window.currentCircuitId];
      this.history[window.currentCircuitId].push(JSON.stringify(circuit));
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
  font-size: 26px;
}

.md-help-button {
  font-size: 26px;
}

.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

.md-checkbox{
  height: 20px; 
  margin: 5px;
  font-size: 15px;
  color: white;
}

</style>

