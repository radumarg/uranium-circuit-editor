import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

// Vue-Material
import { MdButton, MdRadio, MdToolbar, MdTooltip } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueCookies from 'vue-cookies'

Vue.use(MdButton)
Vue.use(MdRadio)
Vue.use(MdToolbar)
Vue.use(MdTooltip)

// Bootstrap-Vue
import { IconsPlugin, ImagePlugin, FormInputPlugin, FormSelectPlugin, LayoutPlugin, ModalPlugin, SidebarPlugin, TooltipPlugin, VBHoverPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(IconsPlugin)
Vue.use(ImagePlugin)
Vue.use(FormInputPlugin)
Vue.use(FormSelectPlugin)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(SidebarPlugin)
Vue.use(TooltipPlugin)
Vue.use(VBHoverPlugin)
Vue.use(VueCookies)

Vue.config.productionTip = false

// Setup cookies in case no cookie is set
let useColoreGates = Vue.$cookies.get('colored-gates');
if (useColoreGates == null){
  Vue.$cookies.set('colored-gates', true);
  window.useColoredGates = true;
} else {
  window.useColoredGates = useColoreGates;
}

let useLightTheme = Vue.$cookies.get('light-theme');
if (useLightTheme == null){
  Vue.$cookies.set('light-theme', true);
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
