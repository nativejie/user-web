<template>
    <div class="order_placed">
      <p class="suc_img"><img src="@/assets/index/success.png" /></p>
      <p style="font-size: 24px; font-weight: 600; line-height: 32px">
        {{
          elementContentList.portal_settlement_text10 || $t("settlement.text10")
        }}
      </p>
      <div class="order_card">
        <div v-if="settlemenData.addressInfo">
          <p class="order_title">
            {{
              elementContentList.portal_settlement_text11 ||
              $t("settlement.text11")
            }}
          </p>
          <p>{{ settlemenData.addressInfo.name }}</p>
          <p class="flex_b_c">
            <span>
              {{ settlemenData.addressInfo.detailAddress + (settlemenData.addressInfo.detailAddress ? ',' : '') + settlemenData.addressInfo.detailAddressTwo + (settlemenData.addressInfo.detailAddressTwo ? ',' : '') + settlemenData.addressInfo.city + (settlemenData.addressInfo.city ? ',' : '') + settlemenData.addressInfo.country }}  
            </span>
            <span>{{ settlemenData.addressInfo.phoneNumber }}</span>
          </p>
        </div>
        <p class="detail_btns">
          <el-button class="btn" @click="handleToOrder">{{
            elementContentList.portal_settlement_btns_btn4 ||
            $t("settlement.btns.btn4")
          }}</el-button>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { qrcode, notifyPayResult, ispay } from '@/api/payment'
  
  export default {
    data () {
      return {
        settlemenData: {},
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.settlemenData = JSON.parse(this.$route.query.settlemenData)
    },
    methods: {
      handleToOrder () {
        this.$router.push({ path: '/my/order', query: { orderId: this.settlemenData.orderId } })
      },
    }
  }
  </script>
  
  <style lang="scss">
  .order_placed {
    text-align: center;
    .suc_img {
      margin: 90px 0 12px;
      img {
        width: 48px;
      }
    }
    .order_card {
      width: 454px;
      // height: 351px;
      border-radius: 12px;
      background: #ffffff;
      padding: 26px 34px 18px;
      margin: 31px auto;
      text-align: left;
      p {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
      .order_title {
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 19px;
      }
      p:nth-of-type(3) {
        margin: 12px 0 21px;
        padding-bottom: 24px;
      }
      p:nth-of-type(5) {
        span {
          font-size: 14px;
          line-height: 22px;
          opacity: 0.4;
          margin-left: 8px;
        }
      }
      .detail_btns {
        text-align: center;
        margin-top: 42px;
        .btn {
          font-size: 16px;
          line-height: 24px;
          color: #f6497f;
          width: 138px;
          height: 40px;
          border-radius: 999px;
          padding: 0px 16px;
          gap: 8px;
          border: 1px solid #ff7ba3;
          background: #fff;
        }
      }
    }
  }
  </style>
  
  