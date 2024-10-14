<template>
  <div class="custom-header">
    <div class="flex">
      <div class="back flex" @click="handleBackk(2)">
        <i class="el-icon-arrow-left"></i>
        <span>{{
          elementContentList.portal_custom_basic_label11 ||
          $t("custom.basic.label11")
        }}</span>
      </div>
      <span style="font-size: 16px">{{ label }}</span>
    </div>
    <p class="subtitle m_t">
      {{ title }}
      <el-button v-if="step === 2" @click="onAddClick" class="add_btn" icon="el-icon-plus">{{
        elementContentList.portal_btns_add || $t("btns.add")
      }}</el-button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    onAddClick: {
      type: Function,
      default: () => {},
      required: false
    },
    handleBack: {
      type: Function,
      default: () => {},
      required: false
    },
  },
  data: () => {
    return {};
  },
  computed: {
    elementContentList() {
      return JSON.parse(sessionStorage.getItem("elementContentMap"));
    },
  },
  mounted() {
    console.log(this.label);
  },
  methods: {
    handleBackk() {
      if (this.step === 1) {
        // confirm before leaving
        this.$confirm(
          this.$t("custom.header.backTips"),
          this.$t("custom.header.confirmTitle"),
          {
            confirmButtonText: this.$t("btns.confirm"),
            cancelButtonText: this.$t("btns.cancel"),
          }
        )
          .then(() => {
            this.$router.go(-1);
          })
          .catch(() => {});
      } else {
        this.$emit("handleBack");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-header {
  position: sticky;
  top: 0;
  height: 206px;
  background: #fff;
  z-index: 999;
  box-sizing: border-box;
  padding-top: 64px;

  .back {
    cursor: pointer;
    i {
      color: #f6497f;
      font-size: 24px;
      margin-right: 12px;
    }
    span {
      font-size: 16px;
      line-height: 24px;
      font-variation-settings: "opsz" auto;
      color: #f6497f;
      margin-right: 12px;
    }
  }
  .subtitle {
    font-size: 28px;
    font-weight: 500;
    line-height: 36px;
  }
  .add_btn {
      width: 78px;
      height: 38px;
      border-radius: 999px;
      padding: 8px 16px;
      gap: 2px;
      background: #fff0f2;
      color: #f6497f;
      border: none;
      float: right;
    }
}
</style>
