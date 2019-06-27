<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>字典录入</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="dictionaryForm" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="dictionary.type" label="类型">
                <el-input v-model="form.dictionary.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="dictionary.label" label="标签">
                <el-input v-model="form.dictionary.label" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="dictionary.value" label="键值">
                <el-input v-model="form.dictionary.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="dictionary.sort" label="排序">
                <el-input v-model="form.dictionary.sort" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22">
              <el-form-item prop="dictionary.remarks" label="描述">
                <el-input v-model="form.dictionary.remarks" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('dictionaryForm')" size="small" icon="el-icon-check">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: "dictionaryForm",
    created() {
      if(this.$route.params.dictionary!==undefined){
        this.form.dictionary.type = this.$route.params.dictionary.type;
        this.form.dictionary.remarks = this.$route.params.dictionary.remarks;
      }
    },
    data: function () {
      let duplicateValue = (rule, value, callback) => {
        this.$validator.duplicateFileds('dictionary',{type:this.form.dictionary.type,value:value},null,callback,"该类型下键值已存在");
      };
      return {
        form: {
          dictionary: {
            type:null,
            label:null,
            value:null,
            sort:null,
            remarks:null
          }
        },
        rules: {
          'dictionary.type': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'dictionary.label': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'dictionary.value': [
            {required: true, message: "必填项不能为空", trigger: 'blur'},
            {validator: duplicateValue, trigger: 'blur'}],
          'dictionary.sort': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'dictionary.remarks': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$actionUtils.saveAndForward("dictionary",this.form.dictionary,this.$router)
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
