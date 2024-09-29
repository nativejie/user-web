import request from '@/utils/request'

// 商品详情信息
export function proDetail (params) {
  return request({
    url: '/product/detail',
    method: 'get',
    params
  })
}

// 商品综合搜索、筛选、排序, 排序字段:0->按新品；1->按销量；2->价格从低到高；3->价格从高到低；4->按照门店距离从近到远
export function proSerch (params) {
  return request({
    url: '/product/search',
    method: 'get',
    params
  })
}

// 检查商品SKU是否有库存
export function checkProductSkuStock (params) {
  return request({
    url: '/product/checkProductSkuStock',
    method: 'get',
    params
  })
}

// 根据商品规格属性值查询SKU组合中其他规格属性值列表
export function getVisibleSkuAttrValues (params) {
  return request({
    url: '/product/getVisibleSkuAttrValues',
    method: 'get',
    params
  })
}

// 根据商品规格查询商品SKU数据
export function getSkuDetail (params) {
  return request({
    url: '/product/getSkuDetail',
    method: 'get',
    params
  })
}

// 定制商品分页列表
export function customPage (params) {
  return request({
    url: '/product/custom/page',
    method: 'get',
    params
  })
}

// 商品sku列表
export function productSkuList (params) {
  return request({
    url: 'product/sku/list',
    method: 'get',
    params
  })
}

