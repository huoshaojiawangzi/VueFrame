import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import cameraRecord from './modules/cameraRecord.js';
import tab from './modules/tab.js';
import currentUser from './modules/currentUser.js';
import common from './modules/common.js';
import global from './modules/global';


export default new vuex.Store({
  modules: {
    cameraRecord,
    tab,
    currentUser,
    common,
    global
  },
  state: {
    dictionarys:[]
  },
  mutations: {
    set_dictionarys(state,dictionarys){
      state.dictionarys = dictionarys;
    }
  },
  getters: {
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
    }
  }
})
