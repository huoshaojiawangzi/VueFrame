function filterTree(data,parent){//将数据中的空children设置为null
  let copyParent = null;
  if(parent!=null){
    copyParent = Object.assign({}, parent);
    copyParent.children = undefined;
  }
  for(let i=0;i<data.length;i++){
    //设置父类
    data[i].parent = copyParent;
    if(data[i].children == null || data[i].children.length === 0){
      // children若为空数组，则将children设为undefined
      data[i].children = undefined;
    }else if(data[i].children !== undefined){
      // children若不为空数组，则继续 递归调用 本方法
      filterTree(data[i].children,data[i]);
    }
  }
  return data;
}
function copy(originalData,resultData) {
  for(let item of originalData){
    resultData.push();
  }
}

function copyObj(obj) {
  let newObj = Object.assign({}, obj);;
  if(newObj.children instanceof Array && newObj.children.length>0){
    for(let item of newObj.children)
  }
}

export default {filterTree,copy}
