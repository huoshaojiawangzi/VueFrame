<template>
  <div>
  <div>
    <el-tabs
      v-model="activeIndex"
      type="card"
      closable
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item) in this.$store.getters.getTagOptions"
        :label="item.name"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
    <keep-alive :include="keepLives">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name:"dynamicTab",
    watch: {
      '$route'(to){
        //判断路由是否已经打开
        //已经打开的 ，将其置为active
        //未打开的，将其放入队列里
        if(to.path==="/")
        {
          return;
        }
        let promise = this.$store.dispatch('getMenuByPath', {path:to.path,items:this.$store.getters.getMenuList});
        promise.then((menu)=>{
          let flag = false;
          for(let option of this.$store.state.tag.tagOptions)
          {
            if(option.name === menu.name)
            {
              flag = true;
              this.$store.dispatch('setActiveIndex', to.path);
            }
          }
          if(!flag){
            this.$store.dispatch('addTabs',{path: to.path, name: menu.name, componentName:to.name});
            this.$store.dispatch('setActiveIndex', to.path);
          }
        });
      }
    },
    data() {
      return {
      }
    },
    computed: {
      activeIndex:{
        get: function () {
          return this.$store.getters.getActiveIndex;
        },
        set: function () {
        }
      },
      keepLives:{
        get: function () {
          return this.$store.getters.getKeepLives;
        },
        set: function () {
        }
      }
    },
    methods: {
      // tab切换时，动态的切换路由
      tabClick(tab) {
        this.$store.dispatch('setActiveIndex', tab.name);
        this.$router.push(tab.name);
      },
      tabRemove(tabName){
        this.$store.dispatch('deleteTab', tabName);
        if(this.$store.getters.getTagOptions.length === 0) {
          this.$router.push("/");
        }
        else
        {
          this.$router.push(this.activeIndex);
        }
      }
    }
  }
</script>
<style scoped>
</style>
