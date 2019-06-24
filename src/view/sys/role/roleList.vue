<template>
  <div>
    <el-table :data="list" style="width: 100%" :height="this.$store.getters.getNoSearchTableHeight" border stripe :header-cell-style="{background:'#FCFCFC'}">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="openModify(scope.row.id)" plain>修改</el-button>
          <el-button type="danger" size="mini" @click="$refs.pageRef.del(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pageRef" :urlPrefix="urlPrefix" :searchModel="searchModel" v-model="list">
    </pagination>
  </div>
</template>

<script>
  import pagination from '@/components/pagination'
  import {RoleSearchModel} from '@/class/searchModel/impl/RoleSearchModel';

  export default {
    name: "roleList",
    mounted() {
      this.$refs.pageRef.setList();
    },
    components: {pagination},
    data() {
      return {
        //通用
        searchModel: new RoleSearchModel(),
        list: null,
        urlPrefix: "role"
      }
    },
    methods: {
      getRole(id){
        return this.$axios({
          method: 'get',
          url: '/role/get',
          params: {
            id: id
          }
        }).then((response) => {
          if(response.data.code === 0){
            return response.data.result;
          }
        })
      },
      openModify(id) {
        this.getRole(id).then((role)=>{
          this.$router.push({
            name: 'roleModify',
            params: {
              role
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  span {
    font-size: 14px;
    margin-left: 10px
  }

  .el-input {
    margin-left: 8px;
    width: 100px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>
