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
  Header(:role="role" :room="room" :classBegin.sync="classBegin" :networkStatus="networkStatus" :files="files")
  .classroom-content
    .class-board
      WhiteBoard.class-whiteboard
      #stu-videos.class-stu-videos(ref="stuVideoList")
        //- .stu-video
    .class-info
      #teacher-video.class-video
        .teacher-video-hover(v-if="teacher && classBegin")
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
      .class-chart 聊天室
</template>

<script>
import Header from '@/components/classroom/Header'
import WhiteBoard from '@/components/common/WhiteBoard'

export default {
  components: {
    Header,
    WhiteBoard
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
      teacherVolume: 0
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
      if (e?.message?.id === 'ClassBegin') {
        this.classBegin = true
        this.room.publishVideo()
        this.getUsers()
      }
    })
    // 监听下课事件
    this.room.addEventListener(TK.EVENT_TYPE.roomDelmsg, (e) => {
      if (e?.message?.id === 'ClassBegin') {
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
    this.room.addEventListener(TK.EVENT_TYPE.roomParticipantLeave, () => {
      this.getUsers()
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
      if (e.user?.role === 2) {
        const state = e.message?.publishstate
        if (state === 0) {
          this.stopStuVideo(e.user)
          const dom = document.getElementById(`video-${e.user?.id}`)
          this.$refs.stuVideoList.removeChild(dom)
        }
      }
    })
    // 用户视频发布状态改变
    this.room.addEventListener(TK.EVENT_TYPE.roomUserVideoStateChanged, e => {
      const stu = this.$store.state.stu.stuList.find(item => item.id === e.message?.userId)
      console.log('stu', stu)
      if (stu) {
        if (e.message?.published) {
          this.playStuVideo(stu)
        } else {
          this.stopStuVideo(stu)
        }
      }
    })
    // 用户音频发布状态改变
    this.room.addEventListener(TK.EVENT_TYPE.roomUserAudioStateChanged, e => {
      if (e.message?.userId === this.teacher?.id) {
        if (e.message?.publishstate === 1 || e.message?.publishstate === 3) {
          this.room.registerAudioVolumeListener(this.teacher.id, 80, vol => {
            console.log('vol', vol)
            this.teacherVolume = vol
          })
        } else {
          this.room.unregisterAudioVolumeListener(this.teacher.id)
        }
      }
      const stu = this.$store.state.stu.stuList.find(item => item.id === e.message?.userId)
      if (stu) {
        let stuVideoDom = document.getElementById(`video-${stu.id}`)
        if (e.message?.publishstate) {
          if (!stuVideoDom) {
            this.addStuVideoDom(stu)
            stuVideoDom = document.getElementById(`video-${stu.id}`)
          }
          if (e.message?.published) {
            stuVideoDom.querySelector('.bottom-voice').innerHTML = '<i class="icon-btn_audio"></i><div class="voice-volume"></div>'
            stuVideoDom.querySelector('.bottom-voice').removeAttribute('style')
            this.room.registerAudioVolumeListener(stu.id, 80, vol => {
              stuVideoDom.querySelector('.bottom-voice').querySelector('.voice-volume').style.width = `${vol / 10 * .4}rem`
            })
          } else {
            stuVideoDom.querySelector('.bottom-voice').innerHTML = '<i class="icon-btn_mute"></i>'
            stuVideoDom.querySelector('.bottom-voice').setAttribute('style', 'justify-content: flex-end;')
            this.room.unregisterAudioVolumeListener(stu.id)
          }
        }
      }
    })
  },
  // updated () {
  //   this.initRoom()
  //   this.room.addEventListener(TK.EVENT_TYPE.roomConnected, () => {
  //     this.getUsers(() => {
  //       this.$store.state.stu?.stuList.forEach(element => {
  //         if (element.publishstate) {
  //           this.room.changeUserProperty(element.id, TK.MSG_TO_ALLUSER, {
  //             publishstate: element.publishstate
  //           })
  //           this.playStuVideo(element)
  //         }
  //       })
  //     })
  //   })
  // },
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
      this.room.joinroom('global.talk-cloud.net', '443', 'tester', 'i am teacher id', {
        serial: this.$route.params.serial,
        password: '7580'
      })
      this.playTeacherVideo()
    },
    // 播放老师视频
    playTeacherVideo () {
      this.room.playVideo(this.room.getMySelf().id || '', 'teacher-video', {}, err => {
        console.log('播放失败', err)
      })
    },
    stopTeacherVideo () {
      this.room.unplayVideo()
    },
    // 添加学生视频的dom
    addStuVideoDom (stu) {
      const stuId = stu.id
      const domId = 'video-' + stuId
      let stuVideoDom = document.getElementById(domId)
      if (!stuVideoDom) {
        stuVideoDom = document.createElement('div')
        stuVideoDom.setAttribute('id', domId)
        stuVideoDom.setAttribute('class', 'stu-video')
        const bottomDom = `
          <div class="video-bottom">
            <div class="bottom-name">
              ${stu.nickname}
            </div>
            ${stu.publishstate === 1 || stu.publishstate === 3 ?
            // eslint-disable-next-line no-multi-str
            '<div class="bottom-voice">\
              <i class="icon-btn_audio"></i>\
              <div class="voice-volume"></div>\
            </div>' :
            // eslint-disable-next-line no-multi-str
            '<div class="bottom-voice" style="justify-content: flex-end;">\
              <i class="icon-btn_mute"></i>\
            </div>'}
          </div>
        `
        stuVideoDom.innerHTML = bottomDom
        this.$refs.stuVideoList.appendChild(stuVideoDom)
      }
    },
    // 播放学生视频
    playStuVideo (stu) {
      this.addStuVideoDom(stu)
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
    }
  }
}
</script>