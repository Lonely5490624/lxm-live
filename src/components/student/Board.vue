<style lang="stylus" scoped>
.board
  position relative
  .board-rope
    display flex
    justify-content space-between
    width 162px
    margin 0 auto
    .rope-item
      width 14px
      height 75px
      background url('../../assets/images/user_rope.png') center no-repeat
      background-size 100%
  .board-content
    margin-top -2px
    position relative
    z-index 1
    width 314px
    height 95px
    border 10px solid $hisYellow
    background-color $hisDeepYellow
    font-size 40px
    font-weight bold
    text-align center
    line-height 75px
    border-radius 47.5px
    color #ffffff

</style>

<template lang="pug">
.board
  .board-rope
    .rope-item
    .rope-item
  .board-content
    slot
</template>

<script>
export default {
  
}
</script>