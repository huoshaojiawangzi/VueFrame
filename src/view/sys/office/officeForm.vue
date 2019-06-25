<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>机构录入</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="officeForm" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="office.parent.id" label="上级机构">
                <cascader
                  width="290px"
                  v-model="form.office.parent"
                  :options="this.$store.getters.getOfficeTree">
                </cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="office.name" label="机构名称">
                <el-input v-model="form.office.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="office.manager" label="负责人">
                <el-input v-model="form.office.manager" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="office.phone" label="机构电话">
                <el-input v-model="form.office.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22">
              <el-form-item prop="office.address" label="机构地址">
                <el-input v-model="form.office.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('officeForm')" size="small" icon="el-icon-check">保存
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
    name: "officeForm",
    components: {cascader},
    data: function () {
      let checkPhone = (rule, value, callback) => {
        this.$validator.checkPhone(value,callback);
      };
      return {
        form: {
          office: {
            parent: {id: null},
            name: null,
            manager: null,
            phone: null,
            address: null
          }
        },
        rules: {
          'office.parent.id': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'office.name': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'office.phone': [
            {validator: checkPhone, trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$actionUtils.saveAndForward("office",this.form.office,this.$router)
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
