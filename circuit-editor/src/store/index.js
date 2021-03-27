import Vue from 'vue'
import Vuex from 'vuex'
import circuitEditorModule from './modules/editor'

// Load Vuex
Vue.use(Vuex)

// Create Vuex store
export default new Vuex.Store({
    modules: {
        circuitEditorModule
    },
    // In strict mode, whenever Vuex state is mutated outside 
    // of mutation handlers, an error will be thrown. Strict mode
    // is resource intensive and should not be enabled in production.
    strict: process.env.NODE_ENV !== 'production',
});