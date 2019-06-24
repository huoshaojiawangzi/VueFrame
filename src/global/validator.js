import axios from 'axios'

//此方法用来验证不可重复字段
//name：实体名称 filed：要验证的重复字段 value：字段值 id：实体类id，没有填null callback：返回的callback  msg：验证重复后的错误信息
function duplicateFiled(name,filed, value, id, callback, msg) {
  if (value === "" || value === null) {
    return callback();
  } else {
    axios({
      method: 'get',
      url: '/'+name+'/find-by-filed',
      params: {
        filed: filed,
        value: value
      }
    }).then((response) => {
      if (response.data.result.length === 0) {
        return callback();
      } else if (response.data.result.length === 1) {
        let result = response.data.result[0];
        if (result.id === id) {
          return callback();
        }
      }
      return callback(new Error(msg));
    })
  }
}

function checkPhone(value, callback) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  if (value == null || value === "" || reg.test(value)) {
    return callback();
  } else {
    return callback(new Error('请输入正确的手机号'));
  }
}

function checkNum (value, callback) {
  const reg = /^\d+$/;
  if (value == null || value === "" || reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正整数'))
  }
};

export default{duplicateFiled,checkPhone,checkNum}
