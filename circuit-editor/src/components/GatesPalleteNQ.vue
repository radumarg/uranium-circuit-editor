<template>
  <div class="gates-pallete" id="gates-pallete-n">
    <table id="gates-pallete-table-n">
        <tr>
          <td v-on:click="gateSelected" id="aggregate"> 
              <img v-if="coloredGatesCookie" src="../assets/colored-gates/aggregate.svg" @dragend="dragEnd" @dragstart="dragStart" title="aggregate" alt="Aggregate Gate"/>
              <img v-else src="../assets/blue-gates/aggregate.svg" @dragend="dragEnd" @dragstart="dragStart" title="aggregate" alt="Aggregate Gate"/>
          </td>
           <td v-on:click="gateSelected" id="qft"> 
              <img v-if="coloredGatesCookie" src="../assets/colored-gates/qft.svg" @dragend="dragEnd" @dragstart="dragStart" title="qft" alt="QFT Gate"/>
              <img v-else src="../assets/blue-gates/qft.svg" @dragend="dragEnd" @dragstart="dragStart" title="qft" alt="QFT Gate"/>
          </td>
           <td v-on:click="gateSelected" id="qft-dagger"> 
              <img v-if="coloredGatesCookie" src="../assets/colored-gates/qft-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="qft-dagger" alt="QFT-dagger Gate"/>
              <img v-else src="../assets/blue-gates/qft-dagger.svg" @dragend="dragEnd" @dragstart="dragStart" title="qft-dagger" alt="QFT-dagger Gate"/>
          </td>
          <td class="td-empty"></td>
        </tr>
    </table>
  </div>
</template>

<script>
import {gatesPalleteMixin} from "../mixins/gatesPalleteMixin.js";
export default {
  mixins: [gatesPalleteMixin],
  name: "GatesPalleteNQ"
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

</style>