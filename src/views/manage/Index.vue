<style lang="stylus" scoped>

</style>

<template lang="pug">
el-button(type="primary" @click="handleLogout") 退出登录
</template>

<script>
export default {
  methods: {
    handleLogout () {
      localStorage.removeItem('token')
      this.$router.replace('/')
    }
  }
}
</script>