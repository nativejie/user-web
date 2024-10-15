<template>
    <div class="footer_bar">
      <div class="footer_container">
        <div class="footer_logo">
          <p><img src="@/assets/images/logo.png"></p>
          <p>Print Your Magic Moments</p>
        </div>
        <div class="cooperate">
          <div class="Navigation">
            <p class="pink">INFO</p>
            <p @click="handleTo('/about')">ABOUT US</p>
            <p>Navigation</p>
            <p>Navigation</p>
          </div>
          <div class="Navigation">
            <p class="pink">FOLLOW US</p>
            <p>FACEBOOK</p>
            <p>INSTAGAM</p>
            <p>TWITTER</p>
            <p>TIKTOK</p>
          </div>
          <div class="Navigation">
            <p class="pink">CONTACT US</p>
            <p>E-MAIL</p>
            <p>TEL</p>
          </div>
        </div>
      </div>
      <!-- <div class="company">
        <span class="link" @click="handleShowAgreement('service')">{{ elementContentList.portal_foot_text1 || $t('foot.text1') }}</span>
        <span>|</span>
        <span class="link" @click="handleShowAgreement('privacy')">{{ elementContentList.portal_foot_text2 || $t('foot.text2') }}</span>
      </div> -->
      <terms v-if="showTerms" />
      <privacyPolicy v-if="showPrivacy" />
    </div>
  </template>
  
  <script>
  import privacyPolicy from '@/views/login/privacyPolicy'
  import terms from '@/views/login/terms.vue'
  
  export default {
    name: 'footerBar',
    components: {
      terms,
      privacyPolicy,
    },
    data() {
      return {
        elementContentList: '',
        showTerms: false,
        showPrivacy: false,
      }
    },
    created() {
      this.elementContentList = window.elementContentList
  
    },
    methods: {
      // 查看协议
      handleShowAgreement (val) {
        if(val == 'service') {
          this.showTerms = true
        } else {
          this.showPrivacy = true
        }
      },
      handleTo(path) {
        console.log('index~70 path：', path);
        this.$router.push(path);
      }
    },
  }
  </script>
  
  <style lang="scss">
  .footer_bar{
    background-color: #40001C;
    color: #fff;
    width: 100%;
    .footer_container{
      width: 1200px;
      height: 380px;
      padding-top: 93px;
      margin: 0 auto;
      display: flex;
      background-color: #40001C;
      .footer_logo{
        padding-left: 40px;
        img{
          width: 280px;
        }
        p:nth-of-type(2){
          font-family: 'Montserrat';
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin-top: 8px;
        }
      }
      .cooperate{
        flex: 1;
        display: flex;
        justify-content: space-evenly;
        .Navigation{
          p{
            color: #fff;
            margin-bottom: 24px;
          }
          p:nth-of-type(1) {
            font-size: 20px;
            font-weight: 600;
            line-height: 28px;
            margin-bottom: 20px;
          }
        }
      }
    }
    .company{
      width: 100%;
      height: 56px;
      line-height: 56px;
      background: #1E1E1E;
      text-align: center;
      color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      .link{
        cursor: pointer;
        margin: 0 16px;
      }
    }
    .pink {
      color: #FF90C0 !important;
    }
  }
  </style>
  
  