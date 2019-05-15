<template>
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
</template>

<script>
  export default {
    name:"pagination",
    props: {
      searchModel:{
       required:true
      }
    },
    data() {
      return {}
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
    }
  }

</script>

