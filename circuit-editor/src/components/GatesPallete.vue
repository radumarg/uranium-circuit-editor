<template>
  <div class="gates-pallete" id="gates-pallete">
    <table id="gates-pallete-table">
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
          <td v-on:click="gateSelected" id="hadamard">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/hadamard.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard" alt="Hadamard Gate"/>
            <img v-else src="../assets/blue-gates/hadamard.svg" @dragend="dragEnd" @dragstart="dragStart" title="hadamard" alt="Hadamard Gate"/>
          </td>    
        </tr>
        <tr>
          <td v-on:click="gateSelected" id="identity">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/identity.svg" @dragend="dragEnd" @dragstart="dragStart" title="identity" alt="Identity Gate" />
            <img v-else src="../assets/blue-gates/identity.svg" @dragend="dragEnd" @dragstart="dragStart" title="identity" alt="Identity Gate" />
          </td>
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
        <tr>
          <td v-on:click="gateSelected" id="swap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap" alt="Swap Gate"/>
            <img v-else src="../assets/blue-gates/swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap" alt="Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="sqrt-swap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/sqrt-swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="sqrt-swap" alt="Sqrt Swap Gate"/>
            <img v-else src="../assets/blue-gates/sqrt-swap.svg" @dragend="dragEnd" @dragstart="dragStart" title="sqrt-swap" alt="Sqrt Swap Gate"/>
          </td> 
          <td v-on:click="gateSelected" id="swap-theta">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/swap-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-theta" alt="Phi Swap Gate"/>
            <img v-else src="../assets/blue-gates/swap-theta.svg" @dragend="dragEnd" @dragstart="dragStart" title="swap-theta" alt="Phi Swap Gate"/>
          </td>
          <td v-on:click="gateSelected" id="iswap">
            <img v-if="coloredGatesCookie" src="../assets/colored-gates/iswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="iswap" alt="I Swap Gate"/>
            <img v-else src="../assets/blue-gates/iswap.svg" @dragend="dragEnd" @dragstart="dragStart" title="iswap" alt="I Swap Gate"/>
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
        </tr>
    </table>
  </div>
</template>

<script>
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
export default {
  methods: {
    gateSelected: function (event) {
      // find selected table cell
      let cell = null;
      var tag = event.target.tagName.toUpperCase();
      if (tag == "TD") {
        cell = event.target;
      } else if (tag == "IMG")  {
        cell = event.target.parentElement;
      }
      let selectedCellBgColor = cell.style.backgroundColor.toUpperCase();
      // reset bckg for all cells
      let table = document.getElementById("gates-pallete-table");
      let cells = table.getElementsByTagName("TD");
      for(var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = window.darkBackgroundColor;
      }
      // set bckg black for selected cell
      if (cell != null) {
        if (selectedCellBgColor == "BLACK"){
          this.$root.$emit("updateHelpEvent", null);
          cell.style.backgroundColor = window.darkBackgroundColor;
        } else {
          cell.style.backgroundColor = "Black";
          this.$root.$emit("updateHelpEvent", cell.id);
        }
      }
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData("gateName", target.title);
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
  },
  data() {
    return {
        coloredGatesCookie: getUserInterfaceSetting("colored-gates") === 'true',
    };
  },
  created() {
    this.$root.$on("switchThemeDark", (boolFlag) => {
      var cells = document.getElementById("gates-pallete").getElementsByTagName("td");
      if (boolFlag) {
        for(let i = 0; i < cells.length; i++) { 
          cells[i].style.borderColor = "lightslategray";
        }
      } else {
        for(let i = 0; i < cells.length; i++) {
          cells[i].style.borderColor = window.lightBackgroundColor;
        }
      }
    })
    this.$root.$on("switchGateColors", () => {
      var cells = document.getElementById("gates-pallete").getElementsByTagName("td");
      for(let i = 0; i < cells.length; i++) {
        let img = cells[i].childNodes[0];
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          if (img.title.includes("ctrl-")){
            img.src = require("../assets/colored-gates/" + img.title + "-1.svg");     
          } else {
            img.src = require("../assets/colored-gates/" + img.title + ".svg");
          }
        } else {
          if (img.title.includes("ctrl-")){
            img.src = require("../assets/blue-gates/" + img.title + "-1.svg");     
          } else {
            img.src = require("../assets/blue-gates/" + img.title + ".svg");
          }
        }
      }
    })
  },
  name: "GatesPallete"
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