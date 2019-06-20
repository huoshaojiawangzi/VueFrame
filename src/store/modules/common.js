export default {
  state: {
    officeTree: [],
    userList: [],
    roleList: []
  },
  mutations: {
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
  actions: {},
  getters: {
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
