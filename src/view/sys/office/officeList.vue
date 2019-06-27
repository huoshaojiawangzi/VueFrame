<template>
  <div>
    <el-table :data="tree" style="width: 100%" :height="this.$store.getters.getTreeTableHeight" border row-key="id"
              :default-expand-all="true" stripe :header-cell-style="{background:'#FCFCFC'}">
      <el-table-column prop="name" label="机构名称">
      </el-table-column>
      <el-table-column prop="manager" label="机构负责人"></el-table-column>
      <el-table-column prop="phone" label="机构电话"></el-table-column>
      <el-table-column prop="address" label="机构地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="openModify(scope.row)" plain>修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "officeList",
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
          url: '/office/find-roots'
        }).then((response) => {
          if (response.data.result.length > 0) {
            this.tree = response.data.result[0].children;
            this.$store.commit("set_office_trre", this.$treeUtils.filterTree(response.data.result));
          }
        }).catch((response) => {
          console.log(response)
        }).finally(() => {
          this.$store.commit('set_loading', false);
        });
      },
      openModify(office) {
        this.$router.push({
          name: 'officeModify',
          params: {
            office
          }
        })
      },
      del(id) {
        this.$actionUtils.del("office", id).then((code) => {
          if (code === 0) {
            this.$store.dispatch("deleteTabAndLive", "/office/form").catch(() => {
            });
            this.setTree();
          }
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
