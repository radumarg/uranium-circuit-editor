<template>
  <div class="circuit-editor" id="circuit-editor-canvas">
    <table ref="gatesTable" id="gatesTable" cellspacing="0" cellpadding="0">
      <div v-for="row in getRowsInGatesTable" v-bind:key="row">
        <tr>
          <td
            v-for="cell in getGatesTableCells(row - 1)"
            v-bind:key="cell.column"
            :height="cell.height"
            :width="cell.width"
          >
            <div v-if="cell.name === 'vertical-transition-cell-square-debug'">
             <!-- remove -debug to activate -->
             <EmptyCellSquare />
            </div>
             <div v-if="cell.name === 'vertical-transition-cell-rectangle-debug'">
              <!-- remove -debug to activate -->
              <EmptyCellRectangle />
            </div>
            <div v-else-if="cell.name === 'horizontal-transition-cell'">
              <HorizontalTransitionCell />
            </div>
            <div v-else-if="cell.name === 'pauli-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-root-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-root-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'toffoli-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'r-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'r-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'st-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'st-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-circle-small'" :key="cell.key">
              <SwapCircle />
            </div>
            <div v-else-if="cell.name === 'swap-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'swap-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'fredkin-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
             <div v-else-if="cell.name === 'ising-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'ising-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'empty-cell'">
              <EmptyCell :id="cell.id" :qrow="cell.qrow" :step="cell.step"/>
            </div>
            <div v-else-if="cell.name === 'zero-state'">
              <ZeroState :title="cell.tooltip" />
            </div>
            <div v-else-if="cell.name === 'hadamard'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'identity'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-x'">
              <MeasureGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-y'">
              <MeasureGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-z'">
              <MeasureGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-x'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-y'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-z'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 's'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 's-dagger'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 't'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 't-dagger'">
              <SingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'rx-theta'">
              <ParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ry-theta'">
              <ParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'rz-theta'">
              <ParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u1'">
              <UnitaryParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u2'">
              <UnitaryBiParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u3'">
              <UnitaryThreeParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-hadamard'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-pauli-x'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-pauli-y'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-pauli-z'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-sqrt-not'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-s'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-s-dagger'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-t'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-t-dagger'">
              <ControlledSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-rx-theta'">
              <ControlledParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-ry-theta'">
              <ControlledParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-rz-theta'">
              <ControlledParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-u1'">
              <ControlledUnitaryParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-u2'">
              <ControlledUnitaryBiParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-u3'">
              <ControlledUnitaryThreeParametricSingleBitGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name.includes('ctrl') && cell.name.includes('stub')">
              <ControlledGateStub :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="!cell.name.includes('ctrl') && cell.name.includes('pauli') && cell.name.includes('root')">
              <PauliRootGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name.includes('ctrl') && cell.name.includes('pauli') && cell.name.includes('root')">
              <ControlledPauliRootGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :controls="cell.controls" :controlstates="cell.controlstates" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap'">
              <SwapGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-phi'">
              <ParametricSwapGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'sqrt-swap'">
              <SwapVariantGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'iswap'">
              <SwapVariantGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'xx' || cell.name === 'yy' || cell.name === 'zz'">
              <IsingGate :id="cell.id" :targets="cell.targets" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>  
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { undoGatesSelection } from "../store/modules/editorHelper.js";
import EmptyCell from "./EmptyCell";
import ZeroState from "./ZeroState";
import HorizontalTransitionCell from "./HorizontalTransitionCell";
import VerticalTransitionCellShort from "./VerticalTransitionCellShort"
import VerticalTransitionCellLong from "./VerticalTransitionCellLong";
import SingleBitGate from "./SingleBitGate";
import PauliRootGate from "./PauliRootGate";
import ParametricSingleBitGate from "./ParametricSingleBitGate";
import UnitaryParametricSingleBitGate from "./UnitaryParametricSingleBitGate";
import UnitaryBiParametricSingleBitGate from "./UnitaryBiParametricSingleBitGate";
import UnitaryThreeParametricSingleBitGate from "./UnitaryThreeParametricSingleBitGate";
import MeasureGate from "./MeasureGate";
import ControlledSingleBitGate from "./ControlledSingleBitGate";
import ControlledPauliRootGate from "./ControlledPauliRootGate";
import ControlledParametricSingleBitGate from "./ControlledParametricSingleBitGate";
import ControlledGateStub from "./ControlledGateStub";
import ControlledUnitaryParametricSingleBitGate from "./ControlledUnitaryParametricSingleBitGate";
import ControlledUnitaryBiParametricSingleBitGate from "./ControlledUnitaryBiParametricSingleBitGate";
import ControlledUnitaryThreeParametricSingleBitGate from "./ControlledUnitaryThreeParametricSingleBitGate";
import EmptyCellRectangle from "./EmptyCellRectangle";
import EmptyCellSquare from "./EmptyCellSquare";
import SwapGate from "./SwapGate";
import SwapVariantGate from "./SwapVariantGate";
import ParametricSwapGate from "./ParametricSwapGate";
import IsingGate from "./IsingGate";
import SwapCircle from "./SwapCircle";
export default {
  name: "Editor",
  components: {
    EmptyCell,
    ZeroState,
    HorizontalTransitionCell,
    VerticalTransitionCellShort,
    VerticalTransitionCellLong,
    SingleBitGate,
    PauliRootGate,
    ParametricSingleBitGate,
    UnitaryParametricSingleBitGate,
    UnitaryBiParametricSingleBitGate,
    UnitaryThreeParametricSingleBitGate,
    MeasureGate,
    ControlledSingleBitGate,
    ControlledPauliRootGate,
    ControlledParametricSingleBitGate,
    ControlledUnitaryParametricSingleBitGate,
    ControlledUnitaryBiParametricSingleBitGate,
    ControlledUnitaryThreeParametricSingleBitGate,
    ControlledGateStub,
    EmptyCellRectangle,
    EmptyCellSquare,
    SwapGate,
    SwapVariantGate,
    ParametricSwapGate,
    IsingGate,
    SwapCircle,
  },
  computed: mapGetters("circuitEditorModule/", [
    "getGatesTableCells",
    "getRowsInGatesTable"
  ]),
  created() {
    this.$root.$on("switchThemeDark", boolFlag => {
      if (boolFlag) {
        this.$refs["gatesTable"].style.backgroundColor = window.darkBackgroundColor;
        this.$refs["gatesTable"].style.borderTopColor = window.darkBackgroundColor;
        this.$refs["gatesTable"].style.borderBottom = `solid 0.45em ${window.darkBackgroundColor}`;
      } else {
        if(getUserInterfaceSetting('colored-gates') === 'true'){
          this.$refs["gatesTable"].style.backgroundColor = window.lightBackgroundColor;
          this.$refs["gatesTable"].style.borderTopColor = window.lightBackgroundColor;
          this.$refs["gatesTable"].style.borderBottom = `solid 0.45em ${window.lightBackgroundColor}`;
        } else {
          this.$refs["gatesTable"].style.backgroundColor = window.whiteBackgroundColor;
          this.$refs["gatesTable"].style.borderTopColor = window.whiteBackgroundColor;
          this.$refs["gatesTable"].style.borderBottom = `solid 0.45em ${window.whiteBackgroundColor}`;
        }
      }
      if (window.selectBackgroundColor)
        undoGatesSelection(true, true);
    });
  },
};
</script>

<style scoped>

.circuit-editor {
  position: absolute;
  overflow: scroll;
  width: 100%;
  height: 100%;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

table {
  background-color: ghostwhite;
  border: 0px;
  border-spacing: 0px;
  table-layout: fixed;
  text-align: center;
}

th, td {
  border: 0px;
  padding: 0px;
}

</style>
