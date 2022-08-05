import Vue from 'vue'
import Vuex from 'vuex'

import asideOptions from './commonAside'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        asideAbout: asideOptions
    }
})

