<template>
  <div v-on:click="handleClick">

    <img :src="gateImageSrcEditor" :id="id" :title="title" data-toggle="tooltip" :name="name" @dragend="dragEnd" @dragstart="dragStart" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>
    
    <b-modal ref="initial-modal-dialog" size="sm"  centered hide-footer hide-header>

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
           <td title="Edit gates" width="100px" style="padding: 5px;">Gates:</td>
           <td width="100px" style="padding: 5px;">
             <div v-b-hover="handleEditGatesHover">
              <b-icon v-if="editGatesIsHovered" icon="pencil-fill" v-on:click="handleEditGates()" title="Edit gates" style="color: #7952b3;" font-scale="1.4"></b-icon>
              <b-icon v-else icon="pencil" style="color: #7952b3;" font-scale="1.4"></b-icon>
             </div>
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
          <td></td>
          <td colspan="2">
            <div v-b-hover="handleExpandDownHover">
              <b-icon v-if="expandDownIsHovered" icon="chevron-bar-down" v-on:click="expandCircuitDown()" title="Add qbit after" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="chevron-bar-down" v-on:click="expandCircuitDown()" title="Add qbit after" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleSaveHover">
              <b-icon v-if="saveIsHovered" v-on:click="handleSave()" icon="check" title="Save changes" style="color: #7952b3;" font-scale="1.7"></b-icon>
              <b-icon v-else v-on:click="handleSave()" title="Save changes" icon="check" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
      </table>

    </b-modal>

    <b-modal ref="edit-controls-modal-dialog" :size="editGateAndControlsModalSize()" centered hide-footer hide-header>
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
              <b-icon v-else icon="x-square" v-on:click="hideEditControlsModal()" title="Close dialog" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td :colspan="numberOfColumnsInEditControlsModal()"  :style="getEmbedTableCellStyle()" class="text-center">
            <b-table-simple :style="getEmbededEditControlsTableStyle()" :responsive="true" borderless>
              <b-tr>
                <b-td class="title-cell">Gates Qubits:</b-td>
                <b-td v-for="(gate, index) in gatesNew.length" v-bind:key="index + 1000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-input min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="gatesNew[index].targets[0]" readonly placeholder="target" type="number" id="target-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 2000"  class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Control States:</b-td>
                <b-td v-for="(control, index) in controlsNew.length" v-bind:key="index + 3000" class="embedded-table-state-image-cell">
                  <img :src="stubImageSrcPopup(control - 1)" style="width:30px; height:auto;" />
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 4000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Edit States:</b-td>
                <b-td v-for="(controlstate, index) in controlstatesNew" v-bind:key="index + 5000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-select v-model="controlstatesNew[index]" @change="onControlStateChange()"  placeholder="controlstate" :options="options" id="controlstate-new" style="min-width: 72px; max-width: 72px;"></b-form-select>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 6000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Control Qubits:</b-td>
                <b-td v-for="(control, index) in controlsNew" v-bind:key="index + 7000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-input min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="controlsNew[index]" placeholder="control" type="number" id="control-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 8000"  class="embedded-table-cell" />
              </b-tr>
            </b-table-simple>
          </td>
          <td :colspan="2" style="vertical-align: top;">
            <b-table-simple borderless class="right-side-panel-controls">
              <b-tr>
                <b-td title="Number of gates" class="right-side-panel-cell-short">
                  <b-link v-on:click="switchToGatesEdit()" style="color: #7952b3;">Gates:</b-link>
                </b-td>
                <b-td class="right-side-panel-cell-long">
                  <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model.number="numberOfGates" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td title="No control qubits" class="right-side-panel-cell-short">Ctrls:</b-td>
                <b-td class="right-side-panel-cell-long">
                  <b-form-input min="0" v-model.number="numberOfControls" @change="onNumberControlsChange()" @keyup.enter.native="handleEditControlsModalSave()" placeholder="controls" type="number" id="number-controls" style="width:70px;"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleAlignGatesUpwardsHover">
                    <b-icon v-if="alignControlsUpwardsIsHovered" icon="caret-up-fill" v-on:click="alignControlsUpwardsFromTargetQubit()" title="Align controls upwards from first target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="caret-up" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleMoveGateOneQubitUpwardsHover">
                    <b-icon v-if="moveGateOneQubitUpwardsIsHovered" icon="arrow-up-square-fill" v-on:click="moveGateOneQubitUpwards()" title="Move gate one qubit upwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="arrow-up-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleAlignGatesDownwardsHover">
                    <b-icon v-if="alignControlsDownwardsIsHovered" icon="caret-down-fill" v-on:click="alignControlsDownwardsFromTargetQubit()" title="Align controls downwards from last target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="caret-down" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleMoveGateOneQubitDownwardsHover">
                    <b-icon v-if="moveGateOneQubitDownwardsIsHovered" icon="arrow-down-square-fill" v-on:click="moveGateOneQubitDownwards()" title="Move gate one qubit downwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="arrow-down-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
              </b-tr>
            </b-table-simple>
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

    <b-modal ref="edit-gates-modal-dialog" :size="editGateAndControlsModalSize()" centered hide-footer hide-header>
      <table>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditGatesPlusHover">
              <b-icon v-if="editGatesPlusIsHovered" v-on:click="addGate()" title="Add gate" icon="plus" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="plus" v-on:click="addGate()" title="Add gate" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td :colspan="numberOfColumnsInEditGatesModal() + 2" class="edit-controls-cell">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditGatesModalCloseHover">
              <b-icon v-if="editGatesModalCloseIsHovered" v-on:click="hideEditGatesModal()" title="Close dialog" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
              <b-icon v-else icon="x-square" v-on:click="hideEditGatesModal()" title="Close dialog" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td :colspan="numberOfColumnsInEditGatesModal()" :style="getEmbedTableCellStyle()" class="text-center">
            <b-table-simple :style="getEmbededEditGatesTableStyle()" :responsive="true" borderless>
              <b-tr>
                <b-td class="title-cell">Control Qubits:</b-td>
                <b-td v-for="(control, index) in controlsNew" v-bind:key="index + 10000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-input min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model.number="controlsNew[index]" readonly placeholder="control" type="number"  id="control-new" style="min-width: 72px; max-width: 72px;"></b-form-input>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditControlsModal()" v-bind:key="index + 11000"  class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Image:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 12000" class="embedded-table-gate-image-cell">
                  <img :src="embededGateImageSrcPopup(target - 1)" style="width:50px; height:auto;" />
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditGatesModal()" v-bind:key="index + 13000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Name:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 14000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-select v-model="gatesNew[index].name" @change="onGateNameChange(index)" :options="singleTargetQubitGates" placeholder="name" id="gate-name-new" style="min-width: 72px; max-width: 72px;"></b-form-select>
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditGatesModal()" v-bind:key="index + 15000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Target:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 16000" class="embedded-table-cell">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-form-input min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model="gatesNew[index].targets[0]" placeholder="target" type="number" id="gate-target-new" style="min-width: 72px; max-width: 72px;" />
                  </div>
                </b-td>
                <b-td v-for="(emptySlot, index) in emptySlotsInEditGatesModal()" v-bind:key="index + 17000" class="embedded-table-cell" />
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Remove Gate:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 18000" class="embedded-table-cell">
                  <div @mouseover="indexDeleteHover = index" @mouseleave="indexDeleteHover = null">
                    <b-icon v-if="indexDeleteHover == index" v-on:click="removeAggregatedGateFromCloseIcon(index)" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
                    <b-icon v-else icon="x-square" v-on:click="removeAggregatedGateFromCloseIcon(index)" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Theta:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 19000" class="embedded-table-cell">
                  <b-form-input v-if="gateHasTheta(gatesNew[index].name)" min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model.number="gatesNew[index].theta" placeholder="0" type="number" title="theta" id="gate-target-new" style="min-width: 72px; max-width: 72px;" />
                  <b-form-input v-else readonly placeholder="N/A" style="min-width: 72px; max-width: 72px;" />
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Lambda:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 20000" class="embedded-table-cell">
                  <b-form-input v-if="gateHasLambda(gatesNew[index].name)" min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model.number="gatesNew[index].lambda" placeholder="0" type="number" title="lambda" id="gate-target-new" style="min-width: 72px; max-width: 72px;" />
                  <b-form-input v-else readonly placeholder="N/A" style="min-width: 72px; max-width: 72px;" />
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Phi:</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 21000" class="embedded-table-cell">
                  <b-form-input v-if="gateHasPhi(gatesNew[index].name)" min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model.number="gatesNew[index].phi" placeholder="0" type="number" title="phi" id="gate-target-new" style="min-width: 72px; max-width: 72px;" />
                  <b-form-input v-else readonly placeholder="N/A" style="min-width: 72px; max-width: 72px;" />
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Root (t):</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 22000" class="embedded-table-cell">
                  <b-form-input v-if="gateHasRoot(gatesNew[index].name)" min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model.number="rootsNew[index].t" @change="rootTChanged(index)" placeholder="" title="root" type="number" id="gate-target-new" style="min-width: 72px; max-width: 72px;" />
                  <b-form-input v-else readonly placeholder="N/A" style="min-width: 72px; max-width: 72px;" />
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="title-cell">Gate Root (k):</b-td>
                <b-td v-for="(target, index) in gatesNew.length" v-bind:key="index + 23000" class="embedded-table-cell">
                  <b-form-input v-if="gateHasRoot(gatesNew[index].name)" min="0"  @keyup.enter.native="handleEditGatesModalSave()" v-model.number="rootsNew[index].k" @change="rootKChanged(index)" placeholder="" title="root" type="number" id="gate-target-new" style="min-width: 72px; max-width: 72px;" />
                  <b-form-input v-else readonly placeholder="N/A" style="min-width: 72px; max-width: 72px;" />
                </b-td>
              </b-tr> 
            </b-table-simple>
          </td>
          <td :colspan="2" style="vertical-align: top;">
            <b-table-simple borderless class="right-side-panel-controls">
              <b-tr>
                <b-td title="Number of gates" class="right-side-panel-cell-short">
                  <b-link v-on:click="switchToControlsEdit()" style="color: #7952b3;">Ctrls:</b-link>
                </b-td>
                <b-td class="right-side-panel-cell-long">
                  <b-form-input readonly min="0" @keyup.enter.native="handleEditGatesModalSave()" v-model.number="numberOfControls" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td title="No gates" class="right-side-panel-cell-short">Gates:</b-td>
                <b-td class="right-side-panel-cell-long">
                  <b-form-input min="0" v-model.number="numberOfGates" @change="onNumberGatesChange()" @keyup.enter.native="handleEditGatesModalSave()" placeholder="controls" type="number" id="number-controls" style="width:70px;"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleAlignControlsUpwardsHover">
                    <b-icon v-if="alignControlsUpwardsIsHovered" icon="caret-up-fill" v-on:click="alignControlsUpwardsFromTargetQubit()" title="Align controls upwards from first target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="caret-up" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleMoveGateOneQubitUpwardsHover">
                    <b-icon v-if="moveGateOneQubitUpwardsIsHovered" icon="arrow-up-square-fill" v-on:click="moveGateOneQubitUpwards()" title="Move gate one qubit upwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="arrow-up-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleAlignControlsDownwardsHover">
                    <b-icon v-if="alignControlsDownwardsIsHovered" icon="caret-down-fill" v-on:click="alignControlsDownwardsFromTargetQubit()" title="Align controls downwards from last target qubit" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="caret-down" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
                <b-td class="buttons-cell">
                  <div v-b-hover="handleMoveGateOneQubitDownwardsHover">
                    <b-icon v-if="moveGateOneQubitDownwardsIsHovered" icon="arrow-down-square-fill" v-on:click="moveGateOneQubitDownwards()" title="Move gate one qubit downwards" style="color: #7952b3;" font-scale="1.4"></b-icon>
                    <b-icon v-else icon="arrow-down-square" style="color: #7952b3;" font-scale="1.4"></b-icon>
                  </div>
                </b-td>
              </b-tr>
            </b-table-simple>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditGatesMinusHover">
              <b-icon v-if="editGatesMinusIsHovered" v-on:click="removeGateFromMinusIcon()" title="Remove gate" icon="dash" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="dash" v-on:click="removeGateFromMinusIcon()" title="Remove gate" style="color: #7952b3;" font-scale="1.4"></b-icon>
            </div>
          </td>
          <td :colspan="numberOfColumnsInEditGatesModal() + 2" class="edit-controls-cell">
          </td>
          <td class="no-resize-cell">
            <div v-b-hover="handleEditGatesModalSaveHover">
              <b-icon v-if="editGatesModalSaveIsHovered" v-on:click="handleEditGatesModalSave()" title="Save changes" icon="check" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="check" v-on:click="handleEditGatesModalSave()" title="Save changes" style="color: #7952b3;" font-scale="1.4"></b-icon>
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
import { createDragImageGhost, getUserInterfaceSetting, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
import { arraysHaveElementsInCommon } from "../store/modules/javaScriptUtils.js";
import { seatIsTaken, seatsAreTaken, qbitIsTaken } from "../store/modules/gatesTable.js";
import { getAggregatedGatesTargets, getAggregatedGatesNewTargets, isDefined } from "../store/modules/editorHelper.js";

export default {
  name: "AggregateGate",
  extends: SingleQbitGate,
  mixins: [controlsMixin],
  props: {
    'gates': Array,
  },
  data() {
    return {
      editGatesIsHovered:  false,
      editGatesModalCloseIsHovered: false,
      editGatesModalSaveIsHovered:  false,
      editGatesPlusIsHovered:  false,
      editGatesMinusIsHovered:  false,
      alignGatesUpwardsIsHovered: false,
      alignGatesDownwardsIsHovered: false,
      gatesNew: JSON.parse(JSON.stringify(this.gates)),
      rootsNew: this.extractGateRootsArray(this.gates),
      numberOfGates: this.gates ? this.gates.length : 0,
      indexDeleteHover: null,
      singleTargetQubitGates: [
        { value: 'c', text: 'c' },
        { value: 'c-dagger', text: 'c-dagger' },
        { value: 'h', text: 'h' },
        { value: 'h-dagger', text: 'h-dagger' },
        { value: 'hadamard', text: 'hadamard' },
        { value: 'hadamard-zx', text: 'hadamard-zx' },
        { value: 'hadamard-yz', text: 'hadamard-yz' },
        { value: 'hadamard-xy', text: 'hadamard-xy' },
        { value: 'identity', text: 'identity' },
        { value: 'pauli-x', text: 'pauli-x' },
        { value: 'pauli-y', text: 'pauli-y' },
        { value: 'pauli-z', text: 'pauli-z' },
        { value: 'pauli-x-root', text: 'pauli-x-root' },
        { value: 'pauli-x-root-dagger', text: 'pauli-x-root-dagger' },
        { value: 'pauli-y-root', text: 'pauli-y-root' },
        { value: 'pauli-y-root-dagger', text: 'pauli-y-root-dagger' },
        { value: 'pauli-z-root', text: 'pauli-z-root' },
        { value: 'pauli-z-root-dagger', text: 'pauli-z-root-dagger' },
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
      // need this in order to update control and gates
      // when doing drag & drop on the stub
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
      this.$data.gatesNew = JSON.parse(JSON.stringify(this.gates));
      this.$data.rootsNew = this.extractGateRootsArray(this.gates);
      this.$data.numberOfGates = this.gates? this.gates.length : 0;
      this.$data.numberOfControls = this.controls.length;
    }
  },
  computed: {
    gateImageSrcEditor: function() {
      if (this.img) {
        if (this.gateHasRoot(this.img)) {
          let gate = this.gates.find(x => x.targets[0] == this.qrow);
          let k = gate.root && gate.root.includes("1/2^") ? parseInt(gate.root.replace("1/2^", "")) : null;
          if (k && k >= 2 && k <= 35){
            if (getUserInterfaceSetting('colored-gates') === 'true') {
              return require("../assets/colored-gates/" + this.img + "-" + k + ".svg");
            } else {
              return require("../assets/blue-gates/" + this.img + "-" + k + ".svg");
            }
          } else {
            if (getUserInterfaceSetting('colored-gates') === 'true') {
              return require("../assets/colored-gates/" + this.img + ".svg");
            } else {
              return require("../assets/blue-gates/" + this.img  + ".svg");
            }
          }
        } else {
            if (getUserInterfaceSetting('colored-gates') === 'true') {
              return require("../assets/colored-gates/" + this.img + ".svg");
            } else {
              return require("../assets/blue-gates/" + this.img  + ".svg");
            }
          }
        } else {
          return String.empty;
        }
    },
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['repositionGateInCircuit']),
    initializeData: function () {
      this.$data.targetsNew = [...this.targets];
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
      this.$data.gatesNew = JSON.parse(JSON.stringify(this.gates));
      this.$data.rootsNew = this.extractGateRootsArray(this.gates);
      this.$data.numberOfGates = this.gates? this.gates.length : 0;
      this.$data.numberOfControls = this.controls.length;
    },
    editGateAndControlsModalSize(){
      let maxLength = Math.max(this.$data.gatesNew.length, this.$data.controlsNew.length);
      if (maxLength <= 5){
        return "lg";
      } else {
        return "xl";
      }
    },
    gateHasTheta(gateName){
      if (gateName == 'rx-theta') return true;
      if (gateName == 'ry-theta') return true;
      if (gateName == 'rz-theta') return true;
      if (gateName == 'u3') return true;
      return false;
    },
    gateHasLambda(gateName){
      if (gateName == 'u1') return true;
      if (gateName == 'u2') return true;
      if (gateName == 'u3') return true;
      return false;
    },
    gateHasPhi(gateName){
      if (gateName == 'u2') return true;
      if (gateName == 'u3') return true;
      return false;
    },
    gateHasRoot(gateName){
      if (gateName == 'pauli-x-root') return true;
      if (gateName == 'pauli-x-root-dagger') return true;
      if (gateName == 'pauli-y-root') return true;
      if (gateName == 'pauli-y-root-dagger') return true;
      if (gateName == 'pauli-z-root') return true;
      if (gateName == 'pauli-z-root-dagger') return true;
      return false;
    },
    getEmbededEditControlsTableStyle(){
      let maxLength = Math.max(this.$data.gatesNew.length, this.$data.controlsNew.length);
      let maxWidth = (maxLength > 5) ? 880 : 600;
      return `overflow-x:scroll; max-width: ${maxWidth}px; height: 225px; min-height: 225px; max-height: 225px; border-spacing: 5px; display: inline-block; table-layout: fixed;`
    },
    getEmbededEditGatesTableStyle(){
      let maxLength = Math.max(this.$data.gatesNew.length, this.$data.controlsNew.length);
      let maxWidth = (maxLength > 5) ? 880 : 600;
      return `overflow-x:scroll; max-width: ${maxWidth}px; height: 540px; min-height: 540px; max-height: 540px; border-spacing: 5px; display: inline-block; table-layout: fixed;`
    },
    getEmbedTableCellStyle(){
      let maxLength = Math.max(this.$data.gatesNew.length, this.$data.controlsNew.length);
      let width = (maxLength > 5) ? 880 : 560;
      return `width: ${width}px; min-width: ${width}px; max-width: ${width}px`;
    },
    emptySlotsInEditGatesModal(){
      let maxLength = Math.max(this.$data.gatesNew.length, this.$data.controlsNew.length);
      let visibleControls = (maxLength > 5) ? 9 : 5;
      return Math.max(0, visibleControls - this.$data.gatesNew.length);
    },
    emptySlotsInEditControlsModal() {
      let maxLength = Math.max(this.$data.gatesNew.length, this.$data.controlsNew.length);
      let visibleControls = (maxLength > 5) ? 9 : 5;
      return Math.max(0, visibleControls - this.$data.controlsNew.length);
    },
    numberOfColumnsInEditGatesModal(){
      let visibleControls = (this.$data.gatesNew.length > 5) ? 9 : 5;
      return 2 + Math.max(this.$data.gatesNew.length, visibleControls);
    },
    hideEditGatesModal: function() {
      this.$refs['edit-gates-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleEditGatesModalSave: function() {
      this.$refs['edit-gates-modal-dialog'].hide();
      this.handleSave();
    },
    handleEditControlsModalSave: function() {
      this.$refs['edit-controls-modal-dialog'].hide();
      this.handleSave();
    },
    handleEditGates: function(){
      this.editGatesModalCloseIsHovered = false;
      this.editGatesModalSaveIsHovered = false;
      this.editGatesPlusIsHovered = false;
      this.editGatesMinusIsHovered = false;
      this.moveGateOneQubitUpwardsIsHovered = false;
      this.moveGateOneQubitDownwardsIsHovered = false;
      this.alignControlsUpwardsIsHovered = false;
      this.alignControlsDownwardsIsHovered = false;
      this.$refs['initial-modal-dialog'].hide();
      this.$refs['edit-gates-modal-dialog'].show();
    },
    handleEditGatesHover(hovered) {
      this.editGatesIsHovered = hovered;
    },
    handleEditGatesModalCloseHover(hovered) {
      this.editGatesModalCloseIsHovered = hovered;
    },
    handleEditGatesModalSaveHover(hovered) {
      this.editGatesModalSaveIsHovered = hovered;
    },
    handleEditGatesPlusHover(hovered) {
      this.editGatesPlusIsHovered = hovered;
    },
    handleEditGatesMinusHover(hovered) {
      this.editGatesMinusIsHovered = hovered;
    },
    handleAlignGatesUpwardsHover(hovered) {
      this.alignControlsUpwardsIsHovered = hovered;
    },
    handleAlignGatesDownwardsHover(hovered) {
      this.alignControlsDownwardsIsHovered = hovered;
    },
    embededGateImageSrcPopup: function (controlIndex) {
      let name = this.$data.gatesNew[controlIndex].name;
      let root = this.$data.rootsNew[controlIndex];
      let k = null;
      if (root && isDefined(root.k)){
        k = parseInt(root.k);
      }
      if (name) {
        if (this.gateHasRoot(name) && k && k >= 2 && k <= 35){
          if (getUserInterfaceSetting('colored-gates') === 'true') {
            return require("../assets/colored-gates/" + name + "-" + k + ".svg");
          } else {
            return require("../assets/blue-gates/" + name + "-" + k + ".svg");
          }
        } else {
          if (getUserInterfaceSetting('colored-gates') === 'true') {
            return require("../assets/colored-gates/" + name + ".svg");
          } else {
            return require("../assets/blue-gates/" + name  + ".svg");
          }
        }
      } else {
        return String.empty;
      }
    },
    onGateNameChange(index) {

      let gate = this.$data.gatesNew[index];
      if (this.gateHasTheta(gate.name) && !isDefined(gate.theta)){
        gate.theta = 0;
      }
      if (this.gateHasPhi(gate.name) && !isDefined(gate.phi)){
        gate.phi = 0;
      }
      if (this.gateHasLambda(gate.name) && !isDefined(gate.lambda)){
        gate.lambda = 0;
      }
      this.$data.rootsNew[index] = { t: 1, k: null };
      if (this.gateHasRoot(gate.name)){
        this.rootTChanged(index);
      }

      // need to refresh control state icon image
      this.$forceUpdate();
    },
    onNumberGatesChange() {
      if (this.$data.numberOfGates < this.$data.gatesNew.length) {
        if (this.$data.gatesNew.length > 0) {
          this.$data.targetsNew = [...this.$data.gatesNew[0].targets];
        }
        this.$data.gatesNew = this.$data.gatesNew.slice(0, this.$data.numberOfGates);
        this.$data.rootsNew = this.$data.rootsNew.slice(0, this.$data.numberOfGates);
      } else {
        this.addGate();
      }
      this.$forceUpdate();
    },
    addGate() {

      let newTarget = null;
      let aggregatedGatesTargets = [];
      for (let i = 0; i < this.$data.gatesNew.length; i++) {
        let aggregatedGate = this.$data.gatesNew[i];
        aggregatedGatesTargets.push(...aggregatedGate.targets);
      }
      let minQubit = Math.min(...this.$data.targetsNew, ...this.$data.controlsNew, ...aggregatedGatesTargets);
      let maxQubit = Math.max(...this.$data.targetsNew, ...this.$data.controlsNew, ...aggregatedGatesTargets);
      
      if (this.targets.length > 0 && this.$data.gatesNew.length == 0) {
        newTarget = this.targets[0];
      } else if (minQubit > 0 && !seatIsTaken(this.$store.state.circuitEditorModule, minQubit - 1, this.step)) {
        newTarget = minQubit - 1;
      } else {
        let currentQubit = minQubit;
        while (currentQubit < maxQubit) {
          currentQubit += 1;
          if (this.$data.targetsNew.includes(currentQubit)) {
            continue;
          }
          if (this.$data.controlsNew.includes(currentQubit)) {
            continue;
          }
          if (aggregatedGatesTargets.includes(currentQubit)) {
            continue;
          }
          if (!qbitIsTaken(this.$store.state.circuitEditorModule, currentQubit, this.step)) {
            newTarget = currentQubit;
            break;
          }
        }
      } 
      
      if (newTarget == null && !seatIsTaken(this.$store.state.circuitEditorModule, maxQubit + 1, this.step)){
        newTarget = maxQubit + 1;
      }
      
      if (isDefined(newTarget)) {
        let gate = { name: "identity", targets: [newTarget] };
        this.$data.gatesNew.push(gate);
        let root = { t: 1, k: null };
        this.$data.rootsNew.push(root);
        this.$data.numberOfGates = this.$data.gatesNew ? this.$data.gatesNew.length : 0;
      } else {
        alert("No empty seat left to add new gate!");
      }
    },
    removeGateFromMinusIcon() {
      if (this.$data.numberOfGates >= 1) {
        this.$data.targetsNew = [...this.$data.gatesNew[0].targets];
        this.$data.gatesNew = this.$data.gatesNew.slice(0, this.$data.numberOfGates - 1);
        this.$data.rootsNew = this.$data.rootsNew.slice(0, this.$data.numberOfGates - 1);
        this.$data.numberOfGates = this.$data.gatesNew ? this.$data.gatesNew.length : 0;
      }
    },
    removeAggregatedGateFromCloseIcon(index) {
      this.$data.gatesNew.splice(index, 1);
      this.$data.rootsNew.splice(index, 1);
      this.$data.numberOfGates = this.$data.gatesNew ? this.$data.gatesNew.length : 0;
      if (this.$data.numberOfGates > 0) {
        this.$data.targetsNew = [...this.$data.gatesNew[0].targets];
      }
    },
    rootTChanged(index){
      let root = this.$data.rootsNew[index];
      root.k = null;
      let gate = this.$data.gatesNew[index];
      gate.root = '1/' + parseFloat(root.t);
      this.$forceUpdate();
    },
    rootKChanged(index){
      let root = this.$data.rootsNew[index];
      root.t = null;
      let gate = this.$data.gatesNew[index];
      gate.root = '1/2^' + parseInt(root.k);
      this.$forceUpdate();
    },
    switchToGatesEdit(){
      this.editGatesModalCloseIsHovered = false;
      this.editGatesModalSaveIsHovered = false;
      this.editGatesPlusIsHovered = false;
      this.editGatesMinusIsHovered = false;
      this.moveGateOneQubitUpwardsIsHovered = false;
      this.moveGateOneQubitDownwardsIsHovered = false;
      this.alignControlsUpwardsIsHovered = false;
      this.alignControlsDownwardsIsHovered = false;
      this.$refs['edit-controls-modal-dialog'].hide();
      this.$refs['edit-gates-modal-dialog'].show();
    },
    switchToControlsEdit(){
      this.editControlsModalCloseIsHovered = false;
      this.editControlsModalSaveIsHovered = false;
      this.editControlsPlusIsHovered = false;
      this.editControlsMinusIsHovered = false;
      this.moveGateOneQubitUpwardsIsHovered = false;
      this.moveGateOneQubitDownwardsIsHovered = false;
      this.alignControlsUpwardsIsHovered = false;
      this.alignControlsDownwardsIsHovered = false;
      this.$refs['edit-gates-modal-dialog'].hide();
      this.$refs['edit-controls-modal-dialog'].show();
    },
    extractGateRootsArray: function(gates){
      let roots = [];
      for (let i = 0; i < gates.length; i++) {
        let gate = gates[i];
        if (gate.root) {
          if (gate.root.includes("1/2^")){
            let k = parseInt(gate.root.replace("1/2^", ""));
            roots.push({ t: null, k: k });
          } else {
            let t = parseFloat(gate.root.replace("1/", ""));
            roots.push({ t: t, k: null });
          }
        } else {
          roots.push({ t: 1, k: null });
        }
      }
      return roots;
    },
    handleSave: function(){
      let aggregatedGatesTargets = [];
      for (let i = 0; i < this.$data.gatesNew.length; i++) {
        let aggregatedGate = this.$data.gatesNew[i];
        for (let j = 0; j < aggregatedGate.targets.length; j++) {
           aggregatedGatesTargets.push(aggregatedGate.targets[j]);
        }
      }
      if (!Number.isInteger(this.$data.targetsNew[0])) {
        alert("Please enter an integer number!");
        return;
      }
      if (arraysHaveElementsInCommon(this.$data.controlsNew, this.$data.targetsNew)) {
        alert("Control and target qubits must differ!");
        return;
      }
       if (arraysHaveElementsInCommon(this.$data.controlsNew, aggregatedGatesTargets)) {
        alert("Control and aggregated gates target qubits must differ!");
        return;
      }
      let targetsOld = [...this.targets];
      let controlsOld = [...this.controls];
      let controlstatesOld = [...this.controlstates];
      let gatesOld = [...this.gates];
      let promise = this.repositionGateInCircuit({
        'step': this.step, 
        'targets': [...this.targets],
        'name': this.name,
        'controls': [...this.controls],
        'targetsNew': this.$data.targetsNew,
        'controlsNew': this.$data.controlsNew,
        'controlstatesNew': this.$data.controlstatesNew,
        'gatesNew': this.$data.gatesNew,
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {
          this.initializeData();
        }, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNew = [...targetsOld];
          this.$data.controlsNew = [...controlsOld];
          this.$data.controlstatesNew = [...controlstatesOld];
          this.$data.gatesNew = JSON.parse(JSON.stringify(gatesOld));
          this.$data.rootsNew = this.extractGateRootsArray(this.gatesOld);
          this.$data.numberOfGates = this.gatesOld? this.gatesOld.length : 0;
          this.$data.numberOfControls = this.controlsOld.length;
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    moveGateOneQubitUpwards() {
      let proposedTargets = [...this.$data.targetsNew];
      let proposedControls = [...this.$data.controlsNew];
      let proposedGatesTargets = getAggregatedGatesNewTargets(this);

      if (Math.min(...proposedTargets) > 0 && Math.min(...proposedControls) > 0 && Math.min(...proposedGatesTargets) > 0) {
        for (let i = 0; i < proposedTargets.length; i++) {
          proposedTargets[i] -= 1;
        }
        for (let i = 0; i < proposedControls.length; i++) {
          proposedControls[i] -= 1;
        }
        for (let i = 0; i < proposedGatesTargets.length; i++) {
          proposedGatesTargets[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached!");
        return;
      }

      let existingQbits = [...this.targets, ...this.controls, ...getAggregatedGatesTargets(this)].filter(x => isDefined(x));
      let proposedQbits = [...proposedTargets, ...proposedControls, ...proposedGatesTargets].filter(x => isDefined(x));

      if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control upwards!");
      } else {
        this.$data.targetsNew = proposedTargets;
        this.$data.controlsNew = proposedControls;
        for (let i = 0; i < this.gatesNew.length; i++) {
          let gate = this.gatesNew[i];
          for (let j = 0; j < gate.targets.length; j++) {
            gate.targets[j] -= 1;
          }
        }
        this.$forceUpdate();
      }
    },
    moveGateOneQubitDownwards() {
      let proposedTargets = [...this.$data.targetsNew];
      let proposedControls = [...this.$data.controlsNew];
      let proposedGatesTargets = getAggregatedGatesNewTargets(this);

      for (let i = 0; i < proposedTargets.length; i++) {
        proposedTargets[i] += 1;
      }
      for (let i = 0; i < proposedControls.length; i++) {
        proposedControls[i] += 1;
      }
      for (let i = 0; i < proposedGatesTargets.length; i++) {
        proposedGatesTargets[i] += 1;
      }

      let existingQbits = [...this.targets, ...this.controls, ...getAggregatedGatesTargets(this)].filter(x => isDefined(x));
      let proposedQbits = [...proposedTargets, ...proposedControls, ...proposedGatesTargets].filter(x => isDefined(x));

      if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control downwards!");
      } else {
        this.$data.targetsNew = proposedTargets;
        this.$data.controlsNew = proposedControls;
        for (let i = 0; i < this.gatesNew.length; i++) {
          let gate = this.gatesNew[i];
          for (let j = 0; j < gate.targets.length; j++) {
            gate.targets[j] += 1;
          }
        }
        this.$forceUpdate();
      }
    },
    alignControlsUpwardsFromTargetQubit() {
      let proposedGatesTargets = getAggregatedGatesNewTargets(this);
      let startUp = Math.min(...this.$data.targetsNew, ...proposedGatesTargets);
      let startDown = Math.max(...this.$data.targetsNew, ...proposedGatesTargets);
      for (let i = 0; i < this.$data.controlsNew.length; i++) {
        if (startUp - i >= 1) {
          this.$data.controlsNew[i] = startUp - i - 1;
        } else {
          this.$data.controlsNew[i] = startDown + i - startUp + 1;
        }
      }
      this.$forceUpdate();
    },
    alignControlsDownwardsFromTargetQubit() {
      let proposedGatesTargets = getAggregatedGatesNewTargets(this);
      let start = Math.max(...this.$data.targetsNew, ...proposedGatesTargets);
      for (let i = 0; i < this.$data.controlsNew.length; i++) {
        this.$data.controlsNew[i] = start + i + 1;
      }
      this.$forceUpdate();
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
      if (this.gates) {
        event.dataTransfer.setData("gates", JSON.stringify(this.gates));
      }
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

.embedded-table-state-image-cell {
  padding: 10px;
  text-align: center;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 79px;
  min-width: 79px;
  max-width: 79px;
}

.embedded-table-gate-image-cell {
  padding: 2px;
  text-align: center;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  width: 79px;
  min-width: 79px;
  max-width: 79px;
}

.title-cell {
  width: 135px;
  min-width: 135px;
  max-width: 135px;
  text-align: left;
}

.number-gates-controls-cell {
  width: 65px;
  min-width: 65px;
  max-width: 65px;
  text-align: left;
}

.right-side-panel-cell-long {
  width: 65px;
  min-width: 65px;
  max-width: 65px;
  text-align: center;
  vertical-align: middle;
}

.right-side-panel-cell-short {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  text-align: center;
  vertical-align: middle;
}

.right-side-panel-controls {
  width: 140px;
  max-width: 140px;
  min-width: 140px; 
  border-spacing: 1px;
}

.buttons-cell {
  width: 70px;
  min-width: 70px;
  max-width: 70px;
  text-align: center;
  vertical-align: middle;
}

/* .edit-controls-cell {
  height: 10px;
  min-height: 10px;
  max-height: 10px;
} */

img {
  display: inline-block;
}

</style>