import request from '@/utils/request'

// 检测当前会员是否存在定制商品
export function checkExist (params) {
  return request({
    url: '/custom/check/exist',
    method: 'get',
    params
  })
}

// 会员定制商品详情信息
export function detail (params) {
  return request({
    url: '/custom/detail',
    method: 'get',
    params
  })
}

// 保存会员定制对象信息
export function objSave (customProductId, data) {
  return request({
    url: `/custom/obj/save/${customProductId}`,
    method: 'post',
    data
  })
}

// 保存会员定制对象sku信息
export function objSkuSave (customProductId, data) {
  return request({
    url: `/custom/objSku/save/${customProductId}`,
    method: 'post',
    data
  })
}

// 保存会员定制商品信息
export function save (data) {
  return request({
    url: '/custom/save',
    method: 'post',
    data
  })
}

// 保存会员定制服务信息
export function serviceSave (customProductId, customServiceUid) {
  return request({
    url: `/custom/service/save/${customProductId}?customServiceUid=${customServiceUid}`,
    method: 'post',
  })
}

// 保存会员定制服务推荐的商品Sku信息
export function serviceSkuSave (customProductId, data) {
  return request({
    url: `/custom/service/sku/save/${customProductId}`,
    method: 'post',
    data
  })
}

// 保存会员定制服务门店信息
export function storeSave (customProductId, data) {
  return request({
    url: `/custom/store/save/${customProductId}`,
    method: 'post',
    data
  })
}

// 查看可预约的门店
export function storePage (data) {
  return request({
    url: `/store/page`,
    method: 'post',
    data
  })
}

// 定制服务分页列表
export function servicePage (data) {
  return request({
    url: `/custom/service/page`,
    method: 'post',
    data
  })
}

// 定制服务配件商品分页列表
export function serviceProductPage (data) {
  return request({
    url: `/custom/service/product/page`,
    method: 'post',
    data
  })
}


// 测算3D模型的身高&体重接口
export function calculate (data) {
  return request({
    url: `/custom/height/weight/calculate`,
    method: 'post',
    data
  })
}

