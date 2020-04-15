<style lang="stylus" scoped>
.mine-body
  width 100%
  height 100%
  position relative
  background url('../../assets/images/mine_bg.png')
  background-size cover
  .mine-back
    position absolute
    left 106px
    top 50px
  .mine-content
    width 1150px
    // height 695px
    border-radius 30px
    overflow hidden
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .mine-title
      height 68px
      line-height 68px
      font-size 34px
      color #ffffff
      font-weight bold
      text-align center
      background-color $hisYellow
      position relative
      span
        position relative
        z-index 1
      &::after
        content ""
        width 866px
        height 130px
        border-radius 50%
        background-color #FFC742
        position absolute
        bottom 30px
        left 50%
        transform translateX(-50%)
    .mine-main
      // height 627px
      padding 50px 54px
      background-color #fff
      .mine-box
        & + .mine-box
          margin-top 50px
        .box-title
          font-size 24px
          color #333333
          line-height 24px
          &::before
            content: ""
            display inline-block
            width 8px
            height 20px
            border-radius 4px
            background-color $hisYellow
            margin-right 14px
        .box-content
          display flex
          flex-wrap wrap
          padding 0 95px
          .box-item
            display flex
            align-items center
            width 50%
            margin-top 30px
            &.large
              width 100%
            .label
              width 120px
              font-size 22px
              color #c0c0c0
              &.small
                width 64px
            .value
              width 115px
              font-size 24px
              color #666666
              &.avatar
                width 100px
                height 100px
                border-radius 50%
                overflow hidden
                border 7px solid $stuDeepBlue
                margin-right 15px
                img
                  width 100%
              &.middle
                width 160px
            .ctrl
              font-size 24px
              color $inputPlace
              cursor pointer


</style>

<template lang="pug">
.mine-body
  Back.mine-back
  .mine-content
    .mine-title
      span 个人中心
    .mine-main
      .mine-box.mine-basic
        .box-title 基本信息
        .box-content
          .box-item.large
            .label.small 头像
            .value.avatar
              img(:src="userInfo ? userInfo.avatar : avatar")
            .ctrl(@click="openInput") 更换
            input(type="file" style="display: none;" ref="avatarRef" @change="uploadAvatar")
          .box-item
            .label 真实姓名
            .value {{userInfo ? userInfo.truename : ''}}
            .ctrl 修改
          .box-item
            .label 出生日期
            .value.middle
              template(v-if="userInfo && userInfo.birth") {{userInfo.birth | formatDate}}
              template(v-else) 未填写
            .ctrl 修改
          .box-item
            .label 性别
            .value {{userInfo && userInfo.gender ? GENDER[userInfo.gender] : '未填写'}}
            .ctrl 修改
          .box-item
            .label 家长信息
            .value.middle {{userInfo && userInfo.relation ? `${RELATION[userInfo.relation]} ${userInfo.relation_name}` : '未填写'}}
            .ctrl 修改
      .mine-box.mine-user
        .box-title 账户信息
        .box-content
          .box-item
            .label 账户名
            .value {{userInfo ? userInfo.username : ''}}
          .box-item
            .label 手机号
            .value {{userInfo ? userInfo.mobile : ''}}
          .box-item
            .label 修改密码
            .ctrl 修改
</template>

<script>
import avatar from '@/assets/images/avatar.png'
import { GENDER, RELATION } from '@/utils/constants'
import Back from '@/components/common/Back'

export default {
  components: {
    Back
  },
  data () {
    return {
      avatar,
      GENDER,
      RELATION,
      userInfo: null
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const res = await this.$axios.get('user/getUserInfo')
      if (res.code === 200) {
        this.userInfo = res.data
      }
    },
    // 打开文件框
    openInput () {
      this.$refs.avatarRef.click()
    },
    uploadAvatar (e) {
      const formData = new FormData()
      formData.append('filedata', e.target.files[0])
    }
  }
}
</script>