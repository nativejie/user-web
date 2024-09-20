<template>
    <div class="login flex_c_c">
      <div class="login_card">
        <div class="card_left">
          <p class="left_top"><img src="@/assets/index/left.png" /></p>
          <p class="left_logo"><img src="@/assets/index/Logo1.png" /></p>
          <p style="margin-top: 154px">
            {{ elementContentList.login_text1 || $t("login.text1") }}
          </p>
        </div>
        <div class="card_right flex_c_c">
          <div v-if="!isForgot">
            <el-form
              autoComplete="on"
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-position="top"
            >
              <el-form-item
                prop="username"
                :label="elementContentList.login_label1 || $t('login.label1')"
              >
                <el-input
                  name="username"
                  type="text"
                  v-model="loginForm.username"
                  :placeholder="
                    elementContentList.login_label1 || $t('login.label1')
                  "
                >
                </el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :label="elementContentList.login_label2 || $t('login.label2')"
              >
                <el-input
                  name="password"
                  :type="pwdType"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  autoComplete="on"
                  :placeholder="
                    elementContentList.login_label2 || $t('login.label2')
                  "
                >
                  <span slot="suffix" @click="showPwd">
                    <svg-icon
                      v-if="pwdType == ''"
                      icon-class="eye2"
                      style="color: #c0c4cc"
                    ></svg-icon>
                    <svg-icon
                      v-else
                      icon-class="eye"
                      style="color: #c0c4cc"
                    ></svg-icon>
                  </span>
                </el-input>
              </el-form-item>
              <el-button
                type="primary"
                class="btn"
                :loading="loading"
                @click.native.prevent="handleLogin"
              >
                {{ elementContentList.login_text2 || $t("login.text2") }}
              </el-button>
              <div class="flex_b_c remember">
                <el-checkbox
                  v-model="rememberPwd"
                  @change="handleChangeRemember"
                  >{{
                    elementContentList.login_text3 || $t("login.text3")
                  }}</el-checkbox
                >
                <span class="forget" @click="handleForgetPwd">{{
                  elementContentList.login_text4 || $t("login.text4")
                }}</span>
              </div>
            </el-form>
          </div>
          <forgot v-else />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { isvalidUsername } from '@/utils/validate';
  import { isvalidateEmail } from '@/utils/validate';
  import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import forgot from './forgot.vue'
  import Cookies from "js-cookie";
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'login',
    components: {
      forgot
    },
    data () {
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate1 || this.$t('login.validate1')))
        } else if (!isvalidUsername(value)) {
          callback(new Error(this.elementContentList.login_validate2 || this.$t('login.validate2')))
        } else {
          callback()
        }
      };
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate3 || this.$t('login.validate3')))
        } else if (!isvalidateEmail(value)) {
          callback(new Error(this.elementContentList.login_validate4 || this.$t('login.validate4')))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate5 || this.$t('login.validate5')))
        } else if (value.length < 3) {
          callback(new Error(this.elementContentList.login_validate6 || this.$t('login.validate6')))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible: false,
        supportDialogVisible: false,
        rememberPwd: false,
        isForgot: false,
        roleCode: '',
        firstLogin: '',
        elementContentList: '',
      }
    },
    // computed: {
    //   ...mapGetters([
    //     'firstLogin',
    //     'roleCode,'
    //   ])
    // },
    created () {
      this.elementContentList = window.elementContentList
      this.loginForm.username = getCookie("adminUsername");
      this.loginForm.password = getCookie("adminPassword");
      if (this.loginForm.username && this.loginForm.password) this.rememberPwd = true
    },
    methods: {
      handleChangeRemember () {
        if (this.rememberPwd) {
          Cookies.set("adminUsername", this.loginForm.username, 15);
          Cookies.set("adminPassword", this.loginForm.password, 15);
        } else {
          Cookies.remove('adminUsername')
          Cookies.remove('adminPassword')
        }
      },
      handleForgetPwd () {
        this.isForgot = true
      },
      showPwd () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              this.roleCode = this.$store.state.user.roleCode
              this.firstLogin = this.$store.state.user.firstLogin
              if (this.firstLogin && this.roleCode == 'store_admin') {
                this.$router.push({ path: '/storeSetting' })
              } else if (!this.firstLogin && this.roleCode == 'store_admin') {
                this.$router.push({ path: '/storeInformation/index' })
              } else if (this.roleCode == 'print_emp' || this.roleCode == 'print_admin') {
                this.$router.push({ path: '/printingOrder/list' })
              } else {
                this.$router.push({ path: '/' })
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      handleTry () {
        this.dialogVisible = true
      },
      dialogConfirm () {
        this.dialogVisible = false;
        setSupport(true);
      },
      dialogCancel () {
        this.dialogVisible = false;
        setSupport(false);
      }
    }
  }
  </script>
  
  <style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background: #fafafb;
    .login_card {
      width: 1178px;
      height: 650px;
      display: flex;
      border-radius: 8px;
      .card_left {
        width: 378px;
        height: 100%;
        background: #409eff;
        border-radius: 8px 0 0 8px;
        text-align: center;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #f5f7fa;
        .left_top {
          img {
            width: 100%;
          }
        }
        .left_logo {
          margin-top: 114px;
          img {
            width: 232px;
            opacity: 0.2;
          }
        }
      }
      .card_right {
        height: 100%;
        width: 800px;
        background: #fff;
        border-radius: 0 8px 8px 0;
        .el-form-item {
          margin-bottom: 20px;
        }
        .el-form-item__label {
          font-size: 20px;
          line-height: 28px;
          color: #000;
          padding: 0 0 7px;
        }
        .el-input__inner {
          width: 393px;
          height: 40px;
          border-radius: 4px;
          padding: 19px 21px 19px 20px;
          gap: 10px;
          box-sizing: border-box;
          border: 1px solid #dcdfe6;
        }
        .el-input__suffix {
          right: 12px;
          line-height: 44px;
          i {
            font-size: 20px;
            color: #777e90;
            cursor: pointer;
          }
        }
        .el-form-item__label::before {
          content: "";
        }
        .btn {
          background: #409eff;
          // width: 77px;
          height: 40px;
          border-radius: 4px;
          margin-top: 20px;
        }
      }
      .remember {
        margin-top: 12px;
        font-size: 14px;
        .el-checkbox__label {
          line-height: 24px;
          color: #606266;
        }
        .forget {
          line-height: 20.83px;
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409eff;
  }
  
  .login-title {
    text-align: center;
  }
  
  .login-center-layout {
    background: #409eff;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
  </style>
  
  
  