<template>
    <div class="productInfo flex_c_c">
      <div class="info_card">
        <p class="dia_title">
          {{ elementContentList.portal_order_text14 || $t("order.text14")
          }}<i @click="handleClose" class="el-icon-close"></i>
        </p>
        <div class="info_container">
          <div class="info_left">
            <div class="info_image">
              <img :src="imageUrl" />
            </div>
          </div>
          <div class="info_right">
            <p class="pro_title">
              {{ productDetail.name }}
            </p>
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
            <p class="spec_label">{{ elementContentList.portal_product_text1 || $t("product.text1") }}</p>
            <div
              style="
                padding: 8px;
                border: 1px solid #dfe2e5;
                border-radius: 4px;
                width: fit-content;
                min-width: 40px;
                text-align: center;
              "
            >
              {{ stock }}
            </div>
            <p class="spec_label">
              {{ elementContentList.portal_order_text33 || $t("order.text33") }}
            </p>
            <p class="qty_btns flex">
              <el-button
                class="btn"
                @click="handleMinusNum"
                icon="el-icon-minus"
              ></el-button>
              <el-input v-model="quantity" @input="handleInput" />
              <el-button
                class="btn"
                @click="handleAddNum"
                icon="el-icon-plus"
              ></el-button>
            </p>
            <p class="buy_btns">
              <el-button :loading="loading" :disabled="disabled" class="btn" @click="handleConfirm">{{
                elementContentList.portal_btns_confirm || $t("btns.confirm")
              }}</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { proDetail, proSerch, checkProductSkuStock, getVisibleSkuAttrValues, getSkuDetail } from '@/api/product'
  import { cartEdit } from '@/api/cart'
  
  export default {
    props: {
      productSKUDetail: {
        type: Object,
        default: () => { }
      },
      productUid: {
        type: String,
        default: ''
      },
      productQuantity: {
        type: Number,
        default: 1
      },
      index: {
        type: Number,
        default: 1
      },
    },
    data () {
      return {
        quantity: 1,
        attributeGroupValueVOs: [],
        productDetail: '',
        imageUrl: '',
        elementContentList: '',
        stock: 0,
        disabled: false,
        skuDetail: '',
        loading: false,
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.quantity = this.productQuantity
      this.getProDetail()
      this.getskuStock()
    },
    methods: {
      getProDetail () {
        const params = {
          productUid: this.productUid,
        }
        proDetail(params).then(res => {
          if (res.code == 200) {
            this.productDetail = res.data
            this.imageUrl = res.data.picResourceVOs[0].preViewUrl
            this.productDetail.attributeGroupValueVOs.map(item => {
              let arr = []
              item.attributeValueVOS.forEach(attr => {
                let check = false
                this.productSKUDetail.attributeValueVOs.map(sku => {
                  if(attr.productAttributeValueUid == sku.productAttributeValueUid) {
                    check = true
                  }
                })
                let obj = {
                  ...attr,
                  check,
                }
                arr.push(obj)
              })
              let obj2 = {
                ...item,
                attributeValueVOS: arr,
              }
              this.attributeGroupValueVOs.push(obj2)
            })
          }
        })
      },
      getskuStock () {
        let arr = []
        this.productSKUDetail.attributeValueVOs.forEach(item => {
            arr.push(item.productAttributeValueUid)
        })
        const params = {
          productAttributeValueUidList: arr,
          productBaseUid: this.productSKUDetail.productBaseUid
        }
        getVisibleSkuAttrValues(params).then(res => {
  
        })
        getSkuDetail(params).then(res => {
          this.skuDetail = res.data
          this.stock = res.data.realStock
        })
        checkProductSkuStock(params).then(res => {
          if (!res.data) {
            this.disabled = true
          } else {
            this.disabled = false
          }
        })
      },
      handleClose () {
        this.$parent.showProInfo = false
      },
      handleConfirm () {
        this.loading = true
        const params = {
          productBaseUid: this.productSKUDetail.productBaseUid,
          productSkuUid: this.skuDetail.productSkuStockUid,
          productUid: this.productUid,
          quantity: this.quantity,
        }
        cartEdit(this.productSKUDetail.id, params).then(res => {
          if(res.code == 200){
            this.$parent.showProInfo = false
            this.$message.success({message: this.elementContentList.portal_cart_msg4 || this.$t('cart.msg4'), duration: 1500})
            this.$emit('changeSKUUid', this.skuDetail, this.quantity, this.index)
          } else {
            this.$message.success({message: res.message, duration: 1500})
          }
        })
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
        let arr2 = []
        this.attributeGroupValueVOs.forEach(item => {
          item.attributeValueVOS.forEach(attr => {
            if (attr.check) {
              arr.push(attr.productAttributeValueUid)
              arr2.push(attr.check)
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
          if (arr2.length == this.attributeGroupValueVOs.length) {
            this.stock = res.data.realStock || 0
          } else {
            this.stock = this.productDetail.realStock || this.totalStock
          }
        })
        checkProductSkuStock(params).then(res => {
          if (!res.data) {
            this.disabled = true
          } else {
            this.disabled = false
          }
        })
      },
      handleInput () {
        this.quantity = this.quantity.replace(/[^\d]/g, '')
        if (this.quantity < 1) return this.quantity = 1
        if (this.quantity >= 999) return this.quantity = 999
      },
      handleMinusNum () {
        if (this.quantity <= 1) return false
        this.quantity--
      },
      handleAddNum () {
        if (this.quantity >= 999) return false
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
      // height: 752px;
      border-radius: 10px;
      padding: 40px;
      gap: 24px;
      background: #ffffff;
      .dia_title {
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin: 0;
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
            margin: 16px 0 8px;
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
  
  