<style lang="stylus" scoped>
.nav-list
  padding-left 10px
</style>

<template lang="pug">
.nav-list
  .nav-item(v-for="item in filterRoutes" :key="item.path")
    router-link(v-if="item.label" :to="item.path") {{item.label}}
    template(v-if="item.children && item.children.length")
      Nav(:filterRoutes="item.children")
</template>

<script>
export default {
  name: 'Nav',
  props: {
    filterRoutes: {
      type: Array,
      required: true
    }
  }
}
</script>