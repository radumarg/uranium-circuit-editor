<template>
  <div :step="step" :qrow="qrow" v-on:click="handleClick" @dragenter.prevent @dragover.prevent @drop.prevent="handleDropEvent">

    <img v-if="gateImageIsABox()" :src="gateImageSrcEditor" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>

    <div v-else-if="gateImageIsCircuit()">
      <div v-if="getAbbreviationLength() == 1 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="8" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 2 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="5" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 3 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-if="getAbbreviationLength() == 1 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="8" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 2 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 3 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
    </div>

    <div v-else-if="gateImageIsUp()">
      <div v-if="getAbbreviationLength() == 1 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="8" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 2 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="5" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 3 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-if="getAbbreviationLength() == 1 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="8" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 2 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 3 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div> 
    </div>

    <div v-else>
      <div v-if="getAbbreviationLength() == 1 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="8" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 2 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="5" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 3 && usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-if="getAbbreviationLength() == 1 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="8" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 2 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 11px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
      <div v-else-if="getAbbreviationLength() == 3 && !usingColoredGates" draggable="true" class="circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 10px;">{{ getCircuitAbbreviation() }}</tspan></text>
          </g>
        </svg>
      </div>
    </div>

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
              <b-icon v-if="closeIsHovered" title="Close dialog" v-on:click="hideModal()" icon="x-square" style="color: #7952b3;" font-scale="1.6"></b-icon>
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
            <img :src="gateImageSrcPopup" style="width:120px;height:120px;" />
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
            <td colspan="2" style="padding: 5px;">
              <b-form-select style="width:190px; max-width: 190px; min-width: 190px;" v-model="circuitNameNew" :options="circuitNames" class="mt-1"></b-form-select>
            </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="70px" title="First qubit. This is used to indicate the space in the circuit covered by the gate not necessarily the first target qubit. Target qubits are selected via the 'Targets Expression' which is a Javascript 'j' based expression that must evaluate to 'true' or 'false' for each qubit position identified by 'j' where j is a zero based qubit index and where index 0 corresponds to the first qubit in this dialog.">First Qubit:</td>
          <td width="130px" style="padding: 5px;"> 
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNewFirst" placeholder="qbit" type="number" id="qbit-new" style="width:120px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="70px" title="Last qubit. This is used to indicate the space in the circuit covered by the gate not necessarily the last target qubit. Target qubits are selected via the 'Targets Expression' which is a Javascript 'j' based expression that must evaluate to 'true' or 'false' for each qubit position identified by 'j' where j is a zero based qubit index and where index 0 corresponds to the first qubit in this dialog.">Last Qubit:</td>
          <td width="130px" style="padding: 5px;">
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNewLast" placeholder="qbit" type="number" id="qbit-new" style="width:120px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="70px" title="Target expression is used to select the array of target qubits to whom the circuit gate is applied. It must be a Javascript 'j' based expression that must evaluate to true ore false for each value of 'j'. Here 'j' is the index of the target gate where first target qubit has index 0 and the last target qubit has maximum index. The simplest example of such expression is: 'true', which, indicates a condition which is always valid regardless of value of 'j'.">Targets Expr:</td>
          <td width="130px" style="padding: 5px;">
            <b-form-input @keyup.enter.native="handleSave()" v-model.number="targetsExpressionNew" placeholder="'j' based JS expression" style="width:120px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="70px" title="Indicates the power used to apply this gate in circuit. It must be a pozitive or negative integer where negative indicates that the inverse of this circuit is applied.">Gate Power:</td>
          <td width="130px" style="padding: 5px;">
            <b-form-input @keyup.enter.native="handleSave()" v-model.number="circuitPowerNew" placeholder="power" type="number" style="width:120px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
           <td title="Edit control qubits" width="70px">Controls:</td>
           <td>
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
          <td title="Target qubit">First Qubit:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model="targetsNew[0]" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td title="No control qubits">Last Qubit:</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <b-form-input readonly min="0" @keyup.enter.native="handleEditControlsModalSave()" v-model="targetsNew[targetsNew.length - 1]" placeholder="target" type="number" id="target-qbit" style="width:70px;"></b-form-input>
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
          <td style="padding: 8px;">
            <div v-b-hover="handleAlignControlsUpwardsHover">
              <b-icon v-if="alignControlsUpwardsIsHovered" icon="caret-up-fill" v-on:click="alignControlsUpwardsFromTargetQubit()" title="Align controls upwards from target qubit" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="caret-up" style="color: #7952b3;" font-scale="1.8"></b-icon>
             </div>
          </td>
          <td style="padding: 8px;">
            <div v-b-hover="handleAlignControlsDownwardsHover">
              <b-icon v-if="alignControlsDownwardsIsHovered" icon="caret-down-fill" v-on:click="alignControlsDownwardsFromTargetQubit()" title="Align controls downwards from target qubit" style="color: #7952b3;" font-scale="1.8"></b-icon>
              <b-icon v-else icon="caret-down" style="color: #7952b3;" font-scale="1.8"></b-icon>
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
import { arraysAreEqual } from "../store/modules/javaScriptUtils.js";
import { controlsMixin } from "../mixins/controlsMixin.js";
import { evaluateTargetsExpression, getClosestControlledGates } from "../store/modules/editorHelper.js";
import { getNoQbits, seatsAreTaken } from "../store/modules/gatesTable.js";
import SingleQbitGate from "./SingleQbitGate";
import { createCircuitDragImageGhost, getUserInterfaceSetting, hideTooltips } from "../store/modules/applicationWideReusableUnits.js";
export default {
  name: "CircuitGate",
  extends: SingleQbitGate,
  mixins: [controlsMixin],
  props: {
    'circuit_id': Number,
    'circuit_abbreviation': String,
    'circuit_power': Number,
    'targets_expression': String,
  },
  data() {
    return {
      targetsNewFirst: this.targets[0],
      targetsNewLast: this.targets[this.targets.length - 1],
      circuitPowerNew: this.circuit_power,
      targetsExpressionNew: this.targets_expression,
      circuitNames: this.getCircuitNameOptions(),
      circuitNameNew: this.$store.state.circuitEditorModule[this.circuit_id]["circuit_name"],
      usingColoredGates: getUserInterfaceSetting("colored-gates") === 'true'
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'repositionElementaryGateInCircuit', 'removeGateFromCircuit']),
    initializeData: function () {
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
      this.$data.numberOfControls = this.controls.length;
      this.$data.targetsNewFirst = this.targets[0];
      this.$data.targetsNewLast = this.targets[this.targets.length - 1];
    },
    getCircuitNameOptions: function() {
      let circuitNameOptions = [];
      for (let i = 0; i < window.circuitIds.length; i++) {
        let id = window.circuitIds[i];
        let circuitName = this.$store.state.circuitEditorModule[id]["circuit_name"];
        circuitNameOptions.push({ value: circuitName, text: circuitName })
      }
      return circuitNameOptions;
    },
    getCircuitId: function(circuitName) {
      for (let i = 0; i < window.circuitIds.length; i++) {
        let id = window.circuitIds[i];
        if (circuitName == this.$store.state.circuitEditorModule[id]["circuit_name"]) {
          return id;
        }
      }
    },
    getCircuitAbbreviation: function(){
      return this.circuit_abbreviation;
    },
    getAbbreviationLength: function(){
      return this.circuit_abbreviation.length;
    },
    gateImageIsABox(){
      if (this.img == 'box-up') return true;
      if (this.img == 'box-down') return true;
      if (this.img == 'box-middle-long') return true;
      return false;
    },
    gateImageIsUp(){
      if (this.img == '_circuit-up_') return true;
      else return false;
    },
    gateImageIsCircuit(){
      if (this.img == 'circuit') return true;
      else return false;
    },
    handleSave: function(){
      if (!Number.isInteger(this.$data.targetsNewFirst)){
        alert("Please enter an integer number for the first target qubit!");
        return;
      }
      if (!Number.isInteger(this.$data.targetsNewLast)){
        alert("Please enter an integer number for the last qubit!");
        return;
      }
      if (!Number.isInteger(this.$data.circuitPowerNew)){
        alert("Please enter an integer number circuit power!");
        return;
      }

      // resolve new target qubits
      if (this.$data.targetsNewFirst > this.$data.targetsNewLast) {
        let tmp = this.$data.targetsNewFirst;
        this.$data.targetsNewFirst = this.$data.targetsNewLast;
        this.$data.targetsNewLast = tmp;
      }
      let targetsNew = [];
      for (let q = this.$data.targetsNewFirst; q <= this.$data.targetsNewLast; q++) {
        let j = q - this.$data.targetsNewFirst;
        try {
          let targetIsUsed = evaluateTargetsExpression(this.$data.targetsExpressionNew, j);
          if (targetIsUsed == true) {
            targetsNew.push(q);
          }
        } catch (e) {
          alert(`Target qubit with index ${j} does not evaluate to 'true' or 'false'!`);
          return;
        }
      }
      if (targetsNew.length == 0) {
        alert("No qubit is selected by the targets expression!");
        return;
      }
      this.$data.targetsNewFirst = targetsNew[0];
      this.$data.targetsNewLast = targetsNew[targetsNew.length - 1];

      let circuitState = this.$store.state.circuitEditorModule[this.circuit_id];
      let noQubits = getNoQbits(circuitState);
      noQubits = 2;
      if (targetsNew.length != noQubits) {
        alert(`The circuit needs ${noQubits} qubits, but the current target condition expression evaluates to ${targetsNew.length} targets!`);
        return;
      }
      // remember current state
      let targetsOld = [...this.targets];
      let circuitPowerOld = this.circuit_power;
      let targetsExpressionOld = this.targets_expression;
      let circuitNameOld = this.$store.state.circuitEditorModule[this.circuit_id]["circuit_name"];
      let newCircuitId = this.getCircuitId(this.$data.circuitNameNew);
      // save action
      let promise = this.repositionGateInCircuit({
        'step': this.step,
        'name': this.name,
        'img': this.img,
        'circuit_id': newCircuitId,
        'circuit_abbreviation': this.$store.state.circuitEditorModule[newCircuitId]["circuit_abbreviation"],
        'circuit_power': this.circuitPowerNew,
        'targets': [...this.targets],
        'targets_expression': this.targetsExpressionNew,
        'controls': [...this.controls],
        'targetsNew': [...targetsNew],
        'controlsNew': [...this.$data.controlsNew],
        'controlstatesNew': [...this.$data.controlstatesNew],
      });
      promise.then(
        // eslint-disable-next-line no-unused-vars
        result => {}, 
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$data.targetsNewFirst = targetsOld[0];
          this.$data.targetsNewLast = targetsOld[this.targetsOld.length - 1];
          this.$data.circuitPowerNew = circuitPowerOld;
          this.$data.targetsExpressionNew = targetsExpressionOld;
          this.$data.circuitNameNew = circuitNameOld;
        }
      );
      this.$refs['initial-modal-dialog'].hide();
    },
    handleDropEvent: function (event) {
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let circuitState = this.$store.state.circuitEditorModule[window.currentCircuitId];
      let closestGates = getClosestControlledGates(circuitState, step, dropQbit);

      if (step == originalStep && closestGates.length == 1 && dropQbit != draggedQbit) {

        let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
        let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
        let closestGateTargets = closestGates[0].targets ? closestGates[0].targets : [];

        if (
            // make sure we will not modify a different gate than the one we are dragging from
            arraysAreEqual(closestGateTargets, originalTargets) &&
            (draggedQbit == originalTargets[0] || draggedQbit == originalTargets[originalTargets.length - 1])
          ) {
            this.repositionGate(event);
          } else {
            this.handleDragLeave();
          }
      } else {
        this.handleDragLeave();
      }
    },
    repositionGate: function (event) {
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let circuitId = parseInt(event.currentTarget.getAttribute("circuit_id"));
      let circuitAbbreviation = event.dataTransfer.getData("circuit_abbreviation");
      let circuitPower = parseInt(event.currentTarget.getAttribute("circuit_power"));
      let targetsExpression = parseInt(event.currentTarget.getAttribute("targets_expression"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      let controlstates = [];
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstatesData = event.dataTransfer.getData("controlstates");
        if (controlstatesData) {
          controlstates = controlstatesData.split(",");
        }
      }

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "controls": originalControls, "controlstates": controlstates, "circuit_id": circuitId, "circuit_abbreviation": circuitAbbreviation, "circuit_power": circuitPower, "targets_expression": targetsExpression };

      if (draggedQbit ==  originalTargets[0]) {
        let min = dropQbit;
        let max = originalTargets[originalTargets.length - 1];
        dto["targets"] = Array.from({length: max - min + 1}, (_, i) => i + min);
      } else if (draggedQbit == originalTargets[originalTargets.length - 1]) {
        let min = originalTargets[0];
        let max = dropQbit;
        dto["targets"] = Array.from({length: max - min + 1}, (_, i) => i + min);
      } else {
        // not strictly needed, this is defensive coding
        return;
      }

      if (event.dataTransfer.types.includes("circuit_id")) {
        let circuitId = event.dataTransfer.getData("circuit_id");
        dto["circuit_id"] = circuitId;
      }
      if (event.dataTransfer.types.includes("circuit_abbreviation")) {
        let circuitAbbreviation = event.dataTransfer.getData("circuit_abbreviation");
        dto["circuit_abbreviation"] = circuitAbbreviation;
      }
      if (event.dataTransfer.types.includes("circuit_power")) {
        let circuitPower = event.dataTransfer.getData("circuit_power");
        dto["circuit_power"] = circuitPower;
      }
      if (event.dataTransfer.types.includes("targets_expression")) {
        let targetsExpression = event.dataTransfer.getData("targets_expression");
        dto["targets_expression"] = targetsExpression;
      }

      // step1 - remove original gate if drag event started from a cell
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'targets': originalTargets});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    moveGateOneQubitUpwards() {
      let proposedTargets = [...this.$data.targetsNew];
      let proposedControls = [...this.$data.controlsNew];

      if (Math.min(...proposedTargets) > 0 && Math.min(...proposedControls) > 0) {
        for (let i = 0; i < proposedTargets.length; i++) {
          proposedTargets[i] -= 1;
        }
        for (let i = 0; i < proposedControls.length; i++) {
          proposedControls[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached!");
        return;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control upwards!");
      } else {
        this.$data.targetsNew = proposedTargets;
        this.$data.controlsNew = proposedControls;
        this.$data.targetsNewFirst = this.$data.targetsNew[0];
        this.$data.targetsNewLast = this.$data.targetsNew[this.$data.targetsNew.length - 1];
        this.$forceUpdate();
      }
    },
    moveGateOneQubitDownwards() {
      let proposedTargets = [...this.$data.targetsNew];
      let proposedControls = [...this.$data.controlsNew];

      for (let i = 0; i < proposedTargets.length; i++) {
        proposedTargets[i] += 1;
      }
      for (let i = 0; i < proposedControls.length; i++) {
        proposedControls[i] += 1;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule[window.currentCircuitId], proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control downwards!");
      } else {
        this.$data.targetsNew = proposedTargets;
        this.$data.controlsNew = proposedControls;
        this.$data.targetsNewFirst = this.$data.targetsNew[0];
        this.$data.targetsNewLast = this.$data.targetsNew[this.$data.targetsNew.length - 1];
        this.$forceUpdate();
      }
    },
    dragStart: function(event) {
      hideTooltips();
      event.dataTransfer.setData("gateName", "circuit");
      event.dataTransfer.setData("drag-origin", "gate");
      event.dataTransfer.setData("dragged-qbit", this.qrow);
      event.dataTransfer.setData("originalTargets", [...this.targets]);
      event.dataTransfer.setData("originalStep", this.step);
      event.dataTransfer.setData("originalControls", [...this.controls]);
      event.dataTransfer.setData("controlstates", [...this.controlstates]);
      event.dataTransfer.setData("circuit_id", this.circuit_id);
      event.dataTransfer.setData("circuit_abbreviation", this.circuit_abbreviation);
      event.dataTransfer.setData("circuit_power", this.circuit_power);
      event.dataTransfer.setData("targets_expression", this.targets_expression);
      let dragImageGhost = createCircuitDragImageGhost();
      event.dataTransfer.setDragImage(dragImageGhost, 20, 20);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
    handleDragOver() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/red-line.svg");
    },
    handleDragLeave() {
      var image = window.document.getElementById(this.id);
      if (getUserInterfaceSetting('colored-gates') === 'true'){
        image.src = require("../assets/colored-gates/" + this.img + ".svg");
      } else {
        image.src = require("../assets/blue-gates/" + this.img + ".svg");
      }
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

.circuit-gate-div {
  display: inline-block;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
}

</style>