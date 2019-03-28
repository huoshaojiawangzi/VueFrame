import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import cameraRecord from '@/store/modules/cameraRecord.js';
import tag from '@/store/modules/tab.js';

export default new vuex.Store({
    modules: {
      cameraRecord,
      tag
    },
    state:{
        loading:false,
        menuList:[
          {
            path:"/",
            iconCls: 'el-icon-picture',
            name: '抓拍管理',
            hidden:false,
            leaf:false,
            children: [
              { path: '/cameraRecordList', name: '抓拍列表',hidden:false,leaf:true},
              { name: '树形测试',hidden:false,leaf:false,children: [
                  { path: '/meetingList',name: '会议列表',hidden:false,leaf:true},
                  {
                    iconCls: 'el-icon-message',
                    name: '其他测试',
                    hidden:false,
                    leaf:true,
                    path: '/userList'
                  }
                ]}
            ]
          },
          {
            path:"/",
            iconCls: 'el-icon-message',
            name: '会议管理',
            hidden:false,
            leaf:false,
            children: [
              { path: '/meetingList',name: '会议列表',hidden:false,leaf:true}
            ]
          },
          {
            iconCls: 'el-icon-message',
            name: '其他测试',
            hidden:false,
            leaf:true,
            path: '/userList'
          }
        ]
    },
    mutations: {
       showLoading(state){
           state.loading = true
       },
       hideLoading (state) {
           state.loading = false
       }
    },
    getters: {
        getMenuList(state){
          return state.menuList;
        }
    },
    actions: {
      getMenuByPath(state,data)
      {
        for(let item of data.items)
        {
          console.log(item);
          if(item.leaf == true && item.path == data.path)
          {
            return item;
          }
          else if(item.leaf == false)
          {
            return state.dispatch("getMenuByPath",{path:data.path,items:item.children});
          }
          else
          {
            continue;
          }
        }
      }
    }
})
