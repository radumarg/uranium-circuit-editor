<template>
  <div :step="step" :qrow="qrow" v-on:click="handleClick" @dragenter.prevent @dragover.prevent @drop.prevent="handleDropEvent">

    <img v-if="gateImageIsABox()" :src="gateImageSrcEditor" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave" style="width:100%;height:100%;max-width:40px;max-height:40px;min-width:40px;min-height:40px;"/>

    <div v-else-if="gateImageIsCircuit()">
      <div v-if="gateNameSpaceNeeded() == 'small' && usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="7" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
            <text x="26.5" y="15" style="font-size: 13px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-else-if="usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="4.5" y="28" style="font-size: 25px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="2.5" y="28" style="font-size: 25px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-else x="2.5" y="28" style="font-size: 20px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="17.5" y="35" style="font-size: 12px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-else x="15.5" y="35" style="font-size: 11px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="21" y="15" style="font-size: 13px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="19" y="15" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'ultra-large'" x="14" y="13" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else x="10" y="13" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-if="gateNameSpaceNeeded() == 'small' && !usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="7" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
            <text x="26.5" y="15" style="font-size: 13px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-else-if="!usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="40" height="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="4.5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="2.5" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-else x="2.5" y="28" style="font-size: 20px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="17.5" y="35" style="font-size: 12px; font-style: italic; fill: #678efa; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-else x="15.5" y="35" style="font-size: 11px; font-style: italic; fill: #678efa; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="21" y="15" style="font-size: 13px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="19" y="15" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'ultra-large'" x="14" y="13" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else x="10" y="13" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
    </div>

    <div v-else-if="gateImageIsUp()">
      <div v-if="gateNameSpaceNeeded() == 'small' && usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="7" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
            <text x="26.5" y="15" style="font-size: 13px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-else-if="usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="4.5" y="28" style="font-size: 25px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="2.5" y="28" style="font-size: 25px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-else x="2.5" y="28" style="font-size: 20px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="17.5" y="35" style="font-size: 12px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-else x="15.5" y="35" style="font-size: 11px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="21" y="15" style="font-size: 13px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="19" y="15" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'ultra-large'" x="14" y="13" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else x="10" y="13" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-if="gateNameSpaceNeeded() == 'small' && !usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="7" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
            <text x="26.5" y="15" style="font-size: 13px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-else-if="!usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="40" y2="0" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="4.5" y="28" style="font-size: 25px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="2.5" y="28" style="font-size: 25px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-else x="2.5" y="28" style="font-size: 20px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="17.5" y="35" style="font-size: 12px; font-style: italic; fill: #678efa; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-else x="15.5" y="35" style="font-size: 11px; font-style: italic; fill: #678efa; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="21" y="15" style="font-size: 13px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="19" y="15" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'ultra-large'" x="14" y="13" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else x="10" y="13" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div> 
    </div>

    <div v-else>
      <div v-if="gateNameSpaceNeeded() == 'small' && usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="7" y="28" style="font-size: 27px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
            <text x="26.5" y="15" style="font-size: 13px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-else-if="usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: MediumSlateBlue; stroke-width:3.8; stroke-opacity:1;"/>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="4.5" y="28" style="font-size: 25px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="2.5" y="28" style="font-size: 25px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-else x="2.5" y="28" style="font-size: 20px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">C</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="17.5" y="35" style="font-size: 12px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-else x="15.5" y="35" style="font-size: 11px; font-style: italic; fill: MediumSlateBlue; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="21" y="15" style="font-size: 13px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="19" y="15" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'ultra-large'" x="14" y="13" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else x="10" y="13" style="font-size: 11px; fill: MediumSlateBlue; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-if="gateNameSpaceNeeded() == 'small' && !usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text x="7" y="28" style="font-size: 27px; font-style: italic; fill: #678efa; white-space: pre;">C<tspan baseline-shift="sub" style="font-size: 12px;">{{ getCircuitAbbreviation() }}</tspan></text>
            <text x="26.5" y="15" style="font-size: 13px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
      <div v-else-if="!usingColoredGates" draggable="true" class="editor-circuit-gate-div" :id="id" :title="title" :name="name" @dragend="dragEnd" @dragstart="dragStart" @dragover="handleDragOver" @dragleave="handleDragLeave"  @mousedown="handleMouseDown">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="0" y1="0" x2="0" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <line x1="40" y1="0" x2="40" y2="40" style="opacity:1; fill:none; stroke: #678efa; stroke-width:3.8; stroke-opacity:1;"/>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="4.5" y="28" style="font-size: 25px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="2.5" y="28" style="font-size: 25px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-else x="2.5" y="28" style="font-size: 20px; font-style: italic; fill: #678efa; white-space: pre;">C</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="17.5" y="35" style="font-size: 12px; font-style: italic; fill: #678efa; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-else x="15.5" y="35" style="font-size: 11px; font-style: italic; fill: #678efa; white-space: pre;">{{ getCircuitAbbreviation() }}</text>
            <text v-if="gateNameSpaceNeeded() == 'medium'" x="21" y="15" style="font-size: 13px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'large'" x="19" y="15" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else-if="gateNameSpaceNeeded() == 'ultra-large'" x="14" y="13" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
            <text v-else x="10" y="13" style="font-size: 11px; fill: #678efa; font-style: italic;">{{ getCircuitPower() }}</text>
          </g>
        </svg>
      </div>
    </div>

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
          <td colspan="2" style="padding: 5px;">
            <b-form-select style="width:190px; max-width: 190px; min-width: 190px;" v-model="powerSignNew" :options="powerSignSettings" class="mt-1"></b-form-select>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="100px" title="Indicates the power used to apply this gate in circuit. It must be a pozitive or negative integer where negative indicates that the inverse of this circuit is applied.">Power (t):</td>
          <td width="100px" style="padding: 5px;">
            <b-form-input @keyup.enter.native="handleSave()" v-model.number="circuitPowerNewT" id="power-new-t" v-on:click="resetPowerK()" v-on:change="resetPowerK()" placeholder="" type="number" style="width:100px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="100px" title="Indicates the power used to apply this gate in circuit. It must be a pozitive or negative integer where negative indicates that the inverse of this circuit is applied.">Power (k): <br/>(t = 2^k)</td>
          <td width="100px" style="padding: 5px;">
            <b-form-input @keyup.enter.native="handleSave()" v-model.number="circuitPowerNewK" id="power-new-k" v-on:click="resetPowerT()" v-on:change="resetPowerT()" placeholder="" type="number" style="width:100px;"></b-form-input>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td width="100px" title="First qubit. This is used to indicate the first target qubit. Target qubits are selected via the 'Targets Expression' which is a Javascript 'j' based expression that must evaluate to 'true' or 'false' for each qubit position identified by 'j' where j is a zero based qubit index and where index 0 corresponds to the first qubit in this dialog.">First Qubit:</td>
          <td width="100px" style="padding: 5px;">
            <b-form-input min="0" @keyup.enter.native="handleSave()" v-model.number="targetsNewFirst" placeholder="qbit" type="number" id="qbit-new" style="width:100px;"></b-form-input>
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
            First Topmost Qubit:
          </td>
          <td width="100px" class="td-2nd-modal">
            <b-form-input min="0" v-model.number="qbitFirst" placeholder="q" type="number" id="qbit-start" style="width:75px;"></b-form-input>
          </td>
          <td width="100px" class="td-2nd-modal">
            Last Topmost Qubit:
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
            Power Sign - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="powerSignExpression" placeholder="" type="text" id="power-t-expression" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            Power (t) Value - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="powerTExpression" placeholder="" type="text" id="power-t-expression" v-on:click="resetPowerKExpression()" v-on:change="resetPowerKExpression()" style="min-width:400px;"></b-form-input>
          </td>
          <td class="no-resize-cell"></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" width="300px" class="td-2nd-modal">
            Power (k) Value - 'q, s' based <br/>javascript expression:
          </td>
          <td colspan="3" width="400px" class="td-2nd-modal">
            <b-form-input min="0" v-model="powerKExpression" placeholder="" type="text" id="power-k-expression" v-on:click="resetPowerTExpression()" v-on:change="resetPowerTExpression()" style="min-width:400px;"></b-form-input>
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
import { mapActions } from 'vuex';
import { arraysAreEqual } from "../store/modules/javaScriptUtils.js";
import { controlsMixin } from "../mixins/controlsMixin.js";
import { getMultipleTargets, getClosestControlledGates, getCompatibleCircuitIds, getNumericValueOfCircuitPower } from "../store/modules/editorHelper.js";
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
    'circuit_power': String,
  },
  data() {
    return {
      targetsNewFirst: this.targets[0],
      circuitPowerNewT: this.getTPower(),
      circuitPowerNewK: this.getKPower(),
      circuitNames: this.getCircuitNameOptions(),
      circuitNameNew: this.$store.state.circuitEditorModule[this.circuit_id]["circuit_name"],
      usingColoredGates: getUserInterfaceSetting("colored-gates") === 'true',
      powerTExpression: this.getTPower(),
      powerKExpression: this.getKPower(),
      powerSignExpression: this.getPowerSign(),
      powerSignNew: this.getPowerSign(),
      powerSignSettings: [
        { value: 1, text: 'Power Sign: +' },
        { value: -1, text: 'Power Sign: -' },
      ]
    }
  },
  watch: {
    control: function() {
      // need this in order to update rootNew
      // when doing drag & drop on the stub
      this.$data.circuitPowerNewT = this.getTPower();
      this.$data.circuitPowerNewK = this.getKPower();
      this.$data.powerSignNew = this.getPowerSign();
    }
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'repositionElementaryGateInCircuit', 'removeGateFromCircuit']),
    initializeData: function () {
      this.$data.controlsNew = [...this.controls];
      this.$data.controlstatesNew = [...this.controlstates];
      this.$data.numberOfControls = this.controls.length;
      this.$data.targetsNewFirst = this.targets[0];
      this.$data.circuitPowerNewT = this.getTPower();
      this.$data.circuitPowerNewK = this.getKPower();
      this.$data.powerSignNew = this.getPowerSign();
    },
    getCircuitNameOptions: function() {
      let circuitNameOptions = [];
      let compatibleCircuitIds = getCompatibleCircuitIds(this.$store.state.circuitEditorModule);
      for (let i = 0; i < compatibleCircuitIds.length; i++) {
        let id = compatibleCircuitIds[i];
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
    // TODO: fix this
    getCircuitPower: function(){
      if (getNumericValueOfCircuitPower(this.circuit_power) == 1) return "";
      return this.circuit_power;
    },
    gateNameSpaceNeeded: function(){
      if (this.circuit_power.includes("2^") && this.circuit_power.length > 4) return "maximum";
      if (this.circuit_power < -999) return "maximum";
      if (this.circuit_power > 999) return "maximum";
      if (this.circuit_power.includes("2^")) return "ultra-large";
      if (this.circuit_power < -99) return "ultra-large";
      if (this.circuit_power > 99) return "large";
      if (this.circuit_power < -9) return "large";
      if (this.circuit_abbreviation.length > 2) return "large"
      if (this.circuit_abbreviation.length > 1) return "medium"
      if (this.circuit_power > 9) return "medium";
      if (this.circuit_power < 0) return "medium";
      return "small";
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
      if (this.$data.circuitPowerNewT == null && this.$data.circuitPowerNewK == null) {
        alert("Either circuit power 't' or circuit power 'k' expression must be defined!");
        return;
      }
      if (!Number.isInteger(this.$data.targetsNewFirst)){
        alert("The first target qubit must be an integer positive number!");
        return;
      }
      if (this.$data.circuitPowerNewT != null &&
         (!Number.isInteger(this.$data.circuitPowerNewT) || this.$data.circuitPowerNewT < 0)){
        alert("The circuit power (t) must be an integer positive number!");
        return;
      }
      if (this.$data.circuitPowerNewK != null &&
         (!Number.isInteger(this.$data.circuitPowerNewK) || this.$data.circuitPowerNewK < 0)){
        alert("The circuit power (k) must be an integer positive number!");
        return;
      }
      if (this.$data.circuitPowerNewT == 0){
        alert("Circuit power (t) cannot be zero!");
        return;
      }
      if (this.$data.circuitPowerNewK == 0){
        alert("Circuit power (k) cannot be zero!");
        return;
      }
      let newCircuitId = this.getCircuitId(this.$data.circuitNameNew);
      let circuitState = this.$store.state.circuitEditorModule[newCircuitId];
      let noQubits = getNoQbits(circuitState);
      if (noQubits == 0){
        alert("The selected circuit has zero gates!");
        return;
      }
      let targetsNew = getMultipleTargets(this.$data.targetsNewFirst, noQubits);
      this.$data.targetsNewFirst = targetsNew[0];
      // remember current state
      let targetsOld = [...this.targets];
      let circuitNameOld = this.$store.state.circuitEditorModule[this.circuit_id]["circuit_name"];
      // save action
      let promise = this.repositionGateInCircuit({
        'step': this.step,
        'name': this.name,
        'img': this.img,
        'circuit_id': newCircuitId,
        'circuit_abbreviation': this.$store.state.circuitEditorModule[newCircuitId]["circuit_abbreviation"],
        'circuit_power': this.getCircuitPowerNew(),
        'targets': [...this.targets],
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
          this.$data.circuitNameNew = circuitNameOld;
          this.$data.circuitPowerNewT = this.getTPower();
          this.$data.circuitPowerNewK = this.getKPower();
          this.$data.powerSignNew = this.getPowerSign();
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
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let originalTargets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let originalControls = JSON.parse("[" +  event.dataTransfer.getData("originalControls") + "]");
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));

      if (dropQbit == draggedQbit) return;

      let controlstates = [];
      if (event.dataTransfer.types.includes("controlstates")) {
        let controlstatesData = event.dataTransfer.getData("controlstates");
        if (controlstatesData) {
          controlstates = controlstatesData.split(",");
        }
      }

      // add the new gate mandatory params
      let dto = { "step": step, "name": gateName, "controls": originalControls, "controlstates": controlstates, "circuit_id": circuitId, "circuit_abbreviation": circuitAbbreviation, "circuit_power": circuitPower };

      dto["targets"] = Array.from(originalTargets, x => x + dropQbit - draggedQbit);

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
    handleMouseDown(event) {
      if (event.shiftKey)
        alert("Due to known bug in Chromium Shift + Drag will not work here. You can Shift + Drag a circuit type gate by acting on portion of the gate that contains no text.")
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
        'circuit_id': this.circuit_id,
        'circuit_abbreviation': this.circuit_abbreviation,
        'qbitConditionExpression': this.qbitConditionExpression,
        'conjugateConditionExpression': this.conjugateConditionExpression,
        'numberOfControlsExpression': this.numberOfControlsExpression,
        'controlsExpression': this.controlsExpression,
        'controlstatesExpression': this.controlstatesExpression,
        'powerSignExpression': this.powerSignExpression,
        'powerTExpression': this.powerTExpression,
        'powerKExpression': this.powerKExpression,
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
    getTPower(){
      if (this.circuit_power.includes("2^")){
        return null;
      } else {
        let power = this.circuit_power;
        if (power[0] == "-") {
          power = power.slice(1);
        }
        return parseInt(power);
      }
    },
    getKPower(){
      if (this.circuit_power.includes("2^")){
        let power = this.circuit_power;
        if (power[0] == "-") {
          power = power.slice(1);
        }
        power = power.slice(2);
        return parseInt(power);
      } else {
        return null;
      }
    },
    resetPowerK(){
      this.$data.circuitPowerNewK = null;
    },
    resetPowerT(){
      this.$data.circuitPowerNewT = null;
    },
    resetPowerKExpression(){
      this.$data.powerKExpression = null;
    },
    resetPowerTExpression(){
      this.$data.powerTExpression = null;
    },
    getPowerSign(){
      if (this.circuit_power[0] == "-") {
        return -1;
      }
      return 1;
    },
    getCircuitPowerNew() {
      let sign = "";
      if (this.$data.powerSignNew < 0) {
        sign = "-"
      }
      if (this.$data.circuitPowerNewK == null) {
        return sign + this.$data.circuitPowerNewT;
      }
      return sign + "2^" + this.$data.circuitPowerNewK;
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

.editor-circuit-gate-div {
  display: inline-block;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
}

</style>