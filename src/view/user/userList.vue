<template>
  <div>
    <div>
      用户列表
    </div>
    <input :value="this.winHeight"> </input>
    model <input v-model="this.winHeight"> </input>
  </div>
</template>

<script>
  export default {
    mounted() {
      let vm = this;
      this.winHeight = document.documentElement.clientHeight;
      this.$nextTick(() => {
          window.onresize = function(){
            vm.winHeight=document.documentElement.clientHeight;
          }
        })
    },
    data(){
      return{
          winHeight:null
      }
    }
  }

</script>
