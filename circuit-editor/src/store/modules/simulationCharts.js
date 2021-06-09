import init, { simulate } from '../../wasm/moara_js/moara_js.js'

function toState(dec, totalLength) {

    // only works for postive numbers
    let state = dec.toString(2);
    
    let output = "";
    for (let i = 0; i < totalLength - state.length; ++i){
        output = "0".concat(output);
    }
    
    return output.concat(state);
}

export async function getStateVector(circuitState) {
    let stateVector = [];

    if (circuitState != undefined) {
        let serializedCircuit = JSON.stringify(circuitState);
        
        await init('../../wasm/moara_js/moara_js_bg.wasm');
        //let circ = '{"steps": [{"index": 2,"gates": []},{"index": 1,"gates": [{"name": "ctrl-pauli-x","target": 1,"control": 0}]},{"index": 0,"gates": [{"name": "hadamard","target": 0}]}]}';
        
        let simulationResult = simulate(serializedCircuit, 1024);

        for (let i = 0; i < simulationResult.length; i++) {
            stateVector[i] = { x: i, y: simulationResult[i] };
        }
    }

    return stateVector;
}

export function getTopEntriesStateVector(stateVector) {

    if (stateVector === undefined){
        return [];
    }

    let qubits = 0;
    if (stateVector.length > 0) {
        qubits = Math.log2(stateVector.length);
    }

    stateVector.sort(function(a, b){return (b.y - a.y)});
    let topEntries = stateVector.slice(0, Math.min(20, stateVector.length));

    let result = [];

    let probability = 0.0;
    for (let i = 0; i < topEntries.length; i++){
        probability += topEntries[i].y;
        result.push({ x: toState(i, qubits), y: topEntries[i].y })
    }

    if (probability < 1){
        result.push({ x: "everything else", y: (1.0 - probability) })
    }

    return result;
}

export function getBinnedStateVector(fullStateVector, min, max, numberOfBins) {
    
    let binnedStateVector = [];
    let qubits = 0;
    if (fullStateVector.length > 0) {
        qubits = Math.log2(fullStateVector.length);
    }

    if (fullStateVector != undefined) {

        if ((max - min) <= numberOfBins){
            for (let i = min; i < max; i++) {
                if (fullStateVector.length > 0) {
                    binnedStateVector.push({ x: toState(i, qubits), y: fullStateVector[i].y });
                } else {
                    binnedStateVector.push({ x: toState(i, qubits), y: 0.0 }); 
                }
            }
        } else {
            let accumulator = 0.0;
            let binWidth = Math.ceil((max - min) / numberOfBins);
            for (let i = min; i < max; i++) {
                if (fullStateVector.length > 0) {
                    accumulator += fullStateVector[i].y;
                }
                if ((i > min) && ((i - min) % binWidth == 0)){
                    binnedStateVector.push({ x: toState(i, qubits), y: accumulator });
                    accumulator = 0.0;
                }
            }
        }
    }

    return binnedStateVector;
}
