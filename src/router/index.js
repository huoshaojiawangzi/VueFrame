import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Home from '@/view/home'
import sys from './children/sys'
Vue.use(Router);
export default new Router({
  routes:[
    {
      path:"/login",
      component:Login
    },
    {
      path:"/",
      component:Home,
      index:'1',
      iconCls: 'el-icon-message',
      name: '首页',
      children: [
        ...sys
      ]
    }],
  mode:"history",
  base: '/home/'
})


