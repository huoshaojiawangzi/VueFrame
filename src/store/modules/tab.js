import userUtils from '@/global/userUtils'

export default{
  state: {
    tabOptions:[],//所有打开的路由,参数:path-路由路径;name-标签名,componentsName-组件名
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
      state.tabOptions.push(item);
    },
    // 删除tabs
    delete_tabs (state,index) {
      state.tabOptions.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      state.activeIndex = index;
    }
  },
  actions: {
    //路由变化时，调用此方法
    routeChange(context,to){
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      if(to.path == null||to.path==="/")
      {
        return;
      }
      let menu = userUtils.getMenuByPath(to.path);
      if(menu!=null)
      {
        context.dispatch('handlerRoute',{tagName:menu.name,route:to})
      }
    },
    handlerRoute(context,params){
      let flag = false;
      for(let option of this.state.tab.tabOptions)
      {
        if(option.name === params.tagName)
        {
          flag = true;
          context.dispatch('setActiveIndex', params.route.path);
        }
      }
      if(!flag){
        context.dispatch('addTabAndLive',{path: params.route.path, name: params.tagName, componentName:params.route.name});
        context.dispatch('setActiveIndex', params.route.path);
      }
    },
    //删除tab并且设置当前activeIndex
    deleteTab(context, path){
      let promise = context.dispatch('deleteTabAndLive', path);
      promise.then((index)=>{
        //设置当前active页面
        if(this.state.tab.tabOptions.length>0)
        {
          if(index === 0)
          {
            context.commit('set_active_index', this.state.tab.tabOptions[0].path);
          }
          else
          {
            context.commit('set_active_index', this.state.tab.tabOptions[index-1].path);
          }
        }
      });
    },
    // 设置当前activeIndex
    setActiveIndex(context,index){
      context.commit("set_active_index",index);
    },
    // 添加tab以及keeplives缓存
    addTabAndLive(context, item) {
      context.commit("add_tabs",item);
      context.commit("add_lives",item.componentName);
    },
    //删除tab以及keeplives缓存
    deleteTabAndLive(context, path){
      let index = 0;
      for (let option of this.state.tab.tabOptions) {
        if (option.path === path) {
          break;
        }
        index++;
      }
      context.commit('delete_lives', index);
      context.commit('delete_tabs', index);
      return index;
    }
  },
  getters:{
    getTabOptions(state)
    {
      return state.tabOptions;
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
