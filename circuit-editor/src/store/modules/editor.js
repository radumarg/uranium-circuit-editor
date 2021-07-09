import {
  computeGatesTableCells,
  retrieveRowsInGatesTable,
  seatIsTaken,
  seatsAreTaken,
  seatsArrayIsTaken,
  getProximFreeSeat,
  positionIsFilled,
} from "./gatesTable.js";

import {
  insertingOneGateInCircuit,
  interpolateJavaScriptExpression,
} from "./utils.js";

import {
  retrieve_circuit,
} from "./circuitSaveAndRetrieve.js";

import {
  evaluate
} from 'mathjs'

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
              if (Object.prototype.hasOwnProperty.call(gate, "control")) {
                maxQbit = Math.max(maxQbit, gate.control);
              }
              if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
                maxQbit = Math.max(maxQbit, gate.control2);
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
            this.commit("circuitEditorModule/insertGate", dto);
            this.commit("circuitEditorModule/removeGate", dto);
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
        let parametricSwapGates = ["swap-phi"];
        let isingGates = ["xx", "yy", "zz"];
        
        let name = dataTransferObj["name"];
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);

        // assign qbit2 (target2 qbit) if not assigned and this is a ising, swap or fredkin gate
        let qbit2 = null;
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "qbit2")) {
          qbit2 = parseInt(dataTransferObj["qbit2"]);
        } else if ((isingGates.includes(name) || swapGates.includes(name) || parametricSwapGates.includes(name) || (name == "fredkin"))) {
          qbit2 = getProximFreeSeat(circuitEditorModule.state, qbit, step);
        }

        // assign control qbit if not assigned and this is a control or toffoli gate
        let control = null;
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "control")) {
          control = parseInt(dataTransferObj["control"]);
        } else if (name.includes("ctrl-") || (name == "toffoli") || (name == "fredkin")) {
          control = getProximFreeSeat(circuitEditorModule.state, qbit2, step);
          if ((control == null) && (name == "fredkin")){
            control = getProximFreeSeat(circuitEditorModule.state, qbit, step);
          }
        }
        
        // assign control2 qbit if not assigned and this is a toffoli gate
        let control2 = null;
        if (Object.prototype.hasOwnProperty.call(dataTransferObj, "control2")) {
          control2 = parseInt(dataTransferObj["control2"]);
        } else if (name == "toffoli") {
          control2 = getProximFreeSeat(circuitEditorModule.state, control, step);
          if (control2 == null){
            control2 = getProximFreeSeat(circuitEditorModule.state, qbit, step);
          }
        }
        
        if (step < 0 || qbit < 0 || qbit2 < 0 || control < 0 || control2 < 0) {
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
            dto = { "step": step, "qbit": qbit, "name": name, "control": control, "controlstate": 1 };
          } else if (controlledPauliRootGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "control": control, "controlstate": 1, "root": "1/1" };
          } else if (controlledParametricSingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "theta": 0, "control": control, "controlstate": 1 };
          } else if (controlledUnitarySingleBitGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "lambda": 0, "control": control, "controlstate": 1 };
          } else if (controlledUnitaryTwoParamGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "phi": 0, "lambda": 0, "control": control, "controlstate": 1 };
          } else if (controlledUnitaryThreeParamGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "name": name, "theta": 0, "phi": 0, "lambda": 0, "control": control, "controlstate": 1 };
          } else if (swapGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, };
          } else if (parametricSwapGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "phi": 0, };
          } else if (isingGates.includes(name)) {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "theta": 0, };
          } else if (name == "fredkin") {
            dto = { "step": step, "qbit": qbit, "qbit2": qbit2, "name": name, "control": control, "controlstate": 1 };
          } else if (name == "toffoli") {
            dto = { "step": step, "qbit": qbit, "name": name, "control": control, "controlstate": 1, "control2": control2, "controlstate2": 1 };
          } else {
            console.log("This (new?) gate is not handled in code. Gate name: " + name);
            return;
          }
          
          // add optional params, in case they exist
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controlstate")) {
            let controlstate = dataTransferObj["controlstate"];
            dto["controlstate"] = controlstate;
          }
          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "controlstate2")) {
            let controlstate2 = dataTransferObj["controlstate2"];
            dto["controlstate2"] = controlstate2;
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
    duplicateGate: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let name = dataTransferObj["name"];
        let stepFirst = parseInt(dataTransferObj["stepFirst"]);
        let stepLast = parseInt(dataTransferObj["stepLast"]);
        let stepConditionExpression = dataTransferObj["stepConditionExpression"];
        let qbitFirst = parseInt(dataTransferObj["qbitFirst"]);
        let qbitLast = parseInt(dataTransferObj["qbitLast"]);
        let qbitConditionExpression = dataTransferObj["qbitConditionExpression"];
        let conjugateConditionExpression = dataTransferObj["conjugateConditionExpression"];
        
        stepFirst = Math.min(parseInt(stepFirst), parseInt(stepLast));
        stepLast = Math.max(parseInt(stepFirst), parseInt(stepLast));
        qbitFirst = Math.min(parseInt(qbitFirst), parseInt(qbitLast));
        qbitLast = Math.max(parseInt(qbitFirst), parseInt(qbitLast));
        
        let dtos = [];
        for (let s = stepFirst; s <= stepLast; s++) {
          for (let q = qbitFirst; q <= qbitLast; q++) {

            if (s == step && q == qbit) {
              continue;
            }

            let condStep = interpolateJavaScriptExpression(stepConditionExpression, s, q);
            let condQbit = interpolateJavaScriptExpression(qbitConditionExpression, s, q);
            let condConjugate = interpolateJavaScriptExpression(conjugateConditionExpression, s, q);
              
            if (evaluate(condStep) && 
                evaluate(condQbit) && 
                evaluate(condConjugate)){
              
              let dto = { "step": s, "qbit": q, "name": name };

              if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phiExpression")) {
                let phiExpression = dataTransferObj["phiExpression"];
                dto["phi"] = evaluate(interpolateJavaScriptExpression(phiExpression, s, q));
              }
              if (Object.prototype.hasOwnProperty.call(dataTransferObj, "thetaExpression")) {
                let thetaExpression = dataTransferObj["thetaExpression"];
                dto["theta"] = evaluate(interpolateJavaScriptExpression(thetaExpression, s, q));
              }
              if (Object.prototype.hasOwnProperty.call(dataTransferObj, "lambdaExpression")) {
                let lambdaExpression = dataTransferObj["lambdaExpression"];
                dto["lambda"] = evaluate(interpolateJavaScriptExpression(lambdaExpression, s, q));
              }
              if (Object.prototype.hasOwnProperty.call(dataTransferObj, "bitExpression")) {
                let bitExpression = dataTransferObj["bitExpression"];
                dto["bit"] = evaluate(interpolateJavaScriptExpression(bitExpression, s, q));
              }

              dtos.push(dto);
            }
          }
        }
        
        if (stepFirst < 0 || stepLast < 0) {
          alert("Negative steps not permitted!");
        } else if (qbitFirst < 0 || qbitLast < 0) {
          alert("Negative qbits not permitted!");
        } else if (seatsArrayIsTaken(circuitEditorModule.state, dtos)) {
          alert("Not all proposed seats are empty!");
        } else {
          if (dtos.length > 0){
            this.commit("circuitEditorModule/insertGates", dtos);
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
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let qbitNew = dataTransferObj["qbitNew"];

        if (qbitNew < 0) {
          alert("Negative steps/qbits not permitted!");
        } else if ((qbit != qbitNew) && seatIsTaken(circuitEditorModule.state, qbitNew, step)) {
          alert("A gate already exists at this location!")
        } else {
          this.commit("circuitEditorModule/removeGate", { step: step, qbit: qbit });

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
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let control = parseInt(dataTransferObj["control"]);
        let qbitNew = dataTransferObj["qbitNew"];
        let controlNew = dataTransferObj["controlNew"];
        let controlstateNew = dataTransferObj["controlstateNew"];
        let existingQbits = [qbit, control];
        let proposedQbits = [qbitNew, controlNew];
        
        if (qbitNew < 0 || controlNew < 0) {
          alert("Negative qbits not permitted!");
        } else if (((qbit != qbitNew) || (control != controlNew)) &&
          seatsAreTaken(circuitEditorModule.state, existingQbits, proposedQbits, step)) {
          alert("At least a gate already exists in the qbits ranging from proposed target to proposed control!");
        } else {
          this.commit("circuitEditorModule/removeGate", { step: step, qbit: qbit });

          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["control"] = controlNew;
          dataTransferObj["controlstate"] = controlstateNew;
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
    repositionToffoliGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let control = parseInt(dataTransferObj["control"]);
        let control2 = parseInt(dataTransferObj["control2"]);
        let qbitNew = dataTransferObj["qbitNew"];
        let controlNew = dataTransferObj["controlNew"];
        let controlstateNew = dataTransferObj["controlstateNew"];
        let controlNew2 = dataTransferObj["controlNew2"];
        let controlstateNew2 = dataTransferObj["controlstateNew2"];
        let existingQbits = [qbit, control, control2];
        let proposedQbits = [qbitNew, controlNew, controlNew2];
        
        if (qbitNew < 0 || controlNew < 0 || controlNew2 < 0) {
          alert("Negative qbits not permitted!");
        } else if (((qbit != qbitNew) || (control != controlNew) || (control2 != controlNew2)) &&
          seatsAreTaken(circuitEditorModule.state, existingQbits, proposedQbits, step)) {
          alert("At least a gate already exists in the qbits ranging from proposed target to proposed control!");
        } else {
          this.commit("circuitEditorModule/removeGate", { step: step, qbit: qbit });

          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["control"] = controlNew;
          dataTransferObj["controlstate"] = controlstateNew;
          dataTransferObj["control2"] = controlNew2;
          dataTransferObj["controlstate2"] = controlstateNew2;
          
          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj);

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    repositionSwapGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let qbit2 = parseInt(dataTransferObj["qbit2"]);
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
          this.commit("circuitEditorModule/removeGate", { step: step, qbit: qbit });
          
          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["qbit2"] = qbit2New;

          if (Object.prototype.hasOwnProperty.call(dataTransferObj, "phiNew")) {
            let phi = dataTransferObj["phiNew"];
            dataTransferObj["phi"] = phi;
          }

          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj);

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    repositionIsingGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let qbit2 = parseInt(dataTransferObj["qbit2"]);
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
          this.commit("circuitEditorModule/removeGate", { step: step, qbit: qbit });
          
          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["qbit2"] = qbit2New;
          
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
    repositionFredkinGateInCircuit: function (context, dataTransferObj) {
      return new Promise((resolve, reject) => {
        let step = parseInt(dataTransferObj["step"]);
        let qbit = parseInt(dataTransferObj["qbit"]);
        let qbit2 = parseInt(dataTransferObj["qbit2"]);
        let control = parseInt(dataTransferObj["control"]);
        let controlstateNew = dataTransferObj["controlstateNew"];
        let qbitNew = dataTransferObj["qbitNew"];
        let qbit2New = dataTransferObj["qbit2New"];
        let controlNew = dataTransferObj["controlNew"];
        let existingQbits = [qbit, qbit2, control];
        let proposedQbits = [qbitNew, qbit2New, controlNew];
        
        if (qbitNew < 0 || qbit2New < 0 || controlNew < 0) {
          alert("Negative qbits not permitted!");
        } else if (qbitNew == qbit2New) {
          alert("The two target qbits must be different!");
        } else if (qbitNew == controlNew || qbit2New == controlNew) {
          alert("The target and control qbits must be different!");
        } else if (((qbit != qbitNew) || (qbit2 != qbit2New) || (control != controlNew)) &&
          seatsAreTaken(circuitEditorModule.state, existingQbits, proposedQbits, step)) {
          alert("At least a gate already exists in the qbits ranging from proposed target to proposed control!");
        } else {
          this.commit("circuitEditorModule/removeGate", { step: step, qbit: qbit });
          
          dataTransferObj["qbit"] = qbitNew;
          dataTransferObj["qbit2"] = qbit2New;
          dataTransferObj["control"] = controlNew;
          dataTransferObj["controlstate"] = controlstateNew;

          this.dispatch('circuitEditorModule/insertGateInCircuit', dataTransferObj);

          // inserting the gate was successful
          resolve(true);
        }
        // inserting the gate failed
        reject(false);
      })
    },
    removeGateFromCircuit: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeGate", dataTransferObj);
      this.commit("circuitEditorModule/removeEmptySteps");
    },
    removeGateFromCircuitByUser: function (context, dataTransferObj) {
      this.commit("circuitEditorModule/removeGateByUser", dataTransferObj);
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
              if (Object.prototype.hasOwnProperty.call(gate, "control")) {
                if (gate.control >= qbit) {
                  gate.control = parseInt(gate.control) + 1;
                }
              }
              if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
                if (gate.control2 >= qbit) {
                  gate.control2 = parseInt(gate.control2) + 1;
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
    insertGates(context, dtos) {
      let state = circuitEditorModule.state;
      for (let i = 0; i < dtos.length; i++){
        insertingOneGateInCircuit(state, dtos[i]);
      }
    },
    removeGate(context, dto) {
      let step = parseInt(dto["step"]);
      let qbit = parseInt(dto["qbit"]);
      let state = circuitEditorModule.state;
      if (Object.prototype.hasOwnProperty.call(state, "steps")) {
        for (let i = 0; i < state.steps.length; i++) {
          if (state.steps[i].index == step) {
            let gates = state.steps[i]["gates"];
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "target")) {
                if (gate.target == qbit) {
                  gates.splice(j, 1);
                }
              }
            }
          }
        }
      }
    },
    // this is a copy of previous function, very, very bad
    removeGateByUser(context, dto) {
      let step = parseInt(dto["step"]);
      let qbit = parseInt(dto["qbit"]);
      let state = circuitEditorModule.state;
      if (Object.prototype.hasOwnProperty.call(state, "steps")) {
        for (let i = 0; i < state.steps.length; i++) {
          if (state.steps[i].index == step) {
            let gates = state.steps[i]["gates"];
            for (let j = 0; j < gates.length; j++) {
              let gate = gates[j];
              if (Object.prototype.hasOwnProperty.call(gate, "target")) {
                if (gate.target == qbit) {
                  gates.splice(j, 1);
                }
              }
            }
          }
        }
      }
    },
    removeQbit(context, dto) {
      let qbit = parseInt(dto["qbit"]);
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
      let step = parseInt(dto["step"]);
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
            if (gates.length == 0){
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
