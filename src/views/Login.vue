<style lang="stylus" scoped>

</style>

<template lang="pug">
.login
  el-form(label-width="100px")
    el-form-item(label="用户名")
      el-input 哈哈
    el-form-item(label="密码")
      el-input(type="password")
    el-form-item
      el-button(type="primary" @click="handleLogin") 登录
</template>

<script>
export default {
  mounted () {
  },
  methods: {
    handleLogin () {
      localStorage.setItem('token', 123)
      this.$router.push('/home')
    }
  }
}
</script>