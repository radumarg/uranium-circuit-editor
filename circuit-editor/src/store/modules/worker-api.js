// wrapper over worker.js

import MeasureGatesWorker from 'worker-loader!./measure-gates-worker.js';
import CircuitGatesWorker from 'worker-loader!./circuit-gates-worker.js';
import { getNoQbits, getNoSteps } from "./gatesTable"
import { accomodateModifiedCircuitGate } from "./editorHelper"
import store from '../index.js';

const measureGatesWorker = new MeasureGatesWorker();
const circuitGatesWorker = new CircuitGatesWorker();

measureGatesWorker.addEventListener('message', (e) => {
  let message = e.data;
  if (message){
    alert(message);
  }
});

circuitGatesWorker.addEventListener('message', (e) => {
  let message = e.data;
  if (message){
    if (message == "Enough free spots exists.") {
      acommodateModifiedCircuitGateProjectWide(window.currentCircuitId);
      warnUserIfMoreEditorSpaceIsNeeded();
    } else {
      let insertMoreQubits = confirm(message);
      if (insertMoreQubits) {
        acommodateModifiedCircuitGateProjectWide(window.currentCircuitId);
        warnUserIfMoreEditorSpaceIsNeeded();
      } else {
        // do not update project state, prompt user instead to undo its last change
        alert("In this case, please undo your last change because the current state of your project is not self-consistent.");
      }
    }
  }
});

export function sendMeasureGatesWorkerMessage(msg){
  measureGatesWorker.postMessage(msg);
}

export function sendCircuitGatesWorkerMessage(msg){
  circuitGatesWorker.postMessage(msg);
}

function acommodateModifiedCircuitGateProjectWide(currentCircuitId) {
  for (let i = 0; i < window.circuitIds.length; i++) {
    let circuitId = window.circuitIds[i];
    if (circuitId == window.currentCircuitId) continue;
    if (circuitId == currentCircuitId) continue;
    let circuitStateWasUpdated = accomodateModifiedCircuitGate(store, circuitId, currentCircuitId);
    if (circuitStateWasUpdated) {
      acommodateModifiedCircuitGateProjectWide(circuitId);
    }
  }
}

function warnUserIfMoreEditorSpaceIsNeeded() {
  let maxSteps = 0;
  let maxQubits = 0;
  for (let i = 0; i < window.circuitIds.length; i++) {
    let circuitId = window.circuitIds[i];
    let noSteps = getNoSteps(store.state.circuitEditorModule[circuitId]);
    maxSteps = Math.max(maxSteps, noSteps);
    let noQubits = getNoQbits(store.state.circuitEditorModule[circuitId]);
    maxQubits = Math.max(maxQubits, noQubits);
  }
  maxSteps += 2;
  maxQubits += 2;

  if ((maxSteps * 2 > window.gatesTable.columns) && (maxQubits * 2 > window.gatesTable.rows)) {
    alert(`You should increase the number of steps/qubits from the toolbar button. At least ${maxSteps} steps and ${maxQubits} qubits are needed to display each circuit in you current project.`);
  } else if (maxSteps * 2 > window.gatesTable.columns) {
    alert(`You should increase the number of steps from the toolbar button. At least ${maxSteps} steps are needed to display each circuit in you current project.`);
  } else if (maxQubits * 2 > window.gatesTable.rows) {
    alert(`You should increase the number of qubits from the toolbar button. At least ${maxQubits} qubits are needed to display each circuit in you current project.`);
  }
}