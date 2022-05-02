// worker thread used to perform some calculation outside the main javascript thread

import { getNoQbits } from "./gatesTable.js"
import { canAccomodateCircuitGate } from "./editorHelper"

self.addEventListener('message', e => {

  let circuitStates = e.data[0];
  let modifiedCircuitId = e.data[1];

  let noModifiedCircuitQubits = getNoQbits(circuitStates[modifiedCircuitId]);

  let circuitIds = Object.keys(circuitStates);
  for (let i = 0; i < circuitIds.length; i++) {
    let circuitId = circuitIds[i];
    if (circuitId == modifiedCircuitId) continue;
    if (!canAccomodateCircuitGate(circuitStates[circuitId], modifiedCircuitId, noModifiedCircuitQubits)) {
      self.postMessage("You have increased the size of this circuit but there is not enough free space available in some \
other circuit(s) where this gate is being reused as a stand-alone gate. Would you like to add more qubits there in order \
to accomodate your increased circuit size ?");
      return;
    }
  }
  self.postMessage("Enough free spots exists.");
  return;
});