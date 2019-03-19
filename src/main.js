import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import axios from 'axios'
import qs from 'qs'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// noinspection ES6UnusedImports
import $ from 'jquery'
import store from '@/store'

Vue.use(Element)
Vue.prototype.$qs = qs
Vue.prototype.$axios= axios
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.BASE_URL


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
