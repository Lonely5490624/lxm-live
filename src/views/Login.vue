<style lang="stylus" scoped>
// .test-em
//   font-family 'icomoon'
//   &::after
//     content "\e947"
//     color #f00
.login
  width 100%
  height 100%
  position relative
  .login-main
    width 520px
    border 10px solid #ffcb00
    border-radius 40px
    border-top-width 14px
    position fixed
    left 50%
    top 50%
    transform translate(-50%, -50%)
    padding-top 30px
    background-color #fff
    .login-main-circles
      display flex
      position absolute
      width 290px
      justify-content space-between
      top -25px
      left 50%
      transform translateX(-50%)
      .circle-item
        width 20px
        height 20px
        border-radius 10px
        background-color #fdb903
</style>
<style lang="stylus">
body
  background url('../assets/images/login_bg.png') center no-repeat
  background-size 100%
.slide-left-enter-active, .slide-left-leave-active
  transition all .6s
.slide-left-enter, .slide-left-leave-to
  margin-left -520px
  opacity 0
.slide-right-enter-active, .slide-right-leave-active
  transition all .6s
.slide-right-enter, .slide-right-leave-to
  margin-left 520px
  opacity 0
</style>

<template lang="pug">
.login
  transition(name="slide-left")
    .login-main(v-if="currentCom === 'register'")
      .login-main-circles
        .circle-item(v-for="item in [1,2,3,4,5,6,7]" :key="item")
      Register(@jumpTo="jumpTo")
  transition(name="slide-left")
    .login-main(v-if="currentCom === 'login'")
      .login-main-circles
        .circle-item(v-for="item in [1,2,3,4,5,6,7]" :key="item")
      Login(@jumpTo="jumpTo")
  transition(name="slide-right")
    .login-main(v-if="currentCom === 'findPwd'")
      .login-main-circles
        .circle-item(v-for="item in [1,2,3,4,5,6,7]" :key="item")
      FindPwd(@jumpTo="jumpTo")
</template>

<script>
import Register from '@/components/login/Register'
import Login from '@/components/login/Login'
import FindPwd from '@/components/login/FindPwd'

export default {
  components: {
    Register,
    Login,
    FindPwd
  },
  data () {
    return {
      currentCom: 'findPwd'
    }
  },
  methods: {
    jumpTo (to) {
      this.currentCom = to
    }
  }
}
</script>