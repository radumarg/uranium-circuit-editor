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
            <div v-else-if="cell.name === 'vertical-transition-cell-rectangle-debug'">
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
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-root-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'c-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'c-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'p-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'p-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'r-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'r-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'st-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'st-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'aggregate-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'aggregate-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'qft-line-short'">
              <VerticalTransitionCellShort :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'qft-line-long'">
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
            <div v-else-if="cell.name === 'ising-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'ising-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'bwecp-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'bwecp-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'magic-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'magic-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'canonical-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'canonical-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'a-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'a-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'cross-resonance-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'cross-resonance-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'givens-line-short'" :key="cell.key">
              <VerticalTransitionCellShort :name="cell.name" />
            </div>
            <div v-else-if="cell.name === 'givens-line-long'">
              <VerticalTransitionCellLong :id="cell.id" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'empty-cell'">
              <EmptyCell :id="cell.id" :qrow="cell.qrow" :step="cell.step"/>
            </div>
            <div v-else-if="cell.name === 'zero-state'">
              <ZeroState :title="cell.tooltip" />
            </div>
            <div v-else-if="cell.name === 'aggregate'">
              <AggregateGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :gates="[...cell.gates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-xy'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-yz'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'hadamard-zx'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'identity'">
              <ElementaryGate :id="cell.id" :targets="[...cell.targets]" :controls="[]" :controlstates="[]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-x'">
              <MeasureGate :id="cell.id" :targets="[...cell.targets]" :controls="[]" :controlstates="[]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-y'">
              <MeasureGate :id="cell.id" :targets="[...cell.targets]" :controls="[]" :controlstates="[]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'measure-z'">
              <MeasureGate :id="cell.id" :targets="[...cell.targets]" :controls="[]" :controlstates="[]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :bit="cell.bit" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'p'">
              <ParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-x'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-y'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'pauli-z'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 's'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 's-dagger'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 't'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 't-dagger'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'v'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'v-dagger'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'h'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'h-dagger'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'c'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'c-dagger'">
              <SingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'rx-theta'">
              <ParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ry-theta'">
              <ParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'rz-theta'">
              <ParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u1'">
              <UnitaryParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u2'">
              <UnitaryBiParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'u3'">
              <UnitaryThreeParametricSingleQbitGate :id="cell.id" :targets="[...cell.targets]" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :qrow="cell.qrow" :step="cell.step" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name.includes('root') && cell.name.includes('pauli') && !cell.name.includes('stub')">
              <PauliRootGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'molmer-sorensen'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'molmer-sorensen-dagger'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'berkeley'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'berkeley-dagger'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'w'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ecp'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'ecp-dagger'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'magic'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'magic-dagger'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'cross-resonance'">
              <ParametricTwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'cross-resonance-dagger'">
              <ParametricTwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-theta'">
              <ParametricTwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'sqrt-swap'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
             <div v-else-if="cell.name === 'sqrt-swap-dagger'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'iswap'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'fswap'">
              <TwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-root'">
              <TwoTargetQubitsRootGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :root="cell.root" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'swap-root-dagger'">
              <TwoTargetQubitsRootGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :root="cell.root" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'xx' || cell.name === 'yy' || cell.name === 'zz' || cell.name === 'xy'">
              <ParametricTwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'a'">
              <BiParametricTwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :phi="cell.phi" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'givens'">
              <ParametricTwoTargetQubitsGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :theta="cell.theta" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'qft' || cell.name === 'qft-dagger'">
              <QftGate :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name.includes('stub')">
              <ControlledGateStub :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :gates="[...cell.gates]" :control="cell.control" :controlstate="cell.controlstate" :step="cell.step" :gate="cell.gate" :name="cell.name" :root="cell.root" :theta="cell.theta" :phi="cell.phi" :lambda="cell.lambda" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'box-middle-short'">
              <BoxVerticalTransitionCellShort :id="cell.id" :targets="[...cell.targets]" :qrow="cell.qrow" :controls="[...cell.controls]" :controlstates="[...cell.controlstates]" :step="cell.step" :gate="cell.gate" :name="cell.name" :title="cell.tooltip" :img="cell.img" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'barrier'">
              <Barrier :id="cell.id" :step="cell.step" :name="cell.name" :key="cell.key"/>
            </div>
            <div v-else-if="cell.name === 'barrier-vertical-transition-cell'">
              <BarrierVerticalTransitionCell />
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
import HorizontalTransitionCell from "./HorizontalTransitionCell";
import VerticalTransitionCellShort from "./VerticalTransitionCellShort"
import VerticalTransitionCellLong from "./VerticalTransitionCellLong";
import BoxVerticalTransitionCellShort from "./BoxVerticalTransitionCellShort";
import AggregateGate from "./AggregateGate";
import Barrier from "./Barrier";
import BarrierVerticalTransitionCell from "./BarrierVerticalTransitionCell";
import ElementaryGate from "./ElementaryGate";
import SingleQbitGate from "./SingleQbitGate";
import PauliRootGate from "./PauliRootGate";
import ParametricSingleQbitGate from "./ParametricSingleQbitGate";
import UnitaryParametricSingleQbitGate from "./UnitaryParametricSingleQbitGate";
import UnitaryBiParametricSingleQbitGate from "./UnitaryBiParametricSingleQbitGate";
import UnitaryThreeParametricSingleQbitGate from "./UnitaryThreeParametricSingleQbitGate";
import MeasureGate from "./MeasureGate";
import QftGate from "./QftGate";
import ControlledGateStub from "./ControlledGateStub";
import EmptyCellRectangle from "./EmptyCellRectangle";
import EmptyCellSquare from "./EmptyCellSquare";
import TwoTargetQubitsGate from "./TwoTargetQubitsGate";
import ParametricTwoTargetQubitsGate from "./ParametricTwoTargetQubitsGate";
import TwoTargetQubitsRootGate from "./TwoTargetQubitsRootGate.vue";
import BiParametricTwoTargetQubitsGate from "./BiParametricTwoTargetQubitsGate";
import SwapCircle from "./SwapCircle";
import ZeroState from "./ZeroState";
export default {
  name: "Editor",
  components: {
    AggregateGate,
    Barrier,
    BarrierVerticalTransitionCell,
    BiParametricTwoTargetQubitsGate,
    BoxVerticalTransitionCellShort,
    ControlledGateStub,
    EmptyCellRectangle,
    EmptyCellSquare,
    ElementaryGate,
    EmptyCell,
    HorizontalTransitionCell,
    MeasureGate,
    QftGate,
    PauliRootGate,
    ParametricSingleQbitGate,
    SingleQbitGate,
    TwoTargetQubitsGate,
    TwoTargetQubitsRootGate,
    UnitaryParametricSingleQbitGate,
    UnitaryBiParametricSingleQbitGate,
    UnitaryThreeParametricSingleQbitGate,
    ParametricTwoTargetQubitsGate,
    SwapCircle,
    VerticalTransitionCellShort,
    VerticalTransitionCellLong,
    ZeroState,
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
  width: 100%;
  height: 100%;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

table {
  border: 0px;
  border-spacing: 0px;
  table-layout: fixed;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  text-align: center;
}

th, td {
  border: 0px;
  padding: 0px;
}

</style>
