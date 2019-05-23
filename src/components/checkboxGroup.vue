<template>
  <div>
    <el-checkbox-group  v-model="ids" :max="this.max" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in this.options" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name:"checkboxGroup",
    props: {
      value:{},
      max:{type:Number},
      options:{type:Array,required:true},
    },
    created(){
      this.setFormRoleIds();
    },
    watch:{
      value:{
        handler(val){
          if(val.length<1){
            this.ids = [];
          }
        },
        deep:true
      },
    },
    data() {
      return {
        ids:[]
      }
    },
    methods: {
      setFormRoleIds(){
        if(this.value.length>0)
        {
          for(let role of this.value)
          {
            this.ids.push(role.id)
          }
        }
      },
      handleCheckedCitiesChange(value){
        let roles = [];
        for(let roleId of value)
        {
          let role = {id:roleId};
          roles.push(role)
        }
        this.$emit('input',roles);
      }
    }
  }

</script>

