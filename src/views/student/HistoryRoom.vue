<style lang="stylus" scoped>
.history-body
  width 100%
  height 100%
  position relative
  background url('../../assets/images/history_bg.png')
  background-size cover
  .his-back
    position absolute
    top 50px
    left 106px
  .his-board
    position absolute
    top 0
    left 50%
    transform translateX(-50%)
  .his-list
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>

<template lang="pug">
.history-body
  Back.his-back
  Board.his-board 已上过的课
  RoomList.his-list(:list="roomList")
</template>

<script>
import Back from '@/components/common/Back'
import Board from '@/components/student/Board'
import RoomList from '@/components/student/HistoryRoomList'

export default {
  components: {
    Back,
    Board,
    RoomList
  },
  data () {
    return {
      roomList: []
    }
  },
  beforeMount () {
    this.getHistoryRoomList ()
  },
  methods: {
    async getHistoryRoomList () {
      const res = await this.$axios.get('stu/getMyRoomListHistory')
      if (res.code === 200) {
        this.roomList = res.data
      }
    }
  }
}
</script>