<template>
  <div v-on:click="handleClick">

    <img :src="gateImageSrcEditor" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="initial-modal-dialog" size="sm" modal-class="help-sidebar" centered hide-footer hide-header>
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
            <img :src="gateImageSrcPopup" id="popup-gate-image" style="width:120px;height:auto;" />
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
          <td title="Target qubit" width="100px" style="padding: 5px;">Target:</td>
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

    <b-modal ref="replicate-gate-modal-dialog" size="lg" width="100px" modal-class="help-sidebar" centered hide-footer hide-header>
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

    <b-modal ref="edit-controls-modal-dialog" :size="editControlsModalSize()" modal-class="help-sidebar" centered hide-footer hide-header>
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

    <b-modal ref="switch-gate-dialog" size="sm" modal-class="help-sidebar" centered hide-footer hide-header>

      <table style="table-layout:fixed;">
        <tr>
          <td colspan="3" valign="top">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSwitchGateCloseHover">
              <b-icon v-if="switchGateCloseIsHovered" v-on:click="hideSwitchGateModal()" v-b-tooltip.hover title="Close dialog" icon="x-square" style="color: #7952b3; float: right;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideSwitchGateModal()" v-b-tooltip.hover title="Close dialog" style="color: #7952b3; float: right;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td width="5px"></td>
          <td v-b-tooltip.hover width="80px" style="padding: 5px;">New Gate:</td>
          <td width="180px" style="padding: 5px;">
            <b-form-select min="0" @change="handleSwitchGate()" v-model="gateNewName" :options="gatesNames" id="gate-new" style="width:175px;"></b-form-select>
          </td>
          <td width="30px"></td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSwitchGateSaveHover">
              <b-icon v-if="switchGateSaveIsHovered" v-on:click="handleSwitchGate()" icon="check" title="Save changes" style="color: #7952b3; float: right;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSwitchGate()" icon="check" style="color: #7952b3; float: right;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>

    </b-modal>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {controlsMixin} from "../mixins/controlsMixin.js";
import { createDragImageGhost, hideTooltips, getUserInterfaceSetting } from "../store/modules/applicationWideReusableUnits.js";
import { handleSelectEvent, isDefined } from "../store/modules/editorHelper.js";
import { arraysHaveElementsInCommon } from "../store/modules/javaScriptUtils.js";
export default {
  name: "SingleQbitGate",
  mixins: [controlsMixin],
  props: {
    'step' : Number,
    'targets': Array,
    'controls': Array,
    'qrow': Number,
    'img': String,
    'title': String,
    'name': String,
    'id': String,
  },
  data() {
    return {
      trashIsHovered: false,
      closeIsHovered: false,
      replicateGateHelpIsHovered:  false,
      switchGateCloseIsHovered: false,
      replicateGateModalCloseIsHovered: false,
      saveIsHovered:  false,
      replicateGateModalSaveIsHovered:  false,
      switchGateSaveIsHovered:  false,
      expandLeftIsHovered:  false,
      expandRightIsHovered:  false,
      expandUpIsHovered:  false,
      expandDownIsHovered:  false,
      expandGateIsHovered:  false,
      editControlsIsHovered:  false,
      targetsNew: [...this.targets],
      controlsNew: [...this.controls],
      qbitFirst: this.targets[0],
      qbitLast: this.targets[0],
      stepFirst: this.step,
      stepLast: this.step,
      stepConditionExpression: "s >= 0",
      qbitConditionExpression: "q >= 0",
      conjugateConditionExpression: `(q - ${this.targets[0]}) == (s - ${this.step})`,
      controlsExpression: this.controls.length > 0 ? this.controls[0] : '',
      controlstatesExpression: this.controlstates.length > 0 ? this.controlstates[0] : '',
      numberOfControlsExpression: this.controls.length,
      gateNewName: null,
      gatesNames: [
        { value: 'c', text: 'c' },
        { value: 'c-dagger', text: 'c-dagger' },
        { value: 'h', text: 'h' },
        { value: 'h-dagger', text: 'h-dagger' },
        { value: 'hadamard', text: 'hadamard' },
        { value: 'hadamard-xy', text: 'hadamard-xy' },
        { value: 'hadamard-yz', text: 'hadamard-yz' },
        { value: 'hadamard-zx', text: 'hadamard-zx' },
        { value: 'identity', text: 'identity' },
        { value: 'measure-x', text: 'measure-x' },
        { value: 'measure-y', text: 'measure-y' },
        { value: 'measure-z', text: 'measure-z' },
        { value: 'pauli-x', text: 'pauli-x' },
        { value: 'pauli-y', text: 'pauli-y' },
        { value: 'pauli-z', text: 'pauli-z' },
        { value: 'pauli-x-root', text: 'pauli-x-root' },
        { value: 'pauli-y-root', text: 'pauli-y-root' },
        { value: 'pauli-z-root', text: 'pauli-z-root' },
        { value: 'pauli-x-root-dagger', text: 'pauli-x-root-dagger' },
        { value: 'pauli-y-root-dagger', text: 'pauli-y-root-dagger' },
        { value: 'pauli-z-root-dagger', text: 'pauli-z-root-dagger' },
        { value: 'p', text: 'p' },
        { value: 'rx-theta', text: 'rx-theta' },
        { value: 'ry-theta', text: 'ry-theta' },
        { value: 'rz-theta', text: 'rz-theta' },
        { value: 's', text: 's' },
        { value: 's-dagger', text: 's-dagger' },
        { value: 't', text: 't' },
        { value: 't-dagger', text: 't-dagger' },
        { value: 'u1', text: 'u1' },
        { value: 'u2', text: 'u2' },
        { value: 'u3', text: 'u3' },
        { value: 'v', text: 'v' },
        { value: 'v-dagger', text: 'v-dagger' },
      ],
    }
  },
  watch: {
    control: function() {
      // need this in order to update controlsNew
      // when doing drag & drop on the stub
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
    }
  },
  computed: {
    gateImageSrcEditor: function() {
      if (this.img) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          return require("../assets/colored-gates/" + this.img + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.img + ".svg");
        }
      } else {
        return String.empty;
      }
    },
    gateImageSrcPopup: function() {
      if (this.name) {
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          return require("../assets/colored-gates/" + this.name + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + ".svg");
        }
      } else {
        return String.empty;
      }
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertQbitInCircuit', 'insertStepInCircuit', 'removeGateFromCircuitByUser', 'repositionGateInCircuit', 'replicateGate', 'switchGateInCircuit']),
    ...mapGetters("circuitEditorModule/", ["getMaximumStepIndex", "getMaximumQbitIndex"]),
    initializeData: function () {
      this.$data.targetsNew = [...this.targets];
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
      this.$data.numberOfControls = this.controls.length;
    },
    handleClick: function (event) {
      if (event.ctrlKey) {
        this.selectImage();
      } else if (window.currKey == 'd' || window.currKey == 'D') {
        this.removeGateFromCircuitByUser({'step': this.step, 'targets': this.targets});
      } else if ((window.currKey == 's' || window.currKey == 'S') && this.name != 'circuit' && this.name != 'aggregate') {
        this.$data.gateNewName = this.name;
        this.showSwitchGateModal();
      } else {
        this.initializeData();
        this.showModal();
      }
    },
    selectImage: function() {
      handleSelectEvent(this.qrow, this.step);
    },
    showModal: function() {
      this.trashIsHovered = false;
      this.closeIsHovered = false;
      this.replicateGateHelpIsHovered = false;
      this.replicateGateModalCloseIsHovered = false;
      this.saveIsHovered = false;
      this.replicateGateModalSaveIsHovered = false;
      this.expandLeftIsHovered = false;
      this.expandRightIsHovered = false;
      this.expandUpIsHovered = false;
      this.expandDownIsHovered = false;
      this.expandGateIsHovered = false;
      this.editControlsIsHovered = false;
      this.$data.targetsNew = [...this.targets];
      if (this.targets.length > 1){
        this.$data.qbit2Expression = `${this.targets[1]} + q - ${this.targets[0]}`;
      }
      if (this.root){
        if (this.root.includes("1/2^")){
          this.$data.rootNewK = this.root.replace("1/2^", "");
          this.$data.rootKExpression = this.root.replace("1/2^", "");
          this.$data.rootNewT = null;
          this.$data.rootTExpression = null;
        } else {
          this.$data.rootNewT= this.root.replace("1/", "");
          this.$data.rootTExpression = this.root.replace("1/", "");
          this.$data.rootNewK = null;
          this.$data.rootKExpression = null;
        }
      }
      if (this.controls && this.controls.length > 0){
        this.$data.controlsNew = [...this.controls];
        this.$data.controlsExpression = this.controls[0].toString();
      }
      if (this.controlstates && this.controlstates.length > 0){
        this.$data.controlstatesNew = [...this.controlstates];
        this.$data.controlstatesExpression =  this.controlstates[0];
      }
      if (isDefined(this.phi)){
        this.$data.phiNew = this.phi;
        this.$data.phiExpression = this.phi.toString();
      }
      if (isDefined(this.theta)){
        this.$data.thetaNew = this.theta;
        this.$data.thetaExpression = this.theta.toString();
      }
      if (isDefined(this.lambda)){
        this.$data.lambdaNew = this.lambda;
        this.$data.lambdaExpression = this.lambda.toString();
      }
      if (isDefined(this.bit)){
        this.$data.bitNew = this.bit;
        this.$data.bitExpression = 'q';
      }
      this.$refs['initial-modal-dialog'].show();
    },
    hideModal: function() {
      this.$refs['initial-modal-dialog'].hide();
    },
    handleReplicateDialogHelp: function() {
      alert("Expressions can be any valid JavaScript expressions including the simple expression: 'true', in case you are looking for a condition \
which is always valid. Here 'q' stands for qubit index, 's' stands for step index and 'j' stands for j'th control where 'j' starts with 0. The latter applies only if the \
number of controls is chosen to be greater than zero. Control state expression must evaluate one of the following: 0 or '0', 1 or '1', '+', '-', '+i' or '-i' where quotes, when specified, are necessary.");
    },
    hideReplicateGateModal: function() {
      this.$refs['replicate-gate-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleTrashHover(hovered) {
      this.trashIsHovered = hovered;
    },
    handleCloseHover(hovered) {
      this.closeIsHovered = hovered;
    },
    handleReplicateGateHelpHover(hovered) {
      this.replicateGateHelpIsHovered = hovered;
    },
    handleReplicateGateModalCloseHover(hovered) {
      this.replicateGateModalCloseIsHovered = hovered;
    },
    handleSwitchGateCloseHover(hovered) {
      this.switchGateCloseIsHovered = hovered;
    },
    handleSaveHover(hovered) {
      this.saveIsHovered = hovered;
    },
    handleReplicateGateModalSaveHover(hovered) {
      this.replicateGateModalSaveIsHovered = hovered;
    },
    handleSwitchGateSaveHover(hovered) {
      this.switchGateSaveIsHovered = hovered;
    },
    handleExpandLeftHover(hovered) {
      this.expandLeftIsHovered = hovered;
    },
    handleExpandRightHover(hovered) {
      this.expandRightIsHovered = hovered;
    },
    handleExpandUpHover(hovered) {
      this.expandUpIsHovered = hovered;
    },
    handleExpandDownHover(hovered) {
      this.expandDownIsHovered = hovered;
    },
    handleExpandGateHover(hovered) {
      this.expandGateIsHovered = hovered;
    },
    expandCircuitLeft: function(){
      if (window.gatesTable.columns/2 == this.getMaximumStepIndex()(window.currentCircuitId) + 2){
        alert("Please increase the number of steps in the circuit first.");
        return;
      }
      this.hideModal();
      this.insertStepInCircuit(this.step);
    },
    expandCircuitRight: function(){
      if (window.gatesTable.columns/2 == this.getMaximumStepIndex()(window.currentCircuitId) + 2){
        alert("Please increase the number of steps in the circuit first.");
        return;
      }
      this.hideModal();
      this.insertStepInCircuit(this.step + 1);
    },
    expandCircuitUp: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex()(window.currentCircuitId) + 1) {
        alert("Please increase the number qubits in the circuit first.");
        return;
      }
      this.hideModal();
      let qbit = Math.min(...this.targets);
      this.insertQbitInCircuit(qbit);
    },
    expandCircuitDown: function () {
      if (window.gatesTable.rows / 2 == this.getMaximumQbitIndex()(window.currentCircuitId) + 1) {
        alert("Please increase the number qubits in the circuit first.");
        return;
      }
      this.hideModal();
      let qbit = Math.max(...this.targets);
      this.insertQbitInCircuit(qbit + 1);
    },
    handleDeleteGate: function(){
      this.removeGateFromCircuitByUser({'step': this.step, 'targets': this.targets});
    },
    handleSave: function(){
      if (!Number.isInteger(this.$data.targetsNew[0])){
        alert("Please enter an integer number for target qubit!");
        return;
      }
      if (arraysHaveElementsInCommon(this.$data.controlsNew, this.$data.targetsNew)){
        alert("Control and target qubits must differ!");
        return;
      }
      let targetsOld = [...this.targets];
      let controlsOld = [...this.controls];
      let controlstatesOld = [...this.controlstates];
      let promise = this.repositionGateInCircuit({
        'step': this.step,
        'name': this.name,
        'img': this.img,
        'targets': [...this.targets],
        'controls': [...this.controls],
        'targetsNew': [...this.$data.targetsNew],
        'controlsNew': [...this.$data.controlsNew],
        'controlstatesNew': [...this.$data.controlstatesNew],
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNew = [...targetsOld];
          this.$data.controlsNew = [...controlsOld];
          this.$data.controlstatesNew = [...controlstatesOld];
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleReplicateGateModalSave: function(){
      let promise = this.replicateGate({
        'step': this.step,
        'name': this.name,
        'targets': [...this.targets],
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
    handleExpandGate: function(){
      this.controlsExpression = this.controls.length > 0 ? this.controls[0] : '';
      this.controlstatesExpression = this.controlstates.length > 0 ? this.controlstates[0] : '';
      this.numberOfControlsExpression = this.controls.length;
      this.$refs['initial-modal-dialog'].hide();
      this.$refs['replicate-gate-modal-dialog'].show();
    },
    handleSwitchGate: function(){
      let gatesWithThetaParameter = ["a", "givens", "cross-resonance", "cross-resonance-dagger", "p", "rx-theta", "ry-theta", "rz-theta", "swap-theta", "u3", "xx", "yy", "zz", "xy"];
      let gatesWithPhiParameter = ["a", "u2", "u3"];
      let gatesWithLambdaParameter = ["u1", "u2", "u3"];
      let gatesWithRootParameter = ["pauli-x-root", "pauli-y-root", "pauli-z-root", "pauli-x-root-dagger", "pauli-y-root-dagger", "pauli-z-root-dagger", "swap-root", "swap-root-dagger"];
      let gatesWithBitParameter = ["measure-x", "measure-y", "measure-z"];
      let dto = {"step": this.step, "targets": [...this.targets], "name": this.$data.gateNewName};
      if (this.controls && this.controls.length > 0){
        dto['controls'] = [...this.controls];
      }
      if (this.controlstates && this.controlstates.length > 0){
        dto['controlstates'] = [...this.controlstates];
      }
      if (gatesWithPhiParameter.includes(this.$data.gateNewName)) {
        if (isDefined(this.phi)) {
          dto['phi'] = this.phi;
        } else {
          dto['phi'] = 0;
        }
      }
      if (gatesWithThetaParameter.includes(this.$data.gateNewName)){
        if (isDefined(this.theta)) {
          dto['theta'] = this.theta;
        } else {
          dto['theta'] = 0;
        }
      }
      if (gatesWithLambdaParameter.includes(this.$data.gateNewName)) {
        if (isDefined(this.lambda)) {
        dto['lambda'] = this.lambda;
        } else {
          dto['lambda'] = 0;
        }
      }
      if (gatesWithRootParameter.includes(this.$data.gateNewName)) {
        if (isDefined(this.root)) {
          dto['root'] = this.root;
        } else {
          dto['root'] = "1/1";
        }
      }
      if (gatesWithBitParameter.includes(this.$data.gateNewName)) {
        if (isDefined(this.bit)) {
          dto['bit'] = this.bit;
        } else {
          dto['bit'] = this.targets[0];
        }
      }
      this.switchGateInCircuit(dto);
      // when we are done, remove popup dialog
      this.$refs['switch-gate-dialog'].hide();
    },
    showSwitchGateModal: function() {
      this.switchGateSaveIsHovered = false;
      this.switchGateCloseIsHovered = false;
      this.$refs['switch-gate-dialog'].show();
    },
    hideSwitchGateModal: function() {
      this.$refs['switch-gate-dialog'].hide();
    },
    onNumberOfControlsExpressionChange(){
      let controls = parseInt(this.numberOfControlsExpression.toString().trim());
      if (controls == 0){
        this.controlsExpression = "";
        this.controlstatesExpression = "";
      }
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
.no-resize-cell {
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