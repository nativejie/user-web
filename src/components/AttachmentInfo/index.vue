<template>
  <div class="attachment-info flex-col">
    <p class="attachment-info-title">配件商品信息</p>

    <div v-for="i in 3" :key="i" class="attachment-info-item flex-row">
      <img src="@/assets/images/logo.png" class="attachment-info-item-img" />
      <div class="flex-col">
        <p class="attachment-info-item-name">配件商品名称</p>
        <div class="attachment-info-item-info flex-row">
          <p>x100</p>
          <p class="red">£ 12</p>
        </div>
      </div>
    </div>

    <p class="attachment-info-price">£ 24</p>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.attachment-info {
  background-color: #F8F9FC;
  padding: 16px;
  border-radius: 8px;
  align-items: start;
  .attachment-info-title {
    margin-bottom: 10px;
  }
  .attachment-info-item {
    &:not(:last-child) {
      margin-bottom: 18px;
    }
    .attachment-info-item-img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      margin-right: 12px;
    }
    .attachment-info-item-name {
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      color: #3D3D3D;
    }
    .attachment-info-item-info {
      align-items: start;
      color: #3D3D3D;
      font-size: 14px;
      & > p {
      margin-right: 16px;
    }
    }
  }
  .attachment-info-price {
    font-size: 16px;
    font-weight: 500;
    color: #F6497F;
    margin-top: -6px;
  }
  .red {
    color: #F6497F;
  }
}
</style>