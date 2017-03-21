import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Sell from '../components/Sell'
import Want from '../components/Want'
import Reg from '../components/Reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/want',
      name: 'Want',
      component: Want
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
        path: '/sell/:location/:apartment/:price',
        name: 'Sell',
        component: Sell
    },
  ]
})
