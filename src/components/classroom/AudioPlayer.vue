<style lang="stylus" scoped>
.lxm-audio-player
  position absolute
  left 23px
  right 23px
  bottom 0
  z-index 9
  audio
    width 100%
    outline none
  .audio-cover
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-color transparent
  .audio-close
    position absolute
    top -23px
    right -23px
</style>

<template lang="pug">
.lxm-audio-player
  audio(
    controls
    :src="src"
    ref="audioRef"
  )
  .audio-cover(v-if="role !== 0")
  Close.audio-close(v-if="role === 0" @onClose="closeAudio")
</template>

<script>
import Close from '@/components/common/Close'

export default {
  props: {
    room: Object,
    role: Number,
    src: String
  },
  components: {
    Close
  },
  mounted () {
    const audio = this.$refs.audioRef
    // 监听老师端对视频的操控事件 
    if (this.role === 0) {
      audio.addEventListener('play', () => {
        this.room.pubMsg({
          name: 'PlayAudio',
          id: 'PlayAudio',
          toID: TK.MSG_TO_ALLEXCEPTSENDER
        })
      })
      audio.addEventListener('pause', () => {
        this.room.pubMsg({
          name: 'PauseAudio',
          id: 'PauseAudio',
          toID: TK.MSG_TO_ALLEXCEPTSENDER
        })
      })
      audio.addEventListener('ended', () => {
        this.room.pubMsg({
          name: 'EndAudio',
          id: 'EndAudio',
          toID: TK.MSG_TO_ALLEXCEPTSENDER
        })
      })
      audio.addEventListener('seeked', e => {
        const data = {
          currentTime: e.target.currentTime
        }
        this.room.pubMsg({
          name: 'SeekAudio',
          id: 'SeekAudio',
          toID: TK.MSG_TO_ALLEXCEPTSENDER,
          data: JSON.stringify(data)
        })
      })
    }
    // 其他端监听视频被操控事件
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      switch (e.message.name) {
        case 'PlayAudio':
          audio.play()
          break
        case 'PauseAudio':
          audio.pause()
          break
        case 'EndAudio':
          audio.end()
          break
        case 'SeekAudio':
          audio.currentTime = e.message.data?.currentTime
          break
        case 'CloseAudio':
          this.room.delMsg({
            name: 'ShareAudio',
            id: 'ShareAudio'
          })
          this.$emit('close')
          break
        default:
          break
      }
    })
  },
  methods: {
    closeAudio () {
      this.room.pubMsg({
        name: 'CloseAudio',
        id: 'CloseAudio'
      })
    }
  }
}
</script>