import {
  computeGatesTableCells,
  getNoQbits,
  retrieveRowsInGatesTable,
  seatsAreTaken,
  seatsInArrayAreAlreadyTaken,
  positionIsFilled,
} from "./gatesTable.js";

import {
  computeMaximumQubitIndex,
  getAggregatedGatesTargets,
  getAggregatedGatesNewTargets,
  getMultipleTargets,
  insertingOneGateInCircuit,
  insertingOneQbit,
  interpolateJavaScriptExpression,
  isDefined,
  removingGateFromCircuit,
  removingBarrierFromCircuit,
  proposedNewGatesAreInvalid,
  proposedNewSeatsOverlap,
  stepContainsGates,
  updateGatesAbbreviation,
} from "./editorHelper.js";

import {
  retrieve_project_circuits,
} from "./circuitSaveAndRetrieve.js";

import { 
  arraysAreEqual,
  zipArrays,
  getUniqueValues,
  range
} from "./javaScriptUtils.js";

import {
  create, 
  all
} from 'mathjs'

import Vue from 'vue';

// reduce the security risk by not allwing to evaluate arbitrary js
// expressions: https://mathjs.org/docs/expressions/security.html
const math = create(all);
const limitedEvaluate = math.evaluate;
math.import({
  'import':     function () { throw new Error('Function import is disabled') },
  'createUnit': function () { throw new Error('Function createUnit is disabled') },
  'evaluate':   function () { throw new Error('Function evaluate is disabled') },
  'parse':      function () { throw new Error('Function parse is disabled') },
  'simplify':   function () { throw new Error('Function simplify is disabled') },
  'derivative': function () { throw new Error('Function derivative is disabled') }
}, { override: true })

export const circuitEditorModule = {
  namespaced: true,

  state: JSON.parse('{\
    "0": {"version": "1.2", "circuit_type": "simple", "circuit_id": "0", "circuit_name": "Blank", "circuit_abbreviation": "", "project_id": "0", "project_name": "Blank", "steps": []}\
  }'),

  getters: {
    getGatesTableCells: () => {
      return (row) => {
        return computeGatesTableCells(
          circuitEditorModule.state[window.currentCircuitId],
          row,
        );
      };
    },
    getRowsInGatesTable: () => {
      return retrieveRowsInGatesTable(circuitEditorModule.state[window.currentCircuitId]);
    },
    getMaximumStepIndex: (state) => (circuitId) => {
      let maxStep = 0;
      let circuitState = state[circuitId];
      if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
        for (let i = 0; i < circuitState.steps.length; i++) {
          maxStep = Math.max(maxStep, circuitState.steps[i].index);
        } 
      }
      return maxStep;
    },
    getMaximumQbitIndex: (state) => (circuitId) => {
      return computeMaximumQubitIndex(state, circuitId);
    }
  },

  actions: {
    asynchronouslyLoadProject: function () {
      retrieve_project_circuits().then(
        result => this.commit('circuitEditorModule/loadProject', result),
        error => alert(error)
      );
    },
    updateCircuitNameAndAbbreviationInCircuits: function (context, args) {
      this.commit("circuitEditorModule/updateCircuitNameAndAbbreviation", args);
    },
    // need a way to force circuit redraw, perhaps there is a better way
    refreshCircuit: function () {
      let availableQubits = window.gatesTable.rows / 2 - 1;
      let availableSteps = window.gatesTable.columns / 2 - 1;
      for (let s = 0; s < availableSteps; s++){
        for (let q = 0; q < availableQubits; q++){
          if (!positionIsFilled(circuitEditorModule.state[window.currentCircuitId], s, q)){
            let dto = {"step":s, "targets": [q], "name": "identity"};
            this.commit("circuitEditorModule/insertGateNoTrack", dto);
            this.commit("circuitEditorModule/removeGateNoTrack", dto);
            return;
          }
        }
      }
    },
    updateCircuit: function (context, jsonObj) {
      this.commit("circuitEditorModule/updateCircuitState", jsonObj);
    },
    emptyCircuit: function () {
      this.commit("circuitEditorModule/resetCircuitState");
    },
    insertQbitInCircuit: function (context, qbit) {
      this.commit("circuitEditorModule/insertQbit", qbit);
    },
    insertQubitInCircuitFromWorkerThread: function (context, payload) {
      this.commit("circuitEditorModule/insertQubitFromWorkerThread", payload);
    },
    insertStepInCircuit: function (context, step) {
      this.commit("circuitEditorModule/insertStep", step);
    },
    switchGateInCircuit: function (context, dto) {
      this.commit("circuitEditorModule/switchGate", dto);
    },
    insertGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let elementaryGates = ["identity"];
        let singleQbitGates = ["hadamard", "hadamard-xy", "hadamard-yz", "hadamard-zx", "identity", "pauli-x", "pauli-y", "pauli-z", "sqrt-not", "t", "t-dagger", "s", "s-dagger", "v", "v-dagger", "h", "h-dagger", "c", "c-dagger"];
        let pauliRootGates = ["pauli-x-root", "pauli-y-root", "pauli-z-root", "pauli-x-root-dagger", "pauli-y-root-dagger", "pauli-z-root-dagger"]
        let parametricSingleQbitGates = ["p", "rx-theta", "ry-theta", "rz-theta"];
        let unitarySingleQbitGates = ["u1"];
        let unitaryTwoParamGates = ["u2"];
        let unitaryThreeParamGates = ["u3"]
        let measureGates = ["measure-x", "measure-y", "measure-z"];
        let aggregateGates = ["aggregate"];
        let twoTargetGates = ["swap", "sqrt-swap", "sqrt-swap-dagger", "iswap", "fswap", "magic", "magic-dagger", "molmer-sorensen", "molmer-sorensen-dagger", "berkeley", "berkeley-dagger", "ecp", "ecp-dagger", "w"];
        let twoTargetRootGates = ["swap-root", "swap-root-dagger"];
        let parametricTwoTargetGates = ["givens", "swap-theta", "xx", "yy", "zz", "xy", "cross-resonance", "cross-resonance-dagger"];
        let biParametricTwoTargetGates = ["a"];
        let canonicalGates = ["canonical"];
        let qftGates = ["qft", "qft-dagger"];

        let name = dataTransferObj["name"];
        let step = dataTransferObj["step"];
        
        let targets = [];
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "targets")) {
          targets = [...dataTransferObj["targets"]].sort((a, b) => (a - b));
        }

        let controls = [];
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controls")) {
          controls = [...dataTransferObj["controls"]];
        } 

        let controlstates = []
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controlstates")) {
          controlstates = [...dataTransferObj["controlstates"]];
        } 

        // order controls and controlstates by qubit index
        let controlSettings = zipArrays(controls, controlstates).sort((a, b) => (a[0] > b[0]) ? 1 : -1);
        for (let i = 0; i < controls.length; i++){
          controls[i] = controlSettings[i][0];
          controlstates[i] = controlSettings[i][1];
        }

        let gates = []
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "gates")) {
          gates = [...dataTransferObj["gates"]];
          gates.sort((l, r) => (Math.min(...l.targets) - Math.min(...r.targets)));
          if (gates.length > 0) {
            targets = [];
          }
        }
            
        if (step < 0 || targets.some((element) => element < 0) || controls.some((element) => element < 0)) {
          alert("Negative steps/qubits not permitted!");
        } else if (seatsAreTaken(circuitEditorModule.state[window.currentCircuitId], targets, step)) {
          alert("A gate already exists at this location!");
        } else {
          let dto = {};
          if (elementaryGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name };
          } else if (singleQbitGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name };
          } else if (parametricSingleQbitGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0 };
          } else if (pauliRootGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "root": "1/1" };
          } else if (unitarySingleQbitGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "lambda": 0 };
          } else if (unitaryTwoParamGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "phi": 0, "lambda": 0 };
          } else if (unitaryThreeParamGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "phi": 0, "lambda": 0 };
          } else if (qftGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name };
          } else if (aggregateGates.includes(name) && controls.length == 0 && targets.length == 0) {
            dto = { "step": step, "name": name, "gates": gates };
          } else if (aggregateGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name };
          } else if (measureGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "bit": targets[0] };
          } else if (singleQbitGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (pauliRootGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates, "root": "1/1" };
          } else if (parametricSingleQbitGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "controls": controls, "controlstates": controlstates };
          } else if (unitarySingleQbitGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "lambda": 0, "controls": controls, "controlstates": controlstates };
          } else if (unitaryTwoParamGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "phi": 0, "lambda": 0, "controls": controls, "controlstates": controlstates };
          } else if (unitaryThreeParamGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "phi": 0, "lambda": 0, "controls": controls, "controlstates": controlstates };
          } else if (qftGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (aggregateGates.includes(name) && targets.length == 0) {
            dto = { "step": step, "name": name, "gates": gates, "controls": controls, "controlstates": controlstates };
          } else if (aggregateGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (twoTargetGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, };
          } else if (twoTargetRootGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "root": "1/1", };
          } else if (parametricTwoTargetGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, };
          } else if (biParametricTwoTargetGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "phi": 0 };
          } else if (canonicalGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "tx": 0, "ty": 0, "tz": 0 };
          } else if (twoTargetGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (twoTargetRootGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "root": "1/1", "controls": controls, "controlstates": controlstates };
          } else if (parametricTwoTargetGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "controls": controls, "controlstates": controlstates };
          } else if (biParametricTwoTargetGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "phi": 0, "controls": controls, "controlstates": controlstates };
          } else if (canonicalGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "tx": 0, "ty": 0, "tz": 0, "controls": controls, "controlstates": controlstates };
          } else if (name == "circuit") {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (name == "barrier") {
            dto = { "step": step, "name": name };
          } else {
            console.log("This (new?) gate is not handled in code. Gate name: " + name);
            return;
          }
          
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phi")) {
            let phi = dataTransferObj["phi"];
            dto["phi"] = phi;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "theta")) {
            let theta = dataTransferObj["theta"];
            dto["theta"] = theta;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "lambda")) {
            let lambda = dataTransferObj["lambda"];
            dto["lambda"] = lambda;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "root")) {
            let root = dataTransferObj["root"];
            dto["root"] = root;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "bit")) {
            let bit = dataTransferObj["bit"];
            dto["bit"] = bit;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "circuit_id")) {
            let circuitId = dataTransferObj["circuit_id"];
            dto["circuit_id"] = circuitId;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "circuit_abbreviation")) {
            let circuitAbbreviation = dataTransferObj["circuit_abbreviation"];
            dto["circuit_abbreviation"] = circuitAbbreviation;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "circuit_power")) {
            let circuitPower = dataTransferObj["circuit_power"];
            dto["circuit_power"] = circuitPower;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "targets_expression")) {
            let targetsExpression = dataTransferObj["targets_expression"];
            dto["targets_expression"] = targetsExpression;
          }

          this.commit("circuitEditorModule/insertGate", dto);

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    insertGatesInCircuit(context, dto) {
      this.commit("circuitEditorModule/insertGates", dto);
    },
    insertGateInCircuitFromWorkerThread(context, dto) {
      this.commit("circuitEditorModule/insertGateFromWorkerThread", dto);
    },
    removeGatesFromCircuit(context, dto) {
      this.commit("circuitEditorModule/removeGates", dto);
    },
    removeGateFromCircuitFromWorkerThread(context, payload) {
      this.commit("circuitEditorModule/removeGateFromWorkerThread", payload);
    },
    replicateGate: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let name = dataTransferObj["name"];
        let targets = dataTransferObj["targets"];
        let controls = dataTransferObj["controls"] ? dataTransferObj["controls"] : [];
        let stepFirst = dataTransferObj["stepFirst"];
        let stepLast = dataTransferObj["stepLast"];
        let stepConditionExpression = dataTransferObj["stepConditionExpression"];
        let qbitFirst = dataTransferObj["qbitFirst"];
        let qbitLast = dataTransferObj["qbitLast"];
        let qbitConditionExpression = dataTransferObj["qbitConditionExpression"];
        let conjugateConditionExpression = dataTransferObj["conjugateConditionExpression"];

        // make sure min/max steps and qubits are ordered
        stepFirst = Math.min(stepFirst, stepLast);
        stepLast = Math.max(stepFirst, stepLast);
        qbitFirst = Math.min(qbitFirst, qbitLast);
        qbitLast = Math.max(qbitFirst, qbitLast);
        
        let dtos = [];
        for (let s = stepFirst; s <= stepLast; s++) {
          for (let q = qbitFirst; q <= qbitLast; q++) {

            let condStep = interpolateJavaScriptExpression(stepConditionExpression, s, q);
            let condQbit = interpolateJavaScriptExpression(qbitConditionExpression, s, q);
            let condConjugate = interpolateJavaScriptExpression(conjugateConditionExpression, s, q);

            try {
              limitedEvaluate(condStep)
            } catch {
              alert("The 's' based conditon is not a valid javascript expression!");
              reject(false);
              return;
            }

            try {
              limitedEvaluate(condQbit)
            } catch {
              alert("The 'q' based conditon is not a valid javascript expression!");
              reject(false);
              return;
            }
            try {
              limitedEvaluate(condConjugate)
            } catch {
              alert("The 'q' and 's' conjugate condition is not a valid javascript expression!");
              reject(false);
              return;
            }

            try {
              if (limitedEvaluate(condStep) && 
                  limitedEvaluate(condQbit) && 
                  limitedEvaluate(condConjugate)){
                
                let dto = { "step": s, "targets": [q], "name": name };

                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "qbit2Expression")) {
                  let qbit2Expression = dataTransferObj["qbit2Expression"];
                  try {
                    dto["targets"].push(limitedEvaluate(interpolateJavaScriptExpression(qbit2Expression, s, q)));
                  } catch {
                    throw new Error("The second qubit expression is not a valid javascript expression!");
                  }
                }

                if (name == "circuit") {
                  let circuit_id = dataTransferObj["circuit_id"];
                  let circuitState = circuitEditorModule.state[circuit_id];
                  let noQubits = getNoQbits(circuitState);
                  dto["targets"] = getMultipleTargets(q, noQubits);
                }
                
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "numberOfControlsExpression")) {

                  let numberOfControlsExpression = dataTransferObj["numberOfControlsExpression"];
                  let noControls = 0;
                  try {
                    noControls = parseInt(limitedEvaluate(interpolateJavaScriptExpression(numberOfControlsExpression, s, q)));
                  } catch {
                    throw new Error("The number of controls expression is not a valid javascript expression!");
                  }
                  if (isNaN(noControls)) {
                    throw new Error("Number of controls does not evaluate to a number!");
                  }

                  if (noControls > 0) {
                    let controlsExpression = dataTransferObj["controlsExpression"].toString().trim();
                    let controlstatesExpression = dataTransferObj["controlstatesExpression"].toString().trim();

                    if (!controlsExpression) {
                      throw new Error(`Since the number of controls is ${noControls} you must specify an expression for controls!`);
                    }
                    if (!controlstatesExpression) {
                      throw new Error(`Since the number of controls is ${noControls} you must specify an expression for control states!`);
                    }

                    dto["controls"] = [];
                    for (let j = 0; j < noControls; j++) {
                      let control = null;
                      try {
                        control = parseInt(limitedEvaluate(interpolateJavaScriptExpression(controlsExpression, s, q, j)));
                      } catch {
                        throw new Error("The control(s) expression is not a valid javascript expression!");
                      }
                      if (isNaN(control)) {
                        throw new Error(`The ${j}'th' control does not evaluate to a number`);
                       }
                      dto["controls"].push(control);
                    }

                    dto["controlstates"] = [];
                    for (let j = 0; j < noControls; j++) {
                      let controlstate = null;
                      try {
                        controlstate = limitedEvaluate(interpolateJavaScriptExpression(controlstatesExpression, s, q, j)).toString().trim();
                      } catch {
                        throw new Error("The control state(s) expression is not a valid javascript expression!");
                      }
                      if (!controlstate){
                        throw new Error(`The ${j}'th' control state is an empty string.`);
                      }
                      if (!['0', '1', '+', '-', '+i', '-i'].includes(controlstate)) {
                        throw new Error(`The ${j}'th control state for q=${q}, s=${s} does not evaluate to 0, 1, '+', '-', '+i' or '-i' where quotes are needed.`);
                      }
                      dto["controlstates"].push(controlstate);
                    }
                  }
                }
                
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phiExpression")) {
                  let phiExpression = dataTransferObj["phiExpression"];
                  let phi = null;
                  try {
                    phi = limitedEvaluate(interpolateJavaScriptExpression(phiExpression, s, q));
                  } catch {
                    throw new Error("The expression for phi is not a valid javascript expression!");
                  }
                  if (isNaN(phi)) {
                    throw new Error("Phi expression does not evaluate to a number!");
                  }
                  dto["phi"] = phi;
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "thetaExpression")) {
                  let thetaExpression = dataTransferObj["thetaExpression"];
                  let theta = null;
                  try {
                    theta = limitedEvaluate(interpolateJavaScriptExpression(thetaExpression, s, q));
                  } catch {
                    throw new Error("The expression for theta is not a valid javascript expression!");
                  }
                  if (isNaN(theta)) {
                    throw new Error("Theta expression does not evaluate to a number!");
                  }
                  dto["theta"] = theta;
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "lambdaExpression")) {
                  let lambdaExpression = dataTransferObj["lambdaExpression"];
                  let lambda = null;
                  try {
                    lambda = limitedEvaluate(interpolateJavaScriptExpression(lambdaExpression, s, q));
                  } catch {
                    throw new Error("The expression for lambda is not a valid javascript expression!");
                  }
                  if (isNaN(lambda)) {
                    throw new Error("Lambda expression does not evaluate to a number!");
                  }
                  dto["lambda"] = lambda;
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "bitExpression")) {
                  let bitExpression = dataTransferObj["bitExpression"];
                  let bit = null;
                  try {
                    bit = limitedEvaluate(interpolateJavaScriptExpression(bitExpression, s, q));
                  } catch {
                    throw new Error("The expression for classic bit value is not a valid javascript expression!");
                  }
                  if (isNaN(bit)) {
                    throw new Error("The classic bit expression does not evaluate to a number!");
                  }
                  dto["bit"] = bit;
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "powerSignExpression")) {
                  let powerSignExpression = dataTransferObj["powerSignExpression"];

                  let powerSign = 1;
                  try  {
                    powerSign = limitedEvaluate(interpolateJavaScriptExpression(powerSignExpression, s, q));
                  } catch {
                    throw new Error("The power sign must evaluate to 1 or -1!");
                  }
                  if (powerSign != 1 && powerSign != -1) {
                    throw new Error("The power sign must evaluate to 1 or -1!");
                  }
                  if (powerSign == -1) powerSign = 1;

                  let powerTExpression = dataTransferObj["powerTExpression"];
                  let powerKExpression = dataTransferObj["powerKExpression"];

                  if (powerTExpression){
                    let power = null;
                    try {
                      power = limitedEvaluate(interpolateJavaScriptExpression(powerTExpression, s, q));
                    } catch {
                      throw new Error("The expression circuit power (t) value is not a valid javascript expression!");
                    }
                    if (isNaN(power) || power <= 0) {
                      throw new Error("The power (t) expression not evaluate to a pozitive non null number!");
                    }
                    if (powerSign > 0) dto["circuit_power"] = power.toString();
                    else dto["circuit_power"] = "-" + power.toString();
                  } else {
                    let power = null;
                    try  {
                      power = limitedEvaluate(interpolateJavaScriptExpression(powerKExpression, s, q));
                    } catch {
                      throw new Error("The expression circuit power (k) value is not a valid javascript expression!");
                    }
                    if (isNaN(power) || power < 0) {
                      throw new Error("The power (k) expression not evaluate to a pozitive number!");
                    }
                    if (powerSign > 0) dto["circuit_power"] = "2^" + power.toString();
                    else dto["circuit_power"] = "-2^" + power.toString();
                  }
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "rootTExpression") ||
                    Object.prototype.hasOwnProperty.call(dataTransferObj, "rootKExpression")) {
                  let rootTExpression = dataTransferObj["rootTExpression"];
                  let rootKExpression = dataTransferObj["rootKExpression"];
                  if (rootTExpression){
                    let t = null;
                    try  {
                      t = limitedEvaluate(interpolateJavaScriptExpression(rootTExpression, s, q));
                    } catch {
                      throw new Error("The expression for root (t) is not a valid javascript expression!");
                    }
                    if (isNaN(t)) {
                      throw new Error("The 't' based root expression not evaluate to a number!");
                    }
                    dto["root"] = "1/" + t;
                  } else {
                    let k = null;
                    try  {
                      k = limitedEvaluate(interpolateJavaScriptExpression(rootKExpression, s, q));
                    } catch {
                      throw new Error("The expression for root (k) is not a valid javascript expression!");
                    }
                    if (isNaN(k)) {
                      throw new Error("The 'k' based root expression not evaluate to a number!");
                    }
                    dto["root"] = "1/2^" + k;
                  }
                }

                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "circuit_id")) {
                  dto["circuit_id"] = dataTransferObj["circuit_id"];
                }

                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "circuit_abbreviation")) {
                  dto["circuit_abbreviation"] = dataTransferObj["circuit_abbreviation"];
                }

                dtos.push(dto);
              }
            } catch (exception) {
              alert(exception);
              reject(false);
              return;
            }
          }
        }
        
        let existingQbits = [...targets, ...controls];
        if (stepFirst < 0 || stepLast < 0) {
          alert("Negative steps not permitted!");
        } else if (qbitFirst < 0 || qbitLast < 0) {
          alert("Negative qubits not permitted!");
        } else if (proposedNewGatesAreInvalid(dtos)){
          alert("Some of the proposed new gates do not allocate distinct seats for each target and each control qubit!");
        } else if (seatsInArrayAreAlreadyTaken(circuitEditorModule.state[window.currentCircuitId], dtos, step, existingQbits)) {
          alert("Some of the proposed new gates have seats already occupied!");
        } else if (proposedNewSeatsOverlap(dtos)) {
          alert("Some of the proposed new gates overlap!");
        } else {
          if (dtos.length > 0){
            this.commit("circuitEditorModule/insertGates", {"dtos": dtos, "existingStep": step, "existingQbits": existingQbits});
          } else {
            alert("No gate has been deployed, please review your expressions.")
          }
          
          // duplicating gate was successful
          resolve(true);
        }
        
        // duplicating gate failed
        reject(false);
      })
    },
    repositionBarrierInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let originalStep = dataTransferObj["originalStep"];
        let step = dataTransferObj["step"];
        if (step < 0) {
          alert("Negative steps are not permitted!");
        } else if (stepContainsGates(circuitEditorModule.state[window.currentCircuitId], step)) {
          alert("A barrier can be moved only to a step that contains no gates!");
        } else {
          this.commit("circuitEditorModule/removeBarrier", { step: originalStep});
          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj)

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    repositionElementaryGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let targets = dataTransferObj["targets"];
        let targetsNew = dataTransferObj["targetsNew"];
        
        if (targetsNew.some((element) => element < 0)) {
          alert("Negative steps/qubits not permitted!");
        } else if ((!arraysAreEqual(targets, targetsNew)) && seatsAreTaken(circuitEditorModule.state[window.currentCircuitId], targetsNew, step, targets)) {
          alert("A gate already exists at this location!");
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, targets: targets });

          dataTransferObj["targets"] = [...targetsNew];
          
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "bitNew")) {
            let bit = dataTransferObj["bitNew"];
            dataTransferObj["bit"] = bit;
          }

          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj)

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    repositionGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let targets = dataTransferObj["targets"];
        let controls = dataTransferObj["controls"];
        let targetsNew = dataTransferObj["targetsNew"];
        let controlsNew = dataTransferObj["controlsNew"];
        let controlstatesNew = dataTransferObj["controlstatesNew"];
        let existingQbits = [...targets, ...controls, ...getAggregatedGatesTargets(dataTransferObj)].filter(x => isDefined(x));
        let proposedQbits = [...targetsNew, ...controlsNew, ...getAggregatedGatesNewTargets(dataTransferObj)].filter(x => isDefined(x));
        let targetsRange = range(Math.min(...targetsNew), Math.max(...targetsNew));

        if (targetsNew.some((element) => element < 0) || controlsNew.some((element) => element < 0)) {
          alert("Negative qubits not permitted!");
        } else if (targetsNew.length != getUniqueValues(targetsNew).length) {
          alert("The target qubits must be different!");
        } else if (targetsNew.some(e => controlsNew.includes(e))) {
          alert("The target and control qubits must be different!");
        } else if (targetsRange.some(e => controlsNew.includes(e))) {
          alert("Some of the control qubit(s) is placed inside the box.");
        } else if ((!arraysAreEqual(targets, targetsNew) || !arraysAreEqual(controls, controlsNew)) &&
          seatsAreTaken(circuitEditorModule.state[window.currentCircuitId], proposedQbits, step, existingQbits)) {
          alert("The requested seat(s) are occupied!");
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, targets: targets });

          dataTransferObj["targets"] = [...targetsNew];
          dataTransferObj["controls"] = [...controlsNew];
          dataTransferObj["controlstates"] = [...controlstatesNew];

          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phiNew")) {
            let phi = dataTransferObj["phiNew"];
            dataTransferObj["phi"] = phi;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "thetaNew")) {
            let theta = dataTransferObj["thetaNew"];
            dataTransferObj["theta"] = theta;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "lambdaNew")) {
            let lambda = dataTransferObj["lambdaNew"];
            dataTransferObj["lambda"] = lambda;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "rootNew")) {
            let root = dataTransferObj["rootNew"];
            dataTransferObj["root"] = root;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "gatesNew")) {
            let gates = dataTransferObj["gatesNew"];
            dataTransferObj["gates"] = JSON.parse(JSON.stringify(gates));
          }
          
          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj);
          
          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    updateCircuitGateNameAndAbbreviationInCircuit(context, payload) {
      this.commit("circuitEditorModule/updateCircuitGateNameAndAbbreviation", payload);
    },
    removeGateFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeGateNoTrack", dataTransferObj);
      this.commit("circuitEditorModule/removeEmptySteps");
    },
    removeGateFromCircuitByUser: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeGate", dataTransferObj);
      this.commit("circuitEditorModule/removeEmptySteps");
    },
    removeBarrierFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeBarrierNoTrack", dataTransferObj);
    },
    removeBarrierFromCircuitByUser: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeBarrier", dataTransferObj);
    },
    removeQbitFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeQbit", dataTransferObj);
    },
    removeStepFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeStep", dataTransferObj);
    },
  },

  mutations: {
    loadProject(context, jsonObj) {
      if (jsonObj != null) {
        delete circuitEditorModule.state[0];
        window.circuitIds = Object.keys(jsonObj).map(Number);
        for (let i = 0; i < window.circuitIds.length; i++) {
          let circuitId = parseInt(window.circuitIds[i]);
          if (i == 0) {
            window.currentCircuitId = circuitId;
          }
          Vue.set(circuitEditorModule.state, circuitId, {...jsonObj[window.circuitIds[i]]})
        }
      }
    },
    updateCircuitState(context, jsonObj) {
      if (window.currentCircuitId != 0) {
        circuitEditorModule.state[window.currentCircuitId].steps = [...jsonObj.steps];
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    resetCircuitState() {
      if (window.currentCircuitId != 0) {
        let emptyState = JSON.parse('{"steps":[{"index":0,"gates":[]}]}');
        circuitEditorModule.state[window.currentCircuitId].steps = emptyState.steps;
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    insertQbit(context, qbit) {
      if (window.currentCircuitId != 0) {
        let state = circuitEditorModule.state[window.currentCircuitId];
        insertingOneQbit(state, qbit);
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    insertQubitFromWorkerThread(context, payload) {
      if (window.currentCircuitId != 0) {
        let circuitId = payload["circuitId"];
        let qbit = payload["qbit"];
        let state = circuitEditorModule.state[circuitId];
        insertingOneQbit(state, qbit);
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    insertStep(context, step) {
      if (window.currentCircuitId != 0) {
        let state = circuitEditorModule.state[window.currentCircuitId];
        if (Object.prototype.hasOwnProperty.call(state, "steps")) {
          for (let i = 0; i < state.steps.length; i++) {
            let currentStep = state.steps[i];
            if (currentStep.index >= step) {
              currentStep.index = parseInt(currentStep.index) + 1;
            }
          }
        } else {
          state.steps = []
          state.steps.push({ "index": step, "gates": [] });
        }
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    switchGate(context, dto) {
      let state = circuitEditorModule.state[window.currentCircuitId];
      removingGateFromCircuit(state, dto);
      insertingOneGateInCircuit(state, dto);
    },
    insertGate(context, dto) {
      if (window.currentCircuitId != 0) {
        let state = circuitEditorModule.state[window.currentCircuitId];
        insertingOneGateInCircuit(state, dto);
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    insertGateFromWorkerThread(context, payload) {
      if (window.currentCircuitId != 0) {
        let circuitId = payload["circuitId"];
        let dto = payload["dto"];
        let state = circuitEditorModule.state[circuitId];
        insertingOneGateInCircuit(state, dto);
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    // mutation that does not trigger update to undo/redo history
    insertGateNoTrack(context, dto) {
      if (window.currentCircuitId != 0) {
        let state = circuitEditorModule.state[window.currentCircuitId];
        insertingOneGateInCircuit(state, dto);
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    updateCircuitNameAndAbbreviation(context, args) {
      let changedCircuitId = args[0];
      let newCircuitName = args[1];
      let newCircuitAbbreviation = args[2];
      circuitEditorModule.state[changedCircuitId]["circuit_name"] = newCircuitName;
      circuitEditorModule.state[changedCircuitId]["circuit_abbreviation"] = newCircuitAbbreviation;
      for (let i = 0; i < window.circuitIds.length; i++) {
        let id = window.circuitIds[i];
        if (id == changedCircuitId) continue;
        let circuitState = circuitEditorModule.state[id];
        updateGatesAbbreviation(circuitState, changedCircuitId, newCircuitAbbreviation);
      }
    },
    insertGates(context, dataTransferObj) {
      if (window.currentCircuitId != 0) {
        let dtos = dataTransferObj["dtos"];
        let existingStep = dataTransferObj["existingStep"];
        let existingQbits = dataTransferObj["existingQbits"];
        let state = circuitEditorModule.state[window.currentCircuitId];
        if (isDefined(existingStep) && existingQbits && existingQbits.length > 0){
          removingGateFromCircuit(state, {"step": existingStep, "targets": [...existingQbits]});
        }
        for (let i = 0; i < dtos.length; i++){
          insertingOneGateInCircuit(state, dtos[i]);
        }
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    removeGate(context, dto) {
      let state = circuitEditorModule.state[window.currentCircuitId];
      removingGateFromCircuit(state, dto);
    },
    removeGateFromWorkerThread(context, payload) {
      let circuitId = payload["circuitId"];
      let dto = payload["dto"];
      let state = circuitEditorModule.state[circuitId];
      removingGateFromCircuit(state, dto);
    },
    // mutation that does not trigger update to undo/redo history
    removeGateNoTrack(context, dto) {
      let state = circuitEditorModule.state[window.currentCircuitId];
      removingGateFromCircuit(state, dto);
    },
    removeGates(context, dataTransferObj) {
      let dtos = dataTransferObj["dtos"];
      for (let i = 0; i < dtos.length; i++){
        let state = circuitEditorModule.state[window.currentCircuitId];
        removingGateFromCircuit(state, dtos[i]);
      }
    },
    removeBarrier(context, dto) {
      let state = circuitEditorModule.state[window.currentCircuitId];
      removingBarrierFromCircuit(state, dto);
    },
    // mutation that does not trigger update to undo/redo history
    removeBarrierNoTrack(context, dto) {
      let state = circuitEditorModule.state[window.currentCircuitId];
      removingBarrierFromCircuit(state, dto);
    },
    removeQbit(context, dto) {
      if (window.currentCircuitId != 0) {
        let qbit = dto["targets"][0];
        let state = circuitEditorModule.state[window.currentCircuitId];
        if (Object.prototype.hasOwnProperty.call(state, "steps")) {
          for (let i = 0; i < state.steps.length; i++) {
            let gates = state.steps[i]["gates"];

            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
                if (gate.targets.includes(qbit)) {
                  gates.splice(j, 1);
                }
              }
            }
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
                let targets = gate.targets;
                for (let k = 0; k < targets.length; k++){
                  if (targets[k] > qbit)
                    targets[k] -= 1;
                }
              }
            }
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
                let controls = gate.controls;
                for (let k = 0; k < controls.length; k++){
                  if (controls[k].target == qbit)
                    controls.splice(k, 1);
                }
              }
            }
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
                let controls = gate.controls;
                for (let k = 0; k < controls.length; k++){
                  if (controls[k].target > qbit)
                    controls[k].target -= 1;
                }
              }
            }
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
                let gates = gate.gates;
                for (let k = 0; k < gates.length; k++){
                  if (gates[k].targets.includes(qbit))
                    gate.gates.splice(k, 1);
                }
              }
            }
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
                let gates = gate.gates;
                for (let k = 0; k < gates.length; k++){
                  let aggregatedGate = gates[k];
                  for (let l = 0; l < aggregatedGate.targets.length; l++){
                    if (aggregatedGate.targets[l] > qbit)
                      aggregatedGate.targets[l] -= 1;
                  }
                }
              }
            }
          }
        }
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    removeStep(context, dto) {
      if (window.currentCircuitId != 0) {
        let step = dto["step"];
        let state = circuitEditorModule.state[window.currentCircuitId];
        if (Object.prototype.hasOwnProperty.call(state, "steps")) {
          for (let i = 0; i < state.steps.length; i++) {
            let stepIndex = parseInt(state.steps[i].index)
            if (stepIndex == step) {
              state.steps.splice(i, 1);
            }
          }
          for (let i = 0; i < state.steps.length; i++) {
            let stepIndex = parseInt(state.steps[i].index)
            if (stepIndex > step) {
              state.steps[i].index = stepIndex - 1;
            }
          }
        }
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
    removeEmptySteps() {
      if (window.currentCircuitId != 0) {
        let state = circuitEditorModule.state[window.currentCircuitId];
        if (Object.prototype.hasOwnProperty.call(state, "steps")) {
          for (let i = 0; i < state.steps.length; i++) {
            let step = state.steps[i];
            if (Object.prototype.hasOwnProperty.call(step, "gates")) {
              let gates = step["gates"];
              if (gates.length === 0){
                state.steps.splice(i, 1);
              }
            }
          }
        }
      } else {
        alert("Failed load current project, our server may respond a bit too slow. Please try again in a few seconds. If this still does not work please try to reload the page.")
      }
    },
  },
};

export default {
  state: circuitEditorModule.state,
  getters: circuitEditorModule.getters,
  actions: circuitEditorModule.actions,
  mutations: circuitEditorModule.mutations,
  namespaced: true,
};
