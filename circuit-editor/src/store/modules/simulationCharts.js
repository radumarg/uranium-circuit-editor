import init, { get_probabilities, get_statevector } from './wasm/moara_js.js'
import { getUserInterfaceSetting } from "./applicationWideReusableUnits.js";

function toState(dec, totalLength, base) {

    if (base === '10'){
        return dec.toString();
    } 

    // only works for postive numbers
    let state = dec.toString(2);

    let output = "";
    for (let i = 0; i < totalLength - state.length; ++i){
        output = "0".concat(output);
    }

    return output.concat(state);
}

export function getMeasureGates(circuitStates, circuitId) {

  let measureGates = {};

  if (circuitStates != undefined) {
    extractMeasureGates(circuitStates, circuitId, measureGates, 0);
  }

  return measureGates;
}

function extractMeasureGates(circuitStates, circuitId, measureGates, qbitstart) {
  let circuitState = circuitStates[circuitId];
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates"))
      {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (gate.name == "barrier" || gate.name == "aggregate") {
            continue;
          }
          let actual_gate_target = gate.targets[0] + qbitstart;
          if (gate.name.includes("measure-")){
            measureGates[actual_gate_target] = [gate.name, gate.bit];
          }
          if (gate.name == "circuit") {
            extractMeasureGates(circuitStates, gate.circuit_id, measureGates, actual_gate_target);
          }
        }
      }
    }
  }
}

function getSeralizedCircuits(circuitStates) {

  let circuits = [];
  for (let i = 0; i < window.circuitIds.length; i++) {
    let circuit_id = window.circuitIds[i];
    let circuitState = circuitStates[circuit_id];
    circuits.push({"circuit_id": circuit_id, "circuit": circuitState })
  }
  return JSON.stringify(circuits);
}

export async function getStateProbabilities(circuitStates) {

    if (circuitStates != undefined) {
      let serializedCircuits = getSeralizedCircuits(circuitStates);
      await init('./wasm/moara_js_bg.wasm');
      let bigEndianOrdering = getUserInterfaceSetting('big-endian-ordering');
      if (bigEndianOrdering === 'true') {
        return get_probabilities(serializedCircuits, window.currentCircuitId, "bigendian");
      } else {
        return get_probabilities(serializedCircuits, window.currentCircuitId, "littleendian");
      }
    }

    return []
}

async function getStateVector(circuitStates) {

  if (circuitStates != undefined) {
    let serializedCircuits = getSeralizedCircuits(circuitStates);
    await init('./wasm/moara_js_bg.wasm');
    let bigEndianOrdering = getUserInterfaceSetting('big-endian-ordering');
    if (bigEndianOrdering === 'true') {
      return get_statevector(serializedCircuits, window.currentCircuitId, "bigendian");
    } else {
      return get_statevector(serializedCircuits, window.currentCircuitId,"littleendian");
    }
  }
  
  return []
}

export async function getStateVectorEntries(circuitStates, qubits) {

  let realValues = [];
  let imaginaryValues = [];
  let max = 0;
  let quantumStatesBase = getUserInterfaceSetting('legend-base');
  let stateVector = await getStateVector(circuitStates);
  
  for (let i = 0; i < stateVector.length; i++) {
      let complexString = stateVector[i];
      let separatorIndex = complexString.indexOf('+', 1);
      if (separatorIndex == -1) {
        separatorIndex = complexString.indexOf('-', 1);
      }
      let real = parseFloat(complexString.substring(0, separatorIndex));
      let imaginary = parseFloat(complexString.substring(separatorIndex, complexString.length - 1));
      realValues.push({ x: toState(i, qubits, quantumStatesBase), y: real });
      imaginaryValues.push({ x: toState(i, qubits, quantumStatesBase), y: imaginary });
      max = Math.max(Math.abs(real), max);
      max = Math.max(Math.abs(imaginary), max);
  }

  return {"real": realValues, "imaginary": imaginaryValues, "max": max}
}

export function getTopEntriesStateProbabilities(stateProbabilities) {

    const ENTRIES = 20;

    if (stateProbabilities === undefined || stateProbabilities.length == 0){
        return [];
    }

    let qubits = Math.log2(stateProbabilities.length);

    let initialSlice = [... stateProbabilities.slice(0, Math.min(ENTRIES, stateProbabilities.length))];

    let topEntries = [];
    for (let i = 0; i < initialSlice.length; i++){
        topEntries.push([i, initialSlice[i]])
    }
    topEntries.sort(function(a, b){return (b[1] - a[1])});
    let minProbability = topEntries[topEntries.length - 1][1];

    if (stateProbabilities.length > ENTRIES){
        for (let i = ENTRIES; i < stateProbabilities.length; i++){
            if (stateProbabilities[i] >= minProbability){
                topEntries.push([i, stateProbabilities[i]]);
                topEntries.sort(function(a, b){return (b[1] - a[1])});
                topEntries = topEntries.slice(0, ENTRIES);
                minProbability = topEntries[topEntries.length - 1][1];
            }
        }
    }

    let result = [];
    let probability = 0.0;
    let quantumStatesBase = getUserInterfaceSetting('legend-base');

    for (let i = 0; i < topEntries.length; i++){
        probability += topEntries[i][1];
        result.push({ x: toState(topEntries[i][0], qubits, quantumStatesBase), y: topEntries[i][1] })
    }

    if (probability < 1){
        result.push({ x: "everything else", y: (1.0 - probability) })
    }

    return result;
}

export function getBinnedProbabilities(fullStateProbabilities, min, max, numberOfBins) {
    
    if (fullStateProbabilities == undefined || fullStateProbabilities.length == 0){
        return [[], 0]
    }
    
    let binnedStateProbabilities = [];
    let qubits = 0;
    let maxProbability = 0;
    if (fullStateProbabilities.length > 0) {
        qubits = Math.log2(fullStateProbabilities.length);
    }
    
    let quantumStatesBase = getUserInterfaceSetting('legend-base');

    let binWidth = Math.round((max - min) / numberOfBins); 
    let binsBeforeMiddle = Math.floor(numberOfBins/2.0);
    let middle = Math.floor((max + min)/2.0);

    if ((max - min) <= numberOfBins) {
        min = Math.max(middle - binsBeforeMiddle, 0);
        max = min + numberOfBins;
        binWidth = 1;
    } else {       
        min = Math.max(middle - binsBeforeMiddle * binWidth, 0);
        max = min + numberOfBins * binWidth;
    }
    
    if (fullStateProbabilities.length === 0) {
        // display empty graph if state vector is empty
        numberOfBins = 2;
        min = 0;
        max = 2;
        binWidth = 1;
    }
    
    let accumulator = 0.0;
    let istart = 0;
    for (let i = min; i < max; i++) {
    
        if (fullStateProbabilities.length > 0)
            accumulator += fullStateProbabilities[i];

        if ((i > min || (max - min) == numberOfBins) && ((i + 1 - min) % binWidth === 0)){
            let label = toState(istart, qubits, quantumStatesBase) + '/' + toState(i, qubits, quantumStatesBase);
            if (Math.round(binWidth) == 1) {
                label = toState(i, qubits, quantumStatesBase);
            }
            binnedStateProbabilities.push({ x: label, y: accumulator });
            maxProbability = Math.max(maxProbability, accumulator);
            accumulator = 0.0;
            istart = i + 1;
        }
    }
    if (istart < max - 1){
        binnedStateProbabilities.push({ x: toState(istart, qubits, quantumStatesBase) + '/' + toState(max - 1,  qubits, quantumStatesBase), y: accumulator });
        maxProbability = Math.max(maxProbability, accumulator);
    }


    return [binnedStateProbabilities, maxProbability];
}
