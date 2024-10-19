<template>
  <div>
    <el-dialog
      class="login-dialog"
      :visible.sync="dialogVisible"
      @close="onClose"
      :show-close="false"
      center
      modal
      close-on-click-modal
    >
      <div class="login-dialog-title">
        POKIDOL
      </div>
      <div class="login-dialog-wrap">
        <p class="login-dialog-wrap-title">Log in to experience more!</p>
        <div class="form_card">
          <!-- :rules="loginRules" -->
          <el-form
            autoComplete="on"
            :model="loginForm"
            ref="loginForm"
            label-position="top"
          >
            <el-form-item prop="account">
              <el-input
                class="gray-input"
                name="account"
                type="text"
                v-model="loginForm.account"
                autoComplete="on"
                :placeholder="
                  elementContentList.portal_navbar_form_label1 ||
                  $t('login.form.label1')
                "
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="gray-input"
                name="password"
                :type="pwdType"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.password"
                autoComplete="on"
                :placeholder="
                  elementContentList.portal_navbar_form_label2 ||
                  $t('login.form.label2')
                "
              >
                <span slot="suffix" @click="showPwd">
                  <i class="el-icon-view"></i>
                </span>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="sign-line">
          <el-button style="color: #F6497F" type="text" @click="handleSignUp">
            {{ elementContentList.portal_navbar_text2 || $t("login.text2") }}
          </el-button>
          <el-button style="color: #929DAA" type="text" @click="handleForgetPwd">
            {{ elementContentList.portal_navbar_text4 || $t("login.text4") }}
          </el-button>
        </div>
        <el-button class="login-btn" round type="danger" @click.native.prevent="handleLogin">
          {{ elementContentList.portal_navbar_text5 || $t("login.text5") }}
        </el-button>
        <p class="continue">Continue with</p>
        <div class="more-login-type">
          <img src="@/assets/icon/google.png" @click="() => handleLoginMore('google')" />
          <img class="facebook" src="@/assets/icon/facebook.png" @click="() => handleLoginMore('facebook')" />
          <img src="@/assets/icon/phone.png" @click="() => handleLoginMore('phone')" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { isvalidateEmail } from '@/utils/validate';
  import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
  import { thirdLogin, login, register } from '@/api/login';
  export default {
    props: {
      dialogVisible: Boolean,
      onClose: Function,
    },
    data () {
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_navbar_form_validate1 || this.$t('login.validate1')))
        } else if (!isvalidateEmail(value)) {
          callback(new Error(this.elementContentList.portal_navbar_form_validate2 || this.$t('login.validate2')))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_navbar_form_validate3 || this.$t('login.validate3')))
        } else if (value.length < 8) {
          callback(new Error(this.elementContentList.portal_navbar_form_validate4 || this.$t('login.validate4')))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          account: '',
          password: '',
        },
        loginRules: {
          // email: [{required: true, trigger: 'blur', validator: validateEmail}],
          // password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        supportDialogVisible: false,
        rememberPwd: false,
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.loginForm.account = getCookie("account");
      this.loginForm.password = getCookie("password");
      // if(this.loginForm.email === undefined||this.loginForm.email==null||this.loginForm.email===''){
      //   this.loginForm.email = 'admin';
      // }
      // if(this.loginForm.password === undefined||this.loginForm.password==null){
      //   this.loginForm.password = '';
      // }
    },
    methods: {
      // 忘记密码
      handleForgetPwd () {
        this.$router.push('/password_find')
      },
      // 注册
      handleSignUp () {
        // this.$router.push('/register')
        this.handleOpenSignUpDialog();
        this.handleCloseLoginDialog();
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
              setCookie("account", this.loginForm.account, 15);
              setCookie("password", this.loginForm.password, 15);
              // this.$router.push({ path: '/home' })
              this.handleCloseLoginDialog();
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      handleLoginMore (type) {
      },
    }
  }
</script>

<style lang="scss" scoped>
.login-dialog {

  ::v-deep .el-dialog {
    width: 440px;
    height: 574px;
    margin: 200px auto;
    border-radius: 24px !important;
    overflow: hidden;
    background-color: #fff;
    margin-top: 200px !important;
    background: linear-gradient(90deg, #FF6D80 -26%, #FC3E9A 99%);
    .el-dialog__header {
      display: none;
    }
    
    .el-dialog__body {
      width: 100%;
      height: 100%;
      padding: 0;
      color: #fff;
      display: flex;
      flex-direction: column;
      .login-dialog-title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: 500;
      }
      .login-dialog-wrap {
        padding: 24px 40px;
        background-color: #fff;
        height: 490px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #40001C;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        .login-dialog-wrap-title {
          font-size: 24px;
        }
        .form_card {
          margin-top: 24px;
          width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .gray-input {
            width: 360px;
            border-radius: 54px;
            border-radius: 27px;
            background-color: #F2F4F7;
            .el-input__inner {
              padding: 0 24px;
              height: 54px;
              line-height: 54px;
            }
            .el-input__suffix {
              right: 24px;
              line-height: 54px;
            }
          }
        }
        .sign-line {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 4px;
          font-size: 16px;
          font-weight: 400;
        }
        .login-btn {
          width: 100%;
          height: 56px;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
        }
        .continue {
          position: relative;
          font-size: 14px;
          line-height: 22px;
          color: #929DAA;
          margin-top: 24px;
          &::before {
            content: '';
            position: absolute;
            top: 11px;
            left: -85px;
            width: 73px;
            height: 1px;
            background: #E0E2E9;
          }
          &::after {
            content: '';
            position: absolute;
            top: 11px;
            right: -85px;
            width: 73px;
            height: 1px;
            background: #E0E2E9;
          }
        }
        .more-login-type {
          width: 100%;
          margin-top: 24px;
          display: flex;
          justify-content: space-around;
          img {
            width: 40px;
            height: 62px;
            cursor: pointer;
            &.facebook {
              width: 59px;
              height: 62px;
            }
          }
        }
      }
    }
  }
}
</style>