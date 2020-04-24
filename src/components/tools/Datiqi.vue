<style lang="stylus" scoped>
.datiqi-box
  width 510px
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
      flex-wrap wrap
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
        margin-top 26px
        & + .answer-item
          margin-left 50px
        &:nth-of-type(4n+1)
          margin-left 0
        &.current
          background-color $roomDeepGreen
    .answer-ctrl
      margin-top 30px
      display flex
      .ctrl-item
        width 90px
        height 30px
        line-height 30px
        border-radius 15px
        background-color #70CA34
        text-align center
        font-size 14px
        color #FFFFFF
        cursor pointer
        & + .ctrl-item
          margin-left 20px
        &.disabled
          background-color $gray
    .answer-tips
      font-size 14px
      color #666666
      margin-top 15px
    .datiqi-confirm
      position absolute
      bottom 20px
      right 50px
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
      .answer-item(v-for="(item, index) in answerList" :key="index" @click="setAnswer(item)" :class="{current: rightAnswer.includes(item)}") {{item}}
    .answer-ctrl
      .ctrl-item.disabled(v-if="answerList.length >= 8") 添加答案
      .ctrl-item(v-else @click="addAnswer") 添加答案
      .ctrl-item.disabled(v-if="answerList.length <= 2") 删除答案
      .ctrl-item(v-else @click="delAnswer") 删除答案
    p.answer-tips 点击字母预设正确答案
    .datiqi-confirm(@click="sendAnswer") 发布答案
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
      rightAnswer: [],
      answerObj: {
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
        7: 'H'
      },
      answerList: ['A', 'B', 'C', 'D']
    }
  },
  methods: {
    setAnswer (item) {
      if (this.rightAnswer.includes(item)) {
        let index = this.rightAnswer.indexOf(item)
        if (index > -1) {
          this.rightAnswer.splice(index, 1)
        }
      } else {
        this.rightAnswer.push(item)
      }
    },
    addAnswer () {
      this.answerList.push(this.answerObj[this.answerList.length])
    },
    delAnswer () {
      let delItem = this.answerList.pop()
      let index = this.rightAnswer.indexOf(delItem)
      if (index > -1) {
        this.rightAnswer.splice(index, 1)
      }
    },
    sendAnswer () {
      if (this.rightAnswer) {
        const data = {
          options: this.answerList
        }
        this.room.pubMsg({
          name: 'Question',
          id: `Question_${new Date().getTime()}`,
          toID: TK.MSG_TO_ALLUSER,
          data: JSON.stringify(data)
        })
      } else {
        this.$message.error('请选择一个答案发送')
      }
    }
  }
}
</script>