<template>
  <div id="parent" :style="this.parentStyle">
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
      <el-header style="height:60px;text-align: right; font-size: 12px;background-color: rgb(238, 241, 246)">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
    </el-container>
    <el-container id="conent" :style="this.contentStyle">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router >
          <!--树形导航menu-->
          <navMenu :navMenus="menuList"></navMenu>
				</el-menu>
      </el-aside>
      <el-main>
          <!-- 标签页面-->
          <dynamicTab>
          </dynamicTab>
      </el-main>
    </el-container>
    <el-container>
      <el-footer style="height:30px;text-align: center; font-size: 12px;background-color: rgb(238, 241, 246)">
        <div style="margin-top:7px">版权所有</div>
      </el-footer>
    </el-container>
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
    this.changeHeight();
    window.onresize = function(){
      this.changeHeight();
    }
  },
  computed: {
    menuList:{
      get: function () {
        return this.$store.getters.getMenuList;
      },
      set: function () {
      }
    }
  },
  methods: {
    changeHeight() {
      let winHeight = document.documentElement.clientHeight;
      let parentHeight = winHeight;
      this.parentStyle = "height:" + parentHeight + "px";
      this.contentStyle = "height:" + (parentHeight - 90) + "px";
    }
  },
  data(){
    return{
      parentStyle:0,
      contentStyle:0
    }
  }
}
</script>
