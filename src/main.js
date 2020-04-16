import Vue from 'vue'

import '@/assets/rem.js'
import filters from '@/utils/filters'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'

import App from './App.vue'
import router from './router'
import store from './store'
import ajax from './axios'

import 'reset.css'
import '@/styles/main.styl'
import '@/styles/variable.styl'
import '@/styles/icomoon.css'

Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter])
})

Vue.prototype.$axios = ajax

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')