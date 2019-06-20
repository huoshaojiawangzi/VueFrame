<template>
  <div>
    hello
  </div>
</template>

<script>

  export default {
    name: "userList",
    created() {
      this.$axios({
        method: 'get',
        url: '/sports/public/test',
        params: {
          id: "222"
        }
      }).then((response) => {
        console.log(response.data);
      }).catch((response) => {
        console.log(response)
      })
    },
    components: {},
    methods: {},
    data() {
      return {}
    }
  }
</script>

<style scoped>
  span {
    font-size: 14px;
    margin-left: 10px
  }
</style>
