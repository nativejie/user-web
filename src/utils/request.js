import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '@/router'
// import qs from 'qs'
import i18n from '@/lang'
import queryString from 'query-string'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: import.meta.env['VITE_BASE_API'], // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization-Portal'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  if (store.getters.token) {
  }
  config.headers['Accept-Language'] = localStorage.getItem("LanguageCode") ? localStorage.getItem("LanguageCode") : 'en-GB'
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return queryString.stringify(params, {
        arrayFormat: 'repeat'
      })
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

const elementContentList = window.elementContentList
var text1 = elementContentList ? elementContentList.portal_login_msg5 : i18n.t('login.msg5')
var text2 = elementContentList ? elementContentList.portal_login_msg6 : i18n.t('login.msg6')
var text3 = elementContentList ? elementContentList.portal_login_msg7 : i18n.t('login.msg7')
var text4 = elementContentList ? elementContentList.portal_btns_cancel : i18n.t('btns.cancel')
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 401) {
        // MessageBox.confirm(text1, text2, {
        //   confirmButtonText: text3,
        //   cancelButtonText: text4,
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //   })
        //   })
        router.push('/login')
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }

      // 401:未登录;
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

