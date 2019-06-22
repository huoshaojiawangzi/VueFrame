export default {//全局数据
  state: {
    loading: false,
    fullHeight: 0,
    fullWidth: 0,
    style: {
      formItem: {
        labelWidth: '80px'
      }
    },
    props: {
      value: 'id',
      label: 'name',
      children: 'children',
      checkStrictly: true,
      emitPath: false,
      expandTrigger: 'hover'
    }
  },
  mutations: {
    set_loading(state, status) {
      state.loading = status
    },
    set_fullHeight(state, height) {
      state.fullHeight = height;
    }
  },
  actions: {
    setFullHeight(context, height) {
      context.commit("set_fullHeight", height);
    }
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getProps(state) {
      return state.props;
    },
    getfullHeight(state) {
      return state.fullHeight;
    },
    //包含搜索项表格高度
    getTableHeight(state) {
      let th = state.fullHeight - 207;
      return th > 280 ? th : 280
    },
    //树状表格高度
    getTreeTableHeight(state) {
      let th = state.fullHeight - 117;
      return th > 280 ? th : 280
    },
    //不含搜索项表格高度
    getNoSearchTableHeight(state) {
      let th = state.fullHeight - 157;
      return th > 280 ? th : 280
    }
  }
}
