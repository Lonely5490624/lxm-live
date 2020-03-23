<template lang="pug">
.about
  h1 This is an about page
  .router-list
    router-link(to="/about") about首页
    router-link(to="/about/list") about列表
  .about-content
    router-view
</template>