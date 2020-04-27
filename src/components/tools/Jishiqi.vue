<style lang="stylus" scoped>
.jishiqi-box
  width 290px
  border 5px solid $them
  border-radius 20px
  background-color #fff
  padding-bottom 10px
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  .jishiqi-title
    font-size 16px
    color #ffffff
    font-weight bold
    color #ffffff
    height 40px
    line-height 40px
    text-align center
    background-color $them
    position relative
    margin -5px -5px 0
    border-top-left-radius 20px
    border-top-right-radius 20px
    .jishiqi-close
      position absolute
      right 15px
      top 18px
      cursor pointer
      &::before, &::after
        content ""
        width 17px
        height 3px
        background-color #fff
        border-radius 2px
        position absolute
        top 0
        right 0
      &::before
        transform rotate(45deg)
      &::after
        transform rotate(-45deg)
  .jishiqi-list
    display flex
    justify-content center
    margin-top 20px
    .jishiqi-item
      display flex
      flex-direction column
      align-items center
      justify-content center
      height 78px
      .item-add
        width 0
        height 0
        border-left 6px solid transparent
        border-right 6px solid transparent
        border-bottom 8px solid rgba(255,199,55,.7)
        border-radius 2px
        margin-bottom 8px
        cursor pointer
        position relative
        &::after
          content ""
          position absolute
          left -16px
          right -16px
          top -8px
          bottom -16px
      .item-val
        width 32px
        height 46px
        line-height 46px
        text-align center
        font-size 30px
        color $inputPlace
        background-color rgba(255,199,55,.2)
        &.item-sep
          background-color transparent
      .item-sub
        width 0
        height 0
        border-left 6px solid transparent
        border-right 6px solid transparent
        border-top 8px solid rgba(255,199,55,.7)
        border-radius 2px
        margin-top 8px
        cursor pointer
        position relative
        &::after
          content ""
          position absolute
          left -16px
          right -16px
          top -16px
          bottom -8px
      & + .jishiqi-item
        margin-left 15px
  .jishiqi-ctrl
    display flex
    justify-content center
    margin-top 12px
    height 40px
    align-items center
    .ctrl-start
      width 120px
      height 40px
      color #ffffff
      font-size 16px
      line-height 40px
      text-align center
      background-color $inputPlace
      border-radius 20px
      cursor pointer
    .ctrl-pause
      width 33px
      height 32px
      cursor pointer
      img
        width 100%
      & + .ctrl-pause
        margin-left 40px
</style>

<template lang="pug">
.jishiqi-box
  .jishiqi-title
    .title-text 计时器
    .jishiqi-close(@click="closeMySelf")
  .jishiqi-content
    .jishiqi-list
      .jishiqi-item
        .item-add(v-if="timerState === 'ended'" @click="addTime('minTen')")
        .item-val {{timeSep.minuteTen}}
        .item-sub(v-if="timerState === 'ended'" @click="subTime('minTen')")
      .jishiqi-item
        .item-add(v-if="timerState === 'ended'" @click="addTime('minBit')")
        .item-val {{timeSep.minuteBit}}
        .item-sub(v-if="timerState === 'ended'" @click="subTime('minBit')")
      .jishiqi-item
        .item-val.item-sep :
      .jishiqi-item
        .item-add(v-if="timerState === 'ended'" @click="addTime('secTen')")
        .item-val {{timeSep.secondTen}}
        .item-sub(v-if="timerState === 'ended'" @click="subTime('secTen')")
      .jishiqi-item
        .item-add(v-if="timerState === 'ended'" @click="addTime('secBit')")
        .item-val {{timeSep.secondBit}}
        .item-sub(v-if="timerState === 'ended'" @click="subTime('secBit')")
    .jishiqi-ctrl(v-if="timerState === 'ended'")
      .ctrl-start(@click="beginTime") 开始计时
    .jishiqi-ctrl(v-else)
      .ctrl-pause(@click="stopTime")
        img(src="../../assets/images/stop.png")
      .ctrl-pause(v-if="timerState === 'started'" @click="pauseTime")
        img(src="../../assets/images/pause.png")
      .ctrl-pause(v-if="timerState === 'paused'" @click="continueTime")
        img(src="../../assets/images/icon_play.png")
</template>

<script>
export default {
  props: {
    room: Object
  },
  data () {
    return {
      time: 300,
      timeSep: {
        minuteTen: 0,
        minuteBit: 5,
        secondTen: 0,
        secondBit: 0
      },
      timer: null,
      timerState: 'ended' // ended started paused
    }
  },
  watch: {
    // 将整数时间分为4部分
    time (val) {
      const minute = Math.floor(val / 60)
      const second = Math.floor(val - minute * 60)
      const minuteTen = Math.floor(minute / 10)
      const minuteBit = Math.floor(minute - minuteTen * 10)
      const secondTen = Math.floor(second / 10)
      const secondBit = Math.floor(second - secondTen * 10)
      this.timeSep.minuteTen = minuteTen
      this.timeSep.minuteBit = minuteBit
      this.timeSep.secondTen = secondTen
      this.timeSep.secondBit = secondBit
    }
  },
  beforeDestroy () {
    this.clearTime()
  },
  methods: {
    addTime (type) {
      switch (type) {
        case 'minTen':
          if (this.timeSep.minuteTen === 5) {
            this.time -= 3000
          } else {
            this.time += 600
          }
          break
        case 'minBit':
          if (this.timeSep.minuteBit === 9) {
            this.time -= 540
          } else {
            this.time += 60
          }
          break
        case 'secTen':
          if (this.timeSep.secondTen === 5) {
            this.time -= 50
          } else {
            this.time += 10
          }
          break
        case 'secBit':
          if (this.timeSep.secondBit === 9) {
            this.time -= 9
          } else {
            this.time ++
          }
          break
        default:
          break;
      }
    },
    subTime (type) {
      switch (type) {
        case 'minTen':
          if (this.timeSep.minuteTen === 0) {
            this.time += 3000
          } else {
            this.time -= 600
          }
          break
        case 'minBit':
          if (this.timeSep.minuteBit === 0) {
            this.time += 540
          } else {
            this.time -= 60
          }
          break
        case 'secTen':
          if (this.timeSep.secondTen === 0) {
            this.time += 50
          } else {
            this.time -= 10
          }
          break
        case 'secBit':
          if (this.timeSep.secondBit === 0) {
            this.time += 9
          } else {
            this.time --
          }
          break
        default:
          break;
      }
    },
    beginTime () {
      const data = {
        time: this.time
      }
      this.room.pubMsg({
        name: 'Timer',
        id: `Timer_${new Date().getTime()}`,
        data: JSON.stringify(data)
      })
      this.timer = setInterval(() => {
        this.time --
      }, 1000);
      this.timerState = 'started'
    },
    pauseTime () {
      this.room.pubMsg({
        name: 'TimerPause',
        id: `TimerPause_${new Date().getTime()}`
      })
      this.clearTime()
      this.timerState = 'paused'
    },
    continueTime () {
      const data = {
        time: this.time
      }
      this.room.pubMsg({
        name: 'Timer',
        id: `Timer_${new Date().getTime()}`,
        data: JSON.stringify(data)
      })
      this.timer = setInterval(() => {
        this.time --
      }, 1000)
      this.timerState = 'started'
    },
    stopTime () {
      this.room.pubMsg({
        name: 'TimerStop',
        id: `TimerStop_${new Date().getTime()}`
      })
      this.clearTime()
      this.time = 300
      this.timerState = 'ended'
    },
    clearTime () {
      clearInterval(this.timer)
      this.timer = null
    },
    closeMySelf () {
      this.room.pubMsg({
        name: 'TimerStop',
        id: `TimerStop_${new Date().getTime()}`
      })
      this.$emit('onClose', 'jishiqi')
    }
  }
}
</script>