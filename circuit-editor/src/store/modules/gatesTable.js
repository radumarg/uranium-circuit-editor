import Vue from 'vue';
import { getUserInterfaceSetting } from "./applicationWideReusableUnits.js";
import { range } from "./javaScriptUtils.js";
import { gateCanHaveMultipleTargets, getNumericValueOfCircuitPower } from "./editorHelper.js";

/* Holds information necessary to diplay a cell in gates table */
class GatesTableCell {
  constructor(row, column) {
    /* row index in gates table */
    this.row = row;
    /* column index in gates table */
    this.column = column;
    /* cell height */
    this.height = 0;
    /* cell width */
    this.width = 0;
    /* the step where this active gate is applied */
    this.step = null;
    /* the qbit associated to current row (null in case row does not hold gates) */
    this.qrow = 0;
    /* the target qbits associated with gate present on this cell */
    this.targets = [];
    /* name of Vue component displayed by this cell. For example for a controlled
    gate we have one component used to render target qubit and another component
    used to render the controll qubit*/
    this.name = null;
    /* name of the gate, possibly different from name in multiple bit gates */
    this.gate = null;
    /* image that will be shown inside this cell which is different
    from gate name for controlled gates or two target qubit gates */
    this.img = null;
    /* tooltip to be dispayed for this gate */
    this.tooltip = null;
    /* angles for parametric gates */
    this.phi = null;
    this.theta = null;
    this.lambda = null;
    /* root used by pauli root gates: +/-(1/t) or +/-(1/2^k) */
    this.root = null;
    /* used by measure gates */
    this.bit = null;
    /* cell already has some content */
    this.taken = false;
    /* id of this cell, only for cells that can hold gates */
    this.id = "";
    /* controls qbits for a controlled gate */
    this.controls = [];
    /* For controlled gates this indicates the control states defined as +/-1 along Z axis in computational basis.*/
    this.controlstates = [];
    /* single qubit gates attached to an aggregate gate */
    this.gates = [];
    /* id of the circuit for a circuit gate */
    this.circuit_id = null;
    /* abbrevation used to distinguish different circuit gates */
    this.circuit_abbreviation = null;
    /* power for a circuit gate: pozitive or negative integer */
    this.circuit_power = null;
    /* i-based javascript target expression */
    this.targets_expression = null;
    /* the circle in parametric swap gates is not being refreshed by vue when draging the upper qbit, 
       upwards to a new position so we need to update this key to force vue to re-render that cell 
    */
    this.key = null;
  }
}

/* Holds information necessary to diplay the gates table */
class GatesTableRowState {
  constructor(row, columns) {
    this.cells = new Array(columns);
    for (let column = 0; column < columns; column++) {
      this.cells[column] = new GatesTableCell(row, column);
    }
  }
}

// Calculate the number of steps in the
// state representing circuit layout.
export function getNoSteps(circuitState) {
  let steps = 0;
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      let index = circuitState.steps[i]["index"];
      steps = Math.max(steps, parseInt(index));
    }
  }

  // first step has index 0
  return steps + 1;
}

// Calculate the number of qbits in the state
// state representing circuit layout.
export function getNoQbits(circuitState) {
  let maxQbitIndex = -1;
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (
        Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")
      ) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
            maxQbitIndex = Math.max(maxQbitIndex, ...gate.targets);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
            for (let k = 0; k < gate["controls"].length; k++) {
              let controlInfo = gate["controls"][k];
              let target = controlInfo["target"];
              maxQbitIndex = Math.max(maxQbitIndex, target);
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
            for (let k = 0; k < gate["gates"].length; k++) {
              let aggregatedGate = gate["gates"][k];
              maxQbitIndex = Math.max(maxQbitIndex, ...aggregatedGate.targets);
            }
          }
        }
      }
    }
  }

  // first qbit has index 0
  return maxQbitIndex + 1;
}

// the index of a classic bit cannot be larger than maximum qubit index
export function classicBitsAreValid(circuitState){
  let maxQbitIndex = getNoQbits(circuitState) - 1;
  for (let i = 0; i < circuitState.steps.length; i++) {
    let gates = circuitState.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name.includes("measure-")){
        if (gate.bit > maxQbitIndex) {
          return false;
        }
      }
    }
  }
  return true;
}

// make sure that no non-measure gate is placed after a measure gate on any given qubit
export function measureGatesArePositionedLast(circuitStates, currentCircuitId, collectedMeasureGates, qubitStart){
  let circuitState = circuitStates[currentCircuitId];
  for (let i = 0; i < circuitState.steps.length; i++) {
    let gates = circuitState.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name.includes("measure-")){
        collectedMeasureGates.push(gate.targets[0] + qubitStart);
      } else if (gate.name == "circuit"){
        let power = getNumericValueOfCircuitPower(gate.circuit_power);
        for (let k = 0; k < Math.abs(power); k++) {
          if (!measureGatesArePositionedLast(circuitStates, gate.circuit_id, collectedMeasureGates, gate.targets[0] + qubitStart)) {
            return false;
          }
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
          let targets = gate.targets;
          for (let j = 0; j < targets.length; j++){
            if (collectedMeasureGates.includes(targets[j] + qubitStart)) {
              return false;
            }
          }
        }
        if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
          for (let i = 0; i < gate["controls"].length; i++) {
            let controlInfo = gate["controls"][i];
            let target = controlInfo["target"];
            if (collectedMeasureGates.includes(target + qubitStart)) {
              return false;
            }
          }
        }
        if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
          for (let i = 0; i < gate["gates"].length; i++) {
            let aggregatedGate = gate["gates"][i];
            for (let j = 0; j < aggregatedGate.targets.length; j++) {
              let target = aggregatedGate.targets[j];
              if (collectedMeasureGates.includes(target + qubitStart)) {
                return false;
              }
            }
          }
        }
      }
    }
  }
  return true;
}

// Verifiy if position is filled
export function positionIsFilled(circuitState, step, qubit) {
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {

          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {
            let gate = gates[j];
            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              let targets = gate.targets;
              let takenQubits = range(targets[0], targets[targets.length - 1]);
              if (takenQubits.includes(qubit)) {
                return true;
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              for (let k = 0; k < gate["controls"].length; k++) {
                let controlInfo = gate["controls"][k];
                let target = controlInfo["target"];
                if (target == qubit) return true;
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
              for (let k = 0; k < gate["gates"].length; k++) {
                let aggregatedGate = gate["gates"][k];
                if (aggregatedGate.targets.includes(qubit)) {
                  return true;
                }
              }
            }
          }

          return false;
        }
      }
    }
  }
  return false;
}

// Verify if a gate can be placed at location. Note that for example a single 
// bit gate cannot be placed between a control and a target qbits belonging to some  
// other control gate or between target qbits for a two qubit gate. 
export function seatIsTaken(circuitState, qbit, step) {
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {

            let gate = gates[j];
            let targets = [];
            let controls = [];
            let aggregatedTargets = [];

            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              targets = [...gate.targets];
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              for (let i = 0; i < gate["controls"].length; i++) {
                let controlInfo = gate["controls"][i];
                let target = controlInfo["target"];
                controls.push(target);
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
              for (let i = 0; i < gate["gates"].length; i++) {
                let aggregatedGate = gate["gates"][i];
                aggregatedTargets.push(...aggregatedGate.targets);
              }
            }

            // get range of qbits affected when displaying this gate
            let qbits = [...targets, ...controls, ...aggregatedTargets];

            let qmin = Math.min(...qbits);
            let qmax = Math.max(...qbits);

            if ((qmin <= qbit) && (qbit <= qmax)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  return false;
}

export function getProximFreeSeat(circuitState, qbit, step) {
  if (!seatIsTaken(circuitState, qbit + 1, step)) {
    return qbit + 1;
  } else if (!seatIsTaken(circuitState, qbit - 1, step)) {
    return qbit - 1;
  }
  return null;
}

export function qbitIsTaken(circuitState, qbit, step) {
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {

            let gate = gates[j];
            let targets = [];
            let controls = [];
            let aggregatedTargets = [];

            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              targets = [...gate.targets];
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              for (let i = 0; i < gate["controls"].length; i++) {
                let controlInfo = gate["controls"][i];
                let target = controlInfo["target"];
                controls.push(target);
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
              for (let i = 0; i < gate["gates"].length; i++) {
                let aggregatedGate = gate["gates"][i];
                aggregatedTargets.push(...aggregatedGate.targets);
              }
            }

            // get range of qbits affected when displaying this gate
            let qbits = [...targets, ...controls, ...aggregatedTargets];
            if (qbits.includes(qbit)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  return false;
}

// Verify if a gate already exist in qbit range between target(s) and control(s), target(s) and control(s) included
export function seatsAreTaken(circuitState, proposedQbits, step, reallocatableQbits = []) {

  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {

            let gate = gates[j];
            let targets = [];
            let controls = [];
            let aggregatedTargets = [];

            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              targets = [...gate.targets];
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              for (let i = 0; i < gate["controls"].length; i++) {
                let controlInfo = gate["controls"][i];
                let target = controlInfo["target"];
                controls.push(target);
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
              for (let i = 0; i < gate["gates"].length; i++) {
                let aggregatedGate = gate["gates"][i];
                aggregatedTargets.push(...aggregatedGate.targets);
              }
            }

            // get range of qbits affected when displaying this gate
            let qbits = [...targets, ...controls, ...aggregatedTargets];
            
            let qmin = Math.min(...qbits);
            let qmax = Math.max(...qbits);
            let qminExisting = reallocatableQbits ? Math.min(...reallocatableQbits) : null;
            let qmaxExisting = reallocatableQbits ? Math.max(...reallocatableQbits) : null;
            let qminProposed = Math.min(...proposedQbits);
            let qmaxProposed = Math.max(...proposedQbits);
            
            for (let q = qminProposed; q <= qmaxProposed; q++) {
              if (reallocatableQbits.length > 0 && (qminExisting <= q) && (q <= qmaxExisting)) {
                // we know this seat can be allocated to a new gate
                // since it is currently free or allocated to a gate about to be removed,
                continue;
              }
              if ((qmin <= q) && (q <= qmax)) {
                // seat is taken by another existing gate
                return true;
              }
            }
          }
        }
        return false;
      }
    }
  }
  return false;
}

// Verify if a set of gates can be placed at these locations. Note that for example a single 
// bit gate cannot be placed between a control and a target qbits belonging to some  
// other control gate or between target and target2 qbits for a two qubit gate. 
export function seatsInArrayAreAlreadyTaken(circuitState, dtos, ignoreStep = null, ignoreQubits = []) {
  for (let i = 0; i < dtos.length; i++) {

    let step = dtos[i]["step"];

    if (Object.prototype.hasOwnProperty.call(dtos[i], "targets")) {
      let targets = dtos[i]["targets"];
      let qbits = range(targets[0], targets[targets.length - 1]);
      for (let j = 0; j < qbits.length; j++){
        let qbit = qbits[j];
        if (ignoreStep == step && ignoreQubits.includes(qbit)) continue;
        if (seatIsTaken(circuitState, qbit, step)) return true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "controls")) {
      let controls = dtos[i]["controls"];
      for (let j = 0; j < controls.length; j++){
        let control = controls[j];
        if (ignoreStep == step && ignoreQubits.includes(control)) continue;
        if (seatIsTaken(circuitState, control, step)) return true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "gates")) {
      let gates = dtos[i]["gates"];
      for (let j = 0; j < gates.length; j++){
        let gate = gates[j];
        for (let i = 0; i < gate.targets.length; i++) {
          let qbit = gate.targets[i];
          if (ignoreStep == step && ignoreQubits.includes(qbit)) continue;
          if (seatIsTaken(circuitState, qbit, step)) return true;
        }
      }
    }
  }
  return false;
}

/*************************************************************
 *  Establish the rules for mapping row/columns to qbits/steps
 *************************************************************/

// Calculate step for a cell holding a
// gate, does not apply to transition cells.
function gateStepFromColumn(column) {
  column = parseInt(column);
  return (column - 2) / 2;
}

// Calculate qbit for a cell holding a
// gate, does not apply to transition cells.
function getQbitFromRow(row) {
  row = parseInt(row);
  return (row - 1) / 2;
}

// returns true if this is NOT a transition cell
function rowHoldsGates(row) {
  row = parseInt(row);
  return (row - 1) % 2 === 0;
}

// returns true if this is NOT a transition cell
function columnHoldsGate(column) {
  column = parseInt(column);
  return column > 1 && column % 2 === 0;
}

// Calculate column for a cell holding a
// gate, does not apply to transition cells.
function getColumnFromStep(step) {
  step = parseInt(step);
  return step * 2 + 2;
}

// Calculate row for a cell holding a
// gate, does not apply to transition cells.
function getRowFromQbit(qbit) {
  qbit = parseInt(qbit);
  return qbit * 2 + 1;
}

/***********************************************************
 * Global variable declared at module level. These will
 * hold the numebr of rows and columns in GatesTableRowState:
 ***********************************************************/
class GatesTable {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
  }
}

export function getNumberOfRowsThatFit() {
  let availableHeight = window.innerHeight;
  let zoomLevel = Vue.$cookies.get('zoom-level');
  if (zoomLevel == null) {
    return 10 + 2 * Math.ceil((availableHeight - 70) / (window.cellSize + window.separatorCellSize));
  } else {
    let zoom = 100.0 / parseFloat(zoomLevel);
    return 10 + Math.ceil(zoom * 2 * (availableHeight - 70) / (window.cellSize + window.separatorCellSize));
  }
}

export function getNumberOfColumnsThatFit() {
  let availableWidth = window.innerWidth;
  let zoomLevel = Vue.$cookies.get('zoom-level');
  if (zoomLevel == null) {
    return 10 + 2 * Math.ceil((availableWidth - 280) / (window.cellSize + window.separatorCellSize));
  } else {
    let zoom = 100.0 / parseFloat(zoomLevel);
    return 10 + Math.ceil(zoom * 2 * (availableWidth - 280) / (window.cellSize + window.separatorCellSize));
  }
}

export function retrieveRowsInGatesTable(circuitState) {

  if (!Object.prototype.hasOwnProperty.call(window, "cellSize")) {
    window.cellSize = 40;
    window.separatorCellSize = 10;
  }

  let rows = getNumberOfRowsThatFit();
  let columns = getNumberOfColumnsThatFit();

  // I need to know the initial size of the screen
  // to readjuts no qubits/steps (rows/columns)
  // when loading a new circuit
  if (typeof window.initialRows === "undefined"){
    window.initialRows = rows;
  }
  if (typeof window.initialColumns === "undefined"){
    window.initialColumns = columns;
  }

  if (!Object.prototype.hasOwnProperty.call(window, "gatesTable")) {
    window.gatesTable = new GatesTable(rows, columns);
  }

  let steps = getNoSteps(circuitState);
  let qbits = getNoQbits(circuitState);

  // Depending of number of qbits and steps in circuit,
  // number of rows and columns can increase but will never
  // decrease except when a new circuit is created. Here we adjust
  // no of rows and columns if more qbits or steps were added to circuit.
  window.gatesTable.rows = Math.max(2 * qbits + 2, window.gatesTable.rows);
  window.gatesTable.columns = Math.max(2 * steps + 2, window.gatesTable.columns);
  
  return window.gatesTable.rows;
}

/******************************************************************
 * Utility functions for rendering stubs for controlled gates and  
 * intermediate connecting lines between the gates and those stubs.
 * Also used for rendering swap gates.
 ******************************************************************/

var pauliGates = ["pauli-x", "pauli-y", "pauli-z"];
var pauliRootGates = ["pauli-x-root", "pauli-y-root", "pauli-z-root", "pauli-x-root-dagger", "pauli-y-root-dagger", "pauli-z-root-dagger"];
var stGates = ["t", "t-dagger", "s", "s-dagger", "v", "v-dagger", "h", "h-dagger"];
var rGates = ["rx-theta", "ry-theta", "rz-theta"];
var cGates = ["c", "c-dagger"];
var hadamardGates = ["hadamard", "hadamard-xy", "hadamard-yz", "hadamard-zx"];
var unitaryGates = ["u1", "u2", "u3"];
var aggregateGates = ["aggregate"];
var isingGates = ["xx", "yy", "zz", "xy", "molmer-sorensen", "molmer-sorensen-dagger"];
var givensGates = ["givens"];
var swapGates = ["swap", "sqrt-swap", "sqrt-swap-dagger", "swap-theta", "swap-root", "swap-root-dagger", "iswap", "fswap"];
var becpwGates = ["berkeley", "berkeley-dagger", "ecp", "ecp-dagger", "w"];
var aGates = ["a"];
var magicGates = ["magic", "magic-dagger"];
var canonicalGates = ["canonical"];
var crossResonanceGates = ["cross-resonance", "cross-resonance-dagger"];
var qftGates = ["qft", "qft-dagger"];
var phaseShiftGates = ["p"];
var circuitGates = ["circuit"];


function getSwapIntermediateLineName(thisRowHoldsGates, qmin, qrow, gateName) {
  if (thisRowHoldsGates) {
    return "swap-line-long";
  } else {
    if ((qmin + 0.5) == qrow && gateName != "swap") {
      return "swap-circle-small";
    } else {
      return "swap-line-short"
    }
  }
}

function getCtrlStubDownName(gate, controlstate) {
  if (pauliGates.includes(gate.name)) {
    return "ctrl-pauli-stub-down-" + controlstate;
  } else if (pauliRootGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-down-" + controlstate;
  } else if (stGates.includes(gate.name)) {
    return "ctrl-st-stub-down-" + controlstate;
  } else if (rGates.includes(gate.name)) {
    return "ctrl-r-theta-stub-down-" + controlstate;
  } else if (hadamardGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-down-" + controlstate;
  } else if (unitaryGates.includes(gate.name)) {
    return "ctrl-u-stub-down-" + controlstate;
  } else if (swapGates.includes(gate.name)) {
    return "ctrl-swap-stub-down-" + controlstate;
  } else if (givensGates.includes(gate.name)) {
    return "ctrl-givens-stub-down-" + controlstate;
  }else if (isingGates.includes(gate.name)) {
    return "ctrl-ising-stub-down-" + controlstate;
  } else if (cGates.includes(gate.name)) {
    return "ctrl-c-stub-down-" + controlstate;
  } else if (becpwGates.includes(gate.name)) {
    return "ctrl-bwecp-stub-down-" + controlstate;
  } else if (magicGates.includes(gate.name)) {
    return "ctrl-magic-stub-down-" + controlstate;
  } else if (canonicalGates.includes(gate.name)) {
    return "ctrl-canonical-stub-down-" + controlstate;
  } else if (aGates.includes(gate.name)) {
    return "ctrl-a-stub-down-" + controlstate;
  } else if (crossResonanceGates.includes(gate.name)) {
    return "ctrl-cross-resonance-stub-down-" + controlstate;
  } else if (aggregateGates.includes(gate.name)) {
    return "ctrl-aggregate-stub-down-" + controlstate;
  } else if (qftGates.includes(gate.name)) {
    return "ctrl-qft-stub-down-" + controlstate;
  } else if (phaseShiftGates.includes(gate.name)) {
    return "ctrl-p-stub-down-" + controlstate;
  } else if (circuitGates.includes(gate.name)) {
    return "ctrl-circuit-stub-down-" + controlstate;
  }
}

function getCtrlStubUpName(gate, controlstate) {
  if (pauliGates.includes(gate.name)) {
    return "ctrl-pauli-stub-up-" + controlstate;
  } else if (pauliRootGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-up-" + controlstate;
  } else if (stGates.includes(gate.name)) {
    return "ctrl-st-stub-up-" + controlstate;
  } else if (rGates.includes(gate.name)) {
    return "ctrl-r-theta-stub-up-" + controlstate;
  } else if (hadamardGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-up-" + controlstate;
  } else if (unitaryGates.includes(gate.name)) {
    return "ctrl-u-stub-up-" + controlstate;
  } else if (swapGates.includes(gate.name)) {
    return "ctrl-swap-stub-up-" + controlstate;
  } else if (givensGates.includes(gate.name)) {
    return "ctrl-givens-stub-up-" + controlstate;
  } else if (isingGates.includes(gate.name)) {
    return "ctrl-ising-stub-up-" + controlstate;
  } else if (cGates.includes(gate.name)) {
    return "ctrl-c-stub-up-" + controlstate;
  } else if (becpwGates.includes(gate.name)) {
    return "ctrl-bwecp-stub-up-" + controlstate;
  } else if (magicGates.includes(gate.name)) {
    return "ctrl-magic-stub-up-" + controlstate;
  } else if (canonicalGates.includes(gate.name)) {
    return "ctrl-canonical-stub-up-" + controlstate;
  } else if (aGates.includes(gate.name)) {
    return "ctrl-a-stub-up-" + controlstate;
  } else if (crossResonanceGates.includes(gate.name)) {
    return "ctrl-cross-resonance-stub-up-" + controlstate;
  } else if (aggregateGates.includes(gate.name)) {
    return "ctrl-aggregate-stub-up-" + controlstate;
  } else if (qftGates.includes(gate.name)) {
    return "ctrl-qft-stub-up-" + controlstate;
  } else if (phaseShiftGates.includes(gate.name)) {
    return "ctrl-p-stub-up-" + controlstate;
  } else if (circuitGates.includes(gate.name)) {
    return "ctrl-circuit-stub-up-" + controlstate;
  }
}

function getCtrlStubMidName(gate, controlstate) {
  if (pauliGates.includes(gate.name)) {
    return "ctrl-pauli-stub-mid-" + controlstate;
  } else if (pauliRootGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-mid-" + controlstate;
  } else if (stGates.includes(gate.name)) {
    return "ctrl-st-stub-mid-" + controlstate;
  } else if (rGates.includes(gate.name)) {
    return "ctrl-r-theta-stub-mid-" + controlstate;
  } else if (hadamardGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-mid-" + controlstate;
  } else if (unitaryGates.includes(gate.name)) {
    return "ctrl-u-stub-mid-" + controlstate;
  } else if (swapGates.includes(gate.name)) {
    return "ctrl-swap-stub-mid-" + controlstate;
  } else if (givensGates.includes(gate.name)) {
    return "ctrl-givens-stub-mid-" + controlstate;
  } else if (isingGates.includes(gate.name)) {
    return "ctrl-ising-stub-mid-" + controlstate;
  } else if (cGates.includes(gate.name)) {
    return "ctrl-c-stub-mid-" + controlstate;
  } else if (becpwGates.includes(gate.name)) {
    return "ctrl-bwecp-stub-mid-" + controlstate;
  } else if (magicGates.includes(gate.name)) {
    return "ctrl-magic-stub-mid-" + controlstate;
  } else if (canonicalGates.includes(gate.name)) {
    return "ctrl-canonical-stub-mid-" + controlstate;
  } else if (aGates.includes(gate.name)) {
    return "ctrl-a-stub-mid-" + controlstate;
  } else if (crossResonanceGates.includes(gate.name)) {
    return "ctrl-cross-resonance-stub-mid-" + controlstate;
  } else if (aggregateGates.includes(gate.name)) {
    return "ctrl-aggregate-stub-mid-" + controlstate;
  } else if (qftGates.includes(gate.name)) {
    return "ctrl-qft-stub-mid-" + controlstate;
  } else if (phaseShiftGates.includes(gate.name)) {
    return "ctrl-p-stub-mid-" + controlstate;
  } else if (circuitGates.includes(gate.name)) {
    return "ctrl-circuit-stub-mid-" + controlstate;
  }
}

function getIntermediateLineName(gateName, thisRowHoldsGates) {
  if (isingGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "ising-line-long";
    } else {
      return "ising-line-short";
    }
  } else if (givensGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "givens-line-long";
    } else {
      return "givens-line-short";
    }
  } else if (pauliGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "pauli-line-long";
    } else {
      return "pauli-line-short";
    }
  } else if (pauliRootGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "pauli-root-line-long";
    } else {
      return "pauli-root-line-short";
    }
  } else if (stGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "st-line-long";
    } else {
      return "st-line-short";
    }
  } else if (rGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "r-line-long";
    } else {
      return "r-line-short";
    }
  } else if (hadamardGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "hadamard-line-long";
    } else {
      return "hadamard-line-short";
    }
  } else if (unitaryGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "u-line-long";
    } else {
      return "u-line-short";
    }
  } else if (swapGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "swap-line-long";
    } else {
      return "swap-line-short";
    }
  } else if (cGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "c-line-long";
    } else {
      return "c-line-short";
    }
  } else if (becpwGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "bwecp-line-long";
    } else {
      return "bwecp-line-short";
    }
  } else if (magicGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "magic-line-long";
    } else {
      return "magic-line-short";
    }
  } else if (canonicalGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "canonical-line-long";
    } else {
      return "canonical-line-short";
    }
  } else if (aGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "a-line-long";
    } else {
      return "a-line-short";
    }
  } else if (crossResonanceGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "cross-resonance-line-long";
    } else {
      return "cross-resonance-line-short";
    }
  } else if (aggregateGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "aggregate-line-long";
    } else {
      return "aggregate-line-short";
    }
  } else if (qftGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "qft-line-long";
    } else {
      return "qft-line-short";
    }
  } else if (phaseShiftGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "p-line-long";
    } else {
      return "p-line-short";
    }
  } else if (circuitGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "circuit-line-long";
    } else {
      return "circuit-line-short";
    }
  }
}

function getIntermediateImageForManyTargetsGates(inputRow, rowTargetMin, rowTargetMax, rowQbit, qubitsTakenByGate, gateName) {
  let noQubitsTakenByGate =  qubitsTakenByGate.length;
  if (inputRow == rowTargetMin) {
    if (noQubitsTakenByGate == 1) {
      return gateName;
    } else if (noQubitsTakenByGate == 2) {
      return `_${gateName}-up_`;
    } else {
      return "box-up";
    }
  } else if (inputRow == rowTargetMax) {
    return "box-down";
  } else {
    let middleTakenQubit = qubitsTakenByGate[Math.floor((noQubitsTakenByGate - 1) / 2)];
    if (rowQbit == middleTakenQubit) {
      return `_${gateName}_`;
    } else {
      return "box-middle-long";
    }
  }
}

/******************************************************************
 * Maps circuit state from a state specied in json format to a
 * tabular state which is used by Editor.vue to render the circuit.
 ******************************************************************/

// windowWidth, windowHeight should correspond to inner browser window dimensions
export function computeGatesTableCells(circuitState, inputRow) {

  inputRow = parseInt(inputRow);
  let gatesTableRowState = new GatesTableRowState(inputRow, window.gatesTable.columns);

  let timestamp = Date.now();
  setupEmptyCells(gatesTableRowState, inputRow);
  setupNonEmptyCells(gatesTableRowState, inputRow, circuitState, timestamp);

  return gatesTableRowState.cells;
}

/* set cell values for empty cells and other default values */
function setupEmptyCells(gatesTableRowState, inputRow) {

  // set default settings assuming all cells they are empty and hold no gates
  for (let column = 0; column < window.gatesTable.columns; column++) {
    if (rowHoldsGates(inputRow))
      gatesTableRowState.cells[column].qrow = getQbitFromRow(inputRow);
    if (columnHoldsGate(column))
      gatesTableRowState.cells[column].step = gateStepFromColumn(column);

    if (rowHoldsGates(inputRow) && columnHoldsGate(column)) {
      gatesTableRowState.cells[column].id = gatesTableRowState.cells[column].qrow + "_" + gatesTableRowState.cells[column].step;
    }

    if (column === 0) {
      if (rowHoldsGates(inputRow)) {
        gatesTableRowState.cells[column].name = "zero-state";
        gatesTableRowState.cells[column].height = window.cellSize;
        gatesTableRowState.cells[column].width = window.cellSize;
        let qubitNumber = getQbitFromRow(inputRow) + 1;
        gatesTableRowState.cells[column].tooltip = `qbit: ${qubitNumber - 1}`;
      } else {
        gatesTableRowState.cells[column].name = "vertical-transition-cell-rectangle";
        gatesTableRowState.cells[column].height = window.separatorCellSize;
        gatesTableRowState.cells[column].width = window.cellSize;
      }
    } else if (column === 1) {
      if (rowHoldsGates(inputRow)) {
        gatesTableRowState.cells[column].height = window.cellSize;
        gatesTableRowState.cells[column].width = window.separatorCellSize;
        gatesTableRowState.cells[column].name = "horizontal-transition-cell";
      } else {
        gatesTableRowState.cells[column].name = "vertical-transition-cell-square";
        gatesTableRowState.cells[column].height = window.separatorCellSize;
        gatesTableRowState.cells[column].width = window.separatorCellSize;
      }
    } else {
      if (rowHoldsGates(inputRow)) {
        if (columnHoldsGate(column)) {
          gatesTableRowState.cells[column].name = "empty-cell";
          gatesTableRowState.cells[column].height = window.cellSize;
          gatesTableRowState.cells[column].width = window.cellSize;
        } else {
          gatesTableRowState.cells[column].name = "horizontal-transition-cell";
          gatesTableRowState.cells[column].height = window.cellSize;
          gatesTableRowState.cells[column].width = window.separatorCellSize;
        }
      } else {
        if (columnHoldsGate(column)) {
          gatesTableRowState.cells[column].name = "vertical-transition-cell-rectangle";
          gatesTableRowState.cells[column].height = window.separatorCellSize;
          gatesTableRowState.cells[column].width = window.cellSize;
        } else {
          gatesTableRowState.cells[column].name = "vertical-transition-cell-square";
          gatesTableRowState.cells[column].height = window.separatorCellSize;
          gatesTableRowState.cells[column].width = window.separatorCellSize;
        }
      }
    }
  }
}

/* set cell values for non empty cells */
function setupNonEmptyCells(gatesTableRowState, inputRow, circuitState, timestamp) {
  
  // setup settings for cells holding gates
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      let column = getColumnFromStep(circuitState.steps[i].index);
      if (column > gatesTableRowState.cells.length - 1) break;
      if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {

          // extract qbit values for: targets, controls
          let gate = gates[j];
          let targets = [];
          let controls = [];
          let controlstates = [];
          let aggregatedTargets = [];

          if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
            targets = [...gate.targets]
          }
          if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
            for (let i = 0; i < gate["controls"].length; i++) {
              let controlInfo = gate["controls"][i];
              controls.push(controlInfo["target"]);
              controlstates.push(controlInfo["state"]);
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "gates")){
            for (let k = 0; k < gate["gates"].length; k++) {
              let aggregatedGate = gate["gates"][k];
              targets.push(...aggregatedGate.targets)
            }
          }

          // get range of qbits affected when displaying this gate
          let qbits = [...targets, ...controls, ...aggregatedTargets];

          let qmin = Math.min(...qbits);
          let qmax = Math.max(...qbits);
          let rowMin = getRowFromQbit(qmin);
          let rowMax = getRowFromQbit(qmax);
          let targetMin = Math.min(...targets);
          let targetMax = Math.max(...targets);
          let rowTargetMin = getRowFromQbit(targetMin);
          let rowTargetMax = getRowFromQbit(targetMax);

          // barrier will be displayed for all qubits in the step containing a barrier
          if (gate.name == 'barrier') {
            if (rowHoldsGates(inputRow)) {
              gatesTableRowState.cells[column].name = 'barrier';
            } else {
              gatesTableRowState.cells[column].name = 'barrier-vertical-transition-cell';
            }
            continue;
          }

          // test if this gate impacts current row
          if ((inputRow < rowMin) || (inputRow > rowMax)) {
            continue;
          }

          gatesTableRowState.cells[column].targets = targets;

          // this is the name of the gate
          gatesTableRowState.cells[column].gate = gate.name;

          // name of Vue component used to render this cell. For example for 
          // a controlled gate we have one component used to render target qubit 
          // and another component used to render the controll qubit
          gatesTableRowState.cells[column].name = gate.name;                     

          // image that will be shown inside this cell which is 
          // different from gate name for two target qubit gates or aggregate gate.
          // In the case of pauli root gates when root is 'k', this is used
          // to resolved gate image name based on values for 'k' and 'img'
          gatesTableRowState.cells[column].img = gate.name;

          gatesTableRowState.cells[column].tooltip = "";

          // handling the aggregate gate
          if (Object.prototype.hasOwnProperty.call(gate, "gates")){

            gatesTableRowState.cells[column].gates = [...gate.gates];
            for (let i = 0; i < gate["gates"].length; i++) {

              let embeddedGate = gate["gates"][i];
              if (gatesTableRowState.cells[column].qrow == embeddedGate.targets[0]){

                gatesTableRowState.cells[column].img = embeddedGate.name;
                
                if (Object.prototype.hasOwnProperty.call(embeddedGate, "theta")) {
                  gatesTableRowState.cells[column].theta = parseFloat(embeddedGate.theta);
                  gatesTableRowState.cells[column].tooltip += `θ:${embeddedGate.theta} `;
                }
                if (Object.prototype.hasOwnProperty.call(embeddedGate, "phi")) {
                  gatesTableRowState.cells[column].phi = parseFloat(embeddedGate.phi);
                  gatesTableRowState.cells[column].tooltip += `φ:${embeddedGate.phi} `;
                }
                if (Object.prototype.hasOwnProperty.call(embeddedGate, "lambda")) {
                  gatesTableRowState.cells[column].lambda = parseFloat(embeddedGate.lambda);
                  gatesTableRowState.cells[column].tooltip += `λ:${embeddedGate.lambda} `;
                }
                if (Object.prototype.hasOwnProperty.call(embeddedGate, "root")) {
                  gatesTableRowState.cells[column].root = embeddedGate.root;
                  if (!embeddedGate.root.includes("1/2^")){
                    let root = embeddedGate.root.replace("1/", "");
                    gatesTableRowState.cells[column].tooltip += `t:${root} `;
                  }
                }

                break;
              }
            }
          }

          // all elements in circuit must be updated when switching from colored to blue gates:
          gatesTableRowState.cells[column].key = getUserInterfaceSetting('colored-gates');

          if (gate.name == "sqrt-swap"
              || gate.name == "sqrt-swap-dagger"
              || gate.name == "swap-theta"
              || gate.name == "iswap"
              || gate.name == "fswap"
              || gate.name == "swap-root"
              || gate.name == "swap-root-dagger"
              ){
            if ((inputRow - 1) / 2 == Math.min(...targets)){
              gatesTableRowState.cells[column].tooltip += `${gate.name} `;
            }
          }

          if (Object.prototype.hasOwnProperty.call(gate, "theta")) {
            gatesTableRowState.cells[column].theta = parseFloat(gate.theta);
            if ((!gate.name.includes("swap") &&
                 gate.name != "givens" &&
                 gate.name != "xx" &&
                 gate.name != "yy" &&
                 gate.name != "zz" &&
                 gate.name != "xy" &&
                 gate.name != "xx" &&
                 gate.name != "a" &&
                 !gate.name.includes("cross-resonance")
                ) || ((inputRow - 1) / 2 == Math.min(...targets))){
              gatesTableRowState.cells[column].tooltip += `θ:${gate.theta} `;
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "phi")) {
            gatesTableRowState.cells[column].phi = parseFloat(gate.phi);
            if (gate.name != "a" || ((inputRow - 1) / 2 == Math.min(...targets))){
              gatesTableRowState.cells[column].tooltip += `φ:${gate.phi} `;
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "lambda")) {
            gatesTableRowState.cells[column].lambda = parseFloat(gate.lambda);
            gatesTableRowState.cells[column].tooltip += `λ:${gate.lambda} `;
          }
          if (Object.prototype.hasOwnProperty.call(gate, "root")) {
            gatesTableRowState.cells[column].root = gate.root;
            if ((gate.name != "swap-root" && gate.name != "swap-root-dagger") || ((inputRow - 1) / 2 == Math.min(...targets))){
              if (!gate.root.includes("1/2^")){
                let root = gate.root.replace("1/", "");
                gatesTableRowState.cells[column].tooltip += `t:${root} `;
              }
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "bit")) {
            gatesTableRowState.cells[column].bit = parseFloat(gate.bit);
            gatesTableRowState.cells[column].tooltip += `bit=${gate.bit} `;
          }
          if (Object.prototype.hasOwnProperty.call(gate, "circuit_id")) {
            gatesTableRowState.cells[column].circuit_id = parseInt(gate.circuit_id);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "circuit_abbreviation")) {
            gatesTableRowState.cells[column].circuit_abbreviation = gate.circuit_abbreviation;
          }
          if (Object.prototype.hasOwnProperty.call(gate, "circuit_power")) {
            gatesTableRowState.cells[column].circuit_power = gate.circuit_power;
          }
          if (Object.prototype.hasOwnProperty.call(gate, "targets_expression")) {
            gatesTableRowState.cells[column].targets_expression = gate.targets_expression;
          }

          // if this is not a multiple bit gate we are done
          if (qmin == qmax) {
            continue;
          }

          if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
            gatesTableRowState.cells[column].controls = controls;
            gatesTableRowState.cells[column].controlstates = controlstates;
          }

          let controlstate = null;
          let rowQbit = getQbitFromRow(inputRow);
          if (controls.includes(rowQbit)){
            let controlIndex = controls.indexOf(rowQbit);
            controlstate = controlstates[controlIndex];
            gatesTableRowState.cells[column].control = rowQbit;
            gatesTableRowState.cells[column].controlstate = controlstate;
          }

          let qubitsTakenByGate =  range(targets[0], targets[targets.length - 1]);
          let noQubitsTakenByGate = qubitsTakenByGate.length;

          if (rowMin == inputRow) {
            if (controls.includes(qmin)){
              gatesTableRowState.cells[column].name = getCtrlStubUpName(gate, controlstate);
            } else {
              if (gate.name == "xx"){
                gatesTableRowState.cells[column].img = "x";
              } else if (gate.name == "yy") {
                gatesTableRowState.cells[column].img = "y";
              } else if (gate.name == "zz") {
                gatesTableRowState.cells[column].img = "z";
              } else if (gate.name.includes("swap")) {
                gatesTableRowState.cells[column].img = "swap-up";
              } else if (gate.name == "a") {
                gatesTableRowState.cells[column].img = "_a_";
              } else if (gate.name == "berkeley") {
                gatesTableRowState.cells[column].img = "_b_";
              } else if (gate.name == "berkeley-dagger") {
                gatesTableRowState.cells[column].img = "_b-dagger_";
              } else if (gate.name == "canonical") {
                gatesTableRowState.cells[column].img = "_canonical_";
              } else if (gate.name == "cross-resonance") {
                gatesTableRowState.cells[column].img = "_cross-resonance_";
              } else if (gate.name == "cross-resonance-dagger") {
                gatesTableRowState.cells[column].img = "_cross-resonance-dagger_";
              } else if (gate.name == "givens") {
                gatesTableRowState.cells[column].img = "_givens_";
              } else if (gate.name == "ecp") {
                gatesTableRowState.cells[column].img = "_ecp_";
              } else if (gate.name == "ecp-dagger") {
                gatesTableRowState.cells[column].img = "_ecp-dagger_";
              } else if (gate.name == "magic") {
                gatesTableRowState.cells[column].img = "_magic_";
              } else if (gate.name == "magic-dagger") {
                gatesTableRowState.cells[column].img = "_magic-dagger_";
              } else if (gate.name == "molmer-sorensen") {
                gatesTableRowState.cells[column].img = "_ms_";
              } else if (gate.name == "molmer-sorensen-dagger") {
                gatesTableRowState.cells[column].img = "_ms-dagger_";
              } else if (gate.name == "w") {
                gatesTableRowState.cells[column].img = "_w_";
              }  else if (gate.name == "xy") {
                gatesTableRowState.cells[column].img = "_xy_";
              } else if (gate.name == "qft") {
                if (noQubitsTakenByGate == 1) {
                  gatesTableRowState.cells[column].img = "qft";
                } else if (noQubitsTakenByGate == 2) {
                  gatesTableRowState.cells[column].img = "_qft-up_";
                } else {
                  gatesTableRowState.cells[column].img = "box-up";
                }
              } else if (gate.name == "qft-dagger") {
                if (noQubitsTakenByGate == 1) {
                  gatesTableRowState.cells[column].img = "qft-dagger";
                } else if (noQubitsTakenByGate == 2) {
                  gatesTableRowState.cells[column].img = "_qft-dagger-up_";
                } else {
                  gatesTableRowState.cells[column].img = "box-up";
                }
              } else if (gate.name == "circuit") {
                if (noQubitsTakenByGate == 1) {
                  gatesTableRowState.cells[column].img = "circuit";
                } else if (noQubitsTakenByGate == 2) {
                  gatesTableRowState.cells[column].img = "_circuit-up_";
                } else {
                  gatesTableRowState.cells[column].img = "box-up";
                }
              }
            } 
          } else if (rowMin < inputRow && inputRow < rowMax) {
            if (controls.includes(rowQbit)){
              gatesTableRowState.cells[column].name = getCtrlStubMidName(gate, controlstate);
            } else if (gateCanHaveMultipleTargets(gate.name) && qubitsTakenByGate.includes(rowQbit)) {
              let image = getIntermediateImageForManyTargetsGates(inputRow, rowTargetMin, rowTargetMax, rowQbit, qubitsTakenByGate, gate.name);
              gatesTableRowState.cells[column].img = image;
            } else if (targets.includes(rowQbit)) {
              if (gate.name == "xx"){
                gatesTableRowState.cells[column].img = "x";
              } else if (gate.name == "yy") {
                gatesTableRowState.cells[column].img = "y";
              } else if (gate.name == "zz") {
                gatesTableRowState.cells[column].img = "z";
              } else if (gate.name.includes("swap")) {
                gatesTableRowState.cells[column].img = "swap-mid";
              } else if (gate.name == "a") {
                gatesTableRowState.cells[column].img = "_a_";
              } else if (gate.name == "berkeley") {
                gatesTableRowState.cells[column].img = "_b_";
              } else if (gate.name == "berkeley-dagger") {
                gatesTableRowState.cells[column].img = "_b-dagger_";
              } else if (gate.name == "canonical") {
                gatesTableRowState.cells[column].img = "_canonical_";
              } else if (gate.name == "cross-resonance") {
                gatesTableRowState.cells[column].img = "_cross-resonance_";
              } else if (gate.name == "cross-resonance-dagger") {
                gatesTableRowState.cells[column].img = "_cross-resonance-dagger_";
              } else if (gate.name == "givens") {
                gatesTableRowState.cells[column].img = "_givens_";
              } else if (gate.name == "ecp") {
                gatesTableRowState.cells[column].img = "_ecp_";
              } else if (gate.name == "ecp-dagger") {
                gatesTableRowState.cells[column].img = "_ecp-dagger_";
              } else if (gate.name == "magic") {
                gatesTableRowState.cells[column].img = "_magic_";
              } else if (gate.name == "magic-dagger") {
                gatesTableRowState.cells[column].img = "_magic-dagger_";
              } else if (gate.name == "molmer-sorensen") {
                gatesTableRowState.cells[column].img = "_ms_";
              } else if (gate.name == "molmer-sorensen-dagger") {
                gatesTableRowState.cells[column].img = "_ms-dagger_";
              } else if (gate.name == "w") {
                gatesTableRowState.cells[column].img = "_w_";
              }  else if (gate.name == "xy") {
                gatesTableRowState.cells[column].img = "_xy_";
              }
            } else {
              let thisRowHoldsGates = rowHoldsGates(inputRow);
              if (gate.name.includes("swap")) {
                gatesTableRowState.cells[column].name = getSwapIntermediateLineName(thisRowHoldsGates, targetMin, rowQbit, gate.name);
                if (!thisRowHoldsGates) {
                  // force update swap gates intermediate segments/circles 
                  // which do not get rerendered properly when the one of 
                  // the gate qubits is moved via drag & drop 
                  gatesTableRowState.cells[column].key = timestamp;
                }
              } else if (
                  (gate.name == "qft" || gate.name == "qft-dagger" || gate.name == "circuit") &&
                  (inputRow > rowTargetMin && inputRow < rowTargetMax)
              ) {
                gatesTableRowState.cells[column].name = "box-middle-short";
              } else {
                gatesTableRowState.cells[column].name = getIntermediateLineName(gate.name, thisRowHoldsGates);
              }
            }
          } else if (rowMax == inputRow) {
            if (controls.includes(qmax)){
              gatesTableRowState.cells[column].name = getCtrlStubDownName(gate, controlstate);
            } else {
              if (gate.name == "xx"){
                gatesTableRowState.cells[column].img = "x";
              } else if (gate.name == "yy") {
                gatesTableRowState.cells[column].img = "y";
              } else if (gate.name == "zz") {
                gatesTableRowState.cells[column].img = "z";
              } else if (gate.name.includes("swap")) {
                gatesTableRowState.cells[column].img = "swap-down";
              } else if (gate.name == "a") {
                gatesTableRowState.cells[column].img = "_a_";
              } else if (gate.name == "berkeley") {
                gatesTableRowState.cells[column].img = "_b_";
              } else if (gate.name == "berkeley-dagger") {
                gatesTableRowState.cells[column].img = "_b-dagger_";
              } else if (gate.name == "canonical") {
                gatesTableRowState.cells[column].img = "_canonical_";
              } else if (gate.name == "cross-resonance") {
                gatesTableRowState.cells[column].img = "_cross-resonance_";
              } else if (gate.name == "cross-resonance-dagger") {
                gatesTableRowState.cells[column].img = "_cross-resonance-dagger_";
              } else if (gate.name == "givens") {
                gatesTableRowState.cells[column].img = "_givens_";
              } else if (gate.name == "ecp") {
                gatesTableRowState.cells[column].img = "_ecp_";
              } else if (gate.name == "ecp-dagger") {
                gatesTableRowState.cells[column].img = "_ecp-dagger_";
              } else if (gate.name == "magic") {
                gatesTableRowState.cells[column].img = "_magic_";
              } else if (gate.name == "magic-dagger") {
                gatesTableRowState.cells[column].img = "_magic-dagger_";
              } else if (gate.name == "molmer-sorensen") {
                gatesTableRowState.cells[column].img = "_ms_";
              } else if (gate.name == "molmer-sorensen-dagger") {
                gatesTableRowState.cells[column].img = "_ms-dagger_";
              } else if (gate.name == "w") {
                gatesTableRowState.cells[column].img = "_w_";
              }  else if (gate.name == "xy") {
                gatesTableRowState.cells[column].img = "_xy_";
              } else if (gate.name == "qft") {
                if (noQubitsTakenByGate == 1) {
                  gatesTableRowState.cells[column].img = "qft";
                } else {
                  gatesTableRowState.cells[column].img = "box-down";
                }
              } else if (gate.name == "qft-dagger") {
                if (noQubitsTakenByGate == 1) {
                  gatesTableRowState.cells[column].img = "qft-dagger";
                } else {
                  gatesTableRowState.cells[column].img = "box-down";
                }
              } else if (gate.name == "circuit") {
                if (noQubitsTakenByGate == 1) {
                  gatesTableRowState.cells[column].img = "circuit";
                } else {
                  gatesTableRowState.cells[column].img = "box-down";
                }
              }
            }
          }
        }
      }
    }
  }
}

export default {
  computeGatesTableCells,
  retrieveRowsInGatesTable,
  seatIsTaken,
  seatsAreTaken,
  getProximFreeSeat,
  positionIsFilled,
};
