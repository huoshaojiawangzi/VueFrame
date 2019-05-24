<template>
  <div>
    <div>
      <span>登录名</span>
      <el-input size="small" ref="userName" v-model="searchModel.userName"></el-input>
      <span>姓名</span>
      <el-input size="small" ref="name" v-model="searchModel.name"></el-input>
      <span>所属机构</span>
      <el-input size="small" ref="officeName" v-model="searchModel.officeName"></el-input>
      <el-button type="primary" size="small" @click="$refs.pageRef.setList(1)" id="searchButton" style="margin-left:20px" icon="el-icon-search">查询
      </el-button>
      <el-button type="primary" size="small" @click="clearSearchModel()" style="margin-left:20px" icon="el-icon-refresh">重置
      </el-button>
    </div>
    <el-table :data="list" style="width: 100%;margin-top: 20px" :height="this.$store.getters.getTableHeight" @sort-change="sortChange" border>
      <el-table-column prop="office.name" label="所属机构"> </el-table-column>
      <el-table-column label="登录名">
        <template slot-scope="scope">
          <div class="pointer" @click="openInfo(scope.row)">
            {{ scope.row.commonUser.userName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="commonUser.name" sortable='custom' label="姓名"> </el-table-column>
      <el-table-column prop="phone" sortable='custom' label="手机"> </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <div style="float: left" v-for="(role,index) in scope.row.commonUser.roles">
            <div v-if="index === 0">{{role.name}}</div>
            <div v-else>/{{role.name}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger"  size="mini" @click="$refs.pageRef.del(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pageRef" :urlPrefix="urlPrefix" :searchModel="searchModel" v-model="list">
    </pagination>
  </div>
</template>

<script>
  import pagination from '@/components/pagination'
  import {UserSearchModel} from '@/class/searchModel/impl/UserSearchModel';
  export default {
    name:"userList",
    mounted() {
      this.$refs.pageRef.setList();
    },
    components: {pagination},
    data() {
      return {
        //通用
        searchModel:new UserSearchModel(),
        list:null,
        urlPrefix:"user"
      }
    },
    methods: {
      sortChange(column){
        this.$refs.pageRef.sortChange(column);
      },
      openInfo(user){
        this.$store.dispatch("deleteTabAndLive","/user/info").then(()=>{
          this.$router.push({
            name:'userInfo',
            params:{
              user
            }
          })
        })
      },
      clearSearchModel(){
        this.searchModel = new UserSearchModel();
      },
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
