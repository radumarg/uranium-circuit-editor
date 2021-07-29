import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';
import 'bootstrap';
import $ from "jquery";

// Vue-Material
import { MdButton, MdCheckbox, MdToolbar, MdTooltip } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueCookies from 'vue-cookies';
import { extractSelectionRange, gatePastedGates, isDefined, undoGatesSelection,  saveCopiedGates  } from "./store/modules/editorHelper.js";
import { seatIsTaken, seatsInArrayAreAlreadyTaken } from "./store/modules/gatesTable.js";

Vue.use(MdButton);
Vue.use(MdCheckbox);
Vue.use(MdToolbar);
Vue.use(MdTooltip);

// Bootstrap-Vue
import { IconsPlugin, ImagePlugin, FormInputPlugin, FormSelectPlugin, LayoutPlugin, ModalPlugin, SidebarPlugin, SpinnerPlugin, TabsPlugin, TooltipPlugin, VBHoverPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(IconsPlugin);
Vue.use(ImagePlugin);
Vue.use(FormInputPlugin);
Vue.use(FormSelectPlugin);
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(SidebarPlugin);
Vue.use(SpinnerPlugin);
Vue.use(TabsPlugin);
Vue.use(TooltipPlugin);
Vue.use(VBHoverPlugin);
Vue.use(VueCookies);

Vue.config.productionTip = false;

// setup Vuex store
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

// Setup cookies in case no cookie is set
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

// Used when toggling between showing/hiding ALL tooltips
window.toolTipsAreShown = false;

// Color scheme used by Editor for background
window.selectBackgroundColor = "#C0C0C0";
window.lightBackgroundColor = "ghostwhite";
window.whiteBackgroundColor = "white";
window.darkBackgroundColor = "#374048";

// Globally handle key pressed events
$(document).on('keyup', function(e) {
  if (e.key == "Escape") {

    // Escape is pressed
    undoGatesSelection();

  } else if (e.key == "Delete") {

    // Delete is pressed
    let selectionRange = extractSelectionRange();

    if (selectionRange){
      let dtos = [];
      for (let q = selectionRange[0]; q <= selectionRange[1]; q++){
        for (let s = selectionRange[2]; s <= selectionRange[3]; s++){
          let dto = { "step": s, "qbit": q, "name": "any" };
          dtos.push(dto);
        }
      }
      store.dispatch('circuitEditorModule/removeGatesFromCircuit', {"dtos": dtos});
      undoGatesSelection();
    }
    
  } else if ((e.key == 'c' || e.key == 'C') && e.ctrlKey){

    // Ctrl+C is pressed
    let selectionRange = extractSelectionRange();

    if (selectionRange){
      saveCopiedGates(store.state.circuitEditorModule, selectionRange[0], selectionRange[1], selectionRange[2], selectionRange[3]);
      undoGatesSelection();
    }
    
  } else if ((e.key == 'v' || e.key == 'V') && e.ctrlKey){

    // Ctrl+V is pressed
    if (!isDefined(window.selectQbitStart) ||
        !isDefined(window.selectStepStart)){
      return;
    }
    if (isDefined(window.selectQbitStop) ||
        isDefined(window.selectStepStop)){
      alert("Please select a single empty cell where you want to start pasting gates.");
      return;
    }

    if (seatIsTaken(store.state.circuitEditorModule, window.selectQbitStart, window.selectStepStart)){
      alert("Please select a single empty cell where you want to start pasting gates.");
      return;
    }

    let gates = gatePastedGates(window.selectQbitStart, window.selectStepStart);
    if (seatsInArrayAreAlreadyTaken(store.state.circuitEditorModule, gates, null, null)){
      alert("Not all the proposed seats are empty.");
    } else {
      store.dispatch('circuitEditorModule/insertGatesInCircuit', {"dtos": gates, "existingStep": null, "existingQbit": null});
      undoGatesSelection();
    }

  } else if ((e.key == 'x' || e.key == 'X') && e.ctrlKey){
   
    // Ctrl+X is pressed
    let selectionRange = extractSelectionRange();

    if (selectionRange){
      let dtos = [];
      for (let q = selectionRange[0]; q <= selectionRange[1]; q++){
        for (let s = selectionRange[2]; s <= selectionRange[3]; s++){
          let dto = { "step": s, "qbit": q, "name": "any" };
          dtos.push(dto);
        }
      }
      saveCopiedGates(store.state.circuitEditorModule, selectionRange[0], selectionRange[1], selectionRange[2], selectionRange[3]);
      store.dispatch('circuitEditorModule/removeGatesFromCircuit', {"dtos": dtos});
      undoGatesSelection();
    }
  }
});




