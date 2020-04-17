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
        font-size 14px
        color $errorRed
        margin-top 20px
      .device-video
        margin-top 20px
        width 200px
        height 150px
        position relative
        #checkVideo
          width 100%
          height 100%
          background-color transparent
        .no-video
          width 100%
          height 100%
          position absolute
          top 0
          left 0
          background-color #A0A0A0
          border-radius 10px
          display flex
          align-items center
          justify-content center
          img
            width 50px
      .device-mirror
        line-height 50px
    .device-tips
      width 100%
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
    .device-label 摄像头选项
    .device-content
      el-select.device-select(v-model="deviceId" @change="videoChanged")
        el-option(
          v-for="item in devices"
          :key="item.deviceId"
          :value="item.deviceId"
          :label="item.label"
        )
      p.device-warn 注意：选择禁用会导致摄像头不可用
      .device-video
        //- .no-video
        //-   img(src="../../assets/svg/svg_video_no.svg")
        video#checkVideo(ref="videoRef")
  section
    .device-label 镜像模式
    .device-content
      .device-mirror
        el-checkbox(v-model="mirror" @change="mirrorChange")
  section
    .device-tips
      p 温馨提示：如果您无法看到视频，请按以下方式排查问题
      p 1、若杀毒软件（如：360卫士，百度卫士）弹出提示信息，请选择允许；
      p 2、确认摄像头已连接并开启；
      p 3、如果摄像头仍然没有画面，换一个插口重新插入摄像头；
      p 4、请选择正确摄像头选项，选择禁用会导致摄像头不可用；
      p 5、确认摄像头没有被其他程序占用；
      p 6、重启电脑。
  .device-ctrl
    LxmBtn.device-btn(type="cancel" @onClick="stepChecked(false)") 不可以看到
    LxmBtn.device-btn(@onClick="stepChecked(true)") 可以看到
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
      mirror: false
    }
  },
  beforeMount () {
    this.deviceId = this.devices[0]?.deviceId
    this.videoChanged()
  },
  beforeDestroy () {
    this.closeVideo()
  },
  methods: {
    videoChanged () {
      if (this.$refs.videoRef?.srcObject) {
        this.closeVideo()
      }
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: this.deviceId }
        }
      }).then(stream => {
        const video = this.$refs.videoRef
        video.autoplay = true;
        video.src = window.URL.createObjectURL(stream);
      });
    },
    mirrorChange () {
      if (this.deviceId) {
        this.deviceMgr.startVideoTest(this.deviceId, 'checkVideo', {
          mirror: this.mirror
        })
      }
    },
    // 检测完成按钮
    stepChecked (val) {
      localStorage.setItem('videoinput', val)
      this.$emit('nextStep')
    },
    closeVideo () {
      var stream = this.$refs.videoRef?.srcObject
      stream.getTracks().forEach(element => {
        element.stop()
      });
    }
  }
}
</script>