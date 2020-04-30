<style lang="stylus" scoped>
.setting-box
  position fixed
  width 700px
  height 570px
  top 50%
  left 50%
  transform translate(-50%, -50%)
  background-color $them
  z-index 99
  border-radius 20px
  .setting-title
    position relative
    height 42px
    .title-text
      font-size 16px
      color #ffffff
      font-weight bold
      line-height 42px
      text-align center
    .title-close
      position absolute
      right 15px
      top 18px
      cursor pointer
      &::before, &::after
        content ""
        width 17px
        height 3px
        background-color #fff
        border-radius 2px
        position absolute
        top 0
        right 0
      &::before
        transform rotate(45deg)
      &::after
        transform rotate(-45deg)
  .setting-content
    display flex
    .content-nav
      width 125px
      display flex
      flex-direction column
      align-items center
      .nav-item
        width 100px
        height 45px
        line-height 45px
        margin-top 15px
        background-color $inputPlace
        font-size 14px
        color #ffffff
        text-align center
        border-radius 22px
        cursor pointer
        &.current
          background-color #fff
          color #333333
    .content-main
      background-color #fff
      width 570px
      height 520px
      border-radius 16px
      position relative
      .main-item
        padding 30px 0
        .item-section
          display flex
          .item-label
            width 135px
            padding-left 42px
            font-size 14px
            color #333333
            line-height 35px
            flex-shrink 0
          .item-content
            flex-shrink 1
            .setting-select
              width 400px
              height 35px
            .device-warn
              font-size 14px
              color #FF5418
              margin-top 18px
            .device-video
              margin-top 15px
              width 133px
              height 97px
              background-color #A0A0A0
              margin-bottom 25px
              #checkVideo
                width 100%
                height 100%
                background-color transparent
                &.mirror
                  transform rotateY(180deg)
          .section-tips
            font-size 14px
            color #999999
            line-height 24px
            padding 0 30px 0 42px
            margin-top 20px
          .audio-content
            padding-left 42px
            .audio-tips
              font-size 14px
              color #999999
              margin-top 40px
            .audio-volume-list
              display flex
              margin-top 30px
              .audio-volume-item
                width 10px
                height 33px
                background-color #FFF3CB
                border-radius 5px
                & + .audio-volume-item
                  margin-left 10px
                &.active
                  background-color $inputPlace
        .device-ctrl
          .device-btn
            width 120px
            height 40px
            line-height 40px
            cursor pointer
            text-align center
            font-size 16px
            color #ffffff
            background-color $inputPlace
            border-radius 18px
            position absolute
            bottom 30px
            right 30px
        .voice-tips
          padding-left 42px
          font-size 16px
          color $inputPlace
          margin-top 30px
        .audio-play
          padding-left 42px
          display flex
          align-items center
          margin-top 25px
          .play-btn
            width 50px
            height 50px
            cursor pointer
            img
              width 100%
          .play-icon
            width 22px
            height 22px
            margin-left 20px
          .play-volume
            margin-left 10px
            display flex
            align-items center
            .volume-slider
              width 280px
            .volume-value
              color $inputPlace
              font-size 18px
              margin-left 20px
</style>
<style lang="stylus">
.el-input--suffix .el-input__inner
  width 400px
  height 35px
  text-indent 1em
  font-size 12px
  border 1px solid $them
  border-radius 17px
.el-select:hover .el-input__inner,
.el-select .el-input__inner:focus,
.el-select .el-input.is-focus .el-input__inner
  border-color $them
&.is-focus
  .el-input__inner
    border-bottom-left-radius 0
    border-bottom-right-radius 0
.el-input__icon
  line-height 24px
.el-select-dropdown
  border-bottom-left-radius 14px
  border-bottom-right-radius 14px
.el-select-dropdown__item
  font-size 12px
  height 28px
  line-height 28px
.el-select .el-input .el-select__caret
  font-size 14px
</style>

<template lang="pug">
.setting-box
  .setting-title
    .title-text 设置
    .title-close(@click="$emit('close')")
  .setting-content
    .content-nav
      .nav-item(:class="{current: step === 1}" @click="step = 1") 视频检测
      .nav-item(:class="{current: step === 2}" @click="step = 2") 扬声器检测
      .nav-item(:class="{current: step === 3}" @click="step = 3") 麦克风检测
      //- .nav-item(:class="{current: step === 4}" @click="step = 4") 系统信息
    .content-main
      .main-item(v-if="step === 1")
        section.item-section
          label.item-label 摄像头选项
          content.item-content
            el-select.setting-select(v-model="videoinputId" @change="videoChanged")
              el-option(
                v-for="item in devices && devices.devices.videoinput"
                :key="item.deviceId"
                :value="item.deviceId"
                :label="item.label"
              )
            p.device-warn 注意：选择禁用会导致摄像头不可用
            .device-video
              video#checkVideo(ref="videoRef" :class="{mirror: mirror}")
        section.item-section
          label.item-label 镜像模式
          content.item-content
            el-checkbox(v-model="mirror")
        section.item-section
          .section-tips
            p 温馨提示：如果您无法看到视频，请按以下方式排查问题
            p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
            p 2、确认摄像头已连接并开启；
            p 3、如果摄像头仍然没有画面，换一个插口重新插入摄像头；
            p 4、请选择正确的摄像头选项，选择禁用会导致摄像头不可用；
            p 5、确认摄像头没有被其他程序占用；
            p 6、重启电脑。
        .device-ctrl
          .device-btn(@click="confirm") 确定
      .main-item(v-if="step === 2")
        section.item-section
          label.item-label 耳机选项
          content.item-content
            el-select.setting-select(v-model="audiooutputId" @change="voiceChangeed")
              el-option(
                v-for="item in devices && devices.devices.audiooutput"
                :key="item.deviceId"
                :value="item.deviceId"
                :label="item.label"
              )
        section.item-section
          p.voice-tips 点击下方播放按钮，您能听到音乐吗
        section.item-section
          .audio-play
            .play-btn(@click="audioPlay")
              img(src="../../assets/images/icon_play.png")
            img.play-icon(src="../../assets/svg/svg_sound_yellow.svg")
            .play-volume
              el-slider.volume-slider(v-model="volume" :show-tooltip="false" @input="volumeChanged")
              span.volume-value {{volume}}
            audio(ref="audioRef" src="https://doccdn.talk-cloud.net/static/h5_new_3.3.3.7/music/detectionDevice_default.wav" display="none")
        section.item-section
          .section-tips
            p 温馨提示：如果您无法听到声音，请按以下方式排查问题
            p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
            p 2、确认耳机、扬声器已连接并开启；
            p 3、确认耳机、扬声器音量已经调整到最大；
            p 4、请选择正确的耳机选项，选择禁用会导致耳机、扬声器不可用；
            p 5、如果耳机、扬声器仍然没有声音，换一个插口重新插入耳机、扬声器；
            p 6、重启电脑。
        .device-ctrl
          .device-btn(@click="confirm") 确定
      .main-item(v-if="step === 3")
        section.item-section
          label.item-label 麦克风选项
          content.item-content
            el-select.setting-select(v-model="audioinputId" @change="changeAduio")
              el-option(
                v-for="item in devices && devices.devices.audioinput"
                :key="item.deviceId"
                :value="item.deviceId"
                :label="item.label"
              )
            p.device-warn 请选择正确胡麦克风选项，选择禁用会导致麦克风不可用
        section.item-section
          .audio-content
            p.audio-tips 对着麦克风从1数到10，您能听到自己的声音并且看到黄条滚动吗？
            .audio-volume-list
              .audio-volume-item(v-for="item in volumeItems" :key="item" :class="{active: item <= audioVolume}")
            #audioTestDom
        section.item-section
          .section-tips
            p 温馨提示：如果您无法看到黄色滚动条，请按以下方式排查
            p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
            p 2、确认麦克风已连接并开启；
            p 3、确认麦克风已插入电脑的麦克风插孔中，并且麦克风声音已调整到最大；
            p 4、请选择正确的麦克风选项，选择禁用会导致麦克风不可用；
            p 5、如果麦克风仍然没有声音，换一个插口重新插入麦克风；
            p 6、重启电脑。
        .device-ctrl
          .device-btn(@click="confirm") 确定
</template>

<script>
const volumeItems = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

export default {
  props: {
    room: Object,
    devices: Object
  },
  data () {
    return {
      videoinputId: '',
      mirror: false,
      audiooutputId: '',
      volume: 100,
      audioinputId: '',
      volumeItems,
      audioVolume: 0,
      step: 1
    }
  },
  created () {
    this.mirror = localStorage.getItem('isVideoMirror') ? JSON.parse(localStorage.getItem('isVideoMirror')) : false
  },
  mounted () {
    this.videoinputId = this.devices.useDevices.videoinput
    this.audiooutputId = this.devices.useDevices.audiooutput
    this.audioinputId = this.devices.useDevices.audioinput
    this.videoChanged()
  },
  beforeDestroy () {
    TK.DeviceMgr.stopMicrophoneTest()
  },
  watch: {
    devices (val) {
      this.videoinputId = val.useDevices.videoinput
      this.audiooutputId = val.useDevices.audiooutput
      this.audioinputId = val.useDevices.audioinput
      this.videoChanged()
      if (this.step === 3) {
        this.startMicrophoneTest()
      }
    },
    step (val) {
      if (val === 1) {
        this.videoChanged()
      }
      if (val === 3) {
        this.startMicrophoneTest()
      } else {
        TK.DeviceMgr.stopMicrophoneTest()
      }
    }
  },
  methods: {
    // 切换摄像头
    videoChanged () {
      if (this.$refs.videoRef?.srcObject) {
        this.closeVideo()
      }
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: this.videoinputId }
        }
      }).then(stream => {
        const video = this.$refs.videoRef
        video.autoplay = true;
        video.src = window.URL.createObjectURL(stream);
      });
    },
    // 关闭摄像头的流
    closeVideo () {
      var stream = this.$refs.videoRef?.srcObject
      stream.getTracks().forEach(element => {
        element.stop()
      });
    },
    // 播放音频
    audioPlay () {
      this.$refs.audioRef.load()
      this.$refs.audioRef.play()
    },
    // 切换耳机
    voiceChangeed () {
      TK.DeviceMgr.associateElementsToSpeaker(this.$refs.audioRef, this.videoinputId, (res) => {
        console.log('sucess: ', res)
      })
    },
    // 修改声音
    volumeChanged () {
      this.$refs.audioRef.volume = this.volume / 100
    },
    // 切换麦克风
    changeAduio () {
      this.startMicrophoneTest()
    },
    // 开始麦克风检测
    startMicrophoneTest () {
      TK.DeviceMgr.startMicrophoneTest(this.audioinputId, 'audioTestDom', res => {
        this.audioVolume = Math.round(res/5)
      }, err => {
        console.log(2222, err)
      })
    },
    // 保存修改
    confirm () {
      this.room.setLocalVideoMirror(this.mirror)
      localStorage.setItem('isVideoMirror', this.mirror)
      TK.DeviceMgr.setDevices({
        videoinput: this.videoinputId,
        audioinput: this.audioinputId,
        audiooutput: this.audiooutputId
      })
      this.$emit('done')
      this.$emit('close')
    }
  }
}
</script>