export default{
  state: {
    userInfo:null,//当前用户信息
    menus:'/', //当前用户菜单
    permissions:[]//当前用户权限
  },
  mutations: {
    // 添加tabs
    set_user_info (state, userInfo) {
      state.userInfo = userInfo;
    },
    // 添加tabs
    set_menus (state, menus) {
      state.menus = menus;
    },
    // 设置当前激活的tab
    set_permissions (state, permissions) {
      state.permissions = permissions;
    }
  },
  actions: {
    //根据tag递归获取权限,data数据结构{tag:权限标识,permissions:权限集合}
    getPermission(context, data)
    {
      for (let item of data.permissions) {
        if (item.leaf === true && item.tag === data.tag) {
          return item;
        } else if (item.leaf === false) {
          return context.dispatch("getPermissions", {tag: data.tag, permissions: item.children});
        }
      }
    },
    hasPermission(context,tag)
    {
      let permission = context.dispatch("getPermission", {tag: tag, permissions: this.state.currentUser.permissions});
      return permission != null;
    }
  },
  getters:{
    getUserInfo(state)
    {
      return state.userInfo;
    },
    getMenus(state)
    {
      return state.menus;
    },
    getPermissions(state)
    {
      return state.permissions;
    }

  }
}
