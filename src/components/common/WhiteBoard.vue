<style lang="stylus" scoped>
.white-board
  // height 100%
  background-color #eee
  .wb-tool-list
    width 100%
    height 30px
  canvas
    background-color #fff
</style>

<template lang="pug">
  .white-board(ref="whiteBoardRef")
    canvas#white-board(ref="canvasRef" :width="width" :height="height" @mousedown="canvasMouseDown" @mousemove="canvasMouseMove" @mouseup="canvasMouseUp")
</template>

<script>
export default {
  data () {
    return {
      width: 0,
      height: 0,
      ctx: null,
      isDraw: false,
      oldPoint: {
        x: 0,
        y: 0
      }
    }
  },
  mounted () {
    this.calculate()
    const canvas = this.$refs.canvasRef
    this.ctx = canvas.getContext('2d')
    window.onresize = () => {
      this.calculate()
    }
  },
  methods: {
    calculate () {
      const whiteBoard = this.$refs.whiteBoardRef
      const wWidth = whiteBoard.clientWidth
      const wHeight = whiteBoard.clientHeight
      if (wWidth * .8 > wHeight) {
        this.width = wHeight / .8
        this.height = wHeight
      } else {
        this.width = wWidth
        this.height = wWidth * .8
      }
    },
    canvasMouseDown (e) {
      this.isDraw = true
      const x = e.offsetX
      const y = e.offsetY
      this.oldPoint.x = x - 1
      this.oldPoint.y = y - 1
      if (this.isDraw) {
        this.draw(x, y)
      }
    },
    canvasMouseMove (e) {
      const x = e.offsetX
      const y = e.offsetY
      
      if (this.isDraw) {
          //画笔功能
          this.draw(x,y)
      }
      
      this.oldPoint.x = x
      this.oldPoint.y = y
    },
    canvasMouseUp () {
      this.isDraw = false
    },
    draw (x, y) {
      this.ctx.beginPath()
      //线的宽度
      this.ctx.lineWidth = 1
      
      //线的样式
      this.ctx.lineCap = 'round'
      this.ctx.moveTo(x, y)
      this.ctx.lineTo(this.oldPoint.x, this.oldPoint.y)
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }
}
</script>