<style lang="stylus" scoped>

</style>

<template lang="pug">
.classroom-list 我是教室列表
  router-link(to="/classroom") 进入教室
</template>

<script>
export default {
  async mounted () {
    // console.log(11111, this.$axios)
    const res = await this.$axios.get('http://test.baigonglian.com:10005/mvp/solution/findAllSolutionSort')
    console.log(res)
  }
}
</script>