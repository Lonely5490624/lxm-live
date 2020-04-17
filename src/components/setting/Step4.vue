<style lang="stylus" scoped>
.device-step
  .result-item
    display flex
    justify-content space-between
    align-items center
    height 60px
    .item-ele
      width 33.33%
      text-align center
    &.result-item
      margin-top 10px
    &.result-header
      .item-ele
        font-size 18px
        color $inputPlace
    &.result-list
      background-color #FFF3CB
      border-radius 6px
      font-size 18px
      color $inputPlace
      &.result-error
        background-color #FFEDE7
        color $errorRed
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
  .result-item.result-header
    .item-ele 检测项目
    .item-ele 检测结果
    .item-ele 检测详情
  .result-item.result-list(v-if="videoinput")
    .item-ele 视频检测
    .item-ele 正常
    .item-ele 可以看到视频
  .result-item.result-list.result-error(v-else)
    .item-ele 视频检测
    .item-ele 异常
    .item-ele 没有检测到摄像头设备
  .result-item.result-list(v-if="audiooutput")
    .item-ele 扬声器检测
    .item-ele 正常
    .item-ele 可以听到声音
  .result-item.result-list.result-error(v-else)
    .item-ele 扬声器检测
    .item-ele 异常
    .item-ele 选择了“听不到声音”
  .result-item.result-list(v-if="audioinput")
    .item-ele 麦克风检测
    .item-ele 正常
    .item-ele 可以看到麦克风
  .result-item.result-list.result-error(v-else)
    .item-ele 麦克风检测
    .item-ele 异常
    .item-ele 选择了“不可以看到波动”
  .device-ctrl
    LxmBtn.device-btn(type="cancel" @onClick="$emit('reset')") 重新检测
    LxmBtn.device-btn 进入房间
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'

export default {
  components: {
    LxmBtn
  },
  data () {
    return {
      videoinput: false,
      audiooutput: false,
      audioinput: false
    }
  },
  beforeMount () {
    this.videoinput = localStorage.getItem('videoinput') === 'true'
    this.audiooutput = localStorage.getItem('audiooutput') === 'true'
    this.audioinput = localStorage.getItem('audioinput') === 'true'
  }
}
</script>