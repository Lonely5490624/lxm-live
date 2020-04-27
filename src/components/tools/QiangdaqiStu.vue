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
.qiangdaqi-box#qiangdaqiBox(ref="testRef")
  template(v-if="status === 'vying'")
    p.title 准备抢答
    .qiangdaqi-btn(@click="readyVie") 准备抢答
  template(v-if="status === 'vied'")
    p.title {{username}}
    .qiangdaqi-btn.cursor-auto 有人抢中
  template(v-if="status === 'ivied'")
    p.title 恭喜您已抢中
    .qiangdaqi-btn.cursor-auto 已抢中
  template(v-if="status === 'nobody'")
    p.title 无人抢答
    .qiangdaqi-btn.cursor-auto 无人抢答
</template>

<script>
export default {
  props: {
    room: Object
  },
  data () {
    return {
      status: 'vying', // ended vying nobody vied
      time: 1,
      timer: null,
      username: ''
    }
  },
  mounted () {
    this.beginTime()
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      if (e.message?.name === 'Qiangdaqi') {
        this.beginTime()
        this.status = 'vying'
      }
      if (e.message?.name === 'QiangdaqiDone') {
        this.clearTime()
        if (e.message?.data?.userId === this.room.getMySelf().id) {
          this.status = 'ivied'
        } else {
          this.username = e.message.data.username
          this.status = 'vied'
        }
      }
      if (e.message?.name === 'QiangdaqiTimeout') {
        this.clearTime()
        this.status = 'nobody'
      }
    })
  },
  beforeDestroy () {
    this.clearTime()
  },
  methods: {
    // 抢答
    readyVie () {
      const data = {
        userId: this.room.getMySelf().id,
        username: this.room.getMySelf().nickname
      }
      this.room.pubMsg({
        name: 'QiangdaqiDone',
        id: `QiangdaqiDone_${new Date().getTime()}`,
        data: JSON.stringify(data)
      })
      // 抢到之后结束抢答器
      this.clearTime()
    },
    // 随机移动位置
    randomMove () {
      const qiangdaqi = document.getElementById('qiangdaqiBox')
      const parent = qiangdaqi.parentElement
      const width = qiangdaqi.offsetWidth
      const height = qiangdaqi.offsetHeight
      const parentWidth = parent.offsetWidth
      const parentHeight = parent.offsetHeight
      const minWidth = width / 2
      const maxWidth = parentWidth - width / 2
      const minHeight = height / 2
      const maxHeight = parentHeight - height / 2
      const left = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth)
      const top = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
      qiangdaqi.style.left = `${left}px`
      qiangdaqi.style.top = `${top}px`
    },
    // 2秒计时，移动抢答器
    beginTime () {
      this.timer = setInterval(() => {
        this.randomMove()
      }, this.time * 1000);
    },
    // 清除计时器
    clearTime () {
      clearInterval(this.timer)
      this.timer = null
    },
    // 关闭自己
    closeMySelf () {
      this.$emit('onClose', 'qiangdaqi')
    }
  }
}
</script>