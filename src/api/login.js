import request from '@/utils/request'


export function getInfo () {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout () {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList (params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin (data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin (id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus (id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin (id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin (id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole (data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}

// 会员登录
export function login (account, password) {
  return request({
    url: `/sso/login?account=${account}&password=${password}`,
    method: 'post',
  })
}

// 会员注册
export function register (data) {
  return request({
    url: `/sso/register?account=${data.account}&authCode=${data.authCode}&nickName=${data.nickName}&password=${data.password}`,
    method: 'post',
  })
}

// 发送注册账号的邮箱验证码
export function registerAuthCodeSend (data) {
  return request({
    url: `/sso/register/authCode/send?account=${data}`,
    method: 'post',
  })
}

// 检查邮箱验证码
export function registerCheckAuthCodeSend (data, code) {
  return request({
    url: `/sso/register/checkAuthCode?account=${data}&authCode=${code}`,
    method: 'post',
  })
}

// 忘记密码
export function forgetPassword (data) {
  return request({
    url: `/sso/forgetPassword?account=${data.account}&authCode=${data.authCode}&password=${data.password}`,
    method: 'post',
  })
}

// 发送忘记密码的邮箱验证码
export function forgetPasswordAuthCodeSend (data) {
  return request({
    url: `/sso/forgetPassword/authCode/send?account=${data}`,
    method: 'post',
  })
}

// 账号检测
export function userCheck (params) {
  return request({
    url: '/sso/user/check',
    method: 'get',
    params: params
  })
}

// 刷新token
export function refreshToken () {
  return request({
    url: '/sso/refreshToken',
    method: 'get',
  })
}

/**
 * 第三方登录
 * @param {String} source 第三方登录来源 facebook/linkedin/twitter
 */
export function thirdLogin (source ) {
  return request({
    url: `/oauth/render/facebook`,
    method: 'post',
    data: {
      source
    }
  })
}