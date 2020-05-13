<style lang="stylus" scoped>
.lwb-cover
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0,0,0,.5)
  z-index 9
  .lwb-box
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    height 90%
    background-color $them
    padding 0 6px
    display flex
    flex-direction column
    border-radius 20px
    .lwb-header
      height 50px
      display flex
      justify-content space-between
      flex-direction row-reverse
      align-items flex-end
      .lwb-close
        cursor pointer
        align-self center
        margin-right 10px
        img
          width 16px
      .lwb-tab
        display flex
        .tab-item
          width 100px
          height 40px
          line-height 40px
          text-align center
          color #ffffff
          border-top-left-radius 5px
          border-top-right-radius 5px
          background-color $inputPlace
          cursor pointer
          font-size 16px
          &.active
            background-color #fff
            color $inputPlace
    .lwb-canvas
      background-color #fff
      position relative
      height calc(100% - 100px)
      .canvas-cover
        position absolute
        left 0
        top 0
        right 0
        bottom 0
    .lwb-footer
      height 50px
      display flex
      flex-direction row-reverse
      justify-content space-between
      align-items center
      padding 0 10px
      .lwb-tools
        display flex
        color #ffffff
        .tool-item
          width 40px
          height 40px
          text-align center
          line-height 40px
          cursor pointer
          font-size 20px
          &.active
            color $them
            background-color #fff
          &.tool-setting
            position relative
            font-size 14px
            &:hover .setting-main
              display block
            .setting-main
              position absolute
              bottom 40px
              left 0
              width 216px
              background-color rgba(0,0,0,.5)
              cursor auto
              display none
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
                padding 0 12px 6px
                display flex
                justify-content space-between
                align-items center
                .size-value
                  width 20px
                  line-height 30px
                  text-align left
                .setting-size-slider
                  width 100%
      .lwb-control
        .lwb-btn
          width 90px
          height 35px
          line-height 35px
          border-radius 18px
          background-color $inputPlace
          font-size 16px
          text-align center
          color #ffffff
          cursor pointer
</style>
<style lang="stylus">
.little-iframe-class
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
    margin-bottom 6px
</style>

<template lang="pug">
.lwb-cover
  .lwb-box
    .lwb-header
      .lwb-close(@click="closeLWB")
        img(v-if="role === 0" src="../../assets/images/icon_cha.png")
      .lwb-tab(v-if="(role === 0 && (lwbStatus === 'sended' || lwbStatus === 'recycled')) || (role !== 0 && lwbStatus === 'recycled')")
        .tab-item(:class="{active: showCanvasId === teacherId}" @click="changeCanvasId(teacherId)") 老师
        .tab-item(v-for="item in $store.state.stu.stuList" :key="item.id" :class="{active: showCanvasId === item.id}" @click="changeCanvasId(item.id)") {{item.nickname}}
    .lwb-canvas
      canvas(
        :width="width"
        :height="height"
        ref="canvasRef"
        @mousedown="canvasMouseDown"
        @mousemove="canvasMouseMove"
        @mouseup="canvasMouseUp"
      )
      .canvas-cover(v-if="(role === 0 && lwbStatus === 'sended') || (role !==0 && lwbStatus !== 'sended')")
    .lwb-footer
      .lwb-control
        template(v-if="role === 0")
          .lwb-btn(v-if="lwbStatus === 'prepare'" @click="handleSend") 分发
          .lwb-btn(v-if="lwbStatus === 'sended'" @click="handleRecycle") 回收
          .lwb-btn(v-if="lwbStatus === 'recycled'" @click="handleSendAgain") 再次分发
      .lwb-tools(v-show="(role === 0 && lwbStatus !== 'sended') || (role === 2 && lwbStatus === 'sended')")
        .tool-item(@click="tool = 'pencil'" :class="{active: tool === 'pencil'}" title="画笔")
          i.icon-pen
        .tool-item(@click="tool = 'eraser'" :class="{active: tool === 'eraser'}" title="橡皮擦")
          i.icon-xiangpi
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
              .size-value {{style.lineWidth}}
              el-slider.setting-size-slider(
                v-model="style.lineWidth"
                :min="1"
                :max="20"
                :show-tooltip="false"
              )
</template>

<script>
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
    canvasData: Object
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
       * path: 图形路径，Array
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
      colorArray,
      lwbStatus: 'prepare', // prepare, sended, recycled
      showCanvasId: this.teacherId,
      allCanvasPath: {}
    }
  },
  computed: {
    teacherId () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showCanvasId = this.$store.state.stu?.teacher[0]?.id
      return this.$store.state.stu?.teacher[0]?.id
    },
    mySelfId () {
      return this.$store.state.user?.userData?.id
    }
  },
  async mounted () {
    this.initWidth = this.canvasData.initWidth
    this.initHeight = this.canvasData.initHeight
    this.lwbStatus = this.canvasData.lwbStatus
    this.allPath = this.canvasData.allPath
    
    this.canvas = this.$refs.canvasRef
    this.ctx = this.canvas.getContext('2d')
    // 添加一个iframe来监听
    const iframe = document.createElement('iframe')
    iframe.classList.add('little-iframe-class')
    iframe.id = 'littleWBIfrmae'
    this.canvas.parentNode.appendChild(iframe)
    this.calculate()
    this.$nextTick(() => {
      this.initWidth = this.width
      this.initHeight = this.height
    })
    iframe.contentWindow.onresize = async () => {
      await this.calculate()
      this.ratio = this.width / this.initWidth
      this.$nextTick(() => {
        this.repaint()
      })
    }
    // 监听canvas的变化
    this.room.addEventListener(TK.EVENT_TYPE.roomPubmsg, e => {
      // 非老师接受小白板分发事件
      if (e.message.name === 'LittleWhiteBoard') {
        this.lwbStatus = e.message.data.lwbStatus
        this.initWidth = e.message.data.initWidth
        this.initHeight = e.message.data.initHeight
        this.ratio = this.width / e.message.data.initWidth
        this.allPath = e.message.data.allPath
        this.repaint()
      }
      // 老师接受学生小白板图形变化事件
      if (e.message.name === 'LWBChange') {
        this.allCanvasPath[e.message.data.userId] = e.message.data.allPath
        this.allPath = this.allCanvasPath[this.showCanvasId]
        this.repaint()
      }
      // 学生接收到老师收回小白板事件
      if (e.message.name === 'LWBRecycled') {
        this.lwbStatus = 'recycled'
      }
      // 学生接收老师回收后切换小白板事件
      if (e.message.name === 'ChangeCanvas') {
        this.showCanvasId = e.message.data.userId
        this.allPath = e.message.data.allPath
        this.repaint()
      }
    })
    // 房间连接事件，获取canvas的数据
    // this.room.addEventListener(TK.EVENT_TYPE.roomConnected, (e) => {
    //   console.log('白板内，房间连接成功', e)
    //   const canvasMessage = e.message?.find(item => item.name === 'LittleWhiteBoard')
    //   if (canvasMessage) {
    //     const data = JSON.parse(canvasMessage.data)
    //     if (this.withFile === data.withFile) {
    //       this.initWidth = data.initWidth
    //       this.initHeight = data.initHeight
    //       this.ratio = this.width / data.initWidth
    //       this.allPath = data.allPath
    //       this.repaint()
    //     }
    //   }
    // })
  },
  methods: {
    async calculate () {
      const parent = document.getElementById('littleWBIfrmae')
      // const parent = this.canvas.parentNode.parentNode.parentNode
      // const pW = parent.clientWidth
      const pH = parent.clientHeight
      this.width = pH / .8
      this.height = pH
    },
    canvasMouseDown(e) {
      this.isDraw = true
      this.oldPoint.x = e.offsetX
      this.oldPoint.y = e.offsetY
      /**
       * @todo 点下就开始绘制
       */
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
            if (this.lwbStatus === 'recycled') {
              this.allCanvasPath[this.showCanvasId].push({
                type: 'pencil',
                style: JSON.parse(JSON.stringify(this.style)),
                path: this.curPath
              })
              this.curPath = []
            } else {
              this.allPath.push({
                type: 'pencil',
                style: JSON.parse(JSON.stringify(this.style)),
                path: this.curPath
              })
              this.curPath = []
            }
          }
          break;
        case 'eraser':
          if (this.eraserPath.length > 1) {
            if (this.lwbStatus === 'recycled') {
              this.allCanvasPath[this.showCanvasId].push({
                type: 'eraser',
                style: JSON.parse(JSON.stringify(this.style)),
                path: this.eraserPath
              })
              this.eraserPath = []
            } else {
              this.allPath.push({
                type: 'eraser',
                style: JSON.parse(JSON.stringify(this.style)),
                path: this.eraserPath
              })
              this.eraserPath = []
            }
          }
          break
        default:
          break
      }
      // 如果allPath里面的path没有值，直接删除，避免出现空的情况
      if (this.allPath[this.allPath.length - 1] && this.allPath[this.allPath.length - 1]['path'] && !this.allPath[this.allPath.length - 1]['path'].length) {
        this.allPath.splice(this.allPath.length - 1)
      }
      // 每次绘制需要清空撤销的数组
      this.undoArray = []
      this.sendCanvas()
    },
    // 画自由线
    drawPencil (ox, oy, x, y) {
      this.ctx.beginPath()
      this.ctx.moveTo(ox, oy)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    // 橡皮擦功能
    drawEraser (ox, oy, x, y) {
      this.ctx.beginPath()
      this.ctx.moveTo(ox, oy)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.closePath()
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
    // 学生向教师提交canvas
    sendCanvas () {
      if (this.lwbStatus === 'sended') {
        this.room.pubMsg({
          name: 'LWBChange',
          id: 'LWBChange',
          save: true,
          toID: this.$store.state.stu?.teacher[0]?.id,
          data: JSON.stringify({
            userId: this.mySelfId,
            allPath: this.allPath
          })
        })
      }
    },
    // 分发
    handleSend () {
      this.lwbStatus = 'sended'
      this.room.pubMsg({
        name: 'LittleWhiteBoard',
        id: 'LittleWhiteBoard',
        save: true,
        toID: TK.MSG_TO_ALLEXCEPTSENDER,
        data: JSON.stringify({
          lwbStatus: this.lwbStatus,
          initWidth: this.initWidth,
          initHeight: this.initHeight,
          allPath: this.allPath
        })
      })
      this.allCanvasPath[this.mySelfId] = this.allPath
      this.$store.state.stu?.stuList?.forEach(item => {
        this.allCanvasPath[item.id] = this.allPath
      })
    },
    // 回收
    handleRecycle () {
      this.lwbStatus = 'recycled'
      this.room.pubMsg({
        name: 'LWBRecycled',
        id: 'LWBRecycled',
        toID: TK.MSG_TO_ALLEXCEPTSENDER
      })
    },
    // 再次分发
    handleSendAgain () {
      this.lwbStatus = 'sended'
      this.$store.state.stu?.stuList.forEach(item => {
        this.room.pubMsg({
          name: 'LittleWhiteBoard',
          id: 'LittleWhiteBoard',
          save: true,
          toID: item.id,
          data: JSON.stringify({
            lwbStatus: this.lwbStatus,
            initWidth: this.initWidth,
            initHeight: this.initHeight,
            allPath: this.allCanvasPath[item.id]
          })
        })
      })
    },
    changeCanvasId (id) {
      if (this.role !== 0) return
      this.showCanvasId = id
      this.allPath = this.allCanvasPath[id]
      this.repaint()
      if (this.lwbStatus === 'recycled') {
        this.changeCanvasRecycled(id)
      }
    },
    changeCanvasRecycled (id) {
      this.room.pubMsg({
        name: 'ChangeCanvas',
        id: 'ChangeCanvas',
        toID: TK.MSG_TO_ALLEXCEPTSENDER,
        data: JSON.stringify({
          userId: id,
          allPath: this.allCanvasPath[id]
        })
      })
    },
    // 关闭小白板
    closeLWB () {
      this.room.delMsg({
        name: 'LittleWhiteBoard',
        id: 'LittleWhiteBoard'
      })
    }
  }
}
</script>