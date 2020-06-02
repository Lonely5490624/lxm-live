<style lang="stylus" scoped>
.tool-box
  position fixed
  top 100px
  right 180px
  width 385px
  height 232px
  padding 15px 30px 0 30px
  z-index 99
  border 2px solid $roomDeepGreen
  background-color #1E9464
  border-radius 20px
  display flex
  flex-wrap wrap
  justify-content space-between
  .tool-item
    width 140px
    height 42px
    background-color $roomDeepGreen
    border-radius 21px
    padding 0 2px
    display flex
    align-items center
    cursor pointer
    .item-icon
      width 38px
      height 38px
      border-radius 50%
      background-color $them
      font-size 38px
      color #ffffff
      display flex
      justify-content center
      align-items center
    .item-text
      font-size 16px
      color #0D7A4D
      margin-left 10px
</style>

<template lang="pug">
.tool-box
  .tool-item(@click="$emit('showTools', 'datiqi')")
    .item-icon
      i.icon-hold_datiqi
    .item-text 答题器
  .tool-item(@click="$emit('showTools', 'zhuanpan')")
    .item-icon
      i.icon-hold_zhuanpan
    .item-text 转盘
  .tool-item(@click="$emit('showTools', 'jishiqi')")
    .item-icon
      i.icon-hold_jishiqi
    .item-text 计时器
  .tool-item(@click="$emit('showTools', 'qiangdaqi')")
    .item-icon
      i.icon-hold_qingdaqi
    .item-text 抢答器
  .tool-item(@click="startShareScreen")
    .item-icon
      i.icon-hold_table_share
    .item-text 屏幕共享
  .tool-item(@click="$emit('showTools', 'xiaobaiban')")
    .item-icon
      i.icon-hold_xiaobaiban
    .item-text 小白板
</template>

<script>
export default {
  props: {
    room: Object
  },
  methods: {
    // startShareScreen
    // stopShareScreen
    // playRemoteScreen
    // unplayRemoteScreen
    // 开始屏幕共享
    startShareScreen() {
      this.room.stopShareScreen()
      this.room.startShareScreen()
    }
  }
}
</script>