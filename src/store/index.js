import Vue from 'vue'
import Vuex from 'vuex'

import asideOptions from './commonAside'
import headerOptions from './commonHeader'
import addUser from './addUser'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        asideAbout: asideOptions,
        headerAbout: headerOptions,
        addUser
    }
})

