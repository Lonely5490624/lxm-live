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
  .overflow
    position absolute
    left 0
    top 0
    right 0
    bottom 0
</style>

<template lang="pug">
  .white-board(ref="whiteBoardRef")
    .board-tools(style="display: inline-block;")
      span(@click="tool = 'pencil'") 画笔
      span(@click="tool = 'line'") 直线
      span(@click="tool = 'rect'") 矩形
      span(@click="undo") 撤销
      span(@click="redo") 重做
    canvas#lxmWhiteBoard(ref="canvasRef" :width="width" :height="height" @mousedown="canvasMouseDown" @mousemove="canvasMouseMove" @mouseup="canvasMouseUp" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd")
    .overflow(v-if="this.role === 2")
</template>

<script>
// import debounce from 'lodash.debounce'

export default {
  props: {
    room: Object,
    role: Number
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
      /**
       * 保存所有绘制的图形
       * type: 图形类型，包含pencil, rect, line, arrow
       * style: 图形样式，见this.ctxStyle
       * pah: 图形路径，Array
       */
      allPath: [], // 保存所有绘制的图形
      curPath: [],
      ratio: 1,
      ctxStyle: {
        strokeStyle: '#f00',
        lineWidth: 6
      },
      tool: 'line',
      currentRect: null,
      // 撤销的图形，需要保存，以便回退
      undoArray: []
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
      // if (this.isDraw) {
      //   this.draw(x, y)
      // }
      switch (this.tool) {
        case 'rect':
          this.allPath.push({
            type: 'rect',
            style: this.ctxStyle,
            path: []
          })
          break;
        case 'line':
          this.allPath.push({
            type: 'line',
            style: this.ctxStyle,
            path: []
          })
          break;
        default:
          break;
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
      switch (this.tool) {
        case 'rect':
          this.allPath.push({
            type: 'rect',
            style: this.strokeStyle,
            path: []
          })
          break;
      
        default:
          break;
      }
    },
    canvasMouseMove (e) {
      const x = e.offsetX
      const y = e.offsetY
      
      if (this.isDraw) {
          //画笔功能
          switch (this.tool) {
            case 'pencil':
              this.drawPencil(x,y)
              break;
            case 'rect':
              this.drawRect(x, y)
              // this.repaitDraw(this.allPath)
              break;
            case 'line':
              this.drawLine(x, y)
              break
            default:
              break;
          }
      }
    },
    touchMove (e) {
      const x = e.touches[0].clientX - this.$refs.canvasRef.offsetParent.offsetLeft
      const y = e.touches[0].clientY - this.$refs.canvasRef.offsetParent.offsetTop
      if (this.isDraw) {
          //画笔功能
          this.drawPencil(x,y)
      }
      this.oldPoint.x = x
      this.oldPoint.y = y
    },
    canvasMouseUp () {
      this.isDraw = false
      switch (this.tool) {
        case 'pencil':
          this.allPath.push({
            type: 'pencil',
            style: this.ctxStyle,
            path: this.curPath
          })
          this.curPath = []
          break;
        // case 'line':
        //   this.allPath.push({
        //     type: 'line',
        //     style: this.ctxStyle,
        //     path: this.curPath
        //   })
        //   this.curPath = []
        //   break;
        default:
          break;
      }
      // this.allPath.push({
      //   style: this.ctxStyle,
      //   path: this.curPath
      // })
      // this.room.pubMsg({
      //   name: 'CanvasDraw',
      //   id: 'CanvasDraw',
      //   data: JSON.stringify({
      //     initWidth: this.initWidth,
      //     initHeight: this.initHeight,
      //     path: this.allPath
      //   })
      // })
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
    // 画线
    drawPencil (x, y) {
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
      this.oldPoint.x = x
      this.oldPoint.y = y
    },
    // 画直线
    drawLine (x, y) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.oldPoint.x, this.oldPoint.y)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.closePath()
      this.allPath[this.allPath.length - 1]['path'] = [this.oldPoint.x, this.oldPoint.y, x, y]
      this.repaitDraw(this.allPath)
    },
    // 画矩形
    drawRect (x, y) {
      this.ctx.beginPath()
      this.ctx.strokeRect(this.oldPoint.x, this.oldPoint.y, x - this.oldPoint.x, y - this.oldPoint.y)
      this.ctx.closePath()
      this.allPath[this.allPath.length - 1]['path'] = [this.oldPoint.x, this.oldPoint.y, x - this.oldPoint.x, y - this.oldPoint.y]
      this.repaitDraw(this.allPath)
    },
    repaitDraw (path) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      //线的样式
      this.ctx.lineCap = 'round'
      path.forEach(item => {
        this.ctx.lineWidth = item.style.lineWidth
        this.ctx.strokeStyle = item.style.strokeStyle
        switch (item.type) {
          case 'pencil':
            // eslint-disable-next-line no-case-declarations
            let oldPoint = {
              x: path[0][0],
              y: path[0][1]
            }
            this.ctx.beginPath()
            item.path.forEach(ele => {
              this.ctx.moveTo(ele[0] * this.ratio, ele[1] * this.ratio)
              this.ctx.lineTo(oldPoint.x * this.ratio, oldPoint.y * this.ratio)
              this.ctx.stroke()
              oldPoint.x = ele[0]
              oldPoint.y = ele[1]
            })
            this.ctx.closePath()
            break
          case 'rect':
            if (item.path.length) {
              this.ctx.beginPath()
              this.ctx.strokeRect(item.path[0], item.path[1], item.path[2], item.path[3])
              this.ctx.closePath()
            }
            break
          case 'line':
            if (item.path.length) {
              this.ctx.beginPath()
              this.ctx.moveTo(item.path[0], item.path[1])
              this.ctx.lineTo(item.path[2], item.path[3])
              this.ctx.stroke()
              this.ctx.closePath()
            }
            break;
          default:
            break;
        }
      });
    },
    // 撤销上一次绘制
    undo () {
      console.log('撤销')
      if (this.allPath.length) {
        this.undoArray.push(this.allPath[this.allPath.length - 1])
        this.allPath.splice(this.allPath.length - 1)
        this.repaitDraw(this.allPath)
      }
    },
    // 回退上一次撤销
    redo () {
      console.log('回退')
      if (this.undoArray.length) {
        this.allPath.push(this.undoArray[this.undoArray.length - 1])
        this.undoArray.splice(this.undoArray.length - 1)
        this.repaitDraw(this.allPath)
      }
    },
    // 清屏
    clear () {
      if (this.allPath.length) {
        this.undoArray.push(...this.allPath)
        this.allPath = []
        this.repaitDraw(this.allPath)
      }
    }
  }
}
</script>