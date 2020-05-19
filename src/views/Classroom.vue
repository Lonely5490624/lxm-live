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
        flex-shrink 1
        height 100%
        position relative
        background-color #ccc
        .lxm-whiteboard
          position absolute
          top 0
          bottom 0
          left 0
          right 0
          z-index 1
        .class-file-show
          width 100%
          height 100%
          z-index 2
          background-color #eee
          position absolute
          top 0
          left 0
          .file-png
            width 100%
            height 100%
            background-size contain
            background-position center center
            background-repeat no-repeat
        .class-media-box
          position absolute
          top 0
          // bottom 0
          left 0
          // right 0
          z-index 9
          // pointer-events none
        .class-file-control
          position absolute
          bottom 10px
          left 50%
          transform translateX(-50%)
          background-color rgba(0,0,0,.5)
          height 50px
          border-radius 25px
          display flex
          align-items center
          color #ffffff
          padding 0 30px
          z-index 3
          .page-btn
            font-size 20px
            font-family 'icomoon'
            cursor pointer
            width 46px
            text-align center
            &.prev-page
              &:before
                content "\ee027"
            &.next-page
              &:before
                content "\ee028"
            &.disabled
              opacity .5
          .page-jump
            display flex
            font-size 14px
            align-items center
            .page-cur
              width 48px
              height 24px
              border 1px solid #ffffff
              border-radius 14px
              line-height 24px
              background-color transparent
              color #ffffff
              text-align center
              outline none
              font-size 14px
            .page-sep
              margin 0 8px
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
.reward-dom
  position fixed
  left 50%
  top 50%
  transform translate(-50%, -50%)
  width 300px
  height 300px
  background url('../assets/images/xingxing.png') center no-repeat
  background-size 100%
  z-index 999
  &.active
    transition all 1.5s ease-in-out
    width 10px
    height 10px
</style>

<template lang="pug">
.classroom
  Header(
    :role="role"
    :room="room"
    :classBegin.sync="classBegin"
    :networkStatus="networkStatus"
    :files="files"
    @showTools="showTools"
    :students="students"
    :devices="devices"
    @settinDone="getDevices"
    :currentFile="currentFile"
    :classDuration="classDuration"
    :teacher="teacher"
    @rewardUserAll="rewardUserAll"
  )
  .classroom-content
    .class-board
      .class-whiteboard(:style="{height: students.some(item => item.publishstate) ? 'calc(100% - 1.5rem)' : '100%'}")
        //- #lxmWhiteBoard.lxm-whiteboard
        WhiteBoard(:room="room" :role="role")
        Datiqi(v-if="role === 0 && toolsShow.datiqi" :room="room" @onClose="closeTools")
        DatiqiStu(v-if="role === 2 && toolsShow.datiqiStu" :room="room" :answerList="answerList" :teacher="teacher")
        Jishiqi(v-if="role === 0 && toolsShow.jishiqi" :room="room" @onClose="closeTools")
        JishiqiStu(v-show="role === 2 && toolsShow.jishiqiStu" :room="room")
        Qiangdaqi(v-if="role === 0 && toolsShow.qiangdaqi" :room="room" @onClose="closeTools")
        QiangdaqiStu(v-if="role === 2 && toolsShow.qiangdaqiStu" :room="room")
        Zhuanpan(v-if="role === 0 && toolsShow.zhuanpan" :room="room" @onClose="closeTools")
        ZhuanpanStu(v-if="role === 2 && toolsShow.zhuanpanStu" :room="room")
        LittleWhiteBoard(v-if="role === 0 && toolsShow.xiaobaiban" :room="room" :role="role" @onClose="closeTools")
        LittleWhiteBoardStu(v-if="role === 2 && toolsShow.xiaobaibanStu" :room="room" :role="role" :canvasData="canvasData")
        .class-file-show(v-if="Object.keys(currentFile).length")
          .file-png(v-if="currentFile && ['png', 'txt', 'pdf'].includes(currentFile.filetype)" :style="`background-image: url('https://doccdn.talk-cloud.net${currentFile.swfpath.replace(/\.(png|jpg)$/, '-'+currpage+'.$1')}')`")
          WhiteBoard(
            :room="room"
            :role="role"
            :withFile="true"
            :initAllPath.once="initAllPath"
            :outerInitWidth.once="initWidth"
            :outerInitHeight.once="initHeight"
            :fileImg="`https://doccdn.talk-cloud.net${currentFile.swfpath.replace(/\.(png|jpg)$/, '-'+currpage+'.$1')}`"
          )
        VideoPlayer(v-if="videoSrc" :room="room" :role="role" :src="videoSrc" @close="videoSrc = ''")
        AudioPlayer(v-if="audioSrc" :room="room" :role="role" :src="audioSrc" @close="audioSrc = ''")
        #classMediaBox.class-media-box
        .class-file-control(v-if="role === 0")
          .page-btn.prev-page(@click="changePage('prev')" :class="{disabled: currpage === 1}")
          .page-jump
            input.page-cur(:value="currpage" :readonly="!Object.keys(currentFile).length" @blur="jumpPage" @keyup.enter="jumpPage")
            .page-sep /
            .page-all {{currentFile && currentFile.pagenum || 1}}
          .page-btn.next-page(@click="changePage('next')" :class="{disabled: !Object.keys(currentFile).length || !currentFile || currpage === currentFile.pagenum}")
        .class-file-control(v-else)
          .page-btn.prev-page(:class="{disabled: currpage === 1}")
          .page-jump
            input.page-cur(:value="currpage" disabled)
            .page-sep /
            .page-all {{currentFile && currentFile.pagenum || 1}}
          .page-btn.next-page(:class="{disabled: !Object.keys(currentFile).length || !currentFile || currpage === currentFile.pagenum}")
      #stu-videos.class-stu-videos(ref="stuVideoList")
        template(v-for="item in students")
          .stu-video(:key="item.id" :id="`video-${item.id}`" v-if="item.publishstate")
            .video-hover(v-if="role === 0")
              i.middle-btn.icon-btn_shangtai(@click="downStage(item)")
              i.middle-btn.icon-btn_audio(@click="teacherStopStuAudio(item)" v-if="item.publishstate === 1 || item.publishstate === 3")
              i.middle-btn.icon-btn_mute(v-else @click="teacherOpenStuAudio(item)")
              i.middle-btn.icon-btn_camera(@click="teacherStopStuVideo(item)" v-if="item.publishstate === 2 || item.publishstate === 3")
              i.middle-btn.icon-btn_close-camera(@click="teacherOpenStuVideo(item)" v-else)
              i.middle-btn.icon-control_quantijiangli(@click="rewardUser(item)")
            .video-bottom
              .bottom-name {{item.nickname}}
              .bottom-voice(v-if="teacher && (item.publishstate === 1 || item.publishstate === 3)")
                i.icon-btn_audio
                .voice-volume
              .bottom-voice(style="justify-content: flex-end;" v-else)
                i.icon-btn_mute
    .class-info
      #teacher-video.class-video
        //- @todo 将老师的操作设置成上课后才能操作
        .teacher-video-hover(v-if="role === 0 && teacher")
          i.middle-btn.icon-btn_audio(@click="closeTeacherAudio" v-if="teacher.publishstate === 1 || teacher.publishstate === 3")
          i.middle-btn.icon-btn_mute(v-else @click="openTeacherAudio")
          i.middle-btn.icon-btn_camera(@click="closeVideo" v-if="teacher.publishstate === 2 || teacher.publishstate === 3")
          i.middle-btn.icon-btn_close-camera(@click="openVideo" v-else)
          //- i.middle-btn.icon-btn_fuwei
        .video-bottom
          .bottom-name {{teacher && teacher.nickname}}
          .bottom-voice(v-if="teacher && (teacher.publishstate === 1 || teacher.publishstate === 3)")
            i.icon-btn_audio
            .voice-volume(:style="{width: `${teacherVolume / 10 * .4}rem`}")
          .bottom-voice(style="justify-content: flex-end;" v-else)
            i.icon-btn_mute
      .class-chart
        ChartRoom(:room="room" :students="students" :role="role" :muteAll="muteAll")
  //- #rewardDom.reward-dom
</template>

<script>
import Header from '@/components/classroom/Header'
import WhiteBoard from '@/components/common/WhiteBoardNew'
import ChartRoom from '@/components/classroom/ChartRoom'
import Datiqi from '@/components/tools/Datiqi'
import DatiqiStu from '@/components/tools/DatiqiStu'
import Jishiqi from '@/components/tools/Jishiqi'
import JishiqiStu from '@/components/tools/JishiqiStu'
import Qiangdaqi from '@/components/tools/Qiangdaqi'
import QiangdaqiStu from '@/components/tools/QiangdaqiStu'
import Zhuanpan from '@/components/tools/Zhuanpan'
import ZhuanpanStu from '@/components/tools/ZhuanpanStu'
import VideoPlayer from '@/components/classroom/VideoPlayer'
import AudioPlayer from '@/components/classroom/AudioPlayer'
import LittleWhiteBoard from '@/components/tools/LittleWhiteBoard'
import LittleWhiteBoardStu from '@/components/tools/LittleWhiteBoardStu'

export default {
  components: {
    Header,
    WhiteBoard,
    ChartRoom,
    Datiqi,
    DatiqiStu,
    Jishiqi,
    JishiqiStu,
    Qiangdaqi,
    QiangdaqiStu,
    Zhuanpan,
    ZhuanpanStu,
    VideoPlayer,
    AudioPlayer,
    LittleWhiteBoard,
    LittleWhiteBoardStu
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
        datiqiStu: false,
        jishiqi: false,
        jishiqiStu: false,
        qiangdaqi: false,
        qiangdaqiStu: false,
        zhuanpan: false,
        zhuanpanStu: false,
        xiaobaiban: false,
        xiaobaibanStu: false
      },
      devices: null,
      currentFile: {},
      currpage: 1,
      initAllPath: [],
      initWidth: 0,
      initHeight: 0,
      videoSrc: '',
      audioSrc: '',
      classBeginTime: 0,
      timer: null,
      classDuration: 0,
      rewardSenging: false
    }
  },
  computed: {
    muteAll () {
      return this.students.every(item => item.disablechat)
    }
  },
  watch: {
    classBegin (val) {
      if (val) {
        this.getClassDuration()
      } else {
        this.clearClassDuration()
      }
    }
  },
  beforeMount () {
    console.log('classroom beforemount')
    this.role = +localStorage.getItem('role')
    this.room = TK.Room()
    window.room = this.room
    // 房间连接事件
    this.room.addEventListener(TK.EVENT_TYPE.roomConnected, (e) => {
      console.log('房间连接成功2222', e)
      this.$store.commit('user/setUserData', {
        userData: this.room.getMySelf()
      })
      const fileMessage = e.message.find(item => item.name === 'ShowPage')
      if (fileMessage) {
        const data = JSON.parse(fileMessage.data)
        if (data.filedata && Object.keys(data.filedata).length) {
          this.currentFile = data.filedata
          this.currpage = data.filedata.currpage || 1
        }
      }
      const canvasMessage = e.message?.find(item => item.name === 'LxmCanvas')
      if (canvasMessage) {
        const data = JSON.parse(canvasMessage.data)
        if (data.withFile) {
          this.initAllPath = data.allPath
          this.initWidth = data.initWidth
          this.initHeight = data.initHeight
        }
      }
    })
  },
  mounted () {
    console.log('classroom mounted')
    this.initRoom()
    this.getDevices()
    // 房间连接事件
    this.room.addEventListener(TK.EVENT_TYPE.roomConnected, (e) => {
      console.log('房间连接成功', e)
      if(e.message?.some(item => item.id === 'ClassBegin')) {
        this.classBegin = true
        this.room.publishVideo()
        const classBeginInfo = e.message.find(item => item.id === 'ClassBegin')
        this.classBeginTime = classBeginInfo.ts
      }
      this.getUsers(() => {
        console.log('teacher', this.teacher, this.role)
        if (this.teacher?.publishstate === 2 || this.teacher?.publishstate === 3) {
          this.playTeacherVideo()
        }
      })
      const shareVideo = e.message.find(item => item.name === 'ShareVideo')
      if (shareVideo && shareVideo.data) {
        const data = JSON.parse(shareVideo.data)
        this.videoSrc = data.url
      }
      const shareAudio = e.message.find(item => item.name === 'ShareAudio')
      if (shareAudio && shareAudio.data) {
        const data = JSON.parse(shareAudio.data)
        this.audioSrc = data.url
      }
    })
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, (e) => {
      // 上课事件
      if (e?.message?.name === 'ClassBegin') {
        console.log('开始上课', e)
        this.classBeginTime = e.message.ts
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
      // 计时器事件
      if (e.message?.name === 'Timer') {
        this.toolsShow.jishiqiStu = true
      }
      // 计时器结束事件
      if (e.message?.name === 'TimerStop') {
        this.toolsShow.jishiqiStu = false
      }
      // 抢答器开始事件
      if (e.message?.name === 'Qiangdaqi') {
        this.toolsShow.qiangdaqiStu = true
      }
      // 抢答器结束事件
      if (e.message?.name === 'QiangdaqiEnded') {
        this.toolsShow.qiangdaqiStu = false
      }
      // 转盘事件
      if (e.message?.name === 'Zhuanpan') {
        this.toolsShow.zhuanpanStu = true
      }
      // 转盘结束事件
      if (e.message?.name === 'ZhuanpanEnd') {
        this.toolsShow.zhuanpanStu = false
      }
      // 共享课件事件
      if (e.message?.name === 'ShowPage') {
        console.log('共享文件事件', e.message)
        /**
         * 这里如果是相同文件，则不重置为{}
         * 若不相同，则重置为{}，这样在不同文件之间切换时，canvas里面的内容清空
         */
        if (this.currentFile.fileid !== e.message.data.filedata.fileid) {
          this.currentFile = {}
          this.initAllPath = []
        }
        this.$nextTick(() => {
          this.currentFile = e.message.data.filedata || {}
        })
        this.currpage = e.message.data?.filedata?.currpage || 1
      }
      // 共享视频文件
      if (e.message.name === 'ShareVideo') {
        this.videoSrc = e.message.data?.url
      }
      // 共享音频文件
      if (e.message.name === 'ShareAudio') {
        this.audioSrc = e.message.data?.url
      }
      // 分发小白板事件
      if (e.message.name === 'LittleWhiteBoard') {
        this.toolsShow.xiaobaibanStu = true
        this.canvasData = e.message.data
      }
      // 学生获得奖励事件
      if (e.message.name === 'SendReward') {
        this.sendReward(e.message.data?.userId)
      }
    })
    this.room.addEventListener(TK.EVENT_TYPE.roomDelmsg, (e) => {
      // 监听下课事件
      if (e?.message?.name === 'ClassBegin') {
        this.classBegin = false
        this.room.unpublishVideo()
        this.getUsers()
        this.$message.error('课程已结束')
        // this.$router.back()
        // 修改所有学生的视频状态
        const ids = this.students.map(item => item.id)
        this.room.batchChangeUserProperty(ids, TK.MSG_TO_ALLUSER, {
          publishstate: 0
        })
      }
      // 取消共享视频文件
      if (e.message.name === 'ShareVideo') {
        this.videoSrc = ''
      }
      // 取消共享音频文件
      if (e.message.name === 'ShareAudio') {
        this.audioSrc = ''
      }
      // 监听小白板删除事件
      if (e.message.name === 'LittleWhiteBoard') {
        this.toolsShow.xiaobaiban = false
        this.toolsShow.xiaobaibanStu = false
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
      this.$store.commit('user/setUserData', {
        userData: null
      })
      this.$store.commit('user/setUserData', {
        userData: this.room.getMySelf()
      })
    })
    // 网络检测
    this.room.addEventListener(TK.EVENT_TYPE.roomUserNetworkStateChanged, e => {
      if (e.message.networkStatus.isMe) {
        this.networkStatus = e.message?.networkStatus
      }
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
    // 监听设备变化
    TK.DeviceMgr.addDeviceChangeListener(() => {
      this.getDevices()
    })
    // 监听媒体共享
    this.room.addEventListener(TK.EVENT_TYPE.roomUserMediaStateChanged, e => {
      console.log('监听媒体共享', e)
      if (e.message.type === 'media') {
        if (e.message.published) {
          // if (e.message.attributes.video) {
          //   this.room.playRemoteMedia(e.message.userId, 'classMediaBox', {
          //     loader: true
          //   }, err => {
          //     console.log('播放共享媒体文件失败', err)
          //   })
          // }
        } else {
          this.room.unplayRemoteMedia(e.message.userId, err => {
            console.log('停止播放共享媒体文件失败', err)
          })
          if (document.getElementById('PubAudio')) {
            document.getElementById('classMediaBox').removeChild(document.getElementById('PubAudio'))
          }
        }
      }
    })
    // 用户被驱逐出房间
    this.room.addEventListener(TK.EVENT_TYPE.roomParticipantEvicted, e => {
      if (e.userid === this.$store.state.user?.userData?.id) {
        this.$message.error('您已被请出房间')
        this.$router.back()
      }
    })
  },
  beforeDestroy () {
    this.room.removeAllEventListener([
      TK.EVENT_TYPE.roomConnected,
      TK.EVENT_TYPE.roomPubmsg,
      TK.EVENT_TYPE.roomDelmsg,
      TK.EVENT_TYPE.roomParticipantJoin,
      TK.EVENT_TYPE.roomParticipantLeave,
      TK.EVENT_TYPE.roomUserPropertyChanged,
      TK.EVENT_TYPE.roomUserNetworkStateChanged,
      TK.EVENT_TYPE.roomFiles,
      TK.EVENT_TYPE.roomUserPropertyChanged,
      TK.EVENT_TYPE.roomUserVideoStateChanged,
      TK.EVENT_TYPE.roomUserAudioStateChanged,
      TK.EVENT_TYPE.roomUserMediaStateChanged,
      TK.EVENT_TYPE.roomParticipantEvicted
    ])
    this.room.leaveroom()
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
        }, true, {
          isGetFileList: true
        })
      } else {
        this.joinRoom()
      }
    },
    // 加入房间
    joinRoom () {
      this.room.joinroom('global.talk-cloud.net', '443', localStorage.getItem('name'), localStorage.getItem('uid'), {
        serial: this.$route.params.serial,
        password: this.role === 0 ? '1314' : '4344'
      })
      this.myInfo = this.room.getMySelf()
      if (this.role === 0) {
        this.playTeacherVideo()
      }
      // 初始化白板
      // const wb = new window.TKWhiteBoardManager(this.room, null, true)
      // window.wb = wb
      // wb.createMainWhiteboard('lxmWhiteBoard', {
      //   primaryColor: '#f00'
      // }, (e, t) => {
      //   console.log('白板动作', e, t)
      // })
      // wb.registerRoomDelegate(this.room, e => {
      //   console.log('委托', e)
      // })
    },
    // 播放老师视频
    playTeacherVideo () {
      const mirror = localStorage.getItem('isVideoMirror')
      this.room.setLocalVideoMirror(JSON.parse(mirror))
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
      if (this.teacher?.publishstate === TK.PUBLISH_STATE_NONE || this.teacher?.publishstate === TK.PUBLISH_STATE_MUTEALL) {
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
      if (this.teacher?.publishstate === TK.PUBLISH_STATE_AUDIOONLY) {
        // 如果只发布了视频，则改为禁用全部
        this.room.changeUserProperty(this.teacher.id, TK.MSG_TO_ALLUSER, {
          publishstate: TK.PUBLISH_STATE_MUTEALL
        })
      } else if (this.teacher?.publishstate === TK.PUBLISH_STATE_BOTH) {
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
          break
        case 'jishiqi':
          this.toolsShow.jishiqi = true
          break
        case 'qiangdaqi':
          this.toolsShow.qiangdaqi = true
          break
        case 'zhuanpan':
          this.toolsShow.zhuanpan = true
          this.room.pubMsg({
            name: 'Zhuanpan',
            id: `Zhuanpan_${new Date().getTime()}`
          })
          break
        case 'xiaobaiban':
          this.toolsShow.xiaobaiban = true
          break
        default:
          break
      }
    },
    // 关闭工具箱里面的工具
    closeTools (item) {
      switch (item) {
        case 'datiqi':
          this.toolsShow.datiqi = false
          break
        case 'jishiqi':
          this.toolsShow.jishiqi = false
          break
        case 'qiangdaqi':
          this.toolsShow.qiangdaqi = false
          break
        case 'zhuanpan':
          this.toolsShow.zhuanpan = false
          break
        case 'xiaobaiban':
          this.toolsShow.xiaobaiban = false
          break
        default:
          break;
      }
    },
    // 获取所有设备列表
    getDevices () {
      TK.DeviceMgr.getDevices(res => {
        this.devices = res
      })
    },
    // 文件翻页
    changePage (type) {
      if (!Object.keys(this.currentFile).length) return
      if (type === 'prev') {
        if (this.currpage === 1) {
          return
        } else {
          this.currpage --
        }
      } else if (type === 'next') {
        if (this.currpage === this.currentFile.pagenum) {
          return
        } else {
          this.currpage ++
        }
      }
      const filedata = this.currentFile
      filedata.currpage = this.currpage
      this.room.pubMsg({
        name: 'ShowPage',
        id: 'DocumentFilePage_ShowPage',
        save: true,
        data: JSON.stringify({
          filedata
        })
      })
    },
    // 跳转翻页
    jumpPage (e) {
      if (!Object.keys(this.currentFile).length) {
        e.target.value = 1
        return
      }
      if (e.target.value <= 1) {
        this.currpage = 1
      } else if (e.target.value >= this.currentFile.pagenum) {
        this.currpage = this.currentFile.pagenum
      } else {
        this.currpage = e.target.value
      }
      const filedata = this.currentFile
      filedata.currpage = this.currpage
      this.room.pubMsg({
        name: 'ShowPage',
        id: 'DocumentFilePage_ShowPage',
        save: true,
        data: JSON.stringify({
          filedata
        })
      })
    },
    // 教室时长的计时器
    getClassDuration () {
      this.timer = setInterval(() => {
        this.classDuration = Math.round(Date.now() / 1000) - this.classBeginTime
      }, 1000)
    },
    clearClassDuration () {
      clearInterval(this.timer)
      this.timer = null
    },
    rewardUser (item) {
      this.sendReward(item.id)
      // 发送给教室里其他人
      this.room.pubMsg({
        name: 'SendReward',
        id: 'SendReward',
        toID: TK.MSG_TO_ALLEXCEPTSENDER,
        data: JSON.stringify({
          userId: item.id
        })
      })
      // 提交到后台
      this.$axios.post('stu/addIntegral', {
        uid: item.id,
        value: 10,
        source: 1,
        serial: this.$route.params.serial
      })
    },
    rewardUserAll () {
      this.students && this.students.length && this.students.forEach(item => {
        this.sendReward(item.id)
        // 发送给教室里其他人
        this.room.pubMsg({
          name: 'SendReward',
          id: 'SendReward',
          toID: TK.MSG_TO_ALLEXCEPTSENDER,
          data: JSON.stringify({
            userId: item.id
          })
        })
        // 提交到后台
        this.$axios.post('stu/addIntegral', {
          uid: item.id,
          value: 10,
          source: 1,
          serial: this.$route.params.serial
        })
      })
    },
    async sendReward (id) {
      const videoDom = document.getElementById(`video-${id}`)
      if (!videoDom) return
      const rewardDom = document.createElement('div')
      rewardDom.id = `rewardDom_${id}`
      rewardDom.classList.add('reward-dom')
      document.body.appendChild(rewardDom)
      setTimeout(() => {
        rewardDom.classList.add('active')
        const videoDomObj = videoDom.getBoundingClientRect()
        const left = videoDomObj.left + videoDomObj.width / 2
        const top = videoDomObj.top + videoDomObj.height / 2
        rewardDom.style.left = `${left}px`
        rewardDom.style.top = `${top}px`
        setTimeout(() => {
          rewardDom.classList.remove('active')
          rewardDom.style.left = '50%'
          rewardDom.style.top = '50%'
          document.body.removeChild(rewardDom)
        }, 1500);
      }, 100);
    }
  }
}
</script>