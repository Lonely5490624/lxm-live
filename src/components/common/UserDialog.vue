<style lang="stylus" scoped>

</style>

<template lang="pug">
el-dialog(
  :visible.sync="visible"
  custom-class="lxm-user-dialog"
  :show-close="false"
  :append-to-body="true"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
)
  .user-dialog-body
    Close.dialog-close(@onClose="$emit('onClose')")
    .dialog-title
      h4 {{title}}
    slot(name="content")
    slot(name="footer")
</template>

<script>
import Close from '@/components/common/Close'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    Close
  }
}
</script>