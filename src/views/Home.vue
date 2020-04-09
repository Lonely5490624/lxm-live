<style lang="stylus" scoped>
.home
  height 100%
  display flex
  .home-nav
    width 250px
    background-color #ccc
    overflow auto
  .home-content
    width 100%
  .home-drag
    height 100%
    border 1px solid #f00
    position relative
</style>
<template lang="pug">
.home
  .home-nav
    Nav(:filterRoutes="filterRoutes")
  .home-content
    router-view
</template>

<script>
// @ is an alias to /src
import { routes } from '@/router'
import Nav from '@/components/common/Nav'
import DragBox from '@/components/common/DragBox'

export default {
  name: 'Home',
  components: {
    Nav,
    DragBox
  },
  data () {
    const role = +localStorage.getItem('role')
    const filterRoutes = routes.filter(item => {
      const { permission } = item
      return !permission || permission.includes(role)
    })
    return {
      filterRoutes
    }
  },
  methods: {
    setVuex () {
      this.$store.commit('user/setUserData', {
        userData: '哈哈'
      })
    }
  }
}
</script>