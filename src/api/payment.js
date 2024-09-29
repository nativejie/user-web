import request from '@/utils/request'

// 根据订单id获取支付二维码
export function qrcode (data) {
  return request({
    url: '/payment/qrcode',
    method: 'post',
    data
  })
}

//根据分组订单id获取支付二维码
export function groupQrcode (data) {
  return request({
    url: '/payment/group/qrcode',
    method: 'post',
    data
  })
}

// 手动执行，支付结果回调接口
export function notifyPayResult (orderId) {
  return request({
    url: `/payment/notifyPayResult?orderId=${orderId}`,
    method: 'post',
  })
}


// 根据订单支付账单uid判断是否支付
export function ispay (payBillUid) {
  return request({
    url: `/payment/ispay?payBillUid=${payBillUid}`,
    method: 'get',
  })
}


// 微信支付回调
export function notify (params) {
  return request({
    url: '/payment/wechat/notify',
    method: 'get',
    params: params
  })
}


// 微信支付回调
export function genPayInfo (params) {
  return request({
    url: '/payment/genPayInfo',
    method: 'get',
    params: params
  })
}

