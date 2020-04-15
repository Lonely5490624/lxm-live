<style lang="stylus" scoped>
$courseWidth = 260px
$timeWidth = 440px
$teacherWidth = 145px
$integralWidth = 140px
$durationWidth = 165px
.history-box
  border-radius 30px
  width 1150px
  position relative
  .history-header
    height 80px
    line-height 80px
    display flex
    justify-content space-between
    text-align center
    border-radius 30px 30px 0 0
    overflow hidden
    .header-item
      height 100%
      font-size 24px
      color #ffffff
      font-weight bold
      &.header-course
        width $courseWidth
        background-image url('../../assets/images/icon_dot.png')
        background-position 8px 10px
        background-repeat no-repeat
        background-size 15px 17px
      &.header-time
        width $timeWidth
      &.header-teacher
        width $teacherWidth
      &.header-integral
        width $integralWidth
      &.header-duration
        width $durationWidth
      &:nth-of-type(odd)
        background-color $hisDeepYellow
      &:nth-of-type(even)
        background-color $hisYellow
  .history-list
    height 528px
    overflow auto
    border-radius 0 0 30px 30px
    background-color #fff
    .history-item
      height 132px
      display flex
      justify-content space-between
      .item-item
        height 132px
        line-height 132px
        font-size 20px
        color #666666
        text-align center
        &.item-course
          width $courseWidth
          font-weight bold
          font-size 24px
        &.item-time
          width $timeWidth
        &.item-teacher
          width $teacherWidth
        &.item-integral
          width $integralWidth
        &.item-duration
          width $durationWidth
      &:nth-of-type(even)
        background-color $hisSimpleYellow
    .no-room
      font-size 20px
      color $gray
      line-height 528px
      text-align center
  &::after
    content ""
    background-color #80E180
    position absolute
    width 100%
    height 60px
    border-radius 0 0 30px 30px
    bottom -10px
    z-index -1
</style>

<template lang="pug">
.history-box
  .history-header
    .header-item.header-course 课程名称
    .header-item.header-time 课程时间
    .header-item.header-teacher 上课老师
    .header-item.header-integral 获得星星
    .header-item.header-duration 上课时长
  .history-list
    template(v-if="list.length")
      .history-item(v-for="item in list" :key="item.serial")
        .item-item.item-course {{item.course_name}}
        .item-item.item-time
          | {{item.starttime | formatDatetimeNoSecond}}
          | —
          | {{item.endtime | formatDatetimeNoSecond}}
        .item-item.item-teacher {{item.teacher_name}}
        .item-item.item-integral {{item.integral_all}}
        .item-item.item-duration -
    p.no-room(v-else) 暂无历史课程
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>