<style lang="stylus" scoped>
.close-box
  width 46px
  height 46px
  border-radius 50%
  background-color $them
  position relative
  cursor pointer
  .close-left, .close-right
    width 25px
    height 5px
    border-radius 2px
    position absolute
    background-color #fff
    top 50%
    left 50%
  .close-left
    transform translate(-50%, -50%) rotate(-45deg)
  .close-right
    transform translate(-50%, -50%) rotate(45deg)
  
</style>

<template lang="pug">
.close-box(@click="handleClose")
  .close-left
  .close-right
</template>

<script>
export default {
  methods: {
    handleClose () {
      this.$emit('onClose')
    }
  }
}
</script>