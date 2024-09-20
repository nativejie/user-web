<template>
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        class="hamburger-container"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>
      <breadcrumb></breadcrumb>
      <el-select v-model="languageCode" @change="handleChange">
        <el-option
          v-for="item in list"
          :key="item.languageCode"
          :value="item.languageCode"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" class="user-avatar" :src="avatar" />
          <img v-else class="user-avatar" src="@/assets/index/logo2.png" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/userInfo">
            <el-dropdown-item>
              {{ name }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display: block">{{
              elementContentList.login_text13 || $t("login.text13")
            }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import { languageSettingList } from '@/api/language'
  
  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    data () {
      return {
        list: [
          // { languageCode: 'en-GB', name: elementContentList.language_language_en || this.$t('language.language.en') },
          // { languageCode: 'en-US', name: elementContentList.language_language_en_us || this.$t('language.language.en_us') },
          // { languageCode: 'zh-CN', name: elementContentList.language_language_zh_cn || this.$t('language.language.zh_cn') },
        ],
        languageCode: '',
        elementContentList: '',
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'name'
      ])
    },
    created () {
      this.elementContentList = window.elementContentList
      let code = localStorage.getItem("LanguageCode")
      if (!code) {
        localStorage.setItem('LanguageCode', 'en-GB')
      }
      this.languageCode = localStorage.getItem("LanguageCode") || 'en-GB'
      this.list = JSON.parse(sessionStorage.getItem('languageList'))
      // this.getLanguageSettingList()
    },
    methods: {
      getLanguageSettingList () {
        languageSettingList().then(res => {
          sessionStorage.setItem('languageList', JSON.stringify(res.data))
          this.list = res.data
        })
      },
      handleChange (val) {
        localStorage.setItem('LanguageCode', val)
        // let arr = window.location.href.split('?')
        // let url = ''
        // if (arr.length > 1) {
        //   let arr2 = window.location.href.split('locale=')
        //   url = arr2[0] + '&locale=' + val
        // } else {
        //   url = window.location.href + '?locale=' + val
        // }
        let arr = window.location.href.split('#')
        let arr2 = arr[0].split('?local=')
        arr[0] = arr2[0] + '?local=' + val
        let url = arr.join('#')
        window.location.href = url
        this.getLanguageSettingList()
        // window.location.reload()
      },
      toggleSideBar () {
        this.$store.dispatch('ToggleSideBar')
      },
      logout () {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
  </script>
  
  <style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .el-select {
      position: absolute;
      width: fit-content;
      right: 95px;
      .el-input__inner {
        width: 110px;
        border: none;
        text-align: right;
        padding-right: 35px;
      }
    }
  }
  </style>
  
  
  
  