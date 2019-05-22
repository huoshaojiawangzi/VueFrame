<template>
</template>
<style>
body {
    padding:0;  /*去除内边距*/
    border:0;   /*去除边框*/
    margin:0;   /*去除外边距*/
}
::-webkit-scrollbar {/*滚动条长宽*/
  width: 7px;
  height: 10px;
}
::-webkit-scrollbar-thumb {/*滚动条颜色圆角*/
  background-color: #a1a3a9;
  border-radius: 3px;
}
.el-dialog__title{
  color:#808080;
  font-size:15px;
}
.el-dialog__body{
  overflow-y: auto;
  max-height: 370px;
}
.el-dialog__wrapper{
  overflow-y: hidden;
}
.el-main{
  padding:5px 10px 5px 10px;
  background-color:#F5F5F5;
}
.el-tabs__nav-scroll{
  color: #F5F5F5; /*导航选中颜色*/
}
</style>
