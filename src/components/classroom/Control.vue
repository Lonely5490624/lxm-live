<style lang="stylus" scoped>
.control-box
  position fixed
  top 100px
  right 280px
  width 180px
  background-color #1E9464
  border 2px solid $roomDeepGreen
  padding 15px 25px
  z-index 99
  color #fff
  border-radius 20px
  .control-item
    display flex
    justify-content space-between
    align-items center
    cursor pointer
    .control-icon
      width 40px
      height 40px
      display flex
      justify-content center
      align-items center
      border 1px solid #ffffff
      border-radius 50%
      font-size 20px
    .control-text
      font-size 16px
    & + .control-item
      margin-top 20px
    &.disabled
      opacity .5
      cursor auto
</style>

<template lang="pug">
.control-box
  .control-item(v-if="canDisable" @click="handleMuteAll")
    .control-icon
      i.icon-user_close_maikefeng
    .control-text 全体禁言
  .control-item.disabled(v-else)
    .control-icon
      i.icon-user_close_maikefeng
    .control-text 全体禁言
  .control-item(v-if="canOpen" @click="handleCancelMuteAll")
    .control-icon
      i.icon-user_maikefeng
    .control-text 全体发言
  .control-item.disabled(v-else)
    .control-icon
      i.icon-user_maikefeng
    .control-text 全体发言
  .control-item
    .control-icon
      i.icon-btn_fuwei
    .control-text 全体奖励
  .control-item
    .control-icon
      i.icon-btn_fuwei
    .control-text 全体复位
</template>

<script>
export default {
  props: {
    room: Object,
    students: Array
  },
  computed: {
    canDisable () {
      return this.students.some(item => !item.disablechat)
    },
    canOpen () {
      return this.students.some(item => item.disablechat)
    }
  },
  methods: {
    // 全体禁言
    handleMuteAll () {
      const ids = this.students.map(item => item.id)
      this.room.batchChangeUserProperty(ids, TK.MSG_TO_ALLUSER, {
        disablechat: true
      })
    },
    // 全体发言
    handleCancelMuteAll () {
      const ids = this.students.map(item => item.id)
      this.room.batchChangeUserProperty(ids, TK.MSG_TO_ALLUSER, {
        disablechat: false
      })
    }
  }
}
</script>