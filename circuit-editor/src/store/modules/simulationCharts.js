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

    if (stateProbabilities === undefined){
        return [];
    }

    let qubits = 0;
    if (stateProbabilities.length > 0) {
        qubits = Math.log2(stateProbabilities.length);
    }

    stateProbabilities.sort(function(a, b){return (b - a)});
    let topEntries = stateProbabilities.slice(0, Math.min(20, stateProbabilities.length));

    let result = [];

    let probability = 0.0;
    for (let i = 0; i < topEntries.length; i++){
        probability += topEntries[i];
        result.push({ x: toState(i, qubits), y: topEntries[i] })
    }

    if (probability < 1){
        result.push({ x: "everything else", y: (1.0 - probability) })
    }

    return result;
}

export function getBinnedProbabilities(fullStateProbabilities, min, max, numberOfBins) {
    
    let binnedStateProbabilities = [];
    let qubits = 0;
    let maxProbability = 0;
    if (fullStateProbabilities.length > 0) {
        qubits = Math.log2(fullStateProbabilities.length);
    }

    let quantumStatesBase = Vue.$cookies.get('legend-base');
    
    if (fullStateProbabilities != undefined) {

        if (fullStateProbabilities.length == 0) {
            // display empty graph if state vector is empty
            numberOfBins = 32;
        }

        if ((max - min) <= numberOfBins){
            for (let i = min; i < max; i++) {
                if (fullStateProbabilities.length > 0) {
                    binnedStateProbabilities.push({ x: toState(i, qubits, quantumStatesBase), y: fullStateProbabilities[i] });
                    maxProbability = Math.max(maxProbability, fullStateProbabilities[i]);
                } else {
                    binnedStateProbabilities.push({ x: toState(i, qubits, quantumStatesBase), y: 0.0 }); 
                }
            }
        } else {
            let accumulator = 0.0;
            let istart = 0;
            let binWidth = Math.ceil((max - min) / numberOfBins);
            for (let i = min; i < max; i++) {
                if (fullStateProbabilities.length > 0) {
                    accumulator += fullStateProbabilities[i];
                }
                if ((i > min) && ((i - min) % binWidth == 0)){
                    binnedStateProbabilities.push({ x: toState(istart, qubits, quantumStatesBase) + '/' + toState(i, qubits, quantumStatesBase), y: accumulator });
                    maxProbability = Math.max(maxProbability, accumulator);
                    accumulator = 0.0;
                    istart = i + 1;
                }
            }
            if (accumulator > 0){
                binnedStateProbabilities.push({ x: toState(istart, qubits, quantumStatesBase) + '/' + toState(max - 1,  qubits, quantumStatesBase), y: accumulator });
                maxProbability = Math.max(maxProbability, accumulator);
            }
        }
    }

    return [binnedStateProbabilities, maxProbability];
}
