import request from '@/utils/request'

// 获取会员信息
export function getInfo () {
  return request({
    url: '/member/info',
    method: 'get',
  })
}

// 修改个人信息
export function updateInfo (data) {
  return request({
    url: '/member/update/info',
    method: 'post',
    data: data
  })
}

// 修改个人邮箱
export function updateMail (mail, newAuthCode, oldAuthCode) {
  return request({
    url: `/member/update/mail?mail=${mail}&newAuthCode=${newAuthCode}&oldAuthCode=${oldAuthCode}`,
    method: 'post',
  })
}

//发送原邮箱验证码
export function updateMailAuthCodeSendOld (data) {
  return request({
    url: '/member/updateMail/authCode/sendOld',
    method: 'post',
    data: data
  })
}

//检查原邮箱验证码
export function updateMailCheckOldAuthCode (authCode) {
  return request({
    url: `/member/updateMail/checkOldAuthCode?authCode=${authCode}`,
    method: 'post',
  })
}

//发新邮箱验证码
export function updateMailAuthCodeSendNew (mail) {
  return request({
    url: `/member/updateMail/authCode/sendNew?mail=${mail}`,
    method: 'post',
  })
}

//检查新邮箱验证码
export function updateMailCheckNewAuthCode (authCode) {
  return request({
    url: `/member/updateMail/checkNewAuthCode?authCode=${authCode}`,
    method: 'post',
  })
}

// 会员修改密码
export function updatePassword (authCode, password) {
  return request({
    url: `/member/updatePassword?authCode=${authCode}&password=${password}`,
    method: 'post',
  })
}

// 发送更新密码的邮箱验证码 
export function updatePasswordAuthCodeSend (data) {
  return request({
    url: '/member/updatePassword/authCode/send',
    method: 'post',
    data: data
  })
}

/* 收货地址 */

// 所有收货地址
export function addressList () {
  return request({
    url: `/member/address/list`,
    method: 'get',
  })
}

// 获取会员信息
export function addressInfo (id) {
  return request({
    url: `/member/address/${id}`,
    method: 'get',
  })
}

// 添加收货地址
export function addAddress (data) {
  return request({
    url: '/member/address/add',
    method: 'post',
    data: data
  })
}

// 删除收货地址
export function delleteAddress (id) {
  return request({
    url: `/member/address/delete/${id}`,
    method: 'post',
  })
}

// 修改收货地址
export function updateAddress (data, id) {
  return request({
    url: `/member/address/update/${id}`,
    method: 'post',
    data: data
  })
}


