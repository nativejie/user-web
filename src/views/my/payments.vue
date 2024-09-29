<template>
    <div class="payments">
      <div class="title flex_b_c">
        <span>{{ elementContentList.portal_pay_text1 || $t("pay.text1") }}</span>
        <el-button
          class="btn"
          v-if="this.paymentList.length > 0"
          @click="handleAddNew"
          >{{
            elementContentList.portal_btns_addNew || $t("btns.addNew")
          }}</el-button
        >
      </div>
      <div class="payments_container" v-if="this.paymentList.length > 0">
        <div class="payments_item" v-for="(item, idx) in 4" :key="idx">
          <div class="item_top">
            <div>
              <div style="font-size: 20px; line-height: 28px; font-weight: 500">
                {{ "Visa" }}
              </div>
              <div style="padding: 17px 0 9px">{{ "****2132" }}</div>
            </div>
            <div>
              <img src="@/assets/my/visa.png" />
            </div>
          </div>
          <div class="flex_b_c" style="margin-top: 10px">
            <div class="default">{{ "Defualt" }}</div>
            <el-button type="text" style="color: #f6497f; padding: 0">{{
              elementContentList.portal_btns_edit || $t("btns.edit")
            }}</el-button>
          </div>
        </div>
      </div>
      <div v-if="this.paymentList.length == 0" class="nodata flex_c_c">
        <p><img src="@/assets/my/noData.png" /></p>
        <p>
          <el-button @click="handleAddNew" class="btn">{{
            elementContentList.portal_pay_text2 || $t("pay.text2")
          }}</el-button>
        </p>
      </div>
      <div v-if="showAddForm" class="dialog flex_c_c">
        <div class="form_card">
          <p class="dia_title">
            {{ elementContentList.portal_pay_text3 || $t("pay.text3") }}
          </p>
          <el-form
            ref="formData"
            :model="formData"
            label-position="top"
            :rules="formRules"
          >
            <el-form-item
              :label="elementContentList.portal_pay_text4 || $t('pay.text4')"
            >
            </el-form-item>
            <el-form-item
              :label="elementContentList.portal_pay_text5 || $t('pay.text5')"
              prop="number"
            >
              <el-input v-model="formData.number" />
            </el-form-item>
            <el-form-item
              :label="elementContentList.portal_pay_text6 || $t('pay.text6')"
              prop="name"
            >
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item
              class="date"
              :label="elementContentList.portal_pay_text7 || $t('pay.text7')"
              prop="month"
            >
              <el-select class="month" v-model="formData.month" placeholder="">
                <el-option
                  v-for="item in monthList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="date" prop="year">
              <el-select class="year" v-model="formData.year" placeholder="">
                <el-option
                  v-for="item in yearList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="elementContentList.portal_pay_text8 || $t('pay.text8')"
              prop="code"
            >
              <el-input v-model="formData.code" />
            </el-form-item>
            <el-form-item style="margin-top: 64px" :label="''">
              <el-button class="btn" @click="handleConfirm">{{
                elementContentList.portal_pay_text9 || $t("pay.text9")
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
  export default {
    name: '',
    data () {
      return {
        paymentList: [],
        showAddForm: false,
        formData: {
          name: '',
          number: '',
          month: '01',
          year: '',
          code: '',
        },
        formRules: {
          name: [{ required: true, message: elementContentList.portal_pay_msg1 || this.$t('pay.msg1'), trigger: 'blur' }],
          number: [{ required: true, message: elementContentList.portal_pay_msg2 || this.$t('pay.msg2'), trigger: 'blur' }],
          month: [{ required: true, message: '', trigger: 'change' }],
          year: [{ required: true, message: '', trigger: 'change' }],
          code: [{ required: true, message: elementContentList.portal_pay_msg3 || this.$t('pay.msg3'), trigger: 'blur' }]
        },
        monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        yearList: [],
        elementContentList: '',
      }
    },
    mounted () {
      this.elementContentList = window.elementContentList
      this.getYearList()
    },
    methods: {
      getYearList () {
        let date = new Date()
        let y = date.getFullYear()
        this.formData.year = y
        let arr = [y]
        for (let i = 0; i < 20; i++) {
          y++
          arr.push(y)
        }
        this.yearList = arr
      },
      handleCancel () {
        this.showAddForm = false
  
      },
      handleConfirm () {
        this.$refs.formData.validate((valid) => {
          if (valid) {
  
            this.showAddForm = false
          } else {
  
          }
        })
  
      },
      handleAddNew () {
        this.showAddForm = true
      },
    }
  }
  </script>
  
  <style lang="scss">
  .payments {
    width: 100%;
    height: 100%;
    padding: 31px 24px;
    font-family: "Poppins";
    color: #3d3d3d;
    font-size: 14px;
    line-height: 22px;
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
        border: none;
        color: #fff;
      }
    }
    .payments_container {
      width: 100%;
      margin-top: 31px;
      .payments_item {
        width: 294px;
        height: 155px;
        border-radius: 8px;
        background: #fff;
        padding: 22px;
        display: inline-block;
        margin: 0 25px 25px 0;
        border: 1px solid #dadde5;
        .item_top {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e2e2e2;
          img {
            width: 90px;
            border-radius: 4px;
          }
        }
        .default {
          border-radius: 999px;
          width: 63px;
          padding: 4px 10px;
          gap: 10px;
          background: #fde1e6;
          font-size: 12px;
          color: #f6497f;
        }
      }
    }
    .nodata {
      width: 100%;
      height: calc(100% - 100px);
      flex-direction: column;
      img {
        width: 287px;
        margin-bottom: 29px;
      }
      .btn {
        height: 32px;
        border-radius: 6px;
        padding: 0px 16px;
        gap: 8px;
        background: #f6497f;
        border: none;
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
        width: 588px;
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
          margin: 16px 0 8px;
          padding: 0;
        }
        .el-form-item {
          margin: 0;
        }
        .el-input__inner {
          width: 360px;
          height: 32px;
          border-radius: 6px;
          padding: 0px 16px;
          gap: 8px;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
        .month {
          .el-input,
          .el-input__inner {
            width: 70px;
          }
        }
        .date {
          display: inline-block;
        }
        .year {
          margin-left: 14px;
          .el-input,
          .el-input__inner {
            width: 90px;
          }
        }
        .btn {
          height: 32px;
          border-radius: 6px;
          padding: 0px 16px;
          gap: 8px;
          background: #f6497f;
          border: none;
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
  </style>
  
  