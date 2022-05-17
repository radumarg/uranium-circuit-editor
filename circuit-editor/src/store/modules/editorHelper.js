/* 
   Helper code for vuex store.
*/
import $ from "jquery";
import { getUserInterfaceSetting } from "./applicationWideReusableUnits.js";
import { arraysHaveElementsInCommon } from "./javaScriptUtils.js";
import { seatsAreTaken } from "./gatesTable.js";
import { create, all } from 'mathjs'

// reduce the security risk by not allwing to evaluate arbitrary js
// expressions: https://mathjs.org/docs/expressions/security.html
const math = create(all);
const limitedEvaluate = math.evaluate;
math.import({
  'import':     function () { throw new Error('Function import is disabled') },
  'createUnit': function () { throw new Error('Function createUnit is disabled') },
  'evaluate':   function () { throw new Error('Function evaluate is disabled') },
  'parse':      function () { throw new Error('Function parse is disabled') },
  'simplify':   function () { throw new Error('Function simplify is disabled') },
  'derivative': function () { throw new Error('Function derivative is disabled') }
}, { override: true })

export function getClosestControlledGates(circuitState, step, qubit) {
  
  let closestGates = [];
  let minDistance = Infinity;
  let nonControlledGates = ['identity', 'measure-x', 'measure-y', 'measure-z'];

  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (!nonControlledGates.includes(gate.name) && Object.prototype.hasOwnProperty.call(gate, "targets")) {
            for (let i = 0; i < gate.targets.length; i++) {
              let target = gate.targets[i];
              let delta = Math.abs(target - qubit);
              if (delta < minDistance){
                closestGates = [JSON.parse(JSON.stringify(gate))];
                minDistance = delta;
              } else if (delta == minDistance) {
                closestGates.push(gate);
              }
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
            for (let i = 0; i < gate.gates.length; i++) {
              let aggregatedGate = gate.gates[i];
              for (let j = 0; j < aggregatedGate.targets.length; j++) {
                let target = aggregatedGate.targets[j];
                let delta = Math.abs(target - qubit);
                if (delta < minDistance){
                  closestGates = [JSON.parse(JSON.stringify(gate))];
                  minDistance = delta;
                } else if (delta == minDistance) {
                  closestGates.push(gate);
                }
              }
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
            for (let i = 0; i < gate.controls.length; i++) {
              let control = gate.controls[i].target;
              let delta = Math.abs(control - qubit);
              if (delta < minDistance){
                closestGates = [JSON.parse(JSON.stringify(gate))];
                minDistance = delta;
              } else if (delta == minDistance) {
                closestGates.push(gate);
              }
            }
          }
        }
      }
    }
  }

  return closestGates;
}

export function removingBarrierFromCircuit(circuitState, dto){
  let stepIndex = dto["step"];
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let j = 0; j < circuitState.steps.length; j++) {
      let step = circuitState.steps[j];
      if (step.index == stepIndex) {
        let gates = step["gates"];
        for (let i = 0; i < gates.length; i++) {
          gates.splice(0, 1);
        }
      }
    }
  }
}

export function removingGateFromCircuit(circuitState, dto){
  let step = dto["step"];
  
  let target = null;
  if (dto["targets"]) {
    target = dto["targets"][0];
  } else if (dto["gates"]) {
    target = dto["gates"][0].targets[0];
  }

  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {

          let gate = gates[j];

          if (gate.name == "barrier") {
            gates.splice(j, 1);
            return;
          }
          if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
            if (gate.targets.includes(target)) {
              gates.splice(j, 1);
              return;
            }
          }
          if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
            for (let k = 0; k < gate.gates.length; k++) {
              let aggregatedGate = gate.gates[k];
              if (aggregatedGate.targets.includes(target)) {
                gates.splice(j, 1);
                return;
              }
            }
          }
        }
      }
    }
  }
}

export function insertingOneQbit(state, qbit) {
  if (Object.prototype.hasOwnProperty.call(state, "steps")) {
    for (let i = 0; i < state.steps.length; i++) {
      if (Object.prototype.hasOwnProperty.call(state.steps[i], "gates")) {
        let gates = state.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];

          if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
            let targets = [...gate.targets];
            for (let k = 0; k < targets.length; k++){
              if (targets[k] >= qbit) {
                targets[k] += 1;
              }
            }
            gate.targets = targets;
          }

          if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
            for (let k = 0; k < gate["controls"].length; k++) {
              let controlInfo = gate["controls"][k];
              let target = controlInfo["target"];
              if (target >= qbit) {
                controlInfo["target"] += 1;
              }
            }
          }

          if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
            for (let k = 0; k < gate["gates"].length; k++) {
              let aggregatedGate = gate["gates"][k];
              for (let l = 0; l < aggregatedGate.targets.length; l++) {
                let target = aggregatedGate.targets[l];
                if (target >= qbit) {
                  aggregatedGate.targets[l] += 1;
                }
              }
            }
          }
        }
      }
    }
  }
}

export function insertingOneGateInCircuit(circuitState, dto) {

  let step = dto["step"];
  let name = dto["name"];

  let gate = { "name": name };

  if (Object.prototype.hasOwnProperty.call(dto, "circuit_id")) {
    let circuitId = dto["circuit_id"];
    gate["circuit_id"] = parseInt(circuitId);
  }
  if (Object.prototype.hasOwnProperty.call(dto, "circuit_abbreviation")) {
    let circuitAbbreviation = dto["circuit_abbreviation"];
    gate["circuit_abbreviation"] = circuitAbbreviation;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "circuit_power")) {
    let circuitPower = dto["circuit_power"];
    gate["circuit_power"] = parseInt(circuitPower);
  }
  if (Object.prototype.hasOwnProperty.call(dto, "targets_expression")) {
    let targetsExpression = dto["targets_expression"];
    gate["targets_expression"] = targetsExpression;
  }

  if (Object.prototype.hasOwnProperty.call(dto, "targets")) {
    let targets = dto["targets"];
    gate["targets"] = [...targets];
  }

  if (Object.prototype.hasOwnProperty.call(dto, "controls") &&
    Object.prototype.hasOwnProperty.call(dto, "controlstates")) {
    let controls = dto["controls"];
    let controlstates = dto["controlstates"];
    gate["controls"] = []
    for (let i = 0; i < controls.length; i++) {
        gate["controls"].push(
            { "target": controls[i], "state": controlstates[i] }
        );
    }
  }
  
  if (Object.prototype.hasOwnProperty.call(dto, "phi")) {
    let phi = dto["phi"];
    gate["phi"] = phi;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "theta")) {
    let theta = dto["theta"];
    gate["theta"] = theta;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "lambda")) {
    let lambda = dto["lambda"];
    gate["lambda"] = lambda;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "root")) {
    let root = dto["root"];
    gate["root"] = root;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "bit")) {
    let bit = dto["bit"];
    gate["bit"] = bit;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "gates")) {
    let gates = dto["gates"];
    gate["gates"] = JSON.parse(JSON.stringify(gates));
  }

  if (!Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    circuitState.steps = []
  }

  // try to find a step if it already exists
  for (let i = 0; i < circuitState.steps.length; i++) {
    if (circuitState.steps[i].index == step) {
      let gates = circuitState.steps[i]["gates"] ? circuitState.steps[i]["gates"] : [];
      gates.push(gate);
      gates.sort((l, r) => (Math.min(...getTargets(l)) - Math.min(...getTargets(r))));
      return;
    } 
  }

  // step does not exist, add new
  circuitState.steps.push({ "index": step, "gates": [gate] });
  circuitState.steps.sort((l, r) => (l.index - r.index));
} 

function getTargets(gate) {
  if (gate.targets) return [...gate.targets];
  else {
    let targets = [];
    for (let i = 0; i < gate.gates; ++i) {
      targets.push(...gate.gates[i].targets);
    }
    return targets;
  }
}

export function interpolateJavaScriptExpression(expression, s, q, j) {
  
  if (typeof expression == "number") return expression;

  expression = expression.trim();
  expression = expression.replaceAll("False", "false");
  expression = expression.replaceAll("FALSE", "false");
  expression = expression.replaceAll("True", "true");
  expression = expression.replaceAll("TRUE", "true");
  expression = expression.replace(/q/g, `${q}`);
  if (j !== undefined){
    expression = expression.replace(/j/g, `${j}`);
  }

  let result = "";

  // replace all s-es except s in False
  for (var i = 0; i < expression.length; i++) {

    if (i < 3) {
      if (expression[i] == "s") result += `${s}`;
      else result += expression[i];
    } else if (expression.length >= i + 2 && expression.substring(i - 3, i + 2).toLowerCase() == "false"){
      result += "s";
    } else {
      if (expression[i] == "s") result += `${s}`;
      else result += expression[i];
    }
  }

  return result;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function undoGatesSelection(resetQubits=true, overrideAll=false) {
  
  let backgroundColor = undefined;
  if (getUserInterfaceSetting("dark-theme") === 'true'){
    backgroundColor = window.darkBackgroundColor;
  } else {
    if (getUserInterfaceSetting("colored-gates") === 'true'){
      backgroundColor = window.lightBackgroundColor;
    } else {
      backgroundColor = window.whiteBackgroundColor;
    }
  }

  let rgb = hexToRgb(window.selectBackgroundColor);
  let selectColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
  $('img').each(function() {
    let id = $(this).attr('id');
    if (id != undefined && id.match(/^\d+_\d+$/)){
      if($(this).css('background-color') == selectColor || overrideAll){
        $(this).css('background-color', backgroundColor);
      }
    }
  });

  $('.editor-circuit-gate-div').each(function() {
    if($(this).css('background-color') == selectColor || overrideAll){
      $(this).css('background-color', backgroundColor);
    }
  });

  if (resetQubits){
    window.selectQbitStart = null;
    window.selectQbitStop = null;
    window.selectStepStart = null;
    window.selectStepStop = null;
  }
}

export function isDefined(value){ 
  return (Boolean(value) || value === 0);
}

export function stepContainsGates(circuitState, stepIndex) {
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      let step = circuitState.steps[i];
      if (stepIndex == step.index) {
        if (Object.prototype.hasOwnProperty.call(step, "gates")) {
          let gates = step["gates"];
          if (gates.length > 0) {
            return true;
          } else {
            break;
          }
        }
      }
    }
  }
  return false;
}

export function handleSelectEvent(qbit, step) {
  if (isDefined(window.selectQbitStart) && isDefined(window.selectStepStart)){
    if (isDefined(window.selectQbitStop) && isDefined(window.selectStepStop)){
      undoGatesSelection(false, false);
      window.selectQbitStart = qbit;
      window.selectStepStart = step;
      window.selectQbitStop = null;
      window.selectStepStop = null;
      let img = document.getElementById(`${qbit}_${step}`);
      img.style.background = window.selectBackgroundColor;
    } else {
      if (window.selectQbitStart != qbit || window.selectStepStart != step){
        window.selectQbitStop = qbit;
        window.selectStepStop = step;
        let qmin = Math.min(window.selectQbitStart, window.selectQbitStop);
        let qmax = Math.max(window.selectQbitStart, window.selectQbitStop);
        let smin = Math.min(window.selectStepStart, window.selectStepStop);
        let smax = Math.max(window.selectStepStart, window.selectStepStop);
        for (let q = qmin; q <= qmax; q++) {
          for (let s = smin; s <= smax; s++) {
            let img = document.getElementById(`${q}_${s}`);
            img.style.background = window.selectBackgroundColor;
          }
        }
      }
    }
  } else {
    window.selectQbitStart = qbit;
    window.selectStepStart = step;
    let img = document.getElementById(`${qbit}_${step}`);
    img.style.background = window.selectBackgroundColor;
  }
}

export function saveCopiedGates(circuitState, qbitStart, qbitStop, stepStart, stepStop) {
  
  let copiedGates = [];
  
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      let stepIndex = parseInt(circuitState.steps[i].index);
      if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {

          let gate = gates[j];
          let targetsForGate = gate.targets ? [...gate.targets] : getAggregatedGatesTargets(gate);

          let copiedGate = {"step": stepIndex - stepStart, "name": gate.name };
          
          if (gate.name == "barrier"){
            if (stepIndex >= stepStart &&
                stepIndex <= stepStop) {
                  copiedGates.push(copiedGate);
                }
            continue;
          } else if (
              Math.min(...targetsForGate) >= qbitStart &&
              Math.max(...targetsForGate) <= qbitStop &&
              stepIndex >= stepStart &&
              stepIndex <= stepStop) 
          {
            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              let targets = gate.targets ? gate.targets : [];
              copiedGate.targets = targets.map(function(value) {return value - qbitStart;});
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              let controls = [];
              let controlstates = [];
              for (let i = 0; i < gate["controls"].length; i++) {
                let controlInfo = gate["controls"][i];
                controls.push(controlInfo["target"]);
                controlstates.push(controlInfo["state"]);
              }
              copiedGate.controls = controls.map(function(value) {return value - qbitStart;});
              copiedGate.controlstates = controlstates;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
              let gates = gate["gates"];
              copiedGate.gates = JSON.parse(JSON.stringify(gates));
              for (let k = 0; k < copiedGate.gates.length; k++) {
                let aggregatedGate = copiedGate.gates[k];
                aggregatedGate.targets = aggregatedGate.targets.map(function(value) {return value - qbitStart;});
              }
            }
            if (Object.prototype.hasOwnProperty.call(gate, "theta")) {
              copiedGate.theta = gate.theta;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "phi")) {
              copiedGate.phi = gate.phi;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "lambda")) {
              copiedGate.lambda = gate.lambda;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "root")) {
              copiedGate.root = gate.root;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "bit")) {
              copiedGate.bit = gate.bit;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "circuit_id")) {
              copiedGate.circuit_id = gate.circuit_id;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "circuit_abbreviation")) {
              copiedGate.circuit_abbreviation = gate.circuit_abbreviation;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "circuit_power")) {
              copiedGate.circuit_power = gate.circuit_power;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "targets_expression")) {
              copiedGate.targets_expression = gate.targets_expression;
            }

            copiedGates.push(copiedGate);
          }
        }
      }
    }
  }

  window.navigator.clipboard.writeText(JSON.stringify(copiedGates))
  .then(() => {
    // Success!
  })
  .catch(() => {
    alert("Failed to save text to clipboard. Perhaps your browser does not support the Async Clipboard API.");
  });
}

export function getPastedGates(qbitStart, stepStart){
  return window.navigator.clipboard.readText()
  .then(text => {
    try {
      let gates = [];
      let copiedGates = JSON.parse(text);
      const negative = (element) => element < 0;
      if (Object.prototype.hasOwnProperty.call(copiedGates, "length")) {
        for (let i = 0; i < copiedGates.length; i++){
          let gate = { ... copiedGates[i]};
          if (Object.prototype.hasOwnProperty.call(gate, "step")){
            gate.step = gate.step + stepStart;
            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              let targets = gate.targets;
              gate.targets = targets.map(function(value) {return value + qbitStart;});
            }
            if (gate.targets && gate.targets.some(negative)) {
              throw new Error("Negative target qubits not permitted.");
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              let controls = gate.controls;
              gate.controls = controls.map(function(value) {return value + qbitStart;});
            }
            if (gate.controls && gate.controls.some(negative)) {
              throw new Error("Negative control qubits not permitted.");
            }
            if (Object.prototype.hasOwnProperty.call(gate, "gates")) {
              for (let j = 0; j < gate["gates"].length; j++){
                let aggregatedGate = gate["gates"][j];
                aggregatedGate.targets = aggregatedGate.targets.map(function(value) {return value + qbitStart;});
              }
            }
            if (gate.name.includes("measure")){
              gate.bit = gate.targets[0];
            }
            gates.push(gate);
          }
        }
      }

      return gates;
    } catch (e) {
      //alert(e.message);
      return [];
    }
  })
  .catch(err => {
    alert("Failed to retrieve data from clipboard: " + err);
  });
}

export function extractSelectionRange() {

  if (!isDefined(window.selectQbitStart) || 
      !isDefined(window.selectStepStart)){
    return [];
  }

  let qbitStart = window.selectQbitStart;
  let qbitStop = qbitStart;
  if (isDefined(window.selectQbitStop)){
    qbitStop = window.selectQbitStop;
  }

  let stepStart = window.selectStepStart;
  let stepStop = stepStart;
  if (isDefined(window.selectStepStop)){
    stepStop = window.selectStepStop;
  }

  let qmin = Math.min(qbitStart, qbitStop);
  let qmax = Math.max(qbitStart, qbitStop);
  let smin = Math.min(stepStart, stepStop);
  let smax = Math.max(stepStart, stepStop);
  
  return [qmin, qmax, smin, smax]
}

// Detect situations where proposed gates do not allocate
// distinct qubits for each target and each control 
export function proposedNewGatesAreInvalid(dtos) {
  for (let i = 0; i < dtos.length; i++) {

    let noExpectedQubits = 0;
    let targets = [];
    let controls = [];
    let aggregatedGatesTargets = [];

    if (Object.prototype.hasOwnProperty.call(dtos[i], "targets")) {
      targets = dtos[i]["targets"];
      noExpectedQubits += targets.length;
    }
    if (Object.prototype.hasOwnProperty.call(dtos[i], "controls")) {
      controls = dtos[i]["controls"];
      noExpectedQubits += controls.length;
    }
    if (Object.prototype.hasOwnProperty.call(dtos[i], "gates")) {
      let gates = dtos[i]["gates"];
      for (let i = 0; i < gates.length; i++) {
        let gate = gates[i];
        aggregatedGatesTargets.push(...gate.targets);
        noExpectedQubits += gate.targets.length;
      }
    }

    let distinctQbits = [...targets, ...controls, ...aggregatedGatesTargets]
      // x - item in array
      // i - index of item
      // a - array reference
      .filter((x, i, a) => a.indexOf(x) == i);

    if (distinctQbits.length != noExpectedQubits) return true;
  }
  return false; 
}

// Verify if the some of the new proposed seats overlap
export function proposedNewSeatsOverlap(dtos) {
  for (let i = 0; i < dtos.length; i++) {
    let step = dtos[i]["step"];
    let controls = [];
    let targets = [];
    let aggregatedGatesTargets = [];

    if (Object.prototype.hasOwnProperty.call(dtos[i], "targets")) {
      targets = dtos[i]["targets"];
    }
    if (Object.prototype.hasOwnProperty.call(dtos[i], "controls")) {
      controls = dtos[i].controls;
    }
    if (Object.prototype.hasOwnProperty.call(dtos[i], "gates")) {
      let gates = dtos[i]["gates"];
      for (let j = 0; j < gates.length; j++) {
        let gate = gates[j];
        aggregatedGatesTargets.push(...gate.targets);
      }
    }

    let qbits = [...targets, ...controls, ...aggregatedGatesTargets];

    for (let j = i + 1; j < dtos.length; j++) {
      let step2 = dtos[j]["step"];
      if (step != step2) continue;

      let targetsSecond = [];
      let controlsSecond = [];
      let aggregatedGatesTargetsSecond = [];

      if (Object.prototype.hasOwnProperty.call(dtos[j], "targets")) {
        targetsSecond = dtos[j].targets;
      }
      if (Object.prototype.hasOwnProperty.call(dtos[j], "controls")) {
        controlsSecond = dtos[j].controls;
      }
      if (Object.prototype.hasOwnProperty.call(dtos[j], "gates")) {
        let gates = dtos[j]["gates"];
        for (let k = 0; k < gates.length; k++) {
          let gate = gates[k];
          aggregatedGatesTargetsSecond.push(...gate.targets);
        }
      }

      let qbitsSecond = [...targetsSecond, ...controlsSecond, ...aggregatedGatesTargetsSecond];
      if (arraysHaveElementsInCommon(qbits, qbitsSecond)) return true;
    }
  }
  return false; 
}

export function getAggregatedGatesTargets(dto) {

  let aggregatedGateTargets = [];
  
  if (dto["gates"]) {
    let gates = dto["gates"];
    for (let i = 0; i < gates.length; i++) {
      let gate = gates[i];
      aggregatedGateTargets.push(...gate.targets);
    }
  }

  return aggregatedGateTargets;
}

export function getAggregatedGatesNewTargets(dto) {

  let aggregatedGateTargets = [];

  if (dto["gatesNew"]) {
    let gates = dto["gatesNew"];
    for (let i = 0; i < gates.length; i++) {
      let gate = gates[i];
      aggregatedGateTargets.push(...gate.targets);
    }
  }

  return aggregatedGateTargets;
}

export function interpolateJavaScriptTargetsExpression(expression, j) {

  expression = expression.trim();
  expression = expression.replaceAll("False", "false");
  expression = expression.replaceAll("FALSE", "false");
  expression = expression.replaceAll("True", "true");
  expression = expression.replaceAll("TRUE", "true");
  expression = expression.replace(/j/g, `${j}`);
  return expression;
}

export function evaluateTargetsExpression(expression, j) {
  let condition = interpolateJavaScriptTargetsExpression(expression, j);
  if (limitedEvaluate(condition) === true) {
    return true;
  } else if (limitedEvaluate(condition) === false) {
    return false;
  }
  throw new Error('Expression does not evaluate to a boolean value.');
}

// get array of targets that match expression
export function getMatchingTargets(qmin, qmax, expression) {

  let targets = [];
  for (let q = qmin; q <= qmax; q++) {
    let targetIsUsed = evaluateTargetsExpression(expression, q - qmin);
    if (targetIsUsed == true) {
      targets.push(q);
    }
  }

  return targets;
}

// get array of targets needed by circuit gate
export function getMultipleTargets(startQubit, noQubits) {

  let targets = [];
  let currentQubit = startQubit;
  while (targets.length < noQubits) {
    targets.push(currentQubit);
    currentQubit += 1;
  }

  return targets;
}


export function gateHasVariableTargets(gateName){
  if (gateName == "qft"
    || gateName == "qft-dagger"
    ) {
    return true;
  } else {
    return false;
  }
}

export function gateCanHaveMultipleTargets(gateName) {

  if (gateName == "circuit") {
    return true;
  }

  return gateHasVariableTargets(gateName);
}

export function getCircuitDescendents(circuitStatesArray, circuitId) {

  let descendents = [];

  let circuitState = circuitStatesArray[circuitId];
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      let step = circuitState.steps[i];
      if (Object.prototype.hasOwnProperty.call(step, "gates")) {
        let gates = step["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (gate.name == "circuit") {
            descendents.push(gate.circuit_id);
            let gateDescendents = getCircuitDescendents(circuitStatesArray, gate.circuit_id);
            descendents = descendents.concat(gateDescendents);
          }
        }
      }
    }
  }

  return descendents;
}

export function getCompatibleCircuitIds(circuitStatesArray) {
  let ids = [];
  let currentCircuitName = circuitStatesArray[window.currentCircuitId]["circuit_name"];
  for (let i = 0; i < window.circuitIds.length; i++) {
    let id = window.circuitIds[i];
    let circuitName = circuitStatesArray[id]["circuit_name"];
    if (currentCircuitName == circuitName) continue;
    let circuitDescendants = getCircuitDescendents(circuitStatesArray, id);
    if (circuitDescendants.includes(window.currentCircuitId)) continue;
    ids.push(id);
  }
  return ids;
}

export function updateGatesAbbreviation(circuitStatesArray, changedCircuitId, newAbbrevation) {
  for (let i = 0; i < window.circuitIds.length; i++) {
    let id = window.circuitIds[i];
    if (id == changedCircuitId) continue;
    let circuitState = circuitStatesArray[id];
    if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
      for (let j = 0; j < circuitState.steps.length; j++) {
        let step = circuitState.steps[j];
        if (Object.prototype.hasOwnProperty.call(step, "gates")) {
          let gates = step["gates"];
          for (let k = 0; k < gates.length; k++) {
            let gate = gates[k];
            if (gate.name == "circuit" && gate.circuit_id == changedCircuitId) {
              gate.circuit_abbreviation = newAbbrevation;
            }
          }
        }
      }
    }
  }
}

// check if circuit gates needs more qubits. If empty qubit do not exist return false
export function canAccomodateCircuitGate(circuitState, modifiedCircuitId, noModifiedCircuitQubits) {
  for (let i = 0; i < circuitState.steps.length; i++) {
    let step = circuitState.steps[i].index;
    let gates = circuitState.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name == "circuit" && gate.circuit_id == modifiedCircuitId){
        let existingQbits = gate.targets;
        let proposedQbits = getMultipleTargets(gate.targets[0], noModifiedCircuitQubits);
        if (seatsAreTaken(circuitState, proposedQbits, step, existingQbits)) {
          return false;
        }
      }
    }
  }

  return true;
}


// update targets for circuit gates, insert qubits when existing qubits are occupied
export function accomodateModifiedCircuitGate(store, circuitState, circuitId, noModifiedCircuitQubits, modifiedCircuitId) {
  for (let i = 0; i < circuitState.steps.length; i++) {
    let step = circuitState.steps[i].index;
    let gates = circuitState.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name == "circuit" && gate.circuit_id == modifiedCircuitId){
        let existingQbits = gate.targets;
        // remove existing gate
        let dto = { "step": step, "targets": [gate.targets[0]], "name": "circuit" };
        let payload = {"circuitId": circuitId, "dto": dto}
        store.commit('circuitEditorModule/removeGateFromWorkerThread', payload);
        let proposedQbits = getMultipleTargets(gate.targets[0], noModifiedCircuitQubits);
        if (proposedQbits.length == 0) {
          continue;
        }
        // insert new qubits if necessary
        while (seatsAreTaken(circuitState, proposedQbits, step)) {
          let payload = {"circuitId": circuitId, "qbit": existingQbits[existingQbits.length - 1]}
          store.commit('circuitEditorModule/insertQubitFromWorkerThread', payload);
        }
        // insert gate
        let controls = [];
        let controlstates = [];
        for (let i = 0; i < gate.controls.length; i++) {
          let control = gate.controls[i];
          controls.push(control.target);
          controlstates.push(control.state);
        }
        dto = { "step": step,
                "targets": [...proposedQbits],
                "name": "circuit",
                "controls": [...controls],
                "controlstates": [...controlstates],
                "circuit_id": gate.circuit_id,
                "circuit_abbreviation": gate.circuit_abbreviation,
                "circuit_power": gate.circuit_power,
                "targets_expression": gate.targets_expression };
        payload = {"circuitId": circuitId, "dto": dto}
        store.commit('circuitEditorModule/insertingGateFromWorkerThread', payload);
      }
    }
  }
}

export function circuitGatesHaveValidId(currentCircuits, uploadedCircuit) {

  let newCircuits = {};
  for (let i = 0; i < window.circuitIds.length; i++) {
    let id = window.circuitIds[i];
    newCircuits[id] = {...currentCircuits[id]};
  }

  for (let i = 0; i < uploadedCircuit.steps.length; i++) {
    let gates = uploadedCircuit.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name == "circuit"){
        let id = gate.circuit_id;
        // circuit cannot contain itself
        if (window.currentCircuitId == id) {
          return false;
        }
        // circuit id is not known
        if (!window.circuitIds.includes(id)) {
          return false;
        }
      }
    }
  }

  newCircuits[window.currentCircuitId].steps = [...uploadedCircuit.steps];

  // gate with circuit id should not occur in its descendents
  for (let i = 0; i < window.circuitIds.length; i++) {
    let id = window.circuitIds[i];
    if (stateDescendentsContain(newCircuits, [id], id)) {
      return false;
    }
  }

  return true;
}

// navigate descendants for each circuit,
function stateDescendentsContain(circuitStates, ids, startId) {

  let newids = [...ids];
  let circuitState = circuitStates[startId];
  for (let i = 0; i < circuitState.steps.length; i++) {
    let gates = circuitState.steps[i]["gates"];
    for (let j = 0; j < gates.length; j++) {
      let gate = gates[j];
      if (gate.name == "circuit"){
        if (newids.includes(gate.circuit_id)) {
          return true;
        }
        newids.push(gate.circuit_id);
        if (stateDescendentsContain(circuitStates, newids, gate.circuit_id)) {
          return true;
        }
      }
    }
  }

  return false;
}

export function getCircuitGateIds(gates) {
  let ids = [];
  for (let i = 0; i < gates.length; i++){
    let gate = gates[i];
    if (gate["name"] == "circuit") {
      ids.push(gate["circuit_id"]);
    }
  }
  return ids;
}