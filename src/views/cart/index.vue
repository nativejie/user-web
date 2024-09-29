<template>
    <div class="shopping_cart">
      <div class="cart">
        <h1>{{ elementContentList.portal_cart_text1 || $t("cart.text1") }}</h1>
        <div class="cart_main">
          <div v-if="cartList.length > 0" class="cart_list">
            <div
              class="cart_item"
              v-for="(item, idx) in cartList"
              :key="idx + 'c'"
            >
              <!-- 普通商品 -->
              <div class="item" v-if="item.productType == 'normal'">
                <div class="flex">
                  <el-checkbox
                    v-model="item.check"
                    @change="handleChange"
                  ></el-checkbox>
                </div>
                <div class="pro_img"><img :src="item.productPicUrl" /></div>
                <div class="pro_detail">
                  <p class="pro_title">{{ item.productName }}</p>
                  <p
                    class="pro_style"
                    v-for="it in item.attributeValueVOs"
                    :key="it.productAttributeUid"
                  >
                    {{ it.productAttributeName }}: <span>{{ it.value }}</span>
                  </p>
                  <p class="quantity">
                    <span>{{
                      elementContentList.portal_cart_text4 || $t("cart.text4")
                    }}</span>
                    <el-input
                      v-model="item.quantity"
                      @input="handleInput(idx, item)"
                    ></el-input>
                    <el-button
                      class="btn btn3"
                      icon="el-icon-arrow-up"
                      @click="handleAddNum(idx, item)"
                    ></el-button>
                    <el-button
                      class="btn btn2"
                      icon="el-icon-arrow-down"
                      @click="handleMinusNum(idx, item)"
                    ></el-button>
                  </p>
                </div>
                <div class="price">
                  <p>£ {{ item.priceTotal }}</p>
                  <div>
                    <span class="edit" @click="handleEdit(item, idx)">{{
                      elementContentList.portal_btns_edit || $t("btns.edit")
                    }}</span>
                    <span @click="handleRemove(item, idx)">{{
                      elementContentList.portal_btns_remove || $t("btns.remove")
                    }}</span>
                  </div>
                </div>
              </div>
              <!-- 套餐商品 -->
              <div class="item" v-if="item.productType == 'package'">
                <div class="flex">
                  <el-checkbox
                    v-model="item.check"
                    @change="handleChange"
                  ></el-checkbox>
                </div>
                <div class="pro_img"><img :src="item.productPicUrl" /></div>
                <div class="pro_detail">
                  <p class="pro_title">{{ item.productName }}</p>
                  <div
                    class="pro_package"
                    v-for="it in item.packageProductVOList"
                    :key="it.packageProductSkuUid"
                  >
                    <div class="pack_item flex_b_c">
                      <div class="flex">
                        <div class="pack_img">
                          <img :src="it.productSkuStockThumbnail" />
                        </div>
                        <div>
                          <span>{{ it.packageProductName + ":" }}</span
                          ><span
                            v-for="(attr, idx) in it.attributeValueVOs"
                            :key="attr.productAttributeUid"
                            >{{
                              attr.value +
                              (idx == it.attributeValueVOs.length - 1 ? "" : ",")
                            }}</span
                          >
                        </div>
                      </div>
                      <div>{{ "x" + it.num }}</div>
                    </div>
                  </div>
                  <p class="quantity">
                    <span>{{
                      elementContentList.portal_cart_text4 || $t("cart.text4")
                    }}</span>
                    <el-input
                      v-model="item.quantity"
                      @input="handleInput(idx)"
                    ></el-input>
                    <el-button
                      class="btn btn3"
                      icon="el-icon-arrow-up"
                      @click="handleAddNum(idx)"
                    ></el-button>
                    <el-button
                      class="btn btn2"
                      icon="el-icon-arrow-down"
                      @click="handleMinusNum(idx)"
                    ></el-button>
                  </p>
                </div>
                <div class="price">
                  <p>£ {{ item.priceTotal }}</p>
                  <div>
                    <span class="edit" @click="handleEdit(item, idx)">{{
                      elementContentList.portal_btns_edit || $t("btns.edit")
                    }}</span>
                    <span @click="handleRemove(item, idx)">{{
                      elementContentList.portal_btns_remove || $t("btns.remove")
                    }}</span>
                  </div>
                </div>
              </div>
              <!-- 定制商品 -->
              <div class="item" v-if="item.productType == 'custom'">
                <div class="flex">
                  <el-checkbox
                    v-model="item.check"
                    @change="handleChange"
                  ></el-checkbox>
                </div>
                <div
                  class="pro_img flex_c_c"
                  style="
                    background: linear-gradient(0deg, #ffe0e0 2%, #ffdce9 100%);
                  "
                >
                  <img
                    style="width: 120px; height: 120px"
                    src="@/assets/index/logo.png"
                  />
                </div>
                <div class="pro_detail">
                  <p class="pro_title">{{ item.productName }}</p>
                  <p
                    class="pro_style"
                    v-for="it in item.cartCusObjItemVOS"
                    :key="it.cartCusItemId"
                  >
                    <span style="margin-right: 24px">{{ it.objNickname }}</span>
                    <span style="margin-right: 24px">{{
                      (it.height ? it.height + "cm" : "") +
                      (it.weight ? it.weight + "kg" : "")
                    }}</span>
                    <span style="margin-right: 24px">{{ it.ratio }}</span>
                    <span style="color: #f6497f">£ {{ it.price }}</span>
                  </p>
                  <div class="pro_info">
                    <p @click="isOpen = !isOpen">
                      <span>{{
                        elementContentList.portal_cart_text11 || $t("cart.text11")
                      }}</span>
                      <i v-if="!isOpen" class="el-icon-arrow-down"></i>
                      <i v-else class="el-icon-arrow-up"></i>
                    </p>
                    <div v-show="isOpen" style="margin-top: 16px">
                      <div
                        class="pro_item flex"
                        v-for="pro in item.cartCusServiceItemVOS"
                        :key="pro.cartCusItemId"
                      >
                        <div class="flex_c_c img">
                          <img :src="pro.productPicUrl" />
                        </div>
                        <div class="pro_name">
                          <div class="name">{{ pro.productName }}</div>
                          <div>
                            <span>{{ "x " + pro.quantity }}</span
                            ><span class="pro_price">£ {{ pro.price }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="price">
                  <p>£ {{ item.priceTotal }}</p>
                  <div>
                    <span @click="handleRemove(item, idx)">{{
                      elementContentList.portal_btns_remove || $t("btns.remove")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="cartList.length == 0" class="cart_list nodata flex_c_c">
            <p><img src="@/assets/my/noData.png" /></p>
            <p style="margin: 22px 0">{{ "Shopping cart is empty" }}</p>
          </div>
          <div class="settlement">
            <p class="subtotal">
              {{ elementContentList.portal_cart_text7 || $t("cart.text7") }} ({{
                subtotal
              }}{{ elementContentList.portal_cart_text8 || $t("cart.text8") }})
            </p>
            <hr />
            <p class="price_total">
              {{ elementContentList.portal_cart_text9 || $t("cart.text9")
              }}{{ priceTotal }}
            </p>
            <el-button
              class="checkout"
              :disabled="checkedList.length == 0"
              @click="handleToCheckout"
              >{{
                elementContentList.portal_cart_text10 || $t("cart.text10")
              }}</el-button
            >
          </div>
        </div>
      </div>
      <productInfo
        v-if="showProInfo"
        :productUid="productUid"
        :productQuantity="productQuantity"
        :productSKUDetail="productSKUDetail"
        @changeSKUUid="changeSKUUid"
        :index="index"
      />
    </div>
  </template>
  
  <script>
  import { cartDelete, fetchList, cartEdit } from '@/api/cart'
  import productInfo from './productInfo.vue'
  
  export default {
    name: 'cart',
    components: {
      productInfo
    },
    data () {
      return {
        subtotal: 1,
        priceTotal: 0,
        cartList: [],
        checkedList: [],
        productUid: '',
        productQuantity: '',
        showProInfo: false,
        elementContentList: '',
        isOpen: false,
        productSKUDetail: '',
        index: '',
        typeArr: [],
      }
    },
    mounted () {
      this.elementContentList = window.elementContentList
      this.getCartList()
    },
    methods: {
      changeSKUUid (val, qty, index) {
        this.cartList[index].attributeValueVOs = val.attributeValueVOs
        this.cartList[index].priceTotal = val.attributeValueVOs
        this.cartList[index] = {
          ...this.cartList[index],
          ...val,
          productSkuUid: val.productSkuStockUid,
          priceTotal: val.price * qty,
          quantity: qty
        }
      },
      handleEdit (val, index) {
        this.productUid = val.productUid
        this.productQuantity = val.quantity
        this.productSKUDetail = val
        this.index = index
        this.showProInfo = true
      },
      getCartList () {
        fetchList({ pageNum: 1, pageSize: 1000 }).then(res => {
          if (res.code == 200) {
            let data = []
            res.data.list.map(item => {
              let obj = {
                ...item,
                priceTotal: item.price * item.quantity,
                check: false,
              }
              data.push(obj)
            })
            this.cartList = data
            this.getPriceTotal()
          }
        })
      },
      handleToCheckout () {
        let isGroup = false
        if (this.typeArr.length > 1) isGroup = true
        this.$router.push({ path: '/settlement', query: { from: 'cart', cartIds: JSON.stringify(this.checkedList), isGroup } })
      },
      handleChange () {
        let arr = [],
          arr2 = []
        this.cartList.forEach(item => {
          if (item.check) {
            arr.push(Number(item.id))
            arr2.push(item.productType)
          }
        })
        this.checkedList = arr
        this.typeArr = [...new Set(arr2)]
        this.getPriceTotal()
      },
      getPriceTotal () {
        let price = 0
        this.cartList.forEach(item => {
          if (item.check) {
            price = price + item.quantity * item.price
          }
        })
        this.priceTotal = price
      },
      handleMinusNum (idx, val) {
        if (this.cartList[idx].quantity <= 1) return false
        const params = {
          productBaseUid: val.productBaseUid,
          productSkuUid: val.productSkuUid,
          productUid: val.productUid,
          quantity: val.quantity--,
        }
        cartEdit(val.id, params).then(res => {
          if (res.code == 200) {
            this.cartList[idx].quantity--
            this.cartList[idx].priceTotal = this.cartList[idx].quantity * this.cartList[idx].price
            if (this.cartList[idx].check) {
              this.getPriceTotal()
            }
          } else {
            this.$message.success({ message: res.message, duration: 1500 })
          }
        })
      },
      handleAddNum (idx, val) {
        if (this.cartList[idx].quantity >= 999) return false
        const params = {
          productBaseUid: val.productBaseUid,
          productSkuUid: val.productSkuUid,
          productUid: val.productUid,
          quantity: val.quantity++,
        }
        cartEdit(val.id, params).then(res => {
          if (res.code == 200) {
            this.cartList[idx].quantity++
            this.cartList[idx].priceTotal = this.cartList[idx].quantity * this.cartList[idx].price
            if (this.cartList[idx].check) {
              this.getPriceTotal()
            }
          } else {
            this.$message.success({ message: res.message, duration: 1500 })
          }
        })
      },
      handleInput (idx, val) {
        this.cartList[idx].quantity = this.cartList[idx].quantity.replace(/[^\d]/g, '')
        if (this.cartList[idx].quantity < 1) {
          this.cartList[idx].quantity = 1
          return false
        }
        if (this.cartList[idx].quantity >= 999) {
          this.cartList[idx].quantity = 999
          return false
        }
        const params = {
          productBaseUid: val.productBaseUid,
          productSkuUid: val.productSkuUid,
          productUid: val.productUid,
          quantity: val.quantity,
        }
        cartEdit(val.id, params).then(res => {
          if (res.code == 200) {
            this.cartList[idx].priceTotal = this.cartList[idx].quantity * this.cartList[idx].price
            if (this.cartList[idx].check) {
              this.getPriceTotal()
            }
          } else {
            this.$message.success({ message: res.message, duration: 1500 })
          }
        })
      },
      handleRemove (val, idx) {
        if (val.productType == 'custom') {
          const h = this.$createElement
          let text1 = this.elementContentList.portal_cart_msg2 || this.$t('cart.msg2')
          let text2 = this.elementContentList.portal_cart_msg3 || this.$t('cart.msg3')
          let text3 = this.elementContentList.portal_btns_remove || this.$t('btns.remove')
          let text4 = this.elementContentList.portal_btns_cancel || this.$t('btns.cancel')
          this.$msgbox({
            message: h('div', null, [
              h('p', { style: 'font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;' }, text1),
              h('p', null, text2),
            ]),
            cancelButtonClass: 'cancel_btn',
            confirmButtonClass: 'confirm_btn',
            showCancelButton: true,
            confirmButtonText: text3,
            cancelButtonText: text4,
            type: 'warning'
          }).then(() => {
            cartDelete(val.id).then(res => {
              if (res.code == 200) {
                this.cartList.splice(idx, 1)
                this.$message.success({ message: this.elementContentList.portal_cart_msg1 || this.$t("cart.msg1"), duration: 1500 })
                this.$store.dispatch('UpdateCartNum')
              }
            })
          }).catch(() => {
          })
        } else {
          cartDelete(val.id).then(res => {
            if (res.code == 200) {
              this.cartList.splice(idx, 1)
              this.$message.success({ message: this.elementContentList.portal_cart_msg1 || this.$t("cart.msg1"), duration: 1500 })
              this.$store.dispatch('UpdateCartNum')
            }
          })
        }
      },
    }
  }
  </script>
  
  <style lang="scss">
  .shopping_cart {
    width: 100%;
    height: calc(100% - 56px);
    overflow-y: scroll;
    background: #f6f7fb;
    color: #3d3d3d;
    .cart {
      padding-top: 36px;
      width: 1152px;
      height: 100%;
      margin: 0 auto;
      h1 {
        margin: 0 0 36px 0;
        font-size: 30px;
        font-weight: 600;
        line-height: 38px;
      }
      .cart_main {
        width: 100%;
        display: flex;
        height: calc(100% - 80px);
        .cart_list {
          width: 897px;
          .cart_item {
            border-radius: 12px;
            background: #ffffff;
            padding: 19px 21px 19px 12px;
            margin-bottom: 17px;
            .item {
              display: flex;
            }
            .pro_img {
              width: 150px;
              height: 150px;
              border-radius: 8px;
              margin-left: 12px;
              background: #797979;
              img {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                object-fit: contain;
              }
            }
            .pro_detail {
              margin-left: 17px;
              flex: 1;
              .pro_title {
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                margin: 0 0 9px 0;
              }
              .pro_style {
                font-size: 12px;
                font-weight: 500;
                line-height: 20px;
                margin: 9px 0;
                span {
                  font-weight: 400;
                }
              }
              .pro_info {
                width: 100%;
                padding: 12px;
                background: #f8f9fc;
                border-radius: 8px;
                font-size: 14px;
                i {
                  float: right;
                }
                .pro_item {
                  margin-bottom: 12px;
                  .img {
                    width: 40px;
                    height: 40px;
                    border-radius: 3px;
                    margin-right: 12px;
                    img {
                      width: 100%;
                      height: 100%;
                      border-radius: 3px;
                      object-fit: contain;
                    }
                  }
                  .pro_name {
                    flex: 1;
                    .name {
                      width: 100%;
                      overflow: hidden;
                      text-overflow: ellipsis; // 溢出显示省略号
                      display: -webkit-box; // 弹性盒子
                      -webkit-box-orient: vertical; // 上下垂直排列
                      -webkit-line-clamp: 1; // 显示行数（数字可调整）
                      margin-bottom: 4px;
                    }
                    span {
                      margin-right: 16px;
                      font-size: 12px;
                    }
                    .pro_price {
                      color: #f6497f;
                    }
                  }
                }
              }
            }
            .quantity {
              position: relative;
              span {
                font-size: 14px;
                line-height: 22px;
              }
              .el-input {
                width: 80px;
                margin-left: 8px;
              }
              .el-input__inner {
                width: 80px;
                height: 32px;
                border-radius: 6px;
                padding: 0px 16px;
                gap: 8px;
                background: #ffffff;
                box-sizing: border-box;
                border: 1px solid rgba(0, 0, 0, 0.15);
              }
              .el-input__inner:focus {
                border: 1px solid #f6497f;
              }
              .btn {
                width: 21px;
                height: 16px;
                padding: 0;
                position: absolute;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background: #fff;
                color: rgba(0, 0, 0, 0.25);
                border-right: none;
              }
              .btn3 {
                top: 1px;
                left: 95px;
                border-radius: 0 6px 0 0;
                border-top: none;
              }
              .btn2 {
                left: 85px;
                bottom: 1px;
                border-radius: 0 0 6px 0;
                border-bottom: none;
              }
            }
            .price {
              text-align: right;
              width: 100px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .edit {
                color: #f6497f;
                margin-bottom: 6px;
              }
              p:nth-of-type(1) {
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                margin-bottom: 101px;
              }
              span {
                display: block;
                font-size: 14px;
                font-weight: normal;
                line-height: 22px;
                cursor: pointer;
              }
            }
            .pro_package {
              line-height: 32px;
              height: 32px;
              margin-bottom: 8px;
              .pack_item {
                font-size: 12px;
                font-weight: 500;
                .pack_img {
                  width: 32px;
                  height: 32px;
                  border-radius: 4px;
                  margin-right: 16px;
                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    object-fit: contain;
                  }
                }
              }
            }
          }
        }
        .nodata {
          border-radius: 12px;
          background: #ffffff;
          flex-direction: column;
          margin-bottom: 30px;
          img {
            width: 287px;
          }
        }
        .settlement {
          width: 241px;
          height: 177px;
          border-radius: 12px;
          background: #ffffff;
          margin-left: 14px;
          padding: 14px 20px 20px;
          .subtotal {
            margin: 0 0 11px;
          }
          hr {
            border: none;
            border-top: 1px solid #d8d8d8;
            margin: 0;
          }
          .price_total {
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
            margin: 19px 0 25px;
          }
          .checkout {
            width: 100%;
            height: 32px;
            border-radius: 6px;
            padding: 0px 16px;
            gap: 8px;
            background: #f6497f;
            box-sizing: border-box;
            border: none;
            color: #fff;
            font-size: 14px;
            line-height: 22px;
          }
        }
      }
    }
  }
  </style>
  
  