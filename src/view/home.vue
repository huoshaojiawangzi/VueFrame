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
      <el-header style="height:50px;font-size: 12px;" class="box">
        <div style="margin-right:5px;margin-top:18px;float: right">
          <span style="color:white;font-size:13px;margin-right: 10px">超级管理员</span>
          <span style="color:white;font-size:13px;margin-right: 10px">王小虎</span>
          <el-dropdown>
            <i class="el-icon-setting" style="color:white"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color:white;font-size:13px;">设置</span>
        </div>
        <div style="margin-top: 10px;font-size: 22px;color:white"><i class="el-icon-menu"></i><span style="font-weight:bold;font-size: 21px;margin-left: 8px">后台管理系统</span></div>
      </el-header>
    </el-container>
    <el-container id="conent" :style="contentStyle">
      <el-aside width="230px" style="background-color:#545c64">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#6495ED"
          router >
          <!--树形导航menu-->
          <navMenu :navMenus="menuList"></navMenu>
				</el-menu>
      </el-aside>
      <el-main>
        <div style="background-color: white;box-shadow: 3px 3px 2px #cccccc;">
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
        return "height:" +(this.$store.getters.getfullHeight-51)+"px";
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
  .box {
    background: #4682B4 linear-gradient(to right, rgba(0,255,0,0), #5CCDDF);
    transition: background-color .5s;
  }
  .box:hover {
    background-color: palevioletred;
  }
</style>
