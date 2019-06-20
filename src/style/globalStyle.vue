<template>
  <div>
    <element-ui-style></element-ui-style>
    <common-style></common-style>
  </div>
</template>
<script>
  import elementUiStyle from './children/elementUiStyle'
  import commonStyle from './children/commonStyle'

  export default {
    name: "globalStyle",
    components: {elementUiStyle, commonStyle}
  }
</script>
<style>
</style>
