<template>
  <div class="gates-pallete" id="gates-pallete-1">
    <table id="gates-pallete-table-1">
        <tr>
          <td v-on:click="gateSelected" id="pauli-x"> 
              <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-x.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-x" alt="Pauli-X Gate"/>
              <img v-else src="../assets/blue-gates/pauli-x.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-x" alt="Pauli-X Gate"/>
          </td>
          <td  v-on:click="gateSelected" id="pauli-y">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-y.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-y" alt="Pauli-Y Gate"/>
            <img v-else src="../assets/blue-gates/pauli-y.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-y" alt="Pauli-Y Gate"/>
          </td>
          <td v-on:click="gateSelected" id="pauli-z">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-z.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-z" alt="Pauli-Z Gate"/>
            <img v-else src="../assets/blue-gates/pauli-z.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-z" alt="Pauli-Z Gate"/>
          </td>
          <td v-on:click="gateSelected" id="s">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/s.svg" @dragend="dragEnd" @dragstart="dragStart" title="s" alt="S Gate" />
            <img v-else src="../assets/blue-gates/s.svg" @dragend="dragEnd" @dragstart="dragStart" title="s" alt="S Gate" />
          </td>  
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="pauli-x-root">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-x-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-x-root" alt="Pauli-X Root Gate"/>
            <img v-else src="../assets/blue-gates/pauli-x-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-x-root" alt="Pauli-X Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="pauli-y-root">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-y-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-y-root" alt="Pauli-Y Root Gate"/>
            <img v-else src="../assets/blue-gates/pauli-y-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-y-root" alt="Pauli-Y Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="pauli-z-root">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-z-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-z-root" alt="Pauli-Z Root Gate"/>
            <img v-else src="../assets/blue-gates/pauli-z-root.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-z-root" alt="Pauli-Z Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="s-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/s-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="s-dagger" alt="S Dagger Gate"/>
            <img v-else src="../assets/blue-gates/s-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="s-dagger" alt="S Dagger Gate"/>
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="pauli-x-root-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-x-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-x-root-dagger" alt="Pauli-X Root Gate"/>
            <img v-else src="../assets/blue-gates/pauli-x-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-x-root-dagger" alt="Pauli-X Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="pauli-y-root-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-y-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-y-root-dagger" alt="Pauli-Y Root Gate"/>
            <img v-else src="../assets/blue-gates/pauli-y-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-y-root-dagger" alt="Pauli-Y Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="pauli-z-root-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/pauli-z-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-z-root-dagger" alt="Pauli-Z Root Gate"/>
            <img v-else src="../assets/blue-gates/pauli-z-root-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="pauli-z-root-dagger" alt="Pauli-Z Root Gate"/>
          </td>
          <td v-on:click="gateSelected" id="t">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/t.svg" @dragend="dragEnd" @dragstart="dragStart" title="t" alt="T Gate" />
            <img v-else src="../assets/blue-gates/t.svg" @dragend="dragEnd" @dragstart="dragStart" title="t" alt="T Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="rx-theta">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/rx-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="rx-theta" alt="Rx(theta) Gate"/>
            <img v-else src="../assets/blue-gates/rx-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="rx-theta" alt="Rx(theta) Gate"/>
          </td>
          <td v-on:click="gateSelected" id="ry-theta">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/ry-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="ry-theta" alt="Ry(theta) Gate"/>
            <img v-else src="../assets/blue-gates/ry-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="ry-theta" alt="Ry(theta) Gate"/>
          </td>
          <td v-on:click="gateSelected" id="rz-theta">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/rz-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="rz-theta" alt="Rz(theta) Gate"/>
            <img v-else src="../assets/blue-gates/rz-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="rz-theta" alt="Rz(theta) Gate"/>
          </td>
          <td v-on:click="gateSelected" id="t-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/t-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="t-dagger" alt="T Dagger Gate"/>
            <img v-else src="../assets/blue-gates/t-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="t-dagger" alt="T Dagger Gate"/>
          </td>       
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="v">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/v.svg" @dragend="dragEnd" @dragstart="dragStart" title="v" alt="V Gate" />
            <img v-else src="../assets/blue-gates/v.svg" @dragend="dragEnd" @dragstart="dragStart" title="v" alt="V Gate" />
          </td>
          <td v-on:click="gateSelected" id="v-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/v-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="v-dagger" alt="V Dagger Gate"/>
            <img v-else src="../assets/blue-gates/v-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="v-dagger" alt="V Dagger Gate"/>
          </td>
          <td v-on:click="gateSelected" id="h">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/h.svg" @dragend="dragEnd" @dragstart="dragStart" title="h" alt="h Gate" />
            <img v-else src="../assets/blue-gates/h.svg" @dragend="dragEnd" @dragstart="dragStart" title="h" alt="h Gate" />
          </td>
          <td v-on:click="gateSelected" id="h-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/h-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="h-dagger" alt="h Dagger Gate"/>
            <img v-else src="../assets/blue-gates/h-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="h-dagger" alt="h Dagger Gate"/>
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="hadamard-xy">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/hadamard-xy.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard-xy" alt="Hadamard-xy Gate"/>
            <img v-else src="../assets/blue-gates/hadamard-xy.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard-xy" alt="Hadamard-xy Gate"/>
          </td>
          <td v-on:click="gateSelected" id="hadamard-yz">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/hadamard-yz.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard-yz" alt="Hadamard-yz Gate"/>
            <img v-else src="../assets/blue-gates/hadamard-yz.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard-yz" alt="Hadamard-yz Gate"/>
          </td>
          <td v-on:click="gateSelected" id="hadamard-zx">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/hadamard-zx.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard-zx" alt="Hadamard Gate"/>
            <img v-else src="../assets/blue-gates/hadamard-zx.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard-zx" alt="Hadamard-zx Gate"/>
          </td>
          <td v-on:click="gateSelected" id="hadamard">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/hadamard.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard" alt="Hadamard Gate"/>
            <img v-else src="../assets/blue-gates/hadamard.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard" alt="Hadamard Gate"/>
          </td>
        </tr>
        <tr> 
          <td v-on:click="gateSelected" id="u1">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/u1.svg" @dragend="dragEnd" @dragstart="dragStart" title="u1" alt="U1 Gate" />
            <img v-else src="../assets/blue-gates/u1.svg" @dragend="dragEnd" @dragstart="dragStart" title="u1" alt="U1 Gate" />
          </td>
          <td v-on:click="gateSelected" id="u2">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/u2.svg" @dragend="dragEnd" @dragstart="dragStart" title="u2" alt="Two Parameter Single Qbit Unitary Gate" />
            <img v-else src="../assets/blue-gates/u2.svg" @dragend="dragEnd" @dragstart="dragStart" title="u2" alt="Two Parameter Single Qbit Unitary Gate" />
          </td> 
          <td v-on:click="gateSelected" id="u3">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/u3.svg" @dragend="dragEnd" @dragstart="dragStart" title="u3" alt="Generic Unitary Gate" />
            <img v-else src="../assets/blue-gates/u3.svg" @dragend="dragEnd" @dragstart="dragStart" title="u3" alt="Generic Unitary Gate" />
          </td>
          <td v-on:click="gateSelected" id="p">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/p.svg" @dragend="dragEnd" @dragstart="dragStart" title="p" alt="Phase Shit Gate" />
            <img v-else src="../assets/blue-gates/p.svg" @dragend="dragEnd" @dragstart="dragStart" title="p" alt="Phase Shit Gate Gate" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="c">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/c.svg" @dragend="dragEnd" @dragstart="dragStart" title="c" alt="C Gate" />
            <img v-else src="../assets/blue-gates/c.svg" @dragend="dragEnd" @dragstart="dragStart" title="c" alt="C Gate" />
          </td>
          <td v-on:click="gateSelected" id="c-dagger">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/c-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="c-dagger" alt="C Dagger Gate"/>
            <img v-else src="../assets/blue-gates/c-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="c-dagger" alt="C Dagger Gate"/>
          </td>
          <td v-on:click="gateSelected" id="identity">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/identity.svg" @dragend="dragEnd" @dragstart="dragStart" title="identity" alt="Identity Gate" />
            <img v-else src="../assets/blue-gates/identity.svg" @dragend="dragEnd" @dragstart="dragStart" title="identity" alt="Identity Gate" />
          </td>
          <td v-on:click="gateSelected" id="barrier">
            <img src="../assets/barrier.svg" @dragend="dragEnd" @dragstart="dragStart" title="barrier" alt="Barrier" />
          </td>
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="measure-x">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/measure-x.svg" @dragend="dragEnd" @dragstart="dragStart" title="measure-x" alt="Measure-x Gate"/>
            <img v-else src="../assets/blue-gates/measure-x.svg" @dragend="dragEnd" @dragstart="dragStart" title="measure-x" alt="Measure-x Gate"/>
          </td>
          <td v-on:click="gateSelected" id="measure-y">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/measure-y.svg" @dragend="dragEnd" @dragstart="dragStart" title="measure-y" alt="Measure-y Gate"/>
            <img v-else src="../assets/blue-gates/measure-y.svg" @dragend="dragEnd" @dragstart="dragStart" title="measure-y" alt="Measure-y Gate"/>
          </td>
          <td v-on:click="gateSelected" id="measure-z">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/measure-z.svg" @dragend="dragEnd" @dragstart="dragStart" title="measure-z" alt="Measure-z Gate"/>
            <img v-else src="../assets/blue-gates/measure-z.svg" @dragend="dragEnd" @dragstart="dragStart" title="measure-z" alt="Measure-z Gate"/>
          </td>
        </tr>
    </table>
  </div>
</template>

<script>
import {gatesPalleteMixin} from "../mixins/gatesPalleteMixin.js";
export default {
  mixins: [gatesPalleteMixin],
  name: "GatesPallete1Q"
};
</script>

<style scoped>

.gates-pallete {
  overflow: scroll;
  min-height: calc( 100vh - 188px );
  max-height: calc( 100vh - 188px );
  width: 100%;
  height: 100%;
}

img {
  width: 40px;
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
  padding: 13px;
  width: 67px;
  height: 67px;
}

</style>