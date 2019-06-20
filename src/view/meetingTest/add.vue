<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm" status-icon>
      <el-form-item label-width="0px">
        <el-col :span="12">
          <el-form-item label="会议名称" prop="meetName">
            <el-input v-model="form.meetName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会议日期" prop="meetDate">
            <el-date-picker size="small" style="width:150px"
                            v-model="form.meetDate" value-format="yyyy-MM-dd"
                            type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-col :span="12">
          <el-form-item label="签到时间" prop="checkInTime">
            <el-time-picker size="small" style="width:150px"
                            arrow-control
                            :picker-options="{selectableRange: '07:30:00 - 18:30:00'}"
                            value-format="HH:mm:ss"
                            v-model="form.checkInTime">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="startTime">
            <el-time-picker size="small" style="width:150px"
                            arrow-control
                            :picker-options="{selectableRange: '07:30:00 - 18:30:00'}"
                            value-format="HH:mm:ss"
                            v-model="form.startTime">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="参会人员" prop="usersId">
        <el-cascader
          style="width:400px"
          placeholder="搜索"
          :options="this.cascader"
          v-model="form.usersId"
          filterable
          change-on-select>
        </el-cascader>
      </el-form-item>
      <el-form-item style="margin-left:100px;margin-top:30px">
        <el-button type="primary" @click="submitForm('form')" size="small">提交</el-button>
        <el-button @click="closeForm('form')" size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    created() {
      for (let d of this.departments) {
        let users = [];
        for (let u of d.children) {
          users.push({
            value: u.value,
            label: u.name
          });
        }
        this.cascader.push({
          value: d.value,
          label: d.name,
          children: users
        });
      }
    },
    props: {
      departments: {
        required: true
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.users = this.form.usersId[0] + "/" + this.form.usersId[1];
            this.$axios({
              method: 'post',
              url: '/meeting/save-meeting',
              params: {
                meetName: this.form.meetName,
                meetDate: this.form.meetDate,
                checkInTime: this.form.checkInTime,
                startTime: this.form.startTime,
                users: this.form.users
              }
            }).then((response) => {
              if (response.data.code % 2 === 1) {
                this.$emit("message", response.data.msg, "success");
                this.$emit("refresh");
              } else {
                this.$emit("message", response.data.msg, "error");
              }
            }).catch((response) => {
              console.log(response.data);
              this.$emit("message", "请求失败", "error");
            });
            this.$emit("addFormChange", false);
          } else {
            return false;
          }
        });
      },
      clearForm(formName) {
        this.$refs[formName].resetFields();
      },
      closeForm() {
        this.$emit("addFormChange", false);
      }
    },
    data() {
      const validateCascader = (rule, value, callback) => {
        if (value != null && value.length < 2) {
          callback(new Error('必须选择用户'));
        } else {
          callback();
        }
      };
      return {
        cascader: [],
        form: {
          meetName: null,
          meetDate: null,
          checkInTime: null,
          startTime: null,
          users: null,
          usersId: null
        },
        rules: {
          meetName: [
            {required: true, message: '必填项不可为空', trigger: 'change'}
          ],
          meetDate: [
            {required: true, message: '必填项不可为空', trigger: 'change'}
          ],
          checkInTime: [
            {required: true, message: '必填项不可为空', trigger: 'change'}
          ],
          startTime: [
            {required: true, message: '必填项不可为空', trigger: 'change'}
          ],
          usersId: [
            {validator: validateCascader, trigger: 'change'},
            {required: true, message: '必填项不可为空', trigger: 'change'}
          ]
        }
      };
    }
  }
</script>

<style scoped>
  .el-input {
    width: 150px;
  }

  .el-select {
    width: 150px;
  }
</style>
