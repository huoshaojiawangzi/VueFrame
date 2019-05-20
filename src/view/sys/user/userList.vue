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
    <el-table :data="list" style="width: 100%" :height="this.$store.getters.getTableHeight" @sort-change="$refs.pageRef.sortChange()">
      <el-table-column prop="office.name" label="所属机构"> </el-table-column>
      <el-table-column prop="commonUser.userName" label="登录名"> </el-table-column>
      <el-table-column prop="commonUser.name" sortable='custom' label="姓名"> </el-table-column>
      <el-table-column prop="phone" sortable='custom' label="手机"> </el-table-column>
      <el-table-column prop="commonUser.roles[0].name" sortable='custom' label="角色"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning"  size="mini" @click="openModify(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger"  size="mini" @click="$refs.pageRef.del(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pageRef" :urlPrefix="urlPrefix" :searchModel="searchModel" @setList="setList">
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
    components: {
      pagination
    },
    methods: {
      openModify(user){
        this.$router.push({
          name:'userModify',
          params:{user}
        })
      },
      clearSearchModel(){
        this.searchModel = new UserSearchModel();
      },
      setList(val){
        this.list = val;
      }
    },
    data() {
      return {
        //通用
        searchModel:new UserSearchModel(),
        list:null,
        urlPrefix:"user"
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
