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
    name:"cascader",
    props: {
      value:{},
      props:{},
      options:{required:true},
      changeOnSelect:{},
      width:{type:String}
    },
    created(){
      this.style = "width:"+this.width;
      this.setFormOfficeIds(this.options);
    },
    data() {
      return {
        style:null,
        ids:[],
        item:{id:null}
      }
    },
    methods: {
      setFormOfficeIds(options){
        if(this.value.id!=null)
        {
          for(let o of options)
          {
            if(o.id === this.value.id)
            {
              this.ids.unshift(o.id);
              return true
            }
            else if(o.children!=null)
            {
              if(this.setFormOfficeIds(o.children))
              {
                this.ids.unshift(o.id);
                return true;
              }
              else
              {
                return false;
              }
            }
          }
        }
      },
      cascaderChange(value)
      {
        this.item.id = value[value.length-1];
        this.$emit('input',this.item);
      }
    }
  }

</script>

