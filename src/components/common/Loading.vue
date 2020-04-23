<style lang="stylus" scoped>
.lxm-loading-cover
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0,0,0,.7)
  z-index 999
  .loading-box
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    text-align center
    img.lxm-loading-img
      width 140px
      height 150px
    .lxm-loading-text
      color #ffffff
      font-size 16px
      margin-top 10px
</style>

<template lang="pug">
.lxm-loading-cover
  .loading-box
    img.lxm-loading-img(src="../../assets/images/lxm.gif")
    p.lxm-loading-text 拼命加载中...
</template>

<script>
export default {
  
}
</script>