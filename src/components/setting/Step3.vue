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
      .device-warn
        color $errorRed
    .audio-content
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
    .step3-tips
      width 100%
      margin-top 64px
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
    .device-label 麦克风选项
    .device-content
      el-select.device-select(v-model="deviceId" @change="changeAduio")
        el-option(
          v-for="item in devices"
          :key="item.deviceId"
          :value="item.deviceId"
          :label="item.label"
        )
      p.device-warn 请选择正确胡麦克风选项，选择禁用会导致麦克风不可用
  section
    .audio-content
      p.audio-tips 对着麦克风从1数到10，您能听到自己的声音并且看到黄条滚动吗？
      .audio-volume-list
        .audio-volume-item(v-for="item in volumeItems" :key="item" :class="{active: item <= audioVolume}")
      #audioTestDom
  section
    .step3-tips
      p 温馨提示：如果您无法看到视频，请按以下方式排查问题
      p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
      p 2、确认摄像头已连接并开启；
      p 3、如果摄像头仍然没有画面，换一个插口重新插入摄像头；
      p 4、请选择正确摄像头选项，选择禁用会导致摄像头不可用；
      p 5、确认摄像头没有被其他程序占用；
      p 6、重启电脑。
  .device-ctrl
    LxmBtn.device-btn(type="cancel" @onClick="stepChecked(false)") 不可以看到波动
    LxmBtn.device-btn(@onClick="stepChecked(true)") 可以看到波动
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'

const volumeItems = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

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
      volumeItems,
      audioVolume: 0
    }
  },
  beforeMount () {
    this.deviceId = this.devices[0]?.deviceId
  },
  mounted () {
    this.startMicrophoneTest()
  },
  beforeDestroy () {
    this.deviceMgr.stopMicrophoneTest()
  },
  methods: {
    changeAduio () {
      this.startMicrophoneTest()
    },
    audioPlay () {
      this.$refs.audioRef.load()
      this.$refs.audioRef.play()
    },
    startMicrophoneTest () {
      this.deviceMgr.startMicrophoneTest(this.deviceId, 'audioTestDom', res => {
        this.audioVolume = Math.round(res/10)
      }, err => {
        console.log(2222, err)
      })
    },
    // 检测完成按钮
    stepChecked (val) {
      localStorage.setItem('audioinput', val)
      this.$emit('nextStep')
    }
  }
}
</script>