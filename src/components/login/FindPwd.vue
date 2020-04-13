<style lang="stylus" scoped>
$stepActive = #84CB54

.find-pwd-box
  text-align center
  width 380px
  margin 0 auto
  .find-pwd-title
    font-size 30px
    color $fontColor
    font-weight bold
    position relative
    display inline-block
    &::before, &::after
      content ""
      position absolute
      width 22px
      height 6px
      border-radius 2px
      background-color #fed29f
      top 50%
      transform translateY(-50%)
    &::before
      left -37px
    &::after
      right -37px
  .find-pwd-steps
    display flex
    justify-content space-between
    padding 0 48px
    margin-top 30px
    .step-item
      width 64px
      font-size 16px
      color $stepGray
      text-align center
      .step-circle
        font-size 22px
        width 48px
        height 48px
        line-height 48px
        background-color $stepGray
        border-radius 50%
        margin 0 auto 10px
        color #ffffff
      &.active
        color $stepActive
        .step-circle
          background-color $stepActive
    .step-sep
      width 44px
      height 3px
      background-color $stepGray
      position relative
      top 20px
  .find-pwd-error
    height 50px
    line-height 50px
    color $errorRed
    font-size 16px
  .find-pwd-content
    .find-pwd-form
      .form-item
        margin-bottom 30px
        position relative
        input
          background-position 30px center
          background-size 22px 23px
          background-repeat no-repeat
          &.mobile
            background-image url('../../assets/svg/svg_mobile.svg')
          &.sms-code
            background-image url('../../assets/svg/svg_code.svg')
          &.password
            background-image url('../../assets/svg/svg_pwd.svg')
        button.sms-btn
          width 120px
          height 40px
          background-color #FDA203
          border-radius 20px
          font-size 16px
          position absolute
          top 5px
          right 5px
          color #fff
          &.disabled
            background-color $gray
        &.form-ctrl
          display flex
          justify-content space-between
          .btn-cancel, .btn-confirm
            width 178px
      .find-pwd-success
        margin 42px auto 56px
        img
          width 103px
          height 106px
      .find-pwd-confirm
        margin-bottom 30px
</style>
<style lang="stylus">
.find-pwd-box
  .el-input.is-focus input
    border-bottom-left-radius 0
    border-bottom-right-radius 0
  .el-select.username
    input
      background-image url('../../assets/svg/svg_user.svg')
      background-position 30px center
      background-size 22px 23px
      background-repeat no-repeat
  .el-select .el-input .el-select__caret
    font-size 22px
    color #FDA203
    &::before
      content "\e78f"
.el-popper[x-placement^=bottom]
  margin-top 0
  .popper__arrow
    display none
.el-select-dropdown
  margin 0 
  border none
  background-color #fff3cb
  box-shadow none
  border-top-left-radius 0
  border-top-right-radius 0
  border-bottom-left-radius 25px
  border-bottom-right-radius 25px
  overflow hidden
.el-select-dropdown__list
  padding 0
.el-select-dropdown__item
  height 40px
  line-height 40px
  padding 0 71px
  font-size 16px
  color #333333
  &.selected
    color #FDA203
  &.hover
    background-color #FDA203
    color #FFFFFF
.el-input__icon
  width 25px
  line-height 50px
</style>

<template lang="pug">
.find-pwd-box
  h3.find-pwd-title 找回密码
  .find-pwd-steps
    .step-item(:class="{active: step === 1}")
      .step-circle 1
      .step-name 手机验证
    .step-sep
    .step-item(:class="{active: step === 2}")
      .step-circle 2
      .step-name 重置密码
    .step-sep
    .step-item(:class="{active: step === 3}")
      .step-circle 3
      .step-name 重置完成
  .find-pwd-error(v-if="step !== 3") {{errorMsg}}
  .find-pwd-content
    .find-pwd-form(v-if="step === 1")
      .form-item
        input.mobile(type="tel" maxlength="11" placeholder="请输入手机号" v-model="mobile" @input="mobileChanged" @blur="mobileChanged")
      .form-item
        input.sms-code(type="text" maxlength="4" placeholder="请输入验证码" v-model="smsCode" @input="smsCodeChanged" @blur="smsCodeChanged")
        button.sms-btn(:class="smsSending ? 'disabled' : ''" @click="getSmsCode") {{smsSending ? `重新发送(${initTime}S)` : smsBtnText}}
      .form-item.form-ctrl
        LxmBtn.btn-cancel(type="cancel" @onClick="handleCancel") 取消
        LxmBtn.btn-confirm(@onClick="handleConfirm1" :type="step1BtnDisabled ? 'disable' : ''") 下一步
    .find-pwd-form(v-if="step === 2")
      .form-item
        el-select.username(v-model="usernameUid")
          el-option(
            v-for="item in usernameList"
            :key="item.uid"
            :value="item.uid"
            :label="item.username"
            :popper-append-to-body="false"
          )
      .form-item
        input.password(type="password" maxlength="14" placeholder="请输入6-14位英文数字组合密码" v-model="password" @input="passwordChanged" @blur="passwordChanged")
      .form-item
        input.password(type="password" maxlength="14" placeholder="请输入确认密码" v-model="password2" @input="password2Changed" @blur="password2Changed")
      .form-item.form-ctrl
        LxmBtn.btn-cancel(type="cancel" @onClick="handleCancel") 取消
        LxmBtn.btn-confirm(@onClick="handleConfirm2" :type="step2BtnDisabled ? 'disable' : ''") 下一步
    .find-pwd-form(v-if="step === 3")
      .find-pwd-success
        img(src="../../assets/images/success.png")
      LxmBtn.find-pwd-confirm(@onClick="handleConfirm3") 确认
</template>

<script>
import LxmBtn from '@/components/common/LxmBtn'
import checkRules from '@/utils/checkRules'

const initTime = 60

export default {
  components: {
    LxmBtn
  },
  data () {
    return {
      smsBtnText: '发送验证码',
      initTime: initTime,
      errorMsg: '',
      step: 1,
      mobile: '',
      smsCode: '',
      usernameUid: '',
      usernameList: [],
      password: '',
      password2: '',
      smsSending: false,
      smsDisabled: false,
      timer: null,
      smsCodeChecking: false,
      reseting: false,
      logining: false
    }
  },
  computed: {
    step1BtnDisabled () {
      return !checkRules.checkMobile(this.mobile) || !checkRules.checkSmsCode(this.smsCode)
    },
    step2BtnDisabled () {
      return !checkRules.checkPassword(this.password) || this.password2 !== this.password
    }
  },
  watch: {
    initTime (newVal) {
      if (newVal === 0) {
        clearInterval(this.timer)
        this.timer = null
        this.smsSending = false
        this.smsDisabled = false
        this.initTime = initTime
        this.smsBtnText = '重新发送'
      }
    }
  },
  methods: {
    setErrorMsg (error = '') {
      this.errorMsg = error
    },
    mobileChanged () {
      if (!checkRules.checkMobile(this.mobile)) {
        this.setErrorMsg('请输入正确的手机号')
        return
      }
      this.setErrorMsg()
    },
    smsCodeChanged () {
      if (!checkRules.checkSmsCode(this.smsCode)) {
        this.setErrorMsg('请输入正确的验证码')
        return
      }
      this.setErrorMsg()
    },
    passwordChanged () {
      if (!this.password) {
        this.setErrorMsg('密码不能为空')
        return
      }
      if (!checkRules.checkPassword(this.password)) {
        this.setErrorMsg('请输入正确的格式')
        return
      }
      this.setErrorMsg()
    },
    password2Changed () {
      if (!this.password2 || this.password2 !== this.password) {
        this.setErrorMsg('请输入正确的密码')
      } else {
        this.setErrorMsg()
      }
    },
    // 找回密码获取验证码
    async getSmsCode () {
      if (this.smsSending || this.smsDisabled) {
        return
      }
      if (!checkRules.checkMobile(this.mobile)) {
        this.setErrorMsg('请输入正确的手机号')
        return
      }
      const params = {
        mobile: this.mobile
      }
      this.smsDisabled = true
      const res = await this.$axios.post('findSmsCode', params)
      if (res.code === 200) {
        this.smsSending = true
        this.timer = setInterval(() => {
          this.initTime = this.initTime - 1
        }, 1000);
      } else {
        this.setErrorMsg(res.msg)
        this.smsDisabled = false
        this.smsSending = false
      }
    },
    handleCancel () {
      if (this.step === 1) {
        this.$emit('jumpTo', 'login')
      } else {
        this.step --
      }
    },
    // 第一步
    async handleConfirm1 () {
      if (this.smsCodeChecking) return
      if (!checkRules.checkMobile(this.mobile)) {
        this.setErrorMsg('请输入正确的手机号')
        return
      }
      if (!checkRules.checkSmsCode(this.smsCode)) {
        this.setErrorMsg('请输入正确的验证码')
        return
      }
      const params = {
        mobile: this.mobile,
        smsCode: this.smsCode
      }
      this.smsCodeChecking = true
      const res = await this.$axios.post('checkSmsCode', params)
      if (res.code === 200) {
        this.smsCodeChecking = false
        this.usernameList = res.data
        this.usernameUid = res.data[0].uid
        this.step ++
      } else {
        this.setErrorMsg(res.msg)
        this.smsCodeChecking = false
      }
    },
    // 第二步
    async handleConfirm2 () {
      if (this.step1BtnDisabled || this.reseting) return
      if (!this.password) {
        this.setErrorMsg('密码不能为空')
        return
      }
      if (!checkRules.checkPassword(this.password)) {
        this.setErrorMsg('请输入正确的格式')
        return
      }
      if (!this.password2 || this.password2 !== this.password) {
        this.setErrorMsg('请输入正确的密码')
      }
      const params = {
        uid: this.usernameUid,
        newPassword: this.password
      }
      this.reseting = true
      const res = await this.$axios.post('resetPwd', params)
      if (res.code === 200) {
        this.step ++
        this.reseting = false
      } else {
        this.setErrorMsg(res.msg)
        this.reseting = false
      }
    },
    async handleConfirm3 () {
      if (this.logining) {
        return
      }
      const username = this.usernameList.find(item => item.uid === this.usernameUid).username
      const params = {
        username: username,
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
    }
  }
}
</script>