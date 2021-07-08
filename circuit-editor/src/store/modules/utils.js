import Vue from 'vue';
import JQuery from 'jquery';

export function createDragImageGhost (targetImage) {

    var fakeGhost = document.createElement("img");
    fakeGhost.src = targetImage.src;

    if (Vue.$cookies.get("dark-theme") === 'true'){
        fakeGhost.style.backgroundColor = "#374048";
    } else {
        if (Vue.$cookies.get("colored-gates") === 'true'){
            fakeGhost.style.backgroundColor = "ghostwhite";
        } else {
            fakeGhost.style.backgroundColor = "white";
        }
    }

    fakeGhost.style.width = "40px";
    fakeGhost.style.height = "auto";
    fakeGhost.id = "dragged-gate-ghost";
    document.body.appendChild(fakeGhost);

    // tried to make image transparent, not working on my machine, though image is transparent on other browsers
    // https://stackoverflow.com/questions/38731743/transition-opacity-not-working-when-creating-element
    //window.getComputedStyle(fakeGhost).getPropertyValue("opacity");
    //fakeGhost.style.opacity = "0.5"; 

    return fakeGhost;
}

export function hideTooltips(){ 
    JQuery('[data-toggle="tooltip"], .tooltip').tooltip("hide");
    window.toolTipsAreShown = false;
}

/* 
  This code is used by vuex actions but since is being 
  reused in several actions we store it here.
*/
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