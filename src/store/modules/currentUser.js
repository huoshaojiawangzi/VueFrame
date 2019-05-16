export default{
  state: {
    userInfo:null,//当前用户信息
    menus:'/', //当前用户菜单
    permissions:[]//当前用户权限
  },
  mutations: {
    set_user_info (state, userInfo) {
      state.userInfo = userInfo;
    },
    set_menus (state, menus) {
      state.menus = menus;
    },
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
    },
    getMenuByPath(context, data) {
      for (let item of data.items) {
        if (item.leaf === false && item.path === data.path) {
          return item;
        } else if (item.leaf === true) {
          return context.dispatch("getMenuByPath", {path: data.path, items: item.children});
        }
      }
    }
  },
  getters:{
    getUserInfo(state)
    {
      if(state.userInfo == null)
      {
        state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
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
