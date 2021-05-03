<template>
  <div id="toolbar">
    <md-toolbar style="background-color: lightslategrey" class="rounded mb-0">
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

      <div class="md-toolbar-offset" id="theme">
        <md-radio class="md-primary" v-model="lightTheme" :value="true" v-on:change="switchTheme()">Light Theme</md-radio>
        <md-radio class="md-primary" v-model="lightTheme" :value="false" v-on:change="switchTheme()">Dark Theme</md-radio>
      </div>

      <div class="md-toolbar-offset" id="gate-colors">
        <md-radio class="md-primary" v-model="colorGates" :value="true" v-on:change="switchGateColors()">Colors</md-radio>
        <md-radio class="md-primary" v-model="colorGates" :value="false" v-on:change="switchGateColors()">Blues</md-radio>
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
          <md-tooltip md-direction="left">Save Circuit to Disk</md-tooltip>
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
            <font style="font-size:12px;color:gray;">High end unused qubits will be ignored.</font>
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
            <b-form-input @keyup.enter.native="handleSave()" v-model="qbitsNew" placeholder="qbits" type="number" id="qbits-new" style="width:80px;"></b-form-input>
          </td>
          <td width="30px"></td>
        </tr>
        <tr>
          <td width="35px"></td>
          <td v-b-tooltip.hover width="80px" style="padding: 5px;">Steps:</td>
          <td width="110px" style="padding: 5px;"> 
            <b-form-input @keyup.enter.native="handleSave()" v-model="stepsNew" placeholder="steps" type="number" id="steps" style="width:80px;"></b-form-input>
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
import { mapActions, mapGetters } from 'vuex';
import * as htmlToImage from 'html-to-image';
import { getNoQbits, getNoSteps} from "../store/modules/gatesTable.js";
import {save_circuit} from "../store/modules/circuitSaveAndRetrieve.js";

export default {
  name: "ToolBar",
  data() {
    return {
      lightTheme: Vue.$cookies.get("light-theme") !== 'false',
      colorGates: Vue.$cookies.get("colored-gates") !== 'false',
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
          mutation.type == 'circuitEditorModule/insertQbit' ||
          mutation.type == 'circuitEditorModule/insertStep' ||
          mutation.type == 'circuitEditorModule/removeGateByUser' || 
          mutation.type == 'circuitEditorModule/removeQbit' || 
          mutation.type == 'circuitEditorModule/removeStep'){
        this.history.push(JSON.stringify(state));
        this.historyUnRoll = [];
      }      
    });
  },
  mounted() {
    let lightTheme = (Vue.$cookies.get("light-theme") != 'false')
    this.$root.$emit("switchThemeLight", lightTheme);
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
        } else {
          this.emptyCircuit();
        }
      }
    },
    redo: function() {
      if(this.historyUnRoll.length > 0){
        let json_txt = this.historyUnRoll.pop();
        this.history.push(json_txt);
        let state = JSON.parse(json_txt);
        this.updateCircuit(state.circuitEditorModule);
      }
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
      let newrows = 2 * qbitsNew;
      let newcolumns = 2 * stepsNew;
      if (newrows != window.gatesTable.rows || newcolumns != window.gatesTable.columns){
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
    },
    switchTheme: function(){
      Vue.$cookies.set('light-theme', this.lightTheme);
      this.$root.$emit("switchThemeLight", this.lightTheme);
    },
    switchGateColors: function(){
      window.useColoredGates = this.colorGates;
      Vue.$cookies.set('colored-gates', this.colorGates);
      this.$root.$emit("switchThemeLight", this.lightTheme);
      this.$root.$emit("switchGateColors");
      this.refreshCircuit();
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

.md-radio {
  color: white;
  font-size: 17px;
  font-weight: bold;
}

.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
}
</style>

