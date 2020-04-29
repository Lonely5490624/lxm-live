<style lang="stylus">
.zhuanpan-box
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 320px
  height 320px
  .zhuanpan-close
    position absolute
    top 5px
    right -40px
    transform scale(.8)
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
  Close.zhuanpan-close(v-if="!starting" @onClose="closeMySelf")
  .zhuanpan-circle(ref="circleRef")
  .zhuanpan-btn(@click="startTurn")
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
  data () {
    return {
      starting: false
    }
  },
  methods: {
    startTurn () {
      if (this.starting) return
      const randomRotate = Math.floor(Math.random() * 360 + 720)
      const oldTransform = this.$refs.circleRef.style.transform
      let oldRotate = 0
      if (!oldTransform) {
        oldRotate = 0
      } else {
        oldRotate = this.$refs.circleRef.style.transform.match(/^rotate\((\d+)deg\)$/)[1]
      }
      const rotate = +oldRotate + randomRotate
      const data = {
        rotate
      }
      this.room.pubMsg({
        name: 'ZhuanpanBegin',
        id: `ZhuanpanBegin_${Date.now()}`,
        data: JSON.stringify(data)
      })
      this.starting = true
      this.$refs.circleRef.style.transform = `rotate(${rotate}deg)`
      setTimeout(() => {
        this.starting = false
      }, 4000);
    },
    // 关闭自己
    closeMySelf () {
      this.room.pubMsg({
        name: 'ZhuanpanEnd',
        id: `ZhuanpanEnd_${Date.now()}`
      })
      this.$emit('onClose', 'zhuanpan')
    }
  }
}
</script>