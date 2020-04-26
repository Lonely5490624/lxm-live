<style lang="stylus" scoped>
.classroom
  height 100%
  background $roomGreen
  padding 0 20px
  display flex
  flex-direction column
  .classroom-content
    display flex
    height calc(100% - 100px)
    flex-shrink 1
    .class-board
      height 100%
      width 100%
      display flex
      flex-direction column
      .class-whiteboard
        // flex-grow 1
        height 100%
        position relative
        background-color #ccc
      .class-stu-videos
        display flex
        justify-content center
        flex-shrink 0
    .class-info
      width 25%
      flex-shrink 0
      display flex
      flex-direction column
      margin-left 25px
      .class-video
        width 100%
        height calc(25vw * 3 / 4)
        border 5px solid $roomDeepGreen
        border-radius 20px
        flex-shrink 0
        overflow hidden
        position relative
        .teacher-video-hover
          position absolute
          left 0
          right 0
          top 0
          bottom 0
          z-index 1
          // background-color rgba(255, 255, 255, .5)
          padding 0 50px
          display none
          justify-content space-between
          align-items center
          font-size 40px
          color #fff
          i
            width 40px
            height 40px
            border-radius 50%
            background-color #404246
            cursor pointer
        &:hover .teacher-video-hover
          display flex
        .video-bottom
          height 30px
          position absolute
          z-index 2
          bottom 0
          left 0
          right 0
          display flex
          justify-content space-between
          align-items center
          padding 0 20px
          background linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.62) 100%)
          .bottom-name
            font-size 16px
            color #ffffff
          .bottom-voice
            color $them
            font-size 24px
            display flex
            align-items center
            width 64px
            .voice-volume
              width 40px
              height 15px
              background url('../assets/images/yinliangtiao_all.png') left center no-repeat
              background-size auto 100%
              position relative
              &::after
                content ""
                position absolute
                top 0
                left 0
                width 40px
                height 15px
                background url('../assets/images/yinliangtiao_no.png') left center no-repeat
                background-size 100%
      .class-chart
        width 100%
        height 100%
        border 5px solid $roomDeepGreen
        border-radius 20px
        flex-shrink 1
        margin-top 20px
        overflow hidden
</style>
<style lang="stylus">
.class-stu-videos
  .stu-video
    width 200px
    height 150px
    position relative
    background-color #e8e9f0
    .Talk_player
      z-index 2
    &::after
      content "\e934"
      font-size 70px
      font-family 'icomoon' !important
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      display flex
      justify-content center
      align-items center
      color #d8dae7
    .video-hover
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      z-index 4
      // background-color rgba(255, 255, 255, .5)
      padding 0 10px
      display none
      justify-content space-between
      align-items center
      font-size 40px
      color #fff
      i
        width 40px
        height 40px
        border-radius 50%
        background-color #404246
        cursor pointer
    &:hover .video-hover
      display flex
    .video-bottom
      height 30px
      position absolute
      z-index 3
      bottom 0
      left 0
      right 0
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      background linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.62) 100%)
      .bottom-name
        font-size 16px
        color #ffffff
      .bottom-voice
        color $them
        font-size 24px
        display flex
        align-items center
        width 64px
        .voice-volume
          width 40px
          height 15px
          background url('../assets/images/yinliangtiao_all.png') left center no-repeat
          background-size auto 100%
          position relative
          &::after
            content ""
            position absolute
            top 0
            left 0
            width 40px
            height 15px
            background url('../assets/images/yinliangtiao_no.png') left center no-repeat
            background-size 100%

</style>

<template lang="pug">
.classroom
  Header(:role="role" :room="room" :classBegin.sync="classBegin" :networkStatus="networkStatus" :files="files" @showTools="showTools")
  .classroom-content
    .class-board
      .class-whiteboard
        //- WhiteBoard
        Datiqi(v-if="role === 0 && toolsShow.datiqi" :room="room" @onClose="closeTools")
        DatiqiStu(v-if="role === 2 && toolsShow.datiqiStu" :room="room" :answerList="answerList" :teacher="teacher")
      #stu-videos.class-stu-videos(ref="stuVideoList")
        template(v-for="item in students")
          .stu-video(:key="item.id" :id="`video-${item.id}`" v-if="item.publishstate")
            .video-hover
              i.middle-btn.icon-btn_shangtai(@click="downStage(item)")
              i.middle-btn.icon-btn_audio(@click="teacherStopStuAudio(item)" v-if="item.publishstate === 1 || item.publishstate === 3")
              i.middle-btn.icon-btn_mute(v-else @click="teacherOpenStuAudio(item)")
              i.middle-btn.icon-btn_camera(@click="teacherStopStuVideo(item)" v-if="item.publishstate === 2 || item.publishstate === 3")
              i.middle-btn.icon-btn_close-camera(@click="teacherOpenStuVideo(item)" v-else)
            .video-bottom
              .bottom-name {{item.nickname}}
              .bottom-voice(v-if="teacher && (item.publishstate === 1 || item.publishstate === 3)")
                i.icon-btn_audio
                .voice-volume
              .bottom-voice(style="justify-content: flex-end;" v-else)
                i.icon-btn_mute
    .class-info
      #teacher-video.class-video
        .teacher-video-hover(v-if="teacher")
          i.middle-btn.icon-btn_audio(@click="closeTeacherAudio" v-if="teacher.publishstate === 1 || teacher.publishstate === 3")
          i.middle-btn.icon-btn_mute(v-else @click="openTeacherAudio")
          i.middle-btn.icon-btn_camera(@click="closeVideo" v-if="teacher.publishstate === 2 || teacher.publishstate === 3")
          i.middle-btn.icon-btn_close-camera(@click="openVideo" v-else)
          i.middle-btn.icon-btn_fuwei
        .video-bottom
          .bottom-name teacher
          .bottom-voice(v-if="teacher && (teacher.publishstate === 1 || teacher.publishstate === 3)")
            i.icon-btn_audio
            .voice-volume(:style="{width: `${teacherVolume / 10 * .4}rem`}")
          .bottom-voice(style="justify-content: flex-end;" v-else)
            i.icon-btn_mute
      .class-chart
        ChartRoom(:room="room" :students="students" :role="role" :muteAll="muteAll")
</template>

<script>
import Header from '@/components/classroom/Header'
import WhiteBoard from '@/components/common/WhiteBoard'
import ChartRoom from '@/components/classroom/ChartRoom'
import Datiqi from '@/components/tools/Datiqi'
import DatiqiStu from '@/components/tools/DatiqiStu'

export default {
  components: {
    Header,
    WhiteBoard,
    ChartRoom,
    Datiqi,
    DatiqiStu
  },
  data () {
    return {
      role: 0,
      room: null,
      dispatcher: null,
      networkStatus: null,
      classBegin: false,
      students: [],
      teacher: null,
      files: [],
      teacherVolume: 0,
      answerList: [],
      toolsShow: {
        datiqi: false,
        datiqiStu: false
      }
    }
  },
  computed: {
    muteAll () {
      return this.students.every(item => item.disablechat)
    }
  },
  beforeMount () {
    this.role = +localStorage.getItem('role')
    this.room = TK.Room()
  },
  mounted () {
    this.initRoom()
    // 房间连接事件
    this.room.addEventListener(TK.EVENT_TYPE.roomConnected, (e) => {
      console.log('房间连接成功', e)
      if(e.message?.some(item => item.id === 'ClassBegin')) {
        this.classBegin = true
        this.room.publishVideo()
      }
      this.getUsers()
    })
    // 监听上课事件
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, (e) => {
      // 上课事件
      if (e?.message?.name === 'ClassBegin') {
        this.classBegin = true
        this.room.publishVideo()
        this.getUsers()
      }
      // 答题器事件
      if (e?.message.name === 'Question') {
        this.toolsShow.datiqiStu = true
        this.answerList = e.message.data.options
      }
      // 答题器答案事件
      if (e?.message?.name === 'Answer') {
        console.log('答案', e)
      }
      // 结束答题，此时关闭学生的答题器
      if (e.message?.name === 'EndQuestion') {
        this.toolsShow.datiqiStu = false
      }
    })
    // 监听下课事件
    this.room.addEventListener(TK.EVENT_TYPE.roomDelmsg, (e) => {
      if (e?.message?.name === 'ClassBegin') {
        this.classBegin = false
        this.room.unpublishVideo()
        this.getUsers()
      }
    })
    // 用户加入房间事件
    this.room.addEventListener(TK.EVENT_TYPE.roomParticipantJoin, () => {
      this.getUsers()
    })
    // 用户离开房间事件
    this.room.addEventListener(TK.EVENT_TYPE.roomParticipantLeave, (e) => {
      this.getUsers()
      console.log('用户离开房间', e)
      if (e.user.role === 2) {
        // 如果是学生
        if (document.getElementById(`video-${e.userId}`)) {
          // 如果已经存在于视频列表中
          // this.$refs.stuVideoList.removeChild(document.getElementById(`video-${e.userId}`))
        }
      }
    })
    // 用户属性改变事件
    this.room.addEventListener(TK.EVENT_TYPE.roomUserPropertyChanged, () => {
      this.getUsers()
    })
    // 网络检测
    this.room.addEventListener(TK.EVENT_TYPE.roomUserNetworkStateChanged, e => {
      this.networkStatus = e.message?.networkStatus
    })
    this.room.addEventListener(TK.EVENT_TYPE.roomFiles, e => {
      console.log(6666666, e)
    })
    // 第一次进来，查看学员的状态
    this.room.addEventListener(TK.EVENT_TYPE.roomConnected, () => {
      this.getUsers(() => {
        this.$store.state.stu?.stuList.forEach(element => {
          if (element.publishstate) {
            this.room.changeUserProperty(element.id, TK.MSG_TO_ALLUSER, {
              publishstate: element.publishstate
            })
            this.playStuVideo(element)
          }
        })
      })
    })

    // 用户属性改变事件
    this.room.addEventListener(TK.EVENT_TYPE.roomUserPropertyChanged, (e) => {
      console.log(11111, e)
      const myId = this.room.getMySelf().id
      if (e.message?.hasOwnProperty('publishstate')) {
        /**
         * 若发生变化的是用户的音视频发布状态
         * 首先判断是不是自己，若是自己则改变自己的音视频发布状态
         * 若不是自己则直接调用是否播放音视频
         */
        if (e.user?.role === 2) {
          if (e.userId === myId) {
            // 改变的是自己
            switch (e.message.publishstate) {
              case 0:
                // 停止发布音频和视频，并移除视频列表
                this.room.unpublishAudio()
                this.room.unpublishVideo()
                // this.$refs.stuVideoList.removeChild(document.getElementById(`video-${e.userId}`))
                break
              case 1:
                // 只发布音频
                this.room.publishAudio()
                break
              case 2:
                // 只发布视频
                this.room.publishVideo()
                break
              case 3:
                // 同时发布音视频
                this.room.publishAudio()
                this.room.publishVideo()
                break
              case 4:
                // 停止发布音视频
                // this.room.unpublishAudio()
                // this.room.unpublishVideo()
                break
              default:
                break
            }
          } else {
            // 改变的不是自己，只需要判断是否是0
            if (e.message.publishstate === 0) {
              // this.$refs.stuVideoList.removeChild(document.getElementById(`video-${e.userId}`))
            }
          }
        } else {
          // 这是老师
        }
      }
    })
    // 用户视频发布状态改变
    this.room.addEventListener(TK.EVENT_TYPE.roomUserVideoStateChanged, e => {
      console.log('用户视频发布状态改变', e)
      const stu = this.$store.state.stu.stuList.find(item => item.id === e.message?.userId)
      console.log('stu', stu)
      if (stu) {
        // 这里表示是学生
        if (e.message?.published) {
          this.playStuVideo(stu)
        } else {
          this.stopStuVideo(stu)
        }
      } else {
        // 这里表示老师
        if (e.message?.published) {
          this.playTeacherVideo()
        } else {
          this.stopTeacherVideo()
        }
      }
    })
    // 用户音频发布状态改变
    this.room.addEventListener(TK.EVENT_TYPE.roomUserAudioStateChanged, e => {
      console.log('监听音频状态变化', e)
      // 这是老师
      if (e.message?.userId === this.teacher?.id) {
        if (e.message?.publishstate === 1 || e.message?.publishstate === 3) {
          this.room.registerAudioVolumeListener(this.teacher.id, 80, vol => {
            this.teacherVolume = vol
          })
        } else {
          this.room.unregisterAudioVolumeListener(this.teacher.id)
        }
      }
    })
  },
  methods: {
    // 初始化房间
    initRoom () {
      if (!this.room.checkInit()) {
        this.room.init('mL5IQKSXU0Py1c2P', res => {
          console.log('初始化成功', res)
          this.joinRoom()
        }, err => {
          console.log('初始化失败', err)
        })
      }
    },
    // 加入房间
    joinRoom () {
      this.room.joinroom('global.talk-cloud.net', '443', localStorage.getItem('name'), localStorage.getItem('name'), {
        serial: this.$route.params.serial,
        password: this.role === 0 ? '7580' : '2824'
      })
      this.playTeacherVideo()
    },
    // 播放老师视频
    playTeacherVideo () {
      this.room.playVideo(this.teacher?.id || '', 'teacher-video', {}, err => {
        console.log('播放失败', err)
      })
    },
    // 停止播放老师视频
    stopTeacherVideo () {
      this.room.unplayVideo(this.teacher.id)
    },
    // 播放学生视频
    playStuVideo (stu) {
      this.room.playVideo(stu.id || '', `video-${stu.id}`, {}, err => {
        console.log('播放学生视频失败', err)
      })
    },
    // 停止播放学生视频
    stopStuVideo (stu) {
      this.room.unplayVideo(stu.id)
    },
    // 获取所有学生列表
    getUsers (cb) {
      this.room.getRoomUsers(data => {
        this.students = data.filter(item => item.role === 2)
        this.teacher = data.filter(item => item.role === 0)[0]
        this.$store.commit('stu/setStuList', {
          stuList: data.filter(item => item.role === 2)
        })
        this.$store.commit('stu/setTeacher', {
          teacher: data.filter(item => item.role === 0)
        })
        if (cb) cb()
      })
    },
    openVideo () {
      this.room.publishVideo()
      this.room.playVideo(this.teacher.id, 'teacher-video')
    },
    closeVideo () {
      this.room.unpublishVideo()
      this.room.unplayVideo(this.teacher.id)
    },
    openTeacherAudio () {
      if (this.teacher.publishstate === TK.PUBLISH_STATE_NONE || this.teacher.publishstate === TK.PUBLISH_STATE_MUTEALL) {
        this.room.changeUserProperty(this.teacher.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_AUDIOONLY
        })
      } else if (this.teacher.publishstate === TK.PUBLISH_STATE_VIDEOONLY) {
        this.room.changeUserProperty(this.teacher.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_BOTH
        })
      }
    },
    closeTeacherAudio () {
      if (this.teacher.publishstate === TK.PUBLISH_STATE_AUDIOONLY) {
        // 如果只发布了视频，则改为禁用全部
        this.room.changeUserProperty(this.teacher.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_MUTEALL
        })
      } else if (this.teacher.publishstate === TK.PUBLISH_STATE_BOTH) {
        // 如果两者都发布了，则只为只发布音频
        this.room.changeUserProperty(this.teacher.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_VIDEOONLY
        })
      }
    },
    // 老师停止播放学生的视频
    teacherStopStuVideo (stu) {
      if (stu.publishstate === 2) {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 4
        })
      } else {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 1
        })
      }
    },
    // 老师开启播放学生的视频
    teacherOpenStuVideo (stu) {
      if (stu.publishstate === 1) {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 3
        })
      } else {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 2
        })
      }
    },
    // 老师停止播放学生的音频
    teacherStopStuAudio (stu) {
      if (stu.publishstate === 1) {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 4
        })
      } else {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 2
        })
      }
    },
    // 老师开启播放学生的音频
    teacherOpenStuAudio (stu) {
      if (stu.publishstate === 2) {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 3
        })
      } else {
        this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
          publishstate: 1
        })
      }
      this.observeStuVolume(stu)
    },
    // 监听学生的音量变化
    observeStuVolume (stu) {
      this.room.registerAudioVolumeListener(stu.id, 80, vol => {
        console.log('学生音频变化', vol)
      })
    },
    // 下台学生
    downStage (stu) {
      this.room.changeUserProperty(stu.id, TK.MSG_TO_ALLUSER, {
        publishstate: TK.PUBLISH_STATE_NONE
      })
    },
    // 打开工具箱里面的工具
    showTools (item) {
      switch (item) {
        case 'datiqi':
          this.toolsShow.datiqi = true
          break;
        default:
          break;
      }
    },
    // 关闭工具箱里面的工具
    closeTools (item) {
      console.log(11111, item)
      switch (item) {
        case 'datiqi':
          this.toolsShow.datiqi = false
          break;
        default:
          break;
      }
    }
  }
}
</script>