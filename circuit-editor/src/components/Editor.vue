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
              <VerticalTransitionCellLong :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-root-line-long'">
              <VerticalTransitionCellLong :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'toffoli-line-long'">
              <VerticalTransitionCellLongToffoli :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'r-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'r-line-long'">
              <VerticalTransitionCellLong :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'st-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'st-line-long'">
              <VerticalTransitionCellLong :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-line-long'">
              <VerticalTransitionCellLong :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u-line-long'">
              <VerticalTransitionCellLong :step="cell.step" :qbit="cell.qbit" :id="cell.id" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-circle-small'" :key="cell.key">
              <SwapCircle />
            </div>
            <div v-else-if="cell.name === 'swap-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'swap-line-long'">
              <VerticalTransitionCellLongSwap :id="cell.id" :step="cell.step" :qbit="cell.qbit" :qbit2="cell.qbit2" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'fredkin-line-long'">
              <VerticalTransitionCellLongFredkin :id="cell.id" :step="cell.step" :qbit="cell.qbit" :qbit2="cell.qbit2" :name="cell.name" :key="cell.key"/>
            </div>
             <div v-else-if="cell.name === 'ising-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'ising-line-long'">
              <VerticalTransitionCellLongIsing :id="cell.id" :step="cell.step" :qbit="cell.qbit" :qbit2="cell.qbit2" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'empty-cell'">
              <EmptyCell :qbit="cell.qbit" :step="cell.step" :id="cell.id"/>
            </div>
            <div v-else-if="cell.name === 'zero-state'">
              <ZeroState :title="cell.tooltip" />
            </div>
            <div v-else-if="cell.name === 'hadamard'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'identity'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-x'">
              <MeasureGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-y'">
              <MeasureGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-z'">
              <MeasureGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-x'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-y'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-z'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 's'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 's-dagger'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 't'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 't-dagger'">
              <SingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'rx-theta'">
              <ParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ry-theta'">
              <ParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'rz-theta'">
              <ParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u1'">
              <UnitaryParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u2'">
              <UnitaryBiParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u3'">
              <UnitaryThreeParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-hadamard'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-pauli-x'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-pauli-y'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-pauli-z'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-sqrt-not'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-s'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-s-dagger'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-t'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-t-dagger'">
              <ControlledSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-rx-theta'">
              <ControlledParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-ry-theta'">
              <ControlledParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-rz-theta'">
              <ControlledParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-u1'">
              <ControlledUnitaryParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-u2'">
              <ControlledUnitaryBiParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-u3'">
              <ControlledUnitaryThreeParametricSingleBitGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name.includes('ctrl') && cell.name.includes('stub')">
              <ControlledGateStub :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :control2="cell.control2" :controlstate2="cell.controlstate2" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="!cell.name.includes('ctrl') && cell.name.includes('pauli') && cell.name.includes('root')">
              <PauliRootGate :qbit="cell.qbit" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name.includes('ctrl') && cell.name.includes('pauli') && cell.name.includes('root')">
              <ControlledPauliRootGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap'">
              <GateSwap :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-phi'">
              <ParametricGateSwap :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'sqrt-swap'">
              <GateSwapVariant :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'iswap'">
              <GateSwapVariant :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'fredkin'">
              <FredkinGate :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-swap-stub-up'">
              <FredkinGateControlStubUp :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ctrl-swap-stub-down'">
              <FredkinGateControlStubDown :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'fredkin-control-middle'">
              <FredkinGateControlMiddle :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'toffoli'">
              <ToffoliGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :control2="cell.control2" :controlstate2="cell.controlstate2" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'toffoli-2nd-control-1' || cell.name === 'toffoli-2nd-control-0'">
              <Toffoli2NdControlGate :qbit="cell.qbit" :qrow="cell.qrow" :control="cell.control" :controlstate="cell.controlstate" :control2="cell.control2" :controlstate2="cell.controlstate2" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'xx' || cell.name === 'yy' || cell.name === 'zz'">
              <IsingGate :qbit="cell.qbit" :qbit2="cell.qbit2" :qrow="cell.qrow" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>  
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import EmptyCell from "./EmptyCell";
import ZeroState from "./ZeroState";
import HorizontalTransitionCell from "./HorizontalTransitionCell";
import VerticalTransitionCellShort from "./VerticalTransitionCellShort"
import VerticalTransitionCellLong from "./VerticalTransitionCellLong";
import VerticalTransitionCellLongSwap from "./VerticalTransitionCellLongSwap";
import VerticalTransitionCellLongFredkin from "./VerticalTransitionCellLongFredkin";
import VerticalTransitionCellLongIsing from "./VerticalTransitionCellLongIsing";
import VerticalTransitionCellLongToffoli from "./VerticalTransitionCellLongToffoli";
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
import GateSwap from "./GateSwap";
import GateSwapVariant from "./GateSwapVariant";
import ParametricGateSwap from "./ParametricGateSwap";
import IsingGate from "./IsingGate";
import SwapCircle from "./SwapCircle";
import Toffoli2NdControlGate from "./Toffoli2NdControlGate";
import ToffoliGate from "./ToffoliGate";
import FredkinGate from "./FredkinGate";
import FredkinGateControlStubUp from "./FredkinGateControlStubUp";
import FredkinGateControlStubDown from "./FredkinGateControlStubDown";
import FredkinGateControlMiddle from "./FredkinGateControlMiddle";
export default {
  name: "Editor",
  components: {
    EmptyCell,
    ZeroState,
    HorizontalTransitionCell,
    VerticalTransitionCellShort,
    VerticalTransitionCellLong,
    VerticalTransitionCellLongSwap,
    VerticalTransitionCellLongFredkin,
    VerticalTransitionCellLongIsing,
    VerticalTransitionCellLongToffoli,
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
    GateSwap,
    GateSwapVariant,
    ParametricGateSwap,
    IsingGate,
    SwapCircle,
    Toffoli2NdControlGate,
    ToffoliGate,
    FredkinGate,
    FredkinGateControlStubUp,
    FredkinGateControlStubDown,
    FredkinGateControlMiddle,
  },
  computed: mapGetters("circuitEditorModule/", [
    "getGatesTableCells",
    "getRowsInGatesTable"
  ]),
  created() {
    this.$root.$on("switchThemeDark", boolFlag => {
      if (boolFlag) {
        this.$refs["gatesTable"].style.backgroundColor = "#374048";
        this.$refs["gatesTable"].style.borderTopColor = "#374048";
        this.$refs["gatesTable"].style.borderBottom = "solid 0.45em #374048";
      } else {
        if(Vue.$cookies.get('colored-gates') === 'true'){
          this.$refs["gatesTable"].style.backgroundColor = "ghostwhite";
          this.$refs["gatesTable"].style.borderTopColor = "ghostwhite";
          this.$refs["gatesTable"].style.borderBottom = "solid 0.45em ghostwhite";
        } else {
          this.$refs["gatesTable"].style.backgroundColor = "white";
          this.$refs["gatesTable"].style.borderTopColor = "white";
          this.$refs["gatesTable"].style.borderBottom = "solid 0.45em white";
        }
      }
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
