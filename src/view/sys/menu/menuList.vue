<template>
  <div>
    <el-table :data="tree" style="width: 100%" :height="this.$store.getters.getTreeTableHeight" border row-key="id"
              :default-expand-all="true" stripe :header-cell-style="{background:'#FCFCFC'}">
      <el-table-column prop="name" label="菜单名称" width="200">
      </el-table-column>
      <el-table-column prop="path" label="链接"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column label="可见" width="90">
        <template slot-scope="scope">
            {{ scope.row.hidden?"隐藏":"显示"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain>添加下级</el-button>
          <el-button type="warning" size="mini" @click="openModify(scope.row)" plain>修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "menuList",
    created() {
      this.setTree();
    },
    data() {
      return {
        tree: []
      }
    },
    methods: {
      setTree() {
        this.$store.commit('set_loading', true);
        this.$axios({
          method: 'post',
          url: '/menu/find-roots'
        }).then((response) => {
          if(response.data.result.length>0){
            this.tree = response.data.result[0].children;
            this.$store.commit("set_all_menu_tree", this.$treeUtils.filterTree(response.data.result));
          }
        }).catch((response) => {
          console.log(response)
        }).finally(() => {
          this.$store.commit('set_loading', false);
        });
      },
      openModify(menu) {
        this.$router.push({
          name: 'menuModify',
          params: {
            menu
          }
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'get',
            url: '/menu/delete',
            params: {
              id: id
            }
          }).then((response) => {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
            this.$store.dispatch("clearPageCache", "/menu/form").catch();
            this.setTree();
          }).catch((response)=>{
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          })
        }).catch(() => {
        });
      },
    }
  }
</script>

<style scoped>
  span {
    font-size: 14px;
    margin-left: 10px
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>
