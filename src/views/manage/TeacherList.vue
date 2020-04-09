<style lang="stylus" scoped>

</style>

<template lang="pug">
.classroom-list 我是老师列表
  input(type="file" ref="inputRef" @change="setFile")
  button(@click="uploadFile") 上传
  button(@click="roomCreate") 新建教室
</template>

<script>
import axios from '@/axios'
export default {
  methods: {
    setFile (e){
      console.log(e)
      this.file = e.target.files[0]
    },
    uploadFile () {
      const formData = new FormData()
      formData.append('filedata', this.file)
      // formData.append('key', 'mL5IQKSXU0Py1c2P')
      // // formData.append('serial', '217828568')
      // formData.append('conversion', 3)
      // formData.append('isopen', 1)
      // axios.post('http://global.talk-cloud.net/WebAPI/uploadfile', formData, {
      axios.post('user/modifyAvatar', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'form-data;charset=utf8'
        }
      })
    },
    roomCreate () {
      const params = {
        key: 'mL5IQKSXU0Py1c2P',
        roomname: '测试房间',
        roomtype: 3,
        starttime: parseInt(new Date().getTime()/1000),
        endtime: parseInt(new Date().getTime()/1000) + 60 * 60,
        chairmanpwd: '1111',
        assistantpwd: '2222',
        patrolpwd: '3333'
      }
      axios.post('http://global.talk-cloud.net/WebAPI/roomcreate', params)
    }
  }
}
</script>