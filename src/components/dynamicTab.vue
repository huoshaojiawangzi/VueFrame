<template>
  <div>
  <div>
    <el-tabs
      v-model="activeIndex"
      type="card"
      closable
      @tab-click="tabClick"
      @tab-remove="tabRemove">
      <el-tab-pane
        :key="item.name"
        v-for="(item) in this.$store.getters.getTabOptions"
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
        if(this.$store.getters.getTabOptions.length === 0) {
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
