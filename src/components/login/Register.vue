<style lang="stylus" scoped>
.register-box
  text-align center
  .register-title
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
  .register-error
    height 50px
    line-height 50px
    font-size 16px
    color #ff4d4d
  .register-form
    padding-bottom 10px
    .register-item
      margin-bottom 17px
      position relative
      .input-status
        position absolute
        right 22px
        top 50%
        width 23px
        height 23px
        transform translateY(-50%)
        background-position center
        background-repeat no-repeat
        background-size 100%
        &.right
          background-image url('../../assets/images/icon_yes.png')
        &.error
          background-image url('../../assets/images/icon_no.png')
      &.register-deal
        text-align left
        padding-left 60px
        font-size 16px
        color #666666
        display flex
        align-items center
        span
          color #fda203
          cursor pointer
      input
        background-position 30px center
        background-size 22px 23px
        background-repeat no-repeat
        &.username
          background-image url('../../assets/svg/svg_user.svg')
        &.mobile
          background-image url('../../assets/svg/svg_mobile.svg')
        &.sms-code
          background-image url('../../assets/svg/svg_code.svg')
        &.password
          background-image url('../../assets/svg/svg_pwd.svg')
        &.truename
          background-image url('../../assets/svg/svg_edit.svg')
      button.sms-btn
        width 120px
        height 40px
        background-color #FDA203
        border-radius 20px
        font-size 16px
        position absolute
        top 5px
        right 65px
        color #fff
        &.disabled
          background-color $gray
      &.to-login
        color #666666
        font-size 16px
        span
          color #FDA203
          cursor pointer
</style>
<style lang="stylus">
.lxm-dialog-body
  max-height 70vh
  overflow auto
  .dialog-title
    text-align center
    position relative
    h4
      display inline-block
      font-size 30px
      color $fontColor
      font-weight bold
      position relative
      &::before, &::after
        content: ""
        position absolute
        top 50%
        transform translateY(-50%)
        width 22px
        height 5px
        border-radius 3px
        background-color $fontColor
      &::before
        left -45px
      &::after
        right -45px
  .dialog-close
    position absolute
    top -17px
    right -13px
  .dialog-content
    h5
      font-size 22px
      color $fontColor
      font-weight bold
      margin-bottom 15px
      margin-top 30px
    p
      text-indent 2em
      font-size 16px
      color #666666
      line-height 30px
</style>

<template lang="pug">
.register-box
  h3.register-title 注册账号
  .register-error {{errorMsg}}
  .register-form
    .register-item
      input.username(type="text" placeholder="请输入6-12位英文组合的用户名" v-model="username" maxlength="12" @input="usernameChanged" @blur="usernameChanged")
      .input-status(:class="errorInfo.username === 1 ? 'error' : errorInfo.username === 2 ? 'right' : ''")
    .register-item
      input.mobile(type="number" placeholder="请输入手机号" v-model="mobile" max="19999999999" @input="mobileChanged" @blur="mobileChanged")
      .input-status(:class="errorInfo.mobile === 1 ? 'error' : errorInfo.mobile === 2 ? 'right' : ''")
    .register-item
      input.sms-code(type="number" placeholder="请输入验证码" v-model="smsCode" maxlength="4" @input="smsCodeChanged" @blur="smsCodeChanged")
      button.sms-btn(:class="smsSending ? 'disabled' : ''" @click="getSmsCode") {{smsSending ? `重新发送(${initTime}S)` : smsBtnText}}
      .input-status(:class="errorInfo.smsCode === 1 ? 'error' : errorInfo.smsCode === 2 ? 'right' : ''")
    .register-item
      input.password(type="password" placeholder="请输入6-14位英文数字组合的密码" v-model="password" maxlength="14" @input="passwordChanged" @blur="passwordChanged")
      .input-status(:class="errorInfo.password === 1 ? 'error' : errorInfo.password === 2 ? 'right' : ''")
    .register-item
      input.password(type="password" placeholder="确认密码" v-model="password2" maxlength="14" @input="password2Changed" @blur="password2Changed")
      .input-status(:class="errorInfo.password2 === 1 ? 'error' : errorInfo.password2 === 2 ? 'right' : ''")
    .register-item
      input.truename(type="text" placeholder="请输入宝宝姓名" v-model="truename" maxlength="5" @input="truenameChanged" @blur="truenameChanged")
      .input-status(:class="errorInfo.truename === 1 ? 'error' : errorInfo.truename === 2 ? 'right' : ''")
    .register-item.register-deal
      input#deal(type="checkbox" v-model="deal")
      label(for="deal")
      | 我已阅读并接受#[span(@click="showDeal = true") 《用户协议》]
    .register-item
      button.lxm-btn(@click="register" :class="{disabled: regsiterDisabled}") 注册
    .register-item.to-login 已有账号，#[span(@click="jumpLogin") 马上登录]
  el-dialog(
    :visible.sync="showDeal"
    width="52%"
    custom-class="lxm-dialog-box"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  )
    .lxm-dialog-body
      Close.dialog-close(@onClose="showDeal = false")
      .dialog-title
        h4 乐学猫用户服务协议
      .dialog-content
        h5 1、特别提示
        p 1.1 乐学猫（以下亦称“本网站”）及其涉及的产品和服务的所有权和运营权归深圳乐天童创科技有限公司所有，深圳乐天童创科技有限公司享有对小码精灵网网站上一切活动的监督、提示、检查、纠正及处罚等权利。
        p 1.2 用户在注册之前， 应当仔细阅读本协议中的各项条款， 包括免除本网站责任的免责条款及对用户的权利限制条款。 审慎阅读并选择接受或不接受本协议(未成年人应在法 定监护人陪同下阅读)。同意接受本协议全部条款的用户方可成为本网站的注册用户。 一旦注册成功， 即表示用户与本网站已达成协议，自愿接受本协议条款的全部内容。
        p 1.3 本网站提供免费注册服务， 您的注册均是自愿行为。
        p 1.4 本协议可由本网站根据实际运营需要进行不定时修改，修改后的条款经公布即代替原协议条款，用户应当及时在本网站查询最新版协议条款并同意，本网站不承担通知义务。如用户不同意本协议相关条款的修改，则应立即终止账号使用，否则即视同用户同意并完全接受修订后的协议。用户登录且继续使用本网站提供的服务将被视为已接受修订后的协议。
        p 1.5 本网站的通知、公告、声明或其它类似内容是本协议的一部分。
        h5 2、特别提示
        p 2.1 乐学猫（以下亦称“本网站”）及其涉及的产品和服务的所有权和运营权归深圳乐天童创科技有限公司所有，深圳乐天童创科技有限公司享有对小码精灵网网站上一切活动的监督、提示、检查、纠正及处罚等权利。
        p 2.2 用户在注册之前， 应当仔细阅读本协议中的各项条款， 包括免除本网站责任的免责条款及对用户的权利限制条款。 审慎阅读并选择接受或不接受本协议(未成年人应在法 定监护人陪同下阅读)。同意接受本协议全部条款的用户方可成为本网站的注册用户。 一旦注册成功， 即表示用户与本网站已达成协议，自愿接受本协议条款的全部内容。
</template>

<script>
import Close from '@/components/common/Close'
import checkRules from '@/utils/checkRules'

const initTime = 3

export default {
  components: {
    Close
  },
  data () {
    return {
      smsBtnText: '发送验证码',
      initTime: initTime,
      errorMsg: '',
      username: '',
      mobile: '',
      smsCode: '',
      password: '',
      password2: '',
      truename: '',
      deal: false,
      errorInfo: {
        // 0：初始状态，什么都不显示。1：验证错误。2：验证正确
        username: 0,
        mobile: 0,
        smsCode: 0,
        password: 0,
        password2: 0,
        truename: 0
      },
      smsSending: false,
      smsDisabled: false,
      timer: null,
      registing: false,
      showDeal: false
    }
  },
  computed: {
    regsiterDisabled () {
      return (this.errorInfo.username !== 2 ||
        this.errorInfo.mobile !== 2 ||
        this.errorInfo.smsCode !== 2 ||
        this.errorInfo.password !== 2 ||
        this.errorInfo.password2 !== 2 ||
        this.errorInfo.truename !== 2) ||
        !this.deal
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
    // 设置错误信息
    setErrorMsg (error = '') {
      this.errorMsg = error
    },
    usernameChanged () {
      if (!this.username) {
        this.setErrorMsg('账号不能为空')
        this.errorInfo.username = 1
        return
      }
      if (!/^[a-zA-Z]{1}/.test(this.username)) {
        this.setErrorMsg('首字母必须为英文')
        this.errorInfo.username = 1
        return
      }
      if (this.username.length < 6 || this.username.length > 12) {
        this.setErrorMsg('字符长度不合规则')
        this.errorInfo.username = 1
        return
      }
      this.setErrorMsg()
      this.errorInfo.username = 2
    },
    mobileChanged () {
      if (!checkRules.checkMobile(this.mobile)) {
        this.setErrorMsg('请输入正确的手机号')
        this.errorInfo.mobile = 1
      } else {
        this.setErrorMsg()
        this.errorInfo.mobile = 2
      }
    },
    smsCodeChanged () {
      if (!checkRules.checkSmsCode(this.smsCode)) {
        this.setErrorMsg('请输入正确的验证码')
        this.errorInfo.smsCode = 1
      } else {
        this.setErrorMsg()
        this.errorInfo.smsCode = 2
      }
    },
    passwordChanged () {
      if (!this.password) {
        this.setErrorMsg('密码不能为空')
        this.errorInfo.password = 1
        return
      }
      if (!checkRules.checkPassword(this.password)) {
        this.setErrorMsg('请输入正确的格式')
        this.errorInfo.password = 1
        return
      }
      this.setErrorMsg()
      this.errorInfo.password = 2
    },
    password2Changed () {
      if (!this.password2 || this.password2 !== this.password) {
        this.setErrorMsg('请输入正确的密码')
        this.errorInfo.password2 = 1
      } else {
        this.setErrorMsg()
        this.errorInfo.password2 = 2
      }
    },
    truenameChanged () {
      if (!checkRules.checkTruename(this.truename)) {
        this.setErrorMsg('请输入正确的姓名')
        this.errorInfo.truename = 1
      } else {
        this.setErrorMsg()
        this.errorInfo.truename = 2
      }
    },
    // 获取短信验证码
    async getSmsCode () {
      if (this.smsSending || this.smsDisabled) {
        return
      }
      if (!checkRules.checkMobile(this.mobile)) {
        this.setErrorMsg('请输入正确的手机号')
        this.errorInfo.mobile = 1
        return
      }
      const params = {
        mobile: this.mobile
      }
      this.smsDisabled = true
      const res = await this.$axios.post('regSmsCode', params)
      if (res.code === 400) {
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
    // 注册按钮
    async register () {
      this.usernameChanged()
      this.mobileChanged()
      this.smsCodeChanged()
      this.passwordChanged()
      this.password2Changed()
      this.truenameChanged()
      if (!this.deal) {
        this.setErrorMsg('请同意服务协议')
        return
      }
      if (this.regsiterDisabled || this.registing) {
        return
      }
      const params = {
        username: this.username,
        mobile: this.mobile,
        smsCode: this.smsCode,
        password: this.password,
        truename: this.truename
      }
      this.registing = true
      const res = await this.$axios.post('register', params)
      if (res.code === 200) {
        this.registing = false
        this.$message.success(res.msg)
      } else {
        this.registing = false
        this.setErrorMsg(res.msg)
      }
    },
    // 跳转到登录
    jumpLogin () {
      this.$emit('jumpTo', 'login')
    }
  }
}
</script>