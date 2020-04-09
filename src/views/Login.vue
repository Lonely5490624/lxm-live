<style lang="stylus" scoped>
.test-em
  font-family 'icomoon'
  &::after
    content "\e947"
    color #f00
</style>

<template lang="pug">
.login
  el-form(label-width="100px")
    el-form-item(label="用户名")
      el-input 哈哈
    el-form-item(label="密码")
      el-input(type="password")
    em.test-em
    el-form-item
      el-button(type="primary" @click="handleLogin") 登录
</template>

<script>
export default {
  mounted () {
  },
  methods: {
    async handleLogin () {
      const params = {
        username: 'lilong',
        password: '123456'
      }
      const res = await this.$axios.post('login', params)
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
        this.$router.push('/home')
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>