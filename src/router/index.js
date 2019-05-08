import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Home from '@/view/home'


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
        { path: '/cameraRecordList', component: () =>
            import ('@/view/cameraTest/cameraRecordList'), name: 'cameraRecordList'},
        { path: '/meetingList', component: () =>
            import ('@/view/meetingTest/meetingList'),name: 'meetingList'},
        { path: '/userList', component: () =>
            import ('@/view/sys/user/userList'), name: 'userList'}
      ]
    }],
  mode:"history",
  base: '/home/'
})
