<template>
  <div class="custom-footer">
    <div class="btn-group">
      <el-button :disabled="disabled" @click="onBtnClick">{{
        elementContentList.portal_btns_next || $t("btns.next")
      }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    step: Number,
    onBtnClick: Function
  },
  data: () => {
    return {
      elementContentList: {},
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
  },
};
</script>

<style lang="scss">
.custom-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  padding: 16px 24px;
  background: #ffffff;
  box-shadow: 0px -4px 30px -5px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-end;
  align-content: center;
  .btn-group {
    .el-button {
      top: 362px;
      width: 280px;
      height: 40px;
      border-radius: 9999px;
      padding: 0px 16px;
      gap: 8px;
      background: #f6497f;
      border: none;
      color: #fff;
      &:disabled {
        opacity: 0.4;
      }
    }
  }
}
</style>
