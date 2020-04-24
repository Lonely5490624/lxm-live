<style lang="stylus" scoped>
.chart-room
  width 100%
  height 100%
  display flex
  flex-direction column
  position relative
  .chart-header
    height 65px
    position relative
    border-bottom 1px solid rgba(255, 255, 255, .4)
    font-size 16px
    color #ffffff
    flex-shrink 0
    .header-ban
      position absolute
      left 20px
      top 50%
      transform translateY(-50%)
      display flex
      align-items center
      cursor pointer
      span
        margin-left 7px
    .header-title
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
    .header-font
      position absolute
      right 20px
      top 50%
      transform translateY(-50%)
  .chart-main
    position absolute
    left 0
    right 0
    bottom 100px
    top 65px
    overflow auto
    padding-top 10px
    .system-message
      text-align center
      font-size 16px
      color #ffffff
      margin-bottom 15px
    .chart-item
      display flex
      margin-bottom 15px
      .item-avatar
        width 38px
        height 38px
        border-radius 50%
        margin 0 14px
      .item-info
        max-width 400px
        display flex
        flex-direction column
        .info-header
          font-size 14px
          color #ffffff
          display flex
        .info-main
          background-color #fff
          color #666666
          font-size 16px
          line-height 24px
          padding 10px
          border-radius 10px
          margin-top 10px
          position relative
          word-break break-word
          max-width 330px
          &::after
            content ""
            width 0
            height 0
            border-top 2px solid transparent
            border-bottom 6px solid transparent
            border-right 10px solid #ffffff
            position absolute
            left -10px
            top 8px
          &.right::after
            border-top 2px solid transparent
            border-bottom 6px solid transparent
            border-left 10px solid #ffffff
            border-right none
            position absolute
            right -10px
            top 8px
  .chart-input
    position absolute
    bottom 0
    height 100px
    left 0
    right 0
    border-top 1px solid #ffffff
    .chart-message
      background-color $roomGreen
      border none
      width 100%
      height 100%
      outline none
      resize none
      font-size 16px
      line-height 24px
      padding 10px
    .btn-send
      position absolute
      bottom 20px
      right 20px
      width 90px
      height 35px
      line-height 35px
      border-radius 17.5px
      background-color $inputPlace
      color #ffffff
      font-size 16px
      text-align center
      cursor pointer
    .disablechat-tips
      font-size 16px
      color #ffffff
      position absolute
      top 10px
      left 10px
</style>

<template lang="pug">
.chart-room
  .chart-header
    .header-ban(v-if="role === 0 && !muteAll" @click="handleMuteAll")
      i.icon-quantijinyan
      span 全体禁言
    .header-ban(v-if="role === 0 && muteAll" @click="handleCancelMuteAll")
      i.icon-quantijinyan
      span 解除禁言
    .header-title 聊天
    .header-font
  .chart-main(ref="messageMainRef")
    template(v-for="(item, index) in messageList")
      p.system-message(:key="index" v-if="item.type === 'joinRoom'") {{item.time}} {{item.name}}加入了教室
      p.system-message(:key="index" v-if="item.type === 'leaveRoom'") {{item.time}} {{item.name}}离开了教室
      .chart-item(:key="index" v-if="item.type === 'message'" :dir="item.isMe ? 'rtl' : 'ltr'")
        img.item-avatar(src="../../assets/images/avatar.png")
        .item-info
          .info-header {{item.time}}·{{item.isMe ? '我' : item.name}}
          .info-main(:class="{right: item.isMe}") {{item.message}}
  .chart-input
    textarea.chart-message(v-model="message" :readonly="disablechat")
    .disablechat-tips(v-if="disablechat") 您已被禁止发言
    .btn-send(@click="sendMsg") 发送
</template>

<script>
const defaultMessage = [{
  type: 'joinRoom',
  name: '学生A',
  time: '16:35'
}, {
  type: 'leaveRoom',
  name: '学生B',
  time: '16.53'
}, {
  type: 'message',
  name: '学生C',
  message: '哈哈哈哈我去',
  time: '16:56',
  isMe: true
}, {
  type: 'message',
  name: '学生C',
  message: '哈哈哈哈我去',
  time: '16:56'
}]
export default {
  props: {
    room: Object,
    students: Array,
    role: Number,
    muteAll: Boolean
  },
  data () {
    return {
      messageList: defaultMessage,
      message: '',
      disablechat: false
    }
  },
  watch: {
    messageList () {
      setTimeout(() => {
        this.$refs.messageMainRef.scroll({top: 9999999})
      }, 0);
    }
  },
  mounted () {
    // 用户加入房间事件
    this.room.addEventListener(TK.EVENT_TYPE.roomParticipantJoin, (e) => {
      console.log('聊天室加入房间', e)
      const hour = new Date().getHours()
      const minutes = new Date().getMinutes()
      const message = {
        type: 'joinRoom',
        name: e.user.nickname,
        time: `${hour}:${minutes < 10 ? '0' + minutes : minutes}`
      }
      this.messageList.push(message)
    })
    // 用户离开房间事件
    this.room.addEventListener(TK.EVENT_TYPE.roomParticipantLeave, (e) => {
      console.log('聊天室离开房间', e)
      const hour = new Date().getHours()
      const minutes = new Date().getMinutes()
      const message = {
        type: 'leaveRoom',
        name: e.user.nickname,
        time: `${hour}:${minutes < 10 ? '0' + minutes : minutes}`
      }
      this.messageList.push(message)
    })
    // 监听聊天消息事件
    this.room.addEventListener(TK.EVENT_TYPE.roomTextMessage, e => {
      console.log('收到聊天消息', e)
      const hour = new Date().getHours()
      const minutes = new Date().getMinutes()
      const message = {
        type: 'message',
        name: e.nickname,
        message: e.message.msg,
        time: `${hour}:${minutes < 10 ? '0' + minutes : minutes}`,
        isMe: e.userId === this.room.getMySelf().id
      }
      this.messageList.push(message)
    })
    // 监听用户禁言事件
    this.room.addEventListener(TK.EVENT_TYPE.roomUserPropertyChanged, e => {
      console.log('用户属性改变', e)
      // 如果变化的是自己，且属性是聊天
      if (e.userId === this.room.getMySelf().id && e.message?.hasOwnProperty('disablechat')) {
        this.disablechat = e.message.disablechat
      }
    })
  },
  methods: {
    // 发送消息
    sendMsg () {
      if (this.message.trim()) {
        this.room.sendMessage(this.message.trim())
        this.message = ''
      }
    },
    // 全体禁言
    handleMuteAll () {
      const ids = this.students.map(item => item.id)
      this.room.batchChangeUserProperty(ids, TK.MSG_TO_ALLUSER, {
        disablechat: true
      })
    },
    // 解除全体禁言
    handleCancelMuteAll () {
      const ids = this.students.map(item => item.id)
      this.room.batchChangeUserProperty(ids, TK.MSG_TO_ALLUSER, {
        disablechat: false
      })
    }
  }
}
</script>