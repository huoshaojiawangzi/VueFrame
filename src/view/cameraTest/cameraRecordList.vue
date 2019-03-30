<template>
  <div>
    <div>
      <span>用户名称</span>
      <el-input size="small" ref="userName" v-model="inputValue.userName"></el-input>
      <span>记录时间</span>
      <el-date-picker size="small" style="width:183px"
        v-model="inputValue.startTime" value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        placeholder="起始时间" ref="startTime">
      </el-date-picker>
      -
      <el-date-picker size="small" style="width:183px"
        v-model="inputValue.endTime" value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        placeholder="结束时间">
      </el-date-picker>
      <el-button type="primary"  size="small" @click="searchList" id="searchButton" style="margin-left:20px" icon="el-icon-search">搜索
      </el-button>
      <!-- addForm -->
      <el-button  type="primary"  @click="state.addShow=true"  size="small" style="margin-left:10px"  icon="el-icon-plus">增加</el-button>
      <el-dialog title="增加进出记录" :visible.sync="state.addShow" width="340px">
          <add ref="addForm" v-bind:userOptions="userOptions"  @message="message" @refresh="getList"></add>
      </el-dialog>
      <!-- editForm -->
      <el-dialog title="编辑进出记录" :visible.sync="state.editShow" width="340px">
          <edit ref="editForm" v-bind:editForm="editForm" v-bind:userOptions="userOptions"  @message="message" @refresh="getList"></edit>
      </el-dialog>
      <el-dialog  :visible.sync="captureStatus" width="430px">
        <img :src="this.capturePath" class="image" style="width:400px;height:400px" alt="">
      </el-dialog>
      <!-- addFormTest============================================================ -->
      <el-button  type="primary"  @click="state.radioShow=true" size="small" style="margin-left:10px">radio测试</el-button>
      <el-dialog title="增加进出记录" :visible.sync="state.radioShow" width="400px">
          <radioAdd ref="radioForm" v-bind:userOptions="userOptions"  @message="message" @refresh="getList"></radioAdd>
      </el-dialog>
      <!-- ////addFormTest============================================================ -->
    </div>
    <el-table :data="list" style="width: 100%" :height="this.$store.getters.getTableHeight" ref="table" @sort-change="sortChange">
      <el-table-column prop="user.realName" label="用户"> </el-table-column>
      <el-table-column prop="camera.location.name" label="摄像头"> </el-table-column>
      <el-table-column prop="time" sortable='custom' label="时间"> </el-table-column>
      <el-table-column label="进出类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ getCameraType(scope.row.type) }}</span>
        </template>
       </el-table-column>
       <el-table-column label="抓拍照片">
         <template slot-scope="scope">
           <i class="el-icon-search" v-show="scope.row.captureName!=null" style="color:#2b57ff" @click="showCapture(scope.row.captureName)"> </i>
         </template>
      </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
          <el-button type="warning"  size="mini" @click="showEditForm(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger"  size="mini" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </template>
       </el-table-column>
    </el-table>
  <div class="block" style="margin-top: 5px;">
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
import add from "@/view/cameraTest/add"
import edit from "@/view/cameraTest/edit"
import radioAdd from "@/view/cameraTest/radioAdd"//测试radio
import {mapState} from 'vuex'

document.onkeydown = function(e) {
  const theEvent = window.event || e;
  const code = theEvent.keyCode || theEvent.which;
  if (code === 13) {
      $('#searchButton').click();
    }
	};
  export default {
    name:"cameraRecordList",
    created() {
      this.getList();
      this.getUserOptions();
    },
    watch:{//监听数据
      state:{
         handler(obj){
             if(obj.addShow)
             {
               this.$nextTick(() => {
                  this.$refs.addForm.clearForm("form");
               });

             }
             else if(obj.editShow)
             {
               this.$nextTick(() => {
                  this.$refs.editForm.clearForm("form");
               });
             }
             else if(obj.radioShow)
             {
               this.$nextTick(() => {
                   this.$refs.radioForm.clearForm("form");
               });
             }
         },
         deep:true
     }
    },
    components: {
      add,
      edit,
      radioAdd
    },
    computed: {
      ...mapState({
        state:state=>state.cameraRecord
      })
    /*  tableHeight:{
        get : function(){
            let th = this.$store.getters.getfullHeight-197;
            return th>300 ? th:300
        },
        set : function(){
        }
      }*/
    },
    methods: {
        showCapture(name)
        {
          this.capturePath= "/static/capture/"+name;
          this.$nextTick(() => {
            this.captureStatus = true;
          });
        },
        showEditForm(editForm)
        {
          this.editForm = editForm;
          this.$nextTick(() => {
            this.state.editShow = true;
          });
        },
        getCameraType(key)
        {
          return key === "1"?"进":key === "2"?"出":"会议"
        },
        getUserOptions() {
          this.$axios({
                    method:'get',
                    url:'/api/user/findUser'
            }).then((response) =>{
                this.userOptions = response.data.result;
            }).catch((response) =>{
                console.log(response.data)
            })
        },
        //通用
        changeFullScreen(status){
          if(status)
          {
            this.loading = this.$loading({
              lock: true,
              text: '拼命加载中'
            });
          }
          else
          {
              this.loading.close();
          }
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
          }).then(() => {
            this.$axios({
                method:'get',
                url:'/cameraRecord/delete-cameraRecord',
                params: {
                  id:id
                }
            }).then((response) =>{
                this.getList();
                this.message(response.data.msg,"success");
            }).catch((response) =>{
                this.message(response.data.msg,"error");
            })
          }).catch(() => {});
       },
       sortChange(column){
         this.sort.field = column.prop;
         this.sort.order = column.order === "descending"?"desc" : "asc";
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
        this.searchModel.userName = this.inputValue.userName;
        this.searchModel.startTime = this.inputValue.startTime;
        this.searchModel.endTime = this.inputValue.endTime;
        this.getList();
      },
      test(val){
          return "new"+val;
      },
      getList() {
        this.$store.commit('showLoading');
        this.$axios({
            method:'get',
            url:'/cameraRecord/find-record',
            params: {
              page:this.page,
              limit:this.limit,
              field:this.sort.field,
              order:this.sort.order,
              userName:this.searchModel.userName,
              startTime:this.searchModel.startTime,
              endTime:this.searchModel.endTime
            }
        }).then((response) =>{
            this.list = response.data.result;
            this.total = parseInt(response.data.count);
        }).catch((response) =>{
            console.log(response)
        }).finally(()=>{
          this.$store.commit('hideLoading');
        });
      }
    },
    data() {
      return {
        captureStatus:false,
        capturePath:"",
        userOptions:null,
        editForm:null,
        //通用
        sort:{
          field:null,
          order:null
        },
        searchModel:{
          userName:null,
          startTime:null,
          endTime:null
        },
        inputValue:{
          userName:null,
          startTime:null,
          endTime:null
        },
        loading:null,
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
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 100%;
}


</style>
