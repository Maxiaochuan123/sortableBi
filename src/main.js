// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './assets/icon/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

//登录拦截
// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token')
//   if (to.path == '/login') {
//     sessionStorage.removeItem('token')
//   }
//   if (!token && to.path != '/login') {
//     sessionStorage.removeItem('token')
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    if (token) { 
      config.headers.token = token
    }
    return config;
  },
  err => {
      return Promise.reject(err);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
