<template>
  <div class="">
    <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item prop="userId" label="用户">
        <el-select v-model="form.userId" placeholder="请选择">
          <el-option
            v-for="item in this.userOptions"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type" label="进出类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="captureName" label="照片名称">
        <el-input  v-model="form.captureName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submitForm('form')"  size="small">提交</el-button>
        <el-button @click="closeForm('form')" size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  props:{
		editForm:{
			required:true
		},
    userOptions:{
			required:true
		}
  },
  computed: {
    ...mapState({
       state:state=>state.cameraRecord
    })
  },
  data() {
    var validateRequired = (rule, value, callback) => {
      if (value === ''||value===null) {
        callback(new Error('必填项不可为空'));
      } else {
        callback();
      }
    };
    return {
      typeOptions: [{
          value: '2',
          label: '出'
        }, {
          value: '1',
          label: '进'
        }],
      form: {
        id:null,
        userId:null,
        type:null,
        captureName:null
      },
      rules2: {
        userId: [
          { validator: validateRequired, trigger: 'change' }
        ],
        type: [
          { required: true,message: '必填项不可为空', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           this.$axios({
                     method:'get',
                     url:'/cameraRecord/edit-cameraRecord',
                     params: {
                       id:this.form.id,
                       userId:this.form.userId,
                       captureName:this.form.captureName,
                       type: this.form.type
                     }
                 }).then((response) =>{
                     if(response.data.code%2 == 1)
                     {
                       this.$emit("message",response.data.msg,"success");
                       this.$emit("refresh");
                     }
                     else
                     {
                        this.$emit("message",response.data.msg,"error");
                     }
                 }).catch((response) =>{
                     this.$emit("message","请求失败","error");
                 })
                 this.state.editShow = false;
         } else {
           return false;
         }
       });
     },
    clearForm(formName) {
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.form.id = this.editForm.id;
        this.form.userId=this.editForm.user.id;
        this.form.type = this.editForm.type;
        this.form.captureName = this.editForm.captureName;
      });
    }
  }
}
</script>

<style scoped>
.el-input{
  width:180px;
}
.el-select{
  width:180px;
}
</style>
