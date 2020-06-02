<style lang="stylus" scoped>
.datiqi-box
  width 510px
  background-color #eee
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
    .datiqi-confirm
      margin-left 50%
      transform translateX(-50%)
      width 120px
      line-height 40px
      background-color $inputPlace
      font-size 16px
      color #ffffff
      text-align center
      border-radius 20px
      cursor pointer
      margin-top 26px
  .datiqi-answer
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
    .answer-content
      margin-top 26px
      .answer-title
        display flex
        justify-content space-between
        align-items center
        font-size 16px
        color #666666
        .title-switch
          padding 5px
          background-color $inputPlace
          color #ffffff
          border-radius 20px
          cursor pointer
      .answer-list
        padding 20px 0
        min-height 165px
        .list-item
          display flex
          justify-content space-between
          align-items center
          font-size 16px
          color #666666
          .item-answer
            width 320px
          & + .list-item
            margin-top 20px
      .user-list
        padding 20px 0
        min-height 165px
        .list-item
          display flex
          justify-content space-between
          align-items center
          font-size 16px
          color #ffffff
          height 40px
          padding 0 10px
          border-radius 5px
          background-color $inputPlace
          & + .list-item
            margin-top 15px
      .answer-footer
        display flex
        justify-content space-between
        align-items center
        font-size 16px
        color #666666
        .footer-right
          width 150px
</style>

<template lang="pug">
.datiqi-box
  .datiqi-content(v-if="type === 'setAnswer'")
    .datiqi-title 答题器
    .answer-list
      .answer-item(v-for="(item, index) in answerList" :key="index" @click="setAnswer(item)" :class="{current: myAnswer.includes(item)}") {{item}}
    .datiqi-confirm(@click="sendAnswer") 提交答案
  .datiqi-answer(v-if="type === 'stopAnswer'")
    .datiqi-title 答题器
    .answer-content
      .answer-title
        .title-count 答题人数:{{stuAnswers.length}}人
        .title-time 用时:{{alltime | formatTime}}
        .title-switch(@click="showDetail = !showDetail") {{showDetail ? '统计' : '详情'}}
      .user-list(v-if="showDetail")
        .list-item(v-for="(item, index) in stuAnswers" :key="index")
          .item-name {{item.name}}
          .item-answer 所选答案:{{item.answer.join(',')}}
          .item-time 用时:{{item.time | formatTime}}
      .answer-list(v-else)
        .list-item(v-for="(val, key) in stuAnswerOptions" :key="key")
          .item-option {{key}}
          .item-answer
            el-progress(:percentage="val.percent || 0" :show-text="false")
          .item-count {{val.count}}人
      .answer-footer
        .footer-left
          span 我的答案:{{myAnswer.join(',')}}
          span(v-if="rightAnswer && rightAnswer.length" style="margin-left: .1rem;") {{'正确答案:' + rightAnswer.join(',')}}
</template>

<script>
export default {
  props: {
    room: Object,
    answerList: Array,
    teacher: Object
  },
  data () {
    return {
      myAnswer: [],
      type: 'setAnswer',
      showDetail: false,
      stuAnswerOptions: null,
      stuAnswers: [],
      alltime: 0,
      rightAnswer: []
    }
  },
  mounted () {
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, (e) => {
      // 结束答题
      if (e?.message?.name === 'StopQuestion') {
        this.type = 'stopAnswer'
        this.stuAnswers = e.message.data.stuAnswers
        this.alltime = e.message.data.alltime
        this.stuAnswerOptions = {}
        e.message.data.answerList.forEach(item => {
          const obj = {
            count: 0,
            percent: 0
          }
          this.stuAnswerOptions[item] = obj
        })
        const allCount = this.stuAnswers.reduce((sum, item) => sum + item.answer.length, 0)
        e.message.data.answerList.forEach(item => {
          let count = 0
          this.stuAnswers.forEach(ele => {
            if (ele.answer.includes(item)) {
              count ++
            }
          })
          this.stuAnswerOptions[item].count = count
          this.stuAnswerOptions[item].percent = Math.round(count / allCount * 100)
        })
      }
      // 接受正确答案
      if (e.message?.name === 'PubAnswer') {
        this.rightAnswer = e.message.data.rightAnswer
      }
    })
  },
  methods: {
    setAnswer (item) {
      if (this.myAnswer.includes(item)) {
        let index = this.myAnswer.indexOf(item)
        if (index > -1) {
          this.myAnswer.splice(index, 1)
        }
      } else {
        this.myAnswer.push(item)
      }
      this.myAnswer.sort()
    },
    sendAnswer () {
      if (this.myAnswer) {
        const data = {
          answer: this.myAnswer,
          name: this.room.getMySelf().nickname,
          userId: this.room.getMySelf().id
        }
        this.room.pubMsg({
          name: 'Answer',
          id: `Answer_${this.room.getMySelf().id}_${new Date().getTime()}`,
          toID: this.teacher.id,
          data: JSON.stringify(data)
        })
      } else {
        this.$message.error('请选择一个答案提交')
      }
    }
  }
}
</script>