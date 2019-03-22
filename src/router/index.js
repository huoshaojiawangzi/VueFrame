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
            import ('@/view/cameraTest/cameraRecordList'), index:'3', name: '抓拍列表' },
        { path: '/meetingList', component: () =>
            import ('@/view/meetingTest/meetingList'),  index:'5',name: '会议列表' },
        { path: '/userList', component: () =>
            import ('@/view/test/test'), index:'10', name: '用户列表' }
      ]
    }],
  mode:"history",
  base: '/sports/'
})
