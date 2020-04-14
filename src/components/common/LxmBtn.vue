<style lang="stylus" scoped>
/* 乐学猫按钮 */
.lxm-btn
  width 380px
  height 55px
  line-height 55px
  background-color #E98900
  border-radius 27.5px
  position relative
  font-size 20px
  color #fff
  overflow hidden
  cursor pointer
  display inline-block
  &::before
    content ""
    width 13px
    height 15px
    background-color #fff
    border-radius 4px
    position absolute
    left 7px
    top 7px
    background url(../../assets/images/icon_dot.png) center no-repeat
    background-size 100%
    z-index 2
  &::after
    content: ""
    width 100%
    height 100%
    background-color #FDA203
    border-radius 27.5px
    position absolute
    z-index 1
    left 0
    top -7px
  &.lxm-btn-cancel
    background-color #03A7B0
    &::after
      background-color #06C2CC
  &.lxm-btn-disable
    background-color #BEBEBE
    &::after
      background-color #D2D2D2
  span
    position absolute
    left 50%
    top 0
    width 100%
    z-index 2
    line-height 50px
    transform translateX(-50%)
    color #ffffff
    text-align center
</style>

<template lang="pug">
.lxm-btn(@click="handleClick" :class="{'lxm-btn-cancel': type === 'cancel', 'lxm-btn-disable': type === 'disable'}")
  span
    slot
</template>

<script>
export default {
  props: {
    type: String,
    btnText: String
  },
  methods: {
    handleClick () {
      this.$emit('onClick')
    }
  }
}
</script>