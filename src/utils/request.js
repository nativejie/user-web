import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
import i18n from '@/lang'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization-Admin'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.headers['Accept-Language'] = localStorage.getItem("LanguageCode") ? localStorage.getItem("LanguageCode") : 'en-GB'
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

const elementContentList = window.elementContentList
var text1 = elementContentList ? elementContentList.login_message3 : i18n.t('login.message3')
var text2 = elementContentList ? elementContentList.login_message4 : i18n.t('login.message4')
var text3 = elementContentList ? elementContentList.login_message5 : i18n.t('login.message5')
var text4 = elementContentList ? elementContentList.btns_cancel : i18n.t('btns.cancel')
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.code === 401) {
        MessageBox.confirm(text1, text2, {
          confirmButtonText: text3,
          cancelButtonText: text4,
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service


