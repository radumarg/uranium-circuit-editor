<template>
  <div v-on:click="handleClick">

    <img :src="gateImageSrcEditor" :id="id" :title="title" data-toggle="tooltip" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="initial-modal-dialog" size="sm" centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td class="no-resize-cell">
             <div v-b-hover="handleTrashHover">
              <b-icon v-if="trashIsHovered" v-on:click="handleDeleteGate()" icon="trash" title="Delete gate" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="trash" v-on:click="handleDeleteGate()" style="color: #7952b3;" font-scale="1.4"></b-icon>
              </div>
          </td>
          <td colspan="2">
            <div v-b-hover="handleExpandUpHover">
              <b-icon v-if="expandUpIsHovered" icon="chevron-bar-up" v-on:click="expandCircuitUp()" title="Add qbit before" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-up" v-on:click="expandCircuitUp()" title="Add qbit before" style="color: #7952b3;" font-scale="1.4"></b-icon>
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
              <b-icon v-if="expandLeftIsHovered" icon="chevron-bar-left" v-on:click="expandCircuitLeft()" title="Add step to the left" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-left" v-on:click="expandCircuitLeft()" title="Add step to the left" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td colspan="2" style="padding: 10px;">
            <img :src="gateImageSrcPopup" style="width:120px;" />
          </td>
          <td>
            <div v-b-hover="handleExpandRightHover">
              <b-icon v-if="expandRightIsHovered" icon="chevron-bar-right" v-on:click="expandCircuitRight()" title="Add step to the right" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-right" v-on:click="expandCircuitRight()" title="Add step to the right" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td title="Gate parameter" width="100px" style="padding: 5px;">Theta:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="thetaNew" placeholder="theta" type="number" id="theta-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="Target qubit" width="100px" style="padding: 5px;">Target:</td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNew[0]" placeholder="qbit" type="number" id="qbit-new" style="width:90px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="2nd Target qubit" width="100px" style="padding: 5px;">Target<sub>2</sub></td>
          <td width="100px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNew[1]" placeholder="qbit2" type="number" id="qbit2-new" style="width:90px;"></b-form-input>
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
          <td style="padding: 5px;">
            <div v-b-hover="handleMoveGateOneQubitDownwardsHover">
              <b-icon v-if="moveGateOneQubitDownwardsIsHovered" icon="arrow-down-square-fill" v-on:click="moveGateOneQubitDownwards()" title="Move gate one qubit downwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-down-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td style="padding: 5px;">
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
              <b-icon v-if="expandGateIsHovered" v-on:click="handleExpandGate()" icon="files" title="Replicate gate" style="color: #7952b3;" font-scale="1.5"></b-icon>
              <b-icon v-else icon="files" v-on:click="handleExpandGate()" style="color: #7952b3;" font-scale="1.3"></b-icon>
              </div>
          </td>
          <td colspan="2">
            <div v-b-hover="handleExpandDownHover">
              <b-icon v-if="expandDownIsHovered" icon="chevron-bar-down" v-on:click="expandCircuitDown()" title="Add qbit after" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-down" v-on:click="expandCircuitDown()" title="Add qbit after" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSave()" icon="check" title="Save changes" style="color: #7952b3;" font-scale="1.7"></b-icon>
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
            Target-2 Qubit - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="qbit2Expression" placeholder="" type="text" id="target-2-qbit" style="min-width:400px;"></b-form-input>
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
           j'th  Control States - 'j, q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="controlstatesExpression" placeholder="" type="text" id="ctrl-state" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            Theta Value - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="thetaExpression" placeholder="" type="text" id="theta-expression" style="min-width:400px;"></b-form-input>
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
          <td :colspan="numberOfColumnsInEditControlsModal() + 2">
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
          <td :colspan="numberOfColumnsInEditControlsModal()" rowspan="4" :style="getEditControlsEmbedTableCellStyle()" class="text-center">
            <b-table-simple :style="getEditControlsEmbededTableStyle()" :responsive="true" borderless>
              <b-tr>
                <b-td v-for="(control, index) in controlsNew.length" v-bind:key="index" class="embedded-table-cell">
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
          <td title="Target qubit">Target:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="targetsNew[0]" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="No control qubits">Controls:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input min="0" v-model.number="numberOfControls" @change="onNumberControlsChange()" @keyup.enter.native="handleEditControlsModalSave()" placeholder="controls" type="number" id="number-controls" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div v-b-hover="handleAlignControlsUpwardsHover">
              <b-icon v-if="alignControlsUpwardsIsHovered" icon="caret-up-fill" v-on:click="alignControlsUpwardsFromTargetQubit()" title="Align controls upwards from target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="caret-up" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td>
            <div v-b-hover="handleMoveGateOneQubitUpwardsHover">
              <b-icon v-if="moveGateOneQubitUpwardsIsHovered" icon="arrow-up-square-fill" v-on:click="moveGateOneQubitUpwards()" title="Move gate one qubit upwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="arrow-up-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td >
            <div v-b-hover="handleAlignControlsDownwardsHover">
              <b-icon v-if="alignControlsDownwardsIsHovered" icon="caret-down-fill" v-on:click="alignControlsDownwardsFromTargetQubit()" title="Align controls downwards from target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="caret-down" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
          </td>
          <td>
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
          <td :colspan="numberOfColumnsInEditControlsModal() + 2">
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
import TwoTargetQubitsGate from "./TwoTargetQubitsGate";
import {controlsMixin} from "../mixins/controlsMixin.js";
import { createDragImageGhost, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
import { arraysHaveElementsInCommon } from "../store/modules/javaScriptUtils.js";
export default {
  name: "ParametricTwoTargetQubitsGate",
  extends: TwoTargetQubitsGate,
  mixins: [controlsMixin],
  props: {
    'theta': Number,
  },
  data() {
    return {
      thetaNew: this.theta,
      thetaExpression: this.theta.toString(),
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['repositionGateInCircuit']),
    handleSave: function(){
      if (!Number.isInteger(this.$data.targetsNew[0]) || !Number.isInteger(this.$data.targetsNew[1])){
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
      let thetaOld = this.theta;
      let promise = this.repositionGateInCircuit({
        'step': this.step,
        'name': this.name,
        'targets': [...this.targets],
        'controls': [...this.controls],
        'targetsNew': [...this.$data.targetsNew],
        'thetaNew': this.$data.thetaNew,
        'controlsNew': this.$data.controlsNew,
        'controlstatesNew': this.$data.controlstatesNew,
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNew = [...targetsOld];
          this.$data.controlsNew = [...controlsOld];
          this.$data.controlstatesNew = [...controlstatesOld];
          this.$data.thetaNew = thetaOld;
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleReplicateGateModalSave: function(){
      let promise = this.replicateGate({
        'step': this.step,
        'targets': [...this.targets],
        'name': this.name, 
        'stepFirst': this.stepFirst,
        'stepLast': this.stepLast,
        'stepConditionExpression': this.stepConditionExpression,
        'qbitFirst': this.qbitFirst,
        'qbitLast': this.qbitLast,
        'qbitConditionExpression': this.qbitConditionExpression,
        'conjugateConditionExpression': this.conjugateConditionExpression,
        'qbit2Expression': this.qbit2Expression,
        'thetaExpression': this.thetaExpression,
        'numberOfControlsExpression': this.numberOfControlsExpression,
        'controlsExpression': this.controlsExpression,
        'controlstatesExpression': this.controlstatesExpression,
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
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalTargets", [...this.targets]);
      event.dataTransfer.setData("originalControls", [...this.controls]);
      event.dataTransfer.setData("controlstates", [...this.controlstates]);
      event.dataTransfer.setData("theta", this.theta);
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
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
  padding: 7px;
  text-align: center;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 79px;
  min-width: 79px;
  max-width: 79px;
}

img {
  display: inline-block;
}
</style>