<template>
  <div>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label-width="0px">
          <el-col :span="12">
            <el-form-item label="会议名称" prop="meetName">
              <el-input  v-model="form.meetName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议日期" prop="meetDate">
              <el-input  v-model="form.meetDate" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
      </el-form-item>
      <el-form-item label-width="0px">
          <el-col :span="12">
            <el-form-item label="签到时间" prop="checkInTime">
              <el-input  v-model="form.checkInTime" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-input  v-model="form.startTime" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
      </el-form-item>
      <el-form-item label="用户" prop="users">
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" v-model="form.users"></el-tree>
      </el-form-item >
      <el-form-item style="margin-left:100px;margin-top:30px">
        <el-button type="primary" size="small">提交</el-button>
        <el-button @click="closeForm('form')" size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  created() {
    this.tree = this.departments;
  },
  props:{
    departments:{
      required:true
    }
  },
  methods: {
    handleNodeClick(data) {
       console.log(data);
     },
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           this.$axios({
                     method:'get',
                     url:'/meeting/save-meeting',
                     params: {
                       meetName:this.form.meetName,
                       meetDate:this.form.meetDate,
                       checkInTime:this.form.checkInTime,
                       startTime:this.form.startTime,
                       users:this.form.usersId
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
                     console.log(response.data)
                     this.$emit("message","请求失败","error");
                 })
                 this.$emit("treeAddFormChange",false);
         } else {
           return false;
         }
       });
     },
    clearForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeForm(formName) {
      this.$emit("treeAddFormChange",false);
    }
  },
  data() {
    var validateCascader = (rule, value, callback) => {
      if(value != null&&value.length<2)
      {
        callback(new Error('必须选择用户'));
      }
      else
      {
        callback();
      }
    };
    return {
      tree: new Array(),
       defaultProps: {
         children: 'children',
         label: 'name',
         value:'value'
       },
      cascader:new Array(),
      form: {
        meetName:null,
        meetDate:null,
        checkInTime:null,
        startTime:null,
        users:null,
        usersId:null
      },
      rules: {
        meetName: [
          { required: true,message: '必填项不可为空', trigger: 'change' }
        ],
        meetDate: [
          { required: true,message: '必填项不可为空', trigger: 'change' }
        ],
        checkInTime: [
          { required: true,message: '必填项不可为空', trigger: 'change' }
        ],
        startTime: [
          { required: true,message: '必填项不可为空', trigger: 'change' }
        ],
        users: [
          { validator: validateCascader, trigger: 'change' },
          { required: true,message: '必填项不可为空', trigger: 'change' }
        ]
      }
    };
  }
}
</script>

<style scoped>
.el-input{
  width:150px;
}
.el-select{
  width:150px;
}
</style>
