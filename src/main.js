import Vue from 'vue'

import '@/assets/rem.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'

import 'reset.css'
import '@/styles/main.styl'
import '@/styles/variable.styl'

Vue.prototype.$axios = axios

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')