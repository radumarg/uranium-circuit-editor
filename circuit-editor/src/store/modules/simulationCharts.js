let qubits = 15.0;
let maxState = 2.0 ** qubits;

export function getStateVector (circuitState) {

    let stateVector = [];

    if (circuitState != undefined) {

        for (let i = 0; i < maxState; i++) {
            stateVector.push({ x: i.toString(), y: 0.0 });
        }

        let remainingProbability = 1.0;
        while (remainingProbability > 0) {
            let stateIndex = Math.floor(Math.random() * maxState);
            let prob = Math.random() * remainingProbability / 4;
            let updatedProbability = stateVector[stateIndex].y + prob;
            stateVector[stateIndex] = { x: stateIndex.toString(), y: updatedProbability }
            remainingProbability -= prob;

            if (remainingProbability < 0.0000000001){
                let updatedProbability = stateVector[0].y + remainingProbability;
                stateVector[0] = { x: stateIndex.toString(), y: updatedProbability }
                break;
            }
        }
    }

    return stateVector;
}

export function getTopEntriesStateVector(stateVector) {

    if (stateVector === undefined){
        return [];
    }

    stateVector.sort(function(a, b){return (b.y - a.y)});
    let topEntries = stateVector.slice(0, Math.min(16, stateVector.length));
    let probability = 0.0;
    for (let i = 0; i < topEntries.length; i++){
        probability += topEntries[i].y;
    }
    if (probability < 1){
        topEntries.push({ x: "everything else", y: (1.0 - probability) })
    }

    return topEntries;
}

export function getBinnedStateVector(fullStateVector, min, max, numberOfBins) {
    
    let binnedStateVector = [];

    if (fullStateVector != undefined) {

        if ((max - min) < numberOfBins){
            for (let i = min; i < max; i++) {
                if (fullStateVector.length > 0) {
                    binnedStateVector.push({ x: i.toString(), y: fullStateVector[i].y });
                } else {
                    binnedStateVector.push({ x: i.toString(), y: 0.0 }); 
                }
            }
        } else {
            let accumulator = 0.0;
            let binWidth = Math.round((max - min) / numberOfBins);
            for (let i = min; i < max; i++) {
                if (fullStateVector.length > 0) {
                    accumulator += fullStateVector[i].y;
                }
                if ((i > min) && ((i - min) % binWidth == 0)){
                    let middle = Math.floor(i - binWidth / 2.0);
                    binnedStateVector.push({ x: middle.toString(), y: accumulator });
                    accumulator = 0.0;
                }
            }
        }
    }

    return binnedStateVector;
}
