<template>
  <div>
    <el-checkbox-group v-model="ids" :max="this.max" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in this.options" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "checkboxGroup",
    props: {
      value: {},
      max: {type: Number},
      options: {type: Array, required: true},
    },
    created() {
      this.setIds();
    },
    watch: {
      value: {
        handler(val) {
          if (val.length < 1) {
            this.ids = [];
          }
        },
        deep: true
      },
    },
    data() {
      return {
        ids: []
      }
    },
    methods: {
      setIds() {
        if (this.value.length > 0) {
          for (let item of this.value) {
            this.ids.push(item.id)
          }
        }
      },
      getItemById(id) {
        for (let item of this.options) {
          if (id === item.id) {
            return item;
          }
        }
      },
      handleCheckedCitiesChange(value) {
        let items = [];
        for (let id of value) {
          items.push(this.getItemById(id))
        }
        this.$emit('input', items);
      }
    }
  }

</script>

