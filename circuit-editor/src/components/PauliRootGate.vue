<template>
  <div v-on:click="handleClick">

    <img :src="gateImageSrcEditor" :id="id" :title="title" data-toggle="tooltip" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="initial-modal-dialog" size="sm"  centered hide-footer hide-header>

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
            <img :src="gateImageSrcPopup" id="popup-gate-image" style="width:120px;height:auto;" />
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
          <td v-b-tooltip.hover title="Root parametrized as 1/t" width="100px" style="padding: 5px;">Root&nbsp;(t):</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="rootNewT" placeholder="" type="number" id="root-new-t" v-on:change="resetRootK()" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Root parametrized as 1/2^k" width="100px" style="padding: 5px;">Root&nbsp;(k): <br/>(t = 2^k)</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="rootNewK" placeholder="" type="number" id="root-new-k" v-on:change="resetRootT()" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td v-b-tooltip.hover title="Target qubit" width="100px" style="padding: 5px;">Target:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNew[0]" placeholder="qbit" type="number" id="qbit-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
           <td title="Edit control qubits" width="100px" style="padding: 5px;">Controls:</td>
           <td width="100px" style="padding: 5px;">
             <div v-b-hover="handleEditControlsHover">
              <b-icon v-if="editControlsIsHovered" icon="pencil-fill" v-on:click="handleEditControls()" title="Edit controls" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="pencil" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td class="edit-controls-cell" style="padding: 5px;">
            <div v-b-hover="handleMoveGateOneQubitDownwardsHover">
              <b-icon v-if="moveGateOneQubitDownwardsIsHovered" icon="arrow-down-square-fill" v-on:click="moveGateOneQubitDownwards()" title="Move gate one qubit downwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-down-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td class="edit-controls-cell" style="padding: 5px;">
            <div v-b-hover="handleMoveGateOneQubitUpwardsHover">
              <b-icon v-if="moveGateOneQubitUpwardsIsHovered" icon="arrow-up-square-fill" v-on:click="moveGateOneQubitUpwards()" title="Move gate one qubit upwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-up-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleExpandGateHover">
              <b-icon v-if="expandGateIsHovered" v-on:click="handleExpandGate()" icon="files" v-b-tooltip.hover title="Replicate gate" style="color: #7952b3;" font-scale="1.5"></b-icon>
              <b-icon v-else icon="files" v-on:click="handleExpandGate()" style="color: #7952b3;" font-scale="1.3"></b-icon>
              </div>
          </td>
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

    <b-modal ref="replicate-gate-modal-dialog" size="lg" width="100px" centered hide-footer hide-header>
      <table>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleReplicateGateHelpHover">
              <b-icon v-if="replicateGateHelpIsHovered" v-on:click="handleReplicateDialogHelp()" icon="question-circle" v-b-tooltip.hover title="Help" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="question-circle" v-on:click="handleReplicateDialogHelp()" style="color: #7952b3;" font-scale="1.2"></b-icon>
            </div>
          </td>
          <td colspan="6">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleReplicateGateModalCloseHover">
              <b-icon v-if="replicateGateModalCloseIsHovered" v-on:click="hideReplicateGateModal()" title="Close dialog" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideReplicateGateModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td width="100px" class="td-2nd-modal">
            First Qubit:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="qbitFirst" placeholder="q" type="number" id="qbit-start" style="width:75px;"></b-form-input>
          </td>
          <td width="100px" class="td-2nd-modal">
            Last Qubit:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="qbitLast" placeholder="q" type="number" id="qbit-stop" style="width:75px;"></b-form-input>
          </td>
          <td width="200px" class="td-2nd-modal">
            Condition - 'q' based <br/>javascript expression:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model="qbitConditionExpression" placeholder="q >= 0" type="text" id="qbit-cond" style="width:120px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td width="100px" class="td-2nd-modal">
            First Step:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="stepFirst" placeholder="s" type="number" id="step-start" style="width:75px;"></b-form-input>
          </td>
          <td width="100px" class="td-2nd-modal">
            Last Step:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="stepLast" placeholder="s" type="number" id="step-stop" style="width:75px;"></b-form-input>
          </td>
          <td width="200px" class="td-2nd-modal">
            Condition - 's' based <br/>javascript expression:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model="stepConditionExpression" placeholder="s >= 0" type="text" id="step-cond" style="width:120px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            Conjugate Condition - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="conjugateConditionExpression" placeholder="" type="text" id="conjugate-cond" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            Number of controls - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="numberOfControlsExpression" @change="onNumberOfControlsExpressionChange()" placeholder="" type="text" id="no-controls-cond" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            j'th Control Qubit - 'j, q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="controlsExpression" placeholder="" type="text" id="ctrl-qbit" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            j'th Control State - 'j, q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="controlstatesExpression" placeholder="" type="text" id="ctrl-state" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            k Value - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="rootKExpression" placeholder="" type="text" id="root-k-expression" v-on:change="resetRootTExpression()" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            t Value - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="rootTExpression" placeholder="" type="text" id="root-t-expression" v-on:change="resetRootKExpression()" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td colspan="7" class="td-2nd-modal">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleReplicateGateModalSaveHover">
              <b-icon v-if="replicateGateModalSaveIsHovered" v-on:click="handleReplicateGateModalSave()" title="Save changes" icon="check" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="check" v-on:click="handleReplicateGateModalSave()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>
    </b-modal>

    <b-modal ref="edit-controls-modal-dialog" :size="editControlsModalSize()" centered hide-footer hide-header>
      <table>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsPlusHover">
              <b-icon v-if="editControlsPlusIsHovered" v-on:click="addControl()" title="Add control" icon="plus" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="plus" v-on:click="addControl()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td :colspan="numberOfColumnsInEditControlsModal() + 2" class="edit-controls-cell">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsModalCloseHover">
              <b-icon v-if="editControlsModalCloseIsHovered" v-on:click="hideEditControlsModal()" title="Close dialog" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideEditControlsModal()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td :colspan="numberOfColumnsInEditControlsModal()" rowspan="4" :style="getEmbedTableCellStyle()" class="text-center">
            <b-table-simple :style="getEmbededTableStyle()" :responsive="true" borderless>
              <b-tr>
                <b-td v-for="(control, index) in controlsNew.length" v-bind:key="index" style="border: 1px solid #E0E0E0;" class="embedded-table-cell">
                  <img :src="stubImageSrcPopup(control - 1)" style="width:30px; height:auto;" />
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 1000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td v-for="(controlstate, index) in controlstatesNew" v-bind:key="index + 4000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-select v-model="controlstatesNew[index]" @change="onControlStateChange()"  placeholder="controlstate" :options="options" id="controlstate-new" style="min-width: 72px; max-width: 72px;"></b-form-select>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 5000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td v-for="(control, index) in controlsNew" v-bind:key="index + 2000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-input min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="controlsNew[index]" placeholder="control" type="number" id="control-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 3000"  class="embedded-table-cell" />
              </b-tr>
            </b-table-simple>
          </td>
          <td title="Control qubit" class="edit-controls-cell">Target:</td>
          <td class="edit-controls-cell">
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="targetsNew[0]" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="No control qubits" class="edit-controls-cell">Controls:</td>
          <td class="edit-controls-cell">
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input min="0" v-model.number="numberOfControls" @change="onNumberControlsChange()" @keyup.enter.native="handleEditControlsModalSave()" placeholder="controls" type="number" id="number-controls" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td class="edit-controls-cell">
            <div v-b-hover="handleAlignControlsUpwardsHover">
              <b-icon v-if="alignControlsUpwardsIsHovered" icon="caret-up-fill" v-on:click="alignControlsUpwardsFromTargetQubit()" title="Align controls upwards from target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="caret-up" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td class="edit-controls-cell">
            <div v-b-hover="handleMoveGateOneQubitUpwardsHover">
              <b-icon v-if="moveGateOneQubitUpwardsIsHovered" icon="arrow-up-square-fill" v-on:click="moveGateOneQubitUpwards()" title="Move gate one qubit upwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-up-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td class="edit-controls-cell" >
            <div v-b-hover="handleAlignControlsDownwardsHover">
              <b-icon v-if="alignControlsDownwardsIsHovered" icon="caret-down-fill" v-on:click="alignControlsDownwardsFromTargetQubit()" title="Align controls downwards from target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="caret-down" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td class="edit-controls-cell">
            <div v-b-hover="handleMoveGateOneQubitDownwardsHover">
              <b-icon v-if="moveGateOneQubitDownwardsIsHovered" icon="arrow-down-square-fill" v-on:click="moveGateOneQubitDownwards()" title="Move gate one qubit downwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-down-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsMinusHover">
              <b-icon v-if="editControlsMinusIsHovered" v-on:click="removeControl()" title="Remove control" icon="dash" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="dash" v-on:click="removeControl()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td :colspan="numberOfColumnsInEditControlsModal() + 2" class="edit-controls-cell">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditControlsModalSaveHover">
              <b-icon v-if="editControlsModalSaveIsHovered" v-on:click="handleEditControlsModalSave()" title="Save changes" icon="check" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="check" v-on:click="handleEditControlsModalSave()" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>
    </b-modal>

  </div>
</template>


<script>
import { mapActions } from 'vuex';
import SingleQbitGate from "./SingleQbitGate";
import {controlsMixin} from "../mixins/controlsMixin.js";
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { arraysHaveElementsInCommon } from "../store/modules/javaScriptUtils.js";
export default {
  name: "PauliRootGate",
  extends: SingleQbitGate,
  mixins: [controlsMixin],
  props: {
    'root': String,
  },
  data() {
    return {
      rootNewK: this.getKRoot(),
      rootNewT: this.getTRoot(),
      rootKExpression: this.getKRoot(),
      rootTExpression: this.getTRoot(),
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
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          if (this.root.includes("1/2^")){
             let k = parseInt(this.root.replace("1/2^", ""));
             if (k >= 0 && k <= 35){
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
    ...mapActions('circuitEditorModule/', ['repositionSimpleGateInCircuit']),
    handleSave: function(){
      if (!Number.isInteger(this.$data.targetsNew[0])){
        alert("Please enter an integer number!");
        return;
      }
      if (arraysHaveElementsInCommon(this.$data.controlsNew, this.$data.targetsNew)){
        alert("Control and target qubits must differ!");
        return;
      }
      let targetsOld = [...this.targets];
      let controlsOld = [...this.controls];
      let controlstatesOld = [...this.controlstates];
      let promise = this.repositionSimpleGateInCircuit({
        'step': this.step, 
        'targets': [...this.targets],
        'name': this.name,
        'controls': [...this.controls],
        'targetsNew': [...this.$data.targetsNew],
        'controlsNew': this.$data.controlsNew,
        'controlstatesNew': this.$data.controlstatesNew,
        'rootNew': this.getRoot(),
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNew = [...targetsOld];
          this.$data.controlsNew = [...controlsOld];
          this.$data.controlstatesNew = [...controlstatesOld];
          this.$data.rootKNew = this.getKRoot();
          this.$data.rootTNew = this.getTRoot();
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleReplicateGateModalSave: function(){
      let promise = this.replicateGate({
        'step': this.step,
        'targets': [...this.targets],
        'name': this.name,
        'controls': [...this.controls],
        'stepFirst': this.stepFirst,
        'stepLast': this.stepLast,
        'stepConditionExpression': this.stepConditionExpression,
        'qbitFirst': this.qbitFirst,
        'qbitLast': this.qbitLast,
        'qbitConditionExpression': this.qbitConditionExpression,
        'conjugateConditionExpression': this.conjugateConditionExpression,
        'numberOfControlsExpression': this.numberOfControlsExpression,
        'controlsExpression': this.controlsExpression,
        'controlstatesExpression': this.controlstatesExpression,
        'rootKExpression': this.rootKExpression,
        'rootTExpression': this.rootTExpression,
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {
          this.$refs['replicate-gate-modal-dialog'].hide();
        },
        // eslint-disable-next-line no-unused-vars
        error => {},
      );
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData("gateName", target.name);
      event.dataTransfer.setData("drag-origin", "gate");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("originalTargets", [...this.targets]);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControls", [...this.controls]);
      event.dataTransfer.setData("controlstates", [...this.controlstates]);
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
    resetRootKExpression(){
      this.$data.rootKExpression = null;
    },
    resetRootTExpression(){
      this.$data.rootTExpression = null;
    },
    getRoot(){
      if (this.$data.rootNewT){
        return "1/" + this.$data.rootNewT;
      } else if (this.$data.rootNewK != null){
        this.$data.rootNewK = Math.round(this.$data.rootNewK);
        return "1/2^" + this.$data.rootNewK;
      } else {
        return null;
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
        return 0;
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
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

th,
td {
  padding: 1px;
}

.td-2nd-modal {
  padding: 5px;
}

.no-resize-cell{
  width: 35px;
  max-width: 35px;
  height: 35px;
  max-height: 35px;
  display: inline-block;
}

.embedded-table-cell {
  padding: 10px;
  text-align: center;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  width: 79px;
  min-width: 79px;
  max-width: 79px;
}

img {
  display: inline-block;
}
</style>