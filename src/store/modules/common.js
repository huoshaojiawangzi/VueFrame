export default {
  state: {
    dictionaryList: [],
    allMenuTree: [],
    allPermissionTree: [],
    officeTree: [],
    userList: [],
    roleList: []
  },
  mutations: {
    set_dictionaryList(state, dictionaryList) {
      state.dictionaryList = dictionaryList;
    },
    set_all_menu_tree(state, allMenuTree) {
      state.allMenuTree = allMenuTree;
    },
    set_all_permission_tree(state, allPermissionTree) {
      state.allPermissionTree = allPermissionTree;
    },
    set_office_trre(state, officeTree) {
      state.officeTree = officeTree;
    },
    set_user_list(state, userList) {
      state.userList = userList;
    },
    set_role_list(state, roleList) {
      state.roleList = roleList;
    },
  },
  actions: {
  },
  getters: {
    getDictionaryList(state) {
      return state.dictionaryList;
    },
    getAllMenuTree(state) {
      return state.allMenuTree;
    },
    getAllPermissionTree(state) {
      return state.allPermissionTree;
    },
    getOfficeTree(state) {
      return state.officeTree;
    },
    getUserList(state) {
      return state.userList;
    },
    getRoleList(state) {
      return state.roleList;
    }
  }
}
