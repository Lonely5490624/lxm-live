<style lang="stylus" scoped>
.white-board
  height 100%
  background-color #eee
  text-align center
  .board-tools
    display flex
    flex-direction column
    align-items center
    position absolute
    right 10px
    top 50%
    transform translateY(-50%)
    background-color rgba(0,0,0,.7)
    color #ffffff
    .tool-item
      text-align center
      width 40px
      height 40px
      line-height 40px
      cursor pointer
      &.active
        background-color $them
      &.disabled
        color #999
      &.tool-setting
        position relative
        .setting-main
          position absolute
          bottom 0
          right 40px
          width 216px
          background-color rgba(0,0,0,.5)
          cursor auto
          .setting-color
            display flex
            flex-wrap wrap
            justify-content space-between
            padding 12px
            margin-top -12px
            .color-item
              width 22px
              height 22px
              border 1px solid #ffffff
              border-radius 3px
              cursor pointer
              margin-right 12px
              margin-top 12px
              position relative
              &:nth-of-type(6n)
                margin-right 0
              &.active:after
                content: ""
                position absolute
                border 3px solid #ffffff
                box-sizing border-box
                width 26px
                height 26px
                top -3px
                left -3px
                border-radius 3px
          .setting-size
            padding 0 12px
  canvas
    background-color #fff
  .overflow
    position absolute
    left 0
    top 0
    right 0
    bottom 0
  &.withFile
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-color transparent
    canvas
      background-color transparent
</style>
<style lang="stylus">
.iframe-class
  background-color transparent
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  pointer-events none
.white-board
  .el-slider__runway
    margin-top 6px
    margin-bottom 12px
</style>

<template lang="pug">
  .white-board(ref="whiteBoardRef" :class="{withFile: withFile}")
    .board-tools(v-if="this.role === 0")
      .tool-item(@click="tool = 'mouse'" :class="{active: tool === 'mouse'}")
        i.icon-mouse
      .tool-item(@click="tool = 'pencil'" :class="{active: tool === 'pencil'}")
        i.icon-pen
      .tool-item(@click="tool = 'line'" :class="{active: tool === 'line'}")
        i.icon-line
      .tool-item(@click="tool = 'rect'" :class="{active: tool === 'rect'}")
        i.icon-kongxinjuxing
      .tool-item(@click="tool = 'eraser'" :class="{active: tool === 'eraser'}")
        i.icon-xiangpi
      .tool-item(v-if="allPath.length || isClear" @click="undo")
        i.icon-back
      .tool-item.disabled(v-else)
        i.icon-back
      .tool-item(v-if="undoArray.length" @click="redo")
        i.icon-before
      .tool-item.disabled(v-else)
        i.icon-before
      .tool-item.tool-setting 设置
        .setting-main
          .setting-color
            .color-item(
              v-for="item in colorArray"
              :key="item"
              :class="{active: item === style.strokeStyle}"
              :style="{background: item}"
              @click="style.strokeStyle = item"
            )
          .setting-size
            el-slider.volume-slider(
              v-model="style.lineWidth"
              @input=""
              :min="1"
              :max="20"
            )

      //- @todo 清屏（由于清屏后回滚有问题）
      //- .tool-item(@click="clear")
      //-   i.icon-delete
    canvas#lxmWhiteBoard(ref="canvasRef" :width="width" :height="height" @mousedown="canvasMouseDown" @mousemove="canvasMouseMove" @mouseup="canvasMouseUp")
    .overflow(v-if="this.role === 2")
</template>

<script>
// import debounce from 'lodash.debounce'
import loadImage from '@/utils/loadImgPromise'

const colorArray = [
  '#000', '#9b9b9b', '#fff', '#ff7ea1', '#ff3b58', '#f00',
  '#f08218', '#b66700', '#8f4200', '#ff7500', '#ffd100', '#fff600',
  '#abd500', '#78bc24', '#2ea937', '#16b4a4', '#40c3ff', '#008deb',
  '#0043ff', '#bfc7ff', '#e352ff', '#76288b', '#412088', '#0f2378'
]

export default {
  props: {
    room: Object,
    role: Number,
    withFile: {
      type: Boolean,
      default: false
    },
    fileImg: String
  },
  data () {
    return {
      tool: 'pencil', // 绘制的类型: mouse, pencil, line, rect, arrow， eraser
      ratio: 1,
      initWidth: 0,
      initHeight: 0,
      width: 0,
      height: 0,
      isDraw: false,
      canvas: null,
      ctx: null,
      /**
       * 保存所有绘制的图形
       * type: 图形类型，包含pencil, rect, line, arrow
       * style: 图形样式，见this.ctxStyle
       * pah: 图形路径，Array
       */
      allPath: [],
      curPath: [], // 这里保存画自由线时点的集合
      eraserPath: [],
      oldPoint: {
        x: 0,
        y: 0
      },
      style: {
        strokeStyle: '#f00',
        lineWidth: 2,
        globalCompositeOperation: 'source-over'
      },
      undoArray: [],
      // redoArray: [],
      isClear: false,
      img: {
        width: 0,
        height: 0
      },
      colorArray
    }
  },
  async mounted () {
    this.canvas = this.$refs.canvasRef
    this.ctx = this.canvas.getContext('2d')
    // 添加一个iframe来监听
    const iframe = document.createElement('iframe')
    iframe.classList.add('iframe-class')
    this.canvas.parentNode.appendChild(iframe)
    this.calculate()
    this.$nextTick(() => {
      this.initWidth = this.width
      this.initHeight = this.height
    })
    // 如果和文件一起的canvas
    if (this.withFile && this.fileImg) {
      const img = await loadImage(this.fileImg)
      this.img.width = img.width
      this.img.height = img.height
      this.width = img.width / img.height * this.height
      this.initWidth = this.width
      this.initHeight = this.height
    }
    iframe.contentWindow.onresize = async () => {
      await this.calculate()
      this.ratio = this.width / this.initWidth
      this.$nextTick(() => {
        this.repaint()
      })
    }
    // window.onresize = () => {
    //   this.calculate()
    //   this.ratio = this.width / this.initWidth
    //   this.$nextTick(() => {
    //     this.repaint()
    //   })
    // }
    // 监听canvas的变化
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      if (e.message.name === 'LxmCanvas' && this.withFile === e.message.data.withFile) {
        this.initWidth = e.message.data.initWidth
        this.initHeight = e.message.data.initHeight
        this.ratio = this.width / e.message.data.initWidth
        this.allPath = e.message.data.allPath
        this.repaint()
      }
    })
    // 房间连接事件，获取canvas的数据
    this.room.addEventListener(TK.EVENT_TYPE.roomConnected, (e) => {
      console.log('白板内，房间连接成功', e)
      const canvasMessage = e.message?.find(item => item.name === 'LxmCanvas')
      if (canvasMessage) {
        const data = JSON.parse(canvasMessage.data)
        if (this.withFile === data.withFile) {
          this.initWidth = data.initWidth
          this.initHeight = data.initHeight
          this.ratio = this.width / data.initWidth
          this.allPath = data.allPath
          this.repaint()
        }
      }
    })
  },
  methods: {
    async calculate () {
      const parent = this.canvas.parentNode.querySelector('iframe')
      const pW = parent.clientWidth
      const pH = parent.clientHeight
      if (this.withFile && this.fileImg) {
        this.height = pH
        this.width = this.img.width / this.img.height * this.height
      } else {
        if (pW * .8 > pH) {
          this.width = pH / .8
          this.height = pH
        } else {
          this.width = pW
          this.height = pW * .8
        }
      }
    },
    canvasMouseDown(e) {
      this.isDraw = true
      this.oldPoint.x = e.offsetX
      this.oldPoint.y = e.offsetY
      /**
       * @todo 点下就开始绘制
       */
      switch (this.tool) {
        case 'line':
          this.allPath.push({
            type: 'line',
            style: JSON.parse(JSON.stringify(this.style)),
            path: []
          })
          break
        case 'rect':
          this.allPath.push({
            type: 'rect',
            style: JSON.parse(JSON.stringify(this.style)),
            path: []
          })
          break
        default:
          break
      }
    },
    canvasMouseMove(e) {
      this.ctx.lineCap = 'round'
      if (this.isDraw) {
        const x = e.offsetX
        const y = e.offsetY
        if (x === this.oldPoint.x && y === this.oldPoint.y) return
        /**
         * @todo 鼠标移出canvas区域取消绘制
         */
        this.style.globalCompositeOperation = 'source-over'
        switch (this.tool) {
          case 'pencil':
            // 画线不需要repaint，所以在这里设置样式
            this.ctx.strokeStyle = this.style.strokeStyle
            this.ctx.lineWidth = this.style.lineWidth
            this.ctx.globalCompositeOperation = this.style.globalCompositeOperation
            this.drawPencil(this.oldPoint.x, this.oldPoint.y, x, y)
            // push进去时，需要先除比例，避免位移偏
            this.curPath.push([x / this.ratio, y / this.ratio])
            this.oldPoint.x = x
            this.oldPoint.y = y
            break
          case 'line':
            this.allPath[this.allPath.length - 1]['path'] = [this.oldPoint.x / this.ratio, this.oldPoint.y / this.ratio, x / this.ratio, y / this.ratio]
            this.repaint()
            break
          case 'rect':
            this.allPath[this.allPath.length - 1]['path'] = [this.oldPoint.x / this.ratio, this.oldPoint.y / this.ratio, x / this.ratio, y / this.ratio]
            this.repaint()
            break
          case 'eraser':
            this.style.globalCompositeOperation = 'destination-out'
            this.ctx.globalCompositeOperation = this.style.globalCompositeOperation
            this.ctx.strokeStyle = this.style.strokeStyle
            this.ctx.lineWidth = this.style.lineWidth
            this.drawEraser(this.oldPoint.x, this.oldPoint.y, x, y)
            this.eraserPath.push([x / this.ratio, y / this.ratio])
            this.oldPoint.x = x
            this.oldPoint.y = y
            break
          default:
            break
        }
      }
    },
    canvasMouseUp() {
      this.isDraw = false
      switch (this.tool) {
        case 'pencil':
          // 如果当前路径有值，才加到allPath里面
          if (this.curPath.length > 1) {
            this.allPath.push({
              type: 'pencil',
              style: JSON.parse(JSON.stringify(this.style)),
              path: this.curPath
            })
            this.curPath = []
          }
          break;
        case 'line':
        case 'rect':
          if (!this.allPath[this.allPath.length - 1]['path'].length) {
            this.allPath.splice(this.allPath.length - 1)
          }
          break
        case 'eraser':
          if (this.eraserPath.length > 1) {
            this.allPath.push({
              type: 'eraser',
              style: JSON.parse(JSON.stringify(this.style)),
              path: this.eraserPath
            })
            this.eraserPath = []
          }
          break
        default:
          break
      }
      // 如果allPath里面的path没有值，直接删除，避免出现空的情况
      if (this.allPath[this.allPath.length - 1]['path'] && !this.allPath[this.allPath.length - 1]['path'].length) {
        this.allPath.splice(this.allPath.length - 1)
      }
      this.isClear = false
      this.undoArray = []
      this.sendCanvas()
    },
    // 画自由线
    drawPencil (ox, oy, x, y) {
      // 设置样式
      // this.ctx.strokeStyle = this.style.strokeStyle
      // this.ctx.lineWidth = this.style.lineWidth
      this.ctx.beginPath()
      this.ctx.moveTo(ox, oy)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    // 画直线
    drawLine (ox, oy, x, y) {
      // 设置样式
      // this.ctx.strokeStyle = this.style.strokeStyle
      // this.ctx.lineWidth = this.style.lineWidth
      this.ctx.beginPath()
      this.ctx.moveTo(ox, oy)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    // 画矩形
    drawRect (ox, oy, x, y) {
      // 设置样式
      // this.ctx.strokeStyle = this.style.strokeStyle
      // this.ctx.lineWidth = this.style.lineWidth
      this.ctx.beginPath()
      this.ctx.strokeRect(ox, oy, x - ox, y - oy)
      this.ctx.closePath()
    },
    // 橡皮擦功能
    drawEraser (ox, oy, x, y) {
      // 设置样式
      // this.ctx.strokeStyle = '#ffffff'
      this.ctx.beginPath()
      this.ctx.moveTo(ox, oy)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.closePath()
      // this.ctx.beginPath()
      // // this.ctx.arc(x, y, 10 * this.ratio, 0, Math.PI * 2, false)
      // // this.ctx.clearRect(x - 10, y - 10, 20, 20)
      // this.ctx.closePath()
      // this.ctx.stroke()
      // // this.ctx.fillStyle = '#ffffff'
      // this.ctx.fill()
    },
    // 将allPath保存的图形进行重绘
    repaint () {
      // 先清除画布
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.lineCap = 'round'
      this.allPath.forEach(item => {
        this.ctx.strokeStyle = item.style.strokeStyle
        this.ctx.lineWidth = item.style.lineWidth
        this.ctx.globalCompositeOperation = item.style.globalCompositeOperation
        switch (item.type) {
          case 'pencil':
            {
              let ox = item.path[0][0] // eslint-disable-line
              let oy = item.path[0][1] // eslint-disable-line
              item.path.forEach(ele => {
                // 重绘的时候需要带上比例
                this.drawPencil(ox * this.ratio, oy * this.ratio, ele[0] * this.ratio, ele[1] * this.ratio)
                ox = ele[0]
                oy = ele[1]
              })
            }
            break;
          case 'line':
            if (item.path.length) {
              this.drawLine(item.path[0] * this.ratio, item.path[1] * this.ratio, item.path[2] * this.ratio, item.path[3] * this.ratio)
            }
            break
          case 'rect':
            if (item.path.length) {
              this.drawRect(item.path[0] * this.ratio, item.path[1] * this.ratio, item.path[2] * this.ratio, item.path[3] * this.ratio)
            }
            break
          case 'eraser':
            {
              let ox = item.path[0][0] // eslint-disable-line
              let oy = item.path[0][1] // eslint-disable-line
              item.path.forEach(ele => {
                // 重绘的时候需要带上比例
                this.drawEraser(ox * this.ratio, oy * this.ratio, ele[0] * this.ratio, ele[1] * this.ratio)
                ox = ele[0]
                oy = ele[1]
              })
            }
            break
          default:
            break;
        }
      })
    },
    undo () {
      if (this.isClear) {
        this.isClear = false
        this.allPath.push(...this.undoArray)
        this.repaint()
      } else {
        if (this.allPath.length) {
          this.undoArray.push(this.allPath[this.allPath.length - 1])
          this.allPath.splice(this.allPath.length - 1)
          this.repaint()
        }
      }
      this.sendCanvas()
    },
    redo () {
      if (this.isClear) return
      if (this.undoArray.length) {
        this.allPath.push(this.undoArray[this.undoArray.length - 1])
        this.undoArray.splice(this.undoArray.length - 1)
        this.repaint()
      }
      this.sendCanvas()
      /**
       * @todo 清屏->撤销->回退
       */
    },
    clear() {
      if (this.allPath.length) {
        this.isClear = true
        this.undoArray.push(...this.allPath)
        this.allPath = []
        this.repaint()
      }
      this.sendCanvas()
    },
    // 向教室其他人发送消息
    sendCanvas () {
      this.room.pubMsg({
        name: 'LxmCanvas',
        id: 'LxmCanvas',
        save: true,
        toID: TK.MSG_TO_ALLEXCEPTSENDER,
        data: JSON.stringify({
          withFile: this.withFile,
          initWidth: this.initWidth,
          initHeight: this.initHeight,
          allPath: this.allPath
        })
      })
    }
  }
}
</script>