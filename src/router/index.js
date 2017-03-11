import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Sell from '@/components/Sell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/sell/:location/:apartment/:price',
        name: 'Sell',
        component: Sell
    }
  ]
})
