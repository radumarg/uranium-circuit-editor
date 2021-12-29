<template>
  <div class="gates-pallete" id="gates-pallete-n">
    <table id="gates-pallete-table-n">
        <tr>
          <td v-on:click="gateSelected" id="aggregate"> 
              <img v-if="coloredGatesCookie" src="../assets/colored-gates/aggregate.svg" @dragend="dragEnd" @dragstart="dragStart" title="aggregate" alt="Aggregate Gate"/>
              <img v-else src="../assets/blue-gates/aggregate.svg" @dragend="dragEnd" @dragstart="dragStart" title="aggregate" alt="Aggregate Gate"/>
          </td>
          <td class="td-empty"></td>
          <td class="td-empty"></td>
          <td class="td-empty"></td>
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
  min-height: calc( 100vh - 140px );
  max-height: calc( 100vh - 140px );
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
.td-empty {
  border: 1px solid #374048;
  padding: 13px;
  width: 67px;
  height: 67px;
}

</style>