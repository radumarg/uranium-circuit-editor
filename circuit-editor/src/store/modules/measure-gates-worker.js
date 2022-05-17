// worker thread used to perform some calculation outside the main javascript thread

import { classicBitsAreValid, measureGatesArePositionedLast } from "./gatesTable.js"

self.addEventListener('message', e => {

  
  let circuitStates = e.data[0];
  let modifiedCircuitId = e.data[1];
  let modifiedCircuitState = circuitStates[modifiedCircuitId];

  let classicBitsAreOk = classicBitsAreValid(modifiedCircuitState);
  if (!classicBitsAreOk){
    self.postMessage("Some of the classic bits have values larger than the maximum qbit index. Please undo you last change.");
    return;
  }

  let qubitStart = 0;
  let collectedMeasureGates = [];
  let measureGatesAreOk = measureGatesArePositionedLast(circuitStates, modifiedCircuitId, collectedMeasureGates,  qubitStart);
  if (!measureGatesAreOk){
    self.postMessage("Measure gates must always be positioned last on any qubit. Please undo you last change.");
    return;
  }

  self.postMessage("");
});