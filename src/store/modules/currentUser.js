export default{
  state: {
    userInfo:null,//当前用户信息
    menuTree:'/', //当前用户菜单
    permissionTree:[]//当前用户权限
  },
  mutations: {
    set_user_info (state, userInfo) {
      state.userInfo = userInfo;
    },
    set_menu_tree (state, menuTree) {
      state.menuTree = menuTree;
    },
    set_permission_tree (state, permissionTree) {
      state.permissionTree = permissionTree;
    }
  },
  actions: {
    //根据tag递归获取权限,data数据结构{tag:权限标识,permissionTree:权限集合}
    getPermission(context, data)
    {
      for (let item of data.permissionTree) {
        if (item.leaf === true && item.tag === data.tag) {
          return item;
        } else if (item.leaf === false) {
          return context.dispatch("getPermissions", {tag: data.tag, permissionTree: item.children});
        }
      }
    },
    hasPermission(context,tag)
    {
      let permission = context.dispatch("getPermission", {tag: tag, permissionTree: this.state.currentUser.permissionTree});
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
      return state.menuTree;
    },
    getPermissions(state)
    {
      return state.permissionTree;
    }

  }
}
