<style lang="stylus" scoped>
.classroom
  height 100%
</style>

<template lang="pug">
.classroom 我是教室{{$route.params.id}}
  WhiteBoard
</template>

<script>
import WhiteBoard from '@/components/common/WhiteBoard'

export default {
 components: {
   WhiteBoard
 } 
}
</script>