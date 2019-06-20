function filterTree(data, parent) {//将数据中的空children设置为null
  let copyParent = null;
  if (parent != null) {
    copyParent = Object.assign({}, parent);
    copyParent.children = undefined;
  }
  for (let i = 0; i < data.length; i++) {
    //设置父类
    data[i].parent = copyParent;
    if (data[i].children == null || data[i].children.length === 0) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined;
    } else if (data[i].children !== undefined) {
      // children若不为空数组，则继续 递归调用 本方法
      filterTree(data[i].children, data[i]);
    }
  }
  return data;
}

//获取深度拷贝的递归数组
function getCopyArray(originalData) {
  let resultData = [];
  for (let orginItem of originalData) {
    resultData.push(getCopyObj(orginItem));
  }
  return resultData;
}

//获取深度拷贝的递归对象
function getCopyObj(obj) {
  let newObj = Object.assign({}, obj);
  if (obj.children instanceof Array && obj.children.length > 0) {
    newObj.children = [];
    for (let orginItem of obj.children) {
      newObj.children.push(getCopyObj(orginItem));
    }
  }
  return newObj;
}

export default {filterTree, getCopyArray, getCopyObj}
