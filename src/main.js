import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import axios from 'axios'
import qs from 'qs'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'

//封装的全局方法引入
import cache from '@/global/cache'
import treeUtils from '@/global/treeUtils'
import userUtils from '@/global/userUtils'
import validator from '@/global/validator'
import actionUtils from '@/global/actionUtils'
// noinspection ES6UnusedImports

Vue.use(Element);
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.BASE_URL;

Vue.prototype.$cache = cache;
Vue.prototype.$treeUtils = treeUtils;
Vue.prototype.$userUtils = userUtils;
Vue.prototype.$validator = validator;
Vue.prototype.$actionUtils = actionUtils;
//允许浏览器debug
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
axios.interceptors.response.use(function (response) {
  console.log("11111111111111");
  console.log(response.data);
  return response;
} ,function (error) {
  // 对响应错误做点什么
  console.log("22222222222222");
  console.log(error);
  return Promise.reject(error);
});

router.beforeEach((to, form, next) => {
  store.dispatch("routeChange", to).then(next())
});
