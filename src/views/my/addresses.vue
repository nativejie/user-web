<template>
    <div class="addresses">
      <div class="title flex_b_c">
        <span>{{
          elementContentList.portal_address_text1 || $t("address.text1")
        }}</span>
        <el-button
          class="btn"
          v-if="this.addressList.length > 0"
          @click="handleAddNew"
          >{{
            elementContentList.portal_btns_addNew || $t("btns.addNew")
          }}</el-button
        >
      </div>
      <div v-if="this.addressList.length > 0" class="addresses_container">
        <div
          class="addr_item"
          :style="index % 2 == 1 ? { marginRight: 0 } : ''"
          v-for="(item, index) in addressList"
          :key="index + 'a'"
        >
          <div class="addr_row" style="font-weight: 500">
            <div class="addr_label">
              {{ elementContentList.portal_address_text2 || $t("address.text2") }}
            </div>
            <div class="addr_val">{{ item.name }}</div>
          </div>
          <div class="addr_row">
            <div class="addr_label">
              {{ elementContentList.portal_address_text3 || $t("address.text3") }}
            </div>
            <div class="addr_val">{{ item.country }}</div>
          </div>
          <div class="addr_row">
            <div class="addr_label">
              {{ elementContentList.portal_address_text4 || $t("address.text4") }}
            </div>
            <div class="addr_val">{{ item.detailAddress }}</div>
          </div>
          <div class="addr_row">
            <div class="addr_label">
              {{ elementContentList.portal_address_text5 || $t("address.text5") }}
            </div>
            <div class="addr_val">{{ item.postCode }}</div>
          </div>
          <div class="addr_row">
            <div class="addr_label">
              {{ elementContentList.portal_address_text6 || $t("address.text6") }}
            </div>
            <div class="addr_val">{{ item.phoneNumber }}</div>
          </div>
          <div class="btns">
            <div v-if="item.defaultStatus" class="default">
              {{ elementContentList.portal_btns_default || $t("btns.default") }}
            </div>
            <div style="float: right">
              <el-button
                @click="handleRemove(item, index)"
                type="text"
                style="color: #f6497f; padding: 0"
                >{{ "Remove" }}</el-button
              >
              <span style="color: #fde1e6; margin: 0 10px"> | </span>
              <el-button
                @click="handleEdit(item)"
                type="text"
                style="color: #f6497f; padding: 0"
                >{{ "Edit" }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.addressList.length == 0" class="nodata flex_c_c">
        <p><img src="@/assets/my/noData.png" /></p>
        <p style="margin: 22px 0">
          {{ elementContentList.portal_address_text7 || $t("address.text7") }}
        </p>
        <p>
          <el-button @click="handleAddNew" class="btn">{{
            elementContentList.portal_address_text8 || $t("address.text8")
          }}</el-button>
        </p>
      </div>
      <div v-if="showAddForm" class="dialog flex_c_c">
        <div class="form_card">
          <p class="dia_title">
            {{
              status == "add"
                ? elementContentList.portal_address_text9 || $t("address.text9")
                : elementContentList.portal_address_text10 || $t("address.text10")
            }}
          </p>
          <el-form
            ref="formData"
            :model="formData"
            label-position="top"
            :rules="formRules"
          >
            <el-form-item
              :label="
                elementContentList.portal_address_text11 || $t('address.text11')
              "
            >
              <el-input disabled v-model="formData.country" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text12 || $t('address.text12')
              "
              required
            >
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text13 || $t('address.text13')
              "
              required
            >
              <el-input v-model="formData.phoneNumber" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text14 || $t('address.text14')
              "
              required
            >
              <el-input v-model="formData.postCode" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text15 || $t('address.text15')
              "
              required
            >
              <el-input v-model="formData.detailAddress" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text16 || $t('address.text16')
              "
            >
              <el-input v-model="formData.detailAddressTwo" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text17 || $t('address.text17')
              "
              required
            >
              <el-input v-model="formData.city" />
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_address_text18 || $t('address.text18')
              "
            >
              <el-input v-model="formData.region" />
            </el-form-item>
            <el-form-item class="checkbox" :label="''">
              <el-checkbox v-model="formData.defaultStatus"></el-checkbox>
              <span style="margin-left: 8px">{{
                elementContentList.portal_address_text19 || $t("address.text19")
              }}</span>
            </el-form-item>
            <el-form-item :label="''">
              <el-button class="btn" @click="handleConfirm">{{
                status == "add"
                  ? elementContentList.portal_address_text8 || $t("address.text8")
                  : elementContentList.portal_address_text20 ||
                    $t("address.text20")
              }}</el-button>
              <el-button class="btn btn2" @click="handleCancel">{{
                elementContentList.portal_btns_cancel || $t("btns.cancel")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { addressList, addressInfo, addAddress, delleteAddress, updateAddress } from '@/api/member'
  
  
  export default {
    name: '',
    data () {
      return {
        showAddForm: false,
        formData: {
          country: 'United Kingdom',
          name: '',
          phoneNumber: '',
          postCode: '',
          detailAddress: '',
          detailAddressTwo: '',
          city: '',
          region: '',
          defaultStatus: 0,
          memberId: '',
        },
        formRules: {
          name: [{ required: true, trigger: 'blur', message: elementContentList.portal_address_text21 || this.$t('address.text21') }],
          phoneNumber: [{ required: true, trigger: 'blur', message: elementContentList.portal_address_text22 || this.$t('address.text22') }],
          postCode: [{ required: true, trigger: 'blur', message: elementContentList.portal_address_text23 || this.$t('address.text23') }],
          detailAddress: [{ required: true, trigger: 'blur', message: elementContentList.portal_address_text24 || this.$t('address.text24') }],
          city: [{ required: true, trigger: 'blur', message: elementContentList.portal_address_text25 || this.$t('address.text25') }],
        },
        addressList: [],
        userInfo: '',
        status: 'add',
        elementContentList: '',
      }
    },
    mounted () {
      this.elementContentList = window.elementContentList
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.formData.memberId = this.userInfo.id
      this.getAddressList()
    },
    methods: {
      getAddressList () {
        addressList().then(res => {
          let data = res.data
          let index = ''
          let defaultAdd = ''
          data.forEach((item, idx) => {
            if (item.defaultStatus) {
              defaultAdd = item
              index = idx
            }
          })
          data.splice(index, 1)
          data.unshift(defaultAdd)
          this.addressList = data
        })
      },
      handleEdit (val) {
        this.status = 'edit'
        addressInfo(val.id).then(res => {
          if (res.code == 200) {
            this.formData = res.data
            this.showAddForm = true
          }
        })
      },
      handleRemove (val, index) {
        const h = this.$createElement
        let text1 = this.elementContentList.portal_address_text26 || this.$t('address.text26')
        let text2 = this.elementContentList.portal_address_text27 || this.$t('address.text27')
        let text3 = this.elementContentList.portal_btns_ok || this.$t('btns.ok')
        let text4 = this.elementContentList.portal_btns_cancel || this.$t('btns.cancel')
        this.$msgbox({
          message: h('div', null, [
            h('p', { style: 'font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;' }, text1),
            h('p', null, text2),
          ]),
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn',
          showCancelButton: true,
          confirmButtonText: text3,
          cancelButtonText: text4,
          type: 'warning'
        }).then(() => {
          delleteAddress(val.id).then(res => {
            if (res.code == 200) {
              this.getAddressList()
            }
          })
        }).catch(() => {
  
        })
      },
      handleConfirm () {
        this.$refs.formData.validate(valid => {
          if (valid) {
            const params = {
              ...this.formData,
              defaultStatus: this.formData.defaultStatus ? 1 : 0
            }
            if (this.status == 'add') {
              addAddress(params).then(res => {
                if (res.code == 200) {
                  this.getAddressList()
                  this.showAddForm = false
                  this.$message.success({ message: this.elementContentList.portal_address_text28 || this.$t('address.text28'), duration: 1500 })
                }
              })
            } else {
              updateAddress(params, this.formData.id).then(res => {
                if (res.code == 200) {
                  this.getAddressList()
                  this.showAddForm = false
                  this.$message.success({ message: this.elementContentList.portal_address_text28 || this.$t('address.text28'), duration: 1500 })
                }
              })
            }
          } else {
            return false
          }
        })
      },
      handleCancel () {
        this.showAddForm = false
      },
      handleAddNew () {
        this.status = 'add'
        this.showAddForm = true
        this.formData = {
          country: 'United Kingdom',
          name: '',
          phoneNumber: '',
          postCode: '',
          detailAddress: '',
          detailAddressTwo: '',
          city: '',
          region: '',
          defaultStatus: 0,
          memberId: '',
        }
      },
    }
  }
  </script>
  
  <style lang="scss">
  .addresses {
    width: 100%;
    height: 100%;
    padding: 31px 24px;
    font-family: "Poppins";
    color: #3d3d3d;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      padding-bottom: 36px;
      border-bottom: 1px solid #d8d8d8;
      .btn {
        width: 94px;
        height: 32px;
        border-radius: 6px;
        padding: 0px 16px;
        gap: 8px;
        background: #f6497f;
        box-sizing: border-box;
        border: 1px solid #f6497f;
        color: #fff;
      }
    }
    .addresses_container {
      width: 100%;
      margin-top: 31px;
      display: flex;
      flex-wrap: wrap;
      .addr_item {
        width: 418px;
        height: 283px;
        border-radius: 8px;
        padding: 25px 27px;
        margin: 0 15px 21px 0;
        border: 1px solid #dadde5;
        .addr_row {
          display: flex;
          margin-bottom: 18px;
          .addr_label {
            width: 150px;
          }
          .addr_val {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .btns {
          padding-top: 13px;
          border-top: 1px solid #dadde5;
          height: 42px;
          color: #f6497f;
          .default {
            display: inline-block;
            width: 63px;
            height: 28px;
            border-radius: 999px;
            padding: 4px 10px;
            gap: 10px;
            background: #fde1e6;
          }
        }
      }
    }
    .nodata {
      width: 100%;
      flex: 1;
      flex-direction: column;
      img {
        width: 287px;
      }
      .btn {
        width: 122px;
        height: 32px;
        border-radius: 6px;
        padding: 0px 16px;
        gap: 8px;
        background: #f6497f;
        border: 1px solid #f6497f;
        color: #ffffff;
      }
    }
    .dialog {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      .form_card {
        width: 572px;
        padding: 38px;
        background: #fff;
        border-radius: 12px;
        .dia_title {
          font-size: 30px;
          font-weight: 600;
          line-height: 38px;
        }
        .el-form-item__label {
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          color: #3d3d3d;
          margin: 20px 0 8px;
          padding: 0;
        }
        .el-form-item {
          margin: 0;
        }
        .el-input__inner {
          height: 32px;
          border-radius: 6px;
          padding: 0px 16px;
          gap: 8px;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
        .checkbox {
          margin: 10px 0;
        }
        .btn {
          width: 112px;
          height: 32px;
          border-radius: 6px;
          padding: 0px 16px;
          gap: 8px;
          background: #f6497f;
          border: 1px solid #f6497f;
          color: #ffffff;
        }
        .btn2 {
          width: 82px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: rgba(0, 0, 0, 0.88);
          background: #fff;
        }
      }
    }
  }
  .quill-editor .ql-container {
    min-height: 220px;
  }
  
  .ql-container {
    min-height: 230px;
  }
  .el-message-box {
    padding: 22px;
    width: auto;
  }
  .el-message-box__status {
    top: 13px;
  }
  p {
    margin: 0;
  }
  </style>
  
  