<template>
  <div>
    <el-tree
      ref="tree"
      @check="handleCheck"
      show-checkbox
      default-expand-all
      :data="this.options"
      :props="this.$store.getters.getProps"
      node-key="id"></el-tree>
  </div>
</template>

<script>
  export default {
    name: "tree",
    props: {
      value:{},
      options: {type: Array,required: true}
    },
    mounted() {
      if (this.value instanceof Array && this.value.length > 0) {
        this.$refs.tree.setCheckedNodes(this.filterNodes(this.value));
      }
    },
    data() {
      return {
      }
    },
    methods: {
      filterNodes(){
        let filterNodes = [];
        for(let item of this.value){
          if(item.children.length === 0){
            filterNodes.push(item);
          }
        }
        return filterNodes;
      },
      handleCheck() {
        let items = [];
        for(let id of this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())){
          items.push({id:id});
        }
        this.$emit('input', items);
      }
    }
  }

</script>

