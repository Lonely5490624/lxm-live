<style lang="stylus" scoped>

</style>

<template lang="pug">
.home 首页
  el-button(type="primary" @click="logout") 退出登录
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      this.$router.replace('/')
    }
  }
}
</script>