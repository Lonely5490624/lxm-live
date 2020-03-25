<style lang="stylus" scoped>

</style>

<template lang="pug">
el-button(type="primary" @click="handleLogout") 退出登录
</template>

<script>
export default {
  methods: {
    async handleLogout () {
      const res = await this.$axios.post('logout')
      if (res.code === 200) {
        localStorage.removeItem('token')
        this.$router.replace('/')
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>