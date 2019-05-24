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
import cache from '@/global/cache'
import treeUtils from '@/global/treeUtils'
import userUtils from '@/global/userUtils'
// noinspection ES6UnusedImports

Vue.use(Element);
Vue.prototype.$qs = qs;
Vue.prototype.$axios= axios;
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.BASE_URL;
Vue.prototype.$jquery = jquery;
Vue.prototype.$cache = cache;
Vue.prototype.$treeUtils= treeUtils;
Vue.prototype.$userUtils= userUtils;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to,form,next)=>{
  store.dispatch("routeChange",to).then(next())
});
