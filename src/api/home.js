import request from '@/utils/request'

// 定制服务的商品sku分页列表
export function skuPage (data) {
  return request({
    url: '/home/product/sku/page',
    method: 'post',
    data
  })
}

// 查询首页视频文件详情
export function videoList () {
  return request({
    url: '/home/resource/video/list',
    method: 'get',
  })
}

// 查询首页案例图片列表
export function picList () {
  return request({
    url: '/home/resource/pic/list',
    method: 'get',
  })
}

// 推荐的商品分页列表
export function productPage (data) {
  return request({
    url: '/home/featured/product/page',
    method: 'post',
    data
  })
}


// 查询首页功能入口图片列表
export function sectionPicList () {
  return request({
    url: '/home/section/pic/list',
    method: 'get',
  })
}

// 查询语言环境配置列表
export function languageSettingList () {
  return request({
    url: '/home/languageSetting/list',
    method: 'get',
  })
}

