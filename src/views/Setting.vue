<style lang="stylus" scoped>
.setting-body
  height 100%
  width 100%
  background url('../assets/images/setting_bg.png') center no-repeat
  backgroud-size cover
  position relative
  .setting-back
    position absolute
    left 106px
    top 50px
  .setting-content
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .setting-steps
      display flex
      justify-content space-between
      position relative
      width 640px
      margin 0 auto
      &::after
        content ""
        display block
        height 10px
        position absolute
        left 80px
        right 80px
        top 20px
        background-color $them
        z-index -1
      .step-item
        width 160px
        display flex
        flex-direction column
        align-items center
        .step-icon
          width 50px
          height 50px
          line-height 50px
          border-radius 50%
          background-color $them
          text-align center
          img
            width 23px
            opacity .4
        .step-name
          font-size 18px
          color #FFFFFF
          opacity .4
          margin-top 20px
        &.current
          .step-icon
            img
              opacity 1
          .step-name
            opacity 1
            font-weight bold
    .setting-main
      width 1000px
      height 600px
      border 10px solid $them
      border-radius 30px
      margin-top 40px
      padding 40px 50px
      background-color #fff
</style>

<template lang="pug">
.setting-body
  Back.setting-back
  .setting-content
    .setting-steps
      .step-item(:class="{ current: step >= 1}")
        .step-icon
          img(src="../assets/svg/svg_video.svg")
        .step-name 视频检测
      .step-item(:class="{ current: step >= 2}")
        .step-icon
          img(src="../assets/svg/svg_sound.svg")
        .step-name 扬声器检测
      .step-item(:class="{ current: step >= 3}")
        .step-icon
          img(src="../assets/svg/svg_voice.svg")
        .step-name 麦克风检测
      .step-item(:class="{ current: step >= 4}")
        .step-icon
          img(src="../assets/svg/svg_result.svg")
        .step-name 检测结果
    .setting-main
      Step1(v-if="step === 1 && devices.videoinput.length" :devices="devices.videoinput" :deviceMgr="deviceMgr" @nextStep="nextStep")
      Step2(v-if="step === 2" :devices="devices.audiooutput" :deviceMgr="deviceMgr" @nextStep="nextStep")
      Step3(v-if="step === 3" :devices="devices.audioinput" :deviceMgr="deviceMgr" @nextStep="nextStep")
      Step4(v-if="step === 4" @reset="resetCheck")
</template>

<script>
import Back from '@/components/common/Back'
import Step1 from '@/components/setting/Step1'
import Step2 from '@/components/setting/Step2'
import Step3 from '@/components/setting/Step3'
import Step4 from '@/components/setting/Step4'

export default {
  components: {
    Back,
    Step1,
    Step2,
    Step3,
    Step4
  },
  created () {
    // debugger
  },
  beforeMount () {
    this.deviceMgr = TK.DeviceMgr
    this.getDevices()
    // debugger
  },
  mounted () {
    this.deviceMgr.addDeviceChangeListener(() => {
      this.getDevices()
    })
    // debugger
  },
  data () {
    return {
      deviceMgr: {},
      step: 1,
      devices: {
        audioinput: [],
        audiooutput: [],
        videoinput: []
      }
    }
  },
  methods: {
    // 获取所有设备列表
    getDevices () {
      this.deviceMgr.getDevices(res => {
        console.log(res.devices)
        this.devices = res.devices
      })
    },
    nextStep () {
      this.step ++
    },
    resetCheck () {
      this.step = 1
    }
  }
}
</script>