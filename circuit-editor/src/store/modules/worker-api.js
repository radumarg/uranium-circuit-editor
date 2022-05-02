// wrapper over worker.js

import MeasureGatesWorker from 'worker-loader!./measure-gates-worker.js';
import CircuitGatesWorker from 'worker-loader!./circuit-gates-worker.js';
import { accomodateModifiedCircuitGate } from "./editorHelper"
import { getNoQbits } from "./gatesTable.js"
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
      acommodateModifiedCircuitGateProjectWide()
    } else {
      let insertMoreQubits = confirm(message);
      if (insertMoreQubits) {
        acommodateModifiedCircuitGateProjectWide();
      } else {
        // do not update project state, prompt user
        alert("In this case, please undo your last change because the current state of your project is inconsistent.");
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

function acommodateModifiedCircuitGateProjectWide() {
  let noModifiedCircuitQubits = getNoQbits(store.state.circuitEditorModule[window.currentCircuitId]);
  for (let i = 0; i < window.circuitIds.length; i++) {
    let circuitId = window.circuitIds[i];
    if (circuitId == window.currentCircuitId) continue;
    accomodateModifiedCircuitGate(store, store.state.circuitEditorModule[circuitId], circuitId, noModifiedCircuitQubits, window.currentCircuitId);
  }
}