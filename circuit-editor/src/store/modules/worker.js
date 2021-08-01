// worker thread used to perform some calculation outside the main javascript thread

import { classicBitsAreValid, measureGatesArePositionedLast } from "./gatesTable.js"

self.addEventListener('message', e => {

  let circuitSate = e.data;

  let classicBitsAreOk = classicBitsAreValid(circuitSate);
  if (!classicBitsAreOk){
    self.postMessage("Some of the classic bits have values larger than the maximum qbit index. Please undo you last change.");
    return;
  }

  let measureGatesAreOk = measureGatesArePositionedLast(circuitSate);
  if (!measureGatesAreOk){
    self.postMessage("Measure gates must always be positioned last on any qubit. Please undo you last change.");
    return;
  }

  self.postMessage("");
});