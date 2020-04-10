const checkRules = {
  checkUsername (username) {
    const reg = /^[a-zA-Z]{1}[a-zA-Z0-9]{3,11}$/
    return reg.test(username)
  },
  checkMobile (mobile) {
    const reg = /^1[0-9]{10}$/
    return reg.test(mobile)
  },
  checkSmsCode (code) {
    const reg = /^[0-9]{4}$/
    return reg.test(code)
  },
  checkPassword (password) {
    const reg = /^[a-zA-Z0-9]{6,14}$/
    return reg.test(password)
  },
  checkTruename (truename) {
    const reg = /^[\u4e00-\u9fa5]{2,5}$/gm
    return reg.test(truename)
  }
}

export default checkRules