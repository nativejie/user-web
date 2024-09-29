import request from '@/utils/request'

// 用户立即购买生成订单确认信息接口
export function buyGenerateConfirmOrder (data) {
  return request({
    url: '/order/buy/generateConfirmOrder',
    method: 'post',
    data
  })
}


// 根据立即购买的信息创建订单信息
export function buyGenerateOrder (data) {
  return request({
    url: '/order/buy/generateOrder',
    method: 'post',
    data
  })
}


// 根据购物车信息生成确认单
export function generateConfirmOrder (cartIds) {
  return request({
    url: `/order/generateConfirmOrder?cartIds=${cartIds}`,
    method: 'post',
  })
}

// 根据购物车信息生成订单
export function generateOrder (data) {
  return request({
    url: '/order/generateOrder',
    method: 'post',
    data
  })
}

// 根据购物车信息生成订单
export function groupGenerateOrder (data) {
  return request({
    url: '/order/group/generateOrder',
    method: 'post',
    data
  })
}

// 根据购物车信息生成确认单
export function groupGenerateConfirmOrder (cartIds) {
  return request({
    url: `/order/group/generateConfirmOrder?cartIds=${cartIds}`,
    method: 'post',
  })
}



// 用户确认收货
export function confirmReceiveOrder (orderId) {
  return request({
    url: `/order/confirmReceiveOrder?orderId=${orderId}`,
    method: 'post',
  })
}

// 用户删除订单
export function deleteOrder (orderId) {
  return request({
    url: `/order/deleteOrder?orderId=${orderId}`,
    method: 'post',
  })
}


// 用户取消订单
export function cancelUserOrder (orderId) {
  return request({
    url: `/order/cancelUserOrder?orderId=${orderId}`,
    method: 'post',
  })
}

// 自动取消超时订单
export function cancelTimeOutOrder (data) {
  return request({
    url: '/order/cancelTimeOutOrder',
    method: 'post',
    data
  })
}

// 取消单个超时订单
export function cancelOrder (data) {
  return request({
    url: '/order/cancelOrder',
    method: 'post',
    data
  })
}

// 根据ID获取订单详情
export function orderDetail (orderId) {
  return request({
    url: `/order/detail/${orderId}`,
    method: 'get',
  })
}

// 搜索订单
export function orderSearch (data) {
  return request({
    url: '/order/search',
    method: 'post',
    data
  })
}

// 提交售后申请
export function afterApply (data) {
  return request({
    url: '/order/after/apply',
    method: 'post',
    data
  })
}

// 查询售后单详情
export function afterDetail (params) {
  return request({
    url: '/order/after/detail',
    method: 'get',
    params
  })
}


// 定制商品-用户立即购买生成订单确认信息接口
export function customGenerateConfirmOrder (customUid) {
  return request({
    url: `/order/buy/custom/generateConfirmOrder?customUid=${customUid}`,
    method: 'post',
  })
}

// 定制商品-用户立即购买生成订单确认信息接口
export function customGenerateOrder (data) {
  return request({
    url: `/order/buy/custom/generateOrder`,
    method: 'post',
    data
  })
}

// 确认扫描
export function confirmPrint (orderId) {
  return request({
    url: `/order/confirmPrint?orderId=${orderId}`,
    method: 'post',
  })
}

// 拒绝打印
export function refusePrint (orderId) {
  return request({
    url: `/order/refusePrint?orderId=${orderId}`,
    method: 'post',
  })
}


