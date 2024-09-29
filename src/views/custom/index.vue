<template>
    <div class="custom">
      <div class="custom_container">
        <basic />
      </div>
    </div>
  </template>
  
  <script>
  import basic from './components/basic.vue';
  
  export default {
    name: 'productInfo',
    components: {
      basic
    },
    data () {
      return {
  
      }
    },
    created () {
  
    },
    methods: {
  
    }
  }
  </script>
  
  <style lang="scss">
  .custom {
    width: 100%;
    height: calc(100% - 56px);
    background: #f8f9fc;
    color: #1f2126;
    font-size: 14px;
    line-height: 22px;
    overflow-y: scroll;
    .custom_container {
      margin: 0 auto;
      background: #fff;
      width: 1200px;
      min-height: 100%;
    }
  }
  p {
    margin: 0;
  }
  </style>
  
  