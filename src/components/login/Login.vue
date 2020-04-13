<style lang="stylus" scoped>
.login-box
  text-align center
  img.login-logo
    width 191px
    height 56px
  .login-error
    height 50px
    line-height 50px
    color #ff4d4d
    font-size 16px
  .login-form
    padding 0 60px
    .login-item
      margin-bottom 30px
      position relative
      input
        background-position 30px center
        background-size 22px 23px
        background-repeat no-repeat
        &.username
          background-image url('../../assets/svg/svg_user.svg')
        &.password
          background-image url('../../assets/svg/svg_pwd.svg')
      &.login-ctrl
        display flex
        justify-content space-between
        padding 0 20px
        font-size 16px
        color #666666
        margin-bottom 20px
        .ctrl-btn
          cursor pointer
</style>

<template lang="pug">
.login-box
  img.login-logo(src="../../assets/images/logo.png")
  .login-error {{errorMsg}}
  .login-form
    .login-item
      input.username(type="text" placeholder="请输入账号" maxlength="12" v-model="username")
    .login-item
      input.password(type="password" placeholder="6-14位英文数字组合" maxlength="14" v-model="password")
    .login-item.login-ctrl
      .ctrl-btn(@click="jumpRegister") 账号注册
      .ctrl-btn(@click="jumpFindPwd") 忘记密码？
    .login-item
      LxmBtn(:type="loginDisabled ? 'disable' : ''" @onClick="login") 登录
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'

export default {
  components: {
    LxmBtn
  },
  data () {
    return {
      errorMsg: '',
      username: '',
      password: '',
      logining: false
    }
  },
  computed: {
    loginDisabled () {
      return (!this.username || !this.password)
    }
  },
  methods: {
    setErrorMsg (error = '') {
      this.errorMsg = error
    },
    // 登录
    async login () {
      if (!this.username) {
        this.setErrorMsg('账号不能为空')
        return
      }
      if (!this.password) {
        this.setErrorMsg('请输入密码')
        return
      }
      if (this.loginDisabled || this.logining) {
        return
      }
      const params = {
        username: this.username,
        password: this.password
      }
      this.logining = true
      const res = await this.$axios.post('login', params)
      if (res.code === 200) {
        this.$message.success('登录成功')
        this.logining = false
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
        this.$router.replace('/home')
      } else {
        this.setErrorMsg(res.msg)
        this.logining = false
      }
    },
    // 跳转注册
    jumpRegister () {
      this.$emit('jumpTo', 'register')
    },
    jumpFindPwd () {
      this.$emit('jumpTo', 'findPwd')
    }
  }
}
</script>