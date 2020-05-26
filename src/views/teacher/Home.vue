<style lang="stylus" scoped>
.teacher-body
  width 100%
  height 100%
  position relative
  background url('../../assets/images/mine_bg.png') center top no-repeat
  background-size cover
  .teacher-logo
    position absolute
    top 40px
    left 60px
    img
      width 191px
  .teacher-room
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 1150px
    .room-header
      font-size 34px
      color #ffffff
      font-weight bold
      height 68px
      line-height 68px
      border-radius 30px 30px 0 0
      text-align center
      background url('../../assets/images/icon_dot.png') 11px 17px no-repeat $hisYellow
      background-size 15px 17px
      position relative
      overflow hidden
      span
        position relative
        z-index 1
      &::after
        content ""
        width 866px
        height 130px
        border-radius 50%
        background-color #FFC742
        position absolute
        bottom 30px
        left 50%
        transform translateX(-50%)
    .room-list
      padding 0 80px
      height 570px
      overflow-y auto
      border-radius 0 0 30px 30px
      background-color #fff
      .room-item
        width 100%
        display flex
        justify-content space-between
        align-items center
        padding 40px 0
        border-bottom 2px solid #EAEAEA
        .item-border
          width 22px
          height 108px
          border-radius 11px
          background-color #B3D63B
          &.current
            background-color $stuBlue
        .item-info
          color #666666
          h4
            font-size 26px
            font-weight bold
          .time
            font-size 20px
            margin-top 27px
          .student
            font-size 20px
            margin-top 15px
            span + span
              margin-left 18px
        .item-btn
          .teacher-btn
            width 155px
      .no-room
        font-size 20px
        color $gray
        line-height 570px
        text-align center
      &::after
        content ""
        width 251px
        height 300px
        background url('../../assets/images/lxm_3.png') center no-repeat
        background-size 100%
        position absolute
        bottom -41px
        right -174px
  .teacher-ctrl
    position absolute
    bottom 40px
    left 155px
    display flex
    .ctrl-btn
      width 68px
      cursor pointer
      img
        width 100%
      p
        font-size 20px
        color #FFFFFF
        margin-top 10px
        text-align center
      & + .ctrl-btn
        margin-left 42px
</style>

<template lang="pug">
.teacher-body(
  v-loading="loading"
  element-loading-text="拼命加载中..."
  element-loading-spinner="lxm-loading-img"
  element-loading-background="rgba(0, 0, 0, .7)"
  element-loading-custom-class="lxm-loading"
)
  .teacher-logo
    img(src="../../assets/images/logo_white.png")
  .teacher-room
    .room-header
      span 我的课程
    .room-list
      template(v-if="roomList.length")
        .room-item(v-for="item in roomList" :key="item.serial")
          .item-border(:class="{current: item.starttime <= Math.round(Date.now()/1000)}")
          .item-info
            h4 {{item.course_name}}
            p.time
              | {{item.starttime | formatDatetimeNoSecond}}
              | —
              | {{item.endtime | formatDatetimeNoSecond}}
            p.student
              span(v-for="(stu, index) in item.stuList" :key="index") {{stu}}
          .item-btn
            LxmBtn.teacher-btn(v-if="item.starttime - (item.ready_time * 60) <= Math.round(Date.now()/1000)" @onClick="enterRoom(item)") 进入课程
            LxmBtn.teacher-btn(type="disable" v-else) 未开始
      p.no-room(v-else) 暂无课程
  .teacher-ctrl
    .ctrl-btn(@click="handleRefresh")
      img(src="../../assets/images/refresh.png")
      p 刷新
    .ctrl-btn
      router-link(to="/setting")
        img(src="../../assets/images/setting.png")
        p 设置
    .ctrl-btn(@click="handleLogout")
      img(src="../../assets/images/logout.png")
      p 退出
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'
import Loading from '@/components/common/Loading'

export default {
  components: {
    LxmBtn,
    Loading
  },
  data () {
    return {
      loading: false,
      roomList: []
    }
  },
  async beforeMount () {
    await this.handleRefresh()
  },
  methods: {
    // 获取教师课程列表
    async getRoomList () {
      const role = localStorage.getItem('role')
      let url
      if (role === '0') {
        url = 'user/getTeacherRoomList'
      } else if (role === '1') {
        url = 'user/getAssistantRoomList'
      } else {
        return
      }
      const res = await this.$axios.get(url)
      if (res.code === 200) {
        this.roomList = res.data
      }
    },
    // 进入教室
    enterRoom (item) {
      this.$router.push(`/classroom/${item.serial}`)
    },
    // 刷新页面
    async handleRefresh () {
      this.loading = true
      await Promise.all([
        this.getRoomList()
      ])
      this.loading = false
    },
    // 退出登录
    async handleLogout () {
      const res = await this.$axios.post('logout')
      if (res.code === 200) {
        localStorage.removeItem('token')
        this.$router.replace('/')
      }
    }
  }
}
</script>