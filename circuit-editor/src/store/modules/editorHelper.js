/* 
   Helper code for vuex store.
*/
import $ from "jquery";
import { getUserInterfaceSetting } from "./applicationWideReusableUnits.js";
import { arraysHaveElementsInCommon } from "./javaScriptUtils.js";

export function getClosestNonControlledGates(circuitState, step, qubit) {
  
  let closestGates = [];
  let minDistance = Infinity;

  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    let nonControlledGates = ['identity', 'measure-x', 'measure-y', 'measure-z'];
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

export function insertingOneGateInCircuit(circuitState, dto) {

  let step = dto["step"];
  let name = dto["name"];

  let gate = { "name": name};

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
      gates.sort((l, r) => (Math.min(...l.targets) - Math.min(...r.targets)));
      return;
    } 
  }

  // step does not exist, add new
  circuitState.steps.push({ "index": step, "gates": [gate] });
  circuitState.steps.sort((l, r) => (l.index - r.index));
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
  
  $('img').each(function(){
    let id = $(this).attr('id');
    if (id != undefined && id.match(/^\d+_\d+$/)){
      if($(this).css('background-color') == selectColor || overrideAll){
        $(this).css('background-color', backgroundColor);
      }
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
          let copiedGate = {"step": stepIndex - stepStart, "name": gate.name };
          
          if (gate.name == "barrier"){
            copiedGates.push(copiedGate);
            continue;
          } else if (
              Math.min(...gate.targets) >= qbitStart &&
              Math.max(...gate.targets) <= qbitStop &&
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
              let gates = gate.gates;
              copiedGate.gates = JSON.parse(JSON.stringify(gates));
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