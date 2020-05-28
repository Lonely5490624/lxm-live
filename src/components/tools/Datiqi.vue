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
        .footer-left
          span
            display inline-block
            width 80px
            height 26px
            line-height 26px
            text-align center
            margin-left 10px
            border-radius 13px
            background-color $inputPlace
            color #ffffff
        .footer-right
          width 150px
</style>

<template lang="pug">
.datiqi-box
  .datiqi-content(v-if="type === 'setAnswer'")
    Close.datiqi-close(@onClose="endQuestion")
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
  .datiqi-answer(v-if="type === 'waitAnswer' || type === 'stopAnswer'")
    Close.datiqi-close(@onClose="endQuestion")
    .datiqi-title 答题器
    .answer-content
      .answer-title
        .title-count 答题人数:{{stuAnswers.length}}人
        .title-time 用时:{{time | formatTime}}
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
            el-progress(:percentage="val.percent" :show-text="false")
          .item-count {{val.count}}人
      .answer-footer(v-if="type === 'waitAnswer'")
        .footer-left 正确答案是:{{rightAnswer.join(',')}}
        LxmBtn.footer-right(type="cancel" @onClick="stopAnswer") 结束答题
      .answer-footer(v-if="type === 'stopAnswer'")
        .footer-left 正确答案是:{{rightAnswer.join(',')}}
          span(v-if="answerPubState") 已公布
          span(v-else @click="pubAnswer" style="cursor: pointer;") 公布结果
        LxmBtn.footer-right(type="cancel" @onClick="resetStart") 重新开始
</template>

<script>
import Close from '@/components/common/Close'
import LxmBtn from '@/components/common/LxmBtn'

export default {
  components: {
    Close,
    LxmBtn
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
      answerList: ['A', 'B', 'C', 'D'],
      stuAnswers: [],
      stuAnswerOptions: {
        A: {
          count: 0,
          percent: 0
        }, 
        B: {
          count: 0,
          percent: 0
        },
        C: {
          count: 0,
          percent: 0
        },
        D: {
          count: 0,
          percent: 0
        }
      },
      type: 'setAnswer',
      showDetail: false,
      time: 0,
      timer: null,
      answerPubState: false
    }
  },
  watch: {
    answerList (val) {
      this.stuAnswerOptions = {}
      val.forEach(item => {
        const obj = {
          count: 0,
          percent: 0
        }
        this.stuAnswerOptions[item] = obj
      })
    }
  },
  mounted () {
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, (e) => {
      // 答题器答案事件
      if (e?.message?.name === 'Answer') {
        e.message.data.time = this.time
        const thisStu = this.stuAnswers.find(item => item.userId === e.message.data.userId)
        if (thisStu) {
          const index = this.stuAnswers.indexOf(thisStu)
          if (index > -1) {
            this.stuAnswers[index] = e.message?.data
          }
        } else {
          this.stuAnswers.push(e.message?.data)
        }
        this.statAnswer()
      }
    })
    window.addAnswer = (name, arr) => {
      this.stuAnswers.push({
        answer: arr,
        name
      })
    }
  },
  beforeDestroy () {
    this.clearTime()
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
      this.rightAnswer.sort()
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
        this.type = 'waitAnswer'
        this.beginTime()
      } else {
        this.$message.error('请选择一个答案发送')
      }
    },
    // 答案统计
    statAnswer () {
      const allCount = this.stuAnswers.reduce((sum, item) => sum + item.answer.length, 0)
      this.answerList.forEach(item => {
        let count = 0
        this.stuAnswers.forEach(ele => {
          if (ele.answer.includes(item)) {
            count ++
          }
        })
        this.stuAnswerOptions[item].count = count
        this.stuAnswerOptions[item].percent = Math.round(count / allCount * 100)
      })
    },
    // 结束答题
    stopAnswer () {
      this.type = 'stopAnswer'
      const data = {
        answerList: this.answerList,
        stuAnswers: this.stuAnswers,
        alltime: this.time
      }
      this.room.pubMsg({
        name: 'StopQuestion',
        id: `StopQuestion_${new Date().getTime()}`,
        toID: TK.MSG_TO_ALLUSER,
        data: JSON.stringify(data)
      })
      this.clearTime()
    },
    // 关闭答题器
    endQuestion () {
      this.room.pubMsg({
        name: 'EndQuestion',
        id: `EndQuestion_${new Date().getTime()}`,
        toID: TK.MSG_TO_ALLUSER,
        data: ''
      })
      this.$emit('onClose', 'datiqi')
    },
    // 重新开始
    resetStart () {
      this.room.pubMsg({
        name: 'EndQuestion',
        id: `EndQuestion_${new Date().getTime()}`,
        toID: TK.MSG_TO_ALLUSER,
        data: ''
      })
      this.type = 'setAnswer'
    },
    pubAnswer () {
      const data = {
        rightAnswer: this.rightAnswer
      }
      this.room.pubMsg({
        name: 'PubAnswer',
        id: `PubAnswer_${new Date().getTime()}`,
        toID: TK.MSG_TO_ALLUSER,
        data: JSON.stringify(data)
      })
      this.answerPubState = true
    },
    // 开始计时
    beginTime () {
      this.timer = setInterval(() => {
        this.time ++
      }, 1000);
    },
    clearTime () {
      clearInterval(this.timer)
    }
  }
}
</script>