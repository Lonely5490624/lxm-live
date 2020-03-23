<style lang="stylus" scoped>
.home
  height 100%
  border 1px solid 
</style>
<template lang="pug">
.home
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