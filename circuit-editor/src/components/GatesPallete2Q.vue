<template>
  <div class="gates-pallete" id="gates-pallete-2">
    <table id="gates-pallete-table-2">
        <tr>
          <td v-on:click="gateSelected" id="swap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap" alt="Swap Gate"/>
            <img v-else src="../assets/blue-gates/swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap" alt="Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="sqrt-swap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/sqrt-swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="sqrt-swap" alt="Sqrt Swap Gate"/>
            <img v-else src="../assets/blue-gates/sqrt-swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="sqrt-swap" alt="Sqrt Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="sqrt-swap-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/sqrt-swap-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="sqrt-swap-dagger" alt="Sqrt Swap Dagger Gate"/>
            <img v-else src="../assets/blue-gates/sqrt-swap-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="sqrt-swap-dagger" alt="Sqrt Swap Dagger Gate"/>
          </td>
          <td v-on:click="gateSelected" id="swap-theta">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-theta" alt="Phi Swap Gate"/>
            <img v-else src="../assets/blue-gates/swap-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-theta" alt="Phi Swap Gate"/>
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="iswap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/iswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="iswap" alt="I Swap Gate"/>
            <img v-else src="../assets/blue-gates/iswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="iswap" alt="I Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="fswap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/fswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="fswap" alt="F Swap Gate"/>
            <img v-else src="../assets/blue-gates/fswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="fswap" alt="F Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="swap-root">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-root" alt="Swap Root Gate"/>
            <img v-else src="../assets/blue-gates/swap-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-root" alt="Swap Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="swap-root-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-root-dagger" alt="Swap Root Dagger Gate"/>
            <img v-else src="../assets/blue-gates/swap-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-root-dagger" alt="Swap Root Dagger Gate"/>
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="xx">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/xx.svg" @dragend="dragEnd" @dragstart="dragStart" title="xx" alt="XX Gate" />
            <img v-else src="../assets/blue-gates/xx.svg" @dragend="dragEnd" @dragstart="dragStart" title="xx" alt="XX Gate" />
          </td>
          <td v-on:click="gateSelected" id="yy">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/yy.svg" @dragend="dragEnd" @dragstart="dragStart" title="yy" alt="YY Gate" />
            <img v-else src="../assets/blue-gates/yy.svg" @dragend="dragEnd" @dragstart="dragStart" title="yy" alt="YY Gate" />
          </td>
          <td  v-on:click="gateSelected" id="zz">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/zz.svg" @dragend="dragEnd" @dragstart="dragStart" title="zz" alt="ZZ Gate" />
            <img v-else src="../assets/blue-gates/zz.svg" @dragend="dragEnd" @dragstart="dragStart" title="zz" alt="ZZ Gate" />
          </td> 
          <td v-on:click="gateSelected" id="xy">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/xy.svg" @dragend="dragEnd" @dragstart="dragStart" title="xy" alt="XY Gate" />
            <img v-else src="../assets/blue-gates/xy.svg" @dragend="dragEnd" @dragstart="dragStart" title="xy" alt="XY Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="molmer-sorensen">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/molmer-sorensen.svg" @dragend="dragEnd" @dragstart="dragStart" title="molmer-sorensen" alt="Molmer-Sorensen Gate" />
            <img v-else src="../assets/blue-gates/molmer-sorensen.svg" @dragend="dragEnd" @dragstart="dragStart" title="molmer-sorensen" alt="Molmer-Sorensen Gate" />
          </td>
          <td v-on:click="gateSelected" id="molmer-sorensen-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/molmer-sorensen-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="molmer-sorensen-dagger" alt="Molmer-Sorensen Dagger Gate" />
            <img v-else src="../assets/blue-gates/molmer-sorensen-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="molmer-sorensen-dagger" alt="Molmer-Sorensen Dagger Gate" />
          </td>
          <td v-on:click="gateSelected" id="berkeley">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/berkeley.svg" @dragend="dragEnd" @dragstart="dragStart" title="berkeley" alt="Berkeley Gate" />
            <img v-else src="../assets/blue-gates/berkeley.svg" @dragend="dragEnd" @dragstart="dragStart" title="berkeley" alt="Berkeley Gate" />
          </td>
          <td v-on:click="gateSelected" id="berkeley-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/berkeley-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="berkeley-dagger" alt="Berkeley Dagger Gate" />
            <img v-else src="../assets/blue-gates/berkeley-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="berkeley-dagger" alt="Berkeley Dagger Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="ecp">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/ecp.svg" @dragend="dragEnd" @dragstart="dragStart" title="ecp" alt="ECP Gate" />
            <img v-else src="../assets/blue-gates/ecp.svg" @dragend="dragEnd" @dragstart="dragStart" title="ecp" alt="ECP Gate" />
          </td>
          <td v-on:click="gateSelected" id="ecp-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/ecp-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="ecp-dagger" alt="ECP Dagger Gate" />
            <img v-else src="../assets/blue-gates/ecp-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="ecp-dagger" alt="ECP Dagger Gate" />
          </td>
          <td v-on:click="gateSelected" id="w">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/w.svg" @dragend="dragEnd" @dragstart="dragStart" title="w" alt="W Gate" />
            <img v-else src="../assets/blue-gates/w.svg" @dragend="dragEnd" @dragstart="dragStart" title="w" alt="W Gate" />
          </td>
          <td v-on:click="gateSelected" id="a">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/a.svg" @dragend="dragEnd" @dragstart="dragStart" title="a" alt="A Gate" />
            <img v-else src="../assets/blue-gates/a.svg" @dragend="dragEnd" @dragstart="dragStart" title="a" alt="A Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="magic">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/magic.svg" @dragend="dragEnd" @dragstart="dragStart" title="magic" alt="Magic Gate" />
            <img v-else src="../assets/blue-gates/magic.svg" @dragend="dragEnd" @dragstart="dragStart" title="magic" alt="Magic Gate" />
          </td>
          <td v-on:click="gateSelected" id="magic-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/magic-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="magic-dagger" alt="Magic Dagger Gate" />
            <img v-else src="../assets/blue-gates/magic-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="magic-dagger" alt="Magic Dagger Gate" />
          </td>
          <td v-on:click="gateSelected" id="cross-resonance">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/cross-resonance.svg" @dragend="dragEnd" @dragstart="dragStart" title="cross-resonance" alt="cross-resonance Gate" />
            <img v-else src="../assets/blue-gates/cross-resonance.svg" @dragend="dragEnd" @dragstart="dragStart" title="cross-resonance" alt="Cross Resonance Gate" />
          </td>
          <td v-on:click="gateSelected" id="cross-resonance-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/cross-resonance-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="cross-resonance-dagger" alt="Cross Resonance Dagger Gate" />
            <img v-else src="../assets/blue-gates/cross-resonance-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="cross-resonance-dagger" alt="Cross Resonance Dagger Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="givens">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/givens.svg" @dragend="dragEnd" @dragstart="dragStart" title="givens" alt="Givens Gate" />
            <img v-else src="../assets/blue-gates/givens.svg" @dragend="dragEnd" @dragstart="dragStart" title="givens" alt="Givens Gate" />
          </td>
        </tr>
    </table>
  </div>
</template>

<script>
import {gatesPalleteMixin} from "../mixins/gatesPalleteMixin.js";
export default {
  mixins: [gatesPalleteMixin],
  name: "GatesPallete2Q"
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

img {
  width: 60px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  padding-top: 10px;
  padding-right: 3px;
  padding-bottom: 10px;
  padding-left: 3px;
  width: 67px;
  height: 67px;
}

</style>