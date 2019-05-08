import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import axios from 'axios'
import qs from 'qs'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import jquery from 'jquery'
import store from '@/store'

//封装的全局方法引入
import localCache from '@/global/localCache'
// noinspection ES6UnusedImports

Vue.use(Element);
Vue.prototype.$qs = qs;
Vue.prototype.$axios= axios;
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.BASE_URL;
Vue.prototype.$jquery = jquery;
Vue.prototype.$localCache = localCache;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
