import axios from 'axios'
import { Message } from 'element-ui'

const url = {
  development: 'http://192.168.3.128:3333/',
  production: 'http://192.168.3.128:3333/'
}

const baseUrl = url[process.env.NODE_ENV]

const ajax = axios.create({
  withCredentials: true
})

ajax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (!/^http/.test(config.url)) {
    config.url = baseUrl + config.url
  }
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const data = response.data
  if (data.code === 405) {
    localStorage.removeItem('token')
    Message.error(data.msg)
    setTimeout(() => {
      location.href = '/'
    }, 2000)
  }
  return data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default ajax