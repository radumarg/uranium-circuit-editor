/* 
   Helper code for vuex store.
*/
import $ from "jquery";
import { 
  getUserInterfaceSetting 
} from "./applicationWideReusableUnits.js";

import { 
  arraysAreEqual,
} from "./javaScriptUtils.js";

export function removingGateFromCircuit(circuitState, dto){
  let step = dto["step"];
  let targets = dto["targets"];
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
            if (arraysAreEqual(gate.targets, targets)) {
              gates.splice(j, 1);
            }
          }
        }
      }
    }
  }
}

export function insertingOneGateInCircuit(circuitState, dto) {
  let step = dto["step"];
  let targets = dto["targets"];
  let name = dto["name"];
  
  let gate = { "name": name, "targets": [...targets] };
  if (Object.prototype.hasOwnProperty.call(dto, "controls")) {
      let controls = dto["controls"];
      gate["controls"] = [...controls];
  }
  if (Object.prototype.hasOwnProperty.call(dto, "controlstates")) {
      let controlstates = dto["controlstates"];
      gate["controlstates"] = [...controlstates];
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

  if (!Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
      circuitState.steps = []
  }

  // try to find a step if it already exist
  for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
      let gates = circuitState.steps[i]["gates"];
      gates.push(gate);
      gates.sort((l, r) => (Math.min(...l.targets) - Math.min(...r.targets)));
      return;
      } 
  }

  // step does not exist, add new
  circuitState.steps.push({ "index": step, "gates": [gate] });
  circuitState.steps.sort((l, r) => (l.index - r.index));
} 

export function interpolateJavaScriptExpression(expression, s, q) {
  
  if (typeof expression == "number") return expression;

  expression = expression.trim();
  expression = expression.replaceAll("False", "false");
  expression = expression.replaceAll("FALSE", "false");
  expression = expression.replaceAll("True", "true");
  expression = expression.replaceAll("TRUE", "true");
  expression = expression.replace(/q/g, `${q}`);

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
  
  window.copiedGates = [];
  
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      let stepIndex = parseInt(circuitState.steps[i].index);
      if (Object.prototype.hasOwnProperty.call(circuitState.steps[i], "gates")) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (Math.min(...gate.targets) >= qbitStart &&
              Math.max(...gate.targets) <= qbitStop &&
              stepIndex >= stepStart &&
              stepIndex <= stepStop) {

            //TODO: remove all parsed ints? If circuit created. If circuit loaded
            let copiedGate = {"step": stepIndex - stepStart, "name": gate.name };

            if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
              //TODO: do I need a type cast for controls here: ?
              let targets = gate.targets;
              copiedGate.targets = targets.map(function(value) {return value - qbitStart;});
            }

            if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
              //TODO: do I need a type cast for controls here: ?
              let controls = gate.controls;
              copiedGate.controls = controls.map(function(value) {return value - qbitStart;});
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controlstates")) {
              copiedGate.controlstates = [...gate.controlstates];
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
   
            window.copiedGates.push(copiedGate);
          }
        }
      }
    }
  } 
}

export function gatePastedGates(qbitStart, stepStart){

  let gates = [];

  for (let i = 0; i < window.copiedGates.length; i++){
    let gate = { ... window.copiedGates[i]};
    gate.step = gate.step + stepStart;
    if (Object.prototype.hasOwnProperty.call(gate, "targets")) {
      let targets = gate.targets;
      gate.targets = targets.map(function(value) {return value + qbitStart;});
    }
    if (Object.prototype.hasOwnProperty.call(gate, "controls")) {
      let controls = gate.controls;
      gate.controls = controls.map(function(value) {return value + qbitStart;});
    }
    gates.push(gate);
  }

  return gates;
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
// distinct qubits for targets, controls
export function proposedNewGatesAreInvalid(dtos) {
  for (let i = 0; i < dtos.length; i++) {

    let noExpectedQubits = 1;
    let targets = [];
    let controls = [];

    if (Object.prototype.hasOwnProperty.call(dtos[i], "targets")) {
      targets = dtos[i]["targets"];
      noExpectedQubits += targets.length;
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "controls")) {
      controls = dtos[i]["controls"];
      noExpectedQubits += controls.length;
    }

    let distinctQbits = [...targets, ...controls]
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

    if (Object.prototype.hasOwnProperty.call(dtos[i], "targets")) {
      targets = dtos[i]["targets"];
    }

    if (Object.prototype.hasOwnProperty.call(dtos[i], "controls")) {
      controls = dtos[i].controls;
    }
    let qbits = [...targets, ...controls];

    for (let j = i + 1; j < dtos.length; j++) {
      let step2 = dtos[j]["step"];
      if (step != step2) continue;
      let targetsSecond = [];
      let controlsSecond = [];
      if (Object.prototype.hasOwnProperty.call(dtos[j], "targets")) {
        targetsSecond = dtos[j].targets;
      }
      if (Object.prototype.hasOwnProperty.call(dtos[j], "controls")) {
        controlsSecond = dtos[j].controls;
      }
      let qbitsSecond = [...targetsSecond, ...controlsSecond];
      for (let k = 0; k < qbits.length ; k++){
        let qbit = qbits[k];
        if (qbitsSecond.includes(qbit)){
          return true;
        }
      }
    }
  }
  return false; 
}
