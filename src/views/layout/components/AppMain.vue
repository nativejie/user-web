<template>
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
      </transition>
    </section>
  </template>
  
  <script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    }
  }
  </script>
  