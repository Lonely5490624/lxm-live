<style lang="stylus" scoped>
.lxm-video-player
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  background-color #fff
  z-index 9
  video
    width 100%
    height 100%
    outline none
  .video-cover
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-color transparent
  .video-close
    position absolute
    top 0
    right 0
    z-index 10
</style>

<template lang="pug">
.lxm-video-player
  video(
    controls
    name="media"
    ref="videoRef"
  )
    source(type="video/webm" :src="src")
  .video-cover(v-if="role !== 0 && role !== 1")
  Close.video-close(v-if="(role === 0 || role === 1)" @onClose="closeVideo")
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
    const video = this.$refs.videoRef
    // 监听老师端对视频的操控事件 
    if (this.role === 0 || this.role === 1) {
      video.addEventListener('play', () => {
        this.room.pubMsg({
          name: 'PlayVideo',
          id: 'PlayVideo',
          toID: TK.MSG_TO_ALLEXCEPTSENDER
        })
      })
      video.addEventListener('pause', () => {
        this.room.pubMsg({
          name: 'PauseVideo',
          id: 'PauseVideo',
          toID: TK.MSG_TO_ALLEXCEPTSENDER
        })
      })
      video.addEventListener('ended', () => {
        this.room.pubMsg({
          name: 'EndVideo',
          id: 'EndVideo',
          toID: TK.MSG_TO_ALLEXCEPTSENDER
        })
      })
      video.addEventListener('seeked', e => {
        const data = {
          currentTime: e.target.currentTime
        }
        this.room.pubMsg({
          name: 'SeekVideo',
          id: 'SeekVideo',
          toID: TK.MSG_TO_ALLEXCEPTSENDER,
          data: JSON.stringify(data)
        })
      })
    }
    // 其他端监听视频被操控事件
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      switch (e.message.name) {
        case 'PlayVideo':
          video.play()
          break
        case 'PauseVideo':
          video.pause()
          break
        case 'EndVideo':
          video.end()
          break
        case 'SeekVideo':
          video.currentTime = e.message.data?.currentTime
          break
        case 'CloseVideo':
          this.room.delMsg({
            name: 'ShareVideo',
            id: 'ShareVideo'
          })
          this.$emit('close')
          break
        default:
          break
      }
    })
  },
  methods: {
    closeVideo () {
      this.room.pubMsg({
        name: 'CloseVideo',
        id: 'CloseVideo'
      })
    }
  }
}
</script>