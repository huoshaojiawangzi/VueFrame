<template>
  <div>
    <el-cascader
      :style="this.style"
      v-model="ids"
      :props="this.props"
      :options="this.options"
      :change-on-select="changeOnSelect"
      expand-trigger="hover"
      @change="cascaderChange">
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
      changeOnSelect: {},
      width: {type: String}
    },
    created() {
      this.style = "width:" + this.width;
      this.setFormOfficeIds(this.options);
    },
    watch: {
      value: {
        handler(val) {
          if (val === undefined || val.id == null) {
            this.ids = [];
          }
        },
        deep: true
      },
    },
    data() {
      return {
        style: null,
        ids: []
      }
    },
    methods: {
      setFormOfficeIds(options) {
        if (this.value.id != null) {
          for (let o of options) {
            if (o.id === this.value.id) {
              this.ids.unshift(o.id);
              return true
            } else if (o.children != null) {
              if (this.setFormOfficeIds(o.children)) {
                this.ids.unshift(o.id);
                return true;
              } else {
                return false;
              }
            }
          }
        }
      },
      loopGetItemById(tree, id) {
        for (let item of tree) {
          if (item.id === id) {
            return item;
          } else if (item.children !== undefined&&item.children.length>0) {
            let result = this.loopGetItemById(item.children, id);
            if (result !== undefined) {
              return result
            }
          }
        }
      },
      cascaderChange(value) {
        this.$emit('input', this.loopGetItemById(this.options, value[value.length - 1]));
      }
    }
  }

</script>

