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
import { extractSelectionRange, getPastedGates, isDefined, undoGatesSelection,  saveCopiedGates  } from "./store/modules/editorHelper.js";
import { seatIsTaken, seatsInArrayAreAlreadyTaken } from "./store/modules/gatesTable.js";

Vue.use(MdButton);
Vue.use(MdCheckbox);
Vue.use(MdToolbar);
Vue.use(MdTooltip);

// Bootstrap-Vue
import {
    DropdownPlugin,
    IconsPlugin,
    ImagePlugin,
    FormInputPlugin,
    FormSelectPlugin,
    LayoutPlugin,
    LinkPlugin,
    ModalPlugin,
    SidebarPlugin,
    SpinnerPlugin,
    TabsPlugin,
    TablePlugin,
    TooltipPlugin,
    VBHoverPlugin
} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { setCookiesIfNotAlreadySet } from "./store/modules/applicationWideReusableUnits.js";


Vue.use(DropdownPlugin);
Vue.use(IconsPlugin);
Vue.use(ImagePlugin);
Vue.use(FormInputPlugin);
Vue.use(FormSelectPlugin);
Vue.use(LayoutPlugin);
Vue.use(LinkPlugin);
Vue.use(ModalPlugin);
Vue.use(SidebarPlugin);
Vue.use(SpinnerPlugin);
Vue.use(TabsPlugin);
Vue.use(TablePlugin);
Vue.use(TooltipPlugin);
Vue.use(VBHoverPlugin);
Vue.use(VueCookies);

// Color scheme used by Editor for background
window.selectBackgroundColor = "#C0C0C0";
window.lightBackgroundColor = "ghostwhite";
window.whiteBackgroundColor = "white";
window.darkBackgroundColor = "#374048";
window.blueGatesColor = "#678efa";
window.circuitGateColor = "MediumSlateBlue";

// Temporary values until circuit will be loaded asynchronously
window.circuitIds = [0];
window.currentCircuitId = 0;


// Need a method to detect keys pressed
window.currKey = null;

$(window).on("keydown", function(event) {
  window.currKey = event.key;
});

$(window).on("keyup", function() {
  window.currKey = null;
});

Vue.config.productionTip = false;

// setup Vuex store
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

// Used when toggling between showing/hiding ALL tooltips
window.toolTipsAreShown = false;

setCookiesIfNotAlreadySet();

// Globally handle key pressed events
$(document).on('keyup', function(e) {
  if (e.key == "Escape") {

    // Escape is pressed
    undoGatesSelection();

  } else if (e.key == "Delete") {

    // Delete is pressed
    let selectionRange = extractSelectionRange();

    if (selectionRange.length){
      let dtos = [];
      for (let q = selectionRange[0]; q <= selectionRange[1]; q++){
        for (let s = selectionRange[2]; s <= selectionRange[3]; s++){
          let dto = { "step": s, "targets": [q], "name": "any" };
          dtos.push(dto);
        }
      }
      store.dispatch('circuitEditorModule/removeGatesFromCircuit', {"dtos": dtos});
      undoGatesSelection();
    }
    
  } else if ((e.key == 'c' || e.key == 'C') && e.ctrlKey){

    // Ctrl+C is pressed
    let selectionRange = extractSelectionRange();

    if (selectionRange.length){
      saveCopiedGates(store.state.circuitEditorModule[window.currentCircuitId], selectionRange[0], selectionRange[1], selectionRange[2], selectionRange[3]);
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

    if (seatIsTaken(store.state.circuitEditorModule[window.currentCircuitId], window.selectQbitStart, window.selectStepStart)){
      alert("Please select a single empty cell where you want to start pasting gates.");
      return;
    }

    getPastedGates(window.selectQbitStart, window.selectStepStart)
    .then(function(gates) {
      if (gates.length > 0){
        if (seatsInArrayAreAlreadyTaken(store.state.circuitEditorModule[window.currentCircuitId], gates)){
          alert("Not all the proposed seats are empty.");
        } else {
          store.dispatch('circuitEditorModule/insertGatesInCircuit', {"dtos": gates, "existingStep": null, "existingQbit": null});
          undoGatesSelection();
        }
      } else {
        alert("There nothing to be pasted!");
        undoGatesSelection();
      }
    })
    .catch(function(x) {
      console.log("Unexpected error when pasting gates: " + x)
    });

  } else if ((e.key == 'x' || e.key == 'X') && e.ctrlKey){
   
    // Ctrl+X is pressed
    let selectionRange = extractSelectionRange();

    if (selectionRange.length){
      let dtos = [];
      for (let q = selectionRange[0]; q <= selectionRange[1]; q++){
        for (let s = selectionRange[2]; s <= selectionRange[3]; s++){
          let dto = { "step": s, "targets": [q], "name": "any" };
          dtos.push(dto);
        }
      }
      saveCopiedGates(store.state.circuitEditorModule[window.currentCircuitId], selectionRange[0], selectionRange[1], selectionRange[2], selectionRange[3]);
      store.dispatch('circuitEditorModule/removeGatesFromCircuit', {"dtos": dtos});
      undoGatesSelection();
    }
  }

});




