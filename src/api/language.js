import request from '@/utils/request'

// 多语言配置-组件分页列表
export function elementPage (data) {
  return request({
    url: '/sys/element/page',
    method: 'post',
    data: data
  })
}

// 多语言配置-根据翻译文案列表
export function contentPage (data) {
  return request({
    url: '/sys/element/contentPage',
    method: 'post',
    data: data
  })
}

// 多语言配置-保存组件
export function elementSave (elementId, data) {
  return request({
    url: `/sys/element/save/${elementId}`,
    method: 'post',
    data: data
  })
}

// 多语言配置-删除组件
export function elementDelete (elementId, data) {
  return request({
    url: `/sys/element/delete/${elementId}`,
    method: 'post',
    data: data
  })
}

// 多语言配置-批量导入
export function elementImport (data) {
  return request({
    url: '/sys/element/import',
    method: 'post',
    data: data
  })
}


// 多语言配置-组件详情
export function elementGet (elementId) {
  return request({
    url: `/sys/element/get/${elementId}`,
    method: 'get',
  })
}

// 多语言配置-
export function failedUsingJson (params) {
  return request({
    url: `/sys/element/failedUsingJson/download`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 多语言配置-
export function download (params) {
  return request({
    url: `/sys/element/download`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}



// 多语言配置-翻译文案列表
export function translationsPage (data) {
  return request({
    url: '/sys/element/translations/page',
    method: 'post',
    data: data
  })
}

// 多语言配置-保存翻译文案
export function translationsSave (translationsId, data) {
  return request({
    url: `/sys/element/translations/save/${translationsId}`,
    method: 'post',
    data: data
  })
}

// 多语言配置-删除翻译文案
export function translationsDelete (translationsId) {
  return request({
    url: `/sys/element/translations/delete/${translationsId}`,
    method: 'post',
  })
}

// 多语言配置-翻译文案详情
export function translationsGet (elementId) {
  return request({
    url: `/sys/element/translations/get/${translationsId}`,
    method: 'get',
  })
}




// 系统语言配置-语言配置列表
export function languageSettingPage (data) {
  return request({
    url: '/sys/language/setting/page',
    method: 'post',
    data: data
  })
}

// 系统语言配置-保存语言配置
export function languageSettingSave (languageSettingId, data) {
  return request({
    url: `/sys/language/setting/save/${languageSettingId}`,
    method: 'post',
    data: data
  })
}

// 系统语言配置-删除语言配置
export function languageSettingDelete (languageSettingId) {
  return request({
    url: `/sys/language/setting/delete/${languageSettingId}`,
    method: 'post',
  })
}

// 系统语言配置-语言配置详情
export function languageSettingGet (languageSettingId) {
  return request({
    url: `/sys/language/setting/get/${languageSettingId}`,
    method: 'get',
  })
}



// 首页管理-语言列表
export function languageSettingList (languageSettingId) {
  return request({
    url: `/hom/languageSetting/list`,
    method: 'get',
  })
}

