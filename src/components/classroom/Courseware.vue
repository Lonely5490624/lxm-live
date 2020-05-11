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
    display flex
    flex-direction column
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
      height 100%
      overflow auto
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
    .nav-btn(:class="{active: fileType === 'course'}" @click="changeType('course')") 课件库
    .nav-btn(:class="{active: fileType === 'media'}" @click="changeType('media')") 媒体库
  .courseware-content(v-if="fileType === 'course'")
    .courseware-header
      .courseware-filter(v-if="!searching" @click.stop="openSearching")
        i.icon-search.search-btn
      .courseware-filter(v-if="searching")
        .filter-searching
          span.icon-search.search
          input(type="text" placeholder="请输入搜索内容" v-model="searchWord")
          span.icon-close.close(@click.stop="closeSearching")
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
        .file-item(@click="shareWhiteBoard")
          .title
            img.title-img(src="../../assets/images/whiteboard.png")
            .title-text 白板
          .item-ctrl
            span.ctrl-show(:class="Object.keys(currentFile).length ? 'icon-close_eye' : 'icon-open_eye'")
        .file-item(v-for="item in classFile" :key="item.fileid" @click="shareCourse(item)")
          .title
            img.title-img(src="../../assets/images/icon_file.png")
            .title-text {{item.filename}}
          .item-ctrl
            span.ctrl-show(:class="currentFile && item.fileid === currentFile.fileid ? 'icon-open_eye' : 'icon-close_eye'")
      .file-header(:class="{open: publicFileOpen}" @click="openPublicFile")
        span.text 公共文件
        span.arrow.icon-right
      .file-list(:class="{hide: !publicFileOpen}")
        .file-item(v-for="item in publicFile" :key="item.fileid" @click="shareCourse(item)")
          .title
            img.title-img(src="../../assets/images/icon_file.png")
            .title-text {{item.filename}}
          .item-ctrl
            span.ctrl-show(:class="currentFile && item.fileid === currentFile.fileid ? 'icon-open_eye' : 'icon-close_eye'")
  .courseware-content(v-if="fileType === 'media'")
    .courseware-header
      .courseware-filter(v-if="!searching" @click.stop="openSearching")
        i.icon-search.search-btn
      .courseware-filter(v-if="searching")
        .filter-searching
          span.icon-search.search
          input(type="text" placeholder="请输入搜索内容" v-model="searchWord")
          span.icon-close.close(@click.stop="closeSearching")
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
        .file-item(v-for="item in classMediaFile" :key="item.fileid" @click="shareMedia(item)")
          .title
            img.title-img(src="../../assets/images/icon_file.png")
            .title-text {{item.filename}}
          .item-ctrl
            span.ctrl-show(:class="currentFile && item.fileid === currentFile.fileid ? 'icon-open_eye' : 'icon-close_eye'")
      .file-header(:class="{open: publicFileOpen}" @click="openPublicFile")
        span.text 公共文件
        span.arrow.icon-right
      .file-list(:class="{hide: !publicFileOpen}")
        .file-item(v-for="item in publicMediaFile" :key="item.fileid" @click="shareMedia(item)")
          .title
            img.title-img(src="../../assets/images/icon_file.png")
            .title-text {{item.filename}}
          .item-ctrl
            span.ctrl-show(:class="currentFile && item.fileid === currentFile.fileid ? 'icon-open_eye' : 'icon-close_eye'")
</template>

<script>
export default {
  props: {
    room: Object,
    currentFile: Object
  },
  data () {
    return {
      searching: false,
      searchWord: '',
      filter: 'time',
      sortDown: true,
      classFileOpen: true,
      publicFileOpen: false,
      fileList: [],
      fileType: 'course'
    }
  },
  computed: {
    classFile () {
      return this.fileList.filter(item => item.filecategory === 0 && item.filetype !== 'mp4' && item.filetype !== 'mp3')
    },
    publicFile () {
      return this.fileList.filter(item => item.filecategory === 1 && item.filetype !== 'mp4' && item.filetype !== 'mp3')
    },
    classMediaFile () {
      return this.fileList.filter(item => item.filecategory === 0 && (item.filetype === 'mp4' || item.filetype === 'mp3'))
    },
    publicMediaFile () {
      return this.fileList.filter(item => item.filecategory === 1 && (item.filetype === 'mp4' || item.filetype === 'mp3'))
    }
  },
  beforeMount () {
    this.getFileList()
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
    },
    // 获取文件列表
    getFileList () {
      this.fileList = this.room.getFileList()
    },
    // 共享白板
    shareWhiteBoard () {
      this.room.pubMsg({
        name: 'ShowPage',
        id: 'DocumentFilePage_ShowPage',
        save: true,
        data: JSON.stringify({
          filedata: {}
        })
      })
    },
    // 共享文件
    shareCourse (file) {
      this.room.pubMsg({
        name: 'ShowPage',
        id: 'DocumentFilePage_ShowPage',
        save: true,
        data: JSON.stringify({
          filedata: file
        })
      })
    },
    // 共享媒体文件
    shareMedia (media) {
      console.log('共享媒体文件', media)
      const url = `https://doccdn.talk-cloud.net${media.swfpath.replace(/\.(webm)$/, '-1.$1')}`
      this.room.startShareMedia(url, media.filetype === 'mp4', err => {
        console.log('共享媒体文件失败', err)
      })
      this.room.pubMsg({
        name: 'PubAudio',
        id: 'PubAudio',
        data: JSON.stringify({
          url
        })
      })
    },
    // 切换课件和媒体
    changeType (type) {
      this.fileType = type
      this.filter = 'time'
      this.sortDown = true
      this.searchWord = ''
      this.searching = false
    }
  }
}
</script>