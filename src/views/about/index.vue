<template>
  <div class="about-me">
    <div class="about-me-header">
      <div class="container">
        <img src="@/assets/images/ab.png" style="width: 800px" />
        <img
          src="@/assets/images/ab-logo.png"
          style="opacity: 0.1; width: 374px"
        />
      </div>
    </div>
    <img src="@/assets/images/ab-main3.png" class="mt100" />
    <img src="@/assets/images/ab-main2.png" class="mt100 mb100" />
    <footerBar />
  </div>
</template>

<script>
  import footerBar from '@/components/footerBar/index'
  
  export default {
    name: 'home',
    components: {
      footerBar,
    }
  }
</script>

<style scoped lang="scss">
.about-me {
  display: flex;
  flex-direction: column;
  align-items: center;

  .container {
    width: 1340px;
    margin: 0 auto;
    position: relative;
    left: 94px;
  }
  
  .about-me-header {
    width: 100%;
    height: 400px;
    background-color: #fff4f5;
    overflow: hidden;
    & > .container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .mt100 {
    margin-top: 100px;
  }
  .mb100 {
    margin-bottom: 100px;
  }
}
</style>
