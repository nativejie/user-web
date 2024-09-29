<template>
    <div class="productInfo flex_c_c">
      <div class="info_card">
        <p class="dia_title">
          {{
            elementContentList.portal_custom_basic_productInfo_title ||
            $t("custom.basic.productInfo.title")
          }}<i @click="handleClose" class="el-icon-close"></i>
        </p>
        <div class="info_container">
          <div class="info_left">
            <div class="info_image">
              <img :src="productDetail.masterPicUrl" />
            </div>
          </div>
          <div class="info_right">
            <p class="pro_title">{{ productDetail.name }}</p>
            <p class="unit_price">
              £ <span>{{ productDetail.price }}</span>
            </p>
            <div
              v-for="(item, index) in attributeGroupValueVOs"
              :key="index + 'attribute'"
            >
              <p class="spec_label">{{ item.productAttributeName }}</p>
              <div class="spec_color">
                <div
                  class="spec_color_item flex"
                  :class="attr.check == true ? 'active' : ''"
                  v-for="(attr, idx) in item.attributeValueVOS"
                  :key="attr.productAttributeValueUid"
                  @click="handleChangeAttr(item, index, attr, idx)"
                >
                  <!-- <img v-if="index == 0" src="@/assets/images/e2.png"> -->
                  <span>{{ attr.value }}</span>
                  <div class="active_border"></div>
                </div>
              </div>
            </div>
            <p class="spec_label">
              {{ elementContentList.portal_order_text33 || $t("order.text33") }}
            </p>
            <p class="qty_btns flex">
              <el-button
                class="btn"
                icon="el-icon-minus"
                @click="handleMinusQty"
              ></el-button>
              <el-input v-model="quantity" @input="handleInput" />
              <el-button
                class="btn"
                icon="el-icon-plus"
                @click="handleAddQty"
              ></el-button>
            </p>
            <p class="buy_btns">
              <el-button class="btn" @click="handleConfirm">{{
                elementContentList.portal_btns_confirm || $t("btns.confirm")
              }}</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { proDetail } from '@/api/product'
  
  export default {
    props: {
      // productDetail: {
      //   type: Object,
      //   default: () => { }
      // },
      editServiceProduct: {
        type: Object,
        default: () => { }
      },
    },
    data () {
      return {
        quantity: '',
        attributeGroupValueVOs: [],
        productDetail: '',
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      proDetail({ productUid: this.editServiceProduct.productUid }).then(res => {
        this.productDetail = res.data
        this.productDetail.attributeGroupValueVOs.map(item => {
          let arr = []
          item.attributeValueVOS.forEach(attr => {
            let obj = {
              ...attr,
              check: false,
            }
            arr.push(obj)
          })
          let obj2 = {
            ...item,
            attributeValueVOS: arr,
          }
          this.attributeGroupValueVOs.push(obj2)
        })
      })
    },
    methods: {
      handleClose () {
        this.$parent.showProInfo = false
      },
      handleConfirm () {
  
      },
      handleChangeAttr (parent, index, val, idx) {
        this.attributeGroupValueVOs[index].attributeValueVOS.forEach(item => {
          if (item.productAttributeValueUid == val.productAttributeValueUid) {
            item.check = true
          } else {
            item.check = false
          }
        })
        let arr = []
        this.attributeGroupValueVOs.forEach(item => {
          item.attributeValueVOS.forEach(attr => {
            if (attr.check) {
              arr.push(attr.productAttributeValueUid)
            }
          })
        })
        const params = {
          productAttributeValueUidList: arr,
          productBaseUid: this.productDetail.productBaseUid
        }
        getVisibleSkuAttrValues(params).then(res => {
  
        })
        getSkuDetail(params).then(res => {
          this.skuDetail = res.data
        })
        checkProductSkuStock(params).then(res => {
  
        })
      },
      handleInput () {
        this.quantity = this.quantity.replace(/[^\d]/g, '')
        if (this.quantity < 1) return this.quantity = ''
      },
      handleMinusQty () {
        if (this.quantity <= 1) return false
        this.quantity--
      },
      handleAddQty () {
        this.quantity++
      },
    }
  }
  </script>
  
  <style lang="scss">
  .productInfo {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
    .info_card {
      width: 1031px;
      height: 752px;
      border-radius: 10px;
      padding: 40px;
      gap: 24px;
      background: #ffffff;
      overflow-y: scroll;
      .dia_title {
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        i {
          float: right;
          font-size: 20px;
          cursor: pointer;
        }
      }
      .info_container {
        display: flex;
        margin-top: 24px;
        .info_left {
          margin-right: 25px;
          .info_image {
            width: 297px;
            height: 297px;
            border-radius: 8px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
              object-fit: contain;
            }
          }
        }
        .info_right {
          .pro_title {
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
          }
          .unit_price {
            font-weight: 500;
            font-size: 16px;
            line-height: 28px;
            color: #ff4d6b;
            margin-top: 24px;
            span {
              font-size: 28px;
              font-weight: 600;
            }
          }
          .spec_label {
            margin: 24px 0 16px;
          }
          .spec_color {
            display: flex;
            flex-wrap: wrap;
            .spec_color_item {
              padding: 8px;
              border: 1px solid #dfe2e5;
              border-radius: 4px;
              margin: 0 12px 12px 0;
              min-width: 40px;
              cursor: pointer;
              img {
                width: 40px;
                height: 40px;
                object-fit: contain;
                border-radius: 2px;
                margin-right: 16px;
              }
              &.active {
                border: 1px solid #fd527d;
                background: linear-gradient(0deg, #fdecef, #fdecef), #ffffff;
              }
            }
          }
          .spec_text {
            display: flex;
            flex-wrap: wrap;
            .spec_text_item {
              padding: 6px 20px;
              border: 1px solid #dfe2e5;
              border-radius: 4px;
              margin: 0 12px 12px 0;
              cursor: pointer;
              img {
                width: 40px;
                height: 40px;
                object-fit: contain;
                border-radius: 2px;
                margin-right: 16px;
              }
              &.active {
                border: 1px solid #fd527d;
                background: linear-gradient(0deg, #fdecef, #fdecef), #ffffff;
              }
            }
          }
          .qty_btns {
            .btn {
              width: 32px;
              height: 32px;
              gap: 8px;
              border: 1px solid #dfe2e5;
              padding: 0;
              background: #fff;
              color: #444;
              border-radius: 6px;
            }
            .el-input {
              width: 80px;
              margin: 0 4px;
            }
            .el-input__inner {
              width: 80px;
              height: 32px;
              border-radius: 6px;
              border: 1px solid rgba(0, 0, 0, 0.15);
              text-align: center;
            }
          }
          .buy_btns {
            margin-top: 48px;
            .btn {
              width: 240px;
              height: 40px;
              border-radius: 999px;
              padding: 0 16px;
              gap: 10px;
              background: #f6497f;
              color: #fff;
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
              border: none;
            }
          }
        }
      }
    }
  }
  </style>
  
  