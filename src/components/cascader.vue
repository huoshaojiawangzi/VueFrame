<template>
  <div>
    <el-cascader
      :style="this.style"
      v-model="id"
      :props="this.props"
      :options="this.options"
      @change="cascaderChange"
      filterable>
    </el-cascader>
  </div>
</template>

<script>
  export default {
    name: "cascader",
    props: {
      value: {},
      props: {},
      options: {required: true},
      width: {type: String},
      exclude:{}
    },
    created() {
      this.style = "width:" + this.width;
      if (this.value.id != null) {
        this.id = this.value.id
      }
      this.setCascaderOptions();
    },
    watch: {
      value: {
        handler(val) {
          if (val === undefined || val.id == null) {
            this.id = null;
          }
        },
        deep: true
      },
    },
    data() {
      return {
        cascaderOptions:null,
        style: null,
        id:null
      }
    },
    methods: {
      setCascaderOptions(){
          if(this.exclude!=null){
            this.excludeItem(this.options,this.exclude);
          }
      },
      excludeItem(tree,exclude){
        for(let item of tree){
          if(item.id === exclude.id){
            tree.splice(tree.findIndex(item => item.id === exclude.id), 1);
            return;
          }else{
            this.excludeItem(item.children,exclude);
          }
        }
      },
      loopGetItemById(tree, id) {
        for (let item of tree) {
          if (item.id === id) {
            return Object.assign({}, item);
          } else if (item.children !== undefined&&item.children.length>0) {
            let result = this.loopGetItemById(item.children, id);
            if (result !== undefined) {
              return Object.assign({}, result);
            }
          }
        }
      },
      cascaderChange(value) {
        this.$emit('input', this.loopGetItemById(this.options, value));
      }
    }
  }

</script>

