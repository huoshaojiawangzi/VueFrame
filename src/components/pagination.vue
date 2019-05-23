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
      value:{
        type:Array
      },
      searchModel:{
       required:true
      },
      urlPrefix :{
        required: true
      }
    },
    data() {
      return {
        total:0,
        list:[]
      }
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
            url:'/'+this.urlPrefix+'/delete',
            params: {
              id:id
            }
          }).then((response) =>{
            new Promise((resolve)=>{
              if(this.list.length<2&&this.searchModel.page>1)
              {
                this.searchModel.page = this.searchModel.page-1;
              }
              resolve();
            }).then(()=>{this.setList()});
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          }).catch((response) =>{
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          })
        }).catch(() => {});
      },
      //排序方法，可多个属性排序
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
          this.setList();
        }
      },
      //每页数量改变
      handleSizeChange(val) {
        this.searchModel.limit=parseInt(`${val}`);
        this.setList();
      },
      //当前页码改变
      handleCurrentChange(val) {
        this.searchModel.page=parseInt(`${val}`);
        this.setList();
      },
      //获取list，page:当前页码
      setList(page) {
        if(page!=null)
        {
          this.searchModel.page = page;
        }
        this.$store.commit('set_loading',true);
        this.$axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method:'post',
          url:'/'+this.urlPrefix+'/find-page',
          transformRequest: [function(data) {
            data = JSON.stringify(data);
            return data;
          }],
          data: this.searchModel
        }).then((response) =>{
          this.list = response.data.result.content;
          this.$emit("input",this.list);
          this.total = parseInt(response.data.result.totalElements);
        }).catch((response) =>{
          console.log(response)
        }).finally(()=>{
          this.$store.commit('set_loading',false);
        });
      }
    }
  }

</script>

