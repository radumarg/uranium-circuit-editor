<template>
  
  <b-container fluid="xs" class="h-100" style="background-color: #374048; overflow: hidden; ">
    <b-row>
      <div>
        <b-sidebar id="sidebar-right" :title="gateName" width="360px" right shadow>
          <div class="px-3 py-2" id="sidebar-right-div">
            <b-img :src="gateImage" width="280px" height="auto" fluid thumbnail></b-img>
            <br/><br/>
            <p>{{helpHtml}}</p>
            <div align=center>
              <span v-html="gateMatrixHtml"></span>
            </div>
            <br/>
            <div>
              <p style="font-size:14px;color:gray;visibility:hidden" id="note"> 
                Note: unselect this gate in gates pallete to see general hints for using the Circuit Editor.
              </p>
            </div>
          </div>
        </b-sidebar>
      </div>
    </b-row>
    <b-row no-gutters align-v="center" class="bordered-box" style="border-right: solid 0.5em #374048;">
       <b-col cols="12" md="auto">
          <Logo />
        </b-col>
       <b-col> 
         <ToolBar /> 
        </b-col>
    </b-row>
     <b-row no-gutters>
       <b-col cols="12" md="auto" class="bordered-box"> 
         <GatesPallete /> 
        </b-col>
        <b-col class="bordered-box">
          <Editor />
        </b-col>
    </b-row>
  </b-container>    
  
</template>

<script>
import Editor from "./components/Editor";
import GatesPallete from "./components/GatesPallete";
import Logo from "./components/Logo";
import ToolBar from "./components/ToolBar";
import { retriveHelpHtml, retriveGateMatrixHtml } from "./help/help.js";

export default {
  name: "App",
  components: {
    Logo,
    Editor,
    GatesPallete,
    ToolBar,
  },
  data() {
    return {
      helpHtml: retriveHelpHtml(""),
      gateImage: require("./assets/uranium.png"),
      gateMatrixHtml: "",
      gateName: "",
    };
  },
  methods: {
    updateHelpContents: function (gateName) {

      var note = document.getElementById("note");
      if (gateName){
        note.style.visibility = "visible";
      } else {
        note.style.visibility = "hidden";
      }

      this.helpHtml = retriveHelpHtml(gateName);
      this.gateMatrixHtml = retriveGateMatrixHtml(gateName);
      if (gateName == null) {
        this.gateName = "";
        this.gateImage = require("./assets/uranium.png");
      } else{
        this.gateName = gateName;
        if (window.useColoredGates){
          if (gateName.includes("ctrl-")){
            this.gateImage = require("./assets/colored-gates/" + gateName + "-1.svg");     
          } else if (gateName == "toffoli") { 
            this.gateImage = require("./assets/colored-gates/toffoli-1-1.svg");
          } else {
            this.gateImage = require("./assets/colored-gates/" + gateName + ".svg");
          }
        } else {
          if (gateName.includes("ctrl-")){
            this.gateImage = require("./assets/blue-gates/" + gateName + "-1.svg");     
          } else if (gateName == "toffoli") { 
            this.gateImage= require("./assets/blue-gates/toffoli-1-1.svg");
          } else {
            this.gateImage = require("./assets/blue-gates/" + gateName + ".svg");
          }
        }
      }
    }
  },
  created() {
    this.$root.$on('updateHelpEvent', (selectedGate) => {this.updateHelpContents(selectedGate)});
  },
};
</script>

<style>

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

</style>
