<template>
  <div class="app_home">
    <!-- 顶部banner -->
    <div class="top-banner">
      <div class="top-banner-menu">
        <a href="#work">
          <div class="icon-container" data-position="left">
            <img class="icon" src="@/assets/icon/work.png" />
            <div class="animation-button">
              <img src="@/assets/icon/work-in.png" />
              <span class="btn-text"> How It Works</span>
            </div>
          </div>
        </a>
        <a href="#store">
          <div class="icon-container" data-position="center">
            <img class="icon" src="@/assets/icon/store.png" />
            <div class="animation-button">
              <img src="@/assets/icon/store-in.png" />
              <span class="btn-text">Gallery</span>
            </div>
          </div>
        </a>
        <a href="#gallery">
          <div class="icon-container" data-position="right">
            <img class="icon" src="@/assets/icon/gallery.png" />
            <div class="animation-button">
              <img src="@/assets/icon/gallery-in.png" />
              <span class="btn-text">Pokidol Store</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div id="work" class="flex-column-center">
      <img src="@/assets/images/work-title.png" />
      <img src="@/assets/images/work-01.png" />
      <img src="@/assets/images/work-02.png" />
      <img src="@/assets/images/work-03.png" />
      <img src="@/assets/images/work-04.png" />
      <img src="@/assets/images/work-05.png" />
      <img
        src="@/assets/images/work-btn.png"
        class="work-btn"
        @click="handleToCustom"
      />
    </div>
    <div id="store" class="flex-column-center">
      <div class="store-title">
        <img src="@/assets/images/store-title.png" />
        <div
          class="btn"
          @click="() => console.log(`%c see more`, 'color: #ff6700')"
        ></div>
      </div>
      <div class="store-item-list">
        <div
          v-for="(item, index) in productList"
          class="store-item"
          :key="index"
        >
          <div>
            <img :src="item.skuPicUrl" class="store-item-img" />
            <p class="store-item-title">{{ item?.productName }}</p>
          </div>
          <div class="store-item-bottom-line">
            <p class="store-item-price">£ {{ item?.skuPrice }}</p>
            <img
              src="@/assets/images/store-item-btn.png"
              class="btn"
              @click="handleChangeProItem(index, item)"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="gallery" class="flex-column-center">
      <div class="gallery-title">
        <img src="@/assets/images/gallery-title.png" />
        <div
          class="btn"
          @click="() => console.log(`%c see more`, 'color: #ff6700')"
        ></div>
      </div>
      <!-- 第一行 -->
      <div
        class="image_list"
        v-for="(item, index) in pictureList"
        :key="index + 'pic'"
        v-show="item.length == 5"
      >
        <div class="image_list2">
          <div class="img_ani">
            <div class="image_item" v-for="child in item" :key="child.ossNo">
              <img :src="child.preViewUrl" />
            </div>
          </div>
          <div class="img_ani">
            <div class="image_item" v-for="child in item" :key="child.ossNo">
              <img :src="child.preViewUrl" />
            </div>
          </div>
          <div class="img_ani">
            <div class="image_item" v-for="child in item" :key="child.ossNo">
              <img :src="child.preViewUrl" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="qa flex-column-center">
      <img src="@/assets/images/qa.png" />
      <el-collapse
        class="qa-collapse"
        v-model="activeNames"
        @change="handleChange"
      >
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
          <div>
            在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
          </div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>
            控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          </div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>
            清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          </div>
          <div>
            帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
          </div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>
            用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          </div>
          <div>
            结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <footerBar />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import footerBar from "@/components/footerBar/index";
import {
  videoList,
  skuPage,
  picList,
  productPage,
  sectionPicList,
} from "@/api/home";
import { checkExist } from "@/api/custom";

export default {
  name: "home",
  components: {
    footerBar,
  },
  data() {
    return {
      productList: [],
      activeIdx: 0,
      playUrl: "",
      pictureList: [],
      sectionList: [],
      elementContentList: "",
      // loginDialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.elementContentList = window.elementContentList || {};
    const iconContainers = document.querySelectorAll(".icon-container");

    iconContainers.forEach((container, index) => {
      container.addEventListener("mouseenter", () => {
        console.log("container");
        iconContainers.forEach((otherContainer) => {
          if (otherContainer !== container) {
            otherContainer.classList.add("hidden"); // 隐藏其他图标
          } else {
            container.classList.add("hover-active"); // 当前图标执行动画
          }
        });
      });

      container.addEventListener("mouseleave", () => {
        iconContainers.forEach((otherContainer) => {
          otherContainer.classList.remove("hidden"); // 其他图标重新显示
          container.classList.remove("hover-active"); // 恢复当前图标状态
        });
      });
    });
  },
  methods: {
    handleToCustom() {
      checkExist().then((res) => {
        if (res.data == false) {
          this.$router.push("/custom");
        }
      });
    },
    handleGeneral() {
      this.$router.push("/general");
    },
    group(array, subNum) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subNum)));
      }
      return newArray;
    },
    getData() {
      videoList().then((res) => {
        if (res.data) {
          this.playUrl = res.data[0].playUrl;
        }
      });
      picList().then((res) => {
        // this.pictureList = res.data
        this.pictureList = this.group(res.data, 5);
      });
      sectionPicList().then((res) => {
        this.sectionList = res.data;
      });
    },
    getskuPage() {
      const params = {
        pageNum: 1,
        pageSize: 10,
        keyword: "",
      };
      productPage(params).then((res) => {
        this.productList = res.data.list;
      });
    },
    handleChangeProItem(index, val) {
      this.activeIdx = index;
      this.$router.push({
        path: "/product",
        query: { uid: val.recProductUid },
      });
    },
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.getskuPage();
    this.getData();
  },
};
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
    }
  }

  .top-banner {
    width: 100%;
    height: 900px;
    background-image: url("@/assets/images/banner.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    padding-bottom: 48px;

    .top-banner-menu {
      width: 376px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > a {
        cursor: pointer;
      }
    }
  }
  #work {
    padding: 20px 0 120px;
    & > img {
      margin-top: 100px;
    }
    .work-btn {
      cursor: pointer;
    }
  }
  #store {
    background-color: #fff7f9;
    padding: 120px 0;

    .store-title {
      position: relative;
      .btn {
        width: 150px;
        height: 20px;
        position: absolute;
        top: 75px;
        right: 4px;
        // background-color: red;
        cursor: pointer;
      }
    }

    .store-item-list {
      width: 1152px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 80px;
      .store-item {
        width: 362px;
        height: 436px;
        border-radius: 16px;
        border: 0.5px solid #40001c;
        padding: 32px;
        margin-right: 32px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(n + 4) {
          margin-top: 32px;
        }
        .store-item-img {
          width: 298px;
          height: 232px;
          border-radius: 8px;
        }
        .store-item-title {
          font-size: 24px;
          font-weight: 600;
          color: #40001c;
          margin-top: 12px;
        }

        .store-item-bottom-line {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: bold;
          .btn {
            width: 85px;
            height: 15px;
            cursor: pointer;
          }
        }
      }
    }
  }
  #gallery {
    padding-top: 120px;
    .image_list {
      margin-top: 100px;
    }
    .gallery-title {
      position: relative;
      .btn {
        width: 150px;
        height: 20px;
        position: absolute;
        top: 75px;
        right: 4px;
        // background-color: red;
        cursor: pointer;
      }
    }
  }
  .qa {
    padding-top: 160px;
    padding-bottom: 200px;
    .qa-collapse {
      width: 1152px;
      margin-top: 80px;
      border: none;
      .el-collapse-item {
        background-color: #fcf7f7;
        margin-bottom: 12px;
        padding-left: 24px;
        border-radius: 8px;

        .el-collapse-item__header {
          border: none;
          background-color: #fcf7f7;
          font-size: 20px;
          font-weight: 600;
          color: #40001c;
        }
        .el-collapse-item__wrap {
          border: none;
          background-color: #fcf7f7;
          color: #40001c;
          font-size: 14px;
        }
        &.is-active {
          background: #fcf7f7;
          .el-collapse-item__wrap {
            border: none;
            background-color: #fcf7f7;
          }
        }
      }
    }
  }
}
p {
  margin: 0;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-image: -webkit-linear-gradient(left, #fff, rgba(255, 249, 249, 0));
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

.icon-container {
  width: 72px;
  height: 72px;
  position: relative;

  &.hover-active {
    .icon {
      opacity: 0;
    }
    &[data-position="left"] {
      .animation-button {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
      }
    }
    &[data-position="center"] {
      .animation-button {
        visibility: visible;
        opacity: 1;
        transform: translateX(-50%); /* 从中间展开 */
      }
    }
    &[data-position="right"] {
      .animation-button {
        visibility: visible;
        opacity: 1;
        transform: translateX(-100%); /* 从右向左展开 */
      }
    }
  }

  &.hidden {
    .icon {
      opacity: 0;
      visibility: hidden;
    }
    .animation-button {
      visibility: hidden;
      opacity: 0;
    }
  }
  .icon {
    position: absolute;
    left: 0;
    cursor: pointer;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }

  // &:hover {
  //   .icon {
  //     transform: translateX(50px);
  //     opacity: 0;
  //   }
  //   .animation-button {
  //     visibility: visible;
  //     opacity: 1;
  //     transform: translateX(50px);
  //   }
  // }
}

.animation-button {
  height: 72px;
  width: 376px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffc9de;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  // left: 0;
  top: 0;
  left: 50%; /* 从中间展开 */
  transform: translateX(-50%);

  visibility: hidden;
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out,
    transform 0.5s ease-in-out;
  .btn-text {
    font-size: 30px;
    font-weight: 600;
    color: #40001c;
    text-transform: uppercase;
  }
  img {
    margin-right: 16px;
  }
}
</style>
