import init, { get_probabilities, get_statevector } from './wasm/moara_js.js'
import { getUserInterfaceSetting } from "./utils.js";

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

export async function getMeasureGates(circuitState) {

  let measureGates = {};

  if (circuitState != undefined) {
    if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
      for (let i = 0; i < circuitState.steps.length; i++) {
        if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates"))
        {
          let gates = circuitState.steps[i]["gates"];
          for (let j = 0; j < gates.length; j++) {
            let gate = gates[j];
            if (gate.name.includes("measure-")){
              measureGates[gate.target] = [gate.name, gate.bit];
            }
          }
        }
      }
    }
  }

  return measureGates;
}

export async function getStateProbabilities(circuitState) {

    if (circuitState != undefined) {
      let serializedCircuit = JSON.stringify(circuitState);
      await init('./wasm/moara_js_bg.wasm');
      return get_probabilities(serializedCircuit);
    }

    return []
}

async function getStateVector(circuitState) {

  if (circuitState != undefined) {
    let serializedCircuit = JSON.stringify(circuitState);
    await init('./wasm/moara_js_bg.wasm');
    return get_statevector(serializedCircuit);
  }
  
  return []
}

export async function getStateVectorEntries(circuitState, qubits) {

  let realValues = [];
  let imaginaryValues = [];
  let max = 0;
  let quantumStatesBase = getUserInterfaceSetting('legend-base');
  let stateVector = await getStateVector(circuitState);
  
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

    if (stateProbabilities === undefined){
        return [];
    }

    let qubits = 0;
    if (stateProbabilities.length > 0) {
        qubits = Math.log2(stateProbabilities.length);
    }

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
    
    if (fullStateProbabilities == undefined){
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

        if ((i > min || (max - min) == numberOfBins) && ((i - min) % binWidth === 0)){
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
    if (accumulator > 0){
        binnedStateProbabilities.push({ x: toState(istart, qubits, quantumStatesBase) + '/' + toState(max - 1,  qubits, quantumStatesBase), y: accumulator });
        maxProbability = Math.max(maxProbability, accumulator);
    }


    return [binnedStateProbabilities, maxProbability];
}
