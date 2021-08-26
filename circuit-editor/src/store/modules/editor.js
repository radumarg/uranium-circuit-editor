import {
  computeGatesTableCells,
  retrieveRowsInGatesTable,
  seatIsTaken,
  seatsAreTaken,
  seatsInArrayAreAlreadyTaken,
  proposedNewSeatsOverlap,
  proposedNewGatesAreInvalid,
  getProximFreeSeat,
  positionIsFilled,
} from "./gatesTable.js";

import {
  insertingOneGateInCircuit,
  interpolateJavaScriptExpression,
  isDefined,
  removingGateFromCircuit,
} from "./editorHelper.js";

import {
  retrieve_circuit,
} from "./circuitSaveAndRetrieve.js";

import { 
  arraysAreEqual 
} from "./utils.js";

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
              maxQbit = Math.max(maxQbit, gate.target);
              if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
                maxQbit = Math.max(maxQbit, gate.target2);
              }
              if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
                let controls = JSON.parse("[" + gate.controls + "]");
                maxQbit = Math.max(maxQbit, ...controls);
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
            let dto = {"step":s, "qbit": q, "name": "identity"};
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
        let singleBitGates = ["hadamard", "identity", "pauli-x", "pauli-y", "pauli-z", "sqrt-not", "t", "t-dagger", "s", "s-dagger"];
        let pauliRootGates = ["pauli-x-root", "pauli-y-root", "pauli-z-root", "pauli-x-root-dagger", "pauli-y-root-dagger", "pauli-z-root-dagger"]
        let parametricSingleBitGates = ["rx-theta", "ry-theta", "rz-theta"];
        let unitarySingleBitGates = ["u1"];
        let unitaryTwoParamGates = ["u2"];
        let unitaryThreeParamGates = ["u3"]
        let measureGates = ["measure-x", "measure-y", "measure-z"];
        let controlledSingleBitGates = ["ctrl-hadamard", "ctrl-pauli-x", "ctrl-pauli-y", "ctrl-pauli-z", "ctrl-sqrt-not", "ctrl-t", "ctrl-t-dagger", "ctrl-s", "ctrl-s-dagger"];
        let controlledPauliRootGates = ["ctrl-pauli-x-root", "ctrl-pauli-y-root", "ctrl-pauli-z-root", "ctrl-pauli-x-root-dagger", "ctrl-pauli-y-root-dagger", "ctrl-pauli-z-root-dagger"]
        let controlledParametricSingleBitGates = ["ctrl-rx-theta", "ctrl-ry-theta", "ctrl-rz-theta"];
        let controlledUnitarySingleBitGates = ["ctrl-u1"];
        let controlledUnitaryTwoParamGates = ["ctrl-u2"];
        let controlledUnitaryThreeParamGates = ["ctrl-u3"];
        let swapGates = ["swap", "sqrt-swap", "iswap"];
        let controlledSwapGates = ["ctrl-swap", "ctrl-sqrt-swap", "ctrl-iswap"];
        let parametricSwapGates = ["swap-phi"];
        let controlledParametricSwapGates = ["ctrl-swap-phi"];
        let isingGates = ["xx", "yy", "zz"];
        let controlledIsingGates = ["ctrl-xx", "ctrl-yy", "ctrl-zz"];
        
        let name = dataTransferObj["name"];
        let step = dataTransferObj["step"];
        let qbit = dataTransferObj["qbit"];
        
        // assign qbit2 (target2 qbit) if not assigned and this is a two target qubits gate (swap, ising, phaseshisft, etc.)
        let qbit2 = null;
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "qbit2")) {
          qbit2 = dataTransferObj["qbit2"];
        } else if ((isingGates.includes(name)
                    || controlledIsingGates.includes(name) 
                    || swapGates.includes(name) 
                    || controlledSwapGates.includes(name)
                    || parametricSwapGates.includes(name) 
                    || controlledParametricSwapGates.includes(name) 
                  )) {
          qbit2 = getProximFreeSeat(circuitEditorModule.state, qbit, step);
        }

        // assign control qbit if not assigned and this is a control gate
        let controls = [];
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controls")) {
          controls = [...dataTransferObj["controls"]];
        } else if (name.includes("ctrl-")) {
          let control = getProximFreeSeat(circuitEditorModule.state, qbit, step);
          if ((control == null) && (qbit2 != null)){
            control = getProximFreeSeat(circuitEditorModule.state, qbit2, step);
          }
          if (control != null) controls.push(control);
        }

        // add optional params, in case they exist and this is a control gate
        let controlstates = []
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controlstates")) {
          controlstates = [...dataTransferObj["controlstates"]];
        } else if (name.includes("ctrl-")) {
          controlstates.push('1');
        }
                
        if (step < 0 || qbit < 0 || qbit2 < 0 || controls.some((element) => element < 0)) {
          alert("Negative steps/qubits not permitted!");
        } else if (seatIsTaken(circuitEditorModule.state, qbit, step)) {
          alert("A gate already exists at this location!");
        } else {
          let dto = {};
          if (singleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name };
          } else if (parametricSingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "theta": 0 };
          } else if (pauliRootGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "root": "1/1" };
          } else if (unitarySingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "lambda": 0 };
          } else if (unitaryTwoParamGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "phi": 0, "lambda": 0 };
          } else if (unitaryThreeParamGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "theta": 0, "phi": 0, "lambda": 0 };
          } else if (measureGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "bit": qbit };
          } else if (controlledSingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (controlledPauliRootGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "controls": controls, "controlstates": controlstates, "root": "1/1" };
          } else if (controlledParametricSingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "theta": 0, "controls": controls, "controlstates": controlstates };
          } else if (controlledUnitarySingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "lambda": 0, "controls": controls, "controlstates": controlstates };
          } else if (controlledUnitaryTwoParamGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "phi": 0, "lambda": 0, "controls": controls, "controlstates": controlstates };
          } else if (controlledUnitaryThreeParamGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "theta": 0, "phi": 0, "lambda": 0, "controls": controls, "controlstates": controlstates };
          } else if (swapGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, };
          } else if (parametricSwapGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "phi": 0, };
          } else if (isingGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "theta": 0, };
          } else if (controlledSwapGates.includes(name)) {
              dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "controls": controls, "controlstates": controlstates };
          } else if (controlledParametricSwapGates.includes(name)) {
              dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "phi": 0, "controls": controls, "controlstates": controlstates };
          } else if (controlledIsingGates.includes(name)) {
              dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "theta": 0, "controls": controls, "controlstates": controlstates };
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
        let qbit = dataTransferObj["qbit"];
        let name = dataTransferObj["name"];
        let stepFirst = dataTransferObj["stepFirst"];
        let stepLast = dataTransferObj["stepLast"];
        let stepConditionExpression = dataTransferObj["stepConditionExpression"];
        let qbitFirst = dataTransferObj["qbitFirst"];
        let qbitLast = dataTransferObj["qbitLast"];
        let qbitConditionExpression = dataTransferObj["qbitConditionExpression"];
        let conjugateConditionExpression = dataTransferObj["conjugateConditionExpression"];
        //alert(typeof(dataTransferObj["controls"]))
        //TODO: fix!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let controls = dataTransferObj["controls"];

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
                
                let dto = { "step": s, "qbit": q, "name": name };

                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "qbit2Expression")) {
                  let qbit2Expression = dataTransferObj["qbit2Expression"];
                  dto["qbit2"] = limitedEvaluate(interpolateJavaScriptExpression(qbit2Expression, s, q));
                }
                if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controlsExpression")) {
                  dto["controls"] = [];
                  let controlsExpression = dataTransferObj["controlsExpression"];
                  for (let i = 0; i < controls.length(); i++) {
                    dto["controls"].push(limitedEvaluate(interpolateJavaScriptExpression(controlsExpression, s, q, i)));
                  }
                }
                  if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controlstatesExpression")) {
                    dto["controlstates"] = [];
                    let controlstatesExpression = dataTransferObj["controlstatesExpression"];
                    for (let i = 0; i < controls.length(); i++) {
                      let controlstate = limitedEvaluate(interpolateJavaScriptExpression(controlstatesExpression, s, q, i)).toString();
                      dto["controlstates"].push(controlstate);
                    }
                    if (dto["controlstate"].some((element) => !['0', '1'].includes(element))) {
                      throw new Error(`Control state q=${q}, s=${s} does not evaluate to 0 or 1.`);
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
        
        if (stepFirst < 0 || stepLast < 0) {
          alert("Negative steps not permitted!");
        } else if (qbitFirst < 0 || qbitLast < 0) {
          alert("Negative qbits not permitted!");
        } else if (proposedNewGatesAreInvalid(dtos)){
          alert("Some of the proposed new gates do not allocate distinct seats for target/target2/control/control2 qubits!");
        } else if (seatsInArrayAreAlreadyTaken(circuitEditorModule.state, dtos, step, qbit)) {
          alert("Some of the proposed new gates have seats already occupied!");
        } else if (proposedNewSeatsOverlap(dtos)) {
          alert("Some of the proposed new gates overlap!");
        } else {
          if (dtos.length > 0){
            this.commit("circuitEditorModule/insertGates", {"dtos": dtos, "existingStep": step, "existingQbit": qbit});
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
    repositionSimpleGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let qbit = dataTransferObj["qbit"];
        let qbitNew = dataTransferObj["qbitNew"];
        
        if (qbitNew < 0) {
          alert("Negative steps/qbits not permitted!");
        } else if ((qbit != qbitNew) && seatIsTaken(circuitEditorModule.state, qbitNew, step)) {
          alert("A gate already exists at this location!");
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, qbit: qbit });

          dataTransferObj["qbit"] = qbitNew;
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
    repositionControlledGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let qbit = dataTransferObj["qbit"];
        let controls = [...dataTransferObj["controls"]];
        let qbitNew = dataTransferObj["qbitNew"];
        let controlsNew = [...dataTransferObj["controlsNew"]];
        let controlstatesNew = [...dataTransferObj["controlstatesNew"]];
        let existingQbits = [qbit, ...controls];
        let proposedQbits = [qbitNew, ...controlsNew];
        
        if (qbitNew < 0 || controlsNew.some((element) => element < 0)) {
          alert("Negative qbits not permitted!");
        } else if (((qbit != qbitNew) || !arraysAreEqual(controls, controlsNew)) &&
          seatsAreTaken(circuitEditorModule.state, existingQbits, proposedQbits, step)) {
          alert("At least a gate already exists in the qbits ranging from proposed target to proposed control!");
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, qbit: qbit });

          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["controls"] = controlsNew;
          dataTransferObj["controlstates"] = controlstatesNew;
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
    repositionTwoTargetQubitGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = dataTransferObj["step"];
        let qbit = dataTransferObj["qbit"];
        let qbit2 = dataTransferObj["qbit2"];
        let qbitNew = dataTransferObj["qbitNew"];
        let qbit2New = dataTransferObj["qbit2New"];
        let existingQbits = [qbit, qbit2];
        let proposedQbits = [qbitNew, qbit2New];
        
        if (qbitNew < 0 || qbit2New < 0) {
          alert("Negative qbits not permitted!");
        } else if (qbitNew == qbit2New) {
          alert("The two qbits must be different!");
        } else if (((qbit != qbitNew) || (qbit2 != qbit2New)) &&
          seatsAreTaken(circuitEditorModule.state, existingQbits, proposedQbits, step)) {
          alert("At least a gate already exists in the qbits ranging from proposed target to proposed control!");
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, qbit: qbit });
          
          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["qbit2"] = qbit2New;

          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phiNew")) {
            let phi = dataTransferObj["phiNew"];
            dataTransferObj["phi"] = phi;
          }

          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "thetaNew")) {
            let theta = dataTransferObj["thetaNew"];
            dataTransferObj["theta"] = theta;
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
        let qbit = dataTransferObj["qbit"];
        let qbit2 = dataTransferObj["qbit2"];
        let controls = dataTransferObj["controls"];
        let controlstatesNew = dataTransferObj["controlstatesNew"];
        let qbitNew = dataTransferObj["qbitNew"];
        let qbit2New = dataTransferObj["qbit2New"];
        let controlsNew = dataTransferObj["controlsNew"];
        let existingQbits = [qbit, qbit2, ...controls];
        let proposedQbits = [qbitNew, qbit2New, ...controlsNew];
        
        if (qbitNew < 0 || qbit2New < 0 || controlsNew.some((element) => element < 0)) {
          alert("Negative qbits not permitted!");
        } else if (qbitNew == qbit2New) {
          alert("The two target qbits must be different!");
        } else if (controlsNew.includes(qbitNew) || controlsNew.includes(qbit2New)) {
          alert("The target and control qbits must be different!");
        } else if (((qbit != qbitNew) || (qbit2 != qbit2New) || !arraysAreEqual(controls, controlsNew)) &&
          seatsAreTaken(circuitEditorModule.state, existingQbits, proposedQbits, step)) {
          alert("At least a gate already exists in the qbits ranging from proposed target to proposed control!");
        } else {
          this.commit("circuitEditorModule/removeGateNoTrack", { step: step, qbit: qbit });
          
          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["qbit2"] = qbit2New;
          dataTransferObj["controls"] = controlsNew;
          dataTransferObj["controlstates"] = controlstatesNew;

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

              if (Object.prototype.hasOwnProperty.call(gate, "target")) {
                if (gate.target >= qbit) {
                  gate.target = parseInt(gate.target) + 1;
                }
              }
              if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
                if (gate.target2 >= qbit) {
                  gate.target2 = parseInt(gate.target2) + 1;
                }
              }
              if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
                let controls = JSON.parse("[" + gate.controls + "]");
                for (let k = 0; k < controls.length; k++){
                  if (controls[k] >= qbit) {
                    controls[k] += 1;
                  }
                }
                gate.controls = controls;
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
      let existingQbit = dataTransferObj["existingQbit"];
      let state = circuitEditorModule.state;
      if (isDefined(existingStep) && isDefined(existingQbit)){
        removingGateFromCircuit(state, {"step": existingStep, "qbit": existingQbit});
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
      let qbit = dto["qbit"];
      let state = circuitEditorModule.state;
      if (Object.prototype.hasOwnProperty.call(state, "steps")) {
        for (let i = 0; i < state.steps.length; i++) {
          let gates = state.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {
            let gate = gates[j];
            if (Object.prototype.hasOwnProperty.call(gate, "target")) {
              if (gate.target == qbit) {
                gates.splice(j, 1);
              } 
            }
          }
          for (let j = 0; j < gates.length; j++) {
            let gate = gates[j];
            if (Object.prototype.hasOwnProperty.call(gate, "target")) {
              if (parseInt(gate.target) > qbit){
                gate.target = parseInt(gate.target) - 1;
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
