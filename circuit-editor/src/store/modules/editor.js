import {
  computeGatesTableCells,
  retrieveRowsInGatesTable,
  seatsAreTaken,
  seatsInArrayAreAlreadyTaken,
  positionIsFilled,
} from "./gatesTable.js";

import {
  insertingOneGateInCircuit,
  interpolateJavaScriptExpression,
  isDefined,
  removingGateFromCircuit,
  proposedNewGatesAreInvalid,
  proposedNewSeatsOverlap,
} from "./editorHelper.js";

import {
  retrieve_circuit,
} from "./circuitSaveAndRetrieve.js";

import { 
  arraysAreEqual,
  zipArrays,
  getUniqueValues
} from "./javaScriptUtils.js";

import {
  create, 
  all
} from 'mathjs'

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

  state: retrieve_circuit(),

  getters: {
    getGatesTableCells: () => {
      return (row) => {
        return computeGatesTableCells(
          circuitEditorModule.state,
          row,
        );
      };
    },
    getRowsInGatesTable: () => {
      return retrieveRowsInGatesTable(circuitEditorModule.state);
    },
    getCircuitState: () => {
      return circuitEditorModule.state;
    },
    getMaximumStepIndex: () => {
      let maxStep = 0;
      let state = circuitEditorModule.state;
      if (Object.prototype.hasOwnProperty.call(state, "steps")) {
        for (let i = 0; i < state.steps.length; i++) {
          maxStep = Math.max(maxStep, state.steps[i].index);
        } 
      }
      return maxStep;
    },
    getMaximumQbitIndex: () => {
      let maxQbit = -1;
      let state = circuitEditorModule.state;
      if (Object.prototype.hasOwnProperty.call(state, "steps")) {
        for (let i = 0; i < state.steps.length; i++) {
          let step = state.steps[i];
          if (Object.prototype.hasOwnProperty.call(step, "gates")) {
            let gates = step["gates"];
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
                let targets = gate.targets;
                maxQbit = Math.max(maxQbit, ...targets);
              }
              if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
                for (let i = 0; i < gate["controls"].length; i++) {
                  let controlInfo = gate["controls"][i];
                  let target = controlInfo["target"];
                  maxQbit = Math.max(maxQbit, target);
                }
              }
            } 
          }
        }
      }
      return maxQbit;
    },
  },

  actions: {
    // need a way to force circuit redraw, perhaps there is a better way
    refreshCircuit: function () {
      let availableQubits = window.gatesTable.rows / 2 - 1;
      let availableSteps = window.gatesTable.columns / 2 - 1;
      for (let s = 0; s < availableSteps; s++){
        for (let q = 0; q < availableQubits; q++){
          if (!positionIsFilled(circuitEditorModule.state, s, q)){
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
    insertStepInCircuit: function (context, step) {
      this.commit("circuitEditorModule/insertStep", step);
    },
    insertGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let elementaryGates = ["identity"];
        let singleQbitGates = ["hadamard", "hadamard-xy", "hadamard-yz", "hadamard-zx", "identity", "pauli-x", "pauli-y", "pauli-z", "sqrt-not", "t", "t-dagger", "s", "s-dagger", "v", "v-dagger", "h", "h-dagger", "c", "c-dagger"];
        let pauliRootGates = ["pauli-x-root", "pauli-y-root", "pauli-z-root", "pauli-x-root-dagger", "pauli-y-root-dagger", "pauli-z-root-dagger"]
        let parametricSingleQbitGates = ["rx-theta", "ry-theta", "rz-theta"];
        let unitarySingleQbitGates = ["u1"];
        let unitaryTwoParamGates = ["u2"];
        let unitaryThreeParamGates = ["u3"]
        let measureGates = ["measure-x", "measure-y", "measure-z"];
        let twoTargetGates = ["swap", "sqrt-swap", "sqrt-swap-dagger", "iswap", "fswap", "magic", "magic-dagger", "molmer-sorensen", "molmer-sorensen-dagger", "berkeley", "berkeley-dagger", "ecp", "ecp-dagger", "w"];
        let parametricTwoTargetGates = ["givens", "swap-theta", "swap-root", "xx", "yy", "zz", "xy", "cross-resonance", "cross-resonance-dagger"];
        let biParametricTwoTargetGates = ["a"];
        let canonicalGates = ["canonical"]
        
        let name = dataTransferObj["name"];
        let step = dataTransferObj["step"];
        
        let targets = [];
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "targets")) {
          targets = [...dataTransferObj["targets"]].sort();
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
            
        if (step < 0 || targets.some((element) => element < 0) || controls.some((element) => element < 0)) {
          alert("Negative steps/qubits not permitted!");
        } else if (seatsAreTaken(circuitEditorModule.state, targets, step)) {
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
          } else if (twoTargetGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, };
          } else if (parametricTwoTargetGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, };
          } else if (biParametricTwoTargetGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "phi": 0 };
          } else if (canonicalGates.includes(name) && controls.length == 0) {
            dto = { "step": step, "targets": targets, "name": name, "tx": 0, "ty": 0, "tz": 0 };
          } else if (twoTargetGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (parametricTwoTargetGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "controls": controls, "controlstates": controlstates };
          } else if (biParametricTwoTargetGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "theta": 0, "phi": 0, "controls": controls, "controlstates": controlstates };
          } else if (canonicalGates.includes(name)) {
            dto = { "step": step, "targets": targets, "name": name, "tx": 0, "ty": 0, "tz": 0, "controls": controls, "controlstates": controlstates };
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
    removeGatesFromCircuit(context, dto) {
      this.commit("circuitEditorModule/removeGates", dto);
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
              if (limitedEvaluate(condStep) && 
                  limitedEvaluate(condQbit) && 
                  limitedEvaluate(condConjugate)){
                
                let dto = { "step": s, "targets": [q], "name": name };

                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "qbit2Expression")) {
                  let qbit2Expression = dataTransferObj["qbit2Expression"];
                  dto["targets"].push(limitedEvaluate(interpolateJavaScriptExpression(qbit2Expression, s, q)));
                }
                
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "numberOfControlsExpression")) {

                  let numberOfControlsExpression = dataTransferObj["numberOfControlsExpression"];
                  let noControls = parseInt(limitedEvaluate(interpolateJavaScriptExpression(numberOfControlsExpression, s, q)));
                  if (isNaN(noControls)) {
                    throw new Error("Number of controls does not evaluate to a number!");
                  }

                  if (noControls > 0) {
                    let controlsExpression = dataTransferObj["controlsExpression"].trim();
                    let controlstatesExpression = dataTransferObj["controlstatesExpression"].trim();

                    if (!controlsExpression) {
                      throw new Error(`Since the number of controls is ${noControls} you must specify an expression for controls!`);
                    }
                    if (!controlstatesExpression) {
                      throw new Error(`Since the number of controls is ${noControls} you must specify an expression for control states!`);
                    }

                    dto["controls"] = [];
                    for (let j = 0; j < noControls; j++) {
                      let control = parseInt(limitedEvaluate(interpolateJavaScriptExpression(controlsExpression, s, q, j)));
                      if (isNaN(control)) {
                        throw new Error(`The ${j}'th' control does not evaluate to a number`);
                       }
                      dto["controls"].push(control);
                    }

                    dto["controlstates"] = [];
                    for (let j = 0; j < noControls; j++) {
                      let controlstate = limitedEvaluate(interpolateJavaScriptExpression(controlstatesExpression, s, q, j)).toString().trim();
                      if (!controlstate){
                        throw new Error(`The ${j}'th' control state is an empty string.`);
                      }
                      if (!['0', '1', '+', '-', '+i', '-i'].includes(controlstate)) {
                        throw new Error(`The ${j}'th control state for q=${q}, s=${s} does not evaluate to '0', '1', '+', '-', '+i' or '-i'.`);
                      }
                      dto["controlstates"].push(controlstate);
                    }
                  }
                }
                
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phiExpression")) {
                  let phiExpression = dataTransferObj["phiExpression"];
                  dto["phi"] = limitedEvaluate(interpolateJavaScriptExpression(phiExpression, s, q));
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "thetaExpression")) {
                  let thetaExpression = dataTransferObj["thetaExpression"];
                  dto["theta"] = limitedEvaluate(interpolateJavaScriptExpression(thetaExpression, s, q));
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "lambdaExpression")) {
                  let lambdaExpression = dataTransferObj["lambdaExpression"];
                  dto["lambda"] = limitedEvaluate(interpolateJavaScriptExpression(lambdaExpression, s, q));
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "bitExpression")) {
                  let bitExpression = dataTransferObj["bitExpression"];
                  dto["bit"] = limitedEvaluate(interpolateJavaScriptExpression(bitExpression, s, q));
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "rootTExpression")) {
                  let rootTExpression = dataTransferObj["rootTExpression"];
                  let rootKExpression = dataTransferObj["rootKExpression"];
                  if (rootTExpression){
                    dto["root"] = "1/" + limitedEvaluate(interpolateJavaScriptExpression(rootTExpression, s, q));
                  } else {
                    dto["root"] = "1/2^" + limitedEvaluate(interpolateJavaScriptExpression(rootKExpression, s, q));
                  }
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
        } else if (seatsInArrayAreAlreadyTaken(circuitEditorModule.state, dtos, step, existingQbits)) {
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
    repositionElementaryGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let targets = dataTransferObj["targets"];
        let targetsNew = dataTransferObj["targetsNew"];
        
        if (targetsNew.some((element) => element < 0)) {
          alert("Negative steps/qubits not permitted!");
        } else if ((!arraysAreEqual(targets, targetsNew)) && seatsAreTaken(circuitEditorModule.state, targetsNew, step, targets)) {
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
    repositionSimpleGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let targets = dataTransferObj["targets"];
        let controls = dataTransferObj["controls"];
        let targetsNew = dataTransferObj["targetsNew"];
        let controlsNew = dataTransferObj["controlsNew"];
        let controlstatesNew = dataTransferObj["controlstatesNew"];
        let existingQbits = [...targets, ...controls];
        let proposedQbits = [...targetsNew, ...controlsNew];
        
        if (targetsNew.some((element) => element < 0) || controlsNew.some((element) => element < 0)) {
          alert("Negative qubits not permitted!");
        } else if (targetsNew.length != getUniqueValues(targetsNew).length) {
          alert("The target qubits must be different!");
        } else if ((!arraysAreEqual(targets, targetsNew) || !arraysAreEqual(controls, controlsNew)) &&
          seatsAreTaken(circuitEditorModule.state, proposedQbits, step, existingQbits)) {
          if (controlsNew.length > 0){
            alert("At least a gate already exists in the qubits ranging from proposed target to proposed control!");
          } else {
            alert("The requested seat is occupied!");
          }
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
          
          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj);
          
          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    repositionControlledTwoTargetQubitGateInCircuit: function (context, dataTransferObj) {
      //TODO: not working
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let targets = dataTransferObj["targets"];
        let controls = dataTransferObj["controls"];
        let controlstatesNew = dataTransferObj["controlstatesNew"];
        let targetsNew = dataTransferObj["targetsNew"];
        let controlsNew = dataTransferObj["controlsNew"];
        let existingQbits = [...targets, ...controls];
        let proposedQbits = [...targetsNew, ...controlsNew];
        
        if (targetsNew.some((element) => element < 0) || controlsNew.some((element) => element < 0)) {
          alert("Negative qubits not permitted!");
        } else if (targetsNew.length != getUniqueValues(targetsNew).length) {
          alert("The target qubits must be different!");
        } else if (targetsNew.some(e => controlsNew.includes(e))) {
          alert("The target and control qubits must be different!");
        } else if ((!arraysAreEqual(targets, targetsNew)|| !arraysAreEqual(controls, controlsNew)) &&
          seatsAreTaken(circuitEditorModule.state, proposedQbits, step, existingQbits)) {
          if (controlsNew.length > 0){
            alert("At least a gate already exists in the qubits ranging from proposed target to proposed control!");
          } else {
            alert("Some of the requested seats are occupied!");
          }
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, targets: targets });
          
          dataTransferObj["targets"] = [...targetsNew];
          dataTransferObj["controls"] = [...controlsNew];
          dataTransferObj["controlstates"] = [...controlstatesNew];

          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj);

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    removeGateFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeGateNoTrack", dataTransferObj);
      this.commit("circuitEditorModule/removeEmptySteps");
    },
    removeGateFromCircuitByUser: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeGate", dataTransferObj);
      this.commit("circuitEditorModule/removeEmptySteps");
    },
    removeQbitFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeQbit", dataTransferObj);
    },
    removeStepFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeStep", dataTransferObj);
    },
  },

  mutations: {
    updateCircuitState(context, jsonObj) {
      circuitEditorModule.state.steps = jsonObj.steps;
    },
    resetCircuitState() {
      let emptyState = JSON.parse('{"steps":[{"index":0,"gates":[]}]}');
      circuitEditorModule.state.steps = emptyState.steps;
    },
    insertQbit(context, qbit) {
      let state = circuitEditorModule.state;
      if (Object.prototype.hasOwnProperty.call(state, "steps")) {
        for (let i = 0; i < state.steps.length; i++) {
          if (Object.prototype.hasOwnProperty.call(state.steps[i], "gates")) {
            let gates = state.steps[i]["gates"];
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];

              if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
                let targets = [...gate.targets];
                for (let k = 0; k < targets.length; k++){
                  if (targets[k] >= qbit) {
                    targets[k] += 1;
                  }
                }
                gate.targets = targets;
              }

              if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
                for (let i = 0; i < gate["controls"].length; i++) {
                  let controlInfo = gate["controls"][i];
                  let target = controlInfo["target"];
                  if (target >= qbit) {
                    controlInfo["target"] += 1;
                  }
                }
              }
            }
          }
        }
      }
    },
    insertStep(context, step) {
      let state = circuitEditorModule.state;
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
    },
    insertGate(context, dto) {
      let state = circuitEditorModule.state;
      insertingOneGateInCircuit(state, dto);
    },
    // mutation that does not trigger update to undo/redo history
    insertGateNoTrack(context, dto) {
      let state = circuitEditorModule.state;
      insertingOneGateInCircuit(state, dto);
    },
    insertGates(context, dataTransferObj) {
      let dtos = dataTransferObj["dtos"];
      let existingStep = dataTransferObj["existingStep"];
      let existingQbits = dataTransferObj["existingQbits"];
      let state = circuitEditorModule.state;
      if (isDefined(existingStep) && existingQbits && existingQbits.length > 0){
        removingGateFromCircuit(state, {"step": existingStep, "targets": [...existingQbits]});
      }
      for (let i = 0; i < dtos.length; i++){
        insertingOneGateInCircuit(state, dtos[i]);
      }
    },
    removeGate(context, dto) {
      let state = circuitEditorModule.state;
      removingGateFromCircuit(state, dto);
    },
    // mutation that does not trigger update to undo/redo history
    removeGateNoTrack(context, dto) {
      let state = circuitEditorModule.state;
      removingGateFromCircuit(state, dto);
    },
    removeGates(context, dataTransferObj) {
      let dtos = dataTransferObj["dtos"];
      for (let i = 0; i < dtos.length; i++){
        let state = circuitEditorModule.state;
        removingGateFromCircuit(state, dtos[i]);
      }
    },
    removeQbit(context, dto) {
      let qbit = dto["targets"][0];
      let state = circuitEditorModule.state;
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
              for (let i = 0; i < targets.length; i++){
                if (targets[i] > qbit)
                targets[i] -= 1;
              }
            }
          }
        }
      }
    },
    removeStep(context, dto) {
      let step = dto["step"];
      let state = circuitEditorModule.state;
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
    },
    removeEmptySteps() {
      let state = circuitEditorModule.state;
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
