<template>
    <div class="pay flex_c_c">
      <div class="pay_card">
        <p  class="pay_title">{{ elementContentList.portal_pay_title || $t('pay.title') }}<i class="el-icon-close" @click="handleClosePay"></i></p>
        <div class="method_list">
          <div class="m_item" v-for="item,index in 1" :key="item" :class="index%2 == 1 ? 'mr_0' : ''" @click="handleChange(index)">
            <p class="card_name">{{ 'paypal' }}</p>
            <p>{{ 'paypal' }}</p>
            <div class="border" :class="actIdx == index ? 'active' : ''"></div>
            <div v-if="actIdx == index"><i class="el-icon-success"></i></div>
          </div>
        </div>
        <p class="btns">
          <el-button class="btn" @click="handleClosePay">{{ elementContentList.portal_btns_cancel || $t('btns.cancel') }}</el-button>
          <el-button class="btn btn2" @click="handleConfirm">{{ elementContentList.portal_btns_confirm || $t('btns.confirm') }}</el-button>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        actIdx: 0,
        elementContentList: '',
      }
    },
    created() {
      this.elementContentList = window.elementContentList
  
    },
    methods: {
      handleConfirm() {
        this.$emit('payment', 'PAYPAL')
      },
      handleChange(val) {
        this.actIdx = val
      },
      handleClosePay() {
        this.$parent.showPayMethod = false
      },
    }
  }
  </script>
  
  <style lang="scss">
  .pay{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0,0,0,.5);
    color: #1F2126;
    .pay_card{
      width: 428px;
      padding: 24px;
      background: #fff;
      border-radius: 12px;
      .pay_title{
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        i{
          cursor: pointer;
          float: right;
          line-height: 28px;
        }
      }
      .method_list{
        margin-top: 32px;
        .m_item{
          width: 180px;
          height: 106px;
          padding: 18px;
          background: #FBF3F4;
          // background: #FFF0F0;
          border-radius: 12px;
          margin: 0 20px 20px 0;
          display: inline-block;
          position: relative;
          cursor: pointer;
          .card_name{
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            margin-bottom: 24px;
          }
          i {
            font-size: 24px;
            color: #f6497f;
            position: absolute;
            top: 12px;
            right: 12px;
          }
          .border{
            width: 180px;
            height: 106px;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0;
            &.active {
              border: 2px solid #f6497f;
              &:hover {
                border: 2px solid #f6497f;
              }
            }
            &:hover {
              border:  2px solid #ff9eb6;
            }
          }
        }
        .mr_0{
          margin-right: 0px;
        }
      }
      .btns{
        text-align: right;
        margin-top: 24px;
        .btn{
          height: 32px;
          border-radius: 6px;
          padding: 0px 16px;
          gap: 8px;
          border: 1px solid #DADDE5;
          background: #FFFFFF;
          color: #1F2126;
        }
        .btn2{
          color: #fff;
          background: #F6497F;
          border: 1px solid #F6497F;
        }
      }
    }
  }
  </style>
  
  