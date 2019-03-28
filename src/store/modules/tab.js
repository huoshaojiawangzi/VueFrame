export default{
  state: {
    tagOptions:[],//所有打开的路由,参数:path-路由路径;name-标签名,componentsName-组件名
    activeIndex:'/', //激活状态
    keepLives:[]//所有标签页中缓存的路由路径
  },
  mutations: {
    // 添加tabs
    add_lives (state, item) {
      state.keepLives.push(item);
    },
    // 删除tabs
    delete_lives (state,index) {
      state.keepLives.splice(index, 1);
    },
    // 添加tabs
    add_tabs (state, item) {
      state.tagOptions.push(item);
    },
    // 删除tabs
    delete_tabs (state,index) {
      state.tagOptions.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      state.activeIndex = index;
    }
  },
  actions: {
    //删除tab并且设置当前activeIndex
    deleteTab(context, path){
      let index = 0;
      for (let option of this.state.tag.tagOptions) {
        if (option.path === path) {
          break;
        }
        index++;
      }
      context.commit('delete_tabs', index);
      //删除keeplives缓存
      context.commit('delete_lives', index);
      //设置当前active页面
      if(this.state.tag.tagOptions.length>0)
      {
        if(index === 0)
        {
          context.commit('set_active_index', this.state.tag.tagOptions[0].path);
        }
        else
        {
          context.commit('set_active_index', this.state.tag.tagOptions[index-1].path);
        }
      }
    },
    // 设置当前activeIndex
    setActiveIndex(context,index){
      context.commit("set_active_index",index);
    },
    // 添加tab以及keeplives缓存
    addTabs(context, item) {
      context.commit("add_tabs",item);
      context.commit("add_lives",item.componentName);
    }
  },
  getters:{
    getTagOptions(state)
    {
      return state.tagOptions;
    },
    getActiveIndex(state)
    {
      return state.activeIndex;
    },
    getKeepLives(state)
    {
      return state.keepLives;
    }

  }
}
