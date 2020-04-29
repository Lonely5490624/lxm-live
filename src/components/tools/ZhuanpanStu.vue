<style lang="stylus">
.zhuanpan-box
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 320px
  height 320px
  .zhuanpan-circle
    width 100%
    height 100%
    background url('../../assets/images/zhuanpan_bg.png')
    background-size 100%
    transition transform 4s ease-in-out
  .zhuanpan-btn
    width 68px
    height 90px
    background url('../../assets/images/zhuanpan_btn.png')
    background-size 100%
    z-index 2
    position absolute
    bottom 125px
    left 50%
    transform translateX(-50%)
    cursor pointer
</style>

<template lang="pug">
.zhuanpan-box
  .zhuanpan-circle(ref="circleRef")
  .zhuanpan-btn
</template>

<script>
import Close from '@/components/common/Close'

export default {
  components: {
    Close
  },
  props: {
    room: Object
  },
  mounted () {
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, (e) => {
      // 上课事件
      if (e?.message?.name === 'ZhuanpanBegin') {
        const rotate = e.message?.data?.rotate
        this.startTurn(rotate)
      }
    })
  },
  methods: {
    startTurn (rotate) {
      this.$refs.circleRef.style.transform = `rotate(${rotate}deg)`
    },
    // 关闭自己
    closeMySelf () {
      this.$emit('onClose', 'zhuanpan')
    }
  }
}
</script>