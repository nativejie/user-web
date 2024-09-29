<template>
  <div class="sidebar_main">
    <scroll-bar>
  <!-- :collapse="isCollapse"  -->
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        background-color="#fff"
        text-color="#4E5159"
        active-text-color="#ffffff"
      >
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar>
    <div>
      <el-button class="logOut" icon="el-icon-switch-button" @click="handleLogOut">{{ 'Log out' }}</el-button>
    </div>
  </div>
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
      return this.$router.options.routes
      // return this.routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods:{
    handleLogOut() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss">
.sidebar_main{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .logOut{
    width: 92px;
    height: 34px;
    border-radius: 8px;
    padding: 6px 10px;
    gap: 4px;
    background: #F8F9FC;
    color: #646873;
    border: none;
  }
}
</style>


