import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import cameraRecord from '@/store/modules/cameraRecord.js';
import tab from '@/store/modules/tab.js';
import currentUser from '@/store/modules/currentUser.js';


export default new vuex.Store({
  modules: {
    cameraRecord,
    tab,
    currentUser
  },
  state: {
    loading: false,
    fullHeight: 0,
    dictionarys:[],
    menuList: [
      {
        path: "/",
        iconCls: 'el-icon-picture',
        name: '抓拍管理',
        hidden: false,
        leaf: false,
        children: [
          {path: '/cameraRecordList', name: '抓拍列表', hidden: false, leaf: true},
          {
            name: '树形测试', hidden: false, leaf: false, children: [
              {path: '/meetingList', name: '会议列表', hidden: false, leaf: true},
              {
                iconCls: 'el-icon-message',
                name: '其他测试',
                hidden: false,
                leaf: true,
                path: '/userList'
              }
            ]
          }
        ]
      },
      {
        path: "/",
        iconCls: 'el-icon-location',
        name: '会议管理',
        hidden: false,
        leaf: false,
        children: [
          {path: '/meetingList', name: '会议列表', hidden: false, leaf: true}
        ]
      },
      {
        iconCls: 'el-icon-star-off',
        name: '其他测试',
        hidden: false,
        leaf: false
      }
    ]
  },
  mutations: {
    set_dictionarys(state,dictionarys){
      state.dictionarys = dictionarys;
    },
    showLoading(state) {
      state.loading = true
    },
    hideLoading(state) {
      state.loading = false
    },
    set_fullHeight(state, height) {
      state.fullHeight = height;
    }
  },
  getters: {
    getMenuList(state) {
      return state.menuList;
    },
    getfullHeight(state) {
      return state.fullHeight;
    },
    getTableHeight(state){
      let th = state.fullHeight-187;
      return th>300 ? th:300
    }
  },
  actions: {
    //通过type以及value来获取字典的label值
    //data:{type:字典类型,value:字典值,default:如果结果为空，label的默认值}
    getDictLabel(context, data)
    {
      for(let d of this.state.dictionarys)
      {
        if (data.type.equals(d.type) && data.value.equals(d.value))
        {
          return d.label;
        }
      }
      return data.default;
    },
    //通过type以及label来获取字典的value值
    //data:{type:字典类型,label:字典标识,default:如果结果为空，value的默认值}
    getDictValue(context, data)
    {
      for(let d of this.state.dictionarys)
      {
        if (data.type.equals(d.type) && data.value.equals(d.label))
        {
          return d.value;
        }
      }
      return data.default;
    },
    setFullHeight(context, height) {
      context.commit("set_fullHeight", height);
    },
    getMenuByPath(context, data) {
      for (let item of data.items) {
        if (item.leaf === true && item.path === data.path) {
          return item;
        } else if (item.leaf === false) {
          return context.dispatch("getMenuByPath", {path: data.path, items: item.children});
        }
      }
    }
  }
})
