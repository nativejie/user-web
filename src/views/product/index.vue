<template>
    <div class="product">
      <div class="pro_container">
        <div class="pro_basic_info">
          <div class="image_info">
            <div class="image_view">
              <video v-if="videoUrl" :src="videoUrl" autoplay controls></video>
              <!-- <Video class="video" v-if="videoUrl" autoplay :src="videoUrl" :poster="poster"/> -->
              <img v-if="imageUrl" :src="imageUrl" />
              <div
                v-show="coverLayerShow && imageUrl"
                class="coverLayerMouse"
                :style="coverLayerStyle"
              ></div>
              <!-- 最顶层覆盖了整个原图空间的透明层罩 -->
              <div
                v-show="imageUrl"
                class="coverLayerMaskTop"
                @mouseenter="enterHandler"
                @mousemove="moveHandler"
                @mouseout="outHandler"
              ></div>
              <!-- 放大的图片 -->
              <div v-show="coverLayerShow && imageUrl" class="coverLayerRight">
                <img
                  :style="coverLayerImg"
                  class="coverLayerRightImg"
                  :src="imageUrl"
                  fit="contain"
                />
              </div>
            </div>
            <div class="image_list">
              <div
                class="image_item"
                :class="imageAct == index ? 'active' : ''"
                v-for="(item, index) in productDetail.picResourceVOs"
                :key="index + 'img'"
              >
                <video
                  v-if="item.playUrl"
                  @click="handleChangeImage(item, index)"
                  :src="item.playUrl"
                ></video>
                <img
                  v-else
                  @click="handleChangeImage(item, index)"
                  :src="item.thumbnailViewUrl"
                />
                <div class="active_border"></div>
              </div>
            </div>
          </div>
          <div class="spec_info">
            <p class="pro_title">{{ productDetail.name }}</p>
            <p class="unit_price">
              £ <span>{{ productDetail.price }}</span>
            </p>
            <div
              v-for="(item, index) in attributeGroupValueVOs"
              :key="index + 'attribute'"
              v-show="showSkuList"
            >
              <p class="spec_label">{{ item.productAttributeName }}</p>
              <div class="spec_color">
                <div
                  class="spec_color_item flex_c_c"
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
              {{ elementContentList.portal_product_text1 || $t("product.text1") }}
            </p>
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
              {{ elementContentList.portal_product_text2 || $t("product.text2") }}
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
              <el-button class="btn" :disabled="disabled" @click="handleBuyNow">{{
                elementContentList.portal_product_btns_btn1 ||
                $t("product.btns.btn1")
              }}</el-button>
              <el-button
                class="btn btn2"
                :disabled="disabled"
                @click="handleAddToCart"
                >{{
                  elementContentList.portal_product_btns_btn2 ||
                  $t("product.btns.btn2")
                }}</el-button
              >
            </p>
          </div>
        </div>
        <div class="pro_details_info">
          <div class="pro_about">
            <p class="pro_label">
              {{ elementContentList.portal_product_text3 || $t("product.text3") }}
            </p>
            <!-- <p class="pro_subtitle">Product information</p>
            <div class="info flex">
              <div class="info_item" v-for="item in 5" :key="item + 'in'">
                <span>Target user</span>
                <span>Target user Target user Target user Target user Target user Target user Target user </span>
              </div>
            </div> -->
            <p class="pro_subtitle">
              {{ elementContentList.portal_product_text4 || $t("product.text4") }}
            </p>
            <div class="pro_desc">
              <p
                v-for="(item, index) in productDetail.detailVOs"
                :key="index + 'detail'"
              >
                <span v-if="item.type == 'word'">{{ item.detailDesc }}</span>
                <img v-else :src="item.detailImageUrl" />
              </p>
            </div>
            <p v-if="recommendList.length > 0" class="pro_label">
              {{ elementContentList.portal_product_text5 || $t("product.text5") }}
            </p>
            <div v-if="recommendList.length > 0" class="recommend">
              <div class="recommend_roll flex">
                <div
                  v-if="recommendList.length > 4"
                  :class="multiple == 1 ? 'disabled' : ''"
                  class="to_left"
                >
                  <i @click="handleMinusIndx" class="el-icon-arrow-left"></i>
                </div>
                <div class="rec_list">
                  <div
                    class="rec_item"
                    v-for="(item, idx) in recommendList"
                    :key="idx + 'r'"
                    v-show="showIndex <= idx"
                  >
                    <div class="rec_iamge">
                      <img :src="item.masterPicUrl" />
                    </div>
                    <p class="rec_title">{{ item.recProductName }}</p>
                    <div class="rec_label flex">
                      <!-- <span>Children</span>
                      <span>xxxxxx</span> -->
                    </div>
                    <div class="rec_btn flex_b_c">
                      <span class="price">£ {{ item.price }}</span>
                      <el-button class="btn">{{
                        elementContentList.portal_product_btns_btn2 ||
                        $t("product.btns.btn2")
                      }}</el-button>
                    </div>
                  </div>
                </div>
                <div
                  v-if="recommendList.length > 4"
                  @click="handleAddIndx"
                  :class="
                    multiple == Math.ceil(this.recommendList.length / 4)
                      ? 'disabled'
                      : ''
                  "
                  class="to_right"
                >
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footerBar />
    </div>
  </template>
  
  <script>
  import footerBar from '@/components/footerBar/index'
  import { proDetail, proSerch, checkProductSkuStock, getVisibleSkuAttrValues, getSkuDetail } from '@/api/product'
  import { cartAdd } from '@/api/cart'
  import { buyGenerateConfirmOrder } from '@/api/order'
  import Video from '@/components/video/video'
  
  export default {
    name: 'product',
    components: {
      footerBar,
      Video
    },
    data () {
      return {
        imageAct: 0,
        imageUrl: '',
        videoUrl: '',
        mediaList: [],
        quantity: 1,
        showIndex: 0,
        multipleIdx: 1,
        multiple: 1,
        recommendList: [],
        Loading: false,
        coverLayerStyle: {
          transform: ""
        },
        coverLayerImg: {},
        coverLayerShow: false,
        productDetail: '',
        skuDetail: '',
        attributeGroupValueVOs: [],
        poster: '',
        showSkuList: false,
        stock: 0,
        disabled: true,
        elementContentList: '',
        totalStock: 0,
      }
    },
    watch: {
      'stock': (val) => {
      }
    },
    mounted () {
      this.elementContentList = window.elementContentList
      // this.multiple = Math.ceil(this.recommendList.length / 4)
      // console.log('this.multiple', this.multiple)
      this.getProDetail()
      // this.getProSku()
    },
    methods: {
      getProDetail () {
        const params = {
          productUid: this.$route.query.uid,
        }
        proDetail(params).then(res => {
          if (res.code == 200) {
            this.productDetail = res.data
            this.recommendList = res.data.recFormVOs || []
            this.stock = res.data.totalStock
            this.totalStock = res.data.totalStock
            this.mediaList = this.productDetail.picResourceVOs
            this.mediaList.splice(1, 0, res.data.videoResourceVOs[0])
            this.poster = res.data.videoResourceVOs[0].masterPic
            this.imageUrl = this.mediaList[0].preViewUrl
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
            if (this.attributeGroupValueVOs.length == 0 || (this.attributeGroupValueVOs.length == 1 && this.attributeGroupValueVOs[0].attributeValueVOS.length <= 1)) {
              this.showSkuList = false
              this.handleChangeAttr2()
            } else {
              this.showSkuList = true
            }
            // getSkuDetail({productBaseUid: res.data.productBaseUid}).then(res => {
            //   this.skuDetail = res.data
            // })
          }
        })
      },
      getProSku () {
        const params = {
          productBaseUid: 0,
        }
        proSku(params).then(res => {
  
        })
      },
      // 鼠标进入原图空间函数
      enterHandler () {
        // 层罩及放大空间的显示
        this.coverLayerShow = true;
      },
      // 鼠标移动函数
      moveHandler (event) {
        // 鼠标的坐标位置
        let x = event.offsetX;
        let y = event.offsetY;
        // 层罩的左上角坐标位置，并对其进行限制：无法超出原图区域左上角
        let topX = x - 100 < 0 ? 0 : x - 100;
        let topY = y - 100 < 0 ? 0 : y - 100;
        // 对层罩位置再一次限制，保证层罩只能在原图区域空间内
        if (topX > 250) {
          topX = 250;
        }
        if (topY > 250) {
          topY = 250;
        }
        // 通过 transform 进行移动控制
        this.coverLayerStyle.transform = `translate(${topX}px,${topY}px)`;
        this.coverLayerImg.transform = `translate(-${topX}px,-${topY}px)`;
        // this.coverLayerImg.transform = `translate(-${2 * topX}px,-${2 * topY}px)`;
      },
      // 鼠标移出函数
      outHandler () {
        // 控制层罩与放大空间的隐藏
        this.coverLayerShow = false;
      },
      handleMinusIndx () {
        if (this.showIndex == 1) return false
        this.showIndex = this.showIndex - 4
        this.multiple--
      },
      handleAddIndx () {
        if (this.showIndex == Math.ceil(this.recommendList.length / 4)) return false
        this.showIndex = this.showIndex + 4
        this.multiple++
      },
      handleChangeAttr2 () {
        let arr = []
        this.attributeGroupValueVOs.forEach(item => {
          item.attributeValueVOS.forEach(attr => {
            arr.push(attr.productAttributeValueUid)
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
          if (!res.data) {
            this.disabled = true
          } else {
            this.disabled = false
          }
        })
      },
      handleBuyNow () {
        if (!this.showSkuList) {
          this.handleChangeAttr2()
        }
        const params = {
          productBaseUid: this.productDetail.productBaseUid,
          productSkuUid: this.skuDetail.productSkuStockUid,
          productUid: this.productDetail.productUid,
          quantity: this.quantity
        }
  
        buyGenerateConfirmOrder(params).then(res => {
          if (res.code == 200) {
            // this.orderDetail = res.data
            // this.productList = [...res.data.confirmOrderItemList]
            this.$router.push({ path: '/settlement', query: { from: 'now', params: JSON.stringify(res.data) } })
          }
        })
      },
      handleAddToCart () {
        if (!this.showSkuList) {
          this.handleChangeAttr2()
        }
        const params = {
          productBaseUid: this.productDetail.productBaseUid,
          productSkuUid: this.skuDetail.productSkuStockUid,
          productUid: this.productDetail.productUid,
          quantity: this.quantity
        }
        cartAdd(params).then(res => {
          if (res.code == 200) {
            this.$message.success({ message: this.elementContentList.portal_product_text6 || this.$t("product.text6"), duration: 1500 })
            this.$store.dispatch('UpdateCartNum')
            // this.$router.push('/cart')
          }
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
          console.log('index~368 res：', res);
          if (!res.data) {
            this.disabled = true
          } else {
            this.disabled = false
          }
        })
      },
      handleChangeImage (val, index) {
        if (val.playUrl) {
          this.videoUrl = val.playUrl
          this.imageUrl = ''
        } else {
          this.imageUrl = val.preViewUrl
          this.videoUrl = ''
        }
        this.imageAct = index
      }
    }
  }
  </script>
  
  <style lang="scss">
  .product {
    width: 100%;
    height: calc(100% - 56px);
    background: #f5f7f8;
    overflow-y: scroll;
    font-family: Poppins;
    font-size: 14px;
    line-height: 22px;
    color: #3d3d3d;
    .pro_container {
      width: 1200px;
      background: #fff;
      min-height: 100%;
      margin: 0 auto;
      .pro_basic_info {
        width: 100%;
        padding: 58px 24px;
        display: flex;
        .image_info {
          width: 450px;
          margin-right: 24px;
          .image_view {
            width: 450px;
            height: 450px;
            border-radius: 4px;
            background: #f5f7f8;
            margin-bottom: 20px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 4px;
            }
            video {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
            .video {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
            /* 放大的图片，通过定位将左上角定位到(0,0) */
            .coverLayerRightImg {
              display: inline-block;
              width: 800px;
              height: 800px;
              position: absolute;
              top: 0;
              left: 0;
            }
            /* 右边的区域图片放大空间 */
            .coverLayerRight {
              background-color: #ffffff;
              width: 450px;
              height: 450px;
              position: relative;
              overflow: hidden;
              position: absolute;
              left: 462px;
              top: 0;
              z-index: 1001;
              border-radius: 4px;
            }
            /* 一个最高层层罩 */
            .coverLayerMaskTop {
              width: 450px;
              height: 450px;
              position: absolute;
              z-index: 1;
              top: 0;
              left: 0;
              cursor: move;
            }
            /* 层罩，通过定位将左上角定位到(0,0) */
            .coverLayerMouse {
              width: 200px;
              height: 200px;
              background: rgba(0, 0, 0, 0.3);
              opacity: 0.4;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .image_list {
            width: calc(100% + 1px);
            display: flex;
            align-items: center;
            overflow-x: hidden;
            height: 80px;
            padding: 1px;
            .image_item {
              width: 65px;
              height: 65px;
              border-radius: 4px;
              background: #f7f7f7;
              border: 1px solid #f7f7f7;
              margin-right: 12px;
              padding: 3px;
              cursor: pointer;
              img {
                width: 57px;
                height: 57px;
                border-radius: 2px;
                object-fit: contain;
              }
              video {
                width: 57px;
                height: 57px;
                border-radius: 2px;
              }
              &.active {
                position: relative;
                .active_border {
                  width: 65px;
                  height: 65px;
                  border-radius: 4px;
                  border: 1px solid #fd527d;
                  position: absolute;
                  top: -1px;
                  left: -1px;
                }
              }
            }
          }
        }
        .spec_info {
          flex: 1;
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
              text-align: center;
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
              width: 158px;
              height: 42px;
              border-radius: 999px;
              padding: 10px;
              gap: 10px;
              background: linear-gradient(0deg, #fd527d, #fd527d), #ffffff;
              color: #fff;
              font-weight: 500;
              border: none;
            }
            .btn2 {
              border: 1px solid #ffccdb;
              background: #fdf0f2;
              color: #e23f62;
            }
          }
        }
      }
      .pro_details_info {
        margin-top: 71px;
        width: 100%;
        padding: 0 24px;
        .pro_label {
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
        }
        .pro_subtitle {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          margin-top: 40px;
        }
        .info {
          margin-top: 24px;
          flex-wrap: wrap;
          padding-bottom: 22px;
          border-bottom: 1px solid #d8d8d8;
          .info_item {
            width: 50%;
            margin-bottom: 18px;
            display: flex;
            span:nth-of-type(1) {
              color: #5f5f5f;
              display: inline-block;
              width: 187px;
            }
            span:nth-of-type(2) {
              color: #000c17;
              display: inline-block;
              padding-right: 40px;
            }
          }
        }
        .pro_desc {
          padding: 11px 0 40px;
          border-bottom: 1px solid #d8d8d8;
          margin-bottom: 64px;
        }
        .recommend {
          width: 100%;
          padding: 40px 0 160px;
          border-bottom: 1px solid #d8d8d8;
          position: relative;
          .recommend_roll {
            width: calc(100% + 24px);
            // width: 100%;
            height: 372px;
            .to_left,
            .to_right {
              width: 40px;
              height: 40px;
              background: #ffffff;
              box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              i {
                font-size: 16px;
                font-weight: 600;
              }
              &.disabled {
                cursor: no-drop;
                color: #eaebee;
              }
            }
            .to_right {
              position: absolute;
              right: 0;
            }
            .rec_list {
              flex: 1;
              margin-left: 16px;
              overflow-x: hidden;
              text-wrap: nowrap;
              .rec_item {
                display: inline-block;
                width: 226px;
                height: 372px;
                border-radius: 12px;
                background: #ffffff;
                border: 1px solid #fad5d5;
                padding: 16px;
                margin-right: 24px;
                .rec_iamge {
                  width: 194px;
                  height: 194px;
                  border-radius: 8px;
                  background: #f8f1f0;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 8px;
                  }
                }
                .rec_title {
                  width: 100%;
                  margin: 12px 0;
                  text-wrap: wrap;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .rec_label {
                  span {
                    height: 26px;
                    border-radius: 999px;
                    padding: 3px 10px;
                    gap: 10px;
                    background: #fbeff2;
                    font-size: 12px;
                    color: #fd6288;
                    line-height: 20px;
                    margin-left: 8px;
                  }
                  span:first-child {
                    margin-left: 0px;
                  }
                }
                .rec_btn {
                  margin-top: 27px;
                  .price {
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 32px;
                    color: #000c17;
                  }
                  .btn {
                    width: 93px;
                    height: 26px;
                    border-radius: 4px;
                    padding: 3px 12px;
                    gap: 10px;
                    background: #fd527d;
                    font-size: 12px;
                    color: #ffffff;
                    border: none;
                  }
                }
              }
              .rec_item:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
  p {
    margin: 0;
  }
  </style>
  
  