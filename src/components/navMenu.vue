<template>
  <div>
    <template v-for="(item,index) in navMenus" v-if="!item.hidden&&!item.leaf">
      <el-submenu :index="index+''">
        <template slot="title"><i :class='item.iconCls==null?"el-icon-menu":item.iconCls'></i>{{item.name}}</template>
        <navMenu :navMenus="item.children"></navMenu>
      </el-submenu>
    </template>
    <template  v-else-if ="!item.hidden&&item.leaf">
      <el-menu-item  :index="item.path" :route="item.path" ><template slot="title"><i :class='item.iconCls==null?"el-icon-menu":item.iconCls'></i>{{item.name}}</template></el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    name:"navMenu",
    props: {
      navMenus:{
       required:true
      }
    },
    data() {
      return {}
    },
    methods: {
    }
  }

</script>

