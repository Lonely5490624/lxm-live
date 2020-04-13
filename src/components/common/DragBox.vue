<style lang="stylus">
@import '../../styles/variable.styl'

.drag-box
  width 200px
  height 200px
  position absolute
  left 0
  top 0
  border-radius 50%
  background-color $them
</style>

<template lang="pug">
  .drag-box(
    ref="dragBoxRef"
    @touchstart="handleMouseDown"
    @mousedown="handleMouseDown"
    :style="{cursor: isDragged ? 'move' : 'default',left: `${x}px`,top: `${y}px`}"
  )
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isDragged: false,
      boxPosX: 0,
      boxPosY: 0,
      initX: 0,
      initY: 0
    }
  },
  mounted () {
    document.addEventListener('touchmove', this.handleMove)
    document.addEventListener('mousemove', this.handleMove)
    // 监听鼠标弹起事件
    document.addEventListener('touchend', () => {
      this.isDragged = false
    })
    document.addEventListener('mouseup', () => {
      this.isDragged = false
    })
  },
  methods: {
    handleMove (e) {
      if (this.isDragged) {
        const self = this.$refs.dragBoxRef
        const parent = self.parentElement
        const pWidth = parent.clientWidth
        const pHeight = parent.clientHeight
        const selfWidth = self.offsetWidth
        const seflHeight = self.offsetHeight
        let clientX, clientY
        if (e.touches) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        } else {
          clientX = e.clientX
          clientY = e.clientY
        }
        // 这里修改box位置信息时，需要减去父元素的offset以及window的滚动距离，避免产生bug
        this.boxPosX = clientX - this.initX - parent.offsetLeft + window.scrollX // 我们页面不允许滚动，所以这里scrollX/Y为0
        this.boxPosY = clientY - this.initY - parent.offsetTop + window.scrollY
        if (this.boxPosX < 0) this.boxPosX = 0
        if (this.boxPosY < 0) this.boxPosY = 0
        if (this.boxPosX > pWidth - selfWidth) this.boxPosX = pWidth - selfWidth
        if (this.boxPosY > pHeight - seflHeight) this.boxPosY = pHeight - seflHeight
        self.style.left = `${this.boxPosX}px`
        self.style.top = `${this.boxPosY}px`
      }
    },
    // 监听鼠标按下事件
    handleMouseDown (e) {
      this.isDragged = true
      if (e.touches) {
        const self = this.$refs.dragBoxRef
        const parent = self.parentElement
        this.initX = e.touches[0].clientX - self.offsetLeft - parent.offsetLeft
        this.initY = e.touches[0].clientY - self.offsetTop - parent.offsetTop
      } else {
        this.initX = e.offsetX
        this.initY = e.offsetY
      }
    }
  }
}
</script>