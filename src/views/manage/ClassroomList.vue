<style lang="stylus" scoped>

</style>

<template lang="pug">
.classroom-list 我是教室列表
  router-link(to="/classroom/234") 进入教室
</template>

<script>
export default {
  async mounted () {
    const params = {
      username: 'lilong',
      password: '123456'
    }
    const res = await this.$axios.post('users/addUser', params)
    console.log(res)
  }
}
</script>