import Vue from 'vue';

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
    /* the qbit where this active gate is applied */
    this.qbit = null;
    /* 2nd qbit where this active gate is applied (swap gates) */
    this.qbit2 = null;
    /* the step where this active gate is applied */
    this.step = null;
    /* image or component displayed by this cell */
    this.name = null;
    /* tooltip to be dispayed for this gates */
    this.tooltip = null;
    /* name of the gate, possibly different from name in multiple bit gates */
    this.gate = null;
    /* image that will be shown inside this cell which 
    may be different from gate name, ex for controlled qbits */
    this.img = null;
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
    /* control bit for a controlled gate */
    this.control = null;
    /* 2nd control bit for a controlled gate */
    this.control2 = null;
    /* the qbit associated to current row (null in case row does not hold gates) */
    this.qrow = 0;
    /* For controlled gates this indicates the control state defined as +/-1 along Z axis in computational basis.*/
    this.controlstate = null;
    /* For Toffoli gate this indicates the 2nd control state defined as +/-1 along Z axis in computational basis.*/
    this.controlstate2 = null;
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
  let qbits = 0;
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (
        Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")
      ) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (Object.prototype.hasOwnProperty.call(gate, "target")) {
            qbits = Math.max(qbits, parseInt(gate.target));
          }
          if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
            qbits = Math.max(qbits, parseInt(gate.target2));
          }
          if (Object.prototype.hasOwnProperty.call(gate, "control")) {
            qbits = Math.max(qbits, parseInt(gate.control));
          }
          if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
            qbits = Math.max(qbits, parseInt(gate.control2));
          }
        }
      }
    }
  }

  // first qbit has index 0
  return qbits + 1;
}

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
            if (Object.prototype.hasOwnProperty.call(gate, "target")) {
              if (gate.target == qubit) return true;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
              if (gate.target2 == qubit) return true;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control")) {
              if (gate.control == qubit) return true;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
              if (gate.control2 == qubit) return true;
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
// other control gate or between target and target2 qbits for a two qubit gate. 
export function seatIsTaken(circuitState, qbit, step) {
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {

            let gate = gates[j];
            let target = null;
            let target2 = null;
            let control = null;
            let control2 = null;

            if (Object.prototype.hasOwnProperty.call(gate, "target")) {
              target = parseInt(gate.target);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
              target2 = parseInt(gate.target2);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control")) {
              control = parseInt(gate.control);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
              control2 = parseInt(gate.control2);
            }

            // get range of qbits affected when displaying this gate
            let qbits = [target, target2, control, control2].filter(
              (qbit) => qbit != null
            );

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
export function seatsAreTaken(circuitState, reallocatableQbits, proposedQbits, step) {

  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {

            let gate = gates[j];
            let target = null;
            let target2 = null;
            let control = null;
            let control2 = null;

            if (Object.prototype.hasOwnProperty.call(gate, "target")) {
              target = parseInt(gate.target);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
              target2 = parseInt(gate.target2);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control")) {
              control = parseInt(gate.control);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
              control2 = parseInt(gate.control2);
            }
            // get range of qbits affected when displaying this gate
            let qbits = [target, target2, control, control2].filter(
              (qbit) => (qbit != null)
            );
            
            let qmin = Math.min(...qbits);
            let qmax = Math.max(...qbits);
            let qminExisting = reallocatableQbits ? Math.min(...reallocatableQbits) : null;
            let qmaxExisting = reallocatableQbits ? Math.max(...reallocatableQbits) : null;
            let qminProposed = Math.min(...proposedQbits);
            let qmaxProposed = Math.max(...proposedQbits);
            
            for (let q = qminProposed; q <= qmaxProposed; q++) {
              if (reallocatableQbits && (qminExisting <= q) && (q <= qmaxExisting)) {
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

// Detect situations where proposed gates do not allocate
// distinct qubits for target, target2, control and control2
export function proposedNewGatesAreInvalid(dtos) {
  for (let i = 0; i < dtos.length; i++) {

    let qbit = dtos[i]["qbit"];

    if (Object.prototype.hasOwnProperty.call(dtos[i], "control")) {
      let control = dtos[i]["control"];
      if (qbit == control) return true;

      if (Object.prototype.hasOwnProperty.call(dtos[i], "control2")) {
        let control2 = dtos[i]["control2"];
        if (qbit == control2) return true;
        if (control == control2) return true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "qbit2")) {
      let qbit2 = dtos[i]["qbit2"];
      if (qbit == qbit2) return true;

      if (Object.prototype.hasOwnProperty.call(dtos[i], "control")) {
        let control = dtos[i]["control"];
        if (qbit2 == control) return true;
      }
    }
  }
  return false; 
}

// Verify if a set of gates can be placed at these locations. Note that for example a single 
// bit gate cannot be placed between a control and a target qbits belonging to some  
// other control gate or between target and target2 qbits for a two qubit gate. 
export function seatsInArrayAreAlreadyTaken(circuitState, dtos, existingStep, existingQubit) {
  for (let i = 0; i < dtos.length; i++) {

    let qbit = dtos[i]["qbit"];
    let step = dtos[i]["step"];

    if (existingStep == step && existingQubit == qbit) continue;
    if (seatIsTaken(circuitState, qbit, step)) return true;

    if (Object.prototype.hasOwnProperty.call(dtos[i], "control")) {
      let control = dtos[i]["control"];
      if (seatIsTaken(circuitState, control, step)) return true;
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "control2")) {
      let control2 = dtos[i]["control2"];
      if (seatIsTaken(circuitState, control2, step)) return true;
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "qbit2")) {
      let qbit2 = dtos[i]["qbit2"];
      if (seatIsTaken(circuitState, qbit2, step)) return true;
    }
  }
  return false; 
}

// Verify if the some of the new proposed seats overlap
export function proposedNewSeatsOverlap(dtos) {
  for (let i = 0; i < dtos.length; i++) {
    let step = dtos[i]["step"];
    let target = dtos[i]["qbit"];
    let target2 = dtos[i]["qbit2"];
    let control = dtos[i]["control"];
    let control2 = dtos[i]["control2"];
    let qbits = [target, target2, control, control2].filter(
      (qbit) => (qbit != null)
    );

    for (let j = i + 1; j < dtos.length; j++) {
      let step2 = dtos[j]["step"];
      if (step != step2) continue;
      let targetSecond = dtos[j]["qbit"];
      let target2Second = dtos[j]["qbit2"];
      let controlSecond = dtos[j]["control"];
      let control2Second = dtos[j]["control2"];
      let qbitsSecond = [targetSecond, target2Second, controlSecond, control2Second].filter(
        (qbit) => (qbit != null)
      );
      for (let k = 0; k < qbits.length ; k++){
        let qbit = qbits[k];
        if (qbitsSecond.includes(qbit)){
          return true;
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

function getCtrlStubDownName(gate) {
  if (gate.name == "toffoli") {
    if (gate.control2 > gate.control){
      return "ctrl-pauli-stub-down-" + gate.controlstate2.toString(10);
    } else {
      return "ctrl-pauli-stub-down-" + gate.controlstate.toString(10);
    }
  } else if (pauliCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-stub-down-" + gate.controlstate.toString(10);
  } else if (pauliRootCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-down-" + gate.controlstate.toString(10);
  } else if (stCtrlGates.includes(gate.name)) {
    return "ctrl-st-stub-down-" + gate.controlstate.toString(10);
  } else if (rCtrlGates.includes(gate.name)) {
    return "ctrl-r-stub-down-" + gate.controlstate.toString(10);
  } else if (hadamardCtrlGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-down-" + gate.controlstate.toString(10);
  } else if (unitaryCtrlGates.includes(gate.name)) {
    return "ctrl-u-stub-down-" + gate.controlstate.toString(10);
  } else if (gate.name == "fredkin") {
    return "ctrl-swap-stub-down-" + gate.controlstate.toString(10);
  }
}

function getCtrlStubUpName(gate) {
  if (gate.name == "toffoli") {
    if (gate.control < gate.control2){
      return "ctrl-pauli-stub-up-" + gate.controlstate.toString(10);
    } else {
      return "ctrl-pauli-stub-up-" + gate.controlstate2.toString(10);
    }
  } else if (pauliCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-stub-up-" + gate.controlstate.toString(10);
  } else if (pauliRootCtrlGates.includes(gate.name)) {
    return "ctrl-pauli-root-stub-up-" + gate.controlstate.toString(10);
  } else if (stCtrlGates.includes(gate.name)) {
    return "ctrl-st-stub-up-" + gate.controlstate.toString(10);
  } else if (rCtrlGates.includes(gate.name)) {
    return "ctrl-r-stub-up-" + gate.controlstate.toString(10);
  } else if (hadamardCtrlGates.includes(gate.name)) {
    return "ctrl-hadamard-stub-up-" + gate.controlstate.toString(10);
  } else if (unitaryCtrlGates.includes(gate.name)) {
    return "ctrl-u-stub-up-" + gate.controlstate.toString(10);
  } else if (gate.name == "fredkin") {
    return "ctrl-swap-stub-up-" + gate.controlstate.toString(10);
  }
}

function getIntermediateLineName(gateName, thisRowHoldsGates) {
  if (isingGates.includes(gateName)) {
    if (thisRowHoldsGates) {
      return "ising-line-long";
    } else {
      return "ising-line-short";
    }
  } else if (gateName == "toffoli") {
    if (thisRowHoldsGates) {
      return "toffoli-line-long";
    } else {
      return "pauli-line-short";
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
  } else if (gateName == "fredkin") {
    if (thisRowHoldsGates) {
      return "fredkin-line-long";
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
      gatesTableRowState.cells[column].qbit = getQbitFromRow(inputRow);
    if (columnHoldsGate(column))
      gatesTableRowState.cells[column].step = gateStepFromColumn(column);

    if (rowHoldsGates(inputRow) && columnHoldsGate(column)) {
      gatesTableRowState.cells[column].id = gatesTableRowState.cells[column].qbit + "_" + gatesTableRowState.cells[column].step;
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

          // extract qbit values for: target, control, target2, control2
          let gate = gates[j];
          let target = null;
          let target2 = null;
          let control = null;
          let control2 = null;

          if (Object.prototype.hasOwnProperty.call(gate, "target")) {
            target = parseInt(gate.target);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
            target2 = parseInt(gate.target2);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "control")) {
            control = parseInt(gate.control);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
            control2 = parseInt(gate.control2);
          }

          // get range of qbits affected when displaying this gate
          let qbits = [target, target2, control, control2].filter(
            (qbit) => qbit != null
          );

          let qmin = Math.min(...qbits);
          let qmax = Math.max(...qbits);
          let rowMin = getRowFromQbit(Math.min(...qbits));
          let rowMax = getRowFromQbit(Math.max(...qbits));

          // test if this gate impacts current row
          if (!((rowMin <= inputRow) && (inputRow <= rowMax))) {
            continue;
          }
          
          let rowControl = null;
          let rowControl2 = null;
          let rowTarget = null;
          let rowTarget2 = null;

          if (target !== null) {
            gatesTableRowState.cells[column].qbit = target;
            rowTarget = getRowFromQbit(target);
          }
          if (target2 !== null) {
            gatesTableRowState.cells[column].qbit2 = target2;
            rowTarget2 = getRowFromQbit(target2);
          }
          if (control != null) {
            gatesTableRowState.cells[column].control = control;
            rowControl = getRowFromQbit(control);
          }
          if (control2 != null) {
            gatesTableRowState.cells[column].control2 = control2;
            rowControl2 = getRowFromQbit(control2);
          }

          // update cell properties
          gatesTableRowState.cells[column].name = gate.name;
          gatesTableRowState.cells[column].gate = gate.name;
          // all elements in circuit must be updated when 
          // switching from colored to blue gates:
          gatesTableRowState.cells[column].key = Vue.$cookies.get('colored-gates');
          gatesTableRowState.cells[column].tooltip = "";
          if (gate.name == "sqrt-swap" || gate.name == "swap-phi" || gate.name == "iswap"){
            if ((inputRow - 1) / 2 == Math.min(target, target2)){
              gatesTableRowState.cells[column].tooltip += `${gate.name} ` 
            }
          }
          gatesTableRowState.cells[column].img = gate.name.replace("ctrl-", "");
          if (gate.name == "toffoli") gatesTableRowState.cells[column].img = "pauli-x";

          if (Object.prototype.hasOwnProperty.call(gate, "controlstate")) {
            gatesTableRowState.cells[column].controlstate = parseInt(gate.controlstate);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "controlstate2")) {
            gatesTableRowState.cells[column].controlstate2 = parseInt(gate.controlstate2);
          }
          if (Object.prototype.hasOwnProperty.call(gate, "theta")) {
            gatesTableRowState.cells[column].theta = parseFloat(gate.theta);
            gatesTableRowState.cells[column].tooltip += `θ:${gate.theta} `
          }
          if (Object.prototype.hasOwnProperty.call(gate, "phi")) {
            if (gate.name != "swap-phi" || ((inputRow - 1) / 2 == Math.min(target, target2))){
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

          if (rowHoldsGates(inputRow)) {
            gatesTableRowState.cells[column].qrow = getQbitFromRow(inputRow);
          }

          if (rowMin == inputRow) {
            if (isingGates.includes(gate.name)) {
              gatesTableRowState.cells[column].name = gate.name;
              if (gate.name == "xx"){
                gatesTableRowState.cells[column].img = "x";
              } else if (gate.name == "yy") {
                gatesTableRowState.cells[column].img = "y";
              } else if (gate.name == "zz") {
                gatesTableRowState.cells[column].img = "z";
              }       
            } else if (gate.name.includes("swap")) {
              gatesTableRowState.cells[column].name = gate.name;
              gatesTableRowState.cells[column].img = "swap-up";
            } else {
              if (control == qmin || control2 == qmin) {
                gatesTableRowState.cells[column].name = getCtrlStubUpName(gate);
              } else if ((gate.name == "fredkin") && (target == qmin || target2 == qmin)) {
                gatesTableRowState.cells[column].name = gate.name;
                gatesTableRowState.cells[column].img = "swap-up";
              }
            }
          } else if (rowMin < inputRow && inputRow < rowMax) {
            let thisRowHoldsGates = rowHoldsGates(inputRow);
            if (gate.name.includes("swap")) {
              let qrow = getQbitFromRow(inputRow);
              gatesTableRowState.cells[column].name = getSwapIntermediateLineName(thisRowHoldsGates, qmin, qrow, gate.name);
              if (!thisRowHoldsGates) {
                // force update swap gates intermediate segments/circles 
                // which do not get rerendered properly when the one of 
                // the gate qubits is moved via drag & drop 
                gatesTableRowState.cells[column].key = timestamp;
              }
            } else if (gate.name == "toffoli") {
              if ((rowControl == inputRow) || (rowControl2 == inputRow)) {
                if (gate.control < gate.target && gate.control2 < gate.target){
                  if (gate.control < gate.control2){
                    gatesTableRowState.cells[column].name = "toffoli-2nd-control-" + gate.controlstate2;
                  } else {
                    gatesTableRowState.cells[column].name = "toffoli-2nd-control-" + gate.controlstate;
                  }
                } else {
                  if (gate.control2 < gate.control){
                    gatesTableRowState.cells[column].name = "toffoli-2nd-control-" + gate.controlstate2;
                  } else {
                    gatesTableRowState.cells[column].name = "toffoli-2nd-control-" + gate.controlstate;
                  }
                }
              } else if (rowTarget != inputRow) {
                gatesTableRowState.cells[column].name = getIntermediateLineName(gate.name, thisRowHoldsGates);
              }
            } else if (gate.name == "fredkin") {
              if ((rowTarget == inputRow) || (rowTarget2 == inputRow)) {
                gatesTableRowState.cells[column].name = gate.name;
                gatesTableRowState.cells[column].img = 'fredkin-target-middle';
              } else if (rowControl == inputRow) {
                gatesTableRowState.cells[column].name = 'fredkin-control-middle';
              } else {
                gatesTableRowState.cells[column].name = getIntermediateLineName(gate.name, thisRowHoldsGates);
              }
            } else {
              gatesTableRowState.cells[column].name = getIntermediateLineName(gate.name, thisRowHoldsGates);
            }
          } else if (rowMax == inputRow) {
            if (isingGates.includes(gate.name)) {
              gatesTableRowState.cells[column].name = gate.name;
              if (gate.name == "xx") {
                gatesTableRowState.cells[column].img = "x";
              } else if (gate.name == "yy") {
                gatesTableRowState.cells[column].img = "y";
              } else if (gate.name == "zz") {
                gatesTableRowState.cells[column].img = "z";
              }  
            } else if (gate.name.includes("swap")) {
              gatesTableRowState.cells[column].name = gate.name;
              gatesTableRowState.cells[column].img = "swap-down";
            } else {
              if (control == qmax || control2 == qmax) {
                gatesTableRowState.cells[column].name = getCtrlStubDownName(gate);
              } else if ((gate.name == "fredkin") && (target == qmax || target2 == qmax)) {
                gatesTableRowState.cells[column].name = gate.name;
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
