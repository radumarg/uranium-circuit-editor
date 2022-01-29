<template>
  
  <b-container fluid="xs" class="h-100" style="background-color: #374048; overflow: hidden; ">
    <b-row>
      <div class="help">
        <b-sidebar id="sidebar-right" :title="gateName" width="360px" right shadow>
          <div class="px-3 py-2" id="sidebar-right-div">
            <b-img :src="gateImage" width="280px" height="auto" fluid thumbnail></b-img>
            <br/><br/>
            <div>
              <p style="font-size:14px;color:gray;" id="note"> 
                {{noteHtml}}
              </p>
            </div>
            <div>
              <span v-html="helpHtml"></span>
            </div>
            <br/>
            <div align=center>
              <span v-html="gateMatrixHtml"></span>
            </div>
            <br/>
            <p>{{controlHelpHtml}}</p>
            <div align=center>
              <span v-html="controlledGateMatrixHtml"></span>
            </div>
            <br/>
            <div id="on-gates" style="visibility:hidden">
              For further details, an in-depth discussion of quantum gates can be found here:
              <a href="https://threeplusone.com/pubs/on_gates.pdf" target=”_blank”>
                Gates, States, and Circuits
              </a>
            </div>
          </div>
        </b-sidebar>
      </div>
    </b-row>
    <b-row no-gutters align-v="center" class="bordered-box" style="border-right: solid 0.5em #374048;" @dragover.prevent @drop.prevent="handleDropEvent">
      <b-col cols="12" md="auto" style="max-width: 286px;">
        <Logo />
      </b-col>
      <b-col> 
        <ToolBar /> 
      </b-col>
    </b-row>
    <b-row no-gutters>
        <b-col cols="12" md="auto" class="bordered-box" @dragover.prevent @drop.prevent="handleDropEvent">
          <table>
            <tr>
              <td class="controls-table-cell">
                <img src="../src/assets/colored-gates/ctrl-stub-+i.svg" class="stub-image" @dragstart="dragStart" @dragend="dragEnd" title="+i" alt="+i control"/>
              </td>
              <td class="controls-table-cell">
                <img src="../src/assets/colored-gates/ctrl-stub--i.svg" class="stub-image" @dragstart="dragStart" @dragend="dragEnd" title="-i" alt="-i control"/>
              </td>
              <td class="controls-table-cell">
                <img src="../src/assets/colored-gates/ctrl-stub-+.svg" class="stub-image" @dragstart="dragStart" @dragend="dragEnd" title="+" alt="+ control"/>
              </td>
              <td class="controls-table-cell">
                <img src="../src/assets/colored-gates/ctrl-stub--.svg" class="stub-image" @dragstart="dragStart" @dragend="dragEnd" title="-" alt="- control"/>
              </td>
              <td class="controls-table-cell">
                <img src="../src/assets/colored-gates/ctrl-stub-0.svg" class="stub-image" @dragstart="dragStart" @dragend="dragEnd" title="0" alt="0 control"/>
              </td>
              <td class="controls-table-cell">
                <img src="../src/assets/colored-gates/ctrl-stub-1.svg" class="stub-image" @dragstart="dragStart" @dragend="dragEnd" title="1" alt="1 control"/>
              </td>
            </tr>
          </table>
          <b-tabs>
            <b-tab title="1-Q">
              <GatesPallete-1Q /> 
            </b-tab>
            <b-tab title="2-Q">
              <GatesPallete-2Q /> 
            </b-tab>
            <b-tab title="n-Q">
              <GatesPallete-nQ />
            </b-tab>
          </b-tabs>
        </b-col>
        <b-col class="bordered-box">
          <Circuit />
        </b-col>
    </b-row>
  </b-container>    
  
</template>

<script>
import Circuit from "./components/Circuit";
import GatesPallete1Q from "./components/GatesPallete1Q";
import GatesPallete2Q from "./components/GatesPallete2Q";
import GatesPalleteNQ from "./components/GatesPalleteNQ";
import Logo from "./components/Logo";
import ToolBar from "./components/ToolBar";
import { mapActions} from 'vuex';
import { retriveNoteHtml, retriveSimpleGateHelpHtml, retriveControlledGateHelpHtml, retriveGateMatrixHtml, retriveControlledGateMatrixHtml } from "./help/help.js";
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "./store/modules/applicationWideReusableUnits.js";

export default {
  name: "App",
  components: {
    Logo,
    Circuit,
    GatesPallete1Q,
    GatesPallete2Q,
    GatesPalleteNQ,
    ToolBar,
  },
  data() {
    return {
      noteHtml: retriveNoteHtml(""),
      helpHtml: retriveSimpleGateHelpHtml(""),
      controlHelpHtml: retriveControlledGateHelpHtml(""),
      gateImage: require("./assets/uranium.png"),
      gateMatrixHtml: retriveGateMatrixHtml(""),
      controlledGateMatrixHtml: retriveControlledGateMatrixHtml(""),
      gateName: "",
    };
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['removeGateFromCircuitByUser']),
    updateHelpContents: function (gateName) {

      var note = document.getElementById("on-gates");
      if (gateName && !gateName.includes("measure-")){
        note.style.visibility = "visible";
      } else {
        note.style.visibility = "hidden";
      }

      this.noteHtml = retriveNoteHtml(gateName);
      this.helpHtml = retriveSimpleGateHelpHtml(gateName);
      this.controlHelpHtml = retriveControlledGateHelpHtml(gateName);
      this.gateMatrixHtml = retriveGateMatrixHtml(gateName);
      this.controlledGateMatrixHtml = retriveControlledGateMatrixHtml(gateName);

      if (gateName == null) {
        this.gateName = "";
        this.gateImage = require("./assets/uranium.png");
      } else{
        this.gateName = gateName;
        if ( gateName == 'barrier') {
          this.gateImage = require("./assets/barrier.svg");
        } else {
          if (getUserInterfaceSetting('colored-gates') === 'true'){
            this.gateImage = require("./assets/colored-gates/" + gateName + ".svg");
          } else {
            this.gateImage = require("./assets/blue-gates/" + gateName + ".svg");
          }
        }
      }
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData("controlState", target.title);
      event.dataTransfer.setData("drag-origin", "control");
      let dragImageGhost = createDragImageGhost(target, "28px");
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
    handleDropEvent: function (event) {
      let targets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let step = parseInt(event.dataTransfer.getData("originalStep"));
      if (!isNaN(step) && targets.length > 0) {
        let dto = { step: step, targets: targets };
        this.removeGateFromCircuitByUser(dto);
      }
    }
  },
  created() {
    this.$root.$on('updateHelpEvent', (selectedGate) => {this.updateHelpContents(selectedGate)});
  },
};
</script>

<style>

table {
  /* disable selection on mouse drag over */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.help {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}

.bordered-box {
    background-color: #374048;
    border-left: solid 0.1em #374048;
    border-right: solid 0.1em #374048;
    border-bottom: solid 0.1em #374048;
    width: auto;
}

/* Create matrices via css */
.matrix {
  position: relative;
  font-size: 13px;
  margin-left:auto;
  margin-right:auto;
}
.matrix:before,
.matrix:after {
  content: "";
  position: absolute;
  top: 0;
  border: 1.5px solid #686868;
  width: 6px;
  height: 100%;
}
.matrix:before {
  left: -6px;
  border-right: 0;
}
.matrix:after {
  right: -6px;
  border-left: 0;
}

.controls-table-cell {
  border: 1px solid #374048;
  padding: 3px;
  width: 47px;
  height: 47px;
  text-align: center;
  vertical-align: middle;
}

.stub-image {
  width: 17px;
  height: 17px;
}

.tooltip-inner {
  background-color:  #f8f8ff00 !important;
  color: #FF00FF !important;
}
.tooltip.bs-tooltip-right .arrow:before {
  border-right-color: #FF00FF !important;
}
.tooltip.bs-tooltip-left .arrow:before {
  border-left-color: #FF00FF !important;
}
.tooltip.bs-tooltip-bottom .arrow:before {
  border-bottom-color: #FF00FF !important;
}
.tooltip.bs-tooltip-top .arrow:before {
  border-top-color: #FF00FF !important;
}

</style>
