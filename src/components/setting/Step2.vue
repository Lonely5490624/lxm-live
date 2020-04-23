<style lang="stylus">
.device-step
  section
    display flex
    .device-label
      width 110px
      font-size 18px
      color #333333
      flex-shrink 0
      line-height 50px
    .device-content
      width 100%
      .device-select
        width 100%
        .el-input
          width 100%
          .el-input__inner
            width 100%
            text-indent 1em
          &.is-focus
            .el-input__inner
              border-bottom-left-radius 0
              border-bottom-right-radius 0
    .audio-content
      p
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
    .step2-tips
      width 100%
      margin-top 40px
      p
        font-size 14px
        line-height 24px
        color #999999
  .device-ctrl
    position absolute
    bottom 40px
    right 50px
    .device-btn
      width 175px
      &.device-btn
        margin-left 28px
</style>

<template lang="pug">
.device-step
  section
    .device-label 耳机选项
    .device-content
      el-select.device-select(v-model="deviceId" @change="changeAduio")
        el-option(
          v-for="item in devices"
          :key="item.deviceId"
          :value="item.deviceId"
          :label="item.label"
        )
  section
    .audio-content
      p 点击下方播放按钮，你能听到音乐吗？
      .audio-play
        .play-btn(@click="audioPlay")
          img(src="../../assets/images/icon_play.png")
        img.play-icon(src="../../assets/svg/svg_sound_yellow.svg")
        .play-volume
          el-slider.volume-slider(v-model="volume" :show-tooltip="false" @input="volumeChanged")
          span.volume-value {{volume}}
        audio(ref="audioRef" src="https://doccdn.talk-cloud.net/static/h5_new_3.3.3.7/music/detectionDevice_default.wav" display="none")
  section
    .step2-tips
      p 温馨提示：如果您无法看到视频，请按以下方式排查问题
      p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
      p 2、确认摄像头已连接并开启；
      p 3、如果摄像头仍然没有画面，换一个插口重新插入摄像头；
      p 4、请选择正确摄像头选项，选择禁用会导致摄像头不可用；
      p 5、确认摄像头没有被其他程序占用；
      p 6、重启电脑。
  .device-ctrl
    LxmBtn.device-btn(type="cancel" @onClick="stepChecked(false)") 不可以听到
    LxmBtn.device-btn(@onClick="stepChecked(true)") 可以听到
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'

export default {
  components: {
    LxmBtn
  },
  props: {
    deviceMgr: {
      type: Object,
      required: true
    },
    devices: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      deviceId: '',
      volume: 100
    }
  },
  beforeMount () {
    this.deviceId = this.devices[0]?.deviceId
  },
  methods: {
    changeAduio () {
      this.deviceMgr.associateElementsToSpeaker(this.$refs.audioRef, this.deviceId, (res) => {
        console.log('sucess: ', res)
      })
    },
    audioPlay () {
      this.$refs.audioRef.load()
      this.$refs.audioRef.play()
    },
    volumeChanged () {
      this.$refs.audioRef.volume = this.volume / 100
    },
    // 检测完成按钮
    stepChecked (val) {
      localStorage.setItem('audiooutput', val)
      this.$emit('nextStep')
    }
  }
}
</script>