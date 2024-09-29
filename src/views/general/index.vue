<template>
    <div class="general" @scroll="handleScroll">
      <div class="general_container">
        <p class="title">
          {{ elementContentList.portal_general_title || $t("general.title") }}
        </p>
        <p class="search">
          <el-input v-model="searchData.keyword" />
          <el-button
            class="search_btn"
            icon="el-icon-search"
            @click="handleSearch"
            >{{
              elementContentList.portal_btns_search || $t("btns.search")
            }}</el-button
          >
        </p>
        <div class="pro_list">
          <div
            class="pro_item"
            :style="(index + 1) % 4 == 0 ? { marginRight: 0 } : ''"
            v-for="(item, index) in proList"
            :key="item.productBaseUid"
            v-show="!loading"
            @click="handleToDetail(item, index)"
          >
            <div class="pro_img">
              <img :src="item.masterPicUrl" />
            </div>
            <p class="pro_title">{{ item.name }}</p>
            <p class="pro_price">£ {{ item.price }}</p>
          </div>
          <div v-show="loading" class="loading flex_c_c">
            <p class="flex_c_c">
              <img src="@/assets/index/loading.png" />
              <span>{{
                elementContentList.portal_general_loading || $t("general.loading")
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <footerBar />
    </div>
  </template>
  
  <script>
  import footerBar from '@/components/footerBar/index'
  import { proSerch } from '@/api/product'
  
  export default {
    components: {
      footerBar
    },
    data () {
      return {
        searchData: {
          keyword: '',
          pageNum: 1,
          pageSize: 40,
        },
        loading: true,
        proList: [],
        total: 0,
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.handleSearch()
    },
    methods: {
      handleToDetail (val) {
        this.$router.push({ path: '/product', query: { uid: val.productUid } })
      },
      handleScroll (e) {
        if ((this.total - 0) == this.proList.length) return false
        if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight - 1) {
          if (!this.loading) {
            this.searchData.pageNum++
            proSerch(this.searchData).then(res => {
              this.proList.push(...res.data.list)
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.searchData.pageNum--
            })
          }
        }
      },
      handleSearch () {
        this.loading = true
        proSerch(this.searchData).then(res => {
          this.proList = res.data.list
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
    }
  }
  </script>
  
  <style lang="scss">
  .general {
    width: 100%;
    height: calc(100% - 56px);
    background: #f5f7f8;
    font-size: 14px;
    line-height: 22px;
    color: #1f2126;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    .general_container {
      margin: 0 auto;
      width: 1200px;
      background: #fff;
      padding: 60px 24px;
      flex: 1;
      .title {
        font-size: 30px;
        font-weight: 600;
        line-height: 38px;
      }
      .search {
        width: 100%;
        position: relative;
        .el-input__inner {
          height: 56px;
          border: 2px solid #f6497f;
          border-radius: 12px;
        }
        .search_btn {
          position: absolute;
          right: 8px;
          top: 8px;
          width: 106px;
          height: 40px;
          border: 1px solid #f6497f;
          background: #f6497f;
          padding: 0px 16px;
          gap: 8px;
          border-radius: 8px;
          color: #ffffff;
        }
      }
      .pro_list {
        flex-wrap: wrap;
        min-height: 100%;
        .pro_item {
          width: 264px;
          height: 384px;
          border-radius: 12px;
          background: #ffffff;
          padding: 16px;
          margin: 0 32px 32px 0;
          display: inline-block;
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
            height: 44px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .pro_price {
            font-size: 20px;
            font-weight: bold;
            line-height: 32px;
            color: #1f2126;
          }
        }
        .loading {
          width: 100%;
          padding-top: 100px;
          span {
            color: #f6497f;
            font-size: 16px;
            font-weight: normal;
            line-height: 24px;
            margin-left: 12px;
          }
          img {
            width: 24px;
            animation: identifier 1s linear infinite;
          }
          @keyframes identifier {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }
    }
  }
  </style>
  