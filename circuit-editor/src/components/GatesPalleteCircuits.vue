<template>
  <div class="gates-pallete" id="gates-pallete-circuit">

    <table id="gates-pallete-table-circuit" style="table-layout: fixed; max-width: 269px;">
      <div v-for="circuitIndex in this.getCompatibleCircuitsNo()" v-bind:key="circuitIndex">
        <tr>
          <td style="width: 5px; height: 5px; max-height: 5px; text-align: center; padding: 5px;">
            <div @mouseover="onPenMouseOver(circuitIndex - 1)" @mouseleave="onPenMouseLeave(circuitIndex - 1)">
              <div v-if="coloredGatesCookie">
                <b-icon class="pencil" v-if="editCircuitNamePenIsHovered[circuitIndex - 1]" icon="pencil-fill" v-on:click="showEditCircuitModal(circuitIndex - 1)" title="Edit circuit name and abbreviation" style="color: MediumSlateBlue;" font-scale="1.4"></b-icon>
                <b-icon class="pencil" v-else icon="pencil" style="color: MediumSlateBlue;" font-scale="1.4"></b-icon>
              </div>
              <div v-else>
                <b-icon class="pencil" v-if="editCircuitNamePenIsHovered[circuitIndex - 1]" icon="pencil-fill" v-on:click="showEditCircuitModal(circuitIndex - 1)" title="Edit circuit name and abbreviation" style="color: #678efa;" font-scale="1.4"></b-icon>
                <b-icon class="pencil" v-else icon="pencil" style="color: #678efa;" font-scale="1.4"></b-icon>
              </div>
            </div>
          </td>
          <td style="color: white; text-align: center; width: 268px; height: 5px; max-height: 5px; padding: 5px;">
            {{ getCircuitName(circuitIndex - 1) }}
          </td>
          <td v-on:click="gateSelected" style="height: 50px; max-height: 50px; width: 50px; max-width: 50px; padding: 5px; text-align: center;">
            <div v-bind:id="'circuit-gate-div-' + (circuitIndex - 1)" draggable="true" class="circuit-gate-div"></div>
          </td>
        </tr>
      </div>
    </table>

    <b-modal ref="change-circuit-name-dialog" size="lg"  centered hide-footer hide-header>

      <table class="modal-dialog-table">
        <tr>
          <td style="width: 5%;"></td>
          <td style="width: 25%;"></td>
          <td style="width: 65%;"></td>
          <td class="no-resize-cell" style="width: 5%;">
            <div v-b-hover="handleModalCloseHover">
              <b-icon v-if="modalCloseIsHovered" v-on:click="hideEditCircuitModal()" v-b-tooltip.hover title="Close dialog" icon="x-square" style="color: #7952b3; float: right;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideEditCircuitModal()" v-b-tooltip.hover title="Close dialog" style="color: #7952b3; float: right;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td style="width: 5%;"></td>
          <td style="width: 25%;" align="left">Circuit Name:</td>
          <td style="width: 65%;">
            <b-form-input @keyup.enter.native="handleSaveCircuitNameAndAbbreviation()" v-model="circuitName" type="text"></b-form-input>
          </td>
          <td style="width:5%;"></td>
        </tr>
        <tr>
          <td width="30px"></td>
          <td style="width: 15%;" align="left">Circuit Abbreviation:</td>
          <td style="width: 75%;">
            <b-form-input @keyup.enter.native="handleSaveCircuitNameAndAbbreviation()" v-model="circuitAbbreviation" type="text"></b-form-input>
          </td>
          <td style="width:5%;"></td>
        </tr>
        <tr>
          <td style="width: 5%;"></td>
          <td style="width: 25%;"></td>
          <td style="width: 65%;"></td>
          <td class="no-resize-cell" style="width: 5%;">
            <div v-b-hover="handleModalSaveHover">
              <b-icon v-if="modalSaveIsHovered" v-on:click="handleSaveCircuitNameAndAbbreviation()" icon="check" title="Save changes" style="color: #7952b3; float: right;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSaveCircuitNameAndAbbreviation()" icon="check" style="color: #7952b3; float: right;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>

    </b-modal>

  </div>
</template>

<script>
import { createCircuitDragImageGhost, getUserInterfaceSetting, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
import { getCompatibleCircuitIds, updateGatesAbbreviation } from "../store/modules/editorHelper.js";
import { mapActions } from 'vuex';
export default {
  name: "GatesPalleteCircuits",
  data() {
    return {
      compatibleCircuitIds: [],
      editCircuitNamePenIsHovered: this.initPenHoverStauses(),
      modalCloseIsHovered: false,
      modalSaveIsHovered:  false,
      editedCircuitId: null,
      circuitName:  "",
      circuitAbbreviation: "",
      coloredGatesCookie: getUserInterfaceSetting("colored-gates") === 'true',
    }
  },
  created() {
    this.$root.$on('currentCircuitSwitch', () => {
      this.$data.compatibleCircuitIds = getCompatibleCircuitIds(this.$store.state.circuitEditorModule);
      this.$forceUpdate();
    });
    this.$root.$on("projectLoaded", () => {
      this.$data.compatibleCircuitIds = getCompatibleCircuitIds(this.$store.state.circuitEditorModule);
      this.$forceUpdate();
    });
    this.$root.$on("switchGateColors", () => { this.updateGateImagesColor(); });
    // this is a hack to make drag gate image shwo even for the first drag attempt
    // whithout this, drag image does not show in first drag, presumably because drag image ghost
    // is created inside drag event, so drag would have already started by the time
    // we create your custom ghost image. Not sure why this problem does not occur for other gates though ..
    let dragImageGhost = createCircuitDragImageGhost();
    document.body.removeChild(dragImageGhost);
  },
  updated() {
    for (let i = 0; i < this.getCompatibleCircuitsNo(); i++) {
      let svgDiv = document.getElementById(`circuit-gate-div-${i}`);
      if (svgDiv != null) {
        svgDiv.innerHTML = this.getCircuitGateImage(i);
        svgDiv.addEventListener("dragstart", this.dragStart);
        svgDiv.addEventListener('dragend', this.dragEnd);
      }
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['refreshCircuit', 'updateCircuitName', 'updateCircuitAbbreviation']),
    getCompatibleCircuitsNo : function () {
      return this.$data.compatibleCircuitIds.length;
    },
    initPenHoverStauses: function () {
      let hoverStatuses = [];
      for (let i = 0; i < getCompatibleCircuitIds(this.$store.state.circuitEditorModule); i++) {
        hoverStatuses[i] = false;
      }
      return hoverStatuses;
    },
    onPenMouseOver(circuitIndex) {
      this.$data.editCircuitNamePenIsHovered[circuitIndex] = true;
      this.$forceUpdate();
    },
    onPenMouseLeave(circuitIndex) {
      this.$data.editCircuitNamePenIsHovered[circuitIndex] = false;
      this.$forceUpdate();
    },
    getCircuitName: function (circuitIndex) {
      let id = this.$data.compatibleCircuitIds[circuitIndex];
      return this.$store.state.circuitEditorModule[id]["circuit_name"];
    },
    getCircuitGateImage(circuitIndex) {
      let id = this.$data.compatibleCircuitIds[circuitIndex];
      let abbreviation = this.$store.state.circuitEditorModule[id]["circuit_abbreviation"];
      let gateColor = window.circuitGateColor;
      if (getUserInterfaceSetting('colored-gates') === 'false'){
        gateColor = window.blueGatesColor;
      }
      let gateImage = '<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">';
      gateImage += '<g>';
      if (abbreviation.length == 1){
        gateImage += `<rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke:${gateColor}; stroke-width:3.8; stroke-opacity:1;"/>`;
        gateImage += `<text x="8" y="28" style="font-size: 27px; font-style: italic; fill: ${gateColor}; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">${abbreviation}</tspan></text>`;
      } else if (abbreviation.length == 2){
        gateImage += `<rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke:${gateColor}; stroke-width:3.8; stroke-opacity:1;"/>`;
        gateImage += `<text x="5" y="28" style="font-size: 27px; font-style: italic; fill: ${gateColor}; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">${abbreviation}</tspan></text>`;
      } else {
        gateImage += `<rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke:${gateColor}; stroke-width:3.8; stroke-opacity:1;"/>`;
        gateImage += `<text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: ${gateColor}; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">${abbreviation}</tspan></text>`;
      }
      gateImage += '</g>';
      gateImage += '</svg>';
      return gateImage;
    },
    updateGateImagesColor(){
      // circuit gates icon
      for (let i = 0; i < this.getCompatibleCircuitsNo(); i++) {
        let svgDiv = document.getElementById(`circuit-gate-div-${i}`);
        if (svgDiv != null) {
          svgDiv.innerHTML = this.getCircuitGateImage(i);
        }
      }
      // edit circuit name icons
      let pencils = document.getElementsByClassName("pencil");
      for (let i = 0; i < pencils.length; i++) {
        let pencil = pencils[i];
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          pencil.style.color = window.circuitGateColor;
        } else {
          pencil.style.color = window.blueGatesColor;
        }
      }
    },
    showEditCircuitModal: function (circuitIndex) {
      this.$data.editedCircuitId = this.$data.compatibleCircuitIds[circuitIndex];
      this.$data.circuitName = this.$store.state.circuitEditorModule[this.$data.editedCircuitId]["circuit_name"];
      this.$data.circuitAbbreviation = this.$store.state.circuitEditorModule[this.$data.editedCircuitId]["circuit_abbreviation"];
      this.$refs['change-circuit-name-dialog'].show();
      this.modalCloseIsHovered = false;
      this.modalSaveIsHovered = false;
    },
    hideEditCircuitModal: function () {
      this.$refs['change-circuit-name-dialog'].hide();
    },
    handleModalCloseHover(hovered) {
      this.modalCloseIsHovered = hovered;
    },
    handleModalSaveHover(hovered) {
      this.modalSaveIsHovered = hovered;
    },
    handleSaveCircuitNameAndAbbreviation: function() {

      let circuitName = this.$data.circuitName;
      if (circuitName.length == 0) {
        alert("Circuit name is empty.");
        return;
      }

      let circuitAbbreviation = this.$data.circuitAbbreviation;
      if (circuitAbbreviation.length == 0) {
        alert("Circuit abbreviation is empty.");
        return;
      }
      if (circuitAbbreviation.length > 3) {
        alert("Max 3 characters allowed for circuit abbreviation.");
        return;
      }

      let circuitId = this.$data.editedCircuitId;
      this.updateCircuitName([circuitId, circuitName]);
      this.updateCircuitAbbreviation([circuitId, circuitAbbreviation]);
      this.$refs['change-circuit-name-dialog'].hide();
      updateGatesAbbreviation(this.$store.state.circuitEditorModule, circuitId, circuitAbbreviation);
      this.$root.$emit("circuitAbbreviationChanged");
      this.$forceUpdate();
    },
    dragStart: function(event) {
      hideTooltips();
      if (event && event.target) {
        let circuitIndex = parseInt(event.target.id.replace('circuit-gate-div-', ''));
        let id = this.$data.compatibleCircuitIds[circuitIndex];
        event.dataTransfer.setData("gateName", "circuit");
        event.dataTransfer.setData("drag-origin", "gates-pallete");
        event.dataTransfer.setData("circuit_id", this.$store.state.circuitEditorModule[id]["circuit_id"]);
        event.dataTransfer.setData("circuit_abbreviation", this.$store.state.circuitEditorModule[id]["circuit_abbreviation"]);
        event.dataTransfer.setData("circuit_power", "1");
        let dragImageGhost = createCircuitDragImageGhost();
        event.dataTransfer.setDragImage(dragImageGhost, 20, 20);
      }
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
    gateSelected: function (event) {
      let cell = event.target;
      while (cell.tagName.toUpperCase() != "TD"){
        cell = cell.parentElement;
      }
      let selectedCellBgColor = cell.style.backgroundColor.toUpperCase();
      // reset bckg for all cells
      for (const id of ["gates-pallete-table-1", "gates-pallete-table-2", "gates-pallete-table-n", "gates-pallete-table-circuit"])
      {
        let table = document.getElementById(id);
        let cells = table.getElementsByTagName("TD");
        for (var i = 0; i < cells.length; i++) {
          cells[i].style.backgroundColor = window.darkBackgroundColor;
        }
      }
      // set bckg black for selected cell
      if (cell != null) {
        if (selectedCellBgColor != "BLACK"){
          cell.style.backgroundColor = "Black";
          this.$root.$emit("updateHelpEvent", "circuit");
        } else {
          this.$root.$emit("updateHelpEvent", null);
          cell.style.backgroundColor = window.darkBackgroundColor;
        }
      }
    }
  },
};
</script>

<style scoped>

.gates-pallete {
  overflow: scroll;
  min-height: calc(var(--gates-pallete-height));
  max-height: calc(var(--gates-pallete-height));
  width: 100%;
  height: 100%;
}

table {
  text-align: center;
  background-color: #374048; 
  table-layout: fixed;

  /* disable selection on mouse drag over */
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

th,
td {
  border: 1px solid whitesmoke;
  padding: 13px;
  width: 67px;
  height: 67px;
}
.td-empty {
  border: 1px solid #374048;
  padding: 13px;
  width: 67px;
  height: 67px;
}

.modal-dialog-table {
  table-layout: fixed;
  width: 100%;
  background-color: white;
}

.modal-dialog-table td {
  height: 35px;
  max-height:35px;
  border: 0px;
  padding: 5px;
}

.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

.circuit-gate-image {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
}

.circuit-gate-div {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
}

.modal-lg {
  width: 100px;
  min-width: 100px;
  max-width: 100px;
}

</style>