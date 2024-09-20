import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhlocale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css
import './style.css'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import i18n from './lang'

// import Directives from '@/directives'
// Vue.use(Directives)
// import * as directive from './utils/directive'
// // 注册全局的指令
// Object.keys(directive).forEach((key) => {
//   Vue.directive(key, directive[key])
// })
const languageCode = localStorage.getItem("LanguageCode") || 'en-GB'

if (languageCode == 'zh-CN') {
  Vue.use(ElementUI, { zhlocale })
} else {
  Vue.use(ElementUI, { locale })
}
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  components: { App }
})


