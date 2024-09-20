import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 发送邮箱验证码
export function emailAuthCodeSend (type, username) {
  return request({
    url: `/admin/sso/emailAuthCode/send?type=${type}&username=${username}`,
    method: 'post'
  })
}


// 忘记密码
export function forgetPassword (data) {
  return request({
    url: `/admin/sso/forgetPassword?authCode=${data.authCode}&password=${data.password}&username=${data.username}`,
    method: 'post',
  })
}


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

// export function createAdmin (data) {
//   return request({
//     url: '/admin/register',
//     method: 'get',
//     params: data
//   })
// }

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

export function updatePassword (data) {
  return request({
    url: '/admin/updatePassword',
    method: 'post',
    data: data
  })
}


export function createAdmin (data) {
  return request({
    url: '/admin/create',
    method: 'post',
    data: data
  })
}


