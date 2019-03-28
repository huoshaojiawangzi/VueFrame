import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'


Vue.use(Router);
export default new Router({
  routes:[
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
            import ('@/view/test/test'), name: 'userList'}
      ]
    }],
  mode:"history",
  base: '/sports/'
})
