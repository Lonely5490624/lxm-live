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
    align-items center
    .header-back
      margin-right 20px
      width .5rem
      height .6rem
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
      align-items center
      .raisehand
        width 106px
        height 35px
        line-height 35px
        font-size 16px
        color #249767
        text-align center
        background url('../../assets/images/raisehand_bg.png') center no-repeat
        background-size 100%
        position relative
        top -12px
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
    Back.header-back
    .left-item.delay(v-if="classBegin") 网络延时：{{networkStatus && networkStatus.video.currentDelay || 0}}ms
    .left-item.packet(v-if="classBegin") 丢包率：{{networkStatus && networkStatus.video.packetsLostRate || 0}}%
    .left-item.status(v-if="classBegin") 网络状态：
      span {{networkStatus && networkStatus.video.netquality | networkFilter}}
    .left-item.serial 房间号：{{$route.params.serial}}
    .left-item.duration(v-if="classBegin") {{classDuration | formatTime}}
  section.header-right
    .right-ctrl
      .raisehand(v-if="role === 0 && openType !== 'users' && $store.state.stu.stuList.some(item => item.raisehand)") 有人举手
      .ctrl-item(v-if="role === 0" :class="{active: openType === 'users'}" @click.stop="setOpenType('users')" rel="users")
        img.item-img(src="../../assets/images/room_user.png")
        .item-text 花名册
      .ctrl-item(v-if="role === 0 && classBegin" :class="{active: openType === 'files'}" @click.stop="setOpenType('files')" rel="files")
        img.item-img(src="../../assets/images/room_course.png")
        .item-text 课件库
      .ctrl-item(v-if="role === 0 && classBegin" :class="{active: openType === 'tools'}" @click.stop="setOpenType('tools')" rel="tools")
        img.item-img(src="../../assets/images/room_tool.png")
        .item-text 工具箱
      .ctrl-item(v-if="role === 0 && classBegin" :class="{active: openType === 'ctrls'}" @click.stop="setOpenType('ctrls')" rel="ctrls")
        img.item-img(src="../../assets/images/room_ctrl.png")
        .item-text 全体控制
      .ctrl-item(:class="{active: openType === 'settings'}" @click.stop="setOpenType('settings')" rel="settings")
        img.item-img(src="../../assets/images/room_set.png")
        .item-text 设置
    .class-status
      LxmBtn.class-btn(v-if="!classBegin && role === 0" @onClick="beginClass") 上课
      LxmBtn.class-btn(v-if="classBegin && (role === 0 || role === 1)" @onClick="endClass") 下课
      LxmBtn.class-btn(v-if="classBegin && role === 2 && !mySelf.raisehand" @onClick="raiseHand(true)") 举手
      LxmBtn.class-btn(v-if="classBegin && role === 2 && mySelf.raisehand" @onClick="raiseHand(false)") 取消
  StuList(v-if="openType === 'users'" :room="room" rel="users" :classBegin="classBegin")
  Courseware(v-if="openType === 'files'" :room="room" :currentFile="currentFile" rel="files")
  Tools(v-if="openType === 'tools'" rel="tools" @showTools="data => {$emit('showTools', data);openType = false}")
  Control(v-if="openType === 'ctrls'" rel="ctrls" :students="students" :room="room" @rewardUserAll="$emit('rewardUserAll')")
  Setting(v-if="openType === 'settings'" rel="settings" @close="openType = ''" :devices="devices" :room="room" @done="$emit('settinDone')")
</template>

<script>
import Back from '@/components/common/Back'
import LxmBtn from '@/components/common/LxmBtn'
import StuList from '@/components/classroom/StuList'
import Courseware from '@/components/classroom/Courseware'
import Tools from '@/components/classroom/Tools'
import Control from '@/components/classroom/Control'
import Setting from '@/components/classroom/Setting'

export default {
  components: {
    Back,
    LxmBtn,
    StuList,
    Courseware,
    Tools,
    Control,
    Setting
  },
  props: {
    role: Number,
    room: Object,
    networkStatus: Object,
    classBegin: Boolean,
    files: Array,
    students: Array,
    devices: Object,
    currentFile: Object,
    classDuration: Number,
    teacher: Object
  },
  data () {
    return {
      openType: '',
      mySelf: {}
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      const type = this.openType
      if (type === 'settings') return
      if (!document.querySelectorAll(`[rel="${type}"]`)[1]?.contains(e.target)) {
        this.openType = ''
      }
    })
    this.room.addEventListener(TK.EVENT_TYPE.roomConnected, () => {
      this.mySelf = this.room.getMySelf()
    })
    this.room.addEventListener(TK.EVENT_TYPE.roomUserPropertyChanged, e => {
      // 如果修改信息为举手且修改人为本人
      if (e.message?.hasOwnProperty('raisehand') && e.userId === this.mySelf?.id) {
        this.$set(this.mySelf, 'raisehand', e.message.raisehand)
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
    },
    // 举手
    raiseHand (bool) {
      this.room.changeUserProperty(this.room.getMySelf().id, this.teacher.id, {
        raisehand: bool
      })
      this.$set(this.mySelf, 'raisehand', bool)
    }
  }
}
</script>