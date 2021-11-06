import { getUserInterfaceSetting } from "./applicationWideReusableUnits.js";

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
    /* control qbit for a controlled gate control stub Vue component */
    this.control = null;
     /* controlstate for a controlled gate control stub Vue component */
    this.controlstate = null;
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
            for (let i = 0; i < gate["controls"].length; i++) {
              let controlInfo = gate["controls"][i];
              let target = controlInfo["target"];
              maxQbitIndex = Math.max(maxQbitIndex, target);
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
export function measureGatesArePositionedLast(circuitState){
  let measureGates = [];
  for (let i = 0; i < circuitState.steps.length; i++) {
    let gates = circuitState.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name.includes("measure-")){
        measureGates.push(gate.target);
      } else {
        if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
          let targets = gate.targets;
          for (let j = 0; j < targets.length; j++){
            if (measureGates.includes(targets[j])) {
              return false;
            }
          }
        }
        if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
          for (let i = 0; i < gate["controls"].length; i++) {
            let controlInfo = gate["controls"][i];
            let target = controlInfo["target"];
            if (measureGates.includes(target)) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}

//TODO: this might not be neeeded anymore
export function getProximFreeSeat(circuitState, qbit, step) {
  if (!seatIsTaken(circuitState, qbit + 1, step)) {
    return qbit + 1;
  } else if (!seatIsTaken(circuitState, qbit - 1, step)) {
    return qbit - 1;
  }
  return null;
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
              for (let j = 0; j < targets.length; j++){
                if (targets[j] == qubit) return true;
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              for (let i = 0; i < gate["controls"].length; i++) {
                let controlInfo = gate["controls"][i];
                let target = controlInfo["target"];
                if (target == qubit) return true;
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

            // get range of qbits affected when displaying this gate
            let qbits = [...targets, ...controls];

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
            // get range of qbits affected when displaying this gate
            let qbits = [...targets, ...controls];
            
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

    let qbits = dtos[i]["targets"];
    let step = dtos[i]["step"];

    for (let j = 0; j < qbits.length; j++){
      let qbit = qbits[j];
      if (ignoreStep == step && ignoreQubits.includes(qbit)) continue;
      if (seatIsTaken(circuitState, qbit, step)) return true;
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "controls")) {
      let controls = dtos[i]["controls"];
      for (let j = 0; j < controls.length; j++){
        let control = controls[j];
        if (seatIsTaken(circuitState, control, step)) return true;
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
  let rows = 2 * Math.floor((availableHeight - 70) / (window.cellSize + window.separatorCellSize));
  return rows;
}

export function getNumberOfColumnsThatFit() {
  let availableWidth = window.innerWidth;
  let columns = 2 * Math.floor((availableWidth - 280) / (window.cellSize + window.separatorCellSize));
  return columns;
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
  window.gatesTable.columns = Math.max(2 * steps + 2, window.gatesTable.columns + 2);
  
  return window.gatesTable.rows;
}

/******************************************************************
 * Utility functions for rendering stubs for controlled gates and  
 * intermediate connecting lines between the gates and those stubs.
 * Also used for rendering swap gates.
 ******************************************************************/

var pauliCtrlGates = ["ctrl-pauli-x", "ctrl-pauli-y", "ctrl-pauli-z"];
var pauliRootCtrlGates = ["ctrl-pauli-x-root", "ctrl-pauli-y-root", "ctrl-pauli-z-root", "ctrl-pauli-x-root-dagger", "ctrl-pauli-y-root-dagger", "ctrl-pauli-z-root-dagger"];
var stCtrlGates = ["ctrl-t", "ctrl-t-dagger", "ctrl-s", "ctrl-s-dagger"];
var rCtrlGates = ["ctrl-rx-theta", "ctrl-ry-theta", "ctrl-rz-theta"];
var hadamardCtrlGates = ["ctrl-hadamard"];
var unitaryCtrlGates = ["ctrl-u1", "ctrl-u2", "ctrl-u3"];
var isingGates = ["xx", "yy", "zz"];
var isingCtrlGates = ["ctrl-xx", "ctrl-yy", "ctrl-zz"];
var swapCtrlGates = ["ctrl-swap", "ctrl-sqrt-swap", "ctrl-swap-phi", "ctrl-iswap" ];

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
  if (pauliCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-stub-down-" + controlstate;
  } else if (pauliRootCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-down-" + controlstate;
  } else if (stCtrlGates.includes(gate.name)) {
    return "ctrl-st-stub-down-" + controlstate;
  } else if (rCtrlGates.includes(gate.name)) {
    return "ctrl-r-theta-stub-down-" + controlstate;
  } else if (hadamardCtrlGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-down-" + controlstate;
  } else if (unitaryCtrlGates.includes(gate.name)) {
    return "ctrl-u-stub-down-" + controlstate;
  } else if (swapCtrlGates.includes(gate.name)) {
    return "ctrl-swap-stub-down-" + controlstate;
  } else if (isingCtrlGates.includes(gate.name)) {
    return "ctrl-ising-down-up-" + controlstate;
  }
}

function getCtrlStubUpName(gate, controlstate) {
  if (pauliCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-stub-up-" + controlstate;
  } else if (pauliRootCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-up-" + controlstate;
  } else if (stCtrlGates.includes(gate.name)) {
    return "ctrl-st-stub-up-" + controlstate;
  } else if (rCtrlGates.includes(gate.name)) {
    return "ctrl-r-theta-stub-up-" + controlstate;
  } else if (hadamardCtrlGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-up-" + controlstate;
  } else if (unitaryCtrlGates.includes(gate.name)) {
    return "ctrl-u-stub-up-" + controlstate;
  } else if (swapCtrlGates.includes(gate.name)) {
    return "ctrl-swap-stub-up-" + controlstate;
  } else if (isingCtrlGates.includes(gate.name)) {
    return "ctrl-ising-stub-up-" + controlstate;
  }
}

function getCtrlStubMidName(gate, controlstate) {
  if (pauliCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-stub-mid-" + controlstate;
  } else if (pauliRootCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-mid-" + controlstate;
  } else if (stCtrlGates.includes(gate.name)) {
    return "ctrl-st-stub-mid-" + controlstate;
  } else if (rCtrlGates.includes(gate.name)) {
    return "ctrl-r-theta-stub-mid-" + controlstate;
  } else if (hadamardCtrlGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-mid-" + controlstate;
  } else if (unitaryCtrlGates.includes(gate.name)) {
    return "ctrl-u-stub-mid-" + controlstate;
  } else if (swapCtrlGates.includes(gate.name)) {
    return "ctrl-swap-stub-mid-" + controlstate;
  } else if (isingCtrlGates.includes(gate.name)) {
    return "ctrl-ising-stub-mid-" + controlstate;
  }
}

function getIntermediateLineName(gateName, thisRowHoldsGates) {
  if (isingGates.includes(gateName) || isingCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "ising-line-long";
    } else {
      return "ising-line-short";
    }
  } else if (pauliCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "pauli-line-long";
    } else {
      return "pauli-line-short";
    }
  } else if (pauliRootCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "pauli-root-line-long";
    } else {
      return "pauli-root-line-short";
    }
  } else if (stCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "st-line-long";
    } else {
      return "st-line-short";
    }
  } else if (rCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "r-line-long";
    } else {
      return "r-line-short";
    }
  } else if (hadamardCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "hadamard-line-long";
    } else {
      return "hadamard-line-short";
    }
  } else if (unitaryCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "u-line-long";
    } else {
      return "u-line-short";
    }
  } else if (swapCtrlGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "swap-line-long";
    } else {
      return "swap-line-short";
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
      if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {

          // extract qbit values for: targets, controls
          let gate = gates[j];
          let targets = [];
          let controls = [];
          let controlstates = [];

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

          // get range of qbits affected when displaying this gate
          let qbits = [...targets, ...controls];

          let qmin = Math.min(...qbits);
          let qmax = Math.max(...qbits);
          let rowMin = getRowFromQbit(qmin);
          let rowMax = getRowFromQbit(qmax);

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

          // image that will be shown inside this cell which is different
          // from gate name for controlled gates or two target qubit gates.
          // In the case of pauli root gates when root is 'k', this is used
          // to resolved gate image name based on values for 'k' and 'img'
          gatesTableRowState.cells[column].img = gate.name.replace("ctrl-", ""); 

          // all elements in circuit must be updated when switching from colored to blue gates:
          gatesTableRowState.cells[column].key = getUserInterfaceSetting('colored-gates');

          gatesTableRowState.cells[column].tooltip = "";
          if (gate.name == "sqrt-swap"
              || gate.name == "swap-phi"
              || gate.name == "iswap"
              || gate.name == "ctrl-sqrt-swap"
              || gate.name == "ctrl-swap-phi"
              || gate.name == "ctrl-iswap"){
            if ((inputRow - 1) / 2 == Math.min(...targets)){
              gatesTableRowState.cells[column].tooltip += `${gate.name} ` 
            }
          }

          if (Object.prototype.hasOwnProperty.call(gate, "theta")) {
            gatesTableRowState.cells[column].theta = parseFloat(gate.theta);
            gatesTableRowState.cells[column].tooltip += `θ:${gate.theta} `
          }
          if (Object.prototype.hasOwnProperty.call(gate, "phi")) {
            if (gate.name != "swap-phi" || ((inputRow - 1) / 2 == Math.min(...targets))){
              gatesTableRowState.cells[column].phi = parseFloat(gate.phi);
              gatesTableRowState.cells[column].tooltip += `φ:${gate.phi} `
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "lambda")) {
            gatesTableRowState.cells[column].lambda = parseFloat(gate.lambda);
            gatesTableRowState.cells[column].tooltip += `λ:${gate.lambda} `
          }
          if (Object.prototype.hasOwnProperty.call(gate, "root")) {
            gatesTableRowState.cells[column].root = gate.root;
            if (!gate.root.includes("1/2^")){
              let root = gate.root.replace("1/", "");
              gatesTableRowState.cells[column].tooltip += `t:${root} `
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "bit")) {
            gatesTableRowState.cells[column].bit = parseFloat(gate.bit);
            gatesTableRowState.cells[column].tooltip += `bit=${gate.bit} `
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

          if (rowMin == inputRow) {
            if (controls.includes(qmin)){
              gatesTableRowState.cells[column].name = getCtrlStubUpName(gate, controlstate);
            } else {
              if (isingGates.includes(gate.name)){
                if (gate.name == "xx"){
                  gatesTableRowState.cells[column].img = "x";
                } else if (gate.name == "yy") {
                  gatesTableRowState.cells[column].img = "y";
                } else if (gate.name == "zz") {
                  gatesTableRowState.cells[column].img = "z";
                }
              } else if (gate.name.includes("swap")) {
                gatesTableRowState.cells[column].img = "swap-up";
              }
            }
          } else if (rowMin < inputRow && inputRow < rowMax) {
            if (controls.includes(rowQbit)){
              gatesTableRowState.cells[column].name = getCtrlStubMidName(gate, controlstate);
            } else {
              let thisRowHoldsGates = rowHoldsGates(inputRow);
              if (!thisRowHoldsGates || !gate.targets.includes(rowQbit))
              {
                if (gate.name.includes("swap")) {
                  gatesTableRowState.cells[column].name = getSwapIntermediateLineName(thisRowHoldsGates, qmin, rowQbit, gate.name);
                  if (!thisRowHoldsGates) {
                    // force update swap gates intermediate segments/circles 
                    // which do not get rerendered properly when the one of 
                    // the gate qubits is moved via drag & drop 
                    gatesTableRowState.cells[column].key = timestamp;
                  }
                } else {
                  gatesTableRowState.cells[column].name = getIntermediateLineName(gate.name, thisRowHoldsGates);
                }
              }
            }
          } else if (rowMax == inputRow) {
            if (controls.includes(qmax)){
              gatesTableRowState.cells[column].name = getCtrlStubDownName(gate, controlstate);
            } else {
              if (isingGates.includes(gate.name)){
                if (gate.name == "xx"){
                  gatesTableRowState.cells[column].img = "x";
                } else if (gate.name == "yy") {
                  gatesTableRowState.cells[column].img = "y";
                } else if (gate.name == "zz") {
                  gatesTableRowState.cells[column].img = "z";
                }
              } else if (gate.name.includes("swap")) {
                gatesTableRowState.cells[column].img = "swap-down";
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
