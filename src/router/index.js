import Vue from 'vue'
import Router from 'vue-router'
import Supersystem from '../Supersystem'
import Login from '@/Login'
import Home from '@/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        { path: '/superSystem', name: 'superSystem', component: Supersystem }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
