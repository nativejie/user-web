<template>
  <div>
    <el-dialog
      class="sign-up-dialog"
      :visible.sync="dialogVisible"
      @close="onClose"
      :show-close="false"
      center
      modal
      close-on-click-modal
    >
      <div class="sign-up-dialog-title">
        POKIDOL
      </div>
      <div class="sign-up-dialog-wrap">
        <p class="sign-up-dialog-wrap-title">Welcome to POKIDOL!</p>

        <div class="register_card">
          <div v-if="showEmail" class="form_card">
            <el-form
              autoComplete="on"
              :model="emailForm"
              :rules="emailRules"
              ref="emailForm"
              label-position="top"
            >
              <el-form-item prop="email">
                <el-input
                  class="gray-input"
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
              <el-form-item prop="code" class="code">
                <el-input
                  class="gray-input"
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
                <!-- send code -->
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
              <el-checkbox v-model="isAgree" style="marginRight: 8px;" />
              <span class="agreement">
                {{ 
                  elementContentList.portal_login_text10 || $t("login.text10")
                }}
                <span style="textDecoration: underline;" @click="handleShowAgreement('service')">{{
                  elementContentList.portal_login_text11 || $t("login.text11")
                }}</span>,
                <span style="textDecoration: underline;" @click="handleShowAgreement('privacy')">{{
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
              >
                <el-input
                  class="gray-input"
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
              >
                <el-input
                  class="gray-input"
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
              >
                <el-input
                  class="gray-input"
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
          <p class="have_account" style="marginTop: 24px">
            {{ elementContentList.portal_login_text13 || $t("login.text13") }}
            <span style="color: #f6497f" @click="handleSignIn">{{
              elementContentList.portal_login_text5 || $t("login.text5")
            }}</span>
          </p>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidateEmail } from '@/utils/validate';
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png'
import { register, registerAuthCodeSend, registerCheckAuthCodeSend } from '@/api/login'

export default {
  name: 'register',
  props: {
    dialogVisible: Boolean,
    onClose: Function,
  },
  components: {
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

<style lang="scss" scoped>
.sign-up-dialog {

  ::v-deep .el-dialog {
    width: 440px;
    height: 520px;
    margin: 200px auto;
    border-radius: 24px;
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
      .sign-up-dialog-title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: 500;
      }
      .sign-up-dialog-wrap {
        padding: 24px 40px;
        background-color: #fff;
        height: 435px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #40001C;
        .sign-up-dialog-wrap-title {
          font-size: 24px;
        }
        .register_card {
          width: 100%;
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .code {
            height: 54px;

            .el-input,
            .el-input__inner {
              width: 100%;
            }
            .send_code {
              line-height: 54px;
              padding: 0 20px 0 0;
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
          .agreement {
            font-size: 12px;
            color: #535E6F;
          }
        }
      }
    }
  }

  ::v-deep .gray-input {
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
      right: 24px !important;
      line-height: 54px;
    }
  }
  .register_btn {
    width: 100%;
    height: 56px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
}
</style>