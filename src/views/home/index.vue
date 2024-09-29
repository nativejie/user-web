<template>
    <div class="app_home">
      <!-- 顶部视频 -->
      <div class="top_card">
        <div class="top_card_main">
          <div class="card_left">
            <p class="index_top"><img src="@/assets/index/indexTop.png" /></p>
            <p class="top_text">
              {{ elementContentList.portal_home_text1 || $t("home.text1") }}
            </p>
            <p class="top_text">
              {{ elementContentList.portal_home_text2 || $t("home.text2") }}
            </p>
            <p>
              <el-button class="top_btn" @click="handleToCustom">{{
                elementContentList.portal_home_btns_btn1 || $t("home.btns.btn1")
              }}</el-button>
            </p>
          </div>
          <div class="card_right">
            <div class="right_main">
              <video :src="playUrl" controls></video>
            </div>
          </div>
        </div>
      </div>
      <div class="home_container">
        <!-- 跳转 -->
        <div class="part_two">
          <p class="part_two_title">
            {{ elementContentList.portal_home_text3 || $t("home.text3") }}
          </p>
          <div style="display: flex; margin-top: 64px">
            <div
              class="part_two_left"
              v-for="(item, index) in sectionList"
              :key="index + 'se'"
            >
              <div style="width: 430px">
                <p class="sub_title">
                  <span>{{ "0" + (index + 1) }}</span>
                  <span>{{ item.title }}</span>
                </p>
                <p class="describe">{{ item.description }}</p>
                <div class="op_card flex_b_c">
                  <div class="image">
                    <img :src="item.thumbnailViewUrl" />
                  </div>
                  <div class="btns">
                    <el-button @click="handleToCustom" class="btn"
                      >{{
                        elementContentList.portal_home_text6 || $t("home.text6")
                      }}<svg-icon
                        icon-class="arrow"
                        style="
                          width: 16px;
                          height: 16px;
                          position: relative;
                          top: -2px;
                        "
                      ></svg-icon
                    ></el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 推荐商品 -->
      <div class="part_three">
        <div class="part_main">
          <p class="part_three_title">
            {{ elementContentList.portal_home_title || $t("home.title") }}
          </p>
          <div class="product_list">
            <div
              class="pro_item"
              :class="activeIdx == index ? 'active' : ''"
              :style="index % 4 == 3 ? { marginRight: '0px' } : ''"
              v-for="(item, index) in productList"
              :key="index.recProductSkuUid"
              @click="handleChangeProItem(index, item)"
            >
              <div class="active_border"></div>
              <div class="pro_img">
                <img :src="item.skuPicUrl" />
              </div>
              <p class="pro_title">{{ item.productName || "-" }}</p>
              <p class="pro_price">£ {{ item.skuPrice }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 案例展示 -->
      <div class="part_four">
        <p class="part_four_title">
          {{ elementContentList.portal_home_text4 || $t("home.text4") }}
        </p>
        <div class="part_four_container">
          <div class="image_main">
            <!-- 第一行 -->
            <div
              class="image_list"
              v-for="(item, index) in pictureList"
              :key="index + 'pic'"
              v-show="item.length == 5"
            >
              <div class="image_list2">
                <div class="img_ani">
                  <div
                    class="image_item"
                    v-for="child in item"
                    :key="child.ossNo"
                  >
                    <img :src="child.preViewUrl" />
                  </div>
                </div>
                <div class="img_ani">
                  <div
                    class="image_item"
                    v-for="child in item"
                    :key="child.ossNo"
                  >
                    <img :src="child.preViewUrl" />
                  </div>
                </div>
                <div class="img_ani">
                  <div
                    class="image_item"
                    v-for="child in item"
                    :key="child.ossNo"
                  >
                    <img :src="child.preViewUrl" />
                  </div>
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
  import { videoList, skuPage, picList, productPage, sectionPicList } from '@/api/home'
  import { checkExist } from '@/api/custom'
  
  export default {
    name: 'home',
    components: {
      footerBar
    },
    data () {
      return {
        productList: [],
        activeIdx: 0,
        playUrl: '',
        pictureList: [],
        sectionList: [],
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.getskuPage()
      this.getData()
    },
    methods: {
      handleToCustom () {
        checkExist().then(res => {
          if (res.data == false) {
            this.$router.push('/custom')
          }
        })
      },
      handleGeneral () {
        this.$router.push('/general')
      },
      group (array, subNum) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
          newArray.push(array.slice(index, index += subNum));
        }
        return newArray;
      },
      getData () {
        videoList().then(res => {
          if (res.data) {
            this.playUrl = res.data[0].playUrl
          }
        })
        picList().then(res => {
          // this.pictureList = res.data
          this.pictureList = this.group(res.data, 5);
        })
        sectionPicList().then(res => {
          this.sectionList = res.data
        })
      },
      getskuPage () {
        const params = {
          pageNum: 1,
          pageSize: 10,
          keyword: '',
        }
        productPage(params).then(res => {
          this.productList = res.data.list
        })
      },
      handleChangeProItem (index, val) {
        this.activeIdx = index
        this.$router.push({ path: '/product', query: { uid: val.recProductUid } })
      }
    }
  }
  </script>
  
  <style lang="scss">
  .app_home {
    width: 100%;
    height: calc(100% - 56px);
    font-family: Poppins;
    font-size: 14px;
    line-height: 22px;
    overflow-y: scroll;
    .top_card {
      width: 100%;
      height: 550px;
      background: #fff9f9;
      .top_card_main {
        width: 1152px;
        margin: 0 auto;
        padding: 50px;
        display: flex;
        justify-content: space-between;
        .card_left {
          .index_top {
            margin-bottom: 53px;
            img {
              width: 374px;
            }
          }
          .top_text {
            font-family: "Montserrat";
            font-size: 48px;
            font-weight: 900;
            line-height: 72px;
            font-feature-settings: "kern" on;
            color: #000c17;
            margin-bottom: 8px;
          }
          .top_btn {
            margin-top: 53px;
            width: 196px;
            height: 56px;
            border-radius: 999px;
            padding: 10px;
            gap: 10px;
            background: linear-gradient(106deg, #fe686f -2%, #ef2494 100%);
            box-shadow: 0px 16px 33px 0px rgba(233, 50, 120, 0.3);
            color: #ffffff;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
          }
        }
        .card_right {
          margin-left: 118px;
          .right_main {
            width: 606px;
            height: 449px;
            border-radius: 36px;
            background: #fde7e7;
            video {
              width: 100%;
              height: 100%;
              border-radius: 36px;
            }
          }
        }
      }
    }
    .home_container {
      width: 1152px;
      margin: 0 auto;
      .part_two {
        margin-top: 94px;
        .part_two_title {
          text-align: center;
          font-size: 48px;
          font-weight: 600;
          line-height: 46px;
          color: #000c17;
        }
        .part_two_left,
        .part_two_right {
          width: 50%;
        }
        .sub_title {
          span:nth-of-type(1) {
            font-size: 28px;
            font-weight: 900;
            line-height: 46px;
            color: #f1c5c5;
            margin-right: 23px;
          }
          span:nth-of-type(2) {
            font-size: 28px;
            font-weight: 600;
            line-height: 46px;
            color: #3d3d3d;
          }
        }
        .describe {
          margin-top: 16px;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          color: #9498a0;
        }
        .op_card {
          margin-top: 33px;
          .image {
            width: 256px;
            height: 256px;
            border-radius: 20px;
            background: #fff9f9;
            padding: 34px 10px 23px;
            img {
              width: 235px;
              object-fit: contain;
            }
          }
          .btns {
            height: 256px;
            display: flex;
            align-items: flex-end;
            .btn {
              width: 113px;
              height: 48px;
              border-radius: 999px;
              padding: 10px;
              gap: 4px;
              background: #fbeff0;
              border: none;
              font-size: 20px;
              font-weight: 600;
              line-height: 28px;
              color: #fd6289;
            }
          }
        }
      }
    }
    .part_three {
      margin-top: 116px;
      background: linear-gradient(122deg, #ffb1cc 1%, #ff82a5 100%);
      .part_three_title {
        font-family: Poppins;
        font-size: 48px;
        font-weight: bold;
        line-height: 46px;
        color: #ffffff;
        margin-bottom: 100px;
      }
      .part_main {
        width: 1152px;
        margin: 0 auto;
        padding: 66px 0;
      }
      .product_list {
        display: flex;
        flex-wrap: wrap;
        .pro_item {
          width: 264px;
          height: 384px;
          border-radius: 12px;
          box-sizing: border-box;
          border: 1px solid #fad5d5;
          padding: 16px;
          background: #fff;
          margin: 0 32px 64px 0;
          .pro_img {
            width: 232px;
            height: 232px;
            background: #f8f0f0;
            border-radius: 8px;
            margin-bottom: 16px;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 8px;
            }
          }
          .pro_title {
            font-weight: 500;
            color: #000c17;
            margin-bottom: 20px;
          }
          .pro_label {
            width: 100%;
            margin-bottom: 16px;
            span {
              height: 26px;
              display: inline-block;
              padding: 3px 10px;
              border-radius: 999px;
              gap: 10px;
              background: #fbeff2;
              font-size: 12px;
              line-height: 20px;
              color: #fd6288;
            }
          }
          .pro_price {
            font-size: 20px;
            font-weight: bold;
            line-height: 32px;
            color: #1f2126;
          }
          &.active {
            position: relative;
            .active_border {
              width: 270px;
              height: 388px;
              border-radius: 15px;
              border: 4px solid #f56473;
              box-shadow: 0px 23px 40px -12px #ffd9dd;
              position: absolute;
              top: -4px;
              left: -4px;
            }
          }
        }
      }
    }
    .part_four {
      width: 100%;
      .part_four_title {
        font-size: 48px;
        font-weight: bold;
        line-height: 46px;
        text-align: center;
        color: #000c17;
        margin-top: 155px;
      }
      .part_four_container {
        width: 100%;
        margin-top: 92px;
        .image_main {
          margin: 0 auto;
        }
        .image_list {
          width: 100%;
          margin-bottom: 16px;
          overflow: hidden;
          position: relative;
          @keyframes Animation {
            0% {
              transform: translateX(0%);
              /* transform: translateX(200px); */
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .image_list2 {
            display: flex;
            .img_ani {
              display: flex;
              animation: Animation 20s linear infinite;
              animation-duration: 50s;
            }
          }
          .image_item {
            border-radius: 8px;
            margin: 0 12px;
            img {
              width: auto;
              height: 401px;
              object-fit: contain;
              border-radius: 8px;
            }
          }
        }
        .image_list::before {
          background-image: -webkit-linear-gradient(
            left,
            #fff,
            rgba(255, 249, 249, 0)
          );
          content: "";
          height: 120%;
          left: -15px;
          position: absolute;
          top: -10px;
          width: 100px;
          z-index: 2;
        }
        .image_list::after {
          background-image: -webkit-linear-gradient(
            right,
            #fff9f9,
            rgba(255, 249, 249, 0)
          );
          content: "";
          height: 120%;
          position: absolute;
          right: -15px;
          top: -10px;
          width: 100px;
          z-index: 2;
        }
      }
    }
  }
  p {
    margin: 0;
  }
  </style>
  
  
  