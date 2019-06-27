import store from '@/store'

//通过type以及value来获取字典的label值
//ype:字典类型,value:字典值,defaultValue:如果结果为空，label的默认值
function getDictLabel(type,value,defaultValue) {
  for (let d of store.getters.getDictionaryList) {
    if (type === d.type && value === d.value) {
      return d.label;
    }
  }
  return defaultValue;
}

//通过type以及label来获取字典的value值
//type:字典类型,label:字典标识,defaultValue:如果结果为空，value的默认值
function getDictValue(type,label,defaultValue) {
  for (let d of store.getters.getDictionaryList) {
    if (type === d.type && label === d.label) {
      return d.value;
    }
  }
  return defaultValue;
}
export default {getDictLabel, getDictValue}
