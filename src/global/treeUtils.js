export default {
  filterTree(data){//将数据中的空children设置为null
    for(let i=0;i<data.length;i++){
      if(data[i].children === undefined || data[i].children.length === 0){
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      }else {
        // children若不为空数组，则继续 递归调用 本方法
        this.filterTree(data[i].children);
      }
    }
    return data;
  }
}
