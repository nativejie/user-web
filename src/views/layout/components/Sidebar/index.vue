<template>
    <scroll-bar>
      <img v-if="sidebar.opened" class="logo" src="@/assets/index/logo.png">
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        text-color="#A1A7AD"
        active-text-color="#007AFF"
      >
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'
  
  export default {
    components: { SidebarItem, ScrollBar },
    computed: {
      ...mapGetters([
        'sidebar',
        'routers'
      ]),
      routes() {
        // return this.$router.options.routes
        return this.routers
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
  </script>
  
  
  