<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
    <!-- 全局弹窗 - 属性通过全局mixin混入 -->
    <LoginDialog v-if="loginDialogVisible" :dialogVisible="loginDialogVisible" :onClose="handleCloseLoginDialog" />
    <SignUpDialog v-if="signUpDialogVisible" :dialogVisible="signUpDialogVisible" :onClose="handleCloseSignUpDialog" />
  </div>
</template>

<script>
import Navbar from "@/views/Navbar/index";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { languageSettingList } from "@/api/home";
import LoginDialog from '@/components/LoginDialog';
import SignUpDialog from '@/components/SignUpDialog';
import MessageBoard from '@/components/MessageBoard';

export default {
  components: {
    Navbar,
    LoginDialog,
    SignUpDialog,
    MessageBoard
  },
  name: "App",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    let data = sessionStorage.getItem("elementContentMap");
    if (!data) {
      this.getElementContentMap();
    } else {
      if (!window.elementContentList) {
        this.getElementContentMap();
      }
    }
    if (!sessionStorage.getItem("languageList")) {
      this.getLanguageSettingList();
    }
  },
  mounted() {
    const _path = this.$route.path;
    if(_path.includes('show_login=1')) {
      this.handleOpenLoginDialog();
    } else if (_path.includes('show_register=1')) {
      this.handleOpenSignUpDialog();
    }
    let token = getToken();
    if (this.userInfo && token) {
      this.$store.dispatch("GetInfo");
    }
  },
  methods: {
    getLanguageSettingList() {
      languageSettingList().then((res) => {
        sessionStorage.setItem("languageList", JSON.stringify(res.data));
      });
    },
    getElementContentMap() {
      window.elementContentList = window.elementContentList || {"portal_custom_basic_label11":"Back"};
      sessionStorage.setItem(
        "elementContentMap",
        JSON.stringify(window.elementContentList)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Poppins";
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // left: 0;
  // top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
