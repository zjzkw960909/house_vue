import Vue from 'vue'
import Vuex from 'vuex'
import location from './modules/location'
import apartment from './modules/apartment'
import animation from './modules/animation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      location,
      apartment,
      animation
  },
})
