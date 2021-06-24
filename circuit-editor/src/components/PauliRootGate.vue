<template>
  <div v-on:click="showModal()">

    <img :src="gateImageSrcEditor" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="modal-dialog" size="sm"  centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleTrashHover">
              <b-icon v-if="trashIsHovered" v-on:click="handleDeleteGate()" icon="trash" v-b-tooltip.hover title="Delete gate" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="trash" v-on:click="handleDeleteGate()" style="color: #7952b3;" font-scale="1.4"></b-icon>
              </div>
          </td>
          <td colspan="2">
            <div v-b-hover="handleExpandUpHover">
              <b-icon v-if="expandUpIsHovered" icon="chevron-bar-up" v-on:click="expandCircuitUp()" v-b-tooltip.hover title="Add qbit before" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-up" v-on:click="expandCircuitUp()" v-b-tooltip.hover title="Add qbit before" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleCloseHover">
              <b-icon v-if="closeIsHovered" v-on:click="hideModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-b-hover="handleExpandLeftHover">
              <b-icon v-if="expandLeftIsHovered" icon="chevron-bar-left" v-on:click="expandCircuitLeft()" v-b-tooltip.hover title="Add step to the left" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-left" v-on:click="expandCircuitLeft()" v-b-tooltip.hover title="Add step to the left" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td colspan="2" style="padding: 10px;">
            <img :src="gateImageSrcPopup" style="width:120px;height:auto;" />
          </td>
          <td>
            <div v-b-hover="handleExpandRightHover">
              <b-icon v-if="expandRightIsHovered" icon="chevron-bar-right" v-on:click="expandCircuitRight()" v-b-tooltip.hover title="Add step to the right" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-right" v-on:click="expandCircuitRight()" v-b-tooltip.hover title="Add step to the right" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Target qubit" width="100px" style="padding: 5px;">Target:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model="qbitNew" placeholder="qbit" type="number" id="qbit-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Root parametrized as 1/t" width="100px" style="padding: 5px;">Root&nbsp;(t):</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model="rootNewT" placeholder="" type="number" id="root-new-t" v-on:change="resetRootK()" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Root parametrized as 1/2^k" width="100px" style="padding: 5px;">Root&nbsp;(k): <br/>(t = 2^k)</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model="rootNewK" placeholder="" type="number" id="root-new-k" v-on:change="resetRootT()" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">
            <div v-b-hover="handleExpandDownHover">
              <b-icon v-if="expandDownIsHovered" icon="chevron-bar-down" v-on:click="expandCircuitDown()" v-b-tooltip.hover title="Add qbit after" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-down" v-on:click="expandCircuitDown()" v-b-tooltip.hover title="Add qbit after" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSave()" icon="check" v-b-tooltip.hover title="Save changes" style="color: #7952b3;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSave()" icon="check" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>

    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue';
import SingleBitGate from "./SingleBitGate";
import { createDragImageGhost } from "../store/modules/utils.js";
export default {
  name: "PauliRootGate",
  extends: SingleBitGate,
  props: {
    'root': String,
  },
  data() {
    return {
      rootNewK: this.getKRoot(),
      rootNewT: this.getTRoot(),
    }
  },
  watch: {
    control: function() {
      // need this in order to update rootNew
      // when doing drag & drop on the stub
      this.$data.rootNewK = this.getKRoot();
      this.$data.rootNewT = this.getTRoot();
    }
  },
  computed: {
    gateImageSrcEditor: function() {
      if (this.img) {
        if (Vue.$cookies.get('colored-gates') === 'true'){
          if (this.root.includes("1/2^")){
             let k = parseInt(this.root.replace("1/2^", ""));
             if (k >= 2 && k <= 35){
               return require("../assets/colored-gates/" + this.img + "-" + k + ".svg");
             } else {
               return require("../assets/colored-gates/" + this.img + ".svg");
             }
          } else {
            return require("../assets/colored-gates/" + this.img + ".svg");
          }
        } else {
          if (this.root.includes("1/2^")){
             let k = parseInt(this.root.replace("1/2^", ""));
             if (k >= 2 && k <= 35){
               return require("../assets/blue-gates/" + this.img + "-" + k + ".svg");
             } else {
               return require("../assets/blue-gates/" + this.img + ".svg");
             }
          } else {
            return require("../assets/blue-gates/" + this.img + ".svg");
          }
        }
      } else {
        return String.empty;
      }      
    },
  },
  methods: {
    handleSave: function(){
      let qbitOld = this.qbit;
      let rootOld = this.root;
      let promise = this.repositionSimpleGateInCircuit({
        'step': this.step, 
        'qbit': this.qbit, 
        'root': this.root,
        'name': this.name, 
        'qbitNew': this.$data.qbitNew, 
        'rootNew': this.getRoot(),
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.qbitNew = this.qbit = qbitOld;
          this.root = rootOld;
          this.$data.rootKNew = this.getKRoot();
          this.$data.rootTNew = this.getTRoot();
        }
      );
      this.$refs['modal-dialog'].hide();
    },
    dragStart: function(event) {
      const target = event.target;
      event.dataTransfer.setData("gateName", target.name);
      event.dataTransfer.setData("drag-origin", "gate");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("originalQbit", this.qbit);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("root", this.getRoot());
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
    resetRootK(){
      this.$data.rootNewK = null;
    },
    resetRootT(){
      this.$data.rootNewT = null;
    },
    getRoot(){
      if (this.$data.rootNewT){
        return "1/" + this.$data.rootNewT;
      } else if (this.$data.rootNewK){
        return "1/2^" + this.$data.rootNewK;
      }
    },
    getTRoot(){
      if (this.root == "1/1"){
        return "1";
      }
      if (this.root.includes("1/2^")){
        return null;
      } else {
        return this.root.replace("1/", "");
      }
    },
    getKRoot(){
      if (this.root == 1){
        return null;
      }
      if (this.root.includes("1/2^")){
        return this.root.replace("1/2^", "");
      } else {
        return null;
      }
    }
  },
}
</script>

<style scoped>
table {
  text-align: center;
  table-layout: fixed;
}
th,
td {
  padding: 1px;
}
.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
}

img {
  display: inline-block;
}
</style>