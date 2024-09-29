<template>
  <div class="basic">
    <div v-if="showStep">
      <!-- 选择宠物或人物 -->
      <div class="one" v-show="step == 1">
        <p class="title">
          {{
            elementContentList.portal_custom_basic_title1 ||
            $t("custom.basic.title1")
          }}
        </p>
        <p class="subtitle">
          {{
            elementContentList.portal_custom_basic_title2 ||
            $t("custom.basic.title2")
          }}
        </p>
        <div class="types flex_c_c">
          <div
            class="item"
            v-for="(item, index) in customProList"
            :key="item.productBaseUid"
          >
            <div class="image flex_c_c" @click="handleChangeType(item, index)">
              <img src="@/assets/index/logo.png" />
              <div class="border" :class="type == index ? 'active' : ''"></div>
              <div v-if="type == index"><i class="el-icon-success"></i></div>
            </div>
            <p>{{ item.name }}</p>
            <p>
              {{
                elementContentList.portal_custom_basic_label14 ||
                $t("custom.basic.label14")
              }}
            </p>
          </div>
        </div>
      </div>
      <!-- 输入身高体重比例 -->
      <div class="two" v-show="step == 2">
        <custom-header
          :onAddClick="handleAdd"
          :label="
            elementContentList.portal_custom_basic_title4 ||
            $t('custom.basic.title4')
          "
          :title="
            elementContentList.portal_custom_basic_title4 ||
            $t('custom.basic.title4')
          "
          :step="step"
          @handleBack="handleBack"
        ></custom-header>
        <div class="info">
          <div
            class="item"
            v-for="(item, index) in objectList"
            :key="'o' + index"
          >
            <p class="label flex_b_c">
              <span>
                {{
                  elementContentList.portal_custom_basic_label5 ||
                  $t("custom.basic.label5") + (index + 1)
                }}
              </span>

              <span v-if="index > 0" @click="handleDelete(item, index)">{{
                elementContentList.portal_btns_delete || $t("btns.delete")
              }}</span>
            </p>
            <div class="flex">
              <div class="inputs">
                <div class="m_r flex">
                  <div class="input">
                    <span class="text4"
                      >{{
                        elementContentList.portal_custom_basic_label12 ||
                        $t("custom.basic.label12")
                      }}
                      (cm)</span
                    >
                    <el-input
                      v-model="item.height"
                      @blur="handleBlur(item, index)"
                      @change="handleChange(item, index)"
                      :placeholder="
                        elementContentList.portal_custom_basic_placeholder1 ||
                        $t('custom.basic.placeholder1')
                      "
                    />
                  </div>
                  <p class="tips tips2" v-if="item.showTip1">
                    {{
                      elementContentList.portal_custom_basic_tip1 ||
                      $t("custom.basic.tip1")
                    }}
                  </p>
                </div>
                <div class="m_r flex">
                  <div class="input">
                    <span class="text4"
                      >{{
                        elementContentList.portal_custom_basic_label13 ||
                        $t("custom.basic.label13")
                      }}
                      (kg)</span
                    >
                    <el-input
                      v-model="item.weight"
                      @blur="handleBlur2(item, index)"
                      @change="handleChange(item, index)"
                      :placeholder="
                        elementContentList.portal_custom_basic_placeholder2 ||
                        $t('custom.basic.placeholder2')
                      "
                    />
                  </div>
                  <p class="tips tips2" v-if="item.showTip2">
                    {{
                      elementContentList.portal_custom_basic_tip2 ||
                      $t("custom.basic.tip2")
                    }}
                  </p>
                </div>
                <div class="m_r2 flex">
                  <div class="input">
                    <span class="text4">{{
                      elementContentList.portal_custom_basic_label16 ||
                      $t("custom.basic.label16")
                    }}</span>
                    <el-select
                      v-model="item.sku"
                      @change="handleBlur3(item, index)"
                      :popper-append-to-body="false"
                      :placeholder="
                        elementContentList.portal_custom_basic_placeholder3 ||
                        $t('custom.basic.placeholder3')
                      "
                    >
                      <el-option
                        v-for="attr in customSkuList"
                        :key="attr.value"
                        :label="attr.label"
                        :value="attr.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <p class="tips tips2" v-if="item.showTip3">
                    {{
                      elementContentList.portal_custom_basic_tip3 ||
                      $t("custom.basic.tip3")
                    }}
                  </p>
                </div>
              </div>
              <div class="results">
                <div v-if="item.modelWeight">
                  <p class="res flex">
                    <img src="@/assets/index/height.png" />
                    <span>{{
                      elementContentList.portal_custom_basic_label18 ||
                      $t("custom.basic.label18")
                    }}</span>
                    <span>{{ item.modelHeight }} </span><span>cm</span>
                  </p>
                  <p class="res flex">
                    <img src="@/assets/index/height.png" />
                    <span>{{
                      elementContentList.portal_custom_basic_label19 ||
                      $t("custom.basic.label19")
                    }}</span>
                    <span>{{ item.modelWeight }} </span><span>g</span>
                  </p>
                </div>
                <p v-else class="no_res">
                  {{
                    elementContentList.portal_custom_basic_label17 ||
                    $t("custom.basic.label17")
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 选择定制服务类型 -->
      <div class="four" v-show="step == 4">
        <custom-header
          :onAddClick="handleAdd"
          :label="
            elementContentList.portal_custom_basic_title4 ||
            $t('custom.basic.step4.label1')
          "
          :title="
            elementContentList.portal_custom_basic_title4 ||
            $t('custom.basic.step4.title')
          "
          :step="step"
          @handleBack="handleBack"
        ></custom-header>

        <div class="four_main flex_b_c">
          <div class="left">
            <div class="tabs flex">
              <div
                class="tab_item"
                :class="tab == index ? 'active' : ''"
                @click="handleChangeTab(item, index)"
                v-for="(item, index) in serviceList"
                :key="item.customServiceUid"
              >
                <p>{{ item.name }}</p>
                <p>{{ item.serviceDesc }}</p>
                <div class="border"></div>
              </div>
            </div>
            <div class="style">
              <p class="style_title">
                {{
                  elementContentList.portal_custom_basic_step4_label8 ||
                  $t("custom.basic.step4.label8")
                }}
              </p>
              <div class="desc">{{ serviceDesc }}</div>
            </div>
          </div>
          <div class="right image_pre">
            <div
              class="images flec_c_c"
              v-for="(item, idx) in serviceData.picResourceVOList"
              :key="item.ossNo"
              v-show="imageAct == idx"
            >
              <img :src="item.preViewUrl" />
              <div
                v-if="imageAct == idx"
                class="arrow_left flex_c_c"
                @click="handleLeft(item, idx)"
              >
                <i class="el-icon-arrow-left"></i>
              </div>
              <div
                v-if="imageAct == idx"
                class="arrow_right flex_c_c"
                @click="handleRight(item, idx)"
              >
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="image_list">
              <div
                class="image_item"
                :class="imageAct == index ? 'active' : ''"
                v-for="(item, index) in serviceData.picResourceVOList"
                :key="index + 'img'"
                @click="handleChangeImage(item, index)"
              >
                <video v-if="item.playUrl" :src="item.playUrl"></video>
                <img v-else :src="item.thumbnailViewUrl" />
                <div class="active_border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 独立摆件 -->
      <div class="five" v-show="step == 5">
        <div class="flex">
          <div class="back flex" @click="handleBack(5)">
            <i class="el-icon-arrow-left"></i>
            <span>{{
              elementContentList.portal_custom_basic_label11 ||
              $t("custom.basic.label11")
            }}</span>
          </div>
          <span style="font-size: 16px">{{
            elementContentList.portal_custom_basic_step5_label5 ||
            $t("custom.basic.step5.label5")
          }}</span>
        </div>
        <p class="subtitle m_t2">
          {{
            elementContentList.portal_custom_basic_step5_label1 ||
            $t("custom.basic.step5.label1")
          }}
          <span style="color: #f6497f">{{
            elementContentList.portal_custom_basic_step5_label2 ||
            $t("custom.basic.step5.label2")
          }}</span>
        </p>
        <div class="five_main flex_a_c">
          <div class="left image_pre">
            <div
              class="images flec_c_c"
              v-for="(item, idx) in serviceData.picResourceVOList"
              :key="item.ossNo"
              v-show="imageAct == idx"
            >
              <img :src="item.preViewUrl" />
              <div
                v-if="imageAct == idx"
                class="arrow_left flex_c_c"
                @click="handleLeft(item, idx)"
              >
                <i class="el-icon-arrow-left"></i>
              </div>
              <div
                v-if="imageAct == idx"
                class="arrow_right flex_c_c"
                @click="handleRight(item, idx)"
              >
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="image_list">
              <div
                class="image_item"
                :class="imageAct == index ? 'active' : ''"
                v-for="(item, index) in serviceData.picResourceVOList"
                :key="index + 'img'"
                @click="handleChangeImage(item, index)"
              >
                <video v-if="item.playUrl" :src="item.playUrl"></video>
                <img v-else :src="item.thumbnailViewUrl" />
                <div class="active_border"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <p class="text3">
              {{
                elementContentList.portal_custom_basic_step5_label3 ||
                $t("custom.basic.step5.label3")
              }}
            </p>
            <div class="pro_list">
              <div
                class="pro_item flex"
                v-for="(item, index) in serviceProductList"
                :key="index + 'pro'"
              >
                <div class="pro_card flex_b_c">
                  <div class="check">
                    <el-checkbox v-model="item.check"></el-checkbox>
                  </div>
                  <div class="img">
                    <img :src="item.productPicUrl" />
                  </div>
                  <div class="pro_info">
                    <div style="flex: 1">
                      <p>{{ item.productName }}</p>
                      <p
                        v-for="attr in item.attributeValueVOs"
                        :key="attr.productAttributeUid"
                      >
                        {{ attr.productAttributeName + ":" + attr.value }}
                      </p>
                      <p class="qty">
                        <span>Qty</span>
                        <el-input
                          @input="
                            item.productQuantity = item.productQuantity.replace(
                              /[^\d]/g,
                              ''
                            )
                          "
                          v-model="item.productQuantity"
                        />
                      </p>
                    </div>
                    <div class="price">
                      <span
                        >£ {{ item.productPrice * item.productQuantity }}</span
                      >
                    </div>
                  </div>
                </div>
                <span
                  class="btn"
                  @click="handleEditServiceProduct(item, index)"
                  >{{
                    elementContentList.portal_custom_basic_step5_label4 ||
                    $t("custom.basic.step5.label4")
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 门店选择 -->
      <div class="six" v-show="step == 6">
        <div class="flex">
          <div class="back flex" @click="handleBack(6)">
            <i class="el-icon-arrow-left"></i>
            <span>{{
              elementContentList.portal_custom_basic_label11 ||
              $t("custom.basic.label11")
            }}</span>
          </div>
          <span style="font-size: 16px">{{
            elementContentList.portal_custom_basic_step6_label1 ||
            $t("custom.basic.step6.label1")
          }}</span>
        </div>
        <p class="subtitle m_t2">
          {{
            elementContentList.portal_custom_basic_step6_title ||
            $t("custom.basic.step6.title")
          }}
        </p>
        <div class="six_main">
          <div class="six_left">
            <div
              class="store_item"
              v-for="(item, index) in storeList"
              :key="index + 'store'"
              :style="item == 2 ? { background: '#F8F9FC' } : ''"
              @click="handleChangeStoreIdx(item, index)"
              :class="storeIdx == index ? 'active' : ''"
            >
              <p class="name">
                {{ item.name }}
                <span class="flex"
                  ><i class="el-icon-star-on"></i
                  >{{
                    elementContentList.portal_custom_basic_step6_label2 ||
                    $t("custom.basic.step6.label2")
                  }}</span
                >
              </p>
              <p class="addr">
                <span>{{ "-" }}</span>
                <span>{{ item.address }}</span>
                <span>{{ item.contact }}</span>
              </p>
              <p
                class="status"
                :style="item.status == 0 ? '' : { color: '#646873' }"
              >
                {{
                  item.status == 0
                    ? elementContentList.portal_custom_basic_step6_status1 ||
                      $t("custom.basic.step6.status1")
                    : elementContentList.portal_custom_basic_step6_status2 ||
                      $t("custom.basic.step6.status2")
                }}
                <span>{{ item.status == 0 ? item.businessHours : "" }}</span>
              </p>
              <div class="border"></div>
            </div>
          </div>
          <div class="six_right">
            <div class="image_pre">
              <div
                class="images flec_c_c"
                v-for="(pic, idx) in storeInfo.picResourceVOs"
                :key="pic.ossNo"
                v-show="imageAct2 == idx"
              >
                <img :src="pic.preViewUrl" />
                <div
                  v-if="imageAct2 == idx"
                  class="arrow_left flex_c_c"
                  @click="handleLeft2(item, idx)"
                >
                  <i class="el-icon-arrow-left"></i>
                </div>
                <div
                  v-if="imageAct2 == idx"
                  class="arrow_right flex_c_c"
                  @click="handleRight2(item, idx)"
                >
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
            <div class="introduce">
              <p class="in_title">
                {{
                  elementContentList.portal_custom_basic_step6_label3 ||
                  $t("custom.basic.step6.label3")
                }}
              </p>
              <div class="in_detail">
                {{ storeInfo.storeDesc }}
              </div>
            </div>
            <p>
              {{
                elementContentList.portal_custom_basic_step6_label4 ||
                $t("custom.basic.step6.label4")
              }}
            </p>
            <div class="time flex_b_c">
              <div class="flex">
                <span>{{
                  elementContentList.portal_custom_basic_step6_label5 ||
                  $t("custom.basic.step6.label5")
                }}</span>
                <el-date-picker
                  v-model="arrivalDateStr"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @blur="handleChangeData"
                  :picker-options="pickerOptions"
                  :placeholder="
                    elementContentList.portal_custom_basic_step6_placeholder1 ||
                    $t('custom.basic.step6.placeholder1')
                  "
                >
                </el-date-picker>
                <p v-if="showDateTip" class="err_tip">
                  {{
                    elementContentList.portal_custom_basic_label20 ||
                    $t("custom.basic.label20")
                  }}
                </p>
              </div>
              <div class="flex">
                <span>{{
                  elementContentList.portal_custom_basic_step6_label6 ||
                  $t("custom.basic.step6.label6")
                }}</span>
                <el-time-picker
                  v-model="arrivalTime"
                  type="date"
                  format="HH:mm"
                  value-format="HH:mm"
                  @blur="handleChangeTime"
                  :placeholder="
                    elementContentList.portal_custom_basic_step6_placeholder2 ||
                    $t('custom.basic.step6.placeholder2')
                  "
                >
                </el-time-picker>
                <p v-if="showTimeTip" class="err_tip">
                  {{
                    elementContentList.portal_custom_basic_label21 ||
                    $t("custom.basic.label21")
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 场景组合 -->
      <div class="seven five" v-show="step == 7">
        <div class="flex">
          <div class="back flex" @click="handleBack(7)">
            <i class="el-icon-arrow-left"></i>
            <span>{{
              elementContentList.portal_custom_basic_label11 ||
              $t("custom.basic.label11")
            }}</span>
          </div>
          <span style="font-size: 16px">{{
            elementContentList.portal_custom_basic_step5_label5 ||
            $t("custom.basic.step5.label5")
          }}</span>
        </div>
        <p class="subtitle m_t2">
          {{
            elementContentList.portal_custom_basic_step5_label1 ||
            $t("custom.basic.step5.label1")
          }}
          <span style="color: #f6497f">{{
            elementContentList.portal_custom_basic_step7_label1 ||
            $t("custom.basic.step7.label1")
          }}</span>
        </p>
        <div class="five_main flex_a_c">
          <div class="pack_tabs">
            <div
              class="tabs_item flex_c_c"
              v-for="(item, index) in packageNameList"
              :key="index + 'p'"
              :class="packIdx == index ? 'active' : ''"
            >
              {{ item.productName }}
              <div
                class="border"
                @click="handleChangePackIdx(item, index)"
              ></div>
            </div>
          </div>
          <div class="left image_pre">
            <div
              class="images flec_c_c"
              v-for="(item, idx) in serviceData.picResourceVOList"
              :key="item.ossNo"
              v-show="imageAct == idx"
            >
              <img :src="item.preViewUrl" />
              <div
                v-if="imageAct == idx"
                class="arrow_left flex_c_c"
                @click="handleLeft(item, idx)"
              >
                <i class="el-icon-arrow-left"></i>
              </div>
              <div
                v-if="imageAct == idx"
                class="arrow_right flex_c_c"
                @click="handleRight(item, idx)"
              >
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="image_list">
              <div
                class="image_item"
                :class="imageAct == index ? 'active' : ''"
                v-for="(item, index) in serviceData.picResourceVOList"
                :key="index + 'img'"
                @click="handleChangeImage(item, index)"
              >
                <video v-if="item.playUrl" :src="item.playUrl"></video>
                <img v-else :src="item.thumbnailViewUrl" />
                <div class="active_border"></div>
              </div>
            </div>
            <div class="text1">
              <span>
                {{ "" }}
              </span>
            </div>
          </div>
          <div class="right">
            <p class="text3">
              {{
                elementContentList.portal_custom_basic_step7_label2 ||
                $t("custom.basic.step7.label2")
              }}
            </p>
            <div class="pro_list">
              <div
                class="pro_item flex"
                v-for="(item, index) in serviceProductList"
                :key="index + 'pro'"
              >
                <div class="pro_card flex_b_c">
                  <div class="check">
                    <el-checkbox v-model="item.check"></el-checkbox>
                  </div>
                  <div class="img">
                    <img :src="item.productPicUrl" />
                  </div>
                  <div class="pro_info">
                    <div style="flex: 1">
                      <p>{{ item.productName }}</p>
                      <p
                        v-for="attr in item.attributeValueVOs"
                        :key="attr.productAttributeUid"
                      >
                        {{ attr.productAttributeName + ":" + attr.value }}
                      </p>
                      <p class="qty">
                        <span>{{
                          elementContentList.portal_custom_basic_step7_label3 ||
                          $t("custom.basic.step7.label3")
                        }}</span>
                        <el-input
                          @input="
                            item.productQuantity = item.productQuantity.replace(
                              /[^\d]/g,
                              ''
                            )
                          "
                          v-model="item.productQuantity"
                        />
                      </p>
                    </div>
                    <div class="price">
                      <span
                        >£ {{ item.productPrice * item.productQuantity }}</span
                      >
                    </div>
                  </div>
                </div>
                <span
                  class="btn"
                  @click="handleEditServiceProduct(item, index)"
                  >{{
                    elementContentList.portal_custom_basic_step5_label4 ||
                    $t("custom.basic.step5.label4")
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 功能配件 -->
      <div class="five" v-show="step == 8">
        <div class="flex">
          <div class="back flex" @click="handleBack(8)">
            <i class="el-icon-arrow-left"></i>
            <span>{{
              elementContentList.portal_custom_basic_label11 ||
              $t("custom.basic.label11")
            }}</span>
          </div>
          <span style="font-size: 16px">{{
            elementContentList.portal_custom_basic_step8_label1 ||
            $t("custom.basic.step8.label1")
          }}</span>
        </div>
        <p class="subtitle m_t2">
          {{
            elementContentList.portal_custom_basic_step5_label1 ||
            $t("custom.basic.step5.label1")
          }}
          <span style="color: #f6497f">{{
            detailInfo ? detailInfo.customServiceName : ""
          }}</span>
        </p>
        <div class="five_main flex_a_c">
          <div class="left image_pre">
            <div
              class="images flec_c_c"
              v-for="(item, idx) in serviceData.picResourceVOList"
              :key="item.ossNo"
              v-show="imageAct == idx"
            >
              <img :src="item.preViewUrl" />
              <div
                v-if="imageAct == idx"
                class="arrow_left flex_c_c"
                @click="handleLeft(item, idx)"
              >
                <i class="el-icon-arrow-left"></i>
              </div>
              <div
                v-if="imageAct == idx"
                class="arrow_right flex_c_c"
                @click="handleRight(item, idx)"
              >
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="image_list">
              <div
                class="image_item"
                :class="imageAct == index ? 'active' : ''"
                v-for="(item, index) in serviceData.picResourceVOList"
                :key="index + 'img'"
                @click="handleChangeImage(item, index)"
              >
                <video v-if="item.playUrl" :src="item.playUrl"></video>
                <img v-else :src="item.thumbnailViewUrl" />
                <div class="active_border"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <p class="text3">
              {{
                elementContentList.portal_custom_basic_step5_label3 ||
                $t("custom.basic.step5.label3")
              }}
            </p>
            <div class="pro_list">
              <div
                class="pro_item flex"
                v-for="(item, index) in serviceProductList"
                :key="index + 'pro'"
              >
                <div class="pro_card flex_b_c">
                  <div class="check">
                    <el-checkbox v-model="item.check"></el-checkbox>
                  </div>
                  <div class="img">
                    <img :src="item.productPicUrl" />
                  </div>
                  <div class="pro_info">
                    <div style="flex: 1">
                      <p>{{ item.productName }}</p>
                      <p
                        v-for="attr in item.attributeValueVOs"
                        :key="attr.productAttributeUid"
                      >
                        {{ attr.productAttributeName + ":" + attr.value }}
                      </p>
                      <p class="qty">
                        <span>{{
                          elementContentList.portal_custom_basic_step7_label3 ||
                          $t("custom.basic.step7.label3")
                        }}</span>
                        <el-input
                          @input="
                            item.productQuantity = item.productQuantity.replace(
                              /[^\d]/g,
                              ''
                            )
                          "
                          v-model="item.productQuantity"
                        />
                      </p>
                    </div>
                    <div class="price">
                      <span
                        >£ {{ item.productPrice * item.productQuantity }}</span
                      >
                    </div>
                  </div>
                </div>
                <span
                  class="btn"
                  @click="handleEditServiceProduct(item, index)"
                  >{{
                    elementContentList.portal_custom_basic_step5_label4 ||
                    $t("custom.basic.step5.label4")
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="confirm_order">
      <p class="con_title">
        {{
          elementContentList.portal_custom_basic_confirm_label1 ||
          $t("custom.basic.confirm.label1")
        }}
        <span @click="handleEditInfo">{{
          elementContentList.portal_btns_edit || $t("btns.edit")
        }}</span>
      </p>
      <div class="cus_info">
        <div class="in_left">
          <p>
            <span class="in_label">{{
              elementContentList.portal_custom_basic_confirm_label2 ||
              $t("custom.basic.confirm.label2")
            }}</span
            ><span>{{ detailInfo ? detailInfo.cusProductName : "" }}</span>
          </p>
          <p>
            <span class="in_label">{{
              elementContentList.portal_custom_basic_confirm_label3 ||
              $t("custom.basic.confirm.label3")
            }}</span>
            <span
              v-for="(obj, idx) in detailInfo.customProductObjVOs"
              :key="idx + 'p'"
              >{{
                obj.height +
                "cm, " +
                obj.weight +
                (idx == detailInfo.customProductObjVOs.length - 1
                  ? "kg"
                  : "kg / ")
              }}</span
            >
          </p>
          <p>
            <span class="in_label">{{
              elementContentList.portal_custom_basic_confirm_label4 ||
              $t("custom.basic.confirm.label4")
            }}</span
            ><span
              v-for="(obj, idx) in detailInfo.customProductObjVOs"
              :key="idx + 'p2'"
              >{{
                idx == detailInfo.customProductObjVOs.length - 1
                  ? obj.ratio
                  : obj.ratio + ","
              }}</span
            >
          </p>
          <p>
            <span class="in_label">{{
              elementContentList.portal_custom_basic_confirm_label5 ||
              $t("custom.basic.confirm.label5")
            }}</span
            ><span>{{ detailInfo.customServiceName }}</span>
          </p>
          <div class="in_pro">
            <span class="in_label">{{
              elementContentList.portal_custom_basic_confirm_label6 ||
              $t("custom.basic.confirm.label6")
            }}</span>
            <div>
              <p
                v-for="(pro, idx) in detailInfo.customServiceProductVOs"
                :key="idx + 'c'"
              >
                <span class="text2">{{ pro.productName }}</span>
                <span
                  class="text2"
                  v-for="attr in pro.attributeValueVOs"
                  :key="attr.productAttributeUid"
                  >{{ attr.value }}</span
                >
                <span class="text2">{{ "x" + pro.num }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="in_right">
          <div>
            <p>
              <span class="in_label">{{
                elementContentList.portal_custom_basic_confirm_label7 ||
                $t("custom.basic.confirm.label7")
              }}</span
              ><span>{{ detailInfo.storeName }}</span>
            </p>
            <p>
              <span class="in_label">{{
                elementContentList.portal_custom_basic_confirm_label8 ||
                $t("custom.basic.confirm.label8")
              }}</span
              ><span>{{
                detailInfo.arrivalDateStr + " " + detailInfo.arrivalTime
              }}</span>
            </p>
          </div>
          <div>
            <p class="in_price">
              <span class="in_label" style="margin-right: 0">{{
                elementContentList.portal_custom_basic_confirm_label9 ||
                $t("custom.basic.confirm.label9")
              }}</span
              ><span style="color: #f6497f">{{
                " £ " +
                (detailInfo.cusTotalPrice - detailInfo.serviceProductTotalPrice)
              }}</span>
            </p>
            <p class="in_price">
              <span class="in_label" style="margin-right: 0">{{
                elementContentList.portal_custom_basic_confirm_label10 ||
                $t("custom.basic.confirm.label10")
              }}</span
              ><span style="color: #f6497f">{{
                " £ " + detailInfo.serviceProductTotalPrice
              }}</span>
            </p>
            <p class="in_total">
              <span class="in_label" style="margin-right: 0">{{
                elementContentList.portal_custom_basic_confirm_label11 ||
                $t("custom.basic.confirm.label11")
              }}</span
              ><span style="color: #f6497f">{{
                " £ " + detailInfo.cusTotalPrice
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <p class="con_btns">
        <el-button class="btn" @click="handleBuyNow">{{
          elementContentList.portal_custom_basic_confirm_label12 ||
          $t("custom.basic.confirm.label12")
        }}</el-button>
        <el-button class="btn btn2" @click="handleAddCart">{{
          elementContentList.portal_custom_basic_confirm_label13 ||
          $t("custom.basic.confirm.label13")
        }}</el-button>
      </p>
    </div>
    <customFooter
      :on-btn-click="handleClickBtn"
      :disabled="step === 1 && type === -1"
    />
    <productInfo v-if="showProInfo" :editServiceProduct="editServiceProduct" />
  </div>
</template>

<script>
import productInfo from "./productInfo.vue";
import footer from "./footer";
import header from "./header.vue";
import {
  checkExist,
  detail,
  objSave,
  objSkuSave,
  save,
  serviceSave,
  serviceSkuSave,
  storeSave,
  storePage,
  servicePage,
  serviceProductPage,
  calculate,
} from "@/api/custom";
import { customPage, productSkuList } from "@/api/product";
import { customGenerateConfirmOrder } from "@/api/order";
import { customAdd } from "@/api/cart";

export default {
  components: {
    productInfo,
    customFooter: footer,
    customHeader: header,
  },
  data() {
    return {
      showStep: true,
      step: 1,
      type: -1,
      objectList: [
        {
          height: "",
          weight: "",
          ratio: "",
          showTip1: false,
          showTip2: false,
          showTip3: false,
          customObjId: "",
          objNickname: "",
          objNo: "",
          productSkuUid: "",
          sku: "",
          modelHeight: "",
          modelWeight: "",
        },
      ],
      tab: 1,
      imageAct: 0,
      imageAct2: 0,
      showProInfo: false,
      status: true,
      storeIdx: 0,
      packIdx: 0,
      arrivalDateStr: "",
      arrivalTime: "",
      next: false,
      storeList: [],
      storeInfo: "",
      customProductId: 1,
      customProList: [],
      customPro: "",
      detailInfo: "",
      customSkuList: [],
      serviceList: [],
      serviceData: "",
      serviceDesc: "",
      serviceProductList: [],
      editServiceProduct: {},
      elementContentList: "",
      packageNameList: [],
      packageProList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      showDateTip: false,
      showTimeTip: false,
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.getDetail();
  },
  methods: {
    handleEditInfo() {
      this.showStep = true;
      this.step = 1;
    },
    handleEditServiceProduct(val, index) {
      this.editServiceProduct = val;
      this.showProInfo = true;
    },
    handleClickBtn() {
      this.handleNext(this.step);
    },
    getStorePage() {
      storePage({ pageNum: 1, pageSize: 100 }).then((respo) => {
        this.storeList = respo.data.list;
        if (this.detailInfo.storeUid) {
          this.storeList.forEach((item, index) => {
            if (item.storeUid == this.detailInfo.storeUid) {
              this.storeIdx = index;
              this.imageAct2 = index;
              this.storeInfo = respo.data.list[index];
              this.arrivalDateStr = this.detailInfo.arrivalDateStr;
              this.arrivalTime = this.detailInfo.arrivalTime;
            }
          });
        } else {
          this.storeIdx = 0;
          this.imageAct2 = 0;
          this.storeInfo = respo.data.list[0];
        }
      });
    },
    getsServiceProductPage() {
      const params = {
        pageNum: 1,
        pageSize: 100,
        customServiceUid: this.detailInfo.customServiceUid,
      };
      serviceProductPage(params).then((res) => {
        if (this.serviceData.type == "combined_scene") {
          let arr = [],
            arr2 = [];
          res.data.list.forEach((item, index) => {
            let obj2 = {
              productName: item.productName,
              productUid: item.productUid,
            };
            arr2.push(obj2);
            let obj = {
              ...item,
              check: false,
            };
            arr.push(obj);
          });
          this.packageProList = arr;
          let uniqueItems = arr2.filter(
            (item, index, self) =>
              self.findIndex((i) => i.productUid === item.productUid) === index
          );
          this.packageNameList = uniqueItems;
          if (this.detailInfo.customServiceProductVOs) {
            this.detailInfo.customServiceProductVOs.forEach((item) => {
              this.packageProList.forEach((ele) => {
                if (item.customServiceSkuUid == ele.customServiceSkuUid) {
                  ele.check = true;
                }
              });
            });
          }
          this.handleChangePackIdx(this.packageProList[0], 0);
        } else {
          let arr = [];
          res.data.list.forEach((item) => {
            let obj = {
              ...item,
              check: true,
            };
            arr.push(obj);
          });
          this.serviceProductList = arr;
          if (this.detailInfo.customServiceProductVOs) {
            this.detailInfo.customServiceProductVOs.forEach((item) => {
              this.serviceProductList.forEach((ele) => {
                if (item.customServiceSkuUid == ele.customServiceSkuUid) {
                  ele.check = true;
                }
              });
            });
          }
        }
      });
    },
    getServicePage() {
      const params = {
        pageNum: 1,
        pageSize: 100,
        productBaseUid: this.detailInfo.cusProductBaseUid,
      };
      servicePage(params).then((res) => {
        this.serviceList = res.data.list;
        if (this.detailInfo.customServiceUid) {
          this.serviceList.map((item, idx) => {
            if (this.detailInfo.customServiceUid == item.customServiceUid) {
              this.tab = idx;
            }
          });
        } else {
          this.tab = 0;
        }
        this.serviceDesc = this.serviceList[this.tab].serviceDesc;
        this.serviceData = this.serviceList[this.tab];
        this.imageAct = 0;
        if (this.detailInfo.processStatus == 4) {
          switch (this.serviceData.type) {
            case "normal":
              this.step = 5;
              break;
            case "accessory":
              this.step = 8;
              break;
            case "combined_scene":
              this.step = 7;
              break;
          }
        }
        if (this.step != 3) {
          this.getsServiceProductPage();
        }
      });
    },
    getProductSkuList() {
      productSkuList({
        productBaseUid: this.detailInfo.cusProductBaseUid,
      }).then((res) => {
        let arr3 = [];
        res.data.map((item) => {
          let attrArr = [];
          item.attributeValueVOs.forEach((attr) => {
            attrArr.push(attr.value);
          });
          let obj = {
            ...item,
            label: attrArr.join(","),
            value: item.productSkuStockUid,
          };
          arr3.push(obj);
        });
        this.customSkuList = arr3;
      });
    },
    getObjectList() {
      if (this.detailInfo.customProductObjVOs.length > 0) {
        let arr = [];
        this.detailInfo.customProductObjVOs.map((item) => {
          let modelHeight = "",
            modelWeight = "";
          if (item.height && item.weight && item.ratio) {
            const params = {
              height: item.height,
              ratio: item.ratio,
              type: 1,
              weight: item.weight,
            };
            calculate(params).then((res) => {
              modelHeight = res.data.modelHeight;
              modelWeight = res.data.modelWeight;
            });
          }
          let obj = {
            ...item,
            sku: item.productSkuUid,
            showTip1: false,
            showTip2: false,
            showTip3: false,
            modelHeight,
            modelWeight,
          };
          arr.push(obj);
        });
        this.objectList = arr;
        console.log("this.objectList", this.objectList);
      }
    },
    getDetail() {
      detail()
        .then((res) => {
          this.detailInfo = res.data;
          if (!res.data) {
            customPage({ productType: "custom" }).then((resp) => {
              this.customProList = resp.data.list;
              this.customPro = resp.data.list[0];
              this.type = -1;
            });
          } else {
            this.customProductId = res.data.customProductId;
            customPage({ productType: "custom" }).then((resp) => {
              this.customProList = resp.data.list;
              this.customProList.forEach((item, idx) => {
                if (this.detailInfo.cusProductUid == item.productUid) {
                  this.customPro = item;
                  this.type = idx;
                }
              });
            });
            switch (res.data.processStatus) {
              case 0:
                this.step = 1;
                break;
              case 1:
                this.getObjectList();
                this.getProductSkuList();
                this.step = 2;
                break;
              // case 2:
              //   this.getObjectList()
              //   this.getProductSkuList()
              //   this.step = 3
              //   break
              case 2:
                this.getObjectList();
                this.getProductSkuList();
                this.getServicePage();
                this.step = 4;
                break;
              case 3:
                this.getObjectList();
                this.getProductSkuList();
                this.getServicePage();
                this.step = 4;
                break;
              case 4:
                this.getObjectList();
                this.getProductSkuList();
                this.getServicePage();
                this.getStorePage();
                this.step = 6;
                break;
              case 5:
                this.getObjectList();
                this.getProductSkuList();
                this.getServicePage();
                this.getStorePage();
                this.step = 6;
                break;
            }
          }
        })
        .catch(() => {});
    },
    handleChangePackIdx(val, index) {
      this.packIdx = index;
      let arr = [];
      this.packageProList.map((item) => {
        if (item.productUid == val.productUid) {
          arr.push(item);
        }
      });
      this.serviceProductList = arr;
    },
    handleChangeStoreIdx(item, idx) {
      this.storeIdx = idx;
      this.storeInfo = item;
    },
    handleChangeImage(val, index) {
      this.imageAct = index;
      if (val.playUrl) {
        this.videoUrl = val.playUrl;
        this.imageUrl = "";
      } else {
        this.imageUrl = val.preViewUrl;
        this.videoUrl = "";
      }
    },
    handleChangeTab(val, index) {
      this.tab = index;
      this.serviceData = val;
      this.serviceDesc = val.serviceDesc;
    },
    getCalculate(weight, height, ratio, index) {
      const params = {
        height,
        ratio,
        type: 1,
        weight,
      };
      calculate(params).then((res) => {
        this.objectList[index].modelHeight = res.data.modelHeight;
        this.objectList[index].modelWeight = res.data.modelWeight;
      });
    },
    handleChange(val, index) {
      if (val.height && val.weight && val.ratio) {
        this.getCalculate(val.weight, val.height, val.ratio, index);
      }
    },
    handleBlur3(val, index) {
      if (val.sku != "") {
        val.showTip3 = false;
        this.customSkuList.forEach((item) => {
          if (item.value == val.sku) {
            this.objectList[index].ratio = item.label;
          }
        });
      } else {
        val.showTip3 = true;
      }
      if (val.height && val.weight && val.ratio) {
        this.getCalculate(val.weight, val.height, val.ratio, index);
      }
    },
    handleBlur2(val, index) {
      if (val.weight) {
        val.showTip2 = false;
      } else {
        val.showTip2 = true;
      }
    },
    handleBlur(val, index) {
      if (val.height) {
        val.showTip1 = false;
      } else {
        val.showTip1 = true;
      }
    },
    handleRight(val, index) {
      if (index == this.serviceData.picResourceVOList.length - 1) return false;
      this.imageAct = index + 1;
    },
    handleLeft(val, index) {
      if (index == 0) return false;
      this.imageAct = index - 1;
    },
    handleRight2(val, index) {
      if (index == this.storeInfo.picResourceVOs.length - 1) return false;
      this.imageAct2 = index + 1;
    },
    handleLeft2(val, index) {
      if (index == 0) return false;
      this.imageAct2 = index - 1;
    },
    handleDelete(val, index) {
      this.objectList.splice(index, 1);
    },
    handleAdd() {
      this.objectList.push({
        height: "",
        weight: "",
        ratio: "",
        showTip1: false,
        showTip2: false,
        showTip3: false,
        customObjId: "",
        objNickname: "",
        objNo: "",
        productSkuUid: "",
        sku: "",
        modelHeight: "",
        modelWeight: "",
      });
    },
    handleBack(val = this.step) {
      switch (val) {
        case 2:
          this.customProList.forEach((item, idx) => {
            if (this.detailInfo.cusProductUid == item.productUid) {
              this.customPro = item;
              this.type = idx;
            }
          });
          this.step = 1;
          break;
        case 4:
          this.step = 2;
          break;
        case 5:
          this.step = 4;
          break;
        case 6:
          this.step = 5;
          break;
        case 7:
          this.step = 4;
          break;
        case 8:
          this.step = 4;
          break;
      }
    },
    handleNext(val) {
      switch (val) {
        case 1:
          let params2 = {
            customProductId: this.customProductId,
            productBaseUid: this.customPro.productBaseUid,
            productUid: this.customPro.productUid,
          };
          save(params2).then((respo) => {
            if (respo.data) {
              detail().then((res) => {
                this.customProductId = res.data.customProductId;
                this.detailInfo = res.data;
                this.getProductSkuList();
              });
            }
          });
          this.step = 2;
          break;
        case 2:
          this.objectList.forEach((item) => {
            // if(this.detailInfo.cusProductName == '人物扫描'){
            if (item.height) {
              item.showTip1 = false;
            } else {
              item.showTip1 = true;
            }
            // }
            if (item.weight) {
              item.showTip2 = false;
            } else {
              item.showTip2 = true;
            }
            if (item.sku != "") {
              item.showTip3 = false;
            } else {
              item.showTip3 = true;
            }
          });
          let arr = [];
          if (this.detailInfo.cusProductName == "人物扫描") {
            this.objectList.filter((item) => {
              if (!item.weight) arr.push(item);
              if (!item.height) arr.push(item);
              if (!item.sku) arr.push(item);
            });
          } else {
            this.objectList.filter((item) => {
              if (!item.weight) arr.push(item);
              if (!item.sku) arr.push(item);
            });
          }
          if (arr.length > 0) {
            return false;
          } else {
            let arr3 = [];
            let arr4 = [];
            this.objectList.forEach((item, idx) => {
              let obj = {
                customObjId: item.customObjId,
                customProductId: this.customProductId,
                height: item.height,
                weight: item.weight,
                objNickname: item.objNickname
                  ? item.objNickname
                  : "扫描对象" + (idx + 1),
                objNo: item.objNo ? item.objNo : "objNo" + (idx + 1),
              };
              let obj2 = {
                customObjId: item.customObjId,
                customProductId: this.customProductId,
                productSkuUid: item.sku,
                ratio: item.ratio,
              };
              arr3.push(obj);
              arr4.push(obj2);
            });
            objSave(this.customProductId, { requestBaseList: arr3 }).then(
              (res) => {
                detail().then((resp) => {
                  resp.data.customProductObjVOs.forEach((item, index) => {
                    this.objectList[index].customObjId = item.customObjId;
                  });
                  this.objectList.forEach((item, idx) => {
                    let obj2 = {
                      customObjId: item.customObjId,
                      customProductId: this.customProductId,
                      productSkuUid: item.sku,
                      ratio: item.ratio,
                    };
                    arr4.push(obj2);
                  });
                  objSkuSave(this.customProductId, {
                    requestSkuList: arr4,
                  }).then((res2) => {
                    detail().then((resp2) => {
                      this.detailInfo = resp2.data;
                      this.getServicePage();
                    });
                    this.step = 4;
                  });
                });
              }
            );
          }
          break;
        // case 3:
        //   this.objectList.forEach(item => {
        //     if (item.sku != '') {
        //       item.showTip3 = false
        //     } else {
        //       item.showTip3 = true
        //     }
        //   });
        //   let arr2 = []
        //   this.objectList.filter(item => {
        //     if (!item.sku) arr2.push(item)
        //   })
        //   if (arr2.length > 0) {
        //     return false
        //   } else {
        //     let arr4 = []
        //     this.objectList.forEach(item => {
        //       let obj = {
        //         customObjId: item.customObjId,
        //         customProductId: this.customProductId,
        //         productSkuUid: item.sku,
        //         ratio: item.ratio,
        //       }
        //       arr4.push(obj)
        //     })
        //     objSkuSave(this.customProductId, { requestSkuList: arr4 }).then(res => {
        //       detail().then(resp => {
        //         this.detailInfo = resp.data
        //         this.getServicePage()
        //       })
        //       this.step = 4
        //     })
        //   }
        //   break
        case 4:
          serviceSave(
            this.customProductId,
            this.serviceData.customServiceUid
          ).then((res) => {
            detail().then((resp) => {
              this.detailInfo = resp.data;
              switch (this.serviceData.type) {
                case "normal":
                  this.step = 5;
                  break;
                case "accessory":
                  this.step = 8;
                  break;
                case "combined_scene":
                  this.step = 7;
                  break;
              }
              this.getsServiceProductPage();
            });
          });
          break;
        case 5:
        case 8:
        case 7:
          let arr4 = [];
          this.serviceProductList.forEach((item) => {
            if (item.check) {
              let obj = {
                customServiceSkuUid: item.customServiceSkuUid,
                customServiceUid: item.customServiceUid,
                num: Number(item.productQuantity),
                recProductBaseUid: item.productBaseUid,
                recProductSkuUid: item.productSkuUid,
                recProductUid: item.productUid,
              };
              arr4.push(obj);
            }
          });
          const params3 = {
            requestList: arr4,
          };
          serviceSkuSave(this.customProductId, params3).then((res) => {
            detail().then((resp) => {
              this.detailInfo = resp.data;
              this.getStorePage();
              this.step = 6;
            });
          });
          break;
        case 6:
          if (!this.arrivalTime) {
            this.showTimeTip = true;
            return false;
          }
          if (!this.arrivalDateStr) {
            this.showDateTip = true;
            return false;
          }
          this.showTimeTip = false;
          this.showDateTip = false;
          let params = {
            arrivalDateStr: this.arrivalDateStr,
            arrivalTime: this.arrivalTime,
            storeUid: this.storeInfo.storeUid,
          };
          storeSave(this.customProductId, params).then((res) => {
            detail().then((resp) => {
              this.detailInfo = resp.data;
              this.showStep = false;
            });
          });
          break;
      }
    },
    handleChangeData() {
      if (!this.arrivalDateStr) {
        this.showDateTip = true;
        return false;
      }
      this.showDateTip = false;
    },
    handleChangeTime() {
      if (!this.arrivalTime) {
        this.showTimeTip = true;
        return false;
      }
      this.showTimeTip = false;
    },
    handleChangeType(val, index) {
      this.type = index;
      this.customPro = val;
    },
    handleAddCart() {
      customAdd(this.detailInfo.customProductUid).then((res) => {
        if (res.data) {
          this.$message.success({
            message:
              this.elementContentList.portal_custom_basic_msg1 ||
              this.$t("custom.basic.msg1"),
            duration: 1500,
          });
          this.$store.dispatch("UpdateCartNum");
          this.$router.push("/cart");
        }
      });
    },
    handleBuyNow() {
      customGenerateConfirmOrder(this.detailInfo.customProductUid).then(
        (res) => {
          if (res.code == 200) {
            // this.orderDetail = res.data
            // this.productList = [...res.data.confirmOrderItemList]
            let data = {
              ...res.data,
              customUid: this.detailInfo.customProductUid,
            };
            this.$router.push({
              path: "/settlement",
              query: { from: "nowCustom", params: JSON.stringify(data) },
            });
          }
        }
      );
    },
  },
};
</script>

<style lang="scss">
.basic {
  width: 100%;
  height: 100%;
  padding: 0 40px 80px 40px;
  .confirm_order {
    .con_title {
      font-size: 40px;
      font-weight: 500;
      line-height: 48px;
      color: #1f2126;
      span {
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        color: #f6497f;
        cursor: pointer;
        float: right;
      }
    }
    .cus_info {
      border-radius: 12px;
      background: #f8f9fc;
      padding: 40px;
      margin-top: 95px;
      display: flex;
      font-size: 20px;
      line-height: 28px;
      color: #1f2126;
      p {
        margin: 0 0 40px 0;
      }
      .in_label {
        font-weight: 500;
        margin-right: 80px;
      }
      .in_left {
        width: 50%;
        .in_pro {
          display: flex;
          p {
            margin-bottom: 8px;
          }
          .text2 {
            font-size: 14px;
            font-weight: normal;
            line-height: 22px;
            margin-right: 21px;
          }
        }
      }
      .in_right {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .in_price {
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 12px;
        }
        .in_total {
          font-size: 28px;
          font-weight: 500;
          line-height: 36px;
          margin: 0;
        }
      }
    }
    .con_btns {
      text-align: center;
      margin-top: 32px;
      .btn {
        width: 188px;
        height: 42px;
        border-radius: 999px;
        padding: 10px;
        gap: 10px;
        background: #f6497f;
        border: none;
        color: #fff;
      }
      .btn2 {
        background: #fde1e6;
        color: #f6497f;
      }
    }
  }
  .image_pre {
    .images {
      width: 540px;
      height: 540px;
      border-radius: 12px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        object-fit: contain;
      }
      .arrow_left,
      .arrow_right {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        opacity: 0.8;
        background: #ffffff;
        box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        top: 250px;
        i {
          color: #9a9c9f;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .arrow_left {
        left: 20px;
      }
      .arrow_right {
        right: 20px;
      }
    }
    .image_list {
      display: flex;
      align-items: center;
      overflow-x: hidden;
      height: 70px;
      margin-top: 16px;
      .image_item {
        width: 65px;
        height: 65px;
        border-radius: 4px;
        background: #f7f7f7;
        margin-right: 14px;
        padding: 3px;
        cursor: pointer;
        position: relative;
        img {
          width: 57px;
          height: 57px;
          border-radius: 2px;
          object-fit: contain;
        }
        video {
          width: 57px;
          height: 57px;
          border-radius: 2px;
        }
        .active_border {
          width: 63px;
          height: 63px;
          border-radius: 4px;
          position: absolute;
          top: 0px;
          left: 0px;
        }
        &.active {
          .active_border {
            border: 1px solid #fd527d;
          }
        }
      }
      .image_item:last-child {
        margin: 0;
      }
    }
  }
  .one {
    .title {
      font-size: 30px;
      font-weight: 600;
      line-height: 38px;
      margin-bottom: 104px;
    }
    .types {
      width: 100%;
      margin-top: 103px;
      text-align: center;
      .item {
        text-align: center;
        margin: 0 20px;
        width: 200px;
        p:nth-of-type(1) {
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          margin: 20px 0 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }
        p:nth-of-type(2) {
          color: #646873;
        }
        .image {
          width: 200px;
          height: 200px;
          border-radius: 24px;
          background: #fbf3f4;
          position: relative;
          i {
            font-size: 24px;
            color: #f6497f;
            position: absolute;
            top: 16px;
            right: 16px;
          }
          img {
            width: 100px;
            height: 100px;
          }
          .border {
            width: 200px;
            height: 200px;
            border-radius: 24px;
            position: absolute;
            top: 0;
            left: 0;
            &.active {
              border: 5px solid #f6497f;
              &:hover {
                border: 5px solid #f6497f;
              }
            }
            &:hover {
              border: 5px solid #ff9eb6;
            }
          }
        }
      }
    }
  }
  .two {
    .info {
      width: 100%;
      margin-top: 72px;
      display: flex;
      flex-direction: column;
      .item {
        margin-bottom: 32px;
        .label {
          margin-bottom: 12px;
          span:nth-of-type(1) {
            display: inline-block;
            height: 32px;
            width: fit-content;
            border-radius: 6px;
            padding: 4px 16px;
            background: #fff0f2;
            color: #f6497f;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
          }
          span:nth-of-type(2) {
            display: inline-block;
            height: 32px;
            color: #f6497f;
            font-size: 14px;
            font-weight: 500;
            line-height: 22px;
            cursor: pointer;
          }
        }
        .inputs {
          position: relative;
          height: 104px;
          border-radius: 8px;
          padding: 16px 24px 24px 24px;
          background: #f7f8fb;
          display: flex;
          margin-right: 15px;
          flex: 1;
          .m_r {
            margin-right: 33px;
          }
          .m_r2 {
            margin-right: 16px;
          }
          // i {
          //   cursor: pointer;
          //   color: #f6497f;
          //   position: absolute;
          //   right: -16px;
          // }
          .input {
            display: flex;
            flex-direction: column;
            .text4 {
              margin-bottom: 8px;
            }
            .el-input {
              width: 216px;
            }
            .el-input__inner {
              width: 216px;
              height: 34px;
              border-radius: 999px;
              padding: 6px 16px;
              background: #ffffff;
              border: 1px solid #fff;
            }
            .el-input__inner:focus {
              border: 1px solid #ff5a63;
            }
            .select {
              i {
                line-height: 34px;
              }
              .el-input {
                width: 287px;
                height: 46px;
                border-radius: 999px;
                padding: 12px 24px;
                background: #f2f4f7;
                border: 2px solid #f2f4f7;
              }
              .el-input:hover {
                border: 2px solid #ff9eb6;
              }
              .el-select-dropdown__item.hover,
              .el-select-dropdown__item:hover {
                background: #fff0f2;
                border-radius: 6px;
                height: 34px;
              }
              .el-select-dropdown__item.selected {
                color: #f6497f;
              }
              .el-select-dropdown__list {
                padding: 16px;
              }
              .el-input__inner {
                border: none;
                background: transparent;
                height: 22px;
              }
            }
          }
        }
        .results {
          width: 270px;
          height: 104px;
          border-radius: 8px;
          padding: 24px 16px;
          gap: 64px;
          background: #f7f8fb;
          .no_res {
            color: #acb1bf;
            text-align: center;
          }
          .res {
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 16px;
            img {
              width: 16px;
              margin-right: 4px;
            }
            span:nth-of-type(1) {
              color: #646873;
              margin-right: 20px;
              font-weight: normal;
            }
            span:nth-of-type(2) {
              font-size: 20px;
            }
          }
        }
      }
    }
    .btns {
      width: 100%;
      text-align: left;
    }
    .add_btn {
      width: 78px;
      height: 38px;
      border-radius: 999px;
      padding: 8px 16px;
      gap: 2px;
      background: #fff0f2;
      color: #f6497f;
      border: none;
      float: right;
    }
  }
  .three {
    // padding: 100px 40px 0;
    .three_main {
      margin-top: 100px;
      .right {
        .item {
          margin-bottom: 24px;
          position: relative;
          .label {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            font-variation-settings: "opsz" auto;
            color: #3d3d3d;
            margin-bottom: 16px;
          }
          .select {
            .el-input {
              width: 287px;
              height: 46px;
              border-radius: 999px;
              padding: 12px 24px;
              background: #f2f4f7;
              border: 2px solid #f2f4f7;
            }
            .el-input:hover {
              border: 2px solid #ff9eb6;
            }
            .el-select-dropdown__item.hover,
            .el-select-dropdown__item:hover {
              background: #fff0f2;
              border-radius: 6px;
              height: 34px;
            }
            .el-select-dropdown__item.selected {
              color: #f6497f;
            }
            .el-select-dropdown__list {
              padding: 16px;
            }
            .el-input__inner {
              border: none;
              background: transparent;
              height: 22px;
            }
          }
        }
      }
      .left {
        .left_main {
          position: relative;
          .images {
            width: 450px;
            height: 450px;
            border-radius: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
              object-fit: contain;
            }
          }
          .text {
            margin-top: 12px;
            text-align: center;
          }
          .arrow_left,
          .arrow_right {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            opacity: 0.8;
            background: #ffffff;
            box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            top: 250px;
            i {
              color: #9a9c9f;
              font-size: 20px;
              font-weight: bold;
            }
          }
          .arrow_left {
            left: 20px;
          }
          .arrow_right {
            right: 20px;
          }
        }
      }
    }
  }
  .four_main {
    margin-top: 71px;
    .left {
      .tabs {
        .tab_item {
          width: 181.33px;
          height: 88px;
          border-radius: 12px;
          padding: 17px;
          gap: 8px;
          background: #fff0f2;
          position: relative;
          margin-right: 16px;
          text-align: center;
          p:nth-of-type(1) {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
          }
          p:nth-of-type(2) {
            color: #646873;
            margin-top: 8px;
          }
          .border {
            width: 181.33px;
            height: 88px;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0;
          }
          &.active {
            p {
              color: #f6497f;
            }
            .border {
              border: 3px solid #f6497f;
            }
            &:hover {
              .border {
                border: 3px solid #f6497f;
              }
            }
          }
          &:hover {
            .border {
              border: 3px solid #ff9eb6;
            }
          }
        }
      }
      .style {
        width: 576px;
        height: 428px;
        border-radius: 8px;
        padding: 24px 4px 24px 24px;
        gap: 16px;
        background: #f8f9fc;
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        color: #3d3d3d;
        .style_title {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
        }
        .desc {
          margin-top: 16px;
          flex: 1;
          overflow-y: scroll;
          padding-right: 16px;
        }
      }
    }
    .right {
    }
  }
  .five {
    .five_main {
      height: 626px;
      margin-top: 69px;
      align-items: flex-start;
      .left {
        margin-right: 90px;
      }
      .right {
        display: flex;
        flex-direction: column;
        height: 100%;
        .text3 {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          color: #3d3d3d;
        }
        .pro_list {
          padding-top: 17px;
          flex: 1;
          padding: 12px;
          overflow-y: scroll;
          .pro_item {
            .pro_card {
              width: 366px;
              // height: 142px;
              border-radius: 10px;
              border: 1px solid #dadde5;
              margin-bottom: 16px;
              padding: 12px;
              margin-right: 14px;
              .check {
                margin-right: 12px;
              }
              .img {
                width: 80px;
                height: 80px;
                border-radius: 6px;
                margin-right: 15px;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  border-radius: 6px;
                }
              }
              .pro_info {
                flex: 1;
                display: flex;
                p {
                  color: #646873;
                  margin-bottom: 4px;
                }
                p:nth-of-type(1) {
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
                .qty {
                  font-size: 12px;
                  .el-input {
                    width: 80px;
                    height: 32px;
                    margin-left: 8px;
                  }
                  .el-input__inner {
                    border-radius: 6px;
                    padding: 0px 0px 0px 12px;
                    gap: 12px;
                    background: #ffffff;
                    border: 1px solid #e6e9f0;
                  }
                }
              }
              .price {
                width: 50px;
                color: #f6497f;
                font-weight: 500;
                height: 100%;
                margin-left: 8px;
                text-align: right;
              }
            }
            .btn {
              color: #f6497f;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .six {
    height: 100%;
    .six_main {
      margin-top: 31px;
      display: flex;
      height: 705px;
      .six_left {
        padding-right: 8px;
        margin-right: 24px;
        flex: 1;
        overflow-y: scroll;
        .store_item {
          padding: 16px 24px;
          border-radius: 10px;
          border: 1px solid #dadde5;
          margin-bottom: 16px;
          position: relative;
          .name {
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            span {
              float: right;
              font-size: 14px;
              font-weight: normal;
              line-height: 22px;
            }
            span,
            i {
              color: #f6497f;
            }
            i {
              font-size: 18px;
            }
          }
          .addr {
            margin: 12px 0 10px;
            color: #646873;
            span {
              margin-right: 12px;
            }
          }
          .status {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: #13b976;
          }
          .border {
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 10px;
            top: 0;
            left: 0;
          }
          &.active {
            border-color: transparent;
            .border {
              border: 2px solid #f6497f;
              &:hover {
                border: 2px solid #f6497f;
              }
            }
          }
          &:hover {
            border-color: transparent;
            .border {
              border: 2px solid #ff9eb6;
            }
          }
        }
      }
      .six_right {
        width: 540px;
        .images {
          width: 540px;
          height: 300px;
          .arrow_left {
            top: calc(50% - 20px);
            left: 12px;
          }
          .arrow_right {
            top: calc(50% - 20px);
            right: 12px;
          }
        }
        .introduce {
          width: 540px;
          height: 257px;
          border-radius: 8px;
          padding: 12px 0 12px 16px;
          background: #f8f9fc;
          margin: 12px 0 16px;
          .in_title {
            font-weight: 500;
          }
          .in_detail {
            height: 203px;
            overflow-y: scroll;
            padding-right: 8px;
            color: #646873;
            margin-top: 8px;
          }
        }
        .time {
          margin-top: 15px;
          position: relative;
          .el-input {
            width: 162px;
            margin-left: 12px;
          }
          .el-input__inner {
            width: 162px;
            height: 32px;
            border-radius: 6px;
            border: 1px solid rgba(0, 0, 0, 0.15);
          }
          .el-input__icon {
            line-height: 32px;
          }
          .err_tip {
            position: absolute;
            bottom: -22px;
            font-family: 思源黑体;
            font-size: 12px;
            line-height: 24px;
            color: #ff5a63;
          }
        }
      }
    }
  }
  .seven {
    .five_main {
      height: 708px;
    }
    .pack_tabs {
      margin-right: 24px;
      .tabs_item {
        width: 131px;
        height: 56px;
        border-radius: 8px;
        background: #f8f9fc;
        border: 1px solid #dadde5;
        padding: 16px 0;
        position: relative;
        margin-bottom: 16px;
        .border {
          width: 131px;
          height: 56px;
          border-radius: 8px;
          position: absolute;
          top: 0;
          left: 0;
        }
        &.active {
          background: #fff0f2;
          border-color: transparent;
          .border {
            border: 2px solid #f6497f;
            &:hover {
              border: 2px solid #f6497f;
            }
          }
        }
        &:hover {
          border-color: transparent;
          .border {
            border: 2px solid #ff9eb6;
          }
        }
      }
    }
    .images {
      width: 450px;
      height: 450px;
    }
    .image_list {
      width: 450px;
      overflow-x: scroll;
    }
    .text1 {
      width: 449px;
      height: 158px;
      border-radius: 8px;
      padding: 16px;
      background: #f8f9fc;
      margin-top: 14px;
      overflow-y: scroll;
    }
  }
  .m_t {
    margin-top: 56px;
  }
  .m_t2 {
    margin-top: 45px;
  }
  .back {
    cursor: pointer;
    i {
      color: #f6497f;
      font-size: 24px;
      margin-right: 12px;
    }
    span {
      font-size: 16px;
      line-height: 24px;
      font-variation-settings: "opsz" auto;
      color: #f6497f;
      margin-right: 12px;
    }
  }
  .subtitle {
    font-size: 28px;
    font-weight: 500;
    line-height: 36px;
  }
  .btns {
    text-align: center;
    margin: 80px 0;
    .el-button {
      top: 362px;
      width: 280px;
      height: 40px;
      border-radius: 9999px;
      padding: 0px 16px;
      gap: 8px;
      background: #f6497f;
      border: none;
      color: #fff;
    }
  }
  .tips {
    position: absolute;
    font-family: 思源黑体;
    font-size: 12px;
    line-height: 24px;
    color: #ff5a63;
  }
  .tips2 {
    bottom: 0;
  }
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #f6497f;
  border-color: #f6497f;
}
.el-checkbox__inner:hover,
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #f6497f;
}
.el-checkbox__inner {
  border-radius: 4px;
}
</style>
