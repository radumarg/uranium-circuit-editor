<template>
  <div class="gates-pallete" id="gates-pallete">
    <table id="gates-pallete-table">
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
          <td v-on:click="gateSelected" id="swap-root">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-root" alt="Phi Swap Gate"/>
            <img v-else src="../assets/blue-gates/swap-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-root" alt="Swap Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="iswap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/iswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="iswap" alt="I Swap Gate"/>
            <img v-else src="../assets/blue-gates/iswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="iswap" alt="I Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="fswap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/fswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="fswap" alt="F Swap Gate"/>
            <img v-else src="../assets/blue-gates/fswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="fswap" alt="F Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="malmo-sorensen">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/malmo-sorensen.svg" @dragend="dragEnd" @dragstart="dragStart" title="malmo-sorensen" alt="Malmo-Sorensen Gate" />
            <img v-else src="../assets/blue-gates/malmo-sorensen.svg" @dragend="dragEnd" @dragstart="dragStart" title="malmo-sorensen" alt="Malmo-Sorensen Gate" />
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
          <td v-on:click="gateSelected" id="a">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/a.svg" @dragend="dragEnd" @dragstart="dragStart" title="a" alt="A Gate" />
            <img v-else src="../assets/blue-gates/a.svg" @dragend="dragEnd" @dragstart="dragStart" title="a" alt="A Gate" />
          </td>
          <td v-on:click="gateSelected" id="berkeley">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/berkeley.svg" @dragend="dragEnd" @dragstart="dragStart" title="berkeley" alt="Berkeley Gate" />
            <img v-else src="../assets/blue-gates/berkeley.svg" @dragend="dragEnd" @dragstart="dragStart" title="berkeley" alt="Berkeley Gate" />
          </td>
          <td v-on:click="gateSelected" id="w">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/w.svg" @dragend="dragEnd" @dragstart="dragStart" title="w" alt="W Gate" />
            <img v-else src="../assets/blue-gates/w.svg" @dragend="dragEnd" @dragstart="dragStart" title="w" alt="W Gate" />
          </td>
          <td v-on:click="gateSelected" id="a">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/ecp.svg" @dragend="dragEnd" @dragstart="dragStart" title="ecp" alt="ECP Gate" />
            <img v-else src="../assets/blue-gates/ecp.svg" @dragend="dragEnd" @dragstart="dragStart" title="ecp" alt="ECP Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="magic">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/magic.svg" @dragend="dragEnd" @dragstart="dragStart" title="magic" alt="Magic Gate" />
            <img v-else src="../assets/blue-gates/magic.svg" @dragend="dragEnd" @dragstart="dragStart" title="magic" alt="Magic Gate" />
          </td>
          <td v-on:click="gateSelected" id="canonical">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/canonical.svg" @dragend="dragEnd" @dragstart="dragStart" title="canonical" alt="Canonical Gate" />
            <img v-else src="../assets/blue-gates/canonical.svg" @dragend="dragEnd" @dragstart="dragStart" title="canonical" alt="Canonical Gate" />
          </td>
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
  overflow: auto;
  min-height: calc( 100vh - 98px );
  max-height: calc( 100vh - 98px );
  width: 100%;
  height: 100%;
}

img {
  width: 55px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

table {
  text-align: center;
  background-color: #374048; 
  table-layout: fixed;
  /* height: calc(100vh - 96px); */

  /* disable selection on mouse drag over */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

th,
td {
  border: 1px solid whitesmoke;
  padding-top: 13px;
  padding-right: 3px;
  padding-bottom: 13px;
  padding-left: 3px;
  width: 67px;
  height: 67px;
}

</style>