export default {
  state: {
    userInfo: null,//当前用户信息
    menuTree: '/', //当前用户菜单
    permissionTree: [],//当前用户权限
    menuResult: null,
    permissionResult: null,
  },
  mutations: {
    set_user_info(state, userInfo) {
      state.userInfo = userInfo;
    },
    set_menu_tree(state, menuTree) {
      state.menuTree = menuTree;
    },
    set_permission_tree(state, permissionTree) {
      state.permissionTree = permissionTree;
    },
    set_menu_result(state, menu) {
      state.menuResult = menu;
    },
    set_permission_result(state, permission) {
      state.permission = permission
    }
  },
  actions: {},
  getters: {
    getUserInfo(state) {
      if (state.userInfo == null) {
        state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
      return state.userInfo;
    },
    getMenuTree(state) {
      return state.menuTree;
    },
    getPermissionTree(state) {
      return state.permissionTree;
    }

  }
}
