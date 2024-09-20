<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { languageSettingList } from '@/api/language'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  created () {
    let data = sessionStorage.getItem('elementContentMap')
    if (!data) {
      this.getElementContentMap()
    } else {
      if (!window.elementContentList) {
        this.getElementContentMap()
      }
    }
    if (!sessionStorage.getItem('languageList')) {
      this.getLanguageSettingList()
    }
    console.log('window', window)
  },
  methods: {
    getLanguageSettingList () {
      languageSettingList().then(res => {
        sessionStorage.setItem('languageList', JSON.stringify(res.data))
      })
    },
    getElementContentMap () {
      let elementContentMap = window.elementContentMap
      elementContentMap = elementContentMap ? elementContentMap.slice(1, elementContentMap.length - 2) : ''
      let arr = elementContentMap.split(',')
      let obj = {}
      arr.forEach(item => {
        let ele = item.split('=')
        ele[0] = ele[0].replace(' ', '')
        this.$set(obj, ele[0], ele[1])
      })
      window.elementContentList = obj
      sessionStorage.setItem('elementContentMap', JSON.stringify(obj))
    },
  },
}
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
  font-family: HarmonyOS Sans SC;
}
</style>


