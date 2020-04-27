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
      & + .jishiqi-item
        margin-left 15px
</style>

<template lang="pug">
.jishiqi-box
  .jishiqi-title
    .title-text 计时器
  .jishiqi-content
    .jishiqi-list
      .jishiqi-item
        .item-val {{timeSep.minuteTen}}
      .jishiqi-item
        .item-val {{timeSep.minuteBit}}
      .jishiqi-item
        .item-val.item-sep :
      .jishiqi-item
        .item-val {{timeSep.secondTen}}
      .jishiqi-item
        .item-val {{timeSep.secondBit}}
</template>

<script>
export default {
  props: {
    room: Object
  },
  data () {
    return {
      time: 0,
      timeSep: {
        minuteTen: 0,
        minuteBit: 0,
        secondTen: 0,
        secondBit: 0
      },
      timer: null
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
  mounted () {
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, (e) => {
      // 计时器事件
      if (e.message?.name === 'Timer') {
        this.time = e.message?.data?.time
        this.beginTime()
      }
      if (e.message?.name === 'TimerPause') {
        this.pauseTime()
      }
      if (e.message?.name === 'TimerStop') {
        this.stopTime()
      }
    })
  },
  beforeDestroy () {
    this.clearTime()
  },
  methods: {
    beginTime () {
      this.timer = setInterval(() => {
        this.time --
      }, 1000);
    },
    pauseTime () {
      this.clearTime()
    },
    continueTime () {
      this.timer = setInterval(() => {
        this.time --
      }, 1000)
    },
    stopTime () {
      this.clearTime()
      this.time = 300
    },
    clearTime () {
      console.log('清除计时器')
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>