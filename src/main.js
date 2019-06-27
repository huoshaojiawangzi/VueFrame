import Vue from 'vue'
import App from '@/App'
import Router from "vue-router";
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
import dictUtils from '@/global/dictUtils'
// noinspection ES6UnusedImports

Vue.use(Element);
Vue.use(Router);
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.BASE_URL;

Vue.prototype.$cache = cache;
Vue.prototype.$treeUtils = treeUtils;
Vue.prototype.$userUtils = userUtils;
Vue.prototype.$validator = validator;
Vue.prototype.$actionUtils = actionUtils;
Vue.prototype.$dictUtils = dictUtils;
//允许浏览器debug
Vue.config.devtools = true;

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});

/* 在起始页之后监听*/
router.beforeEach((to, form, next) => {
  store.dispatch("routeChange", to).then(next())
});

