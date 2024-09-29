<template>
    <div class="afterSale">
      <div class="back flex">
        <i @click="handleBack" class="el-icon-arrow-left"></i>
        <span>{{
          elementContentList.portal_order_text1 || $t("order.text1")
        }}</span>
      </div>
      <div style="height: calc(100% - 36px);" v-if="!showSuccess">
        <div v-if="showType">
          <p class="subtitle">
            {{ elementContentList.portal_order_text2 || $t("order.text2") }}
          </p>
          <!-- 普通商品 -->
          <div v-if="afterSalePro.productType != 'custom'" class="pro_info flex">
            <div class="image">
              <img v-if="afterSalePro.productPicUrl" :src="afterSalePro.productPicUrl" />
              <img v-else style="width: 70px; height: 70px" src="@/assets/index/logo.png" />
            </div>
            <div class="info">
              <p>
                {{ afterSalePro.productName }}
              </p>
              <p>
                <span
                  v-for="attr in afterSalePro.attributeValueVOs"
                  :key="attr.productAttributeUid"
                  style="margin-right: 8px"
                  >{{ attr.productAttributeName + ":" + attr.value }}</span
                >
              </p>
              <p>{{ "x" + afterSalePro.productQuantity }}</p>
              <p>{{ "£" + afterSalePro.productPrice }}</p>
            </div>
          </div>
          <!-- 定制商品 -->
          <div v-else class="pro_info flex">
            <div class="image flex_c_c">
              <img v-if="afterSalePro.productPicUrl" :src="afterSalePro.productPicUrl" />
              <img v-else style="width: 70px; height: 70px" src="@/assets/index/logo.png" />
            </div>
            <div class="pro_detail">
              <p class="pro_title">{{ afterSalePro.productName }}</p>
              <p
                class="pro_style"
                v-for="it in afterSalePro.orderPageCusObjItemVOs"
                :key="it.cartCusItemId"
              >
                <span style="margin-right: 24px">{{ it.objNickname }}</span>
                <span style="margin-right: 24px">{{
                  (it.height ? it.height + "cm, " : "") +
                  (it.weight ? it.weight + "kg" : "")
                }}</span>
                <span style="margin-right: 24px">{{ it.ratio }}</span>
                <span style="color: #F6497F;">£ {{ it.productPrice }}</span>
              </p>
              <div class="pro_info2">
                <div class="pro_item flex" v-for="pro in afterSalePro.orderPageCusServiceItemVOs" :key="pro.cartCusItemId">
                  <div class="flex_c_c img">
                    <img :src="pro.productPicUrl">
                  </div>
                  <div class="pro_name">
                    <div class="name">{{ pro.productName }}</div>
                    <div><span>{{ 'x ' + pro.productQuantity }}</span><span class="pro_price">£ {{ pro.productPrice }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="subtitle">
            {{ elementContentList.portal_order_text3 || $t("order.text3") }}
          </p>
          <div class="types flex">
            <!-- 仅退款 -->
            <div class="type_item flex" v-if="orderInfo.order.status == 1 || orderInfo.order.status == 7 || orderInfo.order.status == 6" @click="handleChooseType('JUST_REFUND')">
              <div class="img">
                <img src="@/assets/index/icon4.png" />
              </div>
              <div class="name">
                <p>
                  {{ elementContentList.portal_order_text4 || $t("order.text4") }}
                </p>
                <p>
                  {{ elementContentList.portal_order_text5 || $t("order.text5") }}
                </p>
              </div>
            </div>
            <!-- 退货退款 -->
            <div
              class="type_item flex"
              @click="handleChooseType('RETURN_REFUND')"
              style="margin-right: 0"
               v-if="afterSalePro.productType != 'custom' && orderInfo.order.status == 2"
            >
              <div class="img">
                <img src="@/assets/index/icon2.png" />
              </div>
              <div class="name">
                <p>
                  {{ elementContentList.portal_order_text6 || $t("order.text6") }}
                </p>
                <p>
                  {{ elementContentList.portal_order_text7 || $t("order.text7") }}
                </p>
              </div>
            </div>
            <!-- 换货 -->
            <div class="type_item flex" @click="handleChooseType('EXCHANGE')" v-if="afterSalePro.productType != 'custom' && orderInfo.order.status == 2">
              <div class="img">
                <img src="@/assets/index/icon2.png" />
              </div>
              <div class="name">
                <p>
                  {{ elementContentList.portal_order_text8 || $t("order.text8") }}
                </p>
                <p>
                  {{ elementContentList.portal_order_text9 || $t("order.text9") }}
                </p>
              </div>
            </div>
            <!-- 补件 -->
            <div
              class="type_item flex"
              @click="handleChooseType('PATCH')"
              style="margin-right: 0"
              v-if="afterSalePro.productType != 'custom' && orderInfo.order.status == 2"
            >
              <div class="img">
                <img src="@/assets/index/icon3.png" />
              </div>
              <div class="name">
                <p>
                  {{
                    elementContentList.portal_order_text10 || $t("order.text10")
                  }}
                </p>
                <p>
                  {{
                    elementContentList.portal_order_text11 || $t("order.text11")
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="apply">
          <div class="sted flex_a_c">
            <!-- status == 0, 发起售后申请-->
            <div class="step_item" :class="status < 7 ? 'completed' : ''">
              <p class="schedule">
                <span class="left_line"></span>
                <span class="round"></span>
                <span class="right_line"></span>
              </p>
              <p class="sted_status">
                {{
                  elementContentList.portal_order_status_status1 ||
                  $t("order.status.status1")
                }}
              </p>
            </div>
            <!-- status == 1, 商家处理申请-->
            <div
              class="step_item"
              :class="status < 7 && status > 0 ? 'completed' : ''"
            >
              <p class="schedule">
                <span class="left_line"></span>
                <span class="round"></span>
                <span class="right_line"></span>
              </p>
              <p class="sted_status">
                {{
                  elementContentList.portal_order_status_status2 ||
                  $t("order.status.status2")
                }}
              </p>
            </div>
            <!-- status == 2, 买家退回商品-->
            <div
              class="step_item"
              :class="status < 7 && status > 1 ? 'completed' : ''"
              v-if="afterType == 'RETURN_REFUND' || afterType == 'EXCHANGE'"
            >
              <p class="schedule">
                <span class="left_line"></span>
                <span class="round"></span>
                <span class="right_line"></span>
              </p>
              <p class="sted_status">
                {{
                  elementContentList.portal_order_status_status3 ||
                  $t("order.status.status3")
                }}
              </p>
            </div>
            <!-- status == 3, 商家完成发货-->
            <div
              class="step_item"
              :class="status < 7 && status > 2 ? 'completed' : ''"
              v-if="afterType == 'EXCHANGE'"
            >
              <p class="schedule">
                <span class="left_line"></span>
                <span class="round"></span>
                <span class="right_line"></span>
              </p>
              <p class="sted_status">
                {{
                  elementContentList.portal_order_status_status4 ||
                  $t("order.status.status4")
                }}
              </p>
            </div>
            <!-- status == 4, 完成退款/完成退货/完成换货/完成补件-->
            <div
              class="step_item"
              :class="status < 7 && status > 3 ? 'completed' : ''"
            >
              <p class="schedule">
                <span class="left_line"></span>
                <span class="round"></span>
                <span class="right_line"></span>
              </p>
              <p class="sted_status">
                {{
                  afterType == "JUST_REFUND"
                    ? elementContentList.portal_order_status_status5_1 ||
                      $t("order.status.status5_1")
                    : afterType == "RETURN_REFUND"
                    ? elementContentList.portal_order_status_status5_2 ||
                      $t("order.status.status5_2")
                    : afterType == "EXCHANGE"
                    ? elementContentList.portal_order_status_status5_3 ||
                      $t("order.status.status5_3")
                    : elementContentList.portal_order_status_status5_4 ||
                      $t("order.status.status5_4")
                }}
              </p>
            </div>
            <!-- status == 5, 商家拒绝售后申请/买家撤回售后申请-->
            <div
              class="step_item"
              v-if="status == 5"
              :class="status < 7 && status == 5 ? 'completed' : ''"
            >
              <p class="schedule">
                <span class="left_line"></span>
                <span class="round"></span>
                <span class="right_line"></span>
              </p>
              <p class="sted_status">
                {{
                  elementContentList.portal_order_status_status6 ||
                  $t("order.status.status6")
                }}
              </p>
            </div>
          </div>
          <el-form
            ref="formData"
            :model="formData"
            label-width="80px"
            :rules="rules"
          >
            <el-form-item
              :label="
                elementContentList.portal_order_form_label1 ||
                $t('order.form.label1')
              "
            >
              <!-- 普通商品 -->
              <div v-if="afterSalePro.productType != 'custom'" class="pro_info flex">
                <div class="image">
                  <img :src="afterSalePro.productPicUrl" />
                </div>
                <div class="info">
                  <p>
                    {{ afterSalePro.productName }}
                  </p>
                  <p>
                    <span
                      v-for="attr in afterSalePro.attributeValueVOs"
                      :key="attr.productAttributeUid"
                      style="margin-right: 8px"
                      >{{ attr.productAttributeName + ":" + attr.value }}</span
                    >
                  </p>
                  <p>{{ "x" + afterSalePro.productQuantity }}</p>
                  <p>{{ "£" + afterSalePro.productPrice }}</p>
                </div>
              </div>
              <!-- 定制商品 -->
              <div v-else class="pro_info cus_info flex">
                <div class="image flex_c_c">
                  <img v-if="afterSalePro.productPicUrl" :src="afterSalePro.productPicUrl" />
                  <img v-else style="width: 70px; height: 70px" src="@/assets/index/logo.png" />
                </div>
                <div class="pro_detail">
                  <p class="pro_title">{{ afterSalePro.productName }}</p>
                  <p
                    class="pro_style"
                    v-for="it in afterSalePro.orderPageCusObjItemVOs"
                    :key="it.cartCusItemId"
                  >
                    <span style="margin-right: 24px">{{ it.objNickname }}</span>
                    <span style="margin-right: 24px">{{
                      (it.height ? it.height + "cm, " : "") +
                      (it.weight ? it.weight + "kg" : "")
                    }}</span>
                    <span style="margin-right: 24px">{{ it.ratio }}</span>
                    <span style="color: #F6497F;">£ {{ it.productPrice }}</span>
                  </p>
                  <div class="pro_info2">
                    <div class="pro_item flex" v-for="pro in afterSalePro.orderPageCusServiceItemVOs" :key="pro.cartCusItemId">
                      <div class="flex_c_c img">
                        <img :src="pro.productPicUrl">
                      </div>
                      <div class="pro_name">
                        <div class="name">{{ pro.productName }}</div>
                        <div><span>{{ 'x ' + pro.productQuantity }}</span><span class="pro_price">£ {{ pro.productPrice }}</span></div>
                      </div>
                    </div>
                  </div>
                  <p style="color: #F6497F;">£ {{ afterSalePro.productPrice }}</p>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_order_form_label2 ||
                $t('order.form.label2')
              "
            >
              <span>{{
                afterType == "JUST_REFUND"
                  ? elementContentList.portal_order_text4 || $t("order.text4")
                  : afterType == "RETURN_REFUND"
                  ? elementContentList.portal_order_text6 || $t("order.text6")
                  : afterType == "EXCHANGE"
                  ? elementContentList.portal_order_text8 || $t("order.text8")
                  : elementContentList.portal_order_text10 || $t("order.text10")
              }}</span>
            </el-form-item>
            <el-form-item :label="labelList.label1" prop="reasonType">
              <el-select
                v-model="formData.reasonType"
                :placeholder="
                  elementContentList.portal_order_form_placeholder2 ||
                  $t('order.form.placeholder2')
                "
                :disabled="!isNew"
              >
                <el-option
                  v-for="item in reasonList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="afterType == 'JUST_REFUND' || afterType == 'RETURN_REFUND'"
              class="money"
              :label="labelList.label2"
              prop="refundAmount"
            >
              <el-input
                v-model="formData.refundAmount"
                @input="handleInput"
                :disabled="!isNew"
                ><i slot="prefix" style="font-style: normal; margin-right: 10px"
                  >£</i
                ></el-input
              >
              <span class="productPrice">{{
                (elementContentList.portal_order_text13 || $t("order.text13")) +
                afterSalePro.productPrice
              }}</span>
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_order_form_label11 ||
                $t('order.form.label11')
              "
              v-if="afterType == 'EXCHANGE' || afterType == 'PATCH'"
            >
              <el-button @click="handleChoosePro" class="choose_btn">{{
                elementContentList.portal_order_btns_btn4 || $t("order.btns.btn4")
              }}</el-button>
            </el-form-item>
            <el-form-item :label="labelList.label3">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :disabled="!isNew"
                :placeholder="
                  elementContentList.portal_order_form_placeholder1 ||
                  $t('order.form.placeholder1')
                "
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="
                elementContentList.portal_order_form_label6 ||
                $t('order.form.label6')
              "
            >
              <div class="upload_image">
                <el-upload
                  :action="BASE_API + '/file/img/upload'"
                  list-type="picture"
                  accept="image/*"
                  :headers="headers"
                  :file-list="imageList"
                  :show-file-list="false"
                  :limit="5"
                  :on-success="handleSuccess"
                  :on-exceed="handleOnExceed"
                  v-if="isNew"
                >
                  <div class="upload flex_c_c">
                    <i class="el-icon-plus"></i>
                    <span>Upload</span>
                    <span>{{
                      elementContentList.portal_order_text12 || $t("order.text12")
                    }}</span>
                  </div>
                </el-upload>
                <div class="image_list">
                  <div
                    class="image_item"
                    v-for="(item, idx) in imageList"
                    :key="idx + 'img'"
                  >
                    <img :src="item.fileRequest.preViewUrl" />
                    <div class="delete_mask flex_c_c" v-if="isNew">
                      <span @click="handleRemoveImage(item, idx)"
                        ><i class="el-icon-delete"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <p class="btns">
            <el-button v-if="isNew" @click="handleSubmit" class="sub_btn">{{
              elementContentList.portal_btns_submit || $t("btns.submit")
            }}</el-button>
            <el-button v-else @click="handleRevoke" class="re_btn">{{
              elementContentList.portal_order_btns_btn3 || $t("order.btns.btn3")
            }}</el-button>
            <el-button v-if="isNew" @click="handleSubmit" class="re_btn">{{
              elementContentList.portal_btns_cancel || $t("btns.cancel")
            }}</el-button>
          </p>
        </div>
      </div>
      <div v-else class="success">
        <p><i class="el-icon-success"></i></p>
        <p>
          {{
            elementContentList.portal_order_success_text1 ||
            $t("order.success.text1")
          }}
        </p>
        <p>
          {{
            elementContentList.portal_order_success_text2 ||
            $t("order.success.text2")
          }}
        </p>
        <p>
          <el-button @click="handleToDetail">{{
            elementContentList.portal_order_btns_btn2 || $t("order.btns.btn2")
          }}</el-button>
        </p>
      </div>
      <productInfo
        v-if="showProInfo"
        :productUid="afterSalePro.productUid"
        :afterSalePro="afterSalePro"
        @changeUid="getUid"
      />
    </div>
  </template>
  
  <script>
  import productInfo from './productInfo.vue'
  import { getToken } from '@/utils/auth'
  import { afterApply, afterDetail } from '@/api/order'
  export default {
    props: {
      afterSaleProduct: {
        type: Object,
        default: () => { }
      },
      orderInfo: {
        type: Object,
        default: () => { }
      },
    },
    components: {
      productInfo
    },
    data () {
      const validate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_order_form_tip3 || this.$t('order.form.tip3')))
        } else if (Number(value) <= 0 || Number(value) > Number(this.afterSalePro.productPrice)) {
          callback(new Error(this.elementContentList.portal_order_form_tip2 || this.$t('order.form.tip2')))
        } else {
          callback()
        }
      };
      const validate2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.elementContentList.portal_order_form_tip1 || this.$t('order.form.tip1')))
        } else {
          callback()
        }
      };
      return {
        type: 1,
        afterType: 'JUST_REFUND',// 售后类型:JUST_REFUND=仅退款；RETURN_REFUND=退货退款；EXCHANGE=换货；PATCH=补件
        reasonType: '', // 退款原因:JUST_REFUND_NOT_WANT=不想要此商品、JUST_REFUND_WRONG_PRODUCT=买错商品" + "、JUST_REFUND_NO_DELIVERY=快递一直未送到、RETURN_REFUND_NOT_LIKE=不喜欢此商品、RETURN_REFUND_NOT_MATCH=商品与描述不符" + "、RETURN_REFUND_WRONG_PRODUCT_AGAIN=商家发错商品、EXCHANGE_WRONG_PRODUCT_AGAIN=商家发错商品、EXCHANGE_WRONG_SIZE=买错商品规格" + "、PATCH_BROKEN=收到商品破损或变形、PATCH_LESS_PRODUCT=商家少发商品
        status: 0, // 0=发起售后申请；1=商家处理中；2=完成退款；3=完成换货；4=完成补件；5=售后已关闭；
        showType: true,
        formData: {
          reasonType: '',
          refundAmount: '',
          remark: '',
        },
        rules: {
          reasonType: [
            { required: true, trigger: 'change', validator: validate2 }
          ],
          refundAmount: [
            { required: true, trigger: 'blur', validator: validate }
          ],
          remark: '',
        },
        reasonList: [],
        BASE_API: '',
        headers: {
          'Authorization-Portal': getToken()
        },
        imageList: [],
        showSuccess: false,
        isNew: true,
        labelList: {},
        showProInfo: false,
        exchangeProductSkuUid: '',
        afterId: '',
        elementContentList: '',
        afterSalePro: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.BASE_API = import.meta.env['VITE_BASE_API']
      console.log('this.orderInfo', this.orderInfo)
      console.log('this.afterSaleProduct', this.afterSaleProduct)
      this.afterSalePro = this.afterSaleProduct
      if (this.orderInfo.order.hasAfter) {
        this.isNew = false
        this.showType = false
        if(this.orderInfo.afterList){
          this.afterId = this.orderInfo.afterList[0].afterId
        } else {
          this.afterId = this.afterSaleProduct.orderAfterVO.afterId
        }
        this.getDetails()
      }
      this.changeReasonList()
      this.formData.refundAmount = this.afterSalePro.productPrice
    },
    methods: {
      getDetails () {
        afterDetail({ afterId: this.afterId }).then(res => {
          this.formData.reasonType = res.data.reasonType
          this.formData.refundAmount = res.data.refundAmount
          this.formData.remark = res.data.remark
          this.afterType = res.data.afterType
          this.afterSalePro = res.data.orderItemVO
          let arr = []
          res.data.afterResourceVOS.forEach(item => {
            let obj = {
              fileRequest: {
                ossNo: item.ossNo,
                preViewUrl: item.preViewUrl,
              },
              sort: item.sort
            }
            arr.push(obj)
          })
          this.imageList = arr
          let currNode = res.data.currNode
          // 仅退款：APPLY_JUST_REFUND=发起售后申请、PROCESS_JUST_REFUND=商家处理申请、FINISH_REFUND_JUST_REFUND=完成退款
          //退货退款：APPLY_RETURN_REFUND=发起售后申请、PROCESS_RETURN_REFUND=商家处理申请、RETURN_RETURN_REFUND=买家退回商品、FINISH_REFUND_RETURN_REFUND=完成退款
          //换货：APPLY_EXCHANGE=发起售后申请、PROCESS_EXCHANGE=商家处理申请、RETURN_EXCHANGE=买家退回商品、DELIVER_EXCHANGE=商家完成发货、FINISH_EXCHANGE=完成换货
          //补件：APPLY_PATCH=发起售后申请、PROCESS_PATCH=商家处理申请、RETURN_EXCHANGE=商家完成发货、FINISH_PATCH=完成补件
          switch (currNode) {
            case 'APPLY_JUST_REFUND':
            case 'APPLY_RETURN_REFUND':
            case 'APPLY_EXCHANGE':
            case 'APPLY_PATCH':
              this.status = 0
              break
            case 'PROCESS_JUST_REFUND':
            case 'PROCESS_RETURN_REFUND':
            case 'PROCESS_EXCHANGE':
            case 'PROCESS_PATCH':
              this.status = 1
              break
            case 'RETURN_RETURN_REFUND':
              this.status = 2
              break
            case 'DELIVER_EXCHANGE':
              this.status = 3
              break
            case 'FINISH_REFUND_JUST_REFUND':
            case 'FINISH_REFUND_RETURN_REFUND':
            case 'FINISH_EXCHANGE':
            case 'FINISH_PATCH':
              this.status = 4
              break
          }
        })
      },
      getUid (val) {
        this.exchangeProductSkuUid = val
      },
      handleChoosePro () {
        this.showProInfo = true
      },
      changeReasonList () {
        switch (this.afterType) {
          case 'JUST_REFUND':
            this.reasonList = [
              { label: this.elementContentList.portal_order_select_op1 || this.$t('order.select.op1'), value: 'JUST_REFUND_NOT_WANT' },
              { label: this.elementContentList.portal_order_select_op2 || this.$t('order.select.op2'), value: 'JUST_REFUND_WRONG_PRODUCT' },
              { label: this.elementContentList.portal_order_select_op3 || this.$t('order.select.op3'), value: 'JUST_REFUND_NO_DELIVERY' },
            ]
            this.labelList = {
              label1: this.elementContentList.portal_order_formt_label3 || this.$t('order.form.label3'),
              label2: this.elementContentList.portal_order_formt_label4 || this.$t('order.form.label4'),
              label3: this.elementContentList.portal_order_formt_label5 || this.$t('order.form.label5'),
            }
            break
          case 'RETURN_REFUND':
            this.reasonList = [
              { label: this.elementContentList.portal_order_select_op4 || this.$t('order.select.op4'), value: 'RETURN_REFUND_NOT_LIKE' },
              { label: this.elementContentList.portal_order_select_op5 || this.$t('order.select.op5'), value: 'RETURN_REFUND_NOT_MATCH' },
              { label: this.elementContentList.portal_order_select_op6 || this.$t('order.select.op6'), value: 'RETURN_REFUND_WRONG_PRODUCT_AGAIN' },
            ]
            this.labelList = {
              label1: this.elementContentList.portal_order_form_label7 || this.$t('order.form.label7'),
              label2: this.elementContentList.portal_order_form_label8 || this.$t('order.form.label4'),
              label3: this.elementContentList.portal_order_form_label9 || this.$t('order.form.label8'),
            }
            break
          case 'EXCHANGE':
            this.reasonList = [
              { label: this.elementContentList.portal_order_select_op7 || this.$t('order.select.op7'), value: 'EXCHANGE_WRONG_PRODUCT_AGAIN' },
              { label: this.elementContentList.portal_order_select_op8 || this.$t('order.select.op8'), value: 'EXCHANGE_WRONG_SIZE' },
            ]
            this.labelList = {
              label1: this.elementContentList.portal_order_form_label9 || this.$t('order.form.label9'),
              label2: this.elementContentList.portal_order_form_label4 || this.$t('order.form.label4'),
              label3: this.elementContentList.portal_order_form_label10 || this.$t('order.form.label10'),
            }
            break
          case 'PATCH':
            this.reasonList = [
              { label: this.elementContentList.portal_order_select_op9 || this.$t('order.select.op9'), value: 'PATCH_BROKEN' },
              { label: this.elementContentList.portal_order_select_op10 || this.$t('order.select.op10'), value: 'PATCH_LESS_PRODUCT' },
            ]
            this.labelList = {
              label1: this.elementContentList.portal_order_form_label12 || this.$t('order.form.label12'),
              label2: this.elementContentList.portal_order_form_label4 || this.$t('order.form.label4'),
              label3: this.elementContentList.portal_order_form_label13 || this.$t('order.form.label13'),
            }
            break
        }
      },
      handleChooseType (val) {
        this.afterType = val
        this.showType = false
        this.changeReasonList()
      },
      handleRevoke () {
        const h = this.$createElement
        let text1 = this.elementContentList.portal_order_box_text1 || this.$t('order.box.text1')
        let text2 = this.elementContentList.portal_order_box_text2 || this.$t('order.box.text2')
        let text3 = this.elementContentList.portal_btns_confirm || this.$t('btns.confirm')
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
          this.$parent.showAfterSale = false
          this.$parent.getOrderList()
        }).catch(() => {
        })
      },
      handleSubmit () {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            const params = {
              afterType: this.afterType,
              exchangeProductSkuUid: this.exchangeProductSkuUid,
              orderId: this.afterSalePro.orderId,
              orderItemId: this.afterSalePro.orderItemId,
              picResourceRequests: this.imageList,
              reasonType: this.formData.reasonType,
              remark: this.formData.remark,
              refundAmount: this.formData.refundAmount,
            }
            afterApply(params).then(res => {
              if (res.code == 200) {
                this.showSuccess = true
                this.afterId = res.data
              }
            })
          } else {
            return false
          }
        })
      },
      handleToDetail () {
        this.isNew = false
        this.showSuccess = false
        afterDetail(this.afterId).then(res => {
  
        })
      },
      handleBack () {
        this.$parent.showAfterSale = false
      },
      handleInput (val) {
        this.formData.refundAmount = this.formData.refundAmount.replace(/[^\d]/g, '')
        // if (Number(val) <= 0 || Number(val) > Number(this.afterSalePro.productPrice)) {
        //   this.formData.refundAmount = ''
        // }
      },
      handleSuccess (res, file, fileList) {
        if(res.code == 500 ){
          this.$message.error({message: res.message, duration: 1500})
          return false
        }
        let obj = {
          fileRequest: {
            fileName: res.data.fileName,
            fileSize: res.data.fileSize,
            ossNo: res.data.ossNo,
            preViewUrl: res.data.preViewUrl,
          }
        }
        this.imageList.push(obj)
      },
      handleRemoveImage (val, idx) {
        this.imageList.splice(idx, 1)
      },
      handleOnExceed () {
        this.$message.error({ message: this.elementContentList.portal_order_text32 || this.$t('order.text32'), duration: 1500 })
      },
    }
  }
  </script>
  
  <style lang="scss">
  .afterSale {
    width: 100%;
    height: 100%;
    padding-right: 24px;
    position: relative;
      .back {
      color: #f6497f;
      font-size: 16px;
      line-height: 24px;
      i {
        margin-right: 14px;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .subtitle {
      margin-top: 40px;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #3d3d3d;
    }
    .pro_info {
      margin-top: 24px;
      align-items: flex-start;
      .image {
        width: 100px;
        height: 100px;
        border-radius: 7px;
        margin-right: 16px;
        background: linear-gradient(0deg, #FFE0E0 2%, #FFDCE9 100%);
        img {
          width: 100%;
          height: 100%;
          border-radius: 7px;
          object-fit: contain;
        }
      }
      .pro_detail {
        margin-left: 17px;
        flex: 1;
        .pro_title {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          margin: 0 0 9px 0;
        }
        .pro_style {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          margin: 9px 0;
          span {
            font-weight: 400;
          }
        }
        .pro_info2{  
          width: 100%;
          padding: 12px;
          background: #F8F9FC;
          border-radius: 8px;
          font-size: 14px;
          i{
            float: right
          }
          .pro_item{
            margin-bottom: 12px;
            .img{
              width: 40px;
              height: 40px;
              border-radius: 3px;
              margin-right: 12px;
              img{
                width: 100%;
                height: 100%;
                border-radius: 3px;
                object-fit: contain;
              }
            }
            .pro_name{
              flex: 1;
              .name{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis; // 溢出显示省略号
                display: -webkit-box;  // 弹性盒子
                -webkit-box-orient: vertical; // 上下垂直排列
                -webkit-line-clamp: 1; // 显示行数（数字可调整）
                margin-bottom: 4px;
              }
              span{
                margin-right: 16px;
                font-size: 12px;
              }
              .pro_price{
                color: #F6497F;
              }
            }
          }
        }
      }
      .info {
        p {
          margin-bottom: 2px;
          line-height: 22px;
        }
        p:nth-of-type(1) {
          font-weight: 500;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          line-height: 20px;
        }
        p:nth-of-type(3) {
        }
        p:nth-of-type(4) {
          color: #f6497f;
          margin: 0;
        }
      }
    }
    .types {
      flex-wrap: wrap;
      margin-top: 24px;
      .type_item {
        padding: 24px 32px;
        width: 414px;
        height: 106px;
        border-radius: 10px;
        border: 1px solid #e6e9f0;
        margin: 0 24px 24px 0;
        cursor: pointer;
        .img {
          margin-right: 24px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .name {
          p:nth-of-type(1) {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: #3d3d3d;
            margin-bottom: 12px;
          }
          p:nth-of-type(2) {
            color: #646873;
          }
        }
        &:hover {
          border: 1px solid #f6497f;
        }
      }
    }
    .apply {
      height: calc(100% - 80px);
      overflow-y: scroll;
      .sted {
        width: 100%;
        border-radius: 8px;
        background: #fff;
        padding: 24px 32px;
        margin-top: 24px;
        background: #f8f9fc;
        border-radius: 8px;
        .step_item {
          text-align: center;
          flex: 1;
          .schedule {
            white-space: nowrap;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
            }
            .left_line {
              width: calc(50% - 6px);
              border: 1.5px solid #e6e9f0;
            }
            .round {
              width: 8px;
              height: 8px;
              background: #acb1bf;
              margin: 0 4px;
              border-radius: 50%;
            }
            .right_line {
              width: calc(50% - 6px);
              border: 1.5px solid #e6e9f0;
            }
          }
          .sted_status {
            font-size: 14px;
            line-height: 22px;
            font-variation-settings: "opsz" auto;
            color: #acb1bf;
            margin: 8px 0 2px;
          }
          .time {
            font-size: 12px;
            line-height: 20px;
            font-variation-settings: "opsz" auto;
            color: #acb1bf;
            height: 20px;
          }
        }
        .step_item:first-child {
          .schedule {
            .left_line {
              border: none;
            }
          }
        }
        .step_item:last-child {
          .schedule {
            .right_line {
              border: none;
            }
          }
        }
        .completed {
          .schedule {
            .left_line {
              border-color: #1677ff;
            }
            .round {
              background: #1677ff;
            }
            .right_line {
              border-color: #1677ff;
            }
          }
          .sted_status {
            color: #1f2126;
          }
          .time {
            color: #acb1bf;
          }
        }
        .cancel_pay {
          .schedule {
            .round {
              background: #ff5a63;
            }
          }
          .sted_status {
            color: #ff5a63;
          }
          .time {
            color: #ff5a63;
          }
        }
      }
      .el-form {
        margin-top: 16px;
        .el-form-item__label {
          margin-right: 47px;
        }
        .choose_btn {
          width: 80px;
          height: 30px;
          border-radius: 999px;
          padding: 4px 12px;
          gap: 10px;
          background: #fff0f2;
          color: #f6497f;
          border: none;
        }
        .el-form-item__error {
          left: 47px;
        }
        .is-error {
          .el-input__inner {
            border: 1px solid #ff5a63;
          }
        }
      }
      .pro_info {
        margin-top: 12px;
      }
      .cus_info{
        background: #F8F9FC;
        padding: 16px;
        margin: 0;
        align-items: flex-start;
        .pro_info2{
          background: #fff;
        }
      }
      .upload_image {
        margin-bottom: 26px;
        display: flex;
        .upload {
          width: 104px;
          height: 104px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.04);
          border: 1px dashed rgba(0, 0, 0, 0.15);
          flex-direction: column;
          margin: 0 12px 12px 0;
        }
        .el-upload:focus {
          color: #3d3d3d;
        }
        span {
          line-height: 22px;
        }
        .image_list {
          display: flex;
          flex-wrap: wrap;
          .image_item {
            width: 104px;
            height: 104px;
            border-radius: 8px;
            margin: 0 0 12px 12px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 8px;
              background: rgba(0, 0, 0, 0.04);
            }
            video {
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
            .delete_mask {
              width: 100%;
              height: 32px;
              background: rgba(0, 0, 0, 0.7);
              border-radius: 0px 0px 8px 8px;
              position: absolute;
              bottom: 0;
              opacity: 0;
              z-index: -1;
              span {
                color: #fff;
                cursor: pointer;
                font-size: 16px;
              }
            }
          }
          .image_item:hover {
            .delete_mask {
              opacity: 1;
              z-index: 1;
            }
          }
        }
      }
      .el-input__inner {
        width: 287px;
        height: 46px;
        border-radius: 999px;
        padding: 12px 24px;
        background: #f2f4f7;
        border: none;
      }
      .money {
        .el-input__inner {
          color: #f6497f;
        }
        .el-input__prefix {
          color: #f6497f;
          left: 14px;
          top: 4px;
        }
        .el-input {
          width: 287px;
        }
      }
      .el-textarea {
        width: 500px;
      }
      .el-textarea__inner {
        width: 500px;
        height: 140px;
        border-radius: 6px;
        padding: 5px 12px;
        background: #ffffff;
        border: 1px solid #dadde5;
      }
      .productPrice {
        font-size: 12px;
        line-height: 20px;
        color: #646873;
        margin-left: 12px;
      }
    }
    .btns {
      width: calc(100% + 24px);
      position: absolute;
      bottom: -35px;
      left: -24px;
      text-align: right;
      box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.05);
      padding: 24px;
      background: #fff;
      .sub_btn {
        min-width: 120px;
        height: 40px;
        border-radius: 9999px;
        padding: 0px 16px;
        gap: 8px;
        background: #f6497f;
        color: #ffffff;
        border: none;
      }
      .re_btn {
        min-width: 120px;
        height: 40px;
        border-radius: 9999px;
        padding: 0px 16px;
        gap: 8px;
        background: #ffffff;
        border: 1px solid #f6497f;
        color: #f6497f;
      }
    }
    .success {
      text-align: center;
      p:nth-of-type(1) {
        margin: 139px 0 24px;
        i {
          font-size: 48px;
          color: #f6497f;
        }
      }
      p:nth-of-type(2) {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
      p:nth-of-type(3) {
        color: #646873;
        margin: 12px 0 24px;
      }
      p:nth-of-type(4) {
        .el-button {
          width: 104px;
          height: 42px;
          border-radius: 999px;
          padding: 10px;
          gap: 10px;
          background: #fff0f2;
          color: #f6497f;
          border: none;
        }
      }
    }
  }
  </style>
  
  