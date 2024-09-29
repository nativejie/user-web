<template>
  <div class="login flex_c_c">
    <div class="logo flex_c_c">
      <img src="@/assets/index/logo1.png" />
      <img src="@/assets/index/pokidol.png" />
    </div>
    <div class="login_main flex_c_c">
      <div class="login_card">
        <p class="p1">
          {{ elementContentList.portal_navbar_title || $t("login.title") }}
        </p>
        <p class="p2">
          {{ elementContentList.portal_navbar_text1 || $t("login.text1") }}
          <span @click="handleSignUp">
            {{
              elementContentList.portal_navbar_text2 || $t("login.text2")
            }}</span
          >
        </p>
        <div class="form_card">
          <!-- :rules="loginRules" -->
          <el-form
            autoComplete="on"
            :model="loginForm"
            ref="loginForm"
            label-position="top"
          >
            <el-form-item
              prop="account"
              :label="
                elementContentList.portal_navbar_form_label1 ||
                $t('login.form.label1')
              "
            >
              <el-input
                name="account"
                type="text"
                v-model="loginForm.account"
                autoComplete="on"
                :placeholder="
                  elementContentList.portal_navbar_form_placeholder1 ||
                  $t('login.form.placeholder1')
                "
              >
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :label="
                elementContentList.portal_navbar_form_label2 ||
                $t('login.form.label2')
              "
            >
              <el-input
                name="password"
                :type="pwdType"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.password"
                autoComplete="on"
                :placeholder="
                  elementContentList.portal_navbar_form_placeholder2 ||
                  $t('login.form.placeholder2')
                "
              >
                <span slot="suffix" @click="showPwd">
                  <i class="el-icon-view"></i>
                </span>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="flex_b_c login_remember">
          <el-checkbox v-model="rememberPwd">{{
            elementContentList.portal_navbar_text3 || $t("login.text3")
          }}</el-checkbox>
          <span class="forget_pwd" @click="handleForgetPwd">{{
            elementContentList.portal_navbar_text4 || $t("login.text4")
          }}</span>
        </div>
        <el-button
          class="login_btn"
          type="primary"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >
          {{ elementContentList.portal_navbar_text5 || $t("login.text5") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidateEmail } from '@/utils/validate';
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png'

export default {
  name: 'login',
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
      login_center_bg,
      dialogVisible: false,
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
      this.$router.push('/register')
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
            this.$router.push({ path: '/home' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: calc(100% - 56px);
  .logo {
    flex: 1;
    height: 100%;
    background: linear-gradient(127deg, #fe686f 0%, #ef2494 100%);
    flex-direction: column;
    img:nth-of-type(1) {
      width: 579px;
    }
    img:nth-of-type(2) {
      width: 524px;
    }
  }
  .login_main {
    width: 760px;
    height: 100%;
    background: #fff;
    .login_card {
      width: 400px;
      height: 522px;
      p {
        margin: 0;
      }
      .p1 {
        font-size: 38px;
        font-weight: 600;
        line-height: 46px;
        color: #242731;
        margin-bottom: 16px;
      }
      .p2 {
        font-family: "Inter";
        font-size: 18px;
        font-weight: 500;
        line-height: 27px;
        color: #353945;
        span {
          color: #f6497f;
          margin-left: 5px;
          cursor: pointer;
        }
      }
      .form_card {
        border-radius: 10px;
        gap: 10px;
        background: #ffffff;
        box-sizing: border-box;
        margin-top: 54px;
        .el-form-item {
          margin-bottom: 20px;
        }
        .el-form-item__label {
          font-size: 16px;
          font-weight: 500;
          line-height: 20.83px;
          color: #242731;
          padding: 0 0 12px;
        }
        .el-input__inner {
          width: 100%;
          height: 54px;
          border-radius: 999px;
          padding: 16px 24px;
          box-sizing: border-box;
          border: none;
          background: #f2f4f7;
        }
        .el-input__suffix {
          right: 41px;
          line-height: 59px;
          i {
            font-size: 20px;
            color: #777e90;
            cursor: pointer;
          }
        }
        .el-form-item__label::before {
          content: "";
        }
      }
      .login_remember {
        margin-top: 24px;
        .el-checkbox__label {
          font-size: 16px;
          font-weight: 500;
          line-height: 20.83px;
          color: #b1b5c3;
        }
        .forget_pwd {
          font-size: 16px;
          font-weight: 500;
          line-height: 20.83px;
          color: #f6497f;
          cursor: pointer;
        }
      }
      .login_btn {
        width: 100%;
        height: 60px;
        border-radius: 999px;
        // background: linear-gradient(
        //     0deg,
        //     rgba(255, 255, 255, 0.5),
        //     rgba(255, 255, 255, 0.5)
        //   ),
        //   #f6497f;
        border: none;
        margin-top: 30px;
        font-size: 20px;
        font-weight: bold;
        line-height: 24.2px;
        color: #fffaf7;
      }
    }
  }
}
</style>


