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
          font-size 16px
          color $inputPlace
          margin-top 30px
        .audio-play
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
      .nav-item(:class="{current: step === 4}" @click="step = 4") 系统信息
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
            p 4、请选择正确摄像头选项，选择禁用会导致摄像头不可用；
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
            p 温馨提示：如果您无法看到视频，请按以下方式排查问题
            p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
            p 2、确认摄像头已连接并开启；
            p 3、如果摄像头仍然没有画面，换一个插口重新插入摄像头；
            p 4、请选择正确摄像头选项，选择禁用会导致摄像头不可用；
            p 5、确认摄像头没有被其他程序占用；
            p 6、重启电脑。
        .device-ctrl
          .device-btn(@click="confirm") 确定
</template>

<script>
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
      step: 1
    }
  },
  mounted () {
    this.videoinputId = this.devices.useDevices.videoinput
    this.mirror = localStorage.getItem('isVideoMirror') ? JSON.parse(localStorage.getItem('isVideoMirror')) : false
    this.videoChanged()
  },
  methods: {
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
    closeVideo () {
      var stream = this.$refs.videoRef?.srcObject
      stream.getTracks().forEach(element => {
        element.stop()
      });
    },
    audioPlay () {
      this.$refs.audioRef.load()
      this.$refs.audioRef.play()
    },
    voiceChangeed () {
      TK.DeviceMgr.associateElementsToSpeaker(this.$refs.audioRef, this.deviceId, (res) => {
        console.log('sucess: ', res)
      })
    },
    volumeChanged () {
      this.$refs.audioRef.volume = this.volume / 100
    },
    confirm () {
      this.room.setLocalVideoMirror(this.mirror)
      localStorage.setItem('isVideoMirror', this.mirror)
      TK.DeviceMgr.setDevices({
        videoinput: this.videoinputId
      })
      this.$emit('done')
      this.$emit('close')
    }
  }
}
</script>