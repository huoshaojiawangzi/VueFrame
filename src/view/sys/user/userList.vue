<template>
  <div>
    <div>
      <span>登录名</span>
      <el-input size="small" ref="userName" v-model="searchModel.userName"></el-input>
      <span>姓名</span>
      <el-input size="small" ref="name" v-model="searchModel.name"></el-input>
      <span>所属机构</span>
      <el-input size="small" ref="officeName" v-model="searchModel.officeName"></el-input>
      <el-button type="primary"  size="small" @click="getList(1)" id="searchButton" style="margin-left:20px" icon="el-icon-search">查询
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
        :current-page="this.searchModel.page"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size= "this.searchModel.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
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
        if(column.prop!=null&&column.order!=null)
        {
          let sortItem = {
            property: column.prop,
            order: column.order === "descending"?"desc" : "asc"
          };
          //如果有相同元素，移除
          let oldIndex = this.searchModel.pageSorts.findIndex(item => item.property === sortItem.property);
          if(oldIndex!==-1)
          {
            this.searchModel.pageSorts.splice(oldIndex);
          }
          this.searchModel.pageSorts.unshift(sortItem);
          this.getList();
        }
      },
      handleSizeChange(val) {
        this.searchModel.limit=parseInt(`${val}`);
        this.getList();
      },
      handleCurrentChange(val) {
        this.searchModel.page=parseInt(`${val}`);
        this.getList();
      },
      //page:当前页码
      getList(page) {
        if(page!=null)
        {
          this.searchModel.page = page;
        }
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
          data: this.searchModel
        }).then((response) =>{
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
        searchModel:{
          page : 1,
          limit:10,
          pageSorts:[],
          userName:null,
          name:null,
          officeName:null
        },
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
