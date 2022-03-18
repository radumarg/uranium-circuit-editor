/*
  These are not to be condidered utilities in general rather functional 
  code fragments reused in various parts of Circuit Editor. 
*/

import Vue from 'vue';
import JQuery from 'jquery';

export function createDragImageGhost (targetImage, imageWidth = null) {

  var fakeGhost = document.createElement("img");
  fakeGhost.src = targetImage.src;

  if (getUserInterfaceSetting("dark-theme") === 'true'){
      fakeGhost.style.backgroundColor = window.darkBackgroundColor;
  } else {
      if (getUserInterfaceSetting("colored-gates") === 'true'){
          fakeGhost.style.backgroundColor = window.lightBackgroundColor;
      } else {
          fakeGhost.style.backgroundColor = window.whiteBackgroundColor;
      }
  }

  if (imageWidth){
    fakeGhost.style.width = imageWidth;
  } else {
    fakeGhost.style.width = "40px";
  }
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

const defaultCookieValues = {'colored-gates': 'true', 'dark-theme': 'false', 'live-simulation': 'true', 'legend-base': '2', 'big-endian-ordering': 'true', 'zoom-level': '100'};

export function setCookiesIfNotAlreadySet(){ 
  if (Vue.$cookies.get('functionality_cookies') === 'accepted')
  {
    let d = new Date()
    // 100 years from now
    d.setTime(d.getTime() + 100 * 365 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();

    let useColoreGates = Vue.$cookies.get('colored-gates');
    if (useColoreGates == null){
      Vue.$cookies.set('colored-gates', defaultCookieValues['colored-gates'], expires);
    }
    let useDarkTheme = Vue.$cookies.get('dark-theme');
    if (useDarkTheme == null){
      Vue.$cookies.set('dark-theme', defaultCookieValues['dark-theme'], expires);
    }
    let liveSimulation = Vue.$cookies.get('live-simulation');
    if (liveSimulation == null){
      Vue.$cookies.set('live-simulation', defaultCookieValues['live-simulation'], expires);
    }
    let legendBase = Vue.$cookies.get('legend-base');
    if (legendBase == null){
      Vue.$cookies.set('legend-base', defaultCookieValues['legend-base'], expires);
    }
    let bigEndianOrdering = Vue.$cookies.get('big-endian-ordering');
    if (bigEndianOrdering == null){
      Vue.$cookies.set('big-endian-ordering', defaultCookieValues['big-endian-ordering'], expires);
    }
    let zoomLevel = Vue.$cookies.get('zoom-level');
    if (zoomLevel == null){
      Vue.$cookies.set('zoom-level', defaultCookieValues['zoom-level'], expires);
    }
  } else {
    if (!window.userInterfaceSettings) {
      window.userInterfaceSettings = {};
      window.userInterfaceSettings['colored-gates'] = defaultCookieValues['colored-gates'];
      window.userInterfaceSettings['dark-theme'] = defaultCookieValues['dark-theme'];
      window.userInterfaceSettings['live-simulation'] = defaultCookieValues['live-simulation'];
      window.userInterfaceSettings['legend-base'] = defaultCookieValues['legend-base'];
      window.userInterfaceSettings['big-endian-ordering'] = defaultCookieValues['big-endian-ordering'];
      window.userInterfaceSettings['zoom-level'] = defaultCookieValues['zoom-level'];
    }
  }
}

export function setUserInterfaceSetting(name, value){
  if (Vue.$cookies.get('functionality_cookies') === 'accepted'){
    let d = new Date();
    // 100 years from now
    d.setTime(d.getTime() + 100 * 365 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    Vue.$cookies.set(name, value, expires);
  } else {
    window.userInterfaceSettings[name] = `${value}`;
  }
}

export function getUserInterfaceSetting(name){
  if (Vue.$cookies.get('functionality_cookies') === 'accepted'){
    let cookieValue =  Vue.$cookies.get(name);
    if (cookieValue != null) {
      return cookieValue;
    }
  } else if (window.userInterfaceSettings && Object.prototype.hasOwnProperty.call(window.userInterfaceSettings, name)) {
    return window.userInterfaceSettings[name];
  }

  return defaultCookieValues[name];
}