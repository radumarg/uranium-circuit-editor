import Vue from 'vue';
import init, { get_probabilities } from './wasm/moara_js.js'

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

export async function getStateProbabilities(circuitState) {

    if (circuitState != undefined) {
        let serializedCircuit = JSON.stringify(circuitState);
        await init('./wasm/moara_js_bg.wasm');
        return get_probabilities(serializedCircuit);
    }

    return []
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

    let topEntries = [... stateProbabilities.slice(0, Math.min(ENTRIES, stateProbabilities.length))];
    topEntries.sort(function(a, b){return (b - a)});
    if (stateProbabilities.length > ENTRIES){
        for (let i = ENTRIES; i < stateProbabilities.length; i++){
            let min = Math.min(...topEntries);
            if (stateProbabilities[i] >= min){
                topEntries.push(stateProbabilities[i]);
                topEntries.sort(function(a, b){return (b - a)});
                topEntries = topEntries.slice(0, ENTRIES);
            }
        }
    }

    let result = [];
    let probability = 0.0;
    let quantumStatesBase = Vue.$cookies.get('legend-base');

    for (let i = 0; i < topEntries.length; i++){
        probability += topEntries[i];
        result.push({ x: toState(i, qubits, quantumStatesBase), y: topEntries[i] })
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
    
    let quantumStatesBase = Vue.$cookies.get('legend-base');

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
    
    if (fullStateProbabilities.length == 0) {
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

        if ((i > min || (max - min) == numberOfBins) && ((i - min) % binWidth == 0)){
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
