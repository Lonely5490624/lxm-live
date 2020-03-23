<template lang="pug">
.about-list 我是about list 页面
  .list
    p(v-for="item in list" :key="item.id") {{item.navigationName}}
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    axios.get('http://test.baigonglian.com:10005/mvp/solution/findAllSolutionSort').then(res => {
      this.list = res.data.data
    })
  }
}
</script>