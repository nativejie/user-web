<template>
    <div class="order">
      <div v-if="!showAfterSale">
        <!-- 列表 -->
        <div class="order_container" v-if="isList">
          <div class="order_title">
            <span>{{
              elementContentList.portal_order_title1 || $t("order.title1")
            }}</span>
          </div>
          <div class="order_nav flex">
            <div
              @click="handleChangeNav(-1)"
              :class="actNav == -1 ? 'active' : ''"
              class="nav_item"
            >
              {{
                elementContentList.portal_order_tabs_tab1 || $t("order.tabs.tab1")
              }}
            </div>
            <div
              @click="handleChangeNav(0)"
              :class="actNav == 0 ? 'active' : ''"
              class="nav_item"
            >
              {{
                elementContentList.portal_order_tabs_tab2 || $t("order.tabs.tab2")
              }}
            </div>
            <div
              @click="handleChangeNav(1)"
              :class="actNav == 1 ? 'active' : ''"
              class="nav_item"
            >
              {{
                elementContentList.portal_order_tabs_tab3 || $t("order.tabs.tab3")
              }}
            </div>
            <div
              @click="handleChangeNav(2)"
              :class="actNav == 2 ? 'active' : ''"
              class="nav_item"
            >
              {{
                elementContentList.portal_order_tabs_tab4 || $t("order.tabs.tab4")
              }}
            </div>
            <div
              @click="handleChangeNav(3)"
              :class="actNav == 3 ? 'active' : ''"
              class="nav_item"
            >
              {{
                elementContentList.portal_order_tabs_tab5 || $t("order.tabs.tab5")
              }}
            </div>
            <div
              @click="handleChangeNav(4)"
              :class="actNav == 4 ? 'active' : ''"
              class="nav_item"
            >
              {{
                elementContentList.portal_order_tabs_tab6 || $t("order.tabs.tab6")
              }}
            </div>
          </div>
          <div class="order_list">
            <div
              class="order_item"
              v-for="(item, index) in orderList"
              :key="item.id"
            >
              <div class="order_head flex_b_c">
                <div class="head_left flex">
                  <div class="head_item">
                    <p>
                      {{
                        elementContentList.portal_order_text15 ||
                        $t("order.text15")
                      }}
                    </p>
                    <p>{{ item.order.createTimeStr }}</p>
                  </div>
                  <div class="head_item">
                    <p>
                      {{
                        elementContentList.portal_order_text16 ||
                        $t("order.text16")
                      }}
                    </p>
                    <p>{{ item.order.orderSn }}</p>
                  </div>
                  <div class="head_item">
                    <p>
                      {{
                        elementContentList.portal_order_text17 ||
                        $t("order.text17")
                      }}
                    </p>
                    <el-tooltip 
                      class="item" 
                      effect="dark" 
                      :content="
                        `£ ${ item.order.totalAmount }
                        ${ item?.order?.orderItemList?.[0]?.productType == 'custom' ? '（定制商品定金：£24，定制商品尾款：£24，配件商品：£32）' : '' }`
                      " 
                      placement="top"
                    >
                      <p class="ellipsis" style="width: 200px">
                        £ {{ item.order.totalAmount }}
                        {{ item?.orderItemList?.[0]?.productType }}
                        <!-- TODO: 定制化商品补充新字段展示 -->
                        {{ 
                          item?.orderItemList?.[0]?.productType == 'custom' ? '（定制商品定金：£24，定制商品尾款：£24，配件商品：£32）' : ''
                        }}
                      </p>
                    </el-tooltip>
                  </div>
                </div>
                <div class="to_details">
                  <el-button
                    class="btn"
                    type="text"
                    @click="handleShowOrderDetails(item, index)"
                    >{{
                      elementContentList.portal_order_text18 || $t("order.text18")
                    }}</el-button
                  >
                </div>
              </div>
              <!-- 订单详情 -->
              <div class="pro_details">
                <div class="det_left">
                  <!-- <div class="order_status">
                    <span>{{ 'Delivered 11-May-2023' }}</span>
                  </div> -->
                  <div
                    class="pro_item"
                    v-for="(it, idx) in item.orderItemList"
                    :key="idx + 'p'"
                  >
                    <!-- 普通商品 -->
                    <div class="item" v-if="it.productType != 'custom'">
                      <div class="pro_img flex_c_c">
                        <img v-if="it.productPicUrl" :src="it.productPicUrl" />
                        <img
                          v-else
                          style="width: 80px; height: 80px"
                          src="@/assets/index/logo.png"
                        />
                      </div>
                      <div class="pro_name">
                        <p class="it_name">
                          {{ it.productName }}
                        </p>
                        <p class="it_attr">
                          <span
                            v-for="attr in it.attributeValueVOs"
                            :key="attr.productAttributeUid"
                            style="margin-right: 8px"
                            >{{
                              attr.productAttributeName + ": " + attr.value
                            }}</span
                          >
                        </p>
                        <p class="it_qty">x {{ it.productQuantity }}</p>
                        <p class="it_price">£ {{ it.productPrice }}</p>
                      </div>
                    </div>
                    <!-- 套餐商品 -->
                    <!-- 定制商品 -->
                    <div v-if="it.productType == 'custom'" class="item custom-item">
                      <!-- TODO: 待扫描状态判断 -->
                      <div class="flex-col wait-saomiao">
                        <p class="warn-msg">请及时至门店完成扫描</p>
                        <div class="wait-info-item flex-row">
                          预约门店：<p class="wait-info-item-val">55 Corstorphine Road, Edinburgh EH12</p>
                        </div>
                        <div class="wait-info-item flex-row">
                          预约时间：<p class="wait-info-item-val">2024-05-24 12:00-13:00</p>
                        </div>
                        <div class="flex-row">
                          请阅读我们提供的&#x3000;
                          <el-link underline type="danger">3D Photography Guidelines</el-link>
                          &#x3000;以实现最佳扫描效果
                        </div>
                      </div>
                      <div class="flex-row" style="align-items: start;">
                        <div class="pro_img flex_c_c">
                          <img v-if="it.productPicUrl" :src="it.productPicUrl" />
                          <img
                            v-else
                            style="width: 80px; height: 80px"
                            src="@/assets/index/logo.png"
                          />
                        </div>
                        <div class="pro_name">
                          <p class="it_name">
                            {{ it.productName }}
                          </p>
                          <p
                            class="pro_style"
                            v-for="obj in it.orderPageCusObjItemVOs"
                            :key="obj.cartCusItemId"
                          >
                            <span style="margin-right: 24px">{{
                              obj.objNickname
                            }}</span>
                            <span style="margin-right: 24px">Cyrus</span>
                            <span style="margin-right: 24px">{{
                              (obj.height ? obj.height + "cm, " : "") +
                              (obj.weight ? obj.weight + "kg" : "")
                            }}</span>
                            <span style="margin-right: 24px">{{ obj.ratio }}</span>
                            <span style="color: #f6497f; margin-right: 24px;">£ {{ obj.productPrice }}</span>
                            <Deposit />
                          </p>
                          <div class="pro_info">
                            <p>
                              <span>{{
                                elementContentList.portal_cart_text11 ||
                                $t("cart.text11")
                              }}</span>
                            </p>
                            <div style="margin-top: 16px">
                              <div
                                class="pro_item2 flex"
                                v-for="pro in it.orderPageCusServiceItemVOs"
                                :key="pro.cartCusItemId"
                              >
                                <div class="flex_c_c img">
                                  <img :src="pro.productPicUrl" />
                                </div>
                                <div class="pro_name">
                                  <div class="name">{{ pro.productName }}</div>
                                  <div>
                                    <span>{{ "x " + pro.productQuantity }}</span>
                                    <span class="pro_price">£ {{ pro.productPrice }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="flex-row" style="justify-content: start;">
                            <p class="it_price" style="margin-right: 24px">£ {{ it.productPrice }}</p>
                            <Deposit />
                          </div>
                          <!-- 配件信息 -->
                          <AttachmentInfo />
                          <!-- 打印确认 -->
                          <PreviewModel />
                          <!-- 支付尾款卡片 -->
                          <div class="final-payment flex-col base-gray-bg">
                          <div class="final-payment-dingjin flex-row justify-between">
                            <p class="item-name">定金</p>
                            <p class="item-price">已支付</p>
                          </div>

                          <div class="final-payment-content">
                            <div class="final-payment-content-item border-bottom flex-row justify-between">
                              <p class="item-name">尾款</p>
                              <p class="item-price before-round-tag">待支付</p>
                            </div>
                            <div class="final-payment-content-item flex-row justify-between">
                              <p class="item-name">扫描对象1</p>
                              <p class="item-price">£ 1124.5</p>
                            </div>
                            <div class="final-payment-content-item border-bottom flex-row justify-between">
                              <p class="item-name">定金</p>
                              <p class="item-price">£ 1124.5</p>
                            </div>
                            <div class="final-payment-content-item flex-row justify-between">
                              <p class="item-name"></p>
                              <div class="flex-row">
                                Total&#x3000;<p class="item-price">£ 1124.5</p>
                              </div>
                            </div>
                          </div>

                          <div class="final-payment-foot flex-row justify-end">
                            <el-button type="danger" round>支付尾款</el-button>
                          </div>
                          </div>
                           <!-- 物流配送卡片 -->
                          <div class="express flex-col base-gray-bg align-start">
                            <b class="express-title text-red flex-row align-start">待发货</b>
                            <template v-if="待发货">
                              <div class="express-item flex-row justify-start">
                                收货方式：<p class="express-item-val">物流配送</p>
                              </div>
                              <div class="express-item flex-row justify-start">
                                收货地址：<p class="express-item-val">55 Corstorphine Road, Edinburgh EH12</p>
                              </div>
                              <div class="express-item flex-row justify-start">
                                收货人：<p class="express-item-val">Cyrus, 17700000000</p>
                              </div>
                            </template>
                            <template v-else-if="待收货">
                              <div class="fahuo">
                                <p class="fahuo-msg1">请收到货后及时检查货物</p>
                                <p class="fahuo-msg2">自动确认收货：12 天 21 小时</p>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="after_btn flex">
                      <!-- v-if="!item.order.hasAfter" -->
                      <el-button
                        v-if="
                          item.order.status == 1 ||
                          item.order.status == 2 ||
                          item.order.status == 7 ||
                          item.order.status == 6
                        "
                        class="btn"
                        @click="handleAfterSales(it, item)"
                        >{{
                          elementContentList.portal_order_btns_btn1 ||
                          $t("order.btns.btn1")
                        }}</el-button
                      >
                    </div>
                  </div>
                </div>
                <div class="right_btns">
                  <!-- Confirm receipt -->
                  <el-button
                    round
                    class="btn btn2"
                    v-if="item.order.status == 2 || item.order.status == 8"
                    @click="handleConfirm(item, index)"
                    >{{
                      elementContentList.portal_order_btns_btn4 ||
                      $t("order.btns.btn4")
                    }}</el-button
                  >
                  <!-- 立即支付 -->
                  <div class="flex-row" v-if="item.order.status == 0 && !item.order.needCancelPay">
                    <p style="white-space: nowrap; margin-right: 32px">
                      <i class="el-icon-time"></i>
                      <span>{{ item.order.newPayRemainTime || item.order.payRemainTime }}</span>
                    </p>
                    <el-button
                      class="btn btn2"
                      round
                      @click="handlePayment(item, index)"
                      >{{
                        elementContentList.portal_order_btns_btn5 ||
                        $t("order.btns.btn5")
                      }}</el-button>
                      <el-button
                        class="btn cancel-btn"
                        round
                        @click="handleCancel(item, index)"
                        style="margin-left: 16px"
                      >{{
                        elementContentList.portal_order_btns_btn5 ||
                        $t("order.btns.btn8")
                      }}</el-button>
                  </div>
                  <!-- Accept -->
                  <el-button
                    class="btn btn2"
                    v-if="item.hasCustom && item.order.status != 0"
                    @click="handleAccept(item, index)"
                    >{{
                      elementContentList.portal_order_btns_btn6 ||
                      $t("order.btns.btn6")
                    }}</el-button
                  >
                  <!-- Decline -->
                  <el-button
                    class="btn"
                    v-if="item.hasCustom && item.order.status != 0"
                    @click="handleDecline(item, index)"
                    >{{
                      elementContentList.portal_order_btns_btn7 ||
                      $t("order.btns.btn7")
                    }}</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 详情 -->
        <div v-else class="order_details">
          <div class="details_title">
            <i @click="handleGoback" class="el-icon-arrow-left"></i>
            <span>{{
              elementContentList.portal_order_tabs_tab1 || $t("order.tabs.tab1")
            }}</span>
            <span>{{
              elementContentList.portal_order_text18 || $t("order.text18")
            }}</span>
          </div>
          <p class="details_title2">
            {{ elementContentList.portal_order_text18 || $t("order.text18") }}
          </p>
          <p class="order_date">
            <span>{{
              elementContentList.portal_order_text19 || $t("order.text19")
            }}</span>
            <span>{{ orderDetails.order.createTimeStr }}</span>
            <span>{{
              elementContentList.portal_order_text20 || $t("order.text20")
            }}</span>
            <span>{{ orderDetails.order.orderSn }}</span>
            <!-- 操作按钮 -->
            <span style="display: flex; float: right">
              <el-button
                class="btns"
                v-if="orderDetails.order.status == 0"
                @click="handleCancelDetail()"
                >{{
                  elementContentList.portal_btns_cancel || $t("btns.cancel")
                }}</el-button
              >
              <el-button
                class="btns btn2"
                v-if="orderDetails.order.status == 2 || orderDetails.order.status == 8"
                @click="handleConfirReceipt()"
                >{{
                  elementContentList.portal_order_btns_btn4 ||
                  $t("order.btns.btn4")
                }}</el-button
              >
            </span>
          </p>
          <!-- 订单支付状态 -->
          <div class="pay-order-info base-gray-bg" style="margin-top: 20px">
            同列表 - 待确认整体状态都有哪些
          </div>
          <!-- 阶段进度 -->
          <div class="progress-blo base-gray-bg" style="margin-top: 20px">
            <div class="sted flex_a_c">
              <div
                class="step_item"
                :class="
                  processStatus == 101 ||
                  processStatus == 102 ||
                  processStatus == 103 ||
                  processStatus == 104 ||
                  processStatus == 105 ||
                  processStatus == 106 ||
                  processStatus == 107 ||
                  processStatus == 108
                    ? 'completed'
                    : ''
                "
              >
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step1 ||
                    $t("order.steps.step1")
                  }}
                </p>
                <p class="time">
                  <span
                    v-for="item in orderDetails.orderProcessList"
                    :key="item.processId"
                    >{{ item.processStatus == 101 ? item.createTimeStr : "" }}</span
                  >
                </p>
              </div>
              <div
                v-if="status != 4"
                class="step_item"
                :class="
                  processStatus == 102 ||
                  processStatus == 103 ||
                  processStatus == 104 ||
                  processStatus == 105 ||
                  processStatus == 106 ||
                  processStatus == 107 ||
                  processStatus == 108
                    ? 'completed'
                    : ''
                "
              >
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step2 ||
                    $t("order.steps.step2")
                  }}
                </p>
                <p class="time">
                  <span
                    v-for="item in orderDetails.orderProcessList"
                    :key="item.processId"
                    >{{
                      item.processStatus == 102 || item.processStatus == 103
                        ? item.createTimeStr
                        : ""
                    }}</span
                  >
                </p>
              </div>
              <div
                v-if="hasCustom == 1 && status != 4"
                class="step_item"
                :class="
                  processStatus == 104 ||
                  processStatus == 105 ||
                  processStatus == 106 ||
                  processStatus == 107 ||
                  processStatus == 108
                    ? 'completed'
                    : ''
                "
              >
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step3 ||
                    $t("order.steps.step3")
                  }}
                </p>
                <p class="time">
                  <span
                    v-for="item in orderDetails.orderProcessList"
                    :key="item.processId"
                    >{{ item.processStatus == 104 ? item.createTimeStr : "" }}</span
                  >
                </p>
              </div>
              <div
                v-if="hasCustom == 1 && status != 4"
                class="step_item"
                :class="
                  processStatus == 105 ||
                  processStatus == 106 ||
                  processStatus == 107 ||
                  processStatus == 108
                    ? 'completed'
                    : ''
                "
              >
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step4 ||
                    $t("order.steps.step4")
                  }}
                </p>
                <p class="time">
                  <span
                    v-for="item in orderDetails.orderProcessList"
                    :key="item.processId"
                    >{{ item.processStatus == 105 ? item.createTimeStr : "" }}</span
                  >
                </p>
              </div>
              <div
                v-if="status != 4"
                class="step_item"
                :class="
                  processStatus == 106 ||
                  processStatus == 107 ||
                  processStatus == 108
                    ? 'completed'
                    : ''
                "
              >
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step5 ||
                    $t("order.steps.step5")
                  }}
                </p>
                <p class="time">
                  <span
                    v-for="item in orderDetails.orderProcessList"
                    :key="item.processId"
                    >{{ item.processStatus == 106 ? item.createTimeStr : "" }}</span
                  >
                </p>
              </div>
              <div
                v-if="status != 4"
                class="step_item"
                :class="
                  processStatus == 107 || processStatus == 108 ? 'completed' : ''
                "
              >
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step6 ||
                    $t("order.steps.step6")
                  }}
                </p>
                <p class="time">
                  <span
                    v-for="item in orderDetails.orderProcessList"
                    :key="item.processId"
                    >{{ item.processStatus == 107 ? item.createTimeStr : "" }}</span
                  >
                </p>
              </div>
              <div v-if="status == 4" class="step_item cancel_pay">
                <p class="schedule">
                  <span class="left_line"></span>
                  <span class="round"></span>
                  <span class="right_line"></span>
                </p>
                <p class="sted_status">
                  {{
                    elementContentList.portal_order_steps_step7 ||
                    $t("order.steps.step7")
                  }}
                </p>
                <p class="time">{{ "" }}</p>
              </div>
            </div>
          </div>
          <!-- 提货方式 -->
          <div class="delivery-method base-gray-bg" style="margin-top: 20px">
            <div class="addr_card">
              <p>{{ elementContentList.portal_order_text22 || $t("order.text22") }}</p>
              <div v-if="orderDetails.order.deliveryType != 2">
                <p><span>{{ orderDetails.order.receiverName }}</span><span style="margin-left: 12px;">{{ orderDetails.order.receiverPhone }}</span></p>
                <p style="margin-top: 4px;">
                  {{ orderDetails.order.receiverDetailAddress +
                    (orderDetails.order.receiverDetailAddress ? "," : "") +
                    orderDetails.order.receiverDetailAddressTwo +
                    (orderDetails.order.receiverDetailAddressTwo ? "," : "") +
                    orderDetails.order.receiverCity +
                    (orderDetails.order.receiverCity ? "," : "") +
                    orderDetails.order.receiverCountry 
                  }}
                </p>
              </div>
              <p v-if="orderDetails.order.deliveryType == 2">{{ elementContentList.portal_order_text36 || $t("order.text36") }}</p>
            </div>
          </div>
          <div class="order_info">
            <div class="summary">
              <p class="my_title">
                {{ elementContentList.portal_order_text24 || $t("order.text24") }}
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_order_text25 || $t("order.text25")
                }}</span
                ><span>£ {{ orderDetails.order.totalAmount }}</span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_order_text26 || $t("order.text26")
                }}</span
                ><span>£ {{ orderDetails.order.freightAmount }}</span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_order_text27 || $t("order.text27")
                }}</span
                ><span>£ {{ orderDetails.order.discountAmount }}</span>
              </p>
              <p class="flex_b_c">
                <span>{{
                  elementContentList.portal_order_text28 || $t("order.text28")
                }}</span
                ><span>£ {{ orderDetails.order.payAmount }}</span>
              </p>
            </div>
            <div class="pay_info">
              <p class="my_title">
                {{ elementContentList.portal_order_text23 || $t("order.text23") }}
              </p>
              <p>
                {{
                  orderDetails.order.payType == 1
                    ? "paypal"
                    : orderDetails.order.payType == 2
                    ? "weChat"
                    : elementContentList.portal_order_text37 || $t("order.text37")
                }}
              </p>
            </div>
          </div>
          <!-- 定制商品 -->
          <div class="pro_details2" v-if="customList.length > 0">
            <div class="det_left2">
              <div class="pro_item">
                <p class="type">{{ elementContentList.portal_order_text34 || $t("order.text34") }}</p>
                <div v-for="(it, idx) in customList" :key="idx+'cp'" class="item">
                  <div class="pro_img flex_c_c">
                    <img v-if="it.productPicUrl" :src="it.productPicUrl" />
                    <img
                      v-else
                      style="width: 80px; height: 80px"
                      src="@/assets/index/logo.png"
                    />
                  </div>
                  <div class="pro_name">
                    <p class="it_name">
                      {{ it.productName }}
                    </p>
                    <p
                      class="pro_style"
                      v-for="obj in it.orderCusObjItemVOS"
                      :key="obj.cartCusItemId"
                    >
                      <span style="margin-right: 24px">{{
                        obj.objNickname
                      }}</span>
                      <span style="margin-right: 24px">{{
                        (obj.height ? obj.height + "cm, " : "") +
                        (obj.weight ? obj.weight + "kg" : "")
                      }}</span>
                      <span style="margin-right: 24px">{{ obj.ratio }}</span>
                      <span style="color: #f6497f"
                        >£ {{ obj.productPrice }}</span
                      >
                    </p>
                    <div class="pro_info">
                      <p>
                        <span>{{
                          elementContentList.portal_cart_text11 ||
                          $t("cart.text11")
                        }}</span>
                      </p>
                      <div style="margin-top: 16px">
                        <div
                          class="pro_item2 flex"
                          v-for="pro in it.orderCusServiceItemVOS"
                          :key="pro.cartCusItemId"
                        >
                          <div class="flex_c_c img">
                            <img :src="pro.productPicUrl" />
                          </div>
                          <div class="pro_name">
                            <div class="name">{{ pro.productName }}</div>
                            <div>
                              <span>{{ "x " + pro.productQuantity }}</span
                              ><span class="pro_price"
                                >£ {{ pro.productPrice }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="it_price">£ {{ it.productPrice }}</p>
                  </div>
                  <div class="right_btns right_btns2 flex_c_c">
                    <!-- v-if="orderDetails.order.status == 2" -->
                    <el-button
                      class="btn btn2"
                      v-if="orderDetails.order.status == 2 || orderDetails.order.status == 8"
                      @click="handleConfirm(orderDetails)"
                      >{{
                        elementContentList.portal_order_btns_btn4 ||
                        $t("order.btns.btn4")
                      }}</el-button
                    >
                    <!-- v-if="orderDetails.hasCustom && orderDetails.order.status != 0" -->
                    <el-button
                      class="btn"
                      v-if="orderDetails.order.status == 6 || orderDetails.order.status == 7"
                      @click="handleAfterSales(it, orderDetails)"
                      >{{
                        elementContentList.portal_order_btns_btn1 ||
                        $t("order.btns.btn1")
                      }}</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 普通商品 -->
          <div class="pro_details2" v-if="normalList.length > 0">
            <div class="det_left2">
              <div class="pro_item">
                <p class="type">{{ elementContentList.portal_order_text35 || $t("order.text35") }}</p>
                <div class="sted flex_a_c">
                  <div
                    class="step_item"
                    :class="
                      processStatus == 101 ||
                      processStatus == 102 ||
                      processStatus == 104 ||
                      processStatus == 105 ||
                      processStatus == 106 ||
                      processStatus == 107 ||
                      processStatus == 1072 ||
                      processStatus == 108
                        ? 'completed'
                        : ''
                    "
                  >
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step1 ||
                        $t("order.steps.step1")
                      }}
                    </p>
                    <p class="time">
                      <span
                        v-for="item in orderDetails.orderProcessList"
                        :key="item.processId"
                        >{{ item.processStatus == 101 ? item.createTimeStr : "" }}</span
                      >
                    </p>
                  </div>
                  <div
                    v-if="status != 4"
                    class="step_item"
                    :class="
                      processStatus == 102 ||
                      processStatus == 104 ||
                      processStatus == 105 ||
                      processStatus == 106 ||
                      processStatus == 107 ||
                      processStatus == 1072 ||
                      processStatus == 108
                        ? 'completed'
                        : ''
                    "
                  >
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step2 ||
                        $t("order.steps.step2")
                      }}
                    </p>
                    <p class="time">
                      <span
                        v-for="item in orderDetails.orderProcessList"
                        :key="item.processId"
                        >{{
                          item.processStatus == 102 || item.processStatus == 103
                            ? item.createTimeStr
                            : ""
                        }}</span
                      >
                    </p>
                  </div>
                  <div
                    v-if="hasCustom == 1 && status != 4"
                    class="step_item"
                    :class="
                      processStatus == 104 ||
                      processStatus == 105 ||
                      processStatus == 106 ||
                      processStatus == 107 ||
                      processStatus == 1072 ||
                      processStatus == 108
                        ? 'completed'
                        : ''
                    "
                  >
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step3 ||
                        $t("order.steps.step3")
                      }}
                    </p>
                    <p class="time">
                      <span
                        v-for="item in orderDetails.orderProcessList"
                        :key="item.processId"
                        >{{ item.processStatus == 104 ? item.createTimeStr : "" }}</span
                      >
                    </p>
                  </div>
                  <div
                    v-if="hasCustom == 1 && status != 4"
                    class="step_item"
                    :class="
                      processStatus == 105 ||
                      processStatus == 106 ||
                      processStatus == 107 ||
                      processStatus == 1072 ||
                      processStatus == 108
                        ? 'completed'
                        : ''
                    "
                  >
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step4 ||
                        $t("order.steps.step4")
                      }}
                    </p>
                    <p class="time">
                      <span
                        v-for="item in orderDetails.orderProcessList"
                        :key="item.processId"
                        >{{ item.processStatus == 105 ? item.createTimeStr : "" }}</span
                      >
                    </p>
                  </div>
                  <div
                    v-if="status != 4"
                    class="step_item"
                    :class="
                      processStatus == 106 ||
                      processStatus == 107 ||
                      processStatus == 1072 ||
                      processStatus == 108
                        ? 'completed'
                        : ''
                    "
                  >
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step5 ||
                        $t("order.steps.step5")
                      }}
                    </p>
                    <p class="time">
                      <span
                        v-for="item in orderDetails.orderProcessList"
                        :key="item.processId"
                        >{{ item.processStatus == 106 ? item.createTimeStr : "" }}</span
                      >
                    </p>
                  </div>
                  <div
                    v-if="status != 4"
                    class="step_item"
                    :class="
                      processStatus == 1072 || 
                      processStatus == 107 || 
                      processStatus == 108 
                      ? 'completed' : ''
                    "
                  >
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step6 ||
                        $t("order.steps.step6")
                      }}
                    </p>
                    <p class="time">
                      <span
                        v-for="item in orderDetails.orderProcessList"
                        :key="item.processId"
                        >{{ (processStatus == 1072 || item.processStatus == 107) ? item.createTimeStr : "" }}</span
                      >
                    </p>
                  </div>
                  <div v-if="status == 4" class="step_item cancel_pay">
                    <p class="schedule">
                      <span class="left_line"></span>
                      <span class="round"></span>
                      <span class="right_line"></span>
                    </p>
                    <p class="sted_status">
                      {{
                        elementContentList.portal_order_steps_step7 ||
                        $t("order.steps.step7")
                      }}
                    </p>
                    <p class="time">{{ "" }}</p>
                  </div>
                </div>
                <div class="item" v-for="(it, idx) in normalList" :key="idx+'np'">
                  <div class="pro_img flex_c_c">
                    <img v-if="it.productPicUrl" :src="it.productPicUrl" />
                    <img
                      v-else
                      style="width: 80px; height: 80px"
                      src="@/assets/index/logo.png"
                    />
                  </div>
                  <div class="pro_name">
                    <p class="it_name">
                      {{ it.productName }}
                    </p>
                    <p class="it_attr">
                      <span
                        v-for="attr in it.attributeValueVOs"
                        :key="attr.productAttributeUid"
                        style="margin-right: 8px"
                        >{{
                          attr.productAttributeName + ": " + attr.value
                        }}</span
                      >
                    </p>
                    <p class="it_qty">x {{ it.productQuantity }}</p>
                    <p class="it_price">£ {{ it.productPrice }}</p>
                  </div>
                  <div class="right_btns right_btns2 flex_c_c">
                    <!-- v-if="orderDetails.order.status == 2" -->
                    <el-button
                      class="btn btn2"
                      v-if="orderDetails.order.status == 2"
                      @click="handleConfirm(orderDetails)"
                      >{{
                        elementContentList.portal_order_btns_btn4 ||
                        $t("order.btns.btn4")
                      }}</el-button
                    >
                    <!-- v-if="orderDetails.hasCustom && orderDetails.order.status != 0" -->
                    <el-button
                      class="btn"
                      v-if="orderDetails.order.status == 1 || orderDetails.order.status == 2"
                      @click="handleAfterSales(it, orderDetails)"
                      >{{
                        elementContentList.portal_order_btns_btn1 ||
                        $t("order.btns.btn1")
                      }}</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
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
      </div>
      <afterSale
        ref="afterSale"
        :afterSaleProduct="afterSaleProduct"
        :orderInfo="orderInfo"
        v-else
      />
      <div v-if="loading" class="my_loading flex_c_c">
        <img src="@/assets/index/loading.png" />
        <p>{{ elementContentList.portal_order_text31 || $t("order.text31") }}</p>
      </div>
      <pay v-if="showPayMethod" @payment="changePayment" />
    </div>
  </template>
  
  <script>
  import { orderSearch, orderDetail, deleteOrder, cancelUserOrder, confirmReceiveOrder, confirmPrint, refusePrint } from '@/api/order'
  import { qrcode, notifyPayResult, ispay, genPayInfo, } from '@/api/payment'
  import afterSale from './afterSale.vue'
  import pay from '@/components/pay/index'
  import Deposit from '@/components/Deposit';
  import AttachmentInfo from '@/components/AttachmentInfo';
  import PreviewModel from '@/components/PreviewModel';
  
  export default {
    name: '',
    components: {
      afterSale,
      pay,
      Deposit,
      AttachmentInfo,
      PreviewModel
    },
    data () {
      return {
        isList: true,
        actNav: -1,
        orderList: [],
        orderDetails: '',
        orderStatusList: [],
        processStatus: 101,
        status: 0,
        hasCustom: 1,
        showPayCode: false,
        payCode: '',
        payOrderInfo: '',
        showAfterSale: false,
        orderInfo: {},
        afterSaleProduct: {},
        showPayMethod: false,
        paypalHrefLink: '',
        loading: false,
        elementContentList: '',
        orderStatus: {},
        payArr: [],
        normalList: [],
        customList: [],
      }
    },
    mounted () {
      this.elementContentList = window.elementContentList
      this.orderStatus = {
        0: this.elementContentList.portal_order_orderStatus_status1 || this.$t('order.orderStatus.status1'),
        1: this.elementContentList.portal_order_orderStatus_status2 || this.$t('order.orderStatus.status2'),
        2: this.elementContentList.portal_order_orderStatus_status3 || this.$t('order.orderStatus.status3'),
        3: this.elementContentList.portal_order_orderStatus_status4 || this.$t('order.orderStatus.status4'),
        4: this.elementContentList.portal_order_orderStatus_status5 || this.$t('order.orderStatus.status5'),
        5: this.elementContentList.portal_order_orderStatus_status6 || this.$t('order.orderStatus.status6'),
        6: this.elementContentList.portal_order_orderStatus_status7 || this.$t('order.orderStatus.status7'),
        7: this.elementContentList.portal_order_orderStatus_status8 || this.$t('order.orderStatus.status8'),
        8: this.elementContentList.portal_order_orderStatus_status9 || this.$t('order.orderStatus.status9'),
        9: this.elementContentList.portal_order_orderStatus_status10 || this.$t('order.orderStatus.status10'),
      }
      if (this.$route.query.orderId) {
        this.isList = false
        this.detailId = this.$route.query.orderId
        this.getOrderDetail()
      }
      // if (this.$route.params.orderId) {
      //   this.isList = false
      //   this.detailId = this.$route.query.orderId
      //   this.getOrderDetail()
      // }
      this.getOrderList()
    },
    methods: {
      // 定制商品接收打印
      handleAccept (val, index) {
        const h = this.$createElement
        let text1 = this.elementContentList.portal_order_box_text3 || this.$t('order.box.text3')
        let text2 = this.elementContentList.portal_order_box_text4 || this.$t('order.box.text4')
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
          confirmPrint(val.order.id).then(res => {
            if (res.data) {
              this.$message.success({ message: this.elementContentList.portal_order_msg4 || this.$t('order.msg4'), duration: 1500 })
            } else {
              this.$message.error({ message: this.elementContentList.portal_order_msg5 || this.$t('order.msg5'), duration: 1500 })
            }
          })
        }).catch(() => {
        })
      },
      // 定制商品拒绝打印
      handleDecline (val, index) {
        const h = this.$createElement
        let text1 = this.elementContentList.portal_order_box_text5 || this.$t('order.box.text5')
        let text2 = this.elementContentList.portal_order_box_text6 || this.$t('order.box.text6')
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
          refusePrint(val.order.id).then(res => {
            if (res.data) {
              this.$message.success({ message: this.elementContentList.portal_order_msg4 || this.$t('order.msg4'), duration: 1500 })
            } else {
              this.$message.error({ message: this.elementContentList.portal_order_msg5 || this.$t('order.msg5'), duration: 1500 })
            }
          })
        }).catch(() => {
        })
      },
      // 查看支付结果
      handleCheckResult () {
        ispay(this.payResult.payBillId).then(res => {
          let settlemenData = {
            orderId: this.payOrderInfo.order.orderId,
            // addressInfo: this.checkAddr,
            // productList: this.productList,
            payResult: this.payResult
          }
          if (res.data) {
            this.$router.push({ path: '/order/pay/success', query: { settlemenData: JSON.stringify(settlemenData) } })
          } else {
            this.$router.push({ path: '/order/pay/fail', query: { settlemenData: JSON.stringify(settlemenData) } })
          }
        })
      },
      changePayment (val) {
        this.payMethod = val
        this.loading = true
        const params = {
          orderId: this.payOrderInfo.order.id,
          payToolType: this.payMethod,
        }
        qrcode(params).then(resp => {
          this.showPayMethod = false
          this.showPayCode = true
          this.payResult = resp.data
          this.paypalHrefLink = resp.data.paypalHrefLink
          window.open(resp.data.paypalHrefLink)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      // 支付
      handlePayment (val, index) {
        this.payOrderInfo = val
        this.showPayMethod = true
      },
      handleClose () {
        this.showPayCode = false
      },
      // 售后
      handleAfterSales (val, item) {
        console.log(val)
        this.afterSaleProduct = val
        this.orderInfo = item
        this.showAfterSale = true
      },
      // 详情取消订单
      handleCancelDetail () {
        cancelUserOrder(this.orderDetails.order.id).then(res => {
          if (res.code == 200) {
            this.$message.success({ message: this.elementContentList.portal_order_msg1 || this.$t('order.msg1'), duration: 1500 })
            this.getOrderDetail()
          }
        })
      },
      // 详情确认收货
      handleConfirReceipt () {
        confirmReceiveOrder(this.orderDetails.order.id).then(res => {
          if (res.code == 200) {
            this.$message.success({ message: this.elementContentList.portal_order_msg2 || this.$t('order.msg2'), duration: 2000 })
            this.getOrderDetail()
          }
        })
      },
      // 确认收货
      handleConfirm (val) {
        confirmReceiveOrder(val.order.id).then(res => {
          if (res.code == 200) {
            this.$message.success({ message: this.elementContentList.portal_order_msg2 || this.$t('order.msg2'), duration: 1500 })
            this.getOrderList()
          }
        })
      },
      // 删除订单
      handleDelete (val, index) {
        deleteOrder(val.id).then(res => {
          if (res.code == 200) {
            this.orderList.splice(index, 1)
            this.$message.success({ message: this.elementContentList.portal_order_msg3 || this.$t('order.msg3'), duration: 1500 })
          }
        })
      },
      // 取消订单
      handleCancel (val, index) {
        cancelUserOrder(val.id).then(res => {
          if (res.code == 200) {
            this.$message.success({ message: this.elementContentList.portal_order_msg1 || this.$t('order.msg1'), duration: 1500 })
            this.getOrderDetail()
          }
        })
      },
      // 
      getPayRemainTime() {
        setInterval(() => {
          this.payArr.forEach(i => {
            let time = this.orderList[i].order.payRemainTime
            let arr = time.split(' ')
            let s = arr[arr.length - 2]
            let m = arr[arr.length - 4]
            let h = arr[arr.length - 5]
            let d = arr[arr.length - 8]
            s--
            if(s < 0){
              s = 59
              m--
            }
            if(m < 0) {
              m = 59
              h--
            }
            if(h < 0){
              h = 59
              d--
            }
            arr[arr.length - 2] = s
            arr[arr.length - 4] = m
            arr[arr.length - 6] = h
            arr[arr.length - 8] = d
            
            let newArr = arr.slice(2, 6);
            this.orderList[i].order.payRemainTime = arr.join(' ')
            this.orderList[i].order.newPayRemainTime = newArr.join(' ')
            

            if(s==0 && m==0 && h==0 && d==0){
              this.orderList[i].order.needCancelPay = true
            }
          })
        }, 1000)
      },
      getOrderList () {
        const params = {
          keyword: '',
          orderStatusList: this.orderStatusList,
          pageNum: 1,
          pageSize: 10000,
          productCategoryUid: '',
        }
        orderSearch(params).then(res => {
          if (res.code == 200) {
            let arr = []
            this.payArr = []
            res.data.list.forEach((item, idx) => {
              let hasCustom = false
              item.orderItemList.forEach(it => {
                if (it.productType == 'custom') {
                  hasCustom = true
                }
              })
              let obj = {
                ...item,
                hasCustom
              }
              arr.push(obj)
              if(!item.order.needCancelPay){
                this.payArr.push(idx)
              }
            })
            this.orderList = arr
            if(this.payArr.length > 0 ) {this.getPayRemainTime()}
          }
        })
      },
      handleGoback () {
        this.isList = true
      },
      handleShowOrderDetails (val, index) {
        this.detailId = val.order.id
        this.getOrderDetail()
      },
      getOrderDetail () {
        orderDetail(this.detailId).then(res => {
          if (res.code == 200) {
            this.isList = false
            this.customList = []
            this.normalList = []
            this.orderDetails = res.data
            this.hasCustom = res.data.order.hasCustom
            this.status = res.data.order.status
            if (this.hasCustom) {
              this.processStatus = res.data.orderCustomProcessList[res.data.orderCustomProcessList.length - 1].processStatus
            } else {
              this.processStatus = res.data.orderProcessList[res.data.orderProcessList.length - 1].processStatus
            }
            this.orderDetails.orderItemList.forEach(item => {
              if(item.productType == 'custom'){
                this.customList.push(item)
              } else {
                this.normalList.push(item)
              }
            })
          }
        })
      },
      handleChangeNav (val) {
        this.actNav = val
        if (val == -1) {
          this.orderStatusList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        } else {
          this.orderStatusList = [val]
        }
        this.getOrderList()
      },
    }
  }
  </script>
  
  <style lang="scss">
  .order {
    width: 100%;
    height: 100%;
    padding: 35px 0 35px 24px;
    color: #3d3d3d;
    font-size: 14px;
    line-height: 22px;
    font-family: "Poppins";
    .order_container {
      height: 100%;
      .order_title {
        span {
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
        }
      }
      .order_nav {
        width: fit-content;
        margin-top: 10px;
        height: 46px;
        line-height: 46px;
        border-bottom: 1px solid #e2e2e2;
        color: rgba(0, 0, 0, 0.88);
        .nav_item {
          margin-right: 32px;
          cursor: pointer;
          &.active {
            line-height: 46px;
            height: 46px;
            color: #f6497f;
            font-weight: 500;
            border-bottom: 2px solid #f6497f;
          }
        }
        .nav_item:last-child {
          margin: 0;
        }
      }
      .order_list {
        width: 100%;
        height: calc(100% - 100px);
        padding: 31px 38px 0 0;
        overflow-y: scroll;
        .order_item {
          margin-bottom: 34px;
          .order_head {
            height: 65px;
            padding: 10px 22px;
            background: #efefef;
            border-radius: 8px 8px 0px 0px;
            .head_left {
              .head_item {
                margin-right: 53px;
                p:nth-of-type(1) {
                  font-size: 12px;
                  font-weight: 500;
                  line-height: 20px;
                  margin-bottom: 4px;
                }
              }
            }
            .to_details {
              .btn {
                color: #f6497f;
                width: 91px;
              }
            }
          }
          .pro_details {
            display: flex;
            flex-direction: column;
            border: 1px solid #e2e2e2;
            border-top: none;
            .det_left {
              flex: 1;
              padding: 15px 0 0 12px;
              .order_status {
                margin: 15px 12px 15px 0;
                span {
                  display: inline-block;
                  border-radius: 8px;
                  padding: 4px 24px;
                  background: #ececec;
                  height: 32px;
                  font-size: 16px;
                  font-weight: 500;
                  line-height: 24px;
                }
              }
              .pro_item {
                padding-bottom: 17px;
                border-bottom: 1px solid #e2e2e2;
                margin-bottom: 15px;
                display: flex;
                .item {
                  display: flex;
                  flex: 1;
                  &.custom-item {
                    flex-direction: column;
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
                  .pro_info {
                    width: 100%;
                    padding: 12px;
                    background: #f8f9fc;
                    border-radius: 8px;
                    font-size: 14px;
                    margin-top: 20px;
                    i {
                      float: right;
                    }
                    .pro_item2 {
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
                  .wait-saomiao {
                    align-items: start;
                    background-color: #F8F9FC;
                    padding: 16px 24px;
                    margin-bottom: 24px;
                    border-radius: 6px;
                  }
                  .warn-msg {
                    font-size: 16px;
                    font-weight: 500;
                    color: #F6497F;
                    margin-bottom: 16px;
                  }
                  .wait-info-item {
                    font-size: 14px;
                    color: #929DAA;
                    white-space: nowrap;
                    &:not(:last-child) {
                      margin-bottom: 8px;
                    }
                    .wait-info-item-val {
                      color: #3D3D3D;
                    }
                  }
                }
                .pro_img {
                  width: 115px;
                  height: 115px;
                  border-radius: 8px;
                  background: linear-gradient(0deg, #ffe0e0 2%, #ffdce9 100%);
                  margin-right: 17px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 8px;
                  }
                }
                .pro_name {
                  flex: 1;
                  padding-right: 20px;
                  .it_name {
                    font-weight: 500;
                    text-wrap: wrap;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                  .it_attr {
                    font-size: 12px;
                    line-height: 20px;
                    color: #9a9a9a;
                    margin: 2px 0 4px;
                  }
                  .it_qty {
                  }
                  .it_price {
                    color: #f6497f;
                    margin: 9px 0;
                  }
                }
                .after_btn {
                  margin-right: 16px;
                  width: 107px;
                  .btn {
                    width: 91px;
                    height: 24px;
                    border-radius: 4px;
                    border: 1px solid #dadde5;
                    padding: 0px 8px;
                    line-height: 20px;
                    font-size: 12px;
                    background: #ffffff;
                    color: #1f2126;
                  }
                }
              }
              .pro_item:last-child {
                border-bottom: none;
                margin: 0;
              }
            }
            .right_btns {
              width: 100%;
              display: flex;
              justify-content: end;
              border-left: 1px solid #e2e2e2;
              padding: 31px 26px;
              .btn {
                width: auto !important;
                margin: 0;
                height: 32px;
                border-radius: 16px !important;
                padding: 0px 16px;
                gap: 8px;
                background: #ffffff;
                border: 1px solid rgba(0, 0, 0, 0.15);
                color: rgba(0, 0, 0, 0.88);
                margin-bottom: 10px;
              }
              .btn2 {
                background: #f6497f;
                color: #ffffff;
                border: none;
              }
              .flex-row {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: end;
              }
            }
          }
        }
        .order_item:last-child {
          margin: 0;
        }
      }
    }
    .order_details {
      width: 100%;
      height: 100%;
      padding-right: 57px;
      .details_title {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #000000;
        i {
          cursor: pointer;
        }
        span:nth-of-type(1) {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin: 0 14px 0 17px;
        }
      }
      .details_title2 {
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin: 23px 0 21px;
      }
      .order_date {
        span {
          margin-right: 16px;
        }
        span:nth-of-type(2) {
          margin-right: 53px;
        }
        .btns {
          min-width: 80px;
          height: 24px;
          border-radius: 4px;
          padding: 0px 8px;
          gap: 8px;
          background: #ffffff;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: rgba(0, 0, 0, 0.88);
          span {
            margin: 0;
          }
        }
        .btn2{
          background: #F6497F;
          border: none;
        }
      }
      .sted {
        width: 100%;
        border-radius: 8px;
        background: #fff;
        padding: 0;
        margin-top: 12px;
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
      .order_info {
        margin-top: 14px;
        border-radius: 9px;
        // background: #f7f7f7;
        width: 100%;
        // height: 226px;
        display: flex;
        justify-content: space-between;
        .my_title {
          font-weight: 500;
          margin-bottom: 19px;
        }
        p {
          margin-bottom: 14px;
        }
        .address {
          width: 240px;
          padding-right: 30px;
        }
        .pay_info {
          width: 320px;
          border-radius: 12px;
          background: #F8F9FC;
          padding: 16px;
          margin-left: 16px;
        }
        .summary {
          flex: 1;
          background: #F8F9FC;
          border-radius: 12px;
          padding: 16px;
          p:last-child {
            margin-top: 20px;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: #F6497F;
          }
        }
      }
      .pro_details2 {
        display: flex;
        border: 1px solid #e2e2e2;
        border-radius: 9px;
        padding: 16px;
        margin-top: 12px;
        .det_left2 {
          flex: 1;
          .order_status {
            margin: 15px 12px 15px 0;
            span {
              display: inline-block;
              border-radius: 8px;
              padding: 4px 24px;
              background: #ececec;
              height: 32px;
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
            }
          }
          .pro_item {
            padding-bottom: 17px;
            border-bottom: 1px solid #e2e2e2;
            margin-bottom: 15px;
            // display: flex;
            .type{
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
            }
            .addr_card{
              width: 100%;
              border-radius: 8px;
              background: #F8F9FC;
              padding: 4px 16px 16px;
              margin-top: 12px;
              p{
                margin-top: 8px;
              }
            }
            .item {
              display: flex;
              margin-top: 12px;
              flex: 1;
              .pro_style {
                font-size: 12px;
                font-weight: 500;
                line-height: 20px;
                margin: 9px 0;
                span {
                  font-weight: 400;
                }
              }
              .pro_info {
                width: 100%;
                padding: 12px;
                background: #f8f9fc;
                border-radius: 8px;
                font-size: 14px;
                i {
                  float: right;
                }
                .pro_item2 {
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
              width: 115px;
              height: 115px;
              border-radius: 8px;
              background: linear-gradient(0deg, #ffe0e0 2%, #ffdce9 100%);
              margin-right: 17px;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 8px;
              }
            }
            .pro_name {
              flex: 1;
              padding-right: 20px;
              .it_name {
                font-weight: 500;
                text-wrap: wrap;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .it_attr {
                font-size: 12px;
                line-height: 20px;
                color: #9a9a9a;
                margin: 2px 0 4px;
              }
              .it_price {
                color: #f6497f;
                margin: 9px 0;
              }
            }
          }
          .pro_item:last-child {
            border-bottom: none;
            margin: 0;
            padding: 0;
          }
        }
        .right_btns {
          width: 220px;
          border-left: 1px solid #e2e2e2;
          text-align: right;
          padding-top: 37px;
          .btn {
            width: 168px;
            margin: 0;
            height: 32px;
            border-radius: 6px;
            padding: 0px 16px;
            gap: 8px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            color: rgba(0, 0, 0, 0.88);
            margin-bottom: 10px;
          }
          .btn2 {
            background: #f6497f;
            color: #ffffff;
            border: none;
          }
        }
        .right_btns2{
          width: 110px;
          padding: 0;
          flex-direction: column;
          border: none;
          .btn{
            width: 110px;
            font-size: 12px;
            padding: 0px 8px;
          }
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
  }
  p {
    margin: 0;
  }
  .final-payment {
    width: 100%;
    margin-top: 20px;
    .final-payment-dingjin {
      width: 100%;
      line-height: 56px;
      background-color: #fff;
      border-radius: 4px;
      padding: 0 16px
    }
    .final-payment-content {
      width: 100%;
      padding: 16px;
      background-color: #fff;
      border-radius: 4px;
      margin-top: 16px;
      .final-payment-content-item {
        line-height: 32px;
        &.border-bottom {
          border-bottom: 1px solid #EEEFF2;
          padding-bottom: 16px;
          margin-bottom: 16px;
        }
        .item-name {

        }
        .item-price {
          color: #F6497F;
        }
      }
    }
    .final-payment-foot {
      width: 100%;
      margin-top: 16px;
    }
  }
  .express {
    width: 100%;
    text-align: left;
    margin-top: 20px;
    .express-title {
      margin-bottom: 16px;
    }
    .express-item {
      font-size: 14px;
      font-weight: normal;
      line-height: 22px;
      color: #929DAA;
      .express-item-val {
        color: #1D2129;
      }
    }
    .fahuo {
      font-size: 14px;
      line-height: 22px;
      color: #1D2129;
      .fahuo-msg2 {
        color: #929DAA;
      }
    }
    .delivery-method {
      
    }
  }
  </style>
  
  