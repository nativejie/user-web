<template>
    <div class="settlement">
      <div v-if="isOrder" class="settlement_container">
        <p class="set_title flex_b_c">
          <img src="@/assets/index/logo2.png" />
          <!-- <span>Checkout ({{ num }} items)</span> -->
        </p>
        <div class="set_main">
          <div class="main_left">
            <!-- 支付方式 -->
            <div class="pay_card">
              <div class="card_head">
                <div class="card_title">
                  <span>1</span>
                  <span>{{
                    elementContentList.portal_settlement_title2 ||
                    $t("settlement.title2")
                  }}</span>
                </div>
                <div class="add_info" v-show="!ShowChoosePay">
                  <div class="info_left">
                    <p>
                      {{
                        elementContentList.portal_settlement_text5 ||
                        $t("settlement.text5")
                      }}
                    </p>
                    <!-- <p>{{ "Visa" }}</p>
                    <p>{{ "Cyrus" }}</p>
                    <p>{{ "****2312" }}</p> -->
                  </div>
                  <div class="info_right">
                    <el-button
                      type="text"
                      class="btn"
                      @click="handleChangeAgain('pay')"
                      >{{
                        elementContentList.portal_btns_change || $t("btns.change")
                      }}</el-button
                    >
                  </div>
                </div>
                <div v-show="showSaveBtn == 'pay'">
                  <el-button
                    type="text"
                    style="padding: 0; color: #f6497f"
                    @click="handleSaveAgain()"
                    >{{
                      elementContentList.portal_btns_save || $t("btns.save")
                    }}</el-button
                  >
                </div>
              </div>
              <div v-show="ShowChoosePay" class="pay_list">
                <div
                  @click="handleChangePay(item, index)"
                  class="addr_item"
                  :class="actPay == index ? 'active' : ''"
                  v-for="(item, index) in payList"
                  :key="index + 'ad'"
                  :style="index % 3 == 2 ? { marginRight: 0 } : ''"
                >
                  <div class="checked">
                    <img src="@/assets/index/checked.png" />
                  </div>
                  <p>
                    {{
                      elementContentList.portal_settlement_text5 ||
                      $t("settlement.text5")
                    }}
                  </p>
                  <!-- <p>{{ "Visa" }}</p> -->
                  <!-- <p>{{ "Cyrus" }}</p> -->
                  <p class="pay_de">
                    <!-- {{ "****2312" }} -->
                    <span class="defualt" v-if="index == 0">{{
                      elementContentList.portal_btns_default || $t("btns.default")
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- 商品信息 -->
            <div class="review_card">
              <div class="card_head" :class="isChooseReview ? '' : 'not_choose'">
                <div class="card_title">
                  <span>2</span>
                  <span>{{
                    elementContentList.portal_settlement_title3 ||
                    $t("settlement.title3")
                  }}</span>
                </div>
                <div class="review_info" v-show="showReviewInfo">
                  <div class="info_head">
                    <div class="info_left">
                      <!-- <p>
                        <span>Delivery date: {{ "Jan. 31, 2024" }}</span>
                        <span style="opacity: 0.4; margin-left: 7px"
                          >Estimated</span
                        >
                      </p> -->
                    </div>
                  </div>
                  <div
                    class="pro_info"
                    v-for="(item, idx) in customList"
                    :key="idx + 'qc'"
                  >
                    <div class="pro_img flex_c_c">
                      <img
                        style="width: 48px; height: 48px"
                        src="@/assets/index/logo.png"
                      />
                    </div>
                    <div class="pro_title">
                      <p>{{ item.productName }}</p>
                    </div>
                  </div>
                  <div
                    class="pro_info"
                    v-for="(item, idx) in normalList"
                    :key="idx + 'q'"
                  >
                    <div class="pro_img flex_c_c">
                      <img v-if="item.productPicUrl" :src="item.productPicUrl" />
                      <img
                        v-else
                        style="width: 48px; height: 48px"
                        src="@/assets/index/logo.png"
                      />
                    </div>
                    <div class="pro_title">
                      <p>{{ item.productName }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="ShowChooseReview" class="review_list">
                <!-- 定制商品 -->
                <div v-if="customList.length > 0" class="border">
                  <span class="title2">{{
                    elementContentList.portal_settlement_text12 ||
                    $t("settlement.text12")
                  }}</span>
                  <div class="addr_card">
                    <p v-if="!customAddr" style="text-align: center">
                      <span>{{
                        elementContentList.portal_settlement_text14 ||
                        $t("settlement.text14")
                      }}</span
                      ><span
                        @click="handleShowAddr('custom')"
                        style="color: #f6497f; margin-left: 12px; cursor: pointer"
                        >{{
                          elementContentList.portal_settlement_text15 ||
                          $t("settlement.text15")
                        }}</span
                      >
                    </p>
                    <div v-else class="flex card_info">
                      <img src="@/assets/index/location.png" />
                      <div class="addr_info">
                        <p v-if="ActMethod == 1">
                          {{
                            customAddr.detailAddress +
                            (customAddr.detailAddress ? "," : "") +
                            customAddr.detailAddressTwo +
                            (customAddr.detailAddressTwo ? "," : "") +
                            customAddr.city +
                            (customAddr.city ? "," : "") +
                            customAddr.country
                          }}
                        </p>
                        <p v-if="ActMethod == 1" style="margin-top: 8px">
                          <span>{{ customAddr.name }}</span>
                          <span style="margin-left: 24px; color: #646873">{{
                            customAddr.phoneNumber
                          }}</span>
                        </p>
                        <p v-if="ActMethod == 2">
                          {{
                            elementContentList.portal_settlement_text16 ||
                            $t("settlement.text16")
                          }}
                        </p>
                      </div>
                      <el-button @click="handleShowAddr('custom')" type="text">{{
                        elementContentList.portal_btns_edit || $t("btns.edit")
                      }}</el-button>
                    </div>
                  </div>
                  <div
                    class="pro_item"
                    v-for="(item, idx) in customList"
                    :key="idx + 'c'"
                  >
                    <div class="cus_item item">
                      <div class="pro_img flex_c_c">
                        <img
                          v-if="item.productPicUrl"
                          :src="item.productPicUrl"
                        />
                        <img
                          v-else
                          style="width: 60px; height: 60px"
                          src="@/assets/index/logo.png"
                        />
                      </div>
                      <div class="pro_info">
                        <p>{{ item.productName }}</p>
                        <p
                          v-for="it in item.cartCusObjItemVOS"
                          :key="it.cartCusItemId"
                        >
                          <span style="margin-right: 24px">
                            {{it.objNickname}}
                          </span>
                          <span style="margin-right: 24px">
                            <!-- TODO: 新字段 -->
                            {{it.cyrus}}
                          </span>
                          <span style="margin-right: 24px">{{
                            (it.height ? it.height + "cm" : "") +
                            (it.weight ? it.weight + "kg" : "")
                          }}</span>
                          <span style="margin-right: 24px">{{ it.ratio }}</span>
                          <span style="margin-right: 24px; color: #f6497f"
                            >£ {{ it.price }}</span
                          >
                          <Deposit />
                        </p>
                        <div class="pro_info2">
                          <div style="margin-top: 16px">
                            <div
                              class="pro_item flex"
                              v-for="pro in item.cartCusServiceItemVOS"
                              :key="pro.cartCusItemId"
                            >
                              <div class="flex_c_c img">
                                <img :src="pro.productPicUrl" />
                              </div>
                              <div class="pro_name">
                                <div class="name">{{ pro.productName }}</div>
                                <!-- <div
                                  v-for="attr in pro.attributeValueVOs"
                                  :key="attr.productAttributeValueUid"
                                >
                                  {{ attr.productAttributeName + ': ' + attr.value}}
                                </div> -->
                                <div>
                                  <span>{{ "x " + pro.quantity }}</span
                                  ><span class="pro_price"
                                    >£ {{ pro.price }}</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p
                          class="pro_price"
                          style="text-align: right; margin-top: 12px"
                        >
                          £ {{ item.price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 普通商品 -->
                <div
                  v-if="normalList.length > 0"
                  class="border"
                  style="margin-top: 16px"
                >
                  <span class="title2">{{
                    elementContentList.portal_settlement_text13 ||
                    $t("settlement.text13")
                  }}</span>
                  <div class="addr_card">
                    <p v-if="!normalAddr" style="text-align: center">
                      <span>{{
                        elementContentList.portal_settlement_text14 ||
                        $t("settlement.text14")
                      }}</span
                      ><span
                        @click="handleShowAddr('normal')"
                        style="color: #f6497f; margin-left: 12px; cursor: pointer"
                        >{{
                          elementContentList.portal_settlement_text15 ||
                          $t("settlement.text15")
                        }}</span
                      >
                    </p>
                    <div v-else class="flex card_info">
                      <img src="@/assets/index/location.png" />
                      <div class="addr_info">
                        <p>
                          {{
                            normalAddr.detailAddress +
                            (normalAddr.detailAddress ? "," : "") +
                            normalAddr.detailAddressTwo +
                            (normalAddr.detailAddressTwo ? "," : "") +
                            normalAddr.city +
                            (normalAddr.city ? "," : "") +
                            normalAddr.country
                          }}
                        </p>
                        <p style="margin-top: 8px">
                          <span>{{ normalAddr.name }}</span>
                          <span style="margin-left: 24px; color: #646873">{{
                            normalAddr.phoneNumber
                          }}</span>
                        </p>
                      </div>
                      <el-button @click="handleShowAddr('normal')" type="text">{{
                        elementContentList.portal_btns_edit || $t("btns.edit")
                      }}</el-button>
                    </div>
                  </div>
                  <div
                    class="pro_item"
                    v-for="(item, idx) in normalList"
                    :key="idx + 'n'"
                  >
                    <div class="item">
                      <div class="pro_img flex_c_c">
                        <img
                          v-if="item.productPicUrl"
                          :src="item.productPicUrl"
                        />
                        <img
                          v-else
                          style="width: 60px; height: 60px"
                          src="@/assets/index/logo.png"
                        />
                      </div>
                      <div class="pro_info">
                        <p>{{ item.productName }}</p>
                        <p
                          v-for="attr in item.attributeValueVOs"
                          :key="attr.productAttributeValueUid"
                        >
                          <span>{{ attr.productAttributeName }}：</span
                          >{{ attr.value }}
                        </p>
                        <p class="pro_price">£ {{ item.price }}</p>
                        <p class="quantity" v-if="item.productType != 'custom'">
                          <span>{{
                            elementContentList.portal_cart_text4 ||
                            $t("cart.text4")
                          }}</span>
                          <el-input
                            v-model="item.quantity"
                            disabled
                            @input="handleInput(idx)"
                          ></el-input>
                          <el-button
                            class="btn btn3"
                            disabled
                            icon="el-icon-arrow-up"
                            @click="handleAddNum(idx)"
                          ></el-button>
                          <el-button
                            class="btn btn2"
                            disabled
                            icon="el-icon-arrow-down"
                            @click="handleMinusNum(idx)"
                          ></el-button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 订单总额及确认按钮 -->
          <div class="main_right">
            <div class="total_card">
              <p class="flex_b_c">
                <span>
                  {{
                    elementContentList.portal_settlement_text6 ||
                    $t("settlement.text6")
                  }}
                </span>
                <span>
                  £{{ orderDetail ? orderDetail.calcAmount.totalAmount : 0 }}
                </span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_settlement_text7 ||
                  $t("settlement.text7")
                }}</span>
                <span>
                  £{{
                    orderDetail
                      ? orderDetail.calcAmount.freightAmount
                        ? orderDetail.calcAmount.freightAmount
                        : 0
                      : 0
                  }}
                </span>
              </p>
              <p class="flex_b_c">
                <span>{{
                    elementContentList.portal_settlement_text17 ||
                    $t("settlement.text17")
                  }}</span>
                <span>
                  123
                </span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_settlement_text18 ||
                  $t("settlement.text18")
                  }}</span>
                <span>
                  123
                </span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_settlement_text19 ||
                  $t("settlement.text19")
                  }}
                </span>
                <span>
                  123
                </span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_settlement_text8 ||
                  $t("settlement.text8")
                }}</span>
                <span
                  >£
                  <span style="font-weight: 600">{{
                    orderDetail ? orderDetail.calcAmount.payAmount : 0
                  }}</span></span
                >
              </p>
              <p>
                <el-button
                  v-show="step == 'pay'"
                  :disabled="disabled"
                  class="set_btn"
                  :class="disabled ? 'btn_disabled' : ''"
                  @click="handleSavePay"
                  >{{
                    elementContentList.portal_settlement_btns_btn2 ||
                    $t("settlement.btns.btn2")
                  }}</el-button
                >
                <el-button
                  v-show="step == 'review'"
                  :disabled="disabled"
                  class="set_btn"
                  :class="disabled ? 'btn_disabled' : ''"
                  @click="handleSaveRev"
                  >{{
                    elementContentList.portal_settlement_btns_btn3 ||
                    $t("settlement.btns.btn3")
                  }}</el-button
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showEditForm" class="dialog flex_c_c">
        <div class="form_card">
          <p class="dia_title">
            {{ elementContentList.portal_address_text10 || $t("address.text10") }}
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
                elementContentList.portal_address_text20 || $t("address.text20")
              }}</el-button>
              <el-button class="btn btn2" @click="handleCancel">{{
                elementContentList.portal_btns_cancel || $t("btns.cancel")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="showPayCode" class="dia_pay flex_c_c">
        <div class="pay_code">
          <div class="close" @click="handleClose">
            <i class="el-icon-close"></i>
          </div>
          <p>
            {{ elementContentList.portal_order_text29 || $t("order.text29") }}
          </p>
          <div class="url">{{ paypalHrefLink }}</div>
          <p class="check_btn">
            <el-button @click="handleCheckResult">{{
              elementContentList.portal_order_text30 || $t("order.text30")
            }}</el-button>
          </p>
        </div>
      </div>
      <div v-if="loading" class="my_loading flex_c_c">
        <img src="@/assets/index/loading.png" />
        <p>{{ elementContentList.portal_order_text31 || $t("order.text31") }}</p>
      </div>
      <!-- <pay v-if="showPayMethod"/> -->
      <!-- 选择送货方式及地址 -->
      <div v-if="ShowChooseAddr" class="address flex_c_c">
        <div class="address_card">
          <div class="card_head">
            <div class="addr_title">
              <span v-if="type == 'custom'">{{
                elementContentList.portal_settlement_title4 ||
                $t("settlement.title4")
              }}</span>
              <span v-else>{{
                elementContentList.portal_settlement_title5 ||
                $t("settlement.title5")
              }}</span>
            </div>
          </div>
          <div class="address_list">
            <div
              v-if="type == 'custom'"
              class="method flex"
              @click="handleChangeMethod(1)"
            >
              <div class="item flex" :class="method == 1 ? 'active' : ''">
                <div class="check">
                  <i v-if="method == 1" class="el-icon-success"></i>
                </div>
                <span>{{
                  elementContentList.portal_settlement_text1 ||
                  $t("settlement.text1")
                }}</span>
                <div class="border"></div>
              </div>
              <span>{{
                elementContentList.portal_settlement_text2 ||
                $t("settlement.text2")
              }}</span>
            </div>
            <div
              v-if="type == 'custom'"
              class="method flex"
              @click="handleChangeMethod(2)"
            >
              <div class="item flex" :class="method == 2 ? 'active' : ''">
                <div class="check">
                  <i v-if="method == 2" class="el-icon-success"></i>
                </div>
                <span>{{
                  elementContentList.portal_settlement_text3 ||
                  $t("settlement.text3")
                }}</span>
                <div class="border"></div>
              </div>
              <span>{{
                elementContentList.portal_settlement_text4 ||
                $t("settlement.text4")
              }}</span>
            </div>
            <div
              @click="handleChangeAddress(item, index)"
              class="addr_item"
              :class="actAddress == index ? 'active' : ''"
              v-for="(item, index) in addressList"
              :key="index + 'ad'"
              :style="index % 3 == 2 ? { marginRight: 0 } : ''"
            >
              <div class="checked">
                <img src="@/assets/index/checked.png" />
              </div>
              <p>{{ item.name }}</p>
              <p>
                {{ item.detailAddress + "," + item.city + "," + item.country }}
              </p>
              <p>{{ item.phoneNumber }}</p>
              <p class="flex_b_c">
                <el-button
                  @click.stop="handleEditAddress(item, index)"
                  type="text"
                  style="color: #f6497f; padding: 0"
                  >{{
                    elementContentList.portal_btns_edit || $t("btns.edit")
                  }}</el-button
                >
                <span class="defualt" v-if="index == 0">{{
                  elementContentList.portal_btns_default || $t("btns.default")
                }}</span>
              </p>
            </div>
          </div>
          <p class="addr_bnts">
            <el-button @click="handleCloseAddr" class="btn">{{
              elementContentList.portal_btns_cancel || $t("btns.cancel")
            }}</el-button>
            <el-button @click="handleConfirmAddr" class="btn2 btn">{{
              elementContentList.portal_btns_confirm || $t("btns.confirm")
            }}</el-button>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { addressList, addressInfo, updateAddress } from '@/api/member'
  import { generateConfirmOrder, generateOrder, buyGenerateOrder, buyGenerateConfirmOrder, customGenerateOrder, groupGenerateOrder, groupGenerateConfirmOrder } from '@/api/order'
  import { qrcode, notifyPayResult, ispay, groupQrcode } from '@/api/payment'
  import pay from '@/components/pay/index'
  import Deposit from '@/components/Deposit';
  
  export default {
    name: 'settlement',
    components: {
      pay,
      Deposit
    },
    data () {
      return {
        num: 12,
        addressList: [],
        payList: [{}],
        actAddress: 0,
        normalAddr: '',
        customAddr: '',
        actPay: 0,
        disabled: false,
        isChooseAddr: false,
        ShowChooseAddr: false, // 地址弹窗
        showAddressInfo: false,
        ShowChoosePay: true,
        showPayInfo: false,
        isChooseReview: false,
        ShowChooseReview: false,
        showReviewInfo: false,
        showSaveBtn: '',
        step: 'pay',
        isOrder: true,
        showEditForm: false,
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
          name: [{ required: true, trigger: 'blur', message: 'Please enter a name' }],
          phoneNumber: [{ required: true, trigger: 'blur', message: 'Please enter a phone number so we can call if there are any issues with delivery' }],
          postCode: [{ required: true, trigger: 'blur', message: 'Please enter a ZIP or postal code' }],
          detailAddress: [{ required: true, trigger: 'blur', message: 'Please enter an address' }],
          city: [{ required: true, trigger: 'blur', message: 'Please enter a city name' }],
        },
        cartIds: [],
        from: '',
        orderDetail: '',
        payCode: '',
        showPayCode: false,
        orderId: '',
        method: 1,
        payResult: '',
        paypalHrefLink: '',
        showPayMethod: false,
        loading: false,
        elementContentList: '',
        customList: [],
        normalList: [],
        type: 'normal',
        ActMethod: 1,
        isGroup: false,
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.from = this.$route.query.from
      if (this.from == 'cart') {
        this.getGenerateConfirmOrder()
      } else if (this.from == 'now') {
        // const params = JSON.parse(this.$route.query.params)
        // buyGenerateConfirmOrder(params).then(res => {
        //   if (res.code == 200) {
        //     this.orderDetail = res.data
        //   }
        // })
        let data = JSON.parse(this.$route.query.params)
        this.orderDetail = data
        this.normalList = data.confirmOrderItemList
      } else if (this.from == 'nowCustom') {
        let data = JSON.parse(this.$route.query.params)
        this.orderDetail = data
        this.customList = data.confirmOrderItemList
      }
      this.getAddressList()
    },
    methods: {
      // 打开地址选择弹窗
      handleShowAddr (val) {
        this.type = val
        if (this.type == 'custom' && this.customAddr != '') {
          this.addressList.map((item, index) => {
            if (item.id == this.customAddr.id) this.actAddress = index
          })
        } else if (this.type == 'normal' && this.normalAddr != '') {
          this.addressList.map((item, index) => {
            if (item.id == this.normalAddr.id) this.actAddress = index
          })
        }
        this.ShowChooseAddr = true
      },
      // 关闭地址选择弹窗
      handleCloseAddr () {
        this.ShowChooseAddr = false
      },
      // 确认选择地址
      handleConfirmAddr () {
        this.ShowChooseAddr = false
        if (this.type == 'custom') {
          this.customAddr = this.addressList[this.actAddress]
          this.ActMethod = this.method
        } else {
          this.normalAddr = this.addressList[this.actAddress]
        }
      },
      // 修改定制商品配送方式
      handleChangeMethod (val) {
        this.method = val
      },
      // 关闭支付弹窗
      handleClose () {
        this.showPayCode = false
      },
  
      // 
      getGenerateConfirmOrder () {
        this.cartIds = JSON.parse(this.$route.query.cartIds)
        this.isGroup = JSON.parse(this.$route.query.isGroup)
        const params = {
          cartIds: this.cartIds + ''
        }
        if (this.isGroup) {
          groupGenerateConfirmOrder(this.cartIds + '').then(res => {
            this.orderDetail = res.data
            this.orderDetail.calcAmount = res.data.calcGroupAmount
            this.customList = []
            this.normalList = []
            res.data.orderResultVOS.forEach(item => {
              if (item.confirmCartItemList[0].productType == 'custom') {
                this.customList = item.confirmCartItemList
              } else {
                this.normalList = item.confirmCartItemList
              }
            })
          })
        } else {
          generateConfirmOrder(this.cartIds + '').then(res => {
            this.orderDetail = res.data
            this.customList = []
            this.normalList = []
            res.data.confirmCartItemList.forEach(item => {
              if (item.productType == 'custom') {
                this.customList.push(item)
              } else {
                this.normalList.push(item)
              }
            })
          })
        }
      },
      handleToOrder () {
        this.$router.push({ path: '/my/order', query: { orderId: this.orderId } })
      },
      handleChangeAgain (val) {
        this.disabled = true
        this.ShowChoosePay = true
        this.ShowChooseReview = false
        this.showReviewInfo = true
        this.showSaveBtn = 'pay'
      },
      handleSaveAgain () {
        this.disabled = false
        this.ShowChoosePay = false
        this.ShowChooseReview = true
        this.showReviewInfo = false
        this.showSaveBtn = ''
      },
      handleSavePay () {
        this.ShowChoosePay = false
        this.isChooseReview = true
        this.ShowChooseReview = true
        this.showReviewInfo = false
        this.showSaveBtn = ''
        this.step = 'review'
      },
      handleCheckResult () {
        ispay(this.payResult.payBillId).then(res => {
          let settlemenData = {
            orderId: this.orderId,
            addressInfo: this.normalAddr,
            productList: this.orderDetail,
            payResult: this.payResult
          }
          if (res.data) {
            this.$router.push({ path: '/order/pay/success', query: { settlemenData: JSON.stringify(settlemenData) } })
          } else {
            this.$router.push({ path: '/order/pay/fail', query: { settlemenData: JSON.stringify(settlemenData) } })
          }
        })
      },
      handleSaveRev () {
        this.loading = true
        if (this.from == 'cart') {
          if (this.isGroup) {
            let orderRequests = []
            if (this.customList.length > 0) {
              let obj = {
                cartIds: [this.customList[0].id],
                deliveryType: this.ActMethod,
                memberAddressId: this.ActMethod == 1 ? Number(this.customAddr.id) : '',
                note: '',
                payType: 1,
                sourceType: 0,
              }
              orderRequests.push(obj)
            }
            if (this.normalList.length > 0) {
              let cartIds = []
              this.normalList.map(item => {
                cartIds.push(item.id)
              })
              let obj = {
                cartIds: cartIds,
                deliveryType: 1,
                memberAddressId: this.ActMethod == 1 ? Number(this.normalAddr.id) : '',
                note: '',
                payType: 1,
                sourceType: 0,
              }
              orderRequests.push(obj)
            }
            const params = {
              orderRequests,
              payType: 1,
            }
            groupGenerateOrder(params).then(res => {
              this.showSaveBtn = ''
              this.orderId = res.data
              this.$store.dispatch('UpdateCartNum')
              const params2 = {
                orderGroupId: res.data,
                payToolType: 'PAYPAL',
              }
              groupQrcode(params2).then(resp => {
                this.loading = false
                this.showPayCode = true
                this.payResult = resp.data
                this.paypalHrefLink = resp.data.paypalHrefLink
                window.open(resp.data.paypalHrefLink)
              }).catch(() => {
                this.loading = false
              })
            }).catch(() => {
              this.loading = false
            })
          } else {
            const params = {
              cartIds: this.cartIds,
              memberAddressId: this.normalAddr ? Number(this.normalAddr.id) : Number(this.customAddr.id),
              note: '',
              payType: 1,
              sourceType: 0,
              deliveryType: this.ActMethod,
            }
            generateOrder(params).then(res => {
              this.showSaveBtn = ''
              this.orderId = res.data
              this.$store.dispatch('UpdateCartNum')
              const params2 = {
                orderId: res.data,
                payToolType: 'PAYPAL',
              }
              qrcode(params2).then(resp => {
                this.loading = false
                this.showPayCode = true
                this.payResult = resp.data
                this.paypalHrefLink = resp.data.paypalHrefLink
                window.open(resp.data.paypalHrefLink)
              }).catch(() => {
                this.loading = false
              })
            }).catch(() => {
              this.loading = false
            })
          }
        } else if (this.from == 'now') {
          const params = {
            deliveryType: this.method,
            memberAddressId: Number(this.normalAddr.id),
            note: '',
            payType: 10,
            sourceType: 0,
            productBaseUid: this.orderDetail.confirmOrderItemList[0].productBaseUid,
            productSkuUid: this.orderDetail.confirmOrderItemList[0].productSkuUid,
            productUid: this.orderDetail.confirmOrderItemList[0].productUid,
            quantity: this.orderDetail.confirmOrderItemList[0].quantity,
            deliveryType: this.method,
          }
          buyGenerateOrder(params).then(res => {
            this.showSaveBtn = ''
            this.orderId = res.data
            this.$store.dispatch('UpdateCartNum')
            const params2 = {
              orderId: res.data,
              payToolType: 'PAYPAL',
            }
            qrcode(params2).then(resp => {
              this.loading = false
              this.showPayCode = true
              this.payResult = resp.data
              this.paypalHrefLink = resp.data.paypalHrefLink
              window.open(resp.data.paypalHrefLink)
            }).catch(() => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
          })
        } else if (this.from == 'nowCustom') {
          const params = {
            customUid: this.orderDetail.customUid,
            deliveryType: this.method,
            memberAddressId: Number(this.customAddr.id),
            note: '',
            payType: 10,
            sourceType: 0,
          }
          customGenerateOrder(params).then(res => {
            this.showSaveBtn = ''
            this.orderId = res.data
            this.$store.dispatch('UpdateCartNum')
            const params2 = {
              orderId: res.data,
              payToolType: 'PAYPAL',
            }
            qrcode(params2).then(resp => {
              this.loading = false
              this.showPayCode = true
              this.payResult = resp.data
              this.paypalHrefLink = resp.data.paypalHrefLink
              window.open(resp.data.paypalHrefLink)
            }).catch(() => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
          })
        }
      },
      handleMinusNum (idx) {
      },
      handleAddNum (idx) {
      },
      handleInput (idx) {
      },
      handleChangePay (val, idx) {
        this.actPay = idx
      },
      handleConfirm () {
        this.$refs.formData.validate(valid => {
          if (valid) {
            const params = {
              ...this.formData,
              defaultStatus: this.formData.defaultStatus ? 1 : 0
            }
            updateAddress(params, this.formData.id).then(res => {
              if (res.code == 200) {
                this.getAddressList()
                this.showEditForm = false
                this.$message.success({ message: this.elementContentList.portal_settlement_msg1 || this.$t('settlement.msg1'), duration: 1500 })
              }
            })
          } else {
            return false
          }
        })
      },
      handleCancel () {
        this.showEditForm = false
      },
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
      handleEditAddress (val, idx) {
        addressInfo(val.id).then(res => {
          if (res.code == 200) {
            this.formData = res.data
            this.showEditForm = true
          }
        })
      },
      handleChangeAddress (val, idx) {
        this.actAddress = idx
      }
    }
  }
  </script>
  
  <style lang="scss">
  .settlement {
    width: 100%;
    height: calc(100% - 56px);
    background: #f7f8fb;
    font-family: Poppins;
    font-size: 14px;
    line-height: 22px;
    color: #3d3d3d;
    overflow-y: scroll;
    position: relative;
    .settlement_container {
      width: 1152px;
      height: 100%;
      margin: 0 auto;
      padding-top: 27px;
      .set_title {
        img {
          width: 290px;
        }
      }
      .set_main {
        display: flex;
        padding: 20px;
        .main_left {
          margin-top: 24px;
          .pay_card,
          .review_card {
            width: 838px;
            padding: 22px 18px;
            border-radius: 12px;
            background: #fff;
            margin-bottom: 16px;
            .card_head {
              display: flex;
              align-items: flex-start;
              .card_title {
                flex: 1;
                display: flex;
                align-items: center;
                span:nth-of-type(1) {
                  margin-right: 12px;
                  width: 28px;
                  height: 28px;
                  background: #f6497f;
                  border-radius: 50%;
                  color: #fff;
                  font-weight: 600;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                span:nth-of-type(2) {
                  font-size: 24px;
                  font-weight: 600;
                  line-height: 32px;
                  color: #000c17;
                }
              }
              .add_info {
                width: 330px;
                display: flex;
                justify-content: space-between;
                .info_left {
                  flex: 1;
                  p {
                    font-weight: 500;
                    margin-bottom: 12px;
                  }
                }
                .info_right {
                  width: 87px;
                  text-align: right;
                  .btn {
                    width: 57px;
                    color: #f6497f;
                    padding: 0;
                  }
                }
              }
              .review_info {
                width: 390px;
                .info_head {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 32px;
                  .info_left {
                    flex: 1;
                  }
                  .info_right {
                    width: 87px;
                    text-align: right;
                    .btn {
                      width: 57px;
                      color: #f6497f;
                      padding: 0;
                    }
                  }
                }
                .pro_info {
                  display: flex;
                  padding-bottom: 21px;
                  border-bottom: 1px solid rgba(120, 132, 147, 0.2);
                  margin-bottom: 23px;
                  .pro_img {
                    width: 64px;
                    height: 64px;
                    border-radius: 4px;
                    margin-right: 10px;
                    background: linear-gradient(0deg, #ffe0e0 2%, #ffdce9 100%);
                    img {
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      border-radius: 4px;
                    }
                  }
                  .pro_title {
                    flex: 1;
                    p {
                      font-size: 16px;
                      font-weight: 500;
                      // line-height: 24px;
                      text-wrap: wrap;
                      text-overflow: -o-ellipsis-lastline;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      line-clamp: 3;
                      -webkit-box-orient: vertical;
                    }
                  }
                }
                .pro_info:last-child {
                  border: none;
                  margin: 0;
                }
              }
            }
            .not_choose {
              .card_title {
                span:nth-of-type(1) {
                  color: #f6497f;
                  background: #ffcada;
                }
                span:nth-of-type(2) {
                  color: #000c17;
                  opacity: 0.5;
                }
              }
            }
          }
          .pay_card {
            .pay_list {
              margin-top: 30px;
              .addr_item {
                width: 257px;
                height: 126px;
                border-radius: 8px;
                border: 2px solid #ececec;
                padding: 18px 12px 13px 20px;
                display: inline-block;
                margin: 0 15px 17px 0;
                cursor: pointer;
                position: relative;
                p {
                  margin-bottom: 12px;
                }
                .pay_de {
                  margin-bottom: 7px;
                  // position: relative;
                  .defualt {
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    display: inline-block;
                    width: 63px;
                    height: 28px;
                    border-radius: 999px;
                    padding: 4px 10px;
                    gap: 10px;
                    background: #ffe3e3;
                    color: #f17575;
                    font-size: 12px;
                  }
                }
                .checked {
                  position: absolute;
                  top: 11px;
                  right: 11px;
                  z-index: -1;
                  opacity: 0;
                  img {
                    width: 24px;
                  }
                }
                &.active {
                  background: #fff0f0;
                  border: 2px solid #f6497f;
                  .checked {
                    z-index: 1;
                    opacity: 1;
                  }
                }
              }
            }
          }
          .review_card {
            .review_list {
              width: 764px;
              margin-top: 30px;
              .border {
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                padding: 22px;
                .title2 {
                  font-size: 20px;
                  line-height: 28px;
                  font-variation-settings: "opsz" auto;
                }
                .addr_card {
                  border-radius: 8px;
                  padding: 16px;
                  gap: 151px;
                  align-self: stretch;
                  background: #fff6f9;
                  margin: 16px 0;
                  .card_info {
                    img {
                      width: 24px;
                      margin-right: 16px;
                    }
                    .addr_info {
                      flex: 1;
                      p {
                        color: #1f2126;
                      }
                    }
                    .el-button {
                      color: #f6497f;
                    }
                  }
                }
              }
              .re_date {
                margin-bottom: 24px;
                span:nth-of-type(1) {
                  font-size: 20px;
                  font-weight: 500;
                  line-height: 28px;
                  margin-right: 12px;
                }
                span:nth-of-type(2) {
                  opacity: 0.4;
                }
              }
              .pro_item {
                margin-bottom: 26px;
                padding-bottom: 26px;
                border-bottom: 1px solid rgba(224, 224, 224, 0.4);
                .item {
                  display: flex;
                }
                .cus_item {
                  width: 100%;
                  .item {
                    border-bottom: 1px solid rgba(224, 224, 224, 0.4);
                    margin-bottom: 26px;
                  }
  
                  .pro_info2 {
                    width: 100%;
                    padding: 12px;
                    background: #f8f9fc;
                    border-radius: 8px;
                    font-size: 14px;
                    i {
                      float: right;
                    }
                    .pro_item {
                      margin-bottom: 12px;
                      .img {
                        width: 40px;
                        height: 40px;
                        border-radius: 3px;
                        margin-right: 12px;
                        img {
                          width: 100%;
                          height: 100%;
                          border-radius: 3px;
                          object-fit: contain;
                        }
                      }
                      .pro_name {
                        flex: 1;
                        .name {
                          width: 100%;
                          overflow: hidden;
                          text-overflow: ellipsis; // 溢出显示省略号
                          display: -webkit-box; // 弹性盒子
                          -webkit-box-orient: vertical; // 上下垂直排列
                          -webkit-line-clamp: 1; // 显示行数（数字可调整）
                          margin-bottom: 4px;
                        }
                        span {
                          margin-right: 16px;
                          font-size: 12px;
                        }
                        .pro_price {
                          color: #f6497f;
                        }
                      }
                    }
                  }
                }
                .pro_img {
                  width: 80px;
                  height: 80px;
                  border-radius: 4px;
                  margin-right: 18px;
                  background: linear-gradient(0deg, #ffe0e0 2%, #ffdce9 100%);
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 4px;
                  }
                }
                .pro_info {
                  flex: 1;
                  p {
                    margin-bottom: 9px;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 20px;
                  }
                  p:nth-of-type(1) {
                    height: 48px;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 24px;
                    text-wrap: wrap;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                  p:nth-of-type(2),
                  p:nth-of-type(3) {
                    span {
                      font-weight: 500;
                    }
                  }
                  .pro_price {
                    color: #f6497f;
                    font-weight: 600;
                  }
                  .quantity {
                    position: relative;
                    span {
                      font-size: 14px;
                      line-height: 22px;
                    }
                    .el-input {
                      width: 80px;
                      margin-left: 8px;
                    }
                    .el-input__inner {
                      width: 80px;
                      height: 32px;
                      border-radius: 6px;
                      padding: 0px 16px;
                      gap: 8px;
                      background: #ffffff;
                      box-sizing: border-box;
                      border: 1px solid #e6e9f0;
                    }
                    .el-input__inner:focus {
                      border: 1px solid #f6497f;
                    }
                    .btn {
                      width: 21px;
                      height: 16px;
                      padding: 0;
                      position: absolute;
                      border: 1px solid rgba(0, 0, 0, 0.15);
                      background: #fff;
                      color: rgba(0, 0, 0, 0.25);
                      border-right: none;
                    }
                    .btn3 {
                      top: 1px;
                      left: 93px;
                      border-radius: 0 6px 0 0;
                      border-top: none;
                    }
                    .btn2 {
                      left: 83px;
                      bottom: 1px;
                      border-radius: 0 0 6px 0;
                      border-bottom: none;
                    }
                  }
                }
              }
              .pro_item:last-child {
                border: none;
                margin: 0;
              }
            }
          }
        }
        .main_right {
          margin: 24px 0 0 18px;
          .total_card {
            width: 297px;
            height: 239px;
            border-radius: 12px;
            background: #ffffff;
            padding: 20px;
            p:nth-of-type(2) {
              margin-top: 10px;
              padding-bottom: 26px;
              border-bottom: 1px solid #c1cddc;
            }
            p:nth-of-type(3) {
              margin: 19px 0 32px;
              font-size: 20px;
              font-weight: 500;
              line-height: 28px;
            }
            .set_btn {
              width: 100%;
              height: 40px;
              border-radius: 8px;
              padding: 0px 16px;
              gap: 8px;
              background: #f6497f;
              font-size: 16px;
              line-height: 24px;
              color: #ffffff;
              border: none;
            }
            .btn_disabled {
              opacity: 0.3;
            }
          }
        }
      }
    }
    .order_placed {
      text-align: center;
      .suc_img {
        margin: 90px 0 12px;
        img {
          width: 48px;
        }
      }
      .order_card {
        width: 454px;
        // height: 351px;
        border-radius: 12px;
        background: #ffffff;
        padding: 26px 34px 18px;
        margin: 31px auto;
        text-align: left;
        p {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
        }
        .order_title {
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          margin-bottom: 19px;
        }
        p:nth-of-type(3) {
          margin: 12px 0 21px;
          padding-bottom: 24px;
        }
        p:nth-of-type(5) {
          span {
            font-size: 14px;
            line-height: 22px;
            opacity: 0.4;
            margin-left: 8px;
          }
        }
        .detail_btns {
          text-align: center;
          margin-top: 42px;
          .btn {
            font-size: 16px;
            line-height: 24px;
            color: #f6497f;
            width: 138px;
            height: 40px;
            border-radius: 999px;
            padding: 0px 16px;
            gap: 8px;
            border: 1px solid #ff7ba3;
            background: #fff;
          }
        }
      }
    }
    .address {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2;
      background: rgba(0, 0, 0, 0.5);
      .address_card {
        width: 838px;
        padding: 22px 18px;
        border-radius: 12px;
        background: #fff;
        margin-bottom: 16px;
        .addr_title {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: #000c17;
        }
        .address_list {
          margin-top: 30px;
          .method {
            margin-bottom: 16px;
            .item {
              width: 142px;
              height: 42px;
              border-radius: 999px;
              padding: 10px 24px;
              gap: 8px;
              background: #f8f9fc;
              color: #3d3d3d;
              margin-right: 8px;
              position: relative;
              .check {
                width: 16px;
                height: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 50%;
                cursor: pointer;
                i {
                  color: #f6497f;
                  font-size: 16px;
                }
              }
              .border {
                width: 142px;
                height: 42px;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 999px;
              }
              &.active {
                .check {
                  border: none;
                }
                .border {
                  border: 1px solid #f6497f;
                }
              }
            }
          }
          .addr_item {
            width: 257px;
            height: 160px;
            border-radius: 8px;
            border: 2px solid #ececec;
            padding: 18px 12px 13px 20px;
            display: inline-block;
            margin: 0 15px 17px 0;
            cursor: pointer;
            position: relative;
            p {
              margin-bottom: 12px;
              text-wrap: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p:nth-of-type(3) {
              margin-bottom: 7px;
            }
            p:nth-of-type(4) {
              position: relative;
              .defualt {
                display: inline-block;
                width: 63px;
                height: 28px;
                line-height: 28px;
                border-radius: 999px;
                padding: 0 10px;
                background: #fde1e6;
                color: #f6497f;
                font-size: 12px;
              }
            }
            .checked {
              position: absolute;
              top: 11px;
              right: 11px;
              z-index: -1;
              opacity: 0;
              img {
                width: 24px;
              }
            }
            &.active {
              background: #fff0f0;
              border: 2px solid #f6497f;
              .checked {
                z-index: 1;
                opacity: 1;
              }
            }
          }
        }
        .addr_bnts {
          text-align: right;
          .btn {
            height: 32px;
            border-radius: 8px;
            padding: 0px 16px;
            gap: 8px;
            background: #ffffff;
            border: 1px solid #e5e6eb;
            color: #1d2129;
          }
          .btn2 {
            background: #f6497f;
            color: #ffffff;
            border: none;
          }
        }
      }
    }
  }
  
  .dialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    .form_card {
      width: 572px;
      padding: 28px;
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
  .dia_pay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .pay_code {
      width: 400px;
      padding: 24px;
      border-radius: 8px;
      background: #fff;
      position: relative;
      font-size: 16px;
      line-height: 24px;
      .close {
        text-align: right;
        position: absolute;
        top: 10px;
        right: 10px;
        i {
          font-size: 20px;
          cursor: pointer;
          color: #333;
        }
      }
      .url {
        margin-top: 24px;
      }
      .check_btn {
        text-align: center;
        margin-top: 24px;
        .el-button {
          height: 32px;
          border-radius: 6px;
          padding: 0px 16px;
          gap: 8px;
          background: #f6497f;
          border: 1px solid #f6497f;
          color: #ffffff;
        }
      }
    }
  }
  .my_loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    background-color: hsla(0, 0%, 100%, 0.9);
    flex-direction: column;
    img {
      width: 32px;
      animation: identifier 1s linear infinite;
    }
    @keyframes identifier {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    p {
      margin-top: 24px;
    }
  }
  p {
    margin: 0;
  }
  </style>
  
  