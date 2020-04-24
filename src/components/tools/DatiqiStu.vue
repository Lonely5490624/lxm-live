<style lang="stylus" scoped>
.datiqi-box
  min-width 510px
  height 240px
  background-color #fff
  border-radius 20px
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  z-index 99
  .datiqi-content
    position relative
    padding 0 50px 20px
    height 100%
    .datiqi-close
      position absolute
      top -17px
      right -13px
    .datiqi-title
      font-size 18px
      color #666666
      padding-top 20px
      text-align center
    .answer-list
      display flex
      margin-top 26px
      justify-content center
      .answer-item
        width 65px
        height 65px
        border-radius 50%
        background-color $them
        font-size 35px
        color #ffffff
        font-weight bold
        text-align center
        line-height 65px
        cursor pointer
        & + .answer-item
          margin-left 50px
        &.current
          background-color $roomDeepGreen
    .datiqi-confirm
      position absolute
      bottom 20px
      left 50%
      transform translateX(-50%)
      width 120px
      line-height 40px
      background-color $inputPlace
      font-size 16px
      color #ffffff
      text-align center
      border-radius 20px
      cursor pointer
</style>

<template lang="pug">
.datiqi-box
  .datiqi-content
    Close.datiqi-close
    .datiqi-title 答题器
    .answer-list
      .answer-item(v-for="(item, index) in answerList" :key="index" @click="setAnswer(item)" :class="{current: myAnswer === item}") {{item}}
    .datiqi-confirm(@click="sendAnswer") 提交答案
</template>

<script>
import Close from '@/components/common/Close'

export default {
  components: {
    Close
  },
  props: {
    room: Object,
    answerList: Array
  },
  data () {
    return {
      myAnswer: ''
    }
  },
  methods: {
    setAnswer (item) {
      this.myAnswer = item
    },
    sendAnswer () {
      if (this.rightAnswer) {
        // 
      } else {
        this.$message.error('请选择一个答案提交')
      }
    }
  }
}
</script>