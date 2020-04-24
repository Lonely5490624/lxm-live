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
</style>

<template lang="pug">
.datiqi-box
  .datiqi-content
    .datiqi-title 答题器
    .answer-list
      .answer-item(v-for="(item, index) in answerList" :key="index" @click="setAnswer(item)" :class="{current: myAnswer.includes(item)}") {{item}}
    .datiqi-confirm(@click="sendAnswer") 提交答案
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
      myAnswer: []
    }
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