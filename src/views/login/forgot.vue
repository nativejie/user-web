<template>
    <div class="forgot">
      <el-button
        v-if="!showEmail"
        circle
        icon="el-icon-back"
        @click="showEmail = true"
      ></el-button>
      <div v-show="showEmail" class="form_card">
        <el-form
          autoComplete="on"
          :model="emailForm"
          :rules="emailRules"
          ref="emailForm"
          label-position="top"
        >
          <el-form-item
            prop="username"
            :label="elementContentList.login_label1 || $t('login.label1')"
          >
            <el-input
              name="username"
              type="text"
              v-model="emailForm.username"
              autoComplete="on"
              :placeholder="elementContentList.login_label1 || $t('login.label1')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            prop="code"
            class="code"
            :label="elementContentList.login_text5 || $t('login.text5')"
          >
            <el-input
              name="code"
              type="text"
              v-model="emailForm.code"
              autoComplete="on"
              :placeholder="
                elementContentList.login_placeholder1 || $t('login.placeholder1')
              "
            >
            </el-input>
            <el-button
              :disabled="disabled"
              :class="disabled ? 'disabled' : ''"
              class="send_code"
              @click="handleSendCode"
              >{{
                isSend
                  ? (elementContentList.login_text6 || $t("login.text6")) +
                    ` (${remaining} s)`
                  : elementContentList.login_text7 || $t("login.text7")
              }}</el-button
            >
          </el-form-item>
        </el-form>
        <el-button
          class="login_btn"
          type="primary"
          :loading="loading"
          @click.native.prevent="handleNext"
        >
          {{ elementContentList.btns_next || $t("btns.next") }}
        </el-button>
      </div>
      <div v-show="!showEmail" class="form_card">
        <el-form
          autoComplete="on"
          :model="signForm"
          :rules="signRules"
          ref="signForm"
          label-position="top"
        >
          <el-form-item
            prop="password"
            :label="elementContentList.login_text8 || $t('login.text8')"
          >
            <el-input
              name="password"
              :type="pwdType"
              @keyup.enter.native="handleRestPassword"
              v-model="signForm.password"
              autoComplete="on"
              :placeholder="
                elementContentList.login_placeholder2 || $t('login.placeholder2')
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
          <el-form-item
            prop="checkPwd"
            :label="elementContentList.login_text9 || $t('login.text9')"
          >
            <el-input
              name="checkPwd"
              :type="pwdType2"
              @keyup.enter.native="handleRestPassword"
              v-model="signForm.checkPwd"
              autoComplete="on"
              :placeholder="
                elementContentList.login_placeholder3 || $t('login.placeholder3')
              "
            >
              <span slot="suffix" @click="showPwd2">
                <svg-icon
                  v-if="pwdType2 == ''"
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
        </el-form>
        <el-button
          class="login_btn"
          type="primary"
          :loading="loading"
          @click.native.prevent="handleRestPassword"
        >
          {{ elementContentList.login_text10 || $t("login.text10") }}
        </el-button>
      </div>
      <p class="have_account">
        <span @click="handleLoginIn">{{
          elementContentList.login_text2 || $t("login.text2")
        }}</span>
      </p>
    </div>
  </template>
  
  <script>
  import { isvalidateEmail } from '@/utils/validate';
  import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import { emailAuthCodeSend, forgetPassword } from '@/api/login'
  
  
  export default {
    name: 'forget',
    data () {
      const validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate7 || this.$t('login.validate7')))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate5 || this.$t('login.validate5')))
        } else if (value.length < 4) {
          callback(new Error(this.elementContentList.login_validate6 || this.$t('login.validate6')))
        } else {
          callback()
        }
      };
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate1 || this.$t('login.validate1')))
        } else if (value.length > 20) {
          callback(new Error(this.elementContentList.login_validate2 || this.$t('login.validate2')))
        } else {
          callback()
        }
      }
      const validateCheckPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.login_validate8 || this.$t('login.validate8')))
        } else if (value != this.signForm.password) {
          callback(new Error(this.elementContentList.login_validate9 || this.$t('login.validate9')))
        } else {
          callback()
        }
      }
      return {
        emailForm: {
          username: '',
          password: '',
          code: '',
        },
        emailRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
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
      }
    },
    watch: {
      'emailForm.username' (val) {
        if (!val) {
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
        const params = {
  
        }
        emailAuthCodeSend('forgetPassword', this.emailForm.username).then(() => {
  
        })
      },
      handleLoginIn () {
        this.$parent.isForgot = false
      },
      // 忘记密码
      handleShowAgreement (val) {
  
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
        this.$refs.emailForm.validate(valid => {
          if (valid) {
            this.showEmail = false
          } else {
            return false
          }
        })
      },
      handleRestPassword () {
        this.$refs.signForm.validate(valid => {
          if (valid) {
            this.loading = true;
            const params = {
              username: this.emailForm.username,
              authCode: this.emailForm.code,
              password: this.signForm.password,
            }
            forgetPassword(params).then(res => {
              if (res.code == 200) {
                this.$message.success({ message: this.elementContentList.login_message1 || this.$t('login.message1'), duration: 1500 })
                this.loading = false
                this.$router.push('/login')
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
    }
  }
  </script>
  
  <style lang="scss">
  .forgot {
    // .login_card{
    p {
      margin: 0;
    }
    .form_card {
      gap: 10px;
      margin-top: 54px;
      .code {
        .el-input,
        .el-input__inner {
          width: 224px;
        }
        .send_code {
          width: 157px;
          height: 40px;
          border-radius: 4px;
          padding: 0px 16px;
          gap: 8px;
          background: #ffffff;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.15);
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.88);
          margin-left: 8px;
        }
      }
      .el-form-item {
        margin-bottom: 20px;
      }
      .el-form-item__label {
        font-size: 20px;
        line-height: 28px;
        color: #000;
        padding: 0 0 7px;
      }
      .el-input {
        width: 393px;
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
        color: rgba(0, 0, 0, 0.88);
        span {
          cursor: pointer;
          text-decoration: underline;
          font-weight: 400;
        }
      }
    }
    .login_btn {
      background: #409eff;
      width: 393px;
      height: 40px;
      border-radius: 4px;
      margin-top: 20px;
      // font-size: 20px;
      // font-weight: bold;
      // line-height: 24.2px;
      // color: #FFFAF7;
    }
    .have_account {
      text-align: center;
      font-size: 14px;
      line-height: 22px;
      color: #1677ff;
      margin-top: 31px;
      span {
        cursor: pointer;
      }
    }
    // }
  }
  </style>
  
  
  