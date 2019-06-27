<template>
  <div>
    <div>
      <span>类型</span>
      <el-input size="small" v-model="searchModel.type"></el-input>
      <span>标签</span>
      <el-input size="small" v-model="searchModel.label"></el-input>
      <span>描述</span>
      <el-input size="small" v-model="searchModel.remarks"></el-input>
      <el-button type="primary" size="small" @click="$refs.pageRef.setList(1)" id="searchButton"
                 style="margin-left:20px" icon="el-icon-search">查询
      </el-button>
      <el-button type="primary" size="small" @click="clearSearchModel()" style="margin-left:20px"
                 icon="el-icon-refresh">重置
      </el-button>
    </div>
    <el-table :data="list" style="width: 100%;margin-top: 20px" :height="this.$store.getters.getTableHeight" border
              stripe @sort-change="sortChange" :header-cell-style="{background:'#FCFCFC'}">
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column sortable prop="label" label="标签"></el-table-column>
      <el-table-column sortable prop="value" label="键值"></el-table-column>
      <el-table-column prop="remarks" label="描述"></el-table-column>
      <el-table-column sortable prop="sort" label="排序"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openNext(scope.row)"  plain>添加标签</el-button>
          <el-button type="warning" size="mini" @click="openModify(scope.row)" plain>修改</el-button>
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
  import {DictionarySearchModel} from '@/class/searchModel/impl/DictionarySearchModel';

  export default {
    name: "dictionaryList",
    mounted() {
      let column = {
        prop: "type",
        order: "descending"
      };
      this.sortChange(column);
    },
    components: {pagination},
    data() {
      return {
        //通用
        searchModel: new DictionarySearchModel(),
        list: null,
        urlPrefix: "dictionary"
      }
    },
    methods: {
      sortChange(column) {
        this.$refs.pageRef.sortChange(column);
      },
      openNext(dictionary) {
        this.$store.dispatch("deleteTabAndLive", "/dictionary/form").then(()=>{
          this.$router.push({
            name: 'dictionaryForm',
            params: {
              dictionary
            }
          })
        })
      },
      openModify(dictionary) {
        this.$router.push({
          name: 'dictionaryModify',
          params: {
            dictionary
          }
        })
      },
      clearSearchModel() {
        this.searchModel = new DictionarySearchModel();
      },
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
