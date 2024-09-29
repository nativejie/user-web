<template>
    <div class="baseInfo">
      <div class="info_card">
        <p class="per_name">
          <span>{{ personalInfo.nickname }}</span>
          <img @click="handleEdit('nickname')" src="@/assets/my/EditFilled.png" />
        </p>
        <hr />
        <p class="per_detail flex">
          <span class="per_label">{{
            elementContentList.portal_baseInfo_text1 || $t("baseInfo.text1")
          }}</span>
          <span>{{
            personalInfo.email
              ? personalInfo.email
              : elementContentList.portal_baseInfo_text3 || $t("baseInfo.text3")
          }}</span>
          <img @click="handleEdit('email')" src="@/assets/my/EditFilled.png" />
        </p>
        <p class="per_detail flex">
          <span class="per_label">{{
            elementContentList.portal_baseInfo_text2 || $t("baseInfo.text2")
          }}</span>
          <span>{{
            personalInfo.phone
              ? personalInfo.phone
              : elementContentList.portal_baseInfo_text3 || $t("baseInfo.text3")
          }}</span>
          <img @click="handleEdit('phoneNum')" src="@/assets/my/EditFilled.png" />
        </p>
        <p class="per_detail flex">
          <span class="per_label">{{
            elementContentList.portal_baseInfo_text4 || $t("baseInfo.text4")
          }}</span>
          <span>{{ personalInfo.password ? "" : "********" }}</span>
          <img @click="handleEdit('password')" src="@/assets/my/EditFilled.png" />
        </p>
        <p class="per_detail flex">
          <span class="per_label">{{
            elementContentList.portal_baseInfo_text5 || $t("baseInfo.text5")
          }}</span>
          <span>{{
            personalInfo.birthday
              ? personalInfo.birthday.split(" ")[0]
              : elementContentList.portal_baseInfo_text3 || $t("baseInfo.text3")
          }}</span>
          <img @click="handleEdit('birthday')" src="@/assets/my/EditFilled.png" />
        </p>
      </div>
      <div class="my_dialog" v-if="showDialog">
        <div v-if="edit == 'name'" class="dialog_card">
          <p class="dia_title flex_b_c">
            {{ elementContentList.portal_baseInfo_text6 || $t("baseInfo.text6") }}
            <i @click="handleClose" class="el-icon-close"></i>
          </p>
          <p class="name_input">
            <el-input v-model="personalName"></el-input>
          </p>
          <p class="dia_btns">
            <el-button @click="handleClose" class="cancel">{{
              elementContentList.portal_btns_cancel || $t("btns.cancel")
            }}</el-button>
            <el-button @click="handleSaveName" class="save">{{
              elementContentList.portal_btns_save || $t("btns.save")
            }}</el-button>
          </p>
        </div>
        <div v-if="edit == 'birthday'" class="dialog_card">
          <p class="dia_title flex_b_c">
            {{ elementContentList.portal_baseInfo_text7 || $t("baseInfo.text7") }}
            <i @click="handleClose" class="el-icon-close"></i>
          </p>
          <p class="name_input">
            <el-date-picker
              v-model="birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="Select Date"
            >
            </el-date-picker>
            <!-- <el-input v-model="birthday"></el-input> -->
          </p>
          <p class="dia_btns">
            <el-button @click="handleClose" class="cancel">{{
              elementContentList.portal_btns_cancel || $t("btns.cancel")
            }}</el-button>
            <el-button @click="handleSavebirthday" class="save">{{
              elementContentList.portal_btns_save || $t("btns.save")
            }}</el-button>
          </p>
        </div>
        <div v-if="edit == 'phoneNum'" class="dialog_card">
          <p class="dia_title flex_b_c">
            {{ elementContentList.portal_baseInfo_text8 || $t("baseInfo.text8") }}
            <i @click="handleClose" class="el-icon-close"></i>
          </p>
          <p class="name_input">
            <el-input v-model="newPhone"></el-input>
          </p>
          <p class="dia_btns">
            <el-button @click="handleClose" class="cancel">{{
              elementContentList.portal_btns_cancel || $t("btns.cancel")
            }}</el-button>
            <el-button @click="handleSavePhoneNum" class="save">{{
              elementContentList.portal_btns_save || $t("btns.save")
            }}</el-button>
          </p>
        </div>
        <div v-if="edit == 'email' || edit == 'password'" class="dialog_card">
          <div v-if="showEmail">
            <p class="dia_title flex_b_c">
              {{
                elementContentList.portal_baseInfo_text9 || $t("baseInfo.text9")
              }}
              <i @click="handleClose" class="el-icon-close"></i>
            </p>
            <p style="font-size: 14px; line-height: 22px; margin-top: 23px">
              {{
                elementContentList.portal_baseInfo_text10 || $t("baseInfo.text10")
              }}
            </p>
            <p
              style="
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                margin-top: 35px;
              "
            >
              {{ this.personalInfo.email }}
            </p>
            <p class="auth_code flex_b_c">
              <el-input
                v-model="authCode"
                :placeholder="
                  elementContentList.portal_baseInfo_placeholder1 ||
                  $t('baseInfo.placeholder1')
                "
              />
              <el-button
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
            </p>
            <p class="continue">
              <el-button class="btn" @click="handleShowEmail">{{
                elementContentList.portal_baseInfo_text11 || $t("baseInfo.text11")
              }}</el-button>
            </p>
          </div>
          <div v-if="!showEmail && edit == 'email'">
            <p class="dia_title flex_b_c">
              <span>{{
                elementContentList.portal_baseInfo_text12 || $t("baseInfo.text12")
              }}</span>
              <i @click="handleClose" class="el-icon-close"></i>
            </p>
            <p class="new_email">
              <el-input
                v-model="newEmail"
                @blur="handleBlur3"
                :placeholder="
                  elementContentList.portal_baseInfo_placeholder2 ||
                  $t('baseInfo.placeholder2')
                "
              />
            </p>
            <p class="err_tip">{{ tips }}</p>
            <p class="auth_code flex_b_c">
              <el-input
                v-model="newAuthCode"
                @blur="handleBlur4"
                :placeholder="
                  elementContentList.portal_baseInfo_placeholder3 ||
                  $t('baseInfo.placeholder3')
                "
              />
              <el-button
                :disabled="disabled"
                :class="disabled ? 'disabled' : ''"
                class="send_code"
                @click="handleSendNewCode"
                >{{
                  isSend
                    ? elementContentList.portal_login_text7 ||
                      $t("login.text7") + ` (${remaining} s)`
                    : elementContentList.portal_login_text6 || $t("login.text6")
                }}</el-button
              >
            </p>
            <p class="err_tip">{{ tips2 }}</p>
            <p class="continue">
              <el-button class="btn" @click="handleEmailConfirm">{{
                elementContentList.portal_btns_confirm || $t("btns.confirm")
              }}</el-button>
            </p>
          </div>
          <div v-if="!showEmail && edit == 'password'">
            <p class="dia_title flex_b_c">
              <span
                >{{
                  elementContentList.portal_baseInfo_text13 ||
                  $t("baseInfo.text13")
                }}
              </span>
              <i @click="handleClose" class="el-icon-close"></i>
            </p>
            <p class="new_email">
              <el-input
                v-model="newPassword"
                @blur="handleBlur"
                :type="pwdType"
                :placeholder="
                  elementContentList.portal_baseInfo_placeholder4 ||
                  $t('baseInfo.placeholder4')
                "
              >
                <span slot="suffix" @click="showPwd">
                  <i class="el-icon-view"></i>
                </span>
              </el-input>
            </p>
            <p class="err_tip">{{ tips }}</p>
            <p class="new_email">
              <el-input
                v-model="checkPwd"
                :type="pwdType2"
                @blur="handleBlur2"
                :placeholder="
                  elementContentList.portal_baseInfo_placeholder5 ||
                  $t('baseInfo.placeholder5')
                "
              >
                <span slot="suffix" @click="showPwd2">
                  <i class="el-icon-view"></i>
                </span>
              </el-input>
            </p>
            <p class="err_tip">{{ tips2 }}</p>
            <p class="continue">
              <el-button class="btn" @click="handlePwdConfirm">{{
                elementContentList.portal_btns_confirm || $t("btns.confirm")
              }}</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getCookie } from '@/utils/support';
  import { updateInfo, getInfo, updateMail, updateMailAuthCodeSendOld, updateMailCheckOldAuthCode, updateMailAuthCodeSendNew, updateMailCheckNewAuthCode, updatePassword, updatePasswordAuthCodeSend } from '@/api/member'
  import { isvalidateEmail } from '@/utils/validate';
  
  export default {
    name: '',
    data () {
      return {
        personalInfo: {
          nickname: '',
          email: '',
          phone: '',
          password: '',
          birthday: '',
        },
        personalName: '',
        birthday: '',
        newPhone: '',
        showDialog: false,
        showEmail: true,
        edit: '',
        authCode: '',
        disabled: false,
        isSend: false,
        remaining: 60,
        timer: null,
        newEmail: '',
        newAuthCode: '',
        newPassword: '',
        checkPwd: '',
        tips: '',
        tips2: '',
        pwdType: 'password',
        pwdType2: 'password',
        elementContentList: '',
      }
    },
    mounted () {
      this.elementContentList = window.elementContentList
      // this.$store.dispatch('GetInfo').then(() => {
      //   console.log('userInfo', this.$store.state.user.userInfo)
      //   this.personalInfo = {...this.$store.state.user.userInfo}
      //   // this.personalInfo.password = getCookie('password')
      // }) 
      this.getUserInfo()
    },
    methods: {
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
      getUserInfo () {
        getInfo().then(res => {
          this.personalInfo = res.data
        })
      },
      handleBlur3 () {
        if (this.newEmail == '') {
          return this.tips = this.elementContentList.portal_login_form_validate1 || this.$t('login.form.validate1')
        } else if (!isvalidateEmail(this.newEmail)) {
          return this.tips = this.elementContentList.portal_login_form_validate2 || this.$t('login.form.validate2')
        } else {
          this.tips = ''
        }
      },
      handleBlur4 () {
        if (this.newAuthCode == '') {
          return this.tips2 = this.elementContentList.portal_login_form_validate3 || this.$t('login.form.validate3')
        } else {
          this.tips2 = ''
        }
      },
      handlePwdConfirm () {
        if (this.checkPwd.length == '') {
          return this.tips2 = this.elementContentList.portal_login_form_validate8 || this.$t('login.form.validate8')
        } else if (this.newPassword != this.checkPwd) {
          return this.tips2 = this.elementContentList.portal_login_form_validate9 || this.$t('login.form.validate9')
        } else {
          this.tips2 = ''
        }
        if (this.newPassword.length == '') {
          return this.tips = this.elementContentList.portal_login_form_validate3 || this.$t('login.form.validate3')
        } else if (this.newPassword.length < 8) {
          return this.tips = this.elementContentList.portal_login_form_validate4 || this.$t('login.form.validate4')
        } else {
          this.tips = ''
        }
        updatePassword(this.authCode, this.newPassword).then(res => {
          if (res.code == 200) {
            this.$message.success({ message: 'success', duration: 1500 })
            this.showDialog = false
          }
        })
      },
      handleBlur2 () {
        if (this.checkPwd.length == '') {
          return this.tips2 = this.elementContentList.portal_login_form_validate8 || this.$t('login.form.validate8')
        } else if (this.newPassword != this.checkPwd) {
          return this.tips2 = this.elementContentList.portal_login_form_validate9 || this.$t('login.form.validate9')
        } else {
          this.tips2 = ''
        }
      },
      handleBlur () {
        if (this.newPassword.length == '') {
          return this.tips = this.elementContentList.portal_login_form_validate3 || this.$t('login.form.validate3')
        } else if (this.newPassword.length < 8) {
          return this.tips = this.elementContentList.portal_login_form_validate4 || this.$t('login.form.validate4')
        } else {
          this.tips = ''
        }
      },
      handleSendCode () {
        this.disabled = true
        this.isSend = true
        this.remaining = 60
        this.timer = null
        this.timer = setInterval(() => {
          this.remaining--
          if (this.remaining == 0) {
            clearInterval(this.timer)
            this.disabled = false
            this.isSend = false
            this.remaining = 60
          }
        }, 1000);
        if (this.edit == 'password') {
          updatePasswordAuthCodeSend().then(() => {
  
          })
        } else {
          updateMailAuthCodeSendOld().then(() => {
  
          })
        }
      },
      handleSendNewCode () {
        this.disabled = true
        this.isSend = true
        this.remaining = 60
        this.timer = null
        this.timer = setInterval(() => {
          this.remaining--
          if (this.remaining == 0) {
            clearInterval(this.timer)
            this.disabled = false
            this.isSend = false
            this.remaining = 60
          }
        }, 1000);
        updateMailAuthCodeSendNew(this.newEmail).then(res => {
        })
      },
      handleShowEmail () {
        if (!this.authCode) return false
        updateMailCheckOldAuthCode(this.authCode).then(res => {
          if (res.code == 200) {
            this.showEmail = false
            this.disabled = false
            this.isSend = false
          }
        })
      },
      handleEmailConfirm () {
        if (this.newEmail == '') {
          return this.tips = this.elementContentList.portal_login_form_validate1 || this.$t('login.form.validate1')
        } else if (!isvalidateEmail(this.newEmail)) {
          return this.tips = this.elementContentList.portal_login_form_validate2 || this.$t('login.form.validate2')
        } else {
          this.tips = ''
        }
        if (this.newAuthCode == '') {
          return this.tips2 = this.elementContentList.portal_login_form_validate5 || this.$t('login.form.validate5')
        } else {
          this.tips2 = ''
        }
        updateMailCheckNewAuthCode(this.newAuthCode).then(res => {
          if (res.code == 200) {
            updateMail(this.newEmail, this.newAuthCode, this.authCode).then(resp => {
              if (resp.code == 200) {
                this.getUserInfo()
                this.handleClose()
              }
            })
          }
        })
      },
      handleEdit (val) {
        switch (val) {
          case 'nickname':
            this.edit = 'name'
            this.personalName = this.personalInfo.nickname
            break
          case 'email':
            this.edit = 'email'
            break
          case 'phoneNum':
            this.edit = 'phoneNum'
            this.newPhone = this.personalInfo.phone
            break
          case 'password':
            this.edit = 'password'
            break
          case 'birthday':
            this.edit = 'birthday'
            this.birthday = this.personalInfo.birthday
            break
        }
        this.showDialog = true
      },
      handleSavePhoneNum () {
        if (!this.newPhone) return false
        const params = {
          phone: this.newPhone,
          nickname: this.personalInfo.nickname,
          birthday: this.personalInfo.birthday,
        }
        updateInfo(params).then(res => {
          if (res.code == 200) {
            this.getUserInfo()
            this.handleClose()
          }
        })
      },
      handleSavebirthday () {
        const params = {
          birthday: this.birthday,
          nickname: this.personalInfo.nickname,
          // phone: this.personalInfo.nickname
        }
        updateInfo(params).then(res => {
          if (res.code == 200) {
            this.getUserInfo()
            this.handleClose()
          }
        })
      },
      handleSaveName () {
        if (!this.personalName) return false
        const params = {
          nickname: this.personalName,
          // email: this.personalInfo.email,
        }
        updateInfo(params).then(res => {
          if (res.code == 200) {
            this.getUserInfo()
            this.handleClose()
          }
        }).catch(() => {
        })
      },
      handleClose () {
        this.showDialog = false
        this.showEmail = true
        this.isSend = false
        this.disabled = false
        this.personalName = ''
        this.birthday = ''
        this.edit = ''
        this.remaining = 60
        this.newEmail = ''
        this.newAuthCode = ''
        this.authCode = ''
      },
    }
  }
  </script>
  
  <style lang="scss">
  .baseInfo {
    width: 100%;
    height: 100%;
    color: #3d3d3d;
    padding: 30px 24px;
    .info_card {
      width: 100%;
      height: 304px;
      border-radius: 8px;
      background: #f2f4f7;
      padding: 26px 30px;
      p {
        margin: 0;
      }
      .per_name {
        font-size: 38px;
        font-weight: 600;
        line-height: 46px;
        margin-bottom: 20px;
        img {
          width: 24px;
          cursor: pointer;
          margin-left: 4px;
        }
      }
      hr {
        border: none;
        border-top: 1px solid #d8d8d8;
        margin-bottom: 32px;
      }
      .per_detail {
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 165px;
          margin-right: 32px;
        }
        .per_label {
          width: 132px;
        }
        img {
          width: 24px;
          cursor: pointer;
          margin-left: 4px;
        }
      }
    }
    .activity {
      font-size: 20px;
      font-weight: 500;
      margin: 26px 0 10px;
    }
    .act_list {
      width: 100%;
      .act_item {
        width: 100%;
        height: 155px;
        border-radius: 12px;
        background: #f4f4f4;
        display: flex;
        padding: 23px 17px;
        .item_img {
          width: 109px;
          height: 109px;
          border-radius: 8px;
          background: #d8d8d8;
          margin-right: 12px;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
          }
        }
        .item_detail {
          width: 375px;
          // margin-right: 116px;
          p {
            margin: 0 0 8px 0;
            font-size: 14px;
            line-height: 22px;
          }
          p:nth-of-type(1) {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            height: 48px;
          }
        }
        .item_right {
          text-align: right;
          flex: 1;
          .item_delivering {
            width: 205px;
            height: 100%;
            border-radius: 8px;
            background: #d8d8d8;
            display: inline-block;
          }
        }
      }
    }
    .my_dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .dialog_card {
        width: 405px;
        border-radius: 8px;
        padding: 16px 24px;
        background: #fff;
        box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
          0px 3px 6px -4px rgba(0, 0, 0, 0.12),
          0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        p {
          margin: 0;
        }
        .dia_title {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.88);
          margin-bottom: 8px;
          i {
            cursor: pointer;
            font-size: 20px;
          }
        }
        .name_input {
          margin-top: 23px;
          .el-input__inner {
            border-radius: 6px;
            border: 1px solid rgba(0, 0, 0, 0.15);
          }
        }
        .dia_btns {
          margin-top: 35px;
          text-align: right;
          .cancel {
            width: 82px;
            height: 32px;
            border-radius: 8px;
            padding: 0px 16px;
            gap: 8px;
            background: #ffffff;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.15);
            font-size: 14px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.88);
          }
          .save {
            width: 67px;
            height: 32px;
            border-radius: 8px;
            padding: 0px 16px;
            gap: 8px;
            background: #f6497f;
            box-sizing: border-box;
            border: none;
            font-size: 14px;
            line-height: 22px;
            color: #ffffff;
          }
        }
        .auth_code {
          margin-top: 35px;
          .disabled {
            border: 1px solid rgba(0, 0, 0, 0.15);
            background: rgba(0, 0, 0, 0.04);
          }
          .el-input {
            width: 188px;
          }
          .el-input__inner {
            width: 188px;
            height: 32px;
            border-radius: 6px;
            padding: 0px 12px;
            gap: 10px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.15);
          }
          .send_code {
            width: 157px;
            height: 32px;
            border-radius: 6px;
            padding: 0px 16px;
            gap: 8px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            font-size: 14px;
            line-height: 22px;
            color: #001529;
          }
        }
        .continue {
          text-align: center;
          margin-top: 35px;
          .btn {
            width: 96px;
            height: 32px;
            border-radius: 8px;
            padding: 0px 16px;
            gap: 8px;
            background: #f6497f;
            border: none;
            font-size: 14px;
            line-height: 22px;
            color: #ffffff;
          }
        }
        .new_email {
          margin-top: 23px;
          .el-input__inner {
            height: 32px;
            border-radius: 6px;
            padding: 0px 16px;
            gap: 8px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            font-size: 14px;
            line-height: 22px;
            color: #001529;
          }
  
          .el-input__suffix {
            right: 21px;
            line-height: 32px;
            i {
              // font-size: 20px;
              color: #777e90;
              cursor: pointer;
            }
          }
        }
        .err_tip {
          font-size: 12px;
          color: #ff4d4f;
          position: absolute;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
    }
  }
  .el-date-table td.today span,
  .el-date-table td.available:hover,
  .el-date-picker__header-label.active,
  .el-date-picker__header-label:hover,
  .el-year-table td.today .cell,
  .el-year-table td .cell:hover,
  .el-year-table td.current:not(.disabled) .cell,
  .el-month-table td.today .cell,
  .el-month-table td .cell:hover,
  .el-picker-panel__icon-btn:hover {
    color: #ff4d4f;
  }
  .el-date-table td.current:not(.disabled) span {
    background: #ff4d4f;
    color: #fff !important;
  }
  </style>
  
  