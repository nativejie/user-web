import request from '@/utils/request'

// 添加商品到购物车
export function cartAdd (data) {
  return request({
    url: '/cart/add',
    method: 'post',
    data
  })
}

// 删除购物车中的指定商品
export function cartDelete (id) {
  return request({
    url: `/cart/delete?ids=${id}`,
    method: 'post',
  })
}

// 获取当前会员的购物车列表
export function fetchList (data) {
  return request({
    url: '/cart/page',
    method: 'post',
    data
  })
}

// 添加定制商品到购物车
export function customAdd (customUid) {
  return request({
    url: `/cart/custom/add?customUid=${customUid}`,
    method: 'post',
  })
}

// 检查购物车是否存在定制商品
export function checkCustomExist (data) {
  return request({
    url: '/cart/checkCustomExist',
    method: 'post',
    data
  })
}

// 查询购物车商品数量
export function countCart (params) {
  return request({
    url: '/cart/countCart',
    method: 'get',
    params
  })
}

// 修改并保存购物车数量接口
export function cartEdit (cartItemId, data) {
  return request({
    url: `/cart/edit/${cartItemId}`,
    method: 'post',
    data
  })
}

