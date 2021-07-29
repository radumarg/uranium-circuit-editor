/* 
   Helper code for vuex store.
*/
import Vue from 'vue';
import $ from "jquery";

export function removingGateFromCircuit(circuitState, dto){
  let step = parseInt(dto["step"]);
  let qbit = parseInt(dto["qbit"]);
  if (Object.prototype.hasOwnProperty.call(circuitState, "steps")) {
    for (let i = 0; i < circuitState.steps.length; i++) {
      if (circuitState.steps[i].index == step) {
        let gates = circuitState.steps[i]["gates"];
        for (let j = 0; j < gates.length; j++) {
          let gate = gates[j];
          if (Object.prototype.hasOwnProperty.call(gate, "target")) {
            if (gate.target == qbit) {
              gates.splice(j, 1);
            }
          }
        }
      }
    }
  }
}

export function insertingOneGateInCircuit(circuitState, dto) {
  let step = parseInt(dto["step"]);
  let qbit = parseInt(dto["qbit"]);
  let name = dto["name"];

  let gate = { "name": name, "target": qbit };
  if (Object.prototype.hasOwnProperty.call(dto, "qbit2")) {
      let qbit2 = parseFloat(dto["qbit2"]);
      gate["target2"] = qbit2;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "control")) {
      let control = parseFloat(dto["control"]);
      gate["control"] = control;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "controlstate")) {
      let controlstate = dto["controlstate"];
      gate["controlstate"] = controlstate;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "control2")) {
      let control2 = parseFloat(dto["control2"]);
      gate["control2"] = control2;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "controlstate2")) {
      let controlstate2 = dto["controlstate2"];
      gate["controlstate2"] = controlstate2;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "phi")) {
      let phi = parseFloat(dto["phi"]);
      gate["phi"] = phi;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "theta")) {
      let theta = parseFloat(dto["theta"]);
      gate["theta"] = theta;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "lambda")) {
      let lambda = parseFloat(dto["lambda"]);
      gate["lambda"] = lambda;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "root")) {
      let root = dto["root"];
      gate["root"] = root;
  }
  if (Object.prototype.hasOwnProperty.call(dto, "bit")) {
      let bit = parseFloat(dto["bit"]);
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
      gates.sort((l, r) => (l.target - r.target));
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
  if (Vue.$cookies.get("dark-theme") === 'true'){
    backgroundColor = window.darkBackgroundColor;
  } else {
    if (Vue.$cookies.get("colored-gates") === 'true'){
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
  return (Boolean(value) || value == 0);
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
          if (gate.target >= qbitStart && 
              gate.target <= qbitStop &&
              stepIndex >= stepStart &&
              stepIndex <= stepStop) {

            let copiedGate = {"qbit": parseInt(gate.target) - qbitStart, "step": stepIndex - stepStart, "name": gate.name };

            if (Object.prototype.hasOwnProperty.call(gate, "target2")) {
              copiedGate.qbit2 = parseInt(gate.target2) - qbitStart;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control")) {
              copiedGate.control = parseInt(gate.control) - qbitStart;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
              copiedGate.control2 = parseInt(gate.control2) - qbitStart;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controlstate")) {
              copiedGate.controlstate = parseInt(gate.controlstate);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "controlstate2")) {
              copiedGate.controlstate2 = parseInt(gate.controlstate2);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "theta")) {
              copiedGate.theta = parseFloat(gate.theta);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "phi")) {
              copiedGate.phi = parseFloat(gate.phi);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "lambda")) {
              copiedGate.lambda = parseFloat(gate.lambda);
            }
            if (Object.prototype.hasOwnProperty.call(gate, "root")) {
              copiedGate.root = gate.root;
            }
            if (Object.prototype.hasOwnProperty.call(gate, "bit")) {
              copiedGate.bit = parseInt(gate.bit);
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
    gate.qbit = gate.qbit + qbitStart;
    gate.step = gate.step + stepStart;
    if (Object.prototype.hasOwnProperty.call(gate, "qbit2")) {
      gate.qbit2 = gate.qbit2 + qbitStart;
    }
    if (Object.prototype.hasOwnProperty.call(gate, "control")) {
      gate.control = gate.control + qbitStart;
    }
    if (Object.prototype.hasOwnProperty.call(gate, "control2")) {
      gate.control2 = gate.control2 + qbitStart;
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