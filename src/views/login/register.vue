<template>
    <div class="register flex_c_c">
      <div class="logo flex_c_c">
        <img src="@/assets/index/logo1.png" />
        <img src="@/assets/index/pokidol.png" />
      </div>
      <div class="login_main flex_c_c">
        <div class="register_card">
          <p class="p1">
            {{ elementContentList.portal_login_text2 || $t("login.text2") }}
          </p>
          <div v-if="showEmail" class="form_card">
            <el-form
              autoComplete="on"
              :model="emailForm"
              :rules="emailRules"
              ref="emailForm"
              label-position="top"
            >
              <el-form-item
                prop="email"
                :label="
                  elementContentList.portal_navbar_form_label1 ||
                  $t('login.form.label1')
                "
              >
                <el-input
                  name="email"
                  type="text"
                  v-model="emailForm.email"
                  autoComplete="on"
                  :placeholder="
                    elementContentList.portal_login_form_placeholder1 ||
                    $t('login.form.placeholder1')
                  "
                >
                </el-input>
              </el-form-item>
              <el-form-item
                prop="code"
                class="code"
                :label="
                  elementContentList.portal_login_form_label3 ||
                  $t('login.form.label3')
                "
              >
                <el-input
                  name="code"
                  type="text"
                  v-model="emailForm.code"
                  autoComplete="on"
                  :placeholder="
                    elementContentList.portal_login_form_placeholder3 ||
                    $t('login.form.placeholder3')
                  "
                >
                </el-input>
                <el-button
                  type="text"
                  :disabled="disabled"
                  :class="disabled ? 'disabled' : ''"
                  class="send_code"
                  @click="handleSendCode"
                  >{{
                    isSend
                      ? elementContentList.portal_login_text7 ||
                        $t("login.text7") + ` (${remaining} s)`
                      : elementContentList.portal_login_text6 || $t("login.text6")
                  }}</el-button
                >
              </el-form-item>
            </el-form>
            <div class="remember">
              <el-checkbox v-model="isAgree"></el-checkbox>
              <span class="agreement"
                >{{ elementContentList.portal_login_text10 || $t("login.text10")
                }}<span @click="handleShowAgreement('service')">{{
                  elementContentList.portal_login_text11 || $t("login.text11")
                }}</span
                >,
                <span @click="handleShowAgreement('privacy')">{{
                  elementContentList.portal_login_text12 || $t("login.text12")
                }}</span
                >.</span
              >
            </div>
            <el-button
              class="register_btn"
              type="primary"
              :loading="loading"
              @click.native.prevent="handleNext"
            >
              {{ elementContentList.portal_btns_next || $t("btns.next") }}
            </el-button>
          </div>
          <div v-else class="form_card">
            <el-form
              autoComplete="on"
              :model="signForm"
              :rules="signRules"
              ref="signForm"
              label-position="top"
            >
              <el-form-item
                prop="username"
                :label="
                  elementContentList.portal_login_label6 || $t('login.form.label6')
                "
              >
                <el-input
                  name="username"
                  type="text"
                  v-model="signForm.username"
                  autoComplete="on"
                  :placeholder="
                    elementContentList.portal_login_placeholder6 ||
                    $t('login.form.placeholder6')
                  "
                >
                </el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :label="
                  elementContentList.portal_login_label7 || $t('login.form.label7')
                "
              >
                <el-input
                  name="password"
                  :type="pwdType"
                  @keyup.enter.native="handleSignUp"
                  v-model="signForm.password"
                  autoComplete="on"
                  :placeholder="
                    elementContentList.portal_login_placeholder4 ||
                    $t('login.form.placeholder4')
                  "
                >
                  <span slot="suffix" @click="showPwd">
                    <i class="el-icon-view"></i>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item
                prop="checkPwd"
                :label="
                  elementContentList.portal_login_label5 || $t('login.form.label5')
                "
              >
                <el-input
                  name="checkPwd"
                  :type="pwdType2"
                  @keyup.enter.native="handleSignUp"
                  v-model="signForm.checkPwd"
                  autoComplete="on"
                  :placeholder="
                    elementContentList.portal_login_placeholder5 ||
                    $t('login.form.placeholder5')
                  "
                >
                  <span slot="suffix" @click="showPwd2">
                    <i class="el-icon-view"></i>
                  </span>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button
              class="register_btn"
              type="primary"
              :loading="loading"
              @click.native.prevent="handleSignUp"
            >
              {{ elementContentList.portal_login_text2 || $t("login.text2") }}
            </el-button>
          </div>
          <p class="have_account">
            {{ elementContentList.portal_login_text13 || $t("login.text13") }}
            <span style="color: #f6497f" @click="handleSignIn">{{
              elementContentList.portal_login_text5 || $t("login.text5")
            }}</span>
          </p>
        </div>
      </div>
      <terms v-if="showTerms" />
      <privacyPolicy v-if="showPrivacy" />
    </div>
  </template>
  
  <script>
  import { isvalidateEmail } from '@/utils/validate';
  import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import { register, registerAuthCodeSend, registerCheckAuthCodeSend } from '@/api/login'
  import privacyPolicy from './privacyPolicy.vue'
  import terms from './terms.vue'
  
  export default {
    name: 'register',
    components: {
      terms,
      privacyPolicy,
    },
    data () {
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_login_form_validate1 || this.$t('login.form.validate1')))
        } else if (!isvalidateEmail(value)) {
          callback(new Error(this.elementContentList.portal_login_form_validate2 || this.$t('login.form.validate2')))
        } else {
          callback()
        }
      };
      const validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_login_form_validate5 || this.$t('login.form.validate5')))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_login_form_validate3 || this.$t('login.form.validate3')))
        } else if (value.length < 8) {
          callback(new Error(this.elementContentList.portal_login_form_validate4 || this.$t('login.form.validate4')))
        } else {
          callback()
        }
      };
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_login_form_validate6 || this.$t('login.form.validate6')))
        } else if (value.length > 20) {
          callback(new Error(this.elementContentList.portal_login_form_validate7 || this.$t('login.form.validate7')))
        } else {
          callback()
        }
      }
      const validateCheckPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_login_form_validate8 || this.$t('login.form.validate8')))
        } else if (value != this.signForm.password) {
          callback(new Error(this.elementContentList.portal_login_form_validate9 || this.$t('login.form.validate9')))
        } else {
          callback()
        }
      }
      return {
        emailForm: {
          email: '',
          code: '',
        },
        emailRules: {
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          code: [{ required: true, trigger: 'blur', validator: validateCode }]
        },
        signForm: {
          username: '',
          password: '',
          checkPwd: '',
        },
        signRules: {
          username: [{ required: true, trigger: 'change', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          checkPwd: [{ required: true, trigger: 'blur', validator: validateCheckPwd }]
        },
        loading: false,
        pwdType: 'password',
        pwdType2: 'password',
        login_center_bg,
        dialogVisible: false,
        supportDialogVisible: false,
        isAgree: false,
        showEmail: true,
        disabled: true,
        isSend: false,
        remaining: 60,
        timer: null,
        elementContentList: '',
        showTerms: false,
        showPrivacy: false,
      }
    },
    watch: {
      'emailForm.email' (val) {
        if (!val) {
          this.disabled = true
        } else if (!isvalidateEmail(val)) {
          this.disabled = true
        } else {
          this.disabled = false
        }
      }
    },
    created () {
      this.elementContentList = window.elementContentList
  
    },
    methods: {
      handleSendCode () {
        this.disabled = true
        this.isSend = true
        this.timer = setInterval(() => {
          this.remaining--
          if (this.remaining == 0) {
            clearInterval(this.timer)
            this.disabled = false
            this.isSend = false
            this.remaining = 60
          }
        }, 1000);
        registerAuthCodeSend(this.emailForm.email).then(() => {
  
        })
      },
      handleSignIn () {
        this.handleOpenLoginDialog();
        // window.location.href = '/login'
      },
      // 查看协议
      handleShowAgreement (val) {
        if(val == 'service') {
          this.showTerms = true
        } else {
          this.showPrivacy = true
        }
      },
      // 注册
      handleSignUp () {
        this.$refs.signForm.validate(valid => {
          if (valid) {
            this.loading = true;
            const params = {
              account: this.emailForm.email,
              authCode: this.emailForm.code,
              nickName: this.signForm.username,
              password: this.signForm.password,
            }
            register(params).then(res => {
              if (res.code == 200) {
                this.$message.success({ message: this.elementContentList.portal_login_msg3 || this.$t('login.msg3'), duration: 1500 })
                this.loading = false
                this.handleOpenLoginDialog();
                // this.$router.push('/login')
              } else {
                this.loading = false;
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      showPwd () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      showPwd2 () {
        if (this.pwdType2 === 'password') {
          this.pwdType2 = ''
        } else {
          this.pwdType2 = 'password'
        }
      },
      handleNext () {
        if (!this.isAgree) {
          return this.$message.error({
            message: this.elementContentList.portal_login_text14 || this.$t('login.text14'),
            duration: 1500
          });
        }
        this.$refs.emailForm.validate(valid => {
          if (valid) {
            this.loading = true;
            registerCheckAuthCodeSend(this.emailForm.email, this.emailForm.code).then(res => {
              if (res.code == 200) {
                this.showEmail = false
              } else {
                this.$message.error({ message: this.elementContentList.portal_login_msg2 || this.$t('login.msg2'), duration: 1500 })
              }
              this.loading = false;
            }).catch(err => {
              this.loading = false;
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
  .register {
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
      .register_card {
        width: 400px;
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
        .form_card {
          gap: 10px;
          margin-top: 54px;
          .el-form-item {
            margin-bottom: 20px;
          }
          .code {
            .el-input,
            .el-input__inner {
              width: 100%;
            }
            .send_code {
              width: 157px;
              height: 59px;
              font-size: 14px;
              color: #f6497f;
              background: transparent;
              position: absolute;
              right: 0px;
            }
            .disabled {
              color: #ff9eb6;
            }
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
            gap: 10px;
            box-sizing: border-box;
            border: none;
            background: #f2f4f7;
          }
          .el-input__suffix {
            right: 21px;
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
        .remember {
          margin: 24px 0;
          .el-checkbox__label {
            font-size: 16px;
            font-weight: 500;
            line-height: 20.83px;
            color: #b1b5c3;
          }
          .agreement {
            font-size: 14px;
            line-height: 22px;
            color: #646873;
            span {
              cursor: pointer;
              text-decoration: underline;
              font-weight: 400;
            }
          }
        }
        .register_btn {
          width: 100%;
          height: 60px;
          border-radius: 999px;
          // background: linear-gradient(
          //     0deg,
          //     rgba(255, 255, 255, 0.5),
          //     rgba(255, 255, 255, 0.5)
          //   ),
          //   #1677ff;
          border: none;
          margin-top: 41px;
          font-size: 20px;
          font-weight: bold;
          line-height: 24.2px;
          color: #fffaf7;
        }
        .have_account {
          text-align: center;
          font-size: 14px;
          line-height: 22px;
          color: #3d3d3d;
          margin-top: 39px;
          span {
            cursor: pointer;
            text-decoration: underline;
            font-weight: 400;
          }
        }
      }
    }
  }
  </style>
  
  
  