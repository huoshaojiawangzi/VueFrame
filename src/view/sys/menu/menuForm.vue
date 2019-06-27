<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>菜单录入</span>
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
                <el-radio v-model="form.menu.hidden" label="false">显示</el-radio>
                <el-radio v-model="form.menu.hidden" label="true">隐藏</el-radio>
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
    name: "menuForm",
    components: {cascader},
    created() {
      if (this.$route.params.parent !== undefined) {
        this.form.menu.parent = this.$route.params.parent;
      }
    },
    data: function () {
      let checkNum = (rule, value, callback) => {
        this.$validator.checkNum(value, callback);
      };
      let duplicatePath = (rule, value, callback) => {
        this.$validator.duplicateFileds('menu', {path: value}, null, callback, "链接已存在");
      };
      return {
        form: {
          menu: {
            parent: {id: null},
            name: null,
            path: null,
            iconCls: null,
            hidden: null,
            sort: null
          }
        },
        rules: {
          'menu.parent.id': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'menu.name': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'menu.hidden': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'menu.sort': [{validator: checkNum, trigger: 'blur'}],
          'menu.path': [{validator: duplicatePath, trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$actionUtils.saveAndForward("menu", this.form.menu, this.$router)
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
</style>
