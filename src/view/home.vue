<template>
  <div id="parent" :style="parentStyle">
    <div class="el-loading-mask is-fullscreen" style="z-index: 2001;" v-show="$store.state.loading">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path">
          </circle>
        </svg>
        <p class="el-loading-text">拼命加载中</p>
      </div>
    </div>
    <ElementUIStyle> </ElementUIStyle>
    <el-container>
      <el-header style="height:80px;font-size: 12px;background-color:#3F454B">
        <div style="margin-right:15px;margin-top:28px;float: right">
          <span style="color:white;font-size:13px;margin-right: 15px">超级管理员</span>
          <span style="color:white;font-size:13px;margin-right: 15px">王小虎</span>
          <el-dropdown>
            <i class="el-icon-setting" style="color:white"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color:white;font-size:13px">设置</span>
        </div>
        <div style="margin-top: 20px;margin-left:20px;font-size: 22px;color:white">后台管理系统</div>
      </el-header>
    </el-container>
    <el-container id="conent" :style="contentStyle">
      <el-aside width="230px" style="background-color:#545c64">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router >
          <!--树形导航menu-->
          <navMenu :navMenus="menuList"></navMenu>
				</el-menu>
      </el-aside>
      <el-main>
        <div style="background-color: white">
          <!-- 标签页面-->
          <dynamicTab>
          </dynamicTab>
        </div>
      </el-main>
    </el-container>
<!--    <el-container>
      <div style="height:2px;background-color:#A9A9A9;width:1300px">
      </div>
      <el-footer style="height:30px;text-align: center; font-size: 12px;">
        <div style="margin-top:7px">版权所有</div>
      </el-footer>
    </el-container>-->
  </div>
</template>

<script>
import ElementUIStyle from '@/style/ElementUIStyle'
import navMenu from '@/components/navMenu'
import dynamicTab from '@/components/dynamicTab'

export default {
  name: 'Home',
  components: { ElementUIStyle,navMenu,dynamicTab},
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('setFullHeight', document.documentElement.clientHeight);
      window.onresize =()=>{
        this.$store.dispatch('setFullHeight', document.documentElement.clientHeight);
      }
    })
  },
  computed: {
    menuList:{
      get: function () {
        return this.$store.getters.getMenuList;
      },
      set: function () {
      }
    },
    parentStyle:{
      get: function () {
        return "height:" +(this.$store.getters.getfullHeight-1)+"px";
      },
      set: function () {
      }
    },
    contentStyle:{
      get: function () {
        return "height:" +(this.$store.getters.getfullHeight-81)+"px";
      },
      set: function () {
      }
    }
  },
  methods: {
  },
  data(){
    return{
    }
  }
}
</script>
<style scoped>
  .el-main{
    padding: 10px;
    background-color:#F5F5F5;
  }
  body{
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
