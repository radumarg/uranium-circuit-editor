import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';

// Vue-Material
import { MdButton, MdCheckbox, MdToolbar, MdTooltip } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueCookies from 'vue-cookies';

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
  Vue.$cookies.set('legendBase', '2');
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
