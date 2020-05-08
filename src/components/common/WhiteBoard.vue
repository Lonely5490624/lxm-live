<style lang="stylus" scoped>
.white-board
  height 100%
  background-color #eee
  text-align center
  .wb-tool-list
    width 100%
    height 30px
  canvas
    background-color #fff
</style>

<template lang="pug">
  .white-board(ref="whiteBoardRef")
    canvas#lxmWhiteBoard(ref="canvasRef" :width="width" :height="height" @mousedown="canvasMouseDown" @mousemove="canvasMouseMove" @mouseup="canvasMouseUp" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd")
</template>

<script>
// import debounce from 'lodash.debounce'

export default {
  props: {
    room: Object
  },
  data () {
    return {
      width: 0,
      height: 0,
      initWidth: 0,
      initHeight: 0,
      ctx: null,
      isDraw: false,
      oldPoint: {
        x: 0,
        y: 0
      },
      allPath: [],
      curPath: [],
      ratio: 1,
      ctxStyle: {
        strokeStyle: '#f00',
        lineWidth: 6
      }
    }
  },
  mounted () {
    this.calculate()
    const canvas = this.$refs.canvasRef
    this.ctx = canvas.getContext('2d')
    this.$nextTick(() => {
      this.initWidth = canvas.clientWidth
      this.initHeight = canvas.clientHeight
    })
    window.onresize = () => {
      this.calculate()
      this.ratio = this.width / this.initWidth
      this.$nextTick(() => {
        this.repaitDraw(this.allPath)
      })
    }
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      if (e.message.name === 'CanvasDraw') {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.initWidth = e.message.data.initWidth
        this.initHeight = e.message.data.initHeight
        this.ratio = this.width / e.message.data.initWidth
        this.allPath = e.message.data.path
        this.repaitDraw(this.allPath)
      }
    })
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
    touchStart (e) {
      console.log('touchstart', e)
      this.isDraw = true
      const x = e.touches[0].clientX - this.$refs.canvasRef.offsetParent.offsetLeft
      const y = e.touches[0].clientY - this.$refs.canvasRef.offsetParent.offsetTop
      this.oldPoint.x = x
      this.oldPoint.y = y
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
    touchMove (e) {
      const x = e.touches[0].clientX - this.$refs.canvasRef.offsetParent.offsetLeft
      const y = e.touches[0].clientY - this.$refs.canvasRef.offsetParent.offsetTop
      if (this.isDraw) {
          //画笔功能
          this.draw(x,y)
      }
      this.oldPoint.x = x
      this.oldPoint.y = y
    },
    canvasMouseUp () {
      this.isDraw = false
      this.allPath.push({
        style: this.ctxStyle,
        path: this.curPath
      })
      this.curPath = []
      this.room.pubMsg({
        name: 'CanvasDraw',
        id: 'CanvasDraw',
        data: JSON.stringify({
          initWidth: this.initWidth,
          initHeight: this.initHeight,
          path: this.allPath
        })
      })
    },
    touchEnd () {
      this.isDraw = false
      this.allPath.push(this.curPath)
      this.curPath = []
      this.room.pubMsg({
        name: 'CanvasDraw',
        id: 'CanvasDraw',
        data: JSON.stringify({
          initWidth: this.initWidth,
          initHeight: this.initHeight,
          path: this.allPath
        })
      })
    },
    draw (x, y) {
      this.ctx.beginPath()
      //线的宽度
      this.ctx.lineWidth = this.ctxStyle.lineWidth
      this.ctx.strokeStyle = this.ctxStyle.strokeStyle
      
      //线的样式
      this.ctx.lineCap = 'round'
      this.ctx.moveTo(x, y)
      this.ctx.lineTo(this.oldPoint.x, this.oldPoint.y)
      this.ctx.stroke()
      this.ctx.closePath()
      this.curPath.push([x / this.ratio, y / this.ratio])
    },
    repaitDraw (path) {
      //线的宽度
      this.ctx.lineWidth = this.ctxStyle.lineWidth
      
      //线的样式
      this.ctx.lineCap = 'round'
      path.forEach(item => {
        let oldPoint = {
          x: path[0][0],
          y: path[0][1]
        }
        this.ctx.lineWidth = item.style.lineWidth
        this.ctx.strokeStyle = item.style.strokeStyle
        this.ctx.beginPath()
        item.path.forEach(ele => {
          this.ctx.moveTo(ele[0] * this.ratio, ele[1] * this.ratio)
          this.ctx.lineTo(oldPoint.x * this.ratio, oldPoint.y * this.ratio)
          this.ctx.stroke()
          oldPoint.x = ele[0]
          oldPoint.y = ele[1]
        })
        this.ctx.closePath()
      });
    }
  }
}
</script>