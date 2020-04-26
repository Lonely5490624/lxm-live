<style lang="stylus" scoped>
.classroom-header
  display flex
  justify-content space-between
  align-items center
  height 100px
  flex-shrink 0
  .header-left
    display flex
    font-size 18px
    color #ffffff
    .left-item + .left-item
      margin-left 50px
    .status
      span
        color $them
        font-weight bold
  .header-right
    display flex
    height 100%
    .right-ctrl
      display flex
      height 100%
      .ctrl-item
        cursor pointer
        text-align center
        width 78px
        height 100%
        padding-top 15px
        img
          width 48px
          height 48px
        .item-text
          font-size 14px
          color #ffffff
          margin-top 6px
        &.active
          background-color #1E9464
    .class-status
      display flex
      align-items center
      .class-btn
        width 160px
        margin-left 70px
</style>

<template lang="pug">
.classroom-header
  section.header-left
    .left-item.delay(v-if="classBegin") 网络延时：{{networkStatus && networkStatus.video.currentDelay || 0}}ms
    .left-item.packet(v-if="classBegin") 丢包率：{{networkStatus && networkStatus.video.packetsLostRate || 0}}%
    .left-item.status(v-if="classBegin") 网络状态：{{networkStatus && networkStatus.video.netquality | networkFilter}}
    .left-item.serial 房间号：{{$route.params.serial}}
    .left-item.duration(v-if="classBegin") 00：00：26
  section.header-right
    .right-ctrl
      .ctrl-item(:class="{active: openType === 'users'}" @click.stop="setOpenType('users')" rel="users")
        img.item-img(src="../../assets/images/room_user.png")
        .item-text 花名册
      .ctrl-item(:class="{active: openType === 'files'}" @click.stop="setOpenType('files')" rel="files")
        img.item-img(src="../../assets/images/room_course.png")
        .item-text 课件库
      .ctrl-item(v-if="" :class="{active: openType === 'tools'}" @click.stop="setOpenType('tools')" rel="tools")
        img.item-img(src="../../assets/images/room_tool.png")
        .item-text 工具箱
      .ctrl-item(v-if="classBegin" :class="{active: openType === 'ctrls'}" @click.stop="setOpenType('ctrls')" rel="ctrls")
        img.item-img(src="../../assets/images/room_ctrl.png")
        .item-text 全体控制
      .ctrl-item(:class="{active: openType === 'settings'}" @click.stop="setOpenType('settings')" rel="settings")
        img.item-img(src="../../assets/images/room_set.png")
        .item-text 设置
    .class-status
      LxmBtn.class-btn(v-if="!classBegin && role === 0" @onClick="beginClass") 上课
      LxmBtn.class-btn(v-if="classBegin && (role === 0 || role === 1)" @onClick="endClass") 下课
  StuList(v-if="openType === 'users'" :room="room" rel="users")
  Courseware(v-if="openType === 'files'" rel="files")
  Tools(v-if="openType === 'tools'" rel="tools" @showTools="data => $emit('showTools', data)")
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'
import StuList from '@/components/classroom/StuList'
import Courseware from '@/components/classroom/Courseware'
import Tools from '@/components/classroom/Tools'

export default {
  components: {
    LxmBtn,
    StuList,
    Courseware,
    Tools
  },
  props: {
    role: Number,
    room: Object,
    networkStatus: Object,
    classBegin: Boolean,
    files: Array
  },
  data () {
    return {
      openType: ''
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      const type = this.openType
      if (!document.querySelectorAll(`[rel="${type}"]`)[1]?.contains(e.target)) {
        this.openType = ''
      }
    })
  },
  methods: {
    setOpenType (type) {
      if (this.openType === type) {
        this.openType = ''
      } else {
        this.openType = type
      }
    },
    // 上课
    beginClass () {
      this.room.pubMsg({
        name: 'ClassBegin',
        id: 'ClassBegin',
        toID: TK.MSG_TO_ALLUSER,
        save: true
      })
    },
    // 下课
    endClass () {
      this.room.delMsg({
        name: 'ClassBegin',
        id: 'ClassBegin',
        toID: TK.MSG_TO_ALLUSER,
        save: true
      })
    }
  }
}
</script>