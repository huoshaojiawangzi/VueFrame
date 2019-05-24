export default{//全局数据
  state: {
    loading: false,
    fullHeight: 0,
    fullWidth:0,
    style:{
      formItem:{
        labelWidth:'80px'
      }
    },
    props:{
      value: 'id',
      label: 'name',
      children: 'children',
    }
  },
  mutations: {
    set_loading(state,status) {
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
  getters:{
    getfullHeight(state) {
      return state.fullHeight;
    },
    getTableHeight(state){
      let th = state.fullHeight-207;
      return th>280 ? th:280
    }
  }
}
