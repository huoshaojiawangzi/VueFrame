import axios from 'axios'
import store from '@/store'
import Vue from 'vue';
//新创建一个vue实例,用来展示message
let v = new Vue();

//保存实体
//name:实体名称；data：实体对象
function save(name, data) {
  return new Promise((resolve, reject) => {
    store.commit('set_loading', true);
    axios({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: '/' + name + '/save',
      transformRequest: [function (data) {
        data = JSON.stringify(data);
        return data;
      }],
      data: data
    }).then((response) => {
      if (response.data.code === 0) {
        v.$message({
          message: response.data.msg,
          type: "success"
        });
        resolve(0);
      } else {
        v.$message({
          message: response.data.msg,
          type: "warning"
        });
        resolve(1);
      }
    }).catch((response) => {
      v.$message({
        message: response.data.msg,
        type: "error"
      });
      reject(1);
    }).finally(() => {
      store.commit('set_loading', false);
    });
  })
}

//保存并跳转到列表页
//name:实体名称；data：实体对象；route：当前路由对象
function saveAndForward(name, data, route) {
  store.commit('set_loading', true);
  axios({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: '/' + name + '/save',
    transformRequest: [function (data) {
      data = JSON.stringify(data);
      return data;
    }],
    data: data
  }).then((response) => {
    if (response.data.code === 0) {
      openList(name, route);
      v.$message({
        message: response.data.msg,
        type: "success"
      });
    } else {
      v.$message({
        message: response.data.msg,
        type: "warning"
      });
    }
  }).catch((response) => {
    v.$message({
      message: response.data.msg,
      type: "error"
    });
  }).finally(() => {
    store.commit('set_loading', false);
  });
}

//跳转到list页面
function openList(name, route) {
  store.dispatch("deleteTabAndLive", "/" + name + "/list").then(() => {
    store.dispatch("deleteTabAndLive", "/" + name + "/form").catch(() => {
    });
    route.push({
      name: name + 'List'
    })
  })
}

//删除实体，并返回promise
//name：实体名称；id：实体id
//return：promise：成功-0，失败-1
function del(name, id) {
  return new Promise((resolve, reject) => {
    v.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      axios({
        method: 'get',
        url: '/' + name + '/delete',
        params: {
          id: id
        }
      }).then((response) => {
        if (response.data.code === 0) {
          v.$message({
            message: response.data.msg,
            type: "success"
          });
          resolve(0);
        } else {
          v.$message({
            message: response.data.msg,
            type: "warning"
          });
          resolve(1);
        }
      }).catch((error) => {
        console.log(error);
        v.$message({
          message: "出现未知错误",
          type: "error"
        });
        reject(1);
      })
    }).catch(() => {
    });
  })
}

export default {save, saveAndForward, del};
