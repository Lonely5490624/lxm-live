<style lang="stylus" scoped>
.qiangdaqi-box
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 211px
  height 211px
  background url('../../assets/images/qiangdaqi.png') center no-repeat
  background-size 100%
  text-align center
  .qiangdaqi-close
    position absolute
    top 5px
    right -40px
    transform scale(.8)
  .title
    color #666666
    font-size 14px
    margin-top 58px
  .qiangdaqi-btn
    display inline-block
    width 105px
    height 40px
    line-height 40px
    background-color $inputPlace
    border-radius 20px
    color #ffffff
    font-size 16px
    margin-top 45px
    cursor pointer
    &.cursor-auto
      cursor auto
      background-color rgba(253,162,3,.7);
</style>

<template lang="pug">
.qiangdaqi-box
  Close.qiangdaqi-close(@onClose="closeMySelf")
  template(v-if="status === 'ended'")
    p.title 点击按钮开始抢答
    .qiangdaqi-btn(@click="beginQiangdaqi") 开始抢答
  template(v-if="status === 'vying'")
    p.title 抢答中...
    .qiangdaqi-btn.cursor-auto 抢答中
  template(v-if="status === 'nobody'")
    p.title 无人抢答
    .qiangdaqi-btn(@click="beginQiangdaqi") 重新开始
  template(v-if="status === 'vied'")
    p.title {{username}}
    .qiangdaqi-btn.cursor-auto 有人抢中
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
      status: 'ended', // ended vying nobody vied
      time: 0,
      timer: null,
      username: ''
    }
  },
  mounted () {
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      if (e.message?.name === 'QiangdaqiDone') {
        this.clearTime()
        this.username = e.message?.data?.username
        this.status = 'vied'
      }
    })
  },
  beforeDestroy () {
    this.clearTime()
  },
  methods: {
    beginQiangdaqi () {
      this.room.pubMsg({
        name: 'Qiangdaqi',
        id: `Qiangdaqi_${new Date().getTime()}`
      })
      this.status = 'vying'
      this.beginTime()
    },
    // 10秒计时
    beginTime () {
      this.time = 3
      this.timer = setInterval(() => {
        if (this.time) {
          this.time --
        } else {
          // 如果倒计时完成还没人抢答
          this.room.pubMsg({
            name: 'QiangdaqiTimeout',
            id: `QiangdaqiTimeout_${new Date().getTime()}`
          })
          this.status = 'nobody'
          this.clearTime()
        }
      }, 1000);
    },
    // 清除计时器
    clearTime () {
      clearInterval(this.timer)
      this.timer = null
    },
    // 关闭自己
    closeMySelf () {
      this.room.pubMsg({
        name: 'QiangdaqiEnded',
        id: `QiangdaqiEnded_${new Date().getTime()}`
      })
      this.$emit('onClose', 'qiangdaqi')
    }
  }
}
</script>