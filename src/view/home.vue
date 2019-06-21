<template>
  <div id="parent" :style="parentStyle">
    <golbal-style></golbal-style>
    <div class="el-loading-mask is-fullscreen" style="z-index: 2001;" v-show="this.$store.getters.getLoading">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path">
          </circle>
        </svg>
        <p class="el-loading-text">拼命加载中</p>
      </div>
    </div>
    <el-container>
      <el-header style="height:50px;font-size: 12px;" class="box">
        <div style="float: right;margin-top: 18px">
          <el-dropdown>
            <i class="el-icon-setting" style="color:white;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color:white;font-size:13px;">设置</span>
        </div>
        <div><span style="color:white;font-size:13px;margin-right: 10px;float: right;margin-top: 18px"
                   v-if="userInfo!=null">{{userInfo.name}}</span></div>
        <div
          style='height:30px;width:30px;float: right;border-radius: 50%;margin-right:10px;margin-top: 10px;background: url("/static/image/霞头像.jpg") no-repeat center top;background-size: 100%'></div>
        <div><span style="color:white;font-size:13px;margin-right: 20px;float: right;margin-top: 18px"
                   v-if="userInfo!=null">{{userInfo.roles[userInfo.roleIndex].name}}</span></div>
        <div style="margin-top: 10px;font-size: 22px;color:white"><i class="el-icon-menu" @click="changeCollapse()"></i><span
          style="font-weight:bold;font-size: 21px;margin-left: 8px">后台管理系统</span></div>
      </el-header>
    </el-container>
    <el-container id="conent" :style="contentStyle">
      <el-aside width="230px">
        <el-menu
          :style="menuStyle"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#6495ED">
          <!--树形导航menu-->
          <navMenu :navMenus="menuTree"></navMenu>
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
  </div>
</template>

<script>
  import golbalStyle from '@/style/globalStyle'
  import navMenu from '@/components/navMenu'
  import dynamicTab from '@/components/dynamicTab'

  export default {
    name: 'Home',
    components: {golbalStyle, navMenu, dynamicTab},
    created() {
      this.getMenusAndPermissions();
    },
    mounted() {
      this.$nextTick(() => {
        this.$store.dispatch('setFullHeight', document.documentElement.clientHeight).catch();
        window.onresize = () => {
          this.$store.dispatch('setFullHeight', document.documentElement.clientHeight).catch();
        }
      })
    },
    computed: {
      userInfo: {
        get: function () {
          return this.$store.getters.getUserInfo;
        },
        set: function () {
        }
      },
      menuTree: {
        get: function () {
          if(this.$store.getters.getMenuTree.length>0)
          {
            return this.$store.getters.getMenuTree[0].children;
          }
        },
        set: function () {
        }
      },
      parentStyle: {
        get: function () {
          return "height:" + (this.$store.getters.getfullHeight - 1) + "px";
        },
        set: function () {
        }
      },
      contentStyle: {
        get: function () {
          return "height:" + (this.$store.getters.getfullHeight - 51) + "px";
        },
        set: function () {
        }
      },
      menuStyle: {
        get: function () {
          return "height:" + (this.$store.getters.getfullHeight - 51) + "px";
        },
        set: function () {
        }
      }

    },
    methods: {
      //获取当前用户的菜单以及权限
      getMenusAndPermissions() {
        this.$store.commit('set_loading', true);
        this.$axios({
          method: 'get',
          url: '/getMenusAndPermissions'
        }).then((response) => {
          if (response.data.code === 0) {
            this.$store.commit("set_menu_tree", this.$treeUtils.filterTree(response.data.result.menuTree));
            this.$store.commit("set_permission_tree", this.$treeUtils.filterTree(response.data.result.permissionTree));
            this.$store.commit('set_loading', false);
            this.getOfficeTree();
            this.getRoleList();
            this.getAllMenuTree();
          } else {
            this.$router.push({path: "/login"});
          }
        })
      },
      getAllMenuTree() {
        this.$axios({
          method: 'post',
          url: '/menu/find-roots'
        }).then((response) => {
            this.$store.commit("set_all_menu_tree", this.$treeUtils.filterTree(response.data.result));
        })
      },
      getOfficeTree() {
        this.$axios({
          method: 'get',
          url: '/office/find-roots'
        }).then((response) => {
          if (response.data.code === 0) {
            this.$store.commit("set_office_trre", this.$treeUtils.filterTree(response.data.result));
          }
        })
      },
      getRoleList() {
        this.$axios({
          method: 'get',
          url: '/role/find-all'
        }).then((response) => {
          if (response.data.code === 0) {
            this.$store.commit("set_role_list", response.data.result);
          }
        })
      }
    },
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .box {
    background: #4682B4 linear-gradient(to right, rgba(0, 255, 0, 0), #5CCDDF);
    transition: background-color .5s;
  }

  .box:hover {
    background-color: palevioletred;
  }
</style>
