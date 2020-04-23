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
  formatDatetimeNoSecond (datetime) {
    const newDatetime = new Date(datetime * 1000)
    const year = newDatetime.getFullYear()
    const month = newDatetime.getMonth() + 1
    const day = newDatetime.getDate()
    const hour = newDatetime.getHours()
    const minute = newDatetime.getMinutes()
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
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
  },
  networkFilter (status) {
    switch (status) {
      case 1:
        return '优'
      case 2:
        return '良'
      case 3:
        return '中'
      case 4:
        return '差'
      case 5:
        return '极差'
      default:
        return '优'
    }
  }
}

export default filters