export default{
  state: {
    tagOptions:[],//所有打开的路由
    activeIndex:'/main' //激活状态
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      console.log("增加tab");
      this.state.tagOptions.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.tagOptions) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.tagOptions.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      console.log("激活tab");
      this.state.activeIndex = index;
    },
  },
  actions: {

  }
}
