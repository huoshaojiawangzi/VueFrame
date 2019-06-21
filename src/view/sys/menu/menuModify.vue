<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>菜单修改</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="menuForm" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="menu.parent.id" label="上级菜单">
                <cascader
                  width="290px"
                  v-model="form.menu.parent"
                  :options="this.$store.getters.getAllMenuTree">
                </cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="menu.name" label="菜单名称">
                <el-input v-model="form.menu.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="menu.path" label="链接">
                <el-input v-model="form.menu.path" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="menu.iconCls" label="图标">
                <el-input v-model="form.menu.iconCls" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="menu.hidden" label="可见">
                <el-radio v-model="form.menu.hidden" :label="false">显示</el-radio>
                <el-radio v-model="form.menu.hidden" :label="true">隐藏</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="menu.sort" label="排序">
                <el-input v-model="form.menu.sort" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('menuForm')" size="small" icon="el-icon-check">保存
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
  import cascader from '@/components/cascader'

  export default {
    name: "menuModify",
    components: {cascader},
    created() {
      this.form.menu = this.$route.params.menu;
      console.log(this.$route.params.menu);
    },
    data: function () {
      let checkNum = (rule, value, callback) => {
        const reg = /^\d+$/;
        if (value == null || value === "" || reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正整数'))
        }
      };
      return {
        form: {
          menu: null
        },
        rules: {
          'menu.parent.id': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'menu.name': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'menu.hidden': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'menu.sort': [
            {validator: checkNum, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      openList() {
        this.$store.dispatch("deleteTabAndLive", "/menu/list").then(() => {
          this.$store.dispatch("clearPageCache", "/menu/form").catch();
          this.$router.push({
            name: 'menuList'
          })
        })
      },
      clearForm() {
        this.form = {
          menu: {
            parent: {id: null},
            name: null,
            manager: null,
            phone: null,
            address: null
          }
        };
        this.$refs['menuForm'].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form.menu);
            this.$store.commit('set_loading', true);
            this.$axios({
              headers: {
                'Content-Type': 'application/json'
              },
              url: '/menu/save',
              method: 'post',
              transformRequest: [function (data) {
                data = JSON.stringify(data);
                return data;
              }],
              data: this.form.menu
            }).then((response) => {
              if (response.data.code === 0) {
                this.openList();
                this.$message({
                  message: response.data.msg,
                  type: "success"
                });
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "warning"
                });
              }
            }).catch((response) => {
              this.$message({
                message: response.data.msg,
                type: "error"
              });
            }).finally(() => {
              this.$store.commit('set_loading', false);
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 290px;
  }

  .el-select {
    width: 290px;
  }

  .el-cascader {
    width: 290px;
  }
</style>
