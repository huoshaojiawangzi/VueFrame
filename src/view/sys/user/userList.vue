<template>
  <div>
    <div>
      <span>登录名</span>
      <el-input size="small" ref="userName" v-model="inputValue.userName"></el-input>
      <span>姓名</span>
      <el-input size="small" ref="userName" v-model="inputValue.userName"></el-input>
      <span>所属机构</span>
      <el-input size="small" ref="userName" v-model="inputValue.officeName"></el-input>
      <el-button type="primary"  size="small" @click="searchList" id="searchButton" style="margin-left:20px" icon="el-icon-search">查询
      </el-button>
    </div>
    <el-table :data="list" style="width: 100%" :height="this.$store.getters.getTableHeight" ref="table" @sort-change="sortChange">
      <el-table-column prop="office.name" label="所属机构"> </el-table-column>
      <el-table-column prop="commonUser.userName" label="登录名"> </el-table-column>
      <el-table-column prop="commonUser.name" sortable='custom' label="姓名"> </el-table-column>
      <el-table-column prop="phone" sortable='custom' label="手机"> </el-table-column>
      <el-table-column prop="commonUser.roles[0].name" sortable='custom' label="角色"> </el-table-column>
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
  document.onkeydown = function(e) {
    const theEvent = window.event || e;
    const code = theEvent.keyCode || theEvent.which;
    if (code === 13) {
      this.$jquery('#searchButton').click();
    }
  };
  export default {
    name:"userList",
    created() {
      this.getList();
    },
    components: {
    },
    computed: {
    },
    methods: {
      del(id){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'get',
            url:'/user/delete',
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
        this.searchModel.name = this.inputValue.name;
        this.searchModel.officeName = this.inputValue.officeName;
        this.getList();
      },
      getList() {
        this.$store.commit('showLoading');
        this.$axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method:'post',
          url:'/user/find-page',
          transformRequest: [function(data) {
            data = JSON.stringify(data);
            return data;
          }],
          data:{
            page:this.page,
            limit:this.limit,
            userName:this.searchModel.userName,
            name:this.searchModel.name,
            officeName:this.searchModel.officeName
          }
        }).then((response) =>{
          console.log(response.data.result);
          this.list = response.data.result.content;
          this.total = parseInt(response.data.result.totalElements);
        }).catch((response) =>{
          console.log(response)
        }).finally(()=>{
          this.$store.commit('hideLoading');
        });
      }
    },
    data() {
      return {
        //通用
        sort:{
          field:null,
          order:null
        },
        searchModel:{
          userName:null,
          name:null,
          officeName:null
        },
        inputValue:{
          userName:null,
          name:null,
          officeName:null
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
