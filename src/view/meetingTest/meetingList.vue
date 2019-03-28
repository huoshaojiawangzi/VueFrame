<template>
  <div>
    <div>
      <!-- addForm -->
      <el-button @click="addFormChange(true)" type="primary" size="small" style="margin-left:10px">增加</el-button>
      <el-dialog title="增加会议" :visible.sync="addFormStatus" width="540px">
          <add ref="addForm" v-bind:departments="departments" @addFormChange="addFormChange" @message="message" @refresh="refresh"></add>
      </el-dialog>
        <!-- treeForm============================================== -->
        <el-button @click="treeAddFormChange(true)" type="primary" size="small" style="margin-left:10px">树形测试</el-button>
        <el-dialog title="增加会议" :visible.sync="treeAddFormStatus" width="540px">
            <treeAdd ref="treeAddForm" v-bind:departments="departments" @treeAddFormChange="treeAddFormChange" @message="message" @refresh="refresh"></treeAdd>
        </el-dialog>
        <!-- ///////////////////treeForm============================================== -->
    </div>
    <el-table :data="list" style="width: 100%" :height="this.tableHeight" ref="table">
      <el-table-column prop="meetName" label="会议名称"> </el-table-column>
      <el-table-column prop="meetDate" label="会议日期"> </el-table-column>
      <el-table-column prop="checkInTime" label="签到时间"> </el-table-column>
      <el-table-column  prop="startTime"label="开始时间"> </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
          <el-button type="primary" plain size="mini" >编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
        </template>
       </el-table-column>
    </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.page"
      :page-sizes="[10, 20, 30, this.total]"
      :page-size= "this.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import add from "@/view/meetingTest/add"
import treeAdd from "@/view/meetingTest/treeAdd"

document.onkeydown = function(e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if (code == 13) {
      $('#searchButton').click();
    }
	};
  export default {
    name:"meetingList",
    created() {
      this.getList();
      this.getdepartments();
    },
    mounted () {
      this.$nextTick(() => {
          this.tableHeight = document.documentElement.clientHeight - 197;
          window.onresize = () => {
            this.tableHeight=document.documentElement.clientHeight - 197;
          }
        })
    },
    components: { add,treeAdd },
    methods: {
        addFormChange(status)
        {
          this.addFormStatus = status;
          if(status){
            this.$nextTick(() => {
              this.$refs.addForm.clearForm("form");
            });
          }
        },
        treeAddFormChange(status)
        {
          this.treeAddFormStatus = status;
          if(status){
            this.$nextTick(() => {
              this.$refs.treeAddForm.clearForm("form");
            });
          }
        },
        getdepartments() {
          this.$axios({
                    method:'post',
                    url:'/meeting/find-meet-user'
            }).then((response) =>{
              console.log(response.data);
                this.departments = response.data.data;
            }).catch((response) =>{
                console.log(response.data)
            })
        },
      //通用
        openFullScreen() {
          const loading = this.$loading({
            lock: true,
            text: '拼命加载中'
          });
        },
        closeFullScreen() {
          const loading = this.$loading({
            lock: true,
            text: '拼命加载中'
          });
          loading.close();
        },
        refresh()
        {
          this.getList();
        },
        message(value,type) {
         this.$message({
           message: value,
           type: type
         });
       },
       del(id){
           this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {});
       },
       sortChange(column){
         this.sort.field = column.prop;
         this.sort.order = column.order == "descending"?"desc" : "asc";
         this.getList();
       },
       handleSizeChange(val) {
         this.limit=parseInt(`${val}`);
         this.getList();
      },
      handleCurrentChange(val)
      {
        this.page=parseInt(`${val}`);
        this.getList();
      },
      searchList(){
        this.page = 1;
        this.getList();
      },
      getList() {
        this.openFullScreen();
        this.$axios({
            method:'get',
            url:'/meeting/find-all',
            params: {
              page:this.page,
              limit:this.limit
            }
        }).then((response) =>{
            this.list = response.data.result;
            this.total = parseInt(response.data.count);
        }).catch((response) =>{
            console.log(response)
        })
        this.closeFullScreen();
      }
    },
    data() {
      return {
        treeAddFormStatus:false,
        addFormStatus:false,
        departments:null,
        //通用
        sort:{
          field:null,
          order:null
        },
        searchModel:{
        },
        inputValue:{
        },
        tableHeight:null,
        page:1,
        limit:10,
        list:null,
        total:0
      }
    }
  }
</script>

<style scoped>
span{
  font-size:14px;
  margin-left:10px
}

.el-input{
  margin-left:8px;
  width:100px;
  margin-left:7px
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 100%;
}
</style>
