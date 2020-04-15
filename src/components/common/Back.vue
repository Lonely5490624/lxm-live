<style lang="stylus" scoped>
.back
  width 68px
  height 81px
  background url('../../assets/images/back.png') center no-repeat
  background-size 100%
  cursor pointer
</style>

<template lang="pug">
.back(@click="back")
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>