<template>
    <div class="terms flex_c_c">
        <div class="dia_body">
          <i @click="handleClose" class="el-icon-close"></i>
          <!-- <div v-if="content" class="content" v-html="content"></div> -->
          <div class="content">
            <h1 class="terms_title">Terms & Conditions</h1>
            <h3>If you are looking for details on how we use your personal information please see our <span class="link" @click="toPrivacyPolicy">Privacy Policy</span>.</h3>
            <p class="subtitle">PAYMENT AND SECURITY</p>
            <p>Our online payment system is with PayPal which allows payment using any major credit/debit cards. PayPal is a safe, secure, online payment system and is regulated by the Financial Services Authority. CUSTOMERS DO NOT REQUIRE A PAYPAL ACCOUNT TO PAY. YOU CAN SIMPLY USE A DEBIT/CREDIT CARD TO PAY INTO OUR PAYPAL ACCOUNT.</p>
            <p class="subtitle">ORDER CONFIRMATION</p>
            <p>When we have received your photo booking and deposit, we will send a confirmation e-mail with your booking details. This will be followed by a dispatched e-mail when your booking has been processed.</p>
            <p class="subtitle">GOODS</p>
            <p>We endeavour to keep <span class="link link2">www.pokidol.com</span> as up to date as possible with stock levels and also with the information available. In the unlikely event a product does go out of stock we will contact you to discuss arrangements that are suitable for you.</p>
            <p class="subtitle">RETURNS/CANCELLATIONS</p>
            <p>Please note the personal figurines products are not returnable unless damaged or faulty. We must be informed within 14 working days of the item being delivered if your item is damaged or faulty.</p>
            <p>Once your order has been placed, they go into production and cannot be cancelled or changed. If you require an item for a specific date please contact us beforehand. We do not accept requests at the confirmed order stage for items to be delivered any earlier than stated.</p>
            <p>Occasionally, we may need you rebook your time to collect your data again if the first data collection is unsuccessful.</p>
            <p>Please note that our personal figurines are bespoke products and everyone is very different. NO refunds or returns are accepted unless the product is damaged or faulty. Please ensure you follow our guideline when you take photos in our stores. We will advise if your date collection is unsuccessful.</p>
            <p class="subtitle">DELIVERIES</p>
            <p>We cannot be held responsible for delays due to bad weather or postal strikes.</p>
            <p>If your order is lost, we must be advised within 21 days of the shipment for DPD deliveries and 30 days for Royal Mail items.</p>
            <p class="subtitle">POSTAGE</p>
            <p>We generally ship your personal figurines within 4 weeks after you have confirmed your 3D model file. Due to the complicated process of producing our personal figurines, this may be a little longer in some circumstances. We will endeavour to keep you updated on your order at all times.</p>
            <p class="subtitle">LIVE DISPATCH TIMES</p>
            <p>We try to keep these as accurate as possible. However, they are to be used as a guide. If you require a gift for a specific date, please contact us first.</p>
            <p>Dispatch and delivery times are for UK customers only.</p>
            <p class="subtitle">SHOULD ANYTHING GO WRONG</p>
            <p>If we have made an error we will endeavour to correct this as soon as possible.</p>
            <p>Order confirmations are your contract agreement between you and www.pokidol.com. Any special requests for orders must be placed on the order form. We do accept requests on email before and after the order process but ultimately your order form is your binding contract for order fulfilment.</p>
            <p><span style="font-weight: 600;">Christmas Deliveries</span> - please note that the earlier Christmas deliveries are placed the more time we will have to rectify any issues. We will do our absolute best to rectify any problems before Christmas but after Royal Mail last posting dates this may be difficult.</p>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        content: '',
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.content = this.elementContentList.login_terms
      window.toPrivacyPolicy = this.toPrivacyPolicy
    },
    methods: {
      handleClose() {
        this.$parent.showTerms = false
      },
      toPrivacyPolicy() {
        this.$parent.showPrivacy = true
      },
    },
  }
  </script>
  
  <style lang="scss">
  
  .terms{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
    font-size: 14px;
    color: #3d3d3d;
    line-height: 22px;
    .dia_body{
      width: 1000px;
      height: 700px;
      background: #fff;
      border-radius: 24px;
      padding: 24px 8px 24px 24px;
      position: relative;
      .content{
        height: 100%;
        padding-right: 12px;
        overflow-y: scroll;
      }
      .el-icon-close{
        font-size: 26px;
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;
      }
      h1{
        font-size: 40px;
        margin: 12px 0;
        line-height: 46px;
      }
      .subtitle{
        font-weight: 600;
        line-height: 24px;
        margin: 8px 0;
      }
      .link{
        color: #F6497F;
        cursor: pointer;
        text-decoration: underline;
      }
      .link2{
        cursor: text;
      }
    }
  }
  // p{margin: 0;}
  </style>
  
  