<style lang="stylus" scoped>
.stu-body
  width 100%
  height 100%
  position relative
  background url('../../assets/images/stu_bg.png') center top no-repeat
  background-size cover
  .stu-logo
    position absolute
    top 40px
    left 60px
    img
      width 191px
  .stu-user
    position absolute
    top 0
    right 85px
    width 315px
    height 400px
    .user-rope
      display flex
      justify-content center
      .rope-item
        width 14px
        height 58px
        background url('../../assets/images/user_rope.png') center no-repeat
        background-size 100%
        & + .rope-item
          margin-left 130px
    .user-content
      width 100%
      height 85px
      background-color $stuBlue
      border-radius 42.5px
      position relative
      top -10px
      display flex
      justify-content space-between
      align-items center
      padding-right 25px
      .user-avatar
        width 105px
        height 105px
        border-radius 50%
        background-color $stuDeepBlue
        padding 10px
        .avatar-box
          width 85px
          height 85px
          border-radius 50%
          background-color $stuBlue
          overflow hidden
          img
            width 100%
      .user-info
        .info-name
          font-size 18px
          color #FFFFFF
        .info-integral
          color #FFFFFF
          font-size 16px
          background-color $stuDeepBlue
          width 110px
          height 30px
          line-height 30px
          border-radius 15px
          background-image url('../../assets/images/icon_integral.png')
          background-position 13px center
          background-repeat no-repeat
          background-size 21px 19px
          padding-left 40px
          margin-top 10px
      .user-edit
        cursor pointer
        img
          width 35px
  .stu-main
    display flex
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    align-items flex-end
    .main-room
      width 570px
      .room-header
        text-align center
        .header-img
          img
            width 285px
            height 175px
        .header-top
          width 100%
          height 68px
          padding 14px 15px
          background-color #FFCB00
          border-radius 34px
          position relative
          margin-top -26px
          z-index -1
          .top-inner
            width 100%
            height 100%
            background-color $inputPlace
            border-radius 20px
      .room-content
        background-color #fff
        margin -38px auto 0
        border-radius 10px 10px 30px 30px
        width 500px
        position relative
        padding-bottom 35px
        .room-title
          text-align center
          padding 28px 0 30px
          span
            display inline-block
            font-size 30px
            color $fontColor
            font-weight bold
            position relative
            &::before, &::after
              content ""
              position absolute
              width 22px
              height 6px
              border-radius 3px
              background-color #fed29f
              top 50%
              transform translateY(-50%)
            &::before
              left -37px
            &::after
              right -37px
        .room-history
          position absolute
          top 32px
          right 40px
          font-size 20px
          color #666666
          cursor pointer
        .room-list
          height 305px
          overflow-y auto
          padding 0 25px
          .room-item
            background-color $stuBlue
            padding 20px 20px 15px
            border-radius 20px
            .item-title
              font-size 22px
              color #FFFFFF
              font-weight bold
            .item-info
              display flex
              align-items center
              justify-content space-between
              font-size 20px
              color #FFFFFF
              line-height 1.8
              margin-top 10px
              .item-btn
                display flex
                .btn-start
                  width 120px
            & + .room-item
              margin-top 25px
            &.not
              background-color $stuGreen
        &::after
          content ""
          width 100%
          height 60px
          border-radius 0 0 30px 30px
          background-color $stuDeepGreen
          position absolute
          left 0
          bottom -10px
          z-index -1
    .main-evaluate
      width 430px
      padding 14px 16px 16px
      background-color $inputPlace
      border-radius 40px
      position relative
      .evaluate-header
        position absolute
        left 50%
        top -15px
        transform translateX(-50%)
        .header-circles
          display flex
          justify-content space-between
          width 290px
          .circle-item
            width 20px
            height 20px
            border-radius 10px
            background-color #fdb903
        .header-bird
          position absolute
          right 20px
          bottom 3px
          img
            width 72px
      .evaluate-box
        background-color #fff
        border-radius 30px
        padding 30px 20px 20px
        overflow hidden
        position relative
        .evaluate-age
          display flex
          align-items center
          .age-item
            font-size 20px
            color #666666
            cursor pointer
            &.disabled
              color $gray
              cursor auto
            &.active
              color $stuBlue
              font-size 26px
              font-weight bold
            & + .age-item
              margin-left 20px
        .evaluate-stage
          display flex
          justify-content space-between
          width 100%
          height 45px
          line-height 45px
          border-radius 22.5px
          overflow hidden
          font-size 16px
          margin-top 10px
          .stage-item
            width 25%
            text-align center
            color #7F5700
            background-color #FFCB00
            cursor pointer
            &.disabled
              color #ffffff
              background-color $gray
              cursor auto
            &.active
              color #ffffff
              font-weight bold
              background-color $stuDeepBlue
        .evaluate-ability
          display flex
          justify-content space-between
          width 100%
          border 3px solid #FFCB00
          background-color #FFF6CB
          border-radius 22.5px
          margin-top -45px
          padding-top 50px
          padding-bottom 5px
          .ability-item
            width 25%
            text-align center
            font-size 14px
            color $fontColor
            line-height 1.8
        .evaluate-chart
          text-align center
          padding-top 20px
          .chart
            display inline-block
            width 100%
            height 150px
        .evaluate-tag
          position absolute
          top -107px
          right -64px
          width 160px
          height 160px
          padding-top 107px
          padding-right 40px
          line-height 53px
          border-radius 80px
          background-color $stuBlue
          font-size 20px
          color #ffffff
          text-align center
      &::after
        content ""
        width 100%
        height 60px
        border-radius 0 0 40px 40px
        background-color $stuDeepGreen
        position absolute
        left 0
        bottom -10px
        z-index -1
      .evaluate-img
        position absolute
        bottom -20px
        right -55px
        img
          width 169px
  .stu-ctrl
    position absolute
    bottom 40px
    left 155px
    display flex
    .ctrl-btn
      width 68px
      cursor pointer
      img
        width 100%
      p
        font-size 20px
        color #FFFFFF
        margin-top 10px
        text-align center
      & + .ctrl-btn
        margin-left 42px
</style>

<template lang="pug">
.stu-body
  .stu-logo
    img(src="../../assets/images/logo.png")
  .stu-user
    .user-rope
      .rope-item
      .rope-item
    .user-content
      .user-avatar
        .avatar-box
          img(:src="userInfo ? userInfo.avatar : '../../assets/images/avatar.png'")
      .user-info
        .info-name 你好，{{userInfo ? userInfo.truename : '学员'}}
        .info-integral {{integralAll}}
      .user-edit
        img(src="../../assets/images/user_edit.png")
  .stu-main
    .main-room
      .room-header
        .header-img
          img(src="../../assets/images/lxm_1.png")
        .header-top
          .top-inner
      .room-content
        .room-title
          span 我的课程
        .room-history 历史课程
        .room-list
          .room-item(v-for="item in roomList" :key="item.serial" :class="{not: item.starttime > Math.round(Date.now()/1000)}")
            .item-title {{item.course_name}}
            .item-info
              .item-time
                | {{item.starttime | formatDatetimeNoSecond}}
                br
                | {{item.endtime | formatDatetimeNoSecond}}
              .item-teacher {{item.teacher_name}}
              .item-btn
                LxmBtn.btn-start(v-if="item.starttime <= Math.round(Date.now()/1000)") 进入课程
                LxmBtn.btn-start(v-else type="disable") 未开始
    .main-evaluate
      .evaluate-header
        .header-circles
          .circle-item(v-for="item in [1,2,3,4,5,6,7]" :key="item")
        .header-bird
          img(src="../../assets/images/lxm_bird.png")
      .evaluate-box
        .evaluate-age
          template(v-for="item in ageList")
            .age-item(:key="item.value" v-if="checkAge(item)" :class="{active: age === item.value}" @click="handleClickAge(item)") {{item.label}}
            .age-item.disabled(:key="item.value" v-if="!checkAge(item)" :class="{active: age === item.value}") {{item.label}}
        .evaluate-stage
          template(v-for="item in stageList")
            .stage-item(v-if="checkStage(item)" :key="item.value" :class="{active: stage === item.value}" @click="handleClickStage(item)") {{item.label}}
            .stage-item.disabled(v-if="!checkStage(item)" :key="item.value" :class="{active: stage === item.value}") {{item.label}}
        .evaluate-ability
          .ability-item
            p.name 能力1
            p.score {{abilityDetail ? abilityDetail.ability_a_score : 0}}
          .ability-item
            p.name 能力2
            p.score {{abilityDetail ? abilityDetail.ability_b_score : 0}}
          .ability-item
            p.name 能力3
            p.score {{abilityDetail ? abilityDetail.ability_c_score : 0}}
          .ability-item
            p.name 能力4
            p.score {{abilityDetail ? abilityDetail.ability_d_score : 0}}
          .ability-item
            p.name 能力5
            p.score {{abilityDetail ? abilityDetail.ability_e_score : 0}}
          .ability-item
            p.name 总分
            p.score {{abilityAll}}
        .evaluate-chart
          #chart.chart(ref="evaluateChart")
        .evaluate-tag 测评
      .evaluate-img
        img(src="../../assets/images/lxm_2.png")
  .stu-ctrl
    .ctrl-btn(@click="handleRefresh")
      img(src="../../assets/images/refresh.png")
      p 刷新
    .ctrl-btn
      img(src="../../assets/images/setting.png")
      p 设置
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'
import echarts from 'echarts'
import 'echarts/lib/chart/radar'

export default {
  components: {
    LxmBtn
  },
  data () {
    return {
      userInfo: null,
      integralAll: 0,
      roomList: [],
      ageList: [
        {
          value: 1,
          label: '3-4'
        }, {
          value: 2,
          label: '5-6'
        }, {
          value: 3,
          label: '7-8'
        }, {
          value: 4,
          label: '9-10'
        }, {
          value: 5,
          label: '11-12'
        }
      ],
      stageList: [
        {
          value: 1,
          label: '学前测评'
        }, 
        {
          value: 2,
          label: '学前测评'
        }, 
        {
          value: 3,
          label: '学前测评'
        }, 
        {
          value: 4,
          label: '学前测评'
        }
      ],
      abilityList: [],
      abilityDetail: null,
      age: 0,
      stage: 0,
      radar: null
    }
  },
  computed: {
    abilityAll () {
      if (this.abilityDetail) {
        return (
          this.abilityDetail.ability_a_score +
          this.abilityDetail.ability_b_score +
          this.abilityDetail.ability_c_score +
          this.abilityDetail.ability_d_score +
          this.abilityDetail.ability_e_score
        )
      } else {
        return 0
      }
    }
  },
  async beforeMount () {
    this.handleRefresh()
  },
  mounted () {
    this.radar = echarts.init(this.$refs.evaluateChart)
    const option = {
      tooltip: {
        show: false,
        textStyle: {
          fontSize: 8
        }
      },
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#fda203',
            borderRadius: 3,
            padding: [2, 4],
            fontSize: 8
          }
        },
        center: ['50%', '55%'],
        radius: '70%',
        nameGap: 5,
        indicator: [
          { name: '能力1', max: 20},
          { name: '能力2', max: 20},
          { name: '能力3', max: 20},
          { name: '能力4', max: 20},
          { name: '能力5', max: 20}
        ]
      },
      series: [{
        name: '能力得分',
        type: 'radar',
        data: [
          {
            value: []
          }
        ]
      }]
    }
    this.radar.setOption(option)
  },
  methods: {
    checkAge (ele) {
      return this.abilityList.find(item => item.age === ele.value)
    },
    checkStage (ele) {
      // 筛选阶段时，需要年龄和阶段同时满足
      return this.abilityList.find(item => item.age === this.age && item.stage === ele.value)
    },
    // 获取个人信息
    async getUserInfo () {
      const res = await this.$axios.get('user/getUserInfo')
      if (res.code === 200) {
        this.userInfo = res.data
      }
    },
    // 获取学员积分
    async getMyIntegral () {
      const res = await this.$axios.get('stu/getMyIntegral')
      if (res.code === 200) {
        this.integralAll = res.data.length ? res.data[0].integral_left : 0
      }
    },
    // 获取当前教室列表
    async getRoomList () {
      const res = await this.$axios.get('stu/getMyRoomList')
      if (res.code === 200) {
       this.roomList = res.data.reverse()
      }
    },
    // 获取历史教室列表
    // 获取学员能力列表
    async getMyAbility () {
      const res = await this.$axios.get('stu/getMyAbility')
      if (res.code === 200) {
        this.abilityList = res.data
        if (this.abilityList.length) {
          this.age = this.abilityList[0].age
          this.stage = this.abilityList[0].stage
        }
        this.getAbility()
      }
    },
    // 点击年龄段
    handleClickAge (item) {
      this.age = item.value
      // 点击年龄段时，阶段需要选中第一个能选的
      this.stage = this.abilityList.find(item => item.age === this.age).stage
      this.getAbility()
    },
    // 点击阶段
    handleClickStage (item) {
      this.stage = item.value
      this.getAbility()
    },
    // 获取能力得分列表
    async getAbility () {
      this.abilityDetail = this.abilityList.find(item => item.age === this.age && item.stage === this.stage)
      this.radar.setOption({
        series: [{
          data: [
            {
              value: [this.abilityDetail.ability_a_score, this.abilityDetail.ability_b_score, this.abilityDetail.ability_c_score, this.abilityDetail.ability_d_score, this.abilityDetail.ability_e_score]
            }
          ]
        }]
      })
    },
    // 刷新页面
    async handleRefresh () {
      await Promise.all([
        this.getUserInfo(),
        this.getRoomList(),
        this.getMyIntegral(),
        this.getMyAbility()
      ])
    }
  }
}
</script>