<template>
    <div class="navbar">
      <div class="nav_bar flex_b_c">
        <div class="nav_left flex_c_c">
          <img src="@/assets/index/logo.png" />
          <span @click="handleGoHome">{{
            elementContentList.portal_navbar_title || $t("navbar.title")
          }}</span>
        </div>
        <div class="nav_right">
          <div class="nav_menu flex">
            <el-select v-model="languageCode" @change="handleChange">
              <el-option
                v-for="item in list"
                :key="item.languageCode"
                :value="item.languageCode"
                :label="item.name"
              ></el-option>
            </el-select>
            <span
              class="menu_item"
              to=""
              @click="handleShowDialog"
              style="cursor: pointer"
            >
              {{ elementContentList.portal_navbar_menu1 || $t("navbar.menu1") }}
            </span>
            <router-link class="menu_item" to="/general">
              {{ elementContentList.portal_navbar_menu2 || $t("navbar.menu2") }}
            </router-link>
            <router-link class="menu_item" to="/cart">
              <el-badge :value="cartNum" :max="99" class="item">
                <svg-icon
                  icon-class="cart"
                  style="width: 16px; height: 16px"
                ></svg-icon>
                {{ elementContentList.portal_navbar_menu3 || $t("navbar.menu3") }}
              </el-badge>
            </router-link>
            <router-link v-if="!userInfo.username" class="menu_item" to="/home">
              {{ elementContentList.portal_navbar_menu4 || $t("navbar.menu4") }}
            </router-link>
            <router-link v-else class="menu_item" to="/my/baseInfo">
              <!-- {{ $store.state.user.userInfo.nickname }} -->
              {{ userInfo.nickname }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="nav_dialog flex_c_c" v-if="showDialog">
        <div class="dia_card">
          <p>
            {{ elementContentList.portal_navbar_text1 || $t("navbar.text1") }}
          </p>
          <p>
            {{ elementContentList.portal_navbar_text2 || $t("navbar.text2") }}
          </p>
          <p>
            <el-button @click="handleClose">{{
              elementContentList.portal_btns_cancel || $t("btns.cancel")
            }}</el-button>
            <el-button @click="handleGoToCart" class="btn1">{{
              elementContentList.portal_btns_btn1 || $t("btns.btn1")
            }}</el-button>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { checkCustomExist } from '@/api/cart'
  import { languageSettingList } from '@/api/home'
  
  export default {
    data () {
      return {
        elementContentList: '',
        showDialog: false,
        list: [],
        languageCode: '',
      }
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'cartNum',
      ])
    },
    created () {
      this.elementContentList = window.elementContentList
      let code = localStorage.getItem("LanguageCode")
      if (!code) {
        localStorage.setItem('LanguageCode', 'en-GB')
      }
      this.languageCode = localStorage.getItem("LanguageCode") || 'en-GB'
      if (!sessionStorage.getItem('languageList')) {
        this.getLanguageSettingList()
      } else {
        this.list = JSON.parse(sessionStorage.getItem('languageList'))
      }
      // this.getLanguageSettingList()
    },
    mounted () {
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
      handleGoToCart () {
        this.showDialog = false
        this.$router.push('/cart')
      },
      handleClose () {
        this.showDialog = false
      },
      handleShowDialog () {
        checkCustomExist().then(res => {
          if (res.data) {
            this.showDialog = true
          } else {
            this.$router.push('/custom')
          }
        })
      },
      handleGoHome () {
        if (this.$route.path == '/home') return false
        this.$router.push('/')
      },
      logout () {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
  </script>
  
  <style rel="stylesheet/scss" lang="scss">
  .navbar {
    height: 56px;
    line-height: 56px;
    background: #1e1e1e;
    color: #fff;
    .nav_bar {
      height: 100%;
      width: 1152px;
      margin: 0 auto;
      .nav_left {
        height: 100%;
        img {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          margin-right: 16px;
        }
        span {
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          cursor: pointer;
        }
      }
      .nav_right {
        .nav_menu {
          .menu_item {
            font-size: 14px;
            font-weight: 500;
            line-height: 22px;
            margin-right: 32px;
            .el-badge__content {
              border-radius: 999px;
              height: 20px;
              min-width: 20px;
              line-height: 17px;
              box-sizing: border-box;
              border: 1px solid #ffffff;
              background: #ff4d4f;
              padding: 0px 2px;
            }
          }
        }
      }
    }
    .el-select {
      width: 120px !important;
      // position: absolute;
      width: fit-content;
      // right: 95px;
      margin-right: 18px;
      .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 35px;
        color: #fff;
      }
    }
  }
  .nav_dialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 100;
    .dia_card {
      width: 400px;
      border-radius: 8px;
      padding: 32px 32px 24px 32px;
      gap: 16px;
      background: #ffffff;
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
        0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
      p {
        margin: 0;
      }
      p:nth-of-type(1) {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.88);
      }
      p:nth-of-type(2) {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.88);
        margin: 8px 0 24px;
      }
      p:nth-of-type(3) {
        text-align: right;
        .el-button {
          height: 32px;
          border-radius: 8px;
          padding: 0px 16px;
          gap: 8px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: rgba(0, 0, 0, 0.88);
        }
        .btn2 {
          background: #f6497f;
          color: #fff;
        }
      }
    }
  }
  </style>
  
  
  
  