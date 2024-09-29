<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/views/Navbar/index";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { languageSettingList } from "@/api/home";

export default {
  components: {
    Navbar,
  },
  name: "App",
  data() {
    return {};
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
