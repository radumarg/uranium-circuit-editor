/*
  These are not to be condidered utilities in general rather functional 
  code fragments reused in various parts of Circuit Editor. 
*/

import Vue from 'vue';
import JQuery from 'jquery';

export function createDragImageGhost (targetImage) {

  var fakeGhost = document.createElement("img");
  fakeGhost.src = targetImage.src;

  if (Vue.$cookies.get("dark-theme") === 'true'){
      fakeGhost.style.backgroundColor = window.darkBackgroundColor;
  } else {
      if (Vue.$cookies.get("colored-gates") === 'true'){
          fakeGhost.style.backgroundColor = window.lightBackgroundColor;
      } else {
          fakeGhost.style.backgroundColor = window.whiteBackgroundColor;
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

export function setCookiesIfNotAltreadySet(){ 
  let useColoreGates = Vue.$cookies.get('colored-gates');
  if (useColoreGates == null){
    Vue.$cookies.set('colored-gates', 'true');
  }
  let useDarkTheme = Vue.$cookies.get('dark-theme');
  if (useDarkTheme == null){
    Vue.$cookies.set('dark-theme', 'false');
  }
  let liveSimulation = Vue.$cookies.get('live-simulation');
  if (liveSimulation == null){
    Vue.$cookies.set('live-simulation', 'true');
  }
  let legendBase = Vue.$cookies.get('legend-base');
  if (legendBase == null){
    Vue.$cookies.set('legend-base', '2');
  }
}