<style lang="stylus" scoped>
.home
  height 100%
  display flex
  flex-direction column
  .home-drag
    height 100%
    border 1px solid #f00
    position relative
</style>
<template lang="pug">
.home
  router-link(to="/about") about
  .home-drag
    DragBox
</template>

<script>
// @ is an alias to /src
import DragBox from '@/components/common/DragBox.vue'

export default {
  name: 'Home',
  components: {
    DragBox
  }
}
</script>