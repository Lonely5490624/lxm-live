<style lang="stylus" scoped>
.stu-box
  position fixed
  top 100px
  bottom 0
  right 0
  width 640px
  background-color rgba(30,148,100,.9)
  padding 15px 25px 0 15px
  z-index 99
  .stu-header
    display flex
    justify-content space-between
    align-items center
    height 35px
    .stu-count
      font-size 16px
      color #ffffff
    .stu-search
      position relative
      span
        color #ffffff
        font-size 16px
        position absolute
        left 15px
        top 10px
      input
        width 490px
        height 35px
        font-size 14px
        color #ffffff
        background rgba(255, 255, 255, .5)
        text-indent 43px
        &::placeholder
          color #ffffff
  .stu-list
    margin-top 15px
    .stu-item
      display flex
      justify-content space-between
      align-items center
      .stu-info
        display flex
        align-items center
        .stu-avatar
          width 40px
          height 40px
          border-radius 50%
          overflow hidden
          img
            width 100%
        .stu-name
          font-size 14px
          color #ffffff
          margin-left 12px
      .stu-ctrl
        color #fff
        font-size 16px
        i
          cursor pointer
          &.disabled
            color #696969
          & + i
            margin-left 30px
</style>

<template lang="pug">
.stu-box
  .stu-header
    .stu-count 花名册（{{$store.state.stu.stuList.length}}）
    .stu-search
      span.icon-search
      input(type="text" placeholder="请输入搜索内容")
  .stu-list
    .stu-item(v-for="item in $store.state.stu.stuList" :key="item.id")
      .stu-info
        .stu-avatar
          img(src="../../assets/images/avatar.png")
        .stu-name {{item.nickname}}
      .stu-ctrl
        i.icon-user_handup(v-if="item.raisehand" title="举手")
        i.icon-user_xiajiangtai(v-if="item.publishstate === 0" @click="upStage(item)" title="已下发言席")
        i.icon-user_shangjiangtai(v-else @click="downStage(item)" title="已上发言席")
        i.icon-user_camera(v-if="item.publishstate === 2 || item.publishstate === 3" title="视频已打开" @click="closeVideo(item)")
        i.icon-user_close_camera(v-else title="视频已关闭" @click="openVideo(item)")
        i.icon-user_maikefeng(v-if="item.publishstate === 1 || item.publishstate === 3" title="音频已打开" @click="closeAudio(item)")
        i.icon-user_close_maikefeng(v-else title="音频已关闭" @click="openAudio(item)")
        i.icon-user_shouquan(v-if="item.candraw" title="已授权涂鸦" @click="closeDraw(item)")
        i.icon-user_close_shouquan(v-else title="已取消涂鸦" @click="openDraw(item)")
        i.icon-user_close_jinyan(v-if="item.disablechat" title="已禁言" @click="openChart(item)")
        i.icon-user_jinyan(v-else title="未禁言" @click="closeChart(item)")
        i.icon-user_remove(title="移除")
</template>

<script>
export default {
  props: {
    room: Object
  },
  methods: {
    // 上台
    upStage (user) {
      this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
        publishstate: TK.PUBLISH_STATE_BOTH
      })
    },
    // 下台
    downStage (user) {
      this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
        publishstate: TK.PUBLISH_STATE_NONE
      })
    },
    // 打开摄像头
    openVideo (user) {
      if (user.publishstate === TK.PUBLISH_STATE_NONE || user.publishstate === TK.PUBLISH_STATE_MUTEALL) {
        // 未上台，或者上台后音视频都未发布，则只发布视频
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_VIDEOONLY
        })
      } else if (user.publishstate === TK.PUBLISH_STATE_AUDIOONLY) {
        // 已上台，且已发布了音频，则变成都发布
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_BOTH
        })
      }
    },
    // 关闭摄像头
    closeVideo (user) {
      if (user.publishstate === TK.PUBLISH_STATE_VIDEOONLY) {
        // 如果只发布了视频，则改为禁用全部
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_MUTEALL
        })
      } else if (user.publishstate === TK.PUBLISH_STATE_BOTH) {
        // 如果两者都发布了，则改为只发布音频
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_AUDIOONLY
        })
      }
    },
    // 打开麦克风
    openAudio (user) {
      if (user.publishstate === TK.PUBLISH_STATE_NONE || user.publishstate === TK.PUBLISH_STATE_MUTEALL) {
        // 未上台，或者上台后音视频都未发布，则只发布视频
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_AUDIOONLY
        })
      } else if (user.publishstate === TK.PUBLISH_STATE_VIDEOONLY) {
        // 已上台，且已发布了音频，则变成都发布
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_BOTH
        })
      }
    },
    // 关闭麦克风
    closeAudio (user) {
      if (user.publishstate === TK.PUBLISH_STATE_AUDIOONLY) {
        // 如果只发布了视频，则改为禁用全部
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_MUTEALL
        })
      } else if (user.publishstate === TK.PUBLISH_STATE_BOTH) {
        // 如果两者都发布了，则只为只发布音频
        this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_VIDEOONLY
        })
      }
    },
    // 授权涂鸦
    openDraw (user) {
      this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
        candraw: true
      })
    },
    // 取消涂鸦
    closeDraw (user) {
      this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
        candraw: false
      })
    },
    // 禁言
    closeChart (user) {
      this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
        disablechat: true
      })
    },
    // 取消禁言
    openChart (user) {
      this.room.changeUserProperty(user.id, TK.MSG_TO_ALLUSER, {
        disablechat: false
      })
    }
  }
}
</script>