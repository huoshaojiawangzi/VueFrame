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
          <navMenu :navMenus="menuList"></navMenu>
				</el-menu>
      </el-aside>
      <el-main>
          <!-- 此处放置el-tabs代码 -->
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
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
        </div>
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

export default {
  name: 'Home',
  components: { ElementUIStyle,navMenu },
  mounted() {
    this.changeHeight();
    window.onresize = function(){
      this.changeHeight();
    }
  },
  computed: {
    activeIndex:{
      get: function () {
        return this.$store.getters.getActiveIndex;
      },
      set: function () {
      }
    }

  },
  watch: {
    '$route'(to){
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      if(to.path==="/")
      {
        return;
      }
      let flag = false;
      for(let option of this.$store.state.tag.tagOptions)
      {
        if(option.name === to.name)
        {
          flag = true;
          this.$store.dispatch('setActiveIndex', to.path);
        }
      }
      if(!flag){
        this.$store.dispatch('addTabs',{path: to.path, name: to.name});
        this.$store.dispatch('setActiveIndex', to.path);
      }

    }
  },
  methods: {
    changeHeight() {
      let winHeight = document.documentElement.clientHeight;
      let parentHeight = winHeight;
      this.parentStyle = "height:" + parentHeight + "px";
      this.contentStyle = "height:" + (parentHeight - 90) + "px";
    },
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
  },
  data(){
    return{
      menuOpeions:[],
      //tabs
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
      parentStyle:0,
      contentStyle:0,

      menuList:[
        {
          path:"/",
          iconCls: 'el-icon-picture',
          name: '抓拍管理',
          hidden:false,
          leaf:false,
          children: [
            { path: '/cameraRecordList', name: '抓拍列表',hidden:false,leaf:true},
            { name: '树形测试',hidden:false,leaf:false,children: [
                { path: '/meetingList',name: '会议列表',hidden:false,leaf:true},
                {
                  iconCls: 'el-icon-message',
                  name: '其他测试',
                  hidden:false,
                  leaf:true,
                  path: '/userList'
                }
              ]}
          ]
        },
        {
          path:"/",
          iconCls: 'el-icon-message',
          name: '会议管理',
          hidden:false,
          leaf:false,
          children: [
            { path: '/meetingList',name: '会议列表',hidden:false,leaf:true}
          ]
        },
        {
          iconCls: 'el-icon-message',
          name: '其他测试',
          hidden:false,
          leaf:true,
          path: '/userList'
        }
        ]
    }
  }
}
</script>
