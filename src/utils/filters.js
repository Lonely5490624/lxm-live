const filters = {
  formatDatetime (datetime) {
    const newDatetime = new Date(datetime * 1000)
    const year = newDatetime.getFullYear()
    const month = newDatetime.getMonth() + 1
    const day = newDatetime.getDate()
    const hour = newDatetime.getHours()
    const minute = newDatetime.getMinutes()
    const second = newDatetime.getSeconds()
    return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  },
  formatDate (date) {
    const newDatetime = new Date(date * 1000)
    const year = newDatetime.getFullYear()
    const month = newDatetime.getMonth() + 1
    const day = newDatetime.getDate()
    return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`
  },
  convertName (name) {
    return `${name.substring(0, 1)}老师`
  }
}

export default filters