<template>
  <div class="gates-pallete" id="gates-pallete-circuit">

    <table id="gates-pallete-table-circuit" style="table-layout: fixed; max-width: 269px;">
      <!-- <div v-for="circuitIndex in this.getCompatibleCircuitIds().length" v-bind:key="circuitIndex"> -->
        <div v-for="circuitIndex in 1" v-bind:key="circuitIndex">
        <tr>

          <td style="width: 5px; height: 5px; max-height: 5px; text-align: center; padding: 5px;">
            <div @mouseover="onPenMouseOver(circuitIndex - 1)" @mouseleave="onPenMouseLeave(circuitIndex - 1)">
              <b-icon v-if="editCircuitNamePenIsHovered[circuitIndex - 1]" icon="pencil-fill" v-on:click="showEditCircuitModal(circuitIndex - 1)" title="Edit circuit name and abbreviation" style="color: MediumSlateBlue;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="pencil" style="color: MediumSlateBlue;" font-scale="1.4"></b-icon>
            </div>
          </td>


          <td style="color: white; text-align: center; width: 268px; height: 5px; max-height: 5px; padding: 5px;">
            {{ getCircuitName(circuitIndex - 1) }}
          </td>

          <td style="height: 50px; max-height: 50px; width: 50px; max-width: 50px; padding: 5px;">
            
            <!-- <div v-if="coloredGatesCookie" type="parametric-svg">
              <img src="../assets/colored-gates/circuit.svg" @dragend="dragEnd" @dragstart="dragStart" class="circuit-gate-image" title="circuit" alt="Circuit Gate"/>
              <param name="abbreviation" value="2"/>
              <param name="fill" value="orange"/>
            </div>
            <div v-else type="parametric-svg">
              <img src="../assets/blue-gates/qft.svg" @dragend="dragEnd" @dragstart="dragStart" class="circuit-gate-image" title="circuit" alt="Circuit Gate"/>
              <param name="abbreviation" value="2"/>
              <param name="fill" value="orange"/>
            </div> -->

            <!-- <object v-if="coloredGatesCookie" :data="require('../assets/colored-gates/circuit.svg')" type="image/svg+xml" class="circuit-gate-image" title="circuit" alt="Circuit Gate">
              <param name="abbreviation" value="2"/>
              <param name="fill" value="orange"/>
            </object> -->
  

      <div draggable="true" id="xyz">
      <svg class="circuit-gate-image" xmlns="http://www.w3.org/2000/svg" title="circuit">
        <g>
          <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke:MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
          <text x="8" y="28" style="font-size: 27px; font-style: italic;  fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">B</tspan></text>
        </g>
      </svg>
      </div>


            
            <!-- <object v-else :data="require('../assets/blue-gates/circuit.svg')" type="image/svg+xml" class="circuit-gate-image" title="circuit" alt="Circuit Gate">
            </object> -->
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
import { createCircuitDragImageGhost, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
import { mapActions } from 'vuex';
export default {
  name: "GatesPalleteCircuits",
  data() {
    return {
      editCircuitNamePenIsHovered: this.initPenHoverStauses(),
      modalCloseIsHovered: false,
      modalSaveIsHovered:  false,
      editedCircuitId: null,
      circuitName:  "",
      circuitAbbreviation: "",
    }
  },
  created() {
    this.$root.$on('currentCircuitSwitch', () => {this.$forceUpdate()});
  },
  mounted() {
    var svgDiv = document.getElementById("xyz");
    if (svgDiv != null){
      svgDiv.addEventListener("dragstart", this.dragStart);
      svgDiv.addEventListener('dragend', this.dragEnd);
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['refreshCircuit', 'updateCircuitName', 'updateCircuitAbbreviation']),
    initPenHoverStauses: function () {
      let hoverStatuses = [];
      for (let i = 0; i < this.getCompatibleCircuitIds().length; i++) {
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
    getCompatibleCircuitIds: function () {
      let ids = [];
      let currentCircuitName = this.$store.state.circuitEditorModule[window.currentCircuitId]["circuit_name"];
      for (let i = 0; i < window.circuitIds.length; i++) {
        let id = window.circuitIds[i];
        let circuitName = this.$store.state.circuitEditorModule[id]["circuit_name"];
        if (currentCircuitName != circuitName) {
          ids.push(id);
        }
      }
      return ids;
    },
    getCircuitName: function (circuitIndex) {
      let compatibleCicuitIds = this.getCompatibleCircuitIds();
      let id = compatibleCicuitIds[circuitIndex];
      return this.$store.state.circuitEditorModule[id]["circuit_name"];
    },
    showEditCircuitModal: function (circuitIndex) {
      let compatibleCicuitIds = this.getCompatibleCircuitIds();
      this.$data.editedCircuitId = compatibleCicuitIds[circuitIndex];
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
      this.$forceUpdate();
      this.refreshCircuit();
    },
    dragStart: function(event) {
      hideTooltips();
      event.dataTransfer.setData("gateName", "circuit");
      event.dataTransfer.setData("drag-origin", "gates-pallete");
      event.dataTransfer.setData("circuit_id", "-1");
      event.dataTransfer.setData("circuit_abbreviation", "BO");
      event.dataTransfer.setData("circuit_power", "1");
      event.dataTransfer.setData("targets_expression", "true");
      let dragImageGhost = createCircuitDragImageGhost();
      event.dataTransfer.setDragImage(dragImageGhost, 20, 20);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
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

.modal-lg {
  width: 100px;
  min-width: 100px;
  max-width: 100px;
}

</style>