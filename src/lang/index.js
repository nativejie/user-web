// index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enGBLocale from './en_GB'
import enUSLocale from './en_US'
import zhCNLocale from './zh_CN'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
  'en-GB': {
    ...enGBLocale,
    ...enLocale
  },
  'en-US': {
    ...enUSLocale,
    ...enLocale
  },
  'zh-CN': {
    ...zhCNLocale,
    ...zhLocale
  }
}

const languageCode = localStorage.getItem("LanguageCode") || 'en-GB'
const i18n = new VueI18n({
  // 设置语言 选项 en | zh
  locale: languageCode,
  // 设置文本内容
  messages
})
locale.i18n((key, value) => { i18n.t(key, value) })

export default i18n


