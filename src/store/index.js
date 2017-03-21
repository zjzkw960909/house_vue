import Vue from 'vue'
import Vuex from 'vuex'
import location from './modules/location'
import apartment from './modules/apartment'
import animation from './modules/animation'
import sell from './modules/sell'
import postData from './modules/postData'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        postData,

        location,
        apartment,
        animation,
        sell
    },
})
