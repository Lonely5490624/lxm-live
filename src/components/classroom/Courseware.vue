<style lang="stylus" scoped>
.courseware-box
  position fixed
  top 100px
  bottom 0
  right 0
  width 640px
  background-color rgba(30,148,100,.9)
  padding 15px 25px 0 15px
  display flex
  z-index 99
  .courseware-nav
    width 90px
    flex-shrink 0
    .nav-btn
      width 100%
      height 40px
      line-height 40px
      text-align center
      border-radius 20px
      font-size 14px
      color #ffffff
      background-color $roomDeepGreen
      cursor pointer
      &.active
        color $roomDeepGreen
        background-color #fff
      & + .nav-btn
        margin-top 16px
  .courseware-content
    width 100%
    flex-shrink 1
    padding-left 30px
    .courseware-header
      border-bottom 1px solid rgba(255, 255, 255, .5)
      padding-bottom 10px
      height 45px
      display flex
      align-items center
      color #ffffff
      font-size 14px
      .courseware-filter
        cursor pointer
        display flex
        & + .courseware-filter
          margin-left 20px
        .search-btn
          margin-top 1px
        .filter-searching
          width 240px
          height 35px
          border-radius 17px
          position relative
          .search
            position absolute
            left 15px
            top 11px
          input
            width 100%
            height 35px
            font-size 14px
            text-indent 43px
            background rgba(255, 255, 255, .5)
            color #ffffff
            &::placeholder
              color #ffffff
          .close
            font-size 14px
            position absolute
            top 11px
            right 15px
            transform scale(.8)
        .filter-box
          display flex
          flex-direction column
          margin-left 5px
          .filter-item
            &.filter-up
              width 0
              height 0
              border-left 5px solid transparent
              border-right 5px solid transparent
              border-bottom 5px solid rgba(255,255,255,0.4)
              margin-bottom 2px
            &.filter-down
              width 0
              height 0
              border-left 5px solid transparent
              border-right 5px solid transparent
              border-top 5px solid rgba(255,255,255,0.4)
        &.active .filter-up.on
          border-bottom-color #FFD13E
        &.active .filter-down.on
          border-top-color #FFD13E
    .courseware-files
      padding-top 10px
      .file-header
        width 100%
        height 35px
        background-color $roomDeepGreen
        font-size 14px
        color #ffffff
        padding 0 13px
        display flex
        justify-content space-between
        align-items center
        border-radius 8px
        cursor pointer
        .arrow
          font-size 14px
        &.open .arrow
          transform rotate(90deg)
      .file-list
        .file-item
          display flex
          justify-content space-between
          color #ffffff
          font-size 14px
          padding 10px 15px
          line-height 40px
          cursor pointer
          .title
            display flex
            .title-img
              width 36px
              height 36px
            .title-text
              margin-left 10px
        &.hide
          display none
</style>

<template lang="pug">
.courseware-box
  .courseware-nav
    .nav-btn.active 课件库
    .nav-btn 媒体库
  .courseware-content
    .courseware-header
      .courseware-filter(v-if="!searching" @click="openSearching")
        i.icon-search.search-btn
      .courseware-filter(v-if="searching")
        .filter-searching
          span.icon-search.search
          input(type="text" placeholder="请输入搜索内容" v-model="searchWord")
          span.icon-close.close(@click="closeSearching")
      .courseware-filter(v-if="!searching" @click="setFilter('time')" :class="{active: filter === 'time'}") 时间
        .filter-box
          i.filter-item.filter-up(:class="{on: !sortDown}")
          i.filter-item.filter-down(:class="{on: sortDown}")
      .courseware-filter(v-if="!searching" @click="setFilter('type')" :class="{active: filter === 'type'}") 类型
        .filter-box
          i.filter-item.filter-up(:class="{on: !sortDown}")
          i.filter-item.filter-down(:class="{on: sortDown}")
      .courseware-filter(v-if="!searching" @click="setFilter('name')" :class="{active: filter === 'name'}") 名称
        .filter-box
          i.filter-item.filter-up(:class="{on: !sortDown}")
          i.filter-item.filter-down(:class="{on: sortDown}")
    .courseware-files
      .file-header(:class="{open: classFileOpen}" @click="openClassFile")
        span.text 教室文件
        span.arrow.icon-right
      .file-list(:class="{hide: !classFileOpen}")
        .file-item
          .title
            img.title-img(src="../../assets/images/whiteboard.png")
            .title-text 白板
          .item-ctrl
            span.ctrl-show.icon-open_eye
      .file-header(:class="{open: publicFileOpen}" @click="openPublicFile")
        span.text 公共文件
        span.arrow.icon-right
      .file-list(:class="{hide: !publicFileOpen}")
        .file-item
          .title
            img.title-img(src="../../assets/images/icon_file.png")
            .title-text 白板
          .item-ctrl
            span.ctrl-show.icon-open_eye
</template>

<script>
export default {
  data () {
    return {
      searching: false,
      searchWord: '',
      filter: 'time',
      sortDown: true,
      classFileOpen: true,
      publicFileOpen: false
    }
  },
  methods: {
    openSearching () {
      this.searching = true
    },
    closeSearching () {
      this.searching = false
      this.searchWord = ''
    },
    setFilter (type) {
      if (type === this.filter) {
        this.sortDown = !this.sortDown
      } else {
        this.filter = type
        this.sortDown = true
      }
    },
    openClassFile () {
      this.classFileOpen = !this.classFileOpen
    },
    openPublicFile () {
      this.publicFileOpen = !this.publicFileOpen
    }
  }
}
</script>