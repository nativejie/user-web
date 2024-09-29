import { a as api, V as Vue, b as VueI18n, _ as _default, c as _default$1, l as locale, m as mapGetters, d as VueRouter$1, i as index$g, e as axios, q as queryString, f as elementUi_commonExports, N as NProgress, E as ElementUI, g as VCharts } from "./vendor-AfSMb29r.js";
import "./index-CPF2yMi2.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
const app = {
  state: {
    sidebar: {
      opened: !+api.get("sidebarStatus"),
      withoutAnimation: false
    },
    device: "desktop"
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      if (state.sidebar.opened) {
        api.set("sidebarStatus", 1);
      } else {
        api.set("sidebarStatus", 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      api.set("sidebarStatus", 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    }
  }
};
function login(account, password) {
  return service({
    url: `/sso/login?account=${account}&password=${password}`,
    method: "post"
  });
}
function register$2(data) {
  return service({
    url: `/sso/register?account=${data.account}&authCode=${data.authCode}&nickName=${data.nickName}&password=${data.password}`,
    method: "post"
  });
}
function registerAuthCodeSend(data) {
  return service({
    url: `/sso/register/authCode/send?account=${data}`,
    method: "post"
  });
}
function registerCheckAuthCodeSend(data, code) {
  return service({
    url: `/sso/register/checkAuthCode?account=${data}&authCode=${code}`,
    method: "post"
  });
}
function getInfo() {
  return service({
    url: "/member/info",
    method: "get"
  });
}
function updateInfo(data) {
  return service({
    url: "/member/update/info",
    method: "post",
    data
  });
}
function updateMail(mail, newAuthCode, oldAuthCode) {
  return service({
    url: `/member/update/mail?mail=${mail}&newAuthCode=${newAuthCode}&oldAuthCode=${oldAuthCode}`,
    method: "post"
  });
}
function updateMailAuthCodeSendOld(data) {
  return service({
    url: "/member/updateMail/authCode/sendOld",
    method: "post",
    data
  });
}
function updateMailCheckOldAuthCode(authCode) {
  return service({
    url: `/member/updateMail/checkOldAuthCode?authCode=${authCode}`,
    method: "post"
  });
}
function updateMailAuthCodeSendNew(mail) {
  return service({
    url: `/member/updateMail/authCode/sendNew?mail=${mail}`,
    method: "post"
  });
}
function updateMailCheckNewAuthCode(authCode) {
  return service({
    url: `/member/updateMail/checkNewAuthCode?authCode=${authCode}`,
    method: "post"
  });
}
function updatePassword(authCode, password) {
  return service({
    url: `/member/updatePassword?authCode=${authCode}&password=${password}`,
    method: "post"
  });
}
function updatePasswordAuthCodeSend(data) {
  return service({
    url: "/member/updatePassword/authCode/send",
    method: "post",
    data
  });
}
function addressList() {
  return service({
    url: `/member/address/list`,
    method: "get"
  });
}
function addressInfo(id) {
  return service({
    url: `/member/address/${id}`,
    method: "get"
  });
}
function addAddress(data) {
  return service({
    url: "/member/address/add",
    method: "post",
    data
  });
}
function delleteAddress(id) {
  return service({
    url: `/member/address/delete/${id}`,
    method: "post"
  });
}
function updateAddress(data, id) {
  return service({
    url: `/member/address/update/${id}`,
    method: "post",
    data
  });
}
const TokenKey = "loginToken";
function getToken() {
  return api.get(TokenKey);
}
function setToken(token) {
  return api.set(TokenKey, token);
}
function removeToken() {
  return api.remove(TokenKey);
}
const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    userInfo: {},
    cartNum: 0
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_CARTNUM: (state, num) => {
      state.cartNum = num;
    }
  },
  actions: {
    // 获取购物车数量
    UpdateCartNum({ commit }) {
      return new Promise((resolve, reject) => {
        countCart({ pageNum: 1, pageSize: 1e3 }).then((resp) => {
          commit("SET_CARTNUM", resp.data);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // 登录
    Login({ dispatch, commit }, userInfo) {
      const account = userInfo.account.trim();
      return new Promise((resolve, reject) => {
        login(account, userInfo.password).then((response) => {
          const data = response.data;
          const tokenStr = data.tokenHead + data.token;
          setToken(tokenStr);
          commit("SET_TOKEN", tokenStr);
          dispatch("GetInfo");
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetInfo({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then((response) => {
          sessionStorage.setItem("userInfo", JSON.stringify(response.data));
          commit("SET_USERINFO", response.data);
          resolve();
        }).catch((error) => {
          reject(error);
        });
        dispatch("UpdateCartNum");
      });
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const enGBLocale = {
  navbar: {
    title: "home",
    menu1: "Customized 3D models",
    menu2: "General products",
    menu3: "Cart",
    menu4: "Login",
    text1: "你已有一件定制商品",
    text2: "你可以到购物车查看和修改你的定制商品信息",
    language: {
      en: "英语",
      en_us: "美式英语",
      zh_cn: "简体中文"
    }
  },
  btns: {
    btn1: "Go to cart",
    cancel: "Cancel",
    next: "Next",
    save: "Save",
    confirm: "Confirm",
    edit: "Edit",
    add: "Add",
    addNew: "Add new",
    default: "default",
    remove: "Remove",
    ok: "OK",
    change: "Change",
    review: "Review",
    search: "Search",
    delete: "Delete",
    submit: "Submit"
  },
  home: {
    text1: "Print Your",
    text2: "Magic Moments.",
    text3: "How it works?",
    text4: "Build your own creation",
    text6: "Start",
    text7: "Shop",
    title: "Best selling accessories",
    btns: {
      btn1: "Customize Now!"
    }
  },
  login: {
    title: "Get started.",
    title2: "Forgot password",
    text1: "Don't have an account?",
    text2: "Sign up",
    text3: "Remember me",
    text4: "Forgot your password?",
    text5: "Sign in",
    text6: "Send code",
    text7: "Send again",
    text8: "Reset password",
    text9: "Login in",
    text10: "I agree with XXX's ",
    text11: "Terms of Service",
    text12: "Privacy Policy",
    text13: "Already have an account?",
    text14: "请阅读并同意协议",
    form: {
      label1: "Email",
      label2: "Password",
      label3: "Verification Code",
      label4: "Set new password",
      label5: "Enter your password again",
      label6: "User name",
      label7: "Set password",
      placeholder1: "Enter Email Adress",
      placeholder2: "Enter password",
      placeholder3: "Enter code",
      placeholder4: "8+ characters",
      placeholder5: "Enter the same password",
      placeholder6: "Enter User name",
      validate1: "Please enter email",
      validate2: "Incorrect Email Address",
      validate3: "Please enter password",
      validate4: "Password is too short (minimum is 8 characters)",
      validate5: "Please enter verification code",
      validate6: "Please enter user name",
      validate7: "Maximum is 20 characters",
      validate8: "Please enter password again",
      validate9: "Password do not match"
    },
    msg1: "Password reset success",
    msg2: "Invalid verification code",
    msg3: "Sign up success",
    msg4: "Invalid verification code",
    msg5: "你还未登录，可以取消继续留在该页面，或者重新登录",
    msg6: "确定登出",
    msg7: "重新登录",
    privacy: "",
    terms: ""
  },
  cart: {
    text1: "Shopping cart",
    text2: "Style",
    text3: "Color",
    text4: "Qty",
    text7: "Subtotal",
    text8: "items",
    text9: "US $",
    text10: "Go to checkout",
    text11: "配件商品信息",
    msg1: "Delete successful",
    msg2: "Confirm removal",
    msg3: "It cannot be restored after being removed",
    msg4: "Edit successful"
  },
  router: {
    baseInfo: "Personal info",
    order: "Oders",
    addresses: "Addresses",
    payments: "Payments"
  },
  baseInfo: {
    text1: "Email",
    text2: "Phone number",
    text3: "Not filled",
    text4: "Password",
    text5: "Birthday",
    text6: "Edit name",
    text7: "Edit birthday",
    text8: "Edit phone number",
    text9: "Please verify your Email first",
    text10: "We will send a One Time Password (OTP) to your current Email.",
    text11: "Continue",
    text12: "Enter new email",
    text13: "Set new password",
    placeholder1: "Enter code",
    placeholder2: "Enter new email",
    placeholder3: "Enter code",
    placeholder4: "Enter new password",
    placeholder5: "Enter new password again"
  },
  general: {
    title: "Feel free to choose your favorite accessories！",
    loading: "搜索中…"
  },
  custom: {
    header: {
      confirmTitle: "操作确认",
      backTips: "返回上一步将清除已填写信息，确认返回吗？"
    },
    basic: {
      title1: "Let's start customize your own unique 3D model！",
      title2: "你希望扫描何种类型？",
      title3: "选择扫描类型",
      title4: "请输入扫描对象的信息，我们将为你提供更精确的服务",
      title5: "设置身高体重",
      title6: "请设置你需要定制的比例参数",
      label1: "人物扫描",
      label2: "宠物扫描",
      label3: "为人物制作模型",
      label4: "为宠物制作模型",
      label5: "扫描对象",
      label6: "扫描对象2",
      label7: "扫描对象3",
      label8: "扫描对象4",
      label9: "为人物制作模型",
      label10: "为宠物制作模型",
      label11: "上一步",
      label12: "Height",
      label13: "Weight",
      label14: "比例效果示意图",
      label15: "专属定制模型",
      label16: "比例",
      label17: "请输入完整信息后在此查看预估的模型高度和重量",
      label18: "Estimate height",
      label19: "Estimate weight",
      label20: "Arrival date not be blank",
      label21: "Arrival time not be blank",
      placeholder1: "Input your height",
      placeholder2: "Input your weight",
      placeholder3: "Please select print scale",
      msg1: "Add to cart succuss",
      tip1: "Please input your height",
      tip2: "Please input your weight",
      tip3: "Please select print scale",
      step4: {
        title: "请选择你需要的成品造型风格",
        label1: "选择打印比例",
        label2: "独立摆件",
        label3: "仅需要单个模型摆件",
        label4: "场景组合",
        label5: "精选的套餐搭配",
        label6: "功能配件",
        label7: "后续补充说明文案",
        label8: "造型风格介绍"
      },
      step5: {
        label1: "你已选择",
        label2: "独立摆件",
        label3: "搭配它们更好用",
        label4: "修改",
        label5: "选择成品造型",
        label6: "功能配件"
      },
      productInfo: {
        title: "修改商品"
      },
      step6: {
        title: "为你找到了附近可预约门店",
        label1: "选择成品造型",
        label2: "个性化服务",
        label3: "门店介绍",
        label4: "请选择到店时间",
        label5: "到店日期",
        label6: "到店时间",
        status1: "可预约",
        status2: "已打烊",
        btn: "Confirm appointment",
        placeholder1: "Select date",
        placeholder2: "Select time"
      },
      step7: {
        label1: "场景组合",
        label2: "该场景套餐包含的商品",
        label3: "Qty"
      },
      step8: {
        label1: "功能配件"
      },
      confirm: {
        label1: "请确认你的定制配置",
        label2: "扫描类型",
        label3: "身高体重",
        label4: "制作比例",
        label5: "造型风格",
        label6: "产品配件",
        label7: "预约门店",
        label8: "预约日期",
        label9: "定制款项: ",
        label10: "配件款项: ",
        label11: "合计: ",
        label12: "Buy now",
        label13: "Add to cart"
      }
    }
  },
  settlement: {
    title1: "Choose shipping method",
    title2: "Choose a payment method",
    title3: "Review & submit order",
    title4: "选择配送方式",
    title5: "选择送货地址",
    btns: {
      btn1: "Use this address",
      btn2: "Use this payment method",
      btn3: "Place your order",
      btn4: "Order detail"
    },
    text1: "送货上门",
    text2: "模型打印完成后，我们将为您配送到制定地址",
    text3: "到门店取货",
    text4: "模型打印完成后，我们将配送至扫描门店，您可以自行到门店取货",
    text5: "paypal",
    text6: "Items：",
    text7: "Shipping：",
    text8: "Order Total",
    text9: "支付失败，请前往我的订单完成支付",
    text10: "Order placed, thanks!",
    text11: "Shipping to",
    text12: "定制商品",
    text13: "普通商品",
    text14: "请选择配送方式",
    text15: "Select",
    text16: "你已选择：至门店取货",
    msg1: "success"
  },
  order: {
    title1: "My Orders",
    tabs: {
      tab1: "Orders",
      tab2: "Wait for payment",
      tab3: "Not Yet Shipped",
      tab4: "Shipped",
      tab5: "Completed",
      tab6: "Cancelled"
    },
    text1: "我的订单",
    text2: "待售后服务的商品",
    text3: "请选择售后服务类型",
    text4: "仅退款",
    text5: "未收到货，申请仅退款",
    text6: "退货退款",
    text7: "已收到货，需要退换收到的货物并退款",
    text8: "换货",
    text9: "已收到货，需要更换商品规格",
    text10: "补件",
    text11: "商品漏发或破损，需要补件",
    text12: "最多5张",
    text13: "最多输入£",
    text14: "选择商品规格",
    text15: "ORDER DATE",
    text16: "ORDER NUMBER",
    text17: "TOTAL",
    text18: "Order Details",
    text19: "Order date",
    text20: "Order number",
    text21: "Order status",
    text22: "Shipping Address",
    text23: "Payment Method",
    text24: "Order Summary",
    text25: "Item subtotal：",
    text26: "Shipping：",
    text27: "Sales tax：",
    text28: "Order Total：",
    text29: "如未打开支付页面，请复制以下链接完成支付",
    text30: "查看支付结果",
    text31: "订单生成中...",
    text32: "A maximum of 5 images can be uploaded",
    text33: "Quantity",
    text34: "定制商品",
    text35: "普通商品",
    text36: "您已选择：到店自取",
    text37: "Outstanding",
    msg1: "Cancel successful",
    msg2: "Receiving successful",
    msg3: "Delete successful",
    msg4: "Operation successful",
    msg5: "operation failed",
    status: {
      status1: "发起售后申请",
      status2: "商家处理申请",
      status3: "买家退回商品",
      status4: "商家完成发货",
      status5_1: "完成退款",
      status5_2: "完成退货",
      status5_3: "完成换货",
      status5_4: "完成补件",
      status6: "商家拒绝售后申请",
      status7: "买家撤回售后申请",
      status8: "买家退回商品超时"
    },
    orderStatus: {
      status1: "待付款",
      status2: "待发货",
      status3: "已发货",
      status4: "已完成",
      status5: "已关闭",
      status6: "无效订单",
      status7: "等待扫描",
      status8: "等待确认",
      status9: "等待打印",
      status10: "售后中"
    },
    steps: {
      step1: "提交订单",
      step2: "支付订单",
      step3: "完成扫描",
      step4: "确认打印",
      step5: "完成发货",
      step6: "确认收货",
      step7: "取消支付"
    },
    form: {
      label1: "售后商品",
      label2: "售后类型",
      label3: "退款原因",
      label4: "退款金额",
      label5: "退款说明",
      label6: "上传图片",
      label7: "退货原因",
      label8: "退货说明",
      label9: "换货原因",
      label10: "换货说明",
      label11: "换货商品",
      label12: "补件原因",
      label13: "补件说明",
      placeholder1: "请输入退款说明",
      placeholder2: "选择退货原因",
      tip1: "请选择退款原因",
      tip2: "超过可退款的最大金额，请重新输入",
      tip3: "退款金额不能为空"
    },
    select: {
      op1: "不想要此商品",
      op2: "买错商品",
      op3: "快递一直未送到",
      op4: "不喜欢此商品",
      op5: "商品与描述不符",
      op6: "商家发错商品",
      op7: "商家发错商品",
      op8: "买错商品规格",
      op9: "收到商品破损或变形",
      op10: "商家少发商品"
    },
    btns: {
      btn1: "After service",
      btn2: "查看申请",
      btn3: "撤销申请",
      btn4: "Confirm receipt",
      btn5: "Pay Now",
      btn6: "Accept",
      btn7: "Decline"
    },
    success: {
      text1: "成功提交售后申请",
      text2: "请耐心等待商家处理申请，你可以在我的订单查看售后状态"
    },
    box: {
      text1: "确认撤销售后申请？",
      text2: "确认后将关闭本次售后服务，且无法再次对该商品发起售后申请",
      text3: "确定接受打印吗？",
      text4: "确定后我们将尽快完成您的扫描文件打印。由于定制商品无法二次销售，因此确认后将无法退款",
      text5: "确定拒绝打印吗？",
      text6: "拒绝后将放弃本次定制商品，您可以随时重新开始新的定制"
    }
  },
  pay: {
    title: "请选择支付方式",
    text1: "My Payments",
    text2: "Add payment method",
    text3: "Add a credit or debit card",
    text4: "We accept these credit and debit cards:",
    text5: "Card number",
    text6: "Name on card",
    text7: "Expiration date",
    text8: "Security code (CVV/CVC)",
    text9: "Add my card",
    msg1: "Name on card is required",
    msg2: "Card number is required",
    msg3: "Security code is required"
  },
  address: {
    text1: "My Addresses",
    text2: "Name",
    text3: "Country",
    text4: "Adress",
    text5: "ZIP Code",
    text6: "Phone number",
    text7: "No address yet",
    text8: "Add address",
    text9: "Add a new address",
    text10: "Edit address",
    text11: "Country/Region",
    text12: "Full name（First anme and surname）",
    text13: "Phone number",
    text14: "Postcode",
    text15: "Address Line 1 (or Company Name)",
    text16: "Address Line 2 (optional)",
    text17: "Town/City",
    text18: "County (if applicable)",
    text19: "Save as my default address",
    text20: "Edit adress",
    text21: "Please enter a name",
    text22: "Please enter a phone number so we can call if there are any issues with delivery",
    text23: "Please enter a ZIP or postal code",
    text24: "Please enter an address",
    text25: "Please enter a city name",
    text26: "Confirm removalc",
    text27: "It cannot be restored after being deleted",
    text28: "success"
  },
  product: {
    text1: "Stock",
    text2: "Quantity",
    text3: "About this product",
    text4: "Product Description",
    text5: "Recommend for you",
    text6: "Add successful!",
    btns: {
      btn1: "Buy Now",
      btn2: "Add to Cart"
    }
  },
  foot: {
    text1: "Terms",
    text2: "Privacy Policy"
  }
};
const enUSLocale = {
  navbar: {
    title: "home",
    menu1: "Customized 3D models",
    menu2: "General products",
    menu3: "Cart",
    menu4: "Login",
    text1: "你已有一件定制商品",
    text2: "你可以到购物车查看和修改你的定制商品信息",
    language: {
      en: "英语",
      en_us: "美式英语",
      zh_cn: "简体中文"
    }
  },
  btns: {
    btn1: "Go to cart",
    cancel: "Cancel",
    next: "Next",
    save: "Save",
    confirm: "Confirm",
    edit: "Edit",
    add: "Add",
    addNew: "Add new",
    default: "default",
    remove: "Remove",
    ok: "OK",
    change: "Change",
    review: "Review",
    search: "Search"
  },
  home: {
    text1: "Print Your",
    text2: "Magic Moments.",
    text3: "How it works?",
    text4: "Build your own creation",
    text6: "Start",
    text7: "Shop",
    title: "Best selling accessories",
    btns: {
      btn1: "Customize Now!"
    }
  },
  login: {
    title: "Get started.",
    title2: "Forgot password",
    text1: "Don't have an account?",
    text2: "Sign up",
    text3: "Remember me",
    text4: "Forgot your password?",
    text5: "Sign in",
    text6: "Send code",
    text7: "Send again",
    text8: "Reset password",
    text9: "Login in",
    text10: "I agree with XXX's ",
    text11: "Terms of Service",
    text12: "Privacy Policy",
    text13: "Already have an account?",
    text14: "请阅读并同意协议",
    form: {
      label1: "Email",
      label2: "Password",
      label3: "Verification Code",
      label4: "Set new password",
      label5: "Enter your password again",
      label6: "User name",
      label7: "Set password",
      placeholder1: "Enter Email Adress",
      placeholder2: "Enter password",
      placeholder3: "Enter code",
      placeholder4: "8+ characters",
      placeholder5: "Enter the same password",
      placeholder6: "Enter User name",
      validate1: "Please enter email",
      validate2: "Incorrect Email Address",
      validate3: "Please enter password",
      validate4: "Password is too short (minimum is 8 characters)",
      validate5: "Please enter verification code",
      validate6: "Please enter user name",
      validate7: "Maximum is 20 characters",
      validate8: "Please enter password again",
      validate9: "Password do not match"
    },
    msg1: "Password reset success",
    msg2: "Invalid verification code",
    msg3: "Sign up success",
    msg4: "Invalid verification code",
    msg5: "你还未登录，可以取消继续留在该页面，或者重新登录",
    msg6: "确定登出",
    msg7: "重新登录"
  },
  cart: {
    text1: "Shopping cart",
    text2: "Style",
    text3: "Color",
    text4: "Qty",
    text7: "Subtotal",
    text8: "items",
    text9: "US $",
    text10: "Go to checkout",
    msg1: "Delete successful"
  },
  router: {
    baseInfo: "Personal info",
    order: "Oders",
    addresses: "Addresses",
    payments: "Payments"
  },
  baseInfo: {
    text1: "Email",
    text2: "Phone number",
    text3: "Not filled",
    text4: "Password",
    text5: "Birthday",
    text6: "Edit name",
    text7: "Edit birthday",
    text8: "Edit phone number",
    text9: "Please verify your Email first",
    text10: "We will send a One Time Password (OTP) to your current Email.",
    text11: "Continue",
    text12: "Enter new email",
    text13: "Set new password",
    placeholder1: "Enter code",
    placeholder2: "Enter new email",
    placeholder3: "Enter code",
    placeholder4: "Enter new password",
    placeholder5: "Enter new password again"
  },
  general: {
    title: "Feel free to choose your favorite accessories！",
    loading: "搜索中…"
  },
  custom: {
    header: {
      confirmTitle: "操作确认",
      backTips: "返回上一步将清除已填写信息，确认返回吗？"
    },
    basic: {
      title1: "Let's start customize your own unique 3D model！",
      title2: "你希望扫描何种类型？",
      title3: "选择扫描类型",
      title4: "请输入扫描对象的信息，我们将为你提供更精确的服务",
      title5: "设置身高体重",
      title6: "请设置你需要定制的比例参数",
      label1: "人物扫描",
      label2: "宠物扫描",
      label3: "为人物制作模型",
      label4: "为宠物制作模型",
      label5: "扫描对象",
      label6: "扫描对象2",
      label7: "扫描对象3",
      label8: "扫描对象4",
      label9: "为人物制作模型",
      label10: "为宠物制作模型",
      label11: "上一步",
      label12: "Height",
      label13: "Weight",
      label14: "比例效果示意图",
      label15: "专属定制模型",
      placeholder1: "Input your height",
      placeholder2: "Input your weight",
      placeholder3: "Please select print scale",
      msg1: "Add to cart succuss",
      tip1: "Please input your height",
      tip2: "Please input your weight",
      tip3: "Please select print scale",
      step4: {
        title: "请选择你需要的成品造型风格",
        label1: "选择打印比例",
        label2: "独立摆件",
        label3: "仅需要单个模型摆件",
        label4: "场景组合",
        label5: "精选的套餐搭配",
        label6: "功能配件",
        label7: "后续补充说明文案",
        label8: "造型风格介绍"
      },
      step5: {
        label1: "你已选择",
        label2: "独立摆件",
        label3: "搭配它们更好用",
        label4: "修改",
        label5: "选择成品造型",
        label6: "功能配件"
      },
      productInfo: {
        title: "修改商品"
      },
      step6: {
        title: "为你找到了附近可预约门店",
        label1: "选择成品造型",
        label2: "个性化服务",
        label3: "门店介绍",
        label4: "请选择到店时间",
        label5: "到店日期",
        label6: "到店时间",
        status1: "可预约",
        status2: "已打烊",
        btn: "Confirm appointment",
        placeholder1: "Select date",
        placeholder2: "Select time"
      },
      step7: {
        label1: "场景组合",
        label2: "该场景套餐包含的商品",
        label3: "Qty"
      },
      step8: {
        label1: "功能配件"
      },
      confirm: {
        label1: "请确认你的定制配置",
        label2: "扫描类型",
        label3: "身高体重",
        label4: "制作比例",
        label5: "造型风格",
        label6: "产品配件",
        label7: "预约门店",
        label8: "预约日期",
        label9: "定制款项: ",
        label10: "配件款项: ",
        label11: "合计: ",
        label12: "Buy now",
        label13: "Add to cart"
      }
    }
  },
  settlement: {
    title1: "Choose shipping method",
    title2: "Choose a payment method",
    title3: "Review & submit order",
    btns: {
      btn1: "Use this address",
      btn2: "Use this payment method",
      btn3: "Place your order",
      btn4: "Order detail"
    },
    text1: "送货上门",
    text2: "模型打印完成后，我们将为您配送到制定地址",
    text3: "到门店取货",
    text4: "模型打印完成后，我们将配送至扫描门店，您可以自行到门店取货",
    text5: "paypal",
    text6: "Items：",
    text7: "Shipping：",
    text8: "Order Total",
    text9: "支付失败，请前往我的订单完成支付",
    text10: "Order placed, thanks!",
    text11: "Shipping to",
    msg1: "success"
  },
  order: {
    title1: "My Orders",
    tabs: {
      tab1: "Orders",
      tab2: "Wait for payment",
      tab3: "Not Yet Shipped",
      tab4: "Shipped",
      tab5: "Completed",
      tab6: "Cancelled"
    },
    text1: "我的订单",
    text2: "待售后服务的商品",
    text3: "请选择售后服务类型",
    text4: "仅退款",
    text5: "未收到货，申请仅退款",
    text6: "退货退款",
    text7: "已收到货，需要退换收到的货物并退款",
    text8: "换货",
    text9: "已收到货，需要更换商品规格",
    text10: "补件",
    text11: "商品漏发或破损，需要补件",
    text12: "最多5张",
    text13: "最多输入£",
    text14: "选择商品规格",
    text15: "ORDER DATE",
    text16: "ORDER NUMBER",
    text17: "TOTAL",
    text18: "Order Details",
    text19: "Order date",
    text20: "Order number",
    text21: "Order status",
    text22: "Shipping Address",
    text23: "Payment Method",
    text24: "Order Summary",
    text25: "Item subtotal：",
    text26: "Shipping：",
    text27: "Sales tax：",
    text28: "Order Total：",
    text29: "如未打开支付页面，请复制以下链接完成支付",
    text30: "查看支付结果",
    text31: "订单生成中...",
    text32: "A maximum of 5 images can be uploaded",
    text33: "Quantity",
    msg1: "Cancel successful",
    msg2: "Receiving successful",
    msg3: "Delete successful",
    status: {
      status1: "发起售后申请",
      status2: "商家处理申请",
      status3: "买家退回商品",
      status4: "商家完成发货",
      status5_1: "完成退款",
      status5_2: "完成退货",
      status5_3: "完成换货",
      status5_4: "完成补件",
      status6: "商家拒绝售后申请",
      status7: "买家撤回售后申请",
      status8: "买家退回商品超时"
    },
    orderStatus: {
      status1: "待付款",
      status2: "待发货",
      status3: "已发货",
      status4: "已完成",
      status5: "已关闭",
      status6: "无效订单"
    },
    steps: {
      step1: "提交订单",
      step2: "支付订单",
      step3: "完成扫描",
      step4: "确认打印",
      step5: "完成发货",
      step6: "确认收货",
      step7: "取消支付"
    },
    form: {
      label1: "售后商品",
      label2: "售后类型",
      label3: "退款原因",
      label4: "退款金额",
      label5: "退款说明",
      label6: "上传图片",
      label7: "退货原因",
      label8: "退货说明",
      label9: "换货原因",
      label10: "换货说明",
      label11: "换货商品",
      label12: "补件原因",
      label13: "补件说明",
      placeholder1: "请输入退款说明",
      placeholder2: "选择退货原因",
      tip1: "请选择退款原因",
      tip2: "超过可退款的最大金额，请重新输入",
      tip3: "退款金额不能为空"
    },
    select: {
      op1: "不想要此商品",
      op2: "买错商品",
      op3: "快递一直未送到",
      op4: "不喜欢此商品",
      op5: "商品与描述不符",
      op6: "商家发错商品",
      op7: "商家发错商品",
      op8: "买错商品规格",
      op9: "收到商品破损或变形",
      op10: "商家少发商品"
    },
    btns: {
      btn1: "After service",
      btn2: "查看申请",
      btn3: "撤销申请",
      btn4: "Confirm receipt",
      btn5: "Payment",
      btn6: "选择商品",
      btn7: "选择商品"
    },
    success: {
      text1: "成功提交售后申请",
      text2: "请耐心等待商家处理申请，你可以在我的订单查看售后状态"
    },
    box: {
      text1: "确认撤销售后申请？",
      text2: "确认后将关闭本次售后服务，且无法再次对该商品发起售后申请"
    }
  },
  pay: {
    title: "请选择支付方式",
    text1: "My Payments",
    text2: "Add payment method",
    text3: "Add a credit or debit card",
    text4: "We accept these credit and debit cards:",
    text5: "Card number",
    text6: "Name on card",
    text7: "Expiration date",
    text8: "Security code (CVV/CVC)",
    text9: "Add my card",
    msg1: "Name on card is required",
    msg2: "Card number is required",
    msg3: "Security code is required"
  },
  address: {
    text1: "My Addresses",
    text2: "Name",
    text3: "Country",
    text4: "Adress",
    text5: "ZIP Code",
    text6: "Phone number",
    text7: "No address yet",
    text8: "Add address",
    text9: "Add a new address",
    text10: "Edit address",
    text11: "Country/Region",
    text12: "Full name（First anme and surname）",
    text13: "Phone number",
    text14: "Postcode",
    text15: "Address Line 1 (or Company Name)",
    text16: "Address Line 2 (optional)",
    text17: "Town/City",
    text18: "County (if applicable)",
    text19: "Save as my default address",
    text20: "Edit adress",
    text21: "Please enter a name",
    text22: "Please enter a phone number so we can call if there are any issues with delivery",
    text23: "Please enter a ZIP or postal code",
    text24: "Please enter an address",
    text25: "Please enter a city name",
    text26: "Confirm removalc",
    text27: "It cannot be restored after being deleted",
    text28: "success"
  },
  product: {
    text1: "Stock",
    text2: "Quantity",
    text3: "About this product",
    text4: "Product Description",
    text5: "Recommend for you",
    text6: "Add successful!",
    btns: {
      btn1: "Buy Now",
      btn2: "Add to Cart"
    }
  }
};
const zhCNLocale = {
  navbar: {
    title: "home",
    menu1: "Customized 3D models",
    menu2: "General products",
    menu3: "Cart",
    menu4: "Login",
    text1: "你已有一件定制商品",
    text2: "你可以到购物车查看和修改你的定制商品信息",
    language: {
      en: "英语",
      en_us: "美式英语",
      zh_cn: "简体中文"
    }
  },
  btns: {
    btn1: "Go to cart",
    cancel: "Cancel",
    next: "Next",
    save: "Save",
    confirm: "Confirm",
    edit: "Edit",
    add: "Add",
    addNew: "Add new",
    default: "default",
    remove: "Remove",
    ok: "OK",
    change: "Change",
    review: "Review",
    search: "Search"
  },
  home: {
    text1: "Print Your",
    text2: "Magic Moments.",
    text3: "How it works?",
    text4: "Build your own creation",
    text6: "Start",
    text7: "Shop",
    title: "Best selling accessories",
    btns: {
      btn1: "Customize Now!"
    }
  },
  login: {
    title: "Get started.",
    title2: "Forgot password",
    text1: "Don't have an account?",
    text2: "Sign up",
    text3: "Remember me",
    text4: "Forgot your password?",
    text5: "Sign in",
    text6: "Send code",
    text7: "Send again",
    text8: "Reset password",
    text9: "Login in",
    text10: "I agree with XXX's ",
    text11: "Terms of Service",
    text12: "Privacy Policy",
    text13: "Already have an account?",
    text14: "请阅读并同意协议",
    form: {
      label1: "Email",
      label2: "Password",
      label3: "Verification Code",
      label4: "Set new password",
      label5: "Enter your password again",
      label6: "User name",
      label7: "Set password",
      placeholder1: "Enter Email Adress",
      placeholder2: "Enter password",
      placeholder3: "Enter code",
      placeholder4: "8+ characters",
      placeholder5: "Enter the same password",
      placeholder6: "Enter User name",
      validate1: "Please enter email",
      validate2: "Incorrect Email Address",
      validate3: "Please enter password",
      validate4: "Password is too short (minimum is 8 characters)",
      validate5: "Please enter verification code",
      validate6: "Please enter user name",
      validate7: "Maximum is 20 characters",
      validate8: "Please enter password again",
      validate9: "Password do not match"
    },
    msg1: "Password reset success",
    msg2: "Invalid verification code",
    msg3: "Sign up success",
    msg4: "Invalid verification code",
    msg5: "你还未登录，可以取消继续留在该页面，或者重新登录",
    msg6: "确定登出",
    msg7: "重新登录"
  },
  cart: {
    text1: "Shopping cart",
    text2: "Style",
    text3: "Color",
    text4: "Qty",
    text7: "Subtotal",
    text8: "items",
    text9: "US $",
    text10: "Go to checkout",
    msg1: "Delete successful"
  },
  router: {
    baseInfo: "Personal info",
    order: "Oders",
    addresses: "Addresses",
    payments: "Payments"
  },
  baseInfo: {
    text1: "Email",
    text2: "Phone number",
    text3: "Not filled",
    text4: "Password",
    text5: "Birthday",
    text6: "Edit name",
    text7: "Edit birthday",
    text8: "Edit phone number",
    text9: "Please verify your Email first",
    text10: "We will send a One Time Password (OTP) to your current Email.",
    text11: "Continue",
    text12: "Enter new email",
    text13: "Set new password",
    placeholder1: "Enter code",
    placeholder2: "Enter new email",
    placeholder3: "Enter code",
    placeholder4: "Enter new password",
    placeholder5: "Enter new password again"
  },
  general: {
    title: "Feel free to choose your favorite accessories！",
    loading: "搜索中…"
  },
  custom: {
    header: {
      confirmTitle: "操作确认",
      backTips: "返回上一步将清除已填写信息，确认返回吗？"
    },
    basic: {
      title1: "Let's start customize your own unique 3D model！",
      title2: "你希望扫描何种类型？",
      title3: "选择扫描类型",
      title4: "请输入扫描对象的信息，我们将为你提供更精确的服务",
      title5: "设置身高体重",
      title6: "请设置你需要定制的比例参数",
      label1: "人物扫描",
      label2: "宠物扫描",
      label3: "为人物制作模型",
      label4: "为宠物制作模型",
      label5: "扫描对象",
      label6: "扫描对象2",
      label7: "扫描对象3",
      label8: "扫描对象4",
      label9: "为人物制作模型",
      label10: "为宠物制作模型",
      label11: "上一步",
      label12: "Height",
      label13: "Weight",
      label14: "比例效果示意图",
      label15: "专属定制模型",
      placeholder1: "Input your height",
      placeholder2: "Input your weight",
      placeholder3: "Please select print scale",
      msg1: "Add to cart succuss",
      tip1: "Please input your height",
      tip2: "Please input your weight",
      tip3: "Please select print scale",
      step4: {
        title: "请选择你需要的成品造型风格",
        label1: "选择打印比例",
        label2: "独立摆件",
        label3: "仅需要单个模型摆件",
        label4: "场景组合",
        label5: "精选的套餐搭配",
        label6: "功能配件",
        label7: "后续补充说明文案",
        label8: "造型风格介绍"
      },
      step5: {
        label1: "你已选择",
        label2: "独立摆件",
        label3: "搭配它们更好用",
        label4: "修改",
        label5: "选择成品造型",
        label6: "功能配件"
      },
      productInfo: {
        title: "修改商品"
      },
      step6: {
        title: "为你找到了附近可预约门店",
        label1: "选择成品造型",
        label2: "个性化服务",
        label3: "门店介绍",
        label4: "请选择到店时间",
        label5: "到店日期",
        label6: "到店时间",
        status1: "可预约",
        status2: "已打烊",
        btn: "Confirm appointment",
        placeholder1: "Select date",
        placeholder2: "Select time"
      },
      step7: {
        label1: "场景组合",
        label2: "该场景套餐包含的商品",
        label3: "Qty"
      },
      step8: {
        label1: "功能配件"
      },
      confirm: {
        label1: "请确认你的定制配置",
        label2: "扫描类型",
        label3: "身高体重",
        label4: "制作比例",
        label5: "造型风格",
        label6: "产品配件",
        label7: "预约门店",
        label8: "预约日期",
        label9: "定制款项: ",
        label10: "配件款项: ",
        label11: "合计: ",
        label12: "Buy now",
        label13: "Add to cart"
      }
    }
  },
  settlement: {
    title1: "Choose shipping method",
    title2: "Choose a payment method",
    title3: "Review & submit order",
    btns: {
      btn1: "Use this address",
      btn2: "Use this payment method",
      btn3: "Place your order",
      btn4: "Order detail"
    },
    text1: "送货上门",
    text2: "模型打印完成后，我们将为您配送到制定地址",
    text3: "到门店取货",
    text4: "模型打印完成后，我们将配送至扫描门店，您可以自行到门店取货",
    text5: "paypal",
    text6: "Items：",
    text7: "Shipping：",
    text8: "Order Total",
    text9: "支付失败，请前往我的订单完成支付",
    text10: "Order placed, thanks!",
    text11: "Shipping to",
    msg1: "success"
  },
  order: {
    title1: "My Orders",
    tabs: {
      tab1: "Orders",
      tab2: "Wait for payment",
      tab3: "Not Yet Shipped",
      tab4: "Shipped",
      tab5: "Completed",
      tab6: "Cancelled"
    },
    text1: "我的订单",
    text2: "待售后服务的商品",
    text3: "请选择售后服务类型",
    text4: "仅退款",
    text5: "未收到货，申请仅退款",
    text6: "退货退款",
    text7: "已收到货，需要退换收到的货物并退款",
    text8: "换货",
    text9: "已收到货，需要更换商品规格",
    text10: "补件",
    text11: "商品漏发或破损，需要补件",
    text12: "最多5张",
    text13: "最多输入£",
    text14: "选择商品规格",
    text15: "ORDER DATE",
    text16: "ORDER NUMBER",
    text17: "TOTAL",
    text18: "Order Details",
    text19: "Order date",
    text20: "Order number",
    text21: "Order status",
    text22: "Shipping Address",
    text23: "Payment Method",
    text24: "Order Summary",
    text25: "Item subtotal：",
    text26: "Shipping：",
    text27: "Sales tax：",
    text28: "Order Total：",
    text29: "如未打开支付页面，请复制以下链接完成支付",
    text30: "查看支付结果",
    text31: "订单生成中...",
    text32: "A maximum of 5 images can be uploaded",
    text33: "Quantity",
    msg1: "Cancel successful",
    msg2: "Receiving successful",
    msg3: "Delete successful",
    status: {
      status1: "发起售后申请",
      status2: "商家处理申请",
      status3: "买家退回商品",
      status4: "商家完成发货",
      status5_1: "完成退款",
      status5_2: "完成退货",
      status5_3: "完成换货",
      status5_4: "完成补件",
      status6: "商家拒绝售后申请",
      status7: "买家撤回售后申请",
      status8: "买家退回商品超时"
    },
    orderStatus: {
      status1: "待付款",
      status2: "待发货",
      status3: "已发货",
      status4: "已完成",
      status5: "已关闭",
      status6: "无效订单"
    },
    steps: {
      step1: "提交订单",
      step2: "支付订单",
      step3: "完成扫描",
      step4: "确认打印",
      step5: "完成发货",
      step6: "确认收货",
      step7: "取消支付"
    },
    form: {
      label1: "售后商品",
      label2: "售后类型",
      label3: "退款原因",
      label4: "退款金额",
      label5: "退款说明",
      label6: "上传图片",
      label7: "退货原因",
      label8: "退货说明",
      label9: "换货原因",
      label10: "换货说明",
      label11: "换货商品",
      label12: "补件原因",
      label13: "补件说明",
      placeholder1: "请输入退款说明",
      placeholder2: "选择退货原因",
      tip1: "请选择退款原因",
      tip2: "超过可退款的最大金额，请重新输入",
      tip3: "退款金额不能为空"
    },
    select: {
      op1: "不想要此商品",
      op2: "买错商品",
      op3: "快递一直未送到",
      op4: "不喜欢此商品",
      op5: "商品与描述不符",
      op6: "商家发错商品",
      op7: "商家发错商品",
      op8: "买错商品规格",
      op9: "收到商品破损或变形",
      op10: "商家少发商品"
    },
    btns: {
      btn1: "After service",
      btn2: "查看申请",
      btn3: "撤销申请",
      btn4: "Confirm receipt",
      btn5: "Payment",
      btn6: "选择商品",
      btn7: "选择商品"
    },
    success: {
      text1: "成功提交售后申请",
      text2: "请耐心等待商家处理申请，你可以在我的订单查看售后状态"
    },
    box: {
      text1: "确认撤销售后申请？",
      text2: "确认后将关闭本次售后服务，且无法再次对该商品发起售后申请"
    }
  },
  pay: {
    title: "请选择支付方式",
    text1: "My Payments",
    text2: "Add payment method",
    text3: "Add a credit or debit card",
    text4: "We accept these credit and debit cards:",
    text5: "Card number",
    text6: "Name on card",
    text7: "Expiration date",
    text8: "Security code (CVV/CVC)",
    text9: "Add my card",
    msg1: "Name on card is required",
    msg2: "Card number is required",
    msg3: "Security code is required"
  },
  address: {
    text1: "My Addresses",
    text2: "Name",
    text3: "Country",
    text4: "Adress",
    text5: "ZIP Code",
    text6: "Phone number",
    text7: "No address yet",
    text8: "Add address",
    text9: "Add a new address",
    text10: "Edit address",
    text11: "Country/Region",
    text12: "Full name（First anme and surname）",
    text13: "Phone number",
    text14: "Postcode",
    text15: "Address Line 1 (or Company Name)",
    text16: "Address Line 2 (optional)",
    text17: "Town/City",
    text18: "County (if applicable)",
    text19: "Save as my default address",
    text20: "Edit adress",
    text21: "Please enter a name",
    text22: "Please enter a phone number so we can call if there are any issues with delivery",
    text23: "Please enter a ZIP or postal code",
    text24: "Please enter an address",
    text25: "Please enter a city name",
    text26: "Confirm removalc",
    text27: "It cannot be restored after being deleted",
    text28: "success"
  },
  product: {
    text1: "Stock",
    text2: "Quantity",
    text3: "About this product",
    text4: "Product Description",
    text5: "Recommend for you",
    text6: "Add successful!",
    btns: {
      btn1: "Buy Now",
      btn2: "Add to Cart"
    }
  }
};
Vue.use(VueI18n);
const messages = {
  "en-GB": {
    ...enGBLocale,
    ..._default
  },
  "en-US": {
    ...enUSLocale,
    ..._default
  },
  "zh-CN": {
    ...zhCNLocale,
    ..._default$1
  }
};
const languageCode$1 = localStorage.getItem("LanguageCode") || "en-GB";
const i18n = new VueI18n({
  // 设置语言 选项 en | zh
  locale: languageCode$1,
  // 设置文本内容
  messages
});
locale.i18n((key, value) => {
  i18n.t(key, value);
});
function normalizeComponent(scriptExports, render39, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render39) {
    options.render = render39;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  return {
    exports: scriptExports,
    options
  };
}
const _sfc_main$B = {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      if (first && first.name !== "home") {
        matched = [{ path: "/home", meta: { title: "home" } }].concat(matched);
      }
      this.levelList = matched;
    }
  }
};
var _sfc_render$B = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("el-breadcrumb", { staticClass: "app-breadcrumb", attrs: { "separator": "/" } }, [_c("transition-group", { attrs: { "name": "breadcrumb" } }, _vm._l(_vm.levelList, function(item, index2) {
    return item.meta.title ? _c("el-breadcrumb-item", { key: item.path }, [item.redirect === "noredirect" || index2 == _vm.levelList.length - 1 ? _c("span", { staticClass: "no-redirect" }, [_vm._v(_vm._s(item.meta.title))]) : _c("router-link", { attrs: { "to": item.redirect || item.path } }, [_vm._v(_vm._s(item.meta.title))])], 1) : _vm._e();
  }), 1)], 1);
};
var _sfc_staticRenderFns$B = [];
var __component__$B = /* @__PURE__ */ normalizeComponent(
  _sfc_main$B,
  _sfc_render$B,
  _sfc_staticRenderFns$B,
  false,
  null,
  "a0e9941d"
);
const Breadcrumb = __component__$B.exports;
const _sfc_main$A = {
  name: "hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
};
var _sfc_render$A = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("svg", { staticClass: "hamburger", class: { "is-active": _vm.isActive }, attrs: { "t": "1492500959545", "viewBox": "0 0 1024 1024", "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "p-id": "1691", "xmlns:xlink": "http://www.w3.org/1999/xlink", "width": "64", "height": "64" }, on: { "click": _vm.toggleClick } }, [_c("path", { attrs: { "d": "M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z", "p-id": "1692" } }), _c("path", { attrs: { "d": "M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z", "p-id": "1693" } }), _c("path", { attrs: { "d": "M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z", "p-id": "1694" } })])]);
};
var _sfc_staticRenderFns$A = [];
var __component__$A = /* @__PURE__ */ normalizeComponent(
  _sfc_main$A,
  _sfc_render$A,
  _sfc_staticRenderFns$A,
  false,
  null,
  "75eecb0f"
);
const Hamburger = __component__$A.exports;
function languageSettingList$1(languageSettingId) {
  return service({
    url: `/hom/languageSetting/list`,
    method: "get"
  });
}
const __$_require_368ed4ee__ = "/static/logo-vDS7wGhH.png";
({
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      list: [
        // { languageCode: 'en-GB', name: elementContentList.language_language_en || this.$t('language.language.en') },
        // { languageCode: 'en-US', name: elementContentList.language_language_en_us || this.$t('language.language.en_us') },
        // { languageCode: 'zh-CN', name: elementContentList.language_language_zh_cn || this.$t('language.language.zh_cn') },
      ],
      languageCode: "",
      elementContentList: ""
    };
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "avatar",
      "name"
    ])
  },
  created() {
    this.elementContentList = window.elementContentList;
    let code = localStorage.getItem("LanguageCode");
    if (!code) {
      localStorage.setItem("LanguageCode", "en-GB");
    }
    this.languageCode = localStorage.getItem("LanguageCode") || "en-GB";
    this.list = JSON.parse(sessionStorage.getItem("languageList"));
  },
  methods: {
    getLanguageSettingList() {
      languageSettingList$1().then((res) => {
        sessionStorage.setItem("languageList", JSON.stringify(res.data));
        this.list = res.data;
      });
    },
    handleChange(val) {
      localStorage.setItem("LanguageCode", val);
      let arr = window.location.href.split("#");
      let arr2 = arr[0].split("?local=");
      arr[0] = arr2[0] + "?local=" + val;
      let url = arr.join("#");
      window.location.href = url;
      this.getLanguageSettingList();
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
});
const _sfc_main$z = {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
var _sfc_render$z = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "menu-wrapper" }, [_vm._l(_vm.routes, function(item) {
    return !item.hidden && item.children ? [_vm._l(item.children, function(child) {
      return !child.hidden ? [child.children && child.children.length > 0 ? _c("sidebar-item", { key: child.path, staticClass: "nest-menu", attrs: { "is-nest": true, "routes": [child] } }) : _vm._e(), _c("router-link", { key: child.name, attrs: { "to": item.path + "/" + child.path } }, [_c("el-menu-item", { attrs: { "index": item.path + "/" + child.path } }, [child.meta && child.meta.icon ? _c("svg-icon", { attrs: { "icon-class": child.meta.icon } }) : _vm._e(), child.meta && child.meta.title ? _c("span", { attrs: { "slot": "title" }, slot: "title" }, [_vm._v(_vm._s(child.meta.title))]) : _vm._e()], 1)], 1)] : _vm._e();
    })] : _vm._e();
  })], 2);
};
var _sfc_staticRenderFns$z = [];
var __component__$z = /* @__PURE__ */ normalizeComponent(
  _sfc_main$z,
  _sfc_render$z,
  _sfc_staticRenderFns$z,
  false,
  null,
  null
);
const SidebarItem = __component__$z.exports;
const delta = 15;
const _sfc_main$y = {
  name: "scrollBar",
  data() {
    return {
      top: 0
    };
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      const $container = this.$refs.scrollContainer;
      const $containerHeight = $container.offsetHeight;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperHeight = $wrapper.offsetHeight;
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta);
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top;
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta);
          }
        } else {
          this.top = 0;
        }
      }
    }
  }
};
var _sfc_render$y = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { ref: "scrollContainer", staticClass: "scroll-container", on: { "wheel": function($event) {
    $event.preventDefault();
    return _vm.handleScroll.apply(null, arguments);
  } } }, [_c("div", { ref: "scrollWrapper", staticClass: "scroll-wrapper", style: { top: _vm.top + "px" } }, [_vm._t("default")], 2)]);
};
var _sfc_staticRenderFns$y = [];
var __component__$y = /* @__PURE__ */ normalizeComponent(
  _sfc_main$y,
  _sfc_render$y,
  _sfc_staticRenderFns$y,
  false,
  null,
  "4debcc65"
);
const ScrollBar = __component__$y.exports;
const _sfc_main$x = {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      "sidebar",
      "routers"
    ]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    handleLogOut() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
};
var _sfc_render$x = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "sidebar_main" }, [_c("scroll-bar", [_c("el-menu", { attrs: { "mode": "vertical", "show-timeout": 200, "default-active": _vm.$route.path, "background-color": "#fff", "text-color": "#4E5159", "active-text-color": "#ffffff" } }, [_c("sidebar-item", { attrs: { "routes": _vm.routes } })], 1)], 1), _c("div", [_c("el-button", { staticClass: "logOut", attrs: { "icon": "el-icon-switch-button" }, on: { "click": _vm.handleLogOut } }, [_vm._v(_vm._s("Log out"))])], 1)], 1);
};
var _sfc_staticRenderFns$x = [];
var __component__$x = /* @__PURE__ */ normalizeComponent(
  _sfc_main$x,
  _sfc_render$x,
  _sfc_staticRenderFns$x,
  false,
  null,
  null
);
const Sidebar = __component__$x.exports;
const _sfc_main$w = {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
var _sfc_render$w = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("section", { staticClass: "app-main" }, [_c("transition", { attrs: { "name": "fade-transform", "mode": "out-in" } }, [_c("router-view", { key: _vm.key })], 1)], 1);
};
var _sfc_staticRenderFns$w = [];
var __component__$w = /* @__PURE__ */ normalizeComponent(
  _sfc_main$w,
  _sfc_render$w,
  _sfc_staticRenderFns$w,
  false,
  null,
  null
);
const AppMain = __component__$w.exports;
const { body } = document;
const WIDTH = 1024;
const RATIO = 3;
const ResizeMixin = {
  watch: {
    $route(route) {
      if (this.device === "mobile" && this.sidebar.opened) {
        store.dispatch("CloseSideBar", { withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      store.dispatch("ToggleDevice", "mobile");
      store.dispatch("CloseSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - RATIO < WIDTH;
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        store.dispatch("ToggleDevice", isMobile ? "mobile" : "desktop");
        if (isMobile) {
          store.dispatch("CloseSideBar", { withoutAnimation: true });
        }
      }
    }
  }
};
const _sfc_main$v = {
  name: "layout",
  components: {
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  }
};
var _sfc_render$v = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "app-wrapper", class: _vm.classObj }, [_c("div", { staticClass: "main-container" }, [_c("sidebar", { staticClass: "sidebar-container" }), _c("app-main")], 1)]);
};
var _sfc_staticRenderFns$v = [];
var __component__$v = /* @__PURE__ */ normalizeComponent(
  _sfc_main$v,
  _sfc_render$v,
  _sfc_staticRenderFns$v,
  false,
  null,
  "675eb271"
);
const Layout = __component__$v.exports;
Vue.use(VueRouter$1);
const constantRouterMap = [
  {
    path: "/login",
    component: () => __vitePreload(() => Promise.resolve().then(() => index$f), true ? void 0 : void 0),
    hidden: true
  },
  {
    path: "/register",
    component: () => __vitePreload(() => Promise.resolve().then(() => register$1), true ? void 0 : void 0),
    hidden: true
  },
  // { path: '/password_find', component: () => import('@/views/login/forget'), hidden: true },
  {
    path: "/cart",
    component: () => __vitePreload(() => Promise.resolve().then(() => index$d), true ? void 0 : void 0),
    hidden: true
  },
  { path: "/404", component: () => __vitePreload(() => Promise.resolve().then(() => _404$1), true ? void 0 : void 0), hidden: true },
  {
    path: "/product",
    component: () => __vitePreload(() => Promise.resolve().then(() => index$b), true ? void 0 : void 0),
    hidden: true
  },
  { path: "/settlement", component: () => __vitePreload(() => Promise.resolve().then(() => index$9), true ? void 0 : void 0), hidden: true },
  { path: "/general", component: () => __vitePreload(() => Promise.resolve().then(() => index$7), true ? void 0 : void 0), hidden: true },
  { path: "/custom", component: () => __vitePreload(() => Promise.resolve().then(() => index$5), true ? void 0 : void 0), hidden: true },
  { path: "/three", component: () => __vitePreload(() => Promise.resolve().then(() => three$1), true ? void 0 : void 0), hidden: true },
  { path: "/order/pay/success", component: () => __vitePreload(() => Promise.resolve().then(() => success$1), true ? void 0 : void 0), hidden: true },
  { path: "/order/pay/fail", component: () => __vitePreload(() => Promise.resolve().then(() => fail$1), true ? void 0 : void 0), hidden: true },
  {
    path: "/",
    redirect: "/home",
    component: () => __vitePreload(() => Promise.resolve().then(() => index$3), true ? void 0 : void 0),
    hidden: true,
    children: [
      {
        path: "home",
        name: "home",
        component: () => __vitePreload(() => Promise.resolve().then(() => index$3), true ? void 0 : void 0)
      }
    ]
  },
  {
    path: "/my",
    component: Layout,
    redirect: "/my",
    children: [
      {
        path: "baseInfo",
        name: "baseInfo",
        component: () => __vitePreload(() => Promise.resolve().then(() => baseInfo$1), true ? void 0 : void 0),
        meta: { title: i18n.t("router.baseInfo"), icon: "user2" }
      },
      {
        path: "payments",
        name: "payments",
        component: () => __vitePreload(() => Promise.resolve().then(() => payments$1), true ? void 0 : void 0),
        meta: { title: i18n.t("router.payments"), icon: "product-list" }
      },
      {
        path: "addresses",
        name: "addresses",
        component: () => __vitePreload(() => Promise.resolve().then(() => addresses$1), true ? void 0 : void 0),
        meta: { title: i18n.t("router.addresses"), icon: "address" }
      },
      {
        path: "order",
        name: "order",
        component: () => __vitePreload(() => Promise.resolve().then(() => index$1), true ? void 0 : void 0),
        meta: { title: i18n.t("router.order"), icon: "orders" }
      }
    ]
  }
];
const router = new VueRouter$1({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        resolve();
      });
    }
  }
};
const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.userInfo,
  addRouters: (state) => state.permission.addRouters,
  routers: (state) => state.permission.routers,
  cartNum: (state) => state.user.cartNum
};
Vue.use(index$g);
const store = new index$g.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
});
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: "http://47.109.137.136:7010",
  // api的base_url
  timeout: 15e3
  // 请求超时时间
});
service.interceptors.request.use((config) => {
  config.headers["Authorization-Portal"] = getToken();
  if (store.getters.token) ;
  config.headers["Accept-Language"] = localStorage.getItem("LanguageCode") ? localStorage.getItem("LanguageCode") : "en-GB";
  if (config.method === "get") {
    config.paramsSerializer = function(params) {
      return queryString.stringify(params, {
        arrayFormat: "repeat"
      });
    };
  }
  return config;
}, (error) => {
  console.log(error);
  Promise.reject(error);
});
const elementContentList$1 = window.elementContentList;
elementContentList$1 ? elementContentList$1.portal_login_msg5 : i18n.t("login.msg5");
elementContentList$1 ? elementContentList$1.portal_login_msg6 : i18n.t("login.msg6");
elementContentList$1 ? elementContentList$1.portal_login_msg7 : i18n.t("login.msg7");
elementContentList$1 ? elementContentList$1.portal_btns_cancel : i18n.t("btns.cancel");
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        router.push("/login");
      } else {
        elementUi_commonExports.Message({
          message: res.message,
          type: "error",
          duration: 3 * 1e3
        });
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log("err" + error);
    elementUi_commonExports.Message({
      message: error.message,
      type: "error",
      duration: 3 * 1e3
    });
    return Promise.reject(error);
  }
);
function cartAdd(data) {
  return service({
    url: "/cart/add",
    method: "post",
    data
  });
}
function cartDelete(id) {
  return service({
    url: `/cart/delete?ids=${id}`,
    method: "post"
  });
}
function fetchList(data) {
  return service({
    url: "/cart/page",
    method: "post",
    data
  });
}
function customAdd(customUid) {
  return service({
    url: `/cart/custom/add?customUid=${customUid}`,
    method: "post"
  });
}
function checkCustomExist(data) {
  return service({
    url: "/cart/checkCustomExist",
    method: "post",
    data
  });
}
function countCart(params) {
  return service({
    url: "/cart/countCart",
    method: "get",
    params
  });
}
function cartEdit(cartItemId, data) {
  return service({
    url: `/cart/edit/${cartItemId}`,
    method: "post",
    data
  });
}
function videoList() {
  return service({
    url: "/home/resource/video/list",
    method: "get"
  });
}
function picList() {
  return service({
    url: "/home/resource/pic/list",
    method: "get"
  });
}
function productPage(data) {
  return service({
    url: "/home/featured/product/page",
    method: "post",
    data
  });
}
function sectionPicList() {
  return service({
    url: "/home/section/pic/list",
    method: "get"
  });
}
function languageSettingList() {
  return service({
    url: "/home/languageSetting/list",
    method: "get"
  });
}
const __$_require_6d02fb8e__ = "/static/logo-vDS7wGhH.png";
const _sfc_main$u = {
  data() {
    return {
      elementContentList: "",
      showDialog: false,
      list: [],
      languageCode: ""
    };
  },
  computed: {
    ...mapGetters([
      "userInfo",
      "cartNum"
    ])
  },
  created() {
    this.elementContentList = window.elementContentList;
    let code = localStorage.getItem("LanguageCode");
    if (!code) {
      localStorage.setItem("LanguageCode", "en-GB");
    }
    this.languageCode = localStorage.getItem("LanguageCode") || "en-GB";
    if (!sessionStorage.getItem("languageList")) {
      this.getLanguageSettingList();
    } else {
      this.list = JSON.parse(sessionStorage.getItem("languageList"));
    }
  },
  mounted() {
  },
  methods: {
    getLanguageSettingList() {
      languageSettingList().then((res) => {
        sessionStorage.setItem("languageList", JSON.stringify(res.data));
        this.list = res.data;
      });
    },
    handleChange(val) {
      localStorage.setItem("LanguageCode", val);
      let arr = window.location.href.split("#");
      let arr2 = arr[0].split("?local=");
      arr[0] = arr2[0] + "?local=" + val;
      let url = arr.join("#");
      window.location.href = url;
      this.getLanguageSettingList();
    },
    handleGoToCart() {
      this.showDialog = false;
      this.$router.push("/cart");
    },
    handleClose() {
      this.showDialog = false;
    },
    handleShowDialog() {
      checkCustomExist().then((res) => {
        if (res.data) {
          this.showDialog = true;
        } else {
          this.$router.push("/custom");
        }
      });
    },
    handleGoHome() {
      if (this.$route.path == "/home") return false;
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
};
var _sfc_render$u = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "navbar" }, [_c("div", { staticClass: "nav_bar flex_b_c" }, [_c("div", { staticClass: "nav_left flex_c_c" }, [_c("img", { attrs: { "src": __$_require_6d02fb8e__ } }), _c("span", { on: { "click": _vm.handleGoHome } }, [_vm._v(_vm._s(_vm.elementContentList.portal_navbar_title || _vm.$t("navbar.title")))])]), _c("div", { staticClass: "nav_right" }, [_c("div", { staticClass: "nav_menu flex" }, [_c("el-select", { on: { "change": _vm.handleChange }, model: { value: _vm.languageCode, callback: function($$v) {
    _vm.languageCode = $$v;
  }, expression: "languageCode" } }, _vm._l(_vm.list, function(item) {
    return _c("el-option", { key: item.languageCode, attrs: { "value": item.languageCode, "label": item.name } });
  }), 1), _c("span", { staticClass: "menu_item", staticStyle: { "cursor": "pointer" }, attrs: { "to": "" }, on: { "click": _vm.handleShowDialog } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_menu1 || _vm.$t("navbar.menu1")) + " ")]), _c("router-link", { staticClass: "menu_item", attrs: { "to": "/general" } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_menu2 || _vm.$t("navbar.menu2")) + " ")]), _c("router-link", { staticClass: "menu_item", attrs: { "to": "/cart" } }, [_c("el-badge", { staticClass: "item", attrs: { "value": _vm.cartNum, "max": 99 } }, [_c("svg-icon", { staticStyle: { "width": "16px", "height": "16px" }, attrs: { "icon-class": "cart" } }), _vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_menu3 || _vm.$t("navbar.menu3")) + " ")], 1)], 1), !_vm.userInfo.username ? _c("router-link", { staticClass: "menu_item", attrs: { "to": "/login" } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_menu4 || _vm.$t("navbar.menu4")) + " ")]) : _c("router-link", { staticClass: "menu_item", attrs: { "to": "/my/baseInfo" } }, [_vm._v(" " + _vm._s(_vm.userInfo.nickname) + " ")])], 1)])]), _vm.showDialog ? _c("div", { staticClass: "nav_dialog flex_c_c" }, [_c("div", { staticClass: "dia_card" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_text1 || _vm.$t("navbar.text1")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_text2 || _vm.$t("navbar.text2")) + " ")]), _c("p", [_c("el-button", { on: { "click": _vm.handleClose } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]), _c("el-button", { staticClass: "btn1", on: { "click": _vm.handleGoToCart } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_btn1 || _vm.$t("btns.btn1")))])], 1)])]) : _vm._e()]);
};
var _sfc_staticRenderFns$u = [];
var __component__$u = /* @__PURE__ */ normalizeComponent(
  _sfc_main$u,
  _sfc_render$u,
  _sfc_staticRenderFns$u,
  false,
  null,
  null
);
const Navbar = __component__$u.exports;
const _sfc_main$t = {
  components: {
    Navbar
  },
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    let data = sessionStorage.getItem("elementContentMap");
    if (!data) {
      this.getElementContentMap();
    } else {
      if (!window.elementContentList) {
        this.getElementContentMap();
      }
    }
    if (!sessionStorage.getItem("languageList")) {
      this.getLanguageSettingList();
    }
  },
  mounted() {
    let token = getToken();
    if (this.userInfo && token) {
      this.$store.dispatch("GetInfo");
    }
  },
  methods: {
    getLanguageSettingList() {
      languageSettingList().then((res) => {
        sessionStorage.setItem("languageList", JSON.stringify(res.data));
      });
    },
    getElementContentMap() {
      window.elementContentList = window.elementContentList || { "portal_custom_basic_label11": "Back" };
      sessionStorage.setItem(
        "elementContentMap",
        JSON.stringify(window.elementContentList)
      );
    }
  }
};
var _sfc_render$t = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { attrs: { "id": "app" } }, [_c("navbar"), _c("router-view")], 1);
};
var _sfc_staticRenderFns$t = [];
var __component__$t = /* @__PURE__ */ normalizeComponent(
  _sfc_main$t,
  _sfc_render$t,
  _sfc_staticRenderFns$t,
  false,
  null,
  "920bab2d"
);
const App = __component__$t.exports;
const _sfc_main$s = {
  name: "svg-icon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
var _sfc_render$s = function render10() {
  var _vm = this, _c = _vm._self._c;
  return _c("svg", { class: _vm.svgClass, attrs: { "aria-hidden": "true" } }, [_c("use", { attrs: { "xlink:href": _vm.iconName } })]);
};
var _sfc_staticRenderFns$s = [];
var __component__$s = /* @__PURE__ */ normalizeComponent(
  _sfc_main$s,
  _sfc_render$s,
  _sfc_staticRenderFns$s,
  false,
  null,
  "727cc091"
);
const SvgIcon = __component__$s.exports;
Vue.component("svg-icon", SvgIcon);
const whiteList = ["/login", "/register", "/password_find", "/general", "/home", "/three"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
if (typeof window !== "undefined") {
  let loadSvg = function() {
    var body2 = document.body;
    var svgDom = document.getElementById("__svg__icons__dom__");
    if (!svgDom) {
      svgDom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgDom.style.position = "absolute";
      svgDom.style.width = "0";
      svgDom.style.height = "0";
      svgDom.id = "__svg__icons__dom__";
      svgDom.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgDom.setAttribute("xmlns:link", "http://www.w3.org/1999/xlink");
    }
    svgDom.innerHTML = '<symbol  viewBox="0 0 16 16" id="icon-address"><defs><clipPath id="icon-address_a"><rect width="16" height="16" rx="0" /></clipPath></defs><g clip-path="url(#icon-address_a)"><path d="M14.226 3.337a4.78 4.78 0 0 0-6.724-.707L5.927 3.905l.787.972 1.574-1.275a3.531 3.531 0 1 1 4.445 5.488l-1.687 1.366.786.972 1.687-1.366a4.781 4.781 0 0 0 .707-6.725Zm-6.158 9.531A3.531 3.531 0 1 1 3.623 7.38l1.734-1.404-.786-.972-1.734 1.404a4.781 4.781 0 0 0 6.017 7.432l1.643-1.33-.787-.972-1.642 1.33Zm2.497-7.348.8.96-5.368 4.474-.8-.96 5.368-4.474Z" /></g></symbol><symbol  viewBox="0 0 16 16" id="icon-orders"><defs><clipPath id="icon-orders_a"><rect width="16" height="16" rx="0" /></clipPath></defs><g clip-path="url(#icon-orders_a)"><path d="M11.651 7.762a.63.63 0 0 0-.625-.601h-6.13a.62.62 0 0 0-.609.614.62.62 0 0 0 .609.615h6.147a.62.62 0 0 0 .609-.615v-.013ZM6.552 2.99h2.856c.434 0 .8-.42.8-.915 0-.503-.367-.913-.818-.913H6.552c-.45 0-.818.41-.818.913 0 .504.367.914.818.914ZM11.043 4.874H4.896a.62.62 0 0 0-.609.614.62.62 0 0 0 .609.615h6.147a.62.62 0 0 0 .609-.615.62.62 0 0 0-.609-.614ZM11.026 9.641h-6.13a.62.62 0 0 0-.609.615.62.62 0 0 0 .609.615h6.147a.62.62 0 0 0 .609-.615v-.014a.63.63 0 0 0-.626-.6Z" /><path d="M13.828 2.107c-.327-.354-.796-.54-1.357-.54h-.818c-.326 0-.678.214-.678.561 0 .328.336.65.678.65h.818c.382 0 .628.249.628.634v9.518c0 .385-.246.634-.628.634H3.66c-.396 0-.837-.271-.837-.634V3.412c0-.385.246-.634.628-.634h1.027c.302 0 .504-.261.504-.65 0-.352-.188-.562-.504-.562H3.451c-1.145 0-1.828.697-1.828 1.864v9.412c0 1.175.752 1.934 1.915 1.934h8.846c1.235 0 1.915-.687 1.915-1.934V3.43c0-.532-.163-.99-.471-1.323Z" /></g></symbol><symbol  class="icon" viewBox="0 0 1024 1024" id="icon-product-list"><path d="M896.022 255.957H607.898c-17.718 0-31.995-14.277-31.995-31.995 0-17.717 14.277-31.994 31.995-31.994h287.951c17.718 0 31.995 14.277 31.995 31.994.172 17.718-14.105 31.995-31.822 31.995zm0 159.973H607.898c-17.718 0-31.995-14.277-31.995-31.995s14.277-31.994 31.995-31.994h287.951c17.718 0 31.995 14.277 31.995 31.994s-14.105 31.995-31.822 31.995zm0 256.13H607.898c-17.718 0-31.995-14.278-31.995-31.995s14.277-31.995 31.995-31.995h287.951c17.718 0 31.995 14.277 31.995 31.995s-14.105 31.994-31.822 31.994zm0 159.972H607.898c-17.718 0-31.995-14.277-31.995-31.994s14.277-31.995 31.995-31.995h287.951c17.718 0 31.995 14.277 31.995 31.995s-14.105 31.994-31.822 31.994zM383.935 479.92H191.968c-52.98 0-95.984-43.003-95.984-95.984V191.968c0-52.98 43.003-95.984 95.984-95.984h191.967c52.98 0 95.984 43.003 95.984 95.984v191.967c0 52.98-43.003 95.984-95.984 95.984zM191.968 159.973c-17.546 0-31.995 14.45-31.995 31.995v191.967c0 17.546 14.45 31.995 31.995 31.995h191.967c17.546 0 31.995-14.45 31.995-31.995V191.968c0-17.546-14.45-31.995-31.995-31.995H191.968zm191.967 768.043H191.968c-52.98 0-95.984-43.003-95.984-95.984v-192.14c0-52.98 43.003-95.983 95.984-95.983h191.967c52.98 0 95.984 43.003 95.984 95.983V831.86c0 52.98-43.003 96.156-95.984 96.156zM191.968 607.898c-17.546 0-31.995 14.277-31.995 31.994V831.86c0 17.718 14.45 31.995 31.995 31.995h191.967c17.546 0 31.995-14.277 31.995-31.995V639.892c0-17.717-14.45-31.994-31.995-31.994H191.968z" /></symbol><symbol  viewBox="0 0 16 16" id="icon-user2"><defs><clipPath id="icon-user2_a"><rect width="16" height="16" rx="0" /></clipPath></defs><g clip-path="url(#icon-user2_a)"><path d="M8.01 7.027a3.017 3.017 0 0 1-3.015-3.014A3.017 3.017 0 0 1 8.01 1a3.017 3.017 0 0 1 3.015 3.013 3.017 3.017 0 0 1-3.015 3.014Zm0-4.822A1.81 1.81 0 0 0 6.2 4.013a1.81 1.81 0 0 0 1.81 1.808 1.81 1.81 0 0 0 1.808-1.808 1.81 1.81 0 0 0-1.809-1.808ZM6.933 15c-1.82 0-3.484-.072-4.357-.94C2.194 13.677 2 13.183 2 12.59c0-.595.193-1.183.574-1.745.338-.5.808-.956 1.396-1.353a7.389 7.389 0 0 1 4.04-1.236c1.404 0 2.873.45 4.03 1.237.586.397 1.053.852 1.39 1.353.378.562.57 1.15.57 1.744 0 .595-.194 1.09-.578 1.471-.955.952-2.86.944-4.877.937-.357-.002-.714-.002-1.072 0l-.54.001Zm1.075-1.208.541.001c.933.004 1.814.007 2.558-.082.724-.088 1.216-.257 1.463-.503.096-.095.223-.263.223-.617 0-.717-.521-1.483-1.43-2.1a6.113 6.113 0 0 0-3.355-1.03c-2.379 0-4.803 1.58-4.803 3.13 0 .352.127.52.222.614.604.601 2.43.594 4.04.588l.541-.001Z" /></g></symbol>';
    body2.insertBefore(svgDom, body2.lastChild);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSvg);
  } else {
    loadSvg();
  }
}
const languageCode = localStorage.getItem("LanguageCode") || "en-GB";
if (languageCode == "zh-CN") {
  Vue.use(ElementUI, { zhlocale: _default$1 });
} else {
  Vue.use(ElementUI, { locale: _default });
}
Vue.use(VCharts);
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
  components: { App }
});
function isvalidateEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
}
function setCookie(key, value, expires) {
  return api.set(key, value, { expires });
}
function getCookie(key) {
  return api.get(key);
}
const login_center_bg = "data:image/png;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICJzdGF0aWMvaW1nL2xvZ2luX2NlbnRlcl9iZy41MzA3ODk2LnBuZyI7CgoKLy8vLy8vLy8vLy8vLy8vLy8vCi8vIFdFQlBBQ0sgRk9PVEVSCi8vIC4vc3JjL2Fzc2V0cy9pbWFnZXMvbG9naW5fY2VudGVyX2JnLnBuZwovLyBtb2R1bGUgaWQgPSBoTnBSCi8vIG1vZHVsZSBjaHVua3MgPSAz";
const __$_require_34d9fc4f__ = "/static/logo1-DALvw2UN.png";
const __$_require_1aca421e__ = "/static/pokidol-Dd5t3wXz.png";
const _sfc_main$r = {
  name: "login",
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        // email: [{required: true, trigger: 'blur', validator: validateEmail}],
        // password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: "password",
      login_center_bg,
      dialogVisible: false,
      supportDialogVisible: false,
      rememberPwd: false,
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.loginForm.account = getCookie("account");
    this.loginForm.password = getCookie("password");
  },
  methods: {
    // 忘记密码
    handleForgetPwd() {
      this.$router.push("/password_find");
    },
    // 注册
    handleSignUp() {
      this.$router.push("/register");
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.loading = false;
            setCookie("account", this.loginForm.account, 15);
            setCookie("password", this.loginForm.password, 15);
            this.$router.push({ path: "/home" });
          }).catch(() => {
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
var _sfc_render$r = function render11() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "login flex_c_c" }, [_vm._m(0), _c("div", { staticClass: "login_main flex_c_c" }, [_c("div", { staticClass: "login_card" }, [_c("p", { staticClass: "p1" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_title || _vm.$t("login.title")) + " ")]), _c("p", { staticClass: "p2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_text1 || _vm.$t("login.text1")) + " "), _c("span", { on: { "click": _vm.handleSignUp } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_text2 || _vm.$t("login.text2")))])]), _c("div", { staticClass: "form_card" }, [_c("el-form", { ref: "loginForm", attrs: { "autoComplete": "on", "model": _vm.loginForm, "label-position": "top" } }, [_c("el-form-item", { attrs: { "prop": "account", "label": _vm.elementContentList.portal_navbar_form_label1 || _vm.$t("login.form.label1") } }, [_c("el-input", { attrs: { "name": "account", "type": "text", "autoComplete": "on", "placeholder": _vm.elementContentList.portal_navbar_form_placeholder1 || _vm.$t("login.form.placeholder1") }, model: { value: _vm.loginForm.account, callback: function($$v) {
    _vm.$set(_vm.loginForm, "account", $$v);
  }, expression: "loginForm.account" } })], 1), _c("el-form-item", { attrs: { "prop": "password", "label": _vm.elementContentList.portal_navbar_form_label2 || _vm.$t("login.form.label2") } }, [_c("el-input", { attrs: { "name": "password", "type": _vm.pwdType, "autoComplete": "on", "placeholder": _vm.elementContentList.portal_navbar_form_placeholder2 || _vm.$t("login.form.placeholder2") }, nativeOn: { "keyup": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleLogin.apply(null, arguments);
  } }, model: { value: _vm.loginForm.password, callback: function($$v) {
    _vm.$set(_vm.loginForm, "password", $$v);
  }, expression: "loginForm.password" } }, [_c("span", { attrs: { "slot": "suffix" }, on: { "click": _vm.showPwd }, slot: "suffix" }, [_c("i", { staticClass: "el-icon-view" })])])], 1)], 1)], 1), _c("div", { staticClass: "flex_b_c login_remember" }, [_c("el-checkbox", { model: { value: _vm.rememberPwd, callback: function($$v) {
    _vm.rememberPwd = $$v;
  }, expression: "rememberPwd" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_navbar_text3 || _vm.$t("login.text3")))]), _c("span", { staticClass: "forget_pwd", on: { "click": _vm.handleForgetPwd } }, [_vm._v(_vm._s(_vm.elementContentList.portal_navbar_text4 || _vm.$t("login.text4")))])], 1), _c("el-button", { staticClass: "login_btn", attrs: { "type": "primary", "loading": _vm.loading }, nativeOn: { "click": function($event) {
    $event.preventDefault();
    return _vm.handleLogin.apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_navbar_text5 || _vm.$t("login.text5")) + " ")])], 1)])]);
};
var _sfc_staticRenderFns$r = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "logo flex_c_c" }, [_c("img", { attrs: { "src": __$_require_34d9fc4f__ } }), _c("img", { attrs: { "src": __$_require_1aca421e__ } })]);
}];
var __component__$r = /* @__PURE__ */ normalizeComponent(
  _sfc_main$r,
  _sfc_render$r,
  _sfc_staticRenderFns$r,
  false,
  null,
  null
);
const index$e = __component__$r.exports;
const index$f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  data() {
    return {
      content: "",
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.content = this.elementContentList.login_privacy;
  },
  methods: {
    handleClose() {
      this.$parent.showPrivacy = false;
    }
  }
};
var _sfc_render$q = function render12() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "privacy flex_c_c" }, [_c("div", { staticClass: "dia_body" }, [_c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } }), _vm._m(0)])]);
};
var _sfc_staticRenderFns$q = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "content" }, [_c("h1", { staticClass: "privacy_title" }, [_vm._v("Privacy Policy")]), _c("h2", [_vm._v("What personal data we collect and why we collect it")]), _c("p", { staticClass: "subtitle" }, [_vm._v("1. PRIVACY STATEMENT")]), _c("p", [_vm._v("Pokidol is committed to preserving the privacy of all visitors to our website. In particular, we would you to know that Pokidol is not in the business of selling, renting of trading email lists with other companies for marketing purposes. We hope that this Privacy Policy helps you to understand when and why we collect personal data.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("2. GATHERING OF SYSTEM INFORMATION")]), _c("p", [_vm._v("When you use www.pokidol.com services we track your activity on our website. Your personal information is used to identify you in our system, allowing www.pokidol.com to contact you about the status of your order or respond to your questions via e-mail or telephone, and to allow you to store your basic information for repeat checkouts.")]), _c("p", [_vm._v("We also use the information gathered from tracking user activities to improve our service. We also track your Internet Protocol (IP) address, domain name (if applicable), browser type, session duration, and transaction data, which is available to any site to which you connect. www.pokidol.com uses this information to administer the site and to further improve our service to you.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("3. FULFILLING ORDERS")]), _c("p", [_vm._v("For us to fulfill an order we require the following information: Name, Address, Telephone Number and Email Address")]), _c("p", [_vm._v("We work with several suppliers to fulfill orders. We will pass on delivery information such as name, address and telephone number to a www.pokidol.com suppliers/partner(s) so they can supply goods and services to you. Our suppliers/partners will use your name, address and telephone number to pass on to couriers and postal services so that your order can be sent to you.")]), _c("p", [_vm._v("If you wish to have information on your details held with our suppliers please email us.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("4. TRACKING OF COOKIES")]), _c("p", [_vm._v("A cookie is a small file which is placed on your computer's hard drive. The file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.")]), _c("p", [_vm._v("We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.")]), _c("p", [_vm._v("Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.")]), _c("p", [_vm._v("Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.")]), _c("p", [_vm._v("We also use cookies to track visitors' interest in our products. We sometimes use this to understand our customers needs and make our offers as appropriate as possible. We do use some behavioural marketing techniques. So if you've visited a page and taken some interest in a product we use these type of cookies to remind you of what you were looking at. For example; you might get add something to the cart, but then the phone rings and afterwards you completely forget to go back and complete the checkout process. This is where we might send you and email or you may see us advertising that product whilst visiting another website. Please note that all cookie data is anonymised and stored temporarily.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("5. CUSTOMER IDENTIFIABLE INFORMATION")]), _c("p", [_vm._v("Our site's order form requires users to give us contact information, such as an email address or telephone number. This information is used to help us serve you better, in particular to contact you if we have any queries with your order. It is never shared with third parties, other than to process your order as detailed in point 3 of our Privacy Policy.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("6. MAILING LIST & MARKETING")]), _c("p", [_vm._v("As part of the registration process for freebies, offers, discounts and newsletters, we collect your email and name. We use that to initially send you the information you asked for. We also use it to send follow up marketing emails (which we are always transparent about at the time of signing up). Our marketing emails will contain information that we believe are of legitimate interest to you, such as new products, discounts and offers. We also use it to check every now and then that you're happy and satisfied. We don't rent or trade email lists with other organisations and businesses.")]), _c("p", [_vm._v("We use a third-party provider, MailChimp, to deliver our newsletter. We gather statistics around email opening and clicks using industry standard technologies to help us monitor and improve our e-newsletter. You can unsubscribe to general mailings at any time of the day or night by clicking the unsubscribe link at the bottom of any of our emails or by emailing us.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("7. FEEDBACK REQUESTS")]), _c("p", [_vm._v("As part of our customer service we send out review requests using the email address you supply us with at the time of order. It is entirely up to you if you choose to leave us a review. Once the review time has passed you will not hear from us again unless you have signed up to receive our offers or newsletter by email. We use Trusted Shops to help us automate our requests for reviews.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("8. LIVE CHAT")]), _c("p", [_vm._v("We use MyLiveChat if customers wish to contact us by this method with any queries. Your email address and name is required at the time of enquiry but is not stored or used for any future purpose unless agreed. This may include us emailing you some information if you have requested it after the Live Chat session has ended.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("9. UPDATE POLICY")]), _c("p", [_vm._v("This site gives users the following options for changing and modifying information previously provided:")]), _c("p", [_vm._v("Log in to your account with the account login link on our website. Upon entering your registered email and password, you are free to edit or remove your information at any time.")]), _c("p", [_vm._v("If you have trouble editing or removing your details for any reason, simply contact us with your change request through the Contact Us form on our website.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("10. CONTACTING THIS WEBSITE")]), _c("p", [_vm._v("If you have any questions about this privacy statement, the practices of this site, or your dealings with "), _c("span", { staticClass: "link link2" }, [_vm._v("www.pokidol.com")]), _vm._v(", you can contact us by email.")])]);
}];
var __component__$q = /* @__PURE__ */ normalizeComponent(
  _sfc_main$q,
  _sfc_render$q,
  _sfc_staticRenderFns$q,
  false,
  null,
  null
);
const privacyPolicy = __component__$q.exports;
const _sfc_main$p = {
  data() {
    return {
      content: "",
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.content = this.elementContentList.login_terms;
    window.toPrivacyPolicy = this.toPrivacyPolicy;
  },
  methods: {
    handleClose() {
      this.$parent.showTerms = false;
    },
    toPrivacyPolicy() {
      this.$parent.showPrivacy = true;
    }
  }
};
var _sfc_render$p = function render13() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "terms flex_c_c" }, [_c("div", { staticClass: "dia_body" }, [_c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } }), _c("div", { staticClass: "content" }, [_c("h1", { staticClass: "terms_title" }, [_vm._v("Terms & Conditions")]), _c("h3", [_vm._v("If you are looking for details on how we use your personal information please see our "), _c("span", { staticClass: "link", on: { "click": _vm.toPrivacyPolicy } }, [_vm._v("Privacy Policy")]), _vm._v(".")]), _c("p", { staticClass: "subtitle" }, [_vm._v("PAYMENT AND SECURITY")]), _c("p", [_vm._v("Our online payment system is with PayPal which allows payment using any major credit/debit cards. PayPal is a safe, secure, online payment system and is regulated by the Financial Services Authority. CUSTOMERS DO NOT REQUIRE A PAYPAL ACCOUNT TO PAY. YOU CAN SIMPLY USE A DEBIT/CREDIT CARD TO PAY INTO OUR PAYPAL ACCOUNT.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("ORDER CONFIRMATION")]), _c("p", [_vm._v("When we have received your photo booking and deposit, we will send a confirmation e-mail with your booking details. This will be followed by a dispatched e-mail when your booking has been processed.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("GOODS")]), _vm._m(0), _c("p", { staticClass: "subtitle" }, [_vm._v("RETURNS/CANCELLATIONS")]), _c("p", [_vm._v("Please note the personal figurines products are not returnable unless damaged or faulty. We must be informed within 14 working days of the item being delivered if your item is damaged or faulty.")]), _c("p", [_vm._v("Once your order has been placed, they go into production and cannot be cancelled or changed. If you require an item for a specific date please contact us beforehand. We do not accept requests at the confirmed order stage for items to be delivered any earlier than stated.")]), _c("p", [_vm._v("Occasionally, we may need you rebook your time to collect your data again if the first data collection is unsuccessful.")]), _c("p", [_vm._v("Please note that our personal figurines are bespoke products and everyone is very different. NO refunds or returns are accepted unless the product is damaged or faulty. Please ensure you follow our guideline when you take photos in our stores. We will advise if your date collection is unsuccessful.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("DELIVERIES")]), _c("p", [_vm._v("We cannot be held responsible for delays due to bad weather or postal strikes.")]), _c("p", [_vm._v("If your order is lost, we must be advised within 21 days of the shipment for DPD deliveries and 30 days for Royal Mail items.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("POSTAGE")]), _c("p", [_vm._v("We generally ship your personal figurines within 4 weeks after you have confirmed your 3D model file. Due to the complicated process of producing our personal figurines, this may be a little longer in some circumstances. We will endeavour to keep you updated on your order at all times.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("LIVE DISPATCH TIMES")]), _c("p", [_vm._v("We try to keep these as accurate as possible. However, they are to be used as a guide. If you require a gift for a specific date, please contact us first.")]), _c("p", [_vm._v("Dispatch and delivery times are for UK customers only.")]), _c("p", { staticClass: "subtitle" }, [_vm._v("SHOULD ANYTHING GO WRONG")]), _c("p", [_vm._v("If we have made an error we will endeavour to correct this as soon as possible.")]), _c("p", [_vm._v("Order confirmations are your contract agreement between you and www.pokidol.com. Any special requests for orders must be placed on the order form. We do accept requests on email before and after the order process but ultimately your order form is your binding contract for order fulfilment.")]), _vm._m(1)])])]);
};
var _sfc_staticRenderFns$p = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", [_vm._v("We endeavour to keep "), _c("span", { staticClass: "link link2" }, [_vm._v("www.pokidol.com")]), _vm._v(" as up to date as possible with stock levels and also with the information available. In the unlikely event a product does go out of stock we will contact you to discuss arrangements that are suitable for you.")]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", [_c("span", { staticStyle: { "font-weight": "600" } }, [_vm._v("Christmas Deliveries")]), _vm._v(" - please note that the earlier Christmas deliveries are placed the more time we will have to rectify any issues. We will do our absolute best to rectify any problems before Christmas but after Royal Mail last posting dates this may be difficult.")]);
}];
var __component__$p = /* @__PURE__ */ normalizeComponent(
  _sfc_main$p,
  _sfc_render$p,
  _sfc_staticRenderFns$p,
  false,
  null,
  null
);
const terms = __component__$p.exports;
const _sfc_main$o = {
  name: "register",
  components: {
    terms,
    privacyPolicy
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_login_form_validate1 || this.$t("login.form.validate1")));
      } else if (!isvalidateEmail(value)) {
        callback(new Error(this.elementContentList.portal_login_form_validate2 || this.$t("login.form.validate2")));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_login_form_validate5 || this.$t("login.form.validate5")));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_login_form_validate3 || this.$t("login.form.validate3")));
      } else if (value.length < 8) {
        callback(new Error(this.elementContentList.portal_login_form_validate4 || this.$t("login.form.validate4")));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_login_form_validate6 || this.$t("login.form.validate6")));
      } else if (value.length > 20) {
        callback(new Error(this.elementContentList.portal_login_form_validate7 || this.$t("login.form.validate7")));
      } else {
        callback();
      }
    };
    const validateCheckPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_login_form_validate8 || this.$t("login.form.validate8")));
      } else if (value != this.signForm.password) {
        callback(new Error(this.elementContentList.portal_login_form_validate9 || this.$t("login.form.validate9")));
      } else {
        callback();
      }
    };
    return {
      emailForm: {
        email: "",
        code: ""
      },
      emailRules: {
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        code: [{ required: true, trigger: "blur", validator: validateCode }]
      },
      signForm: {
        username: "",
        password: "",
        checkPwd: ""
      },
      signRules: {
        username: [{ required: true, trigger: "change", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePass }],
        checkPwd: [{ required: true, trigger: "blur", validator: validateCheckPwd }]
      },
      loading: false,
      pwdType: "password",
      pwdType2: "password",
      login_center_bg,
      dialogVisible: false,
      supportDialogVisible: false,
      isAgree: false,
      showEmail: true,
      disabled: true,
      isSend: false,
      remaining: 60,
      timer: null,
      elementContentList: "",
      showTerms: false,
      showPrivacy: false
    };
  },
  watch: {
    "emailForm.email"(val) {
      if (!val) {
        this.disabled = true;
      } else if (!isvalidateEmail(val)) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  },
  created() {
    this.elementContentList = window.elementContentList;
  },
  methods: {
    handleSendCode() {
      this.disabled = true;
      this.isSend = true;
      this.timer = setInterval(() => {
        this.remaining--;
        if (this.remaining == 0) {
          clearInterval(this.timer);
          this.disabled = false;
          this.isSend = false;
          this.remaining = 60;
        }
      }, 1e3);
      registerAuthCodeSend(this.emailForm.email).then(() => {
      });
    },
    handleSignIn() {
      window.location.href = "/login";
    },
    // 查看协议
    handleShowAgreement(val) {
      if (val == "service") {
        this.showTerms = true;
      } else {
        this.showPrivacy = true;
      }
    },
    // 注册
    handleSignUp() {
      this.$refs.signForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const params = {
            account: this.emailForm.email,
            authCode: this.emailForm.code,
            nickName: this.signForm.username,
            password: this.signForm.password
          };
          register$2(params).then((res) => {
            if (res.code == 200) {
              this.$message.success({ message: this.elementContentList.portal_login_msg3 || this.$t("login.msg3"), duration: 1500 });
              this.loading = false;
              this.$router.push("/login");
            } else {
              this.loading = false;
            }
          }).catch(() => {
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    showPwd2() {
      if (this.pwdType2 === "password") {
        this.pwdType2 = "";
      } else {
        this.pwdType2 = "password";
      }
    },
    handleNext() {
      if (!this.isAgree) {
        return this.$message.error({
          message: this.elementContentList.portal_login_text14 || this.$t("login.text14"),
          duration: 1500
        });
      }
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          registerCheckAuthCodeSend(this.emailForm.email, this.emailForm.code).then((res) => {
            if (res.code == 200) {
              this.showEmail = false;
            } else {
              this.$message.error({ message: this.elementContentList.portal_login_msg2 || this.$t("login.msg2"), duration: 1500 });
            }
            this.loading = false;
          }).catch((err) => {
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
var _sfc_render$o = function render14() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "register flex_c_c" }, [_vm._m(0), _c("div", { staticClass: "login_main flex_c_c" }, [_c("div", { staticClass: "register_card" }, [_c("p", { staticClass: "p1" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_login_text2 || _vm.$t("login.text2")) + " ")]), _vm.showEmail ? _c("div", { staticClass: "form_card" }, [_c("el-form", { ref: "emailForm", attrs: { "autoComplete": "on", "model": _vm.emailForm, "rules": _vm.emailRules, "label-position": "top" } }, [_c("el-form-item", { attrs: { "prop": "email", "label": _vm.elementContentList.portal_navbar_form_label1 || _vm.$t("login.form.label1") } }, [_c("el-input", { attrs: { "name": "email", "type": "text", "autoComplete": "on", "placeholder": _vm.elementContentList.portal_login_form_placeholder1 || _vm.$t("login.form.placeholder1") }, model: { value: _vm.emailForm.email, callback: function($$v) {
    _vm.$set(_vm.emailForm, "email", $$v);
  }, expression: "emailForm.email" } })], 1), _c("el-form-item", { staticClass: "code", attrs: { "prop": "code", "label": _vm.elementContentList.portal_login_form_label3 || _vm.$t("login.form.label3") } }, [_c("el-input", { attrs: { "name": "code", "type": "text", "autoComplete": "on", "placeholder": _vm.elementContentList.portal_login_form_placeholder3 || _vm.$t("login.form.placeholder3") }, model: { value: _vm.emailForm.code, callback: function($$v) {
    _vm.$set(_vm.emailForm, "code", $$v);
  }, expression: "emailForm.code" } }), _c("el-button", { staticClass: "send_code", class: _vm.disabled ? "disabled" : "", attrs: { "type": "text", "disabled": _vm.disabled }, on: { "click": _vm.handleSendCode } }, [_vm._v(_vm._s(_vm.isSend ? _vm.elementContentList.portal_login_text7 || _vm.$t("login.text7") + ` (${_vm.remaining} s)` : _vm.elementContentList.portal_login_text6 || _vm.$t("login.text6")))])], 1)], 1), _c("div", { staticClass: "remember" }, [_c("el-checkbox", { model: { value: _vm.isAgree, callback: function($$v) {
    _vm.isAgree = $$v;
  }, expression: "isAgree" } }), _c("span", { staticClass: "agreement" }, [_vm._v(_vm._s(_vm.elementContentList.portal_login_text10 || _vm.$t("login.text10"))), _c("span", { on: { "click": function($event) {
    return _vm.handleShowAgreement("service");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_login_text11 || _vm.$t("login.text11")))]), _vm._v(", "), _c("span", { on: { "click": function($event) {
    return _vm.handleShowAgreement("privacy");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_login_text12 || _vm.$t("login.text12")))]), _vm._v(".")])], 1), _c("el-button", { staticClass: "register_btn", attrs: { "type": "primary", "loading": _vm.loading }, nativeOn: { "click": function($event) {
    $event.preventDefault();
    return _vm.handleNext.apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_btns_next || _vm.$t("btns.next")) + " ")])], 1) : _c("div", { staticClass: "form_card" }, [_c("el-form", { ref: "signForm", attrs: { "autoComplete": "on", "model": _vm.signForm, "rules": _vm.signRules, "label-position": "top" } }, [_c("el-form-item", { attrs: { "prop": "username", "label": _vm.elementContentList.portal_login_label6 || _vm.$t("login.form.label6") } }, [_c("el-input", { attrs: { "name": "username", "type": "text", "autoComplete": "on", "placeholder": _vm.elementContentList.portal_login_placeholder6 || _vm.$t("login.form.placeholder6") }, model: { value: _vm.signForm.username, callback: function($$v) {
    _vm.$set(_vm.signForm, "username", $$v);
  }, expression: "signForm.username" } })], 1), _c("el-form-item", { attrs: { "prop": "password", "label": _vm.elementContentList.portal_login_label7 || _vm.$t("login.form.label7") } }, [_c("el-input", { attrs: { "name": "password", "type": _vm.pwdType, "autoComplete": "on", "placeholder": _vm.elementContentList.portal_login_placeholder4 || _vm.$t("login.form.placeholder4") }, nativeOn: { "keyup": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleSignUp.apply(null, arguments);
  } }, model: { value: _vm.signForm.password, callback: function($$v) {
    _vm.$set(_vm.signForm, "password", $$v);
  }, expression: "signForm.password" } }, [_c("span", { attrs: { "slot": "suffix" }, on: { "click": _vm.showPwd }, slot: "suffix" }, [_c("i", { staticClass: "el-icon-view" })])])], 1), _c("el-form-item", { attrs: { "prop": "checkPwd", "label": _vm.elementContentList.portal_login_label5 || _vm.$t("login.form.label5") } }, [_c("el-input", { attrs: { "name": "checkPwd", "type": _vm.pwdType2, "autoComplete": "on", "placeholder": _vm.elementContentList.portal_login_placeholder5 || _vm.$t("login.form.placeholder5") }, nativeOn: { "keyup": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleSignUp.apply(null, arguments);
  } }, model: { value: _vm.signForm.checkPwd, callback: function($$v) {
    _vm.$set(_vm.signForm, "checkPwd", $$v);
  }, expression: "signForm.checkPwd" } }, [_c("span", { attrs: { "slot": "suffix" }, on: { "click": _vm.showPwd2 }, slot: "suffix" }, [_c("i", { staticClass: "el-icon-view" })])])], 1)], 1), _c("el-button", { staticClass: "register_btn", attrs: { "type": "primary", "loading": _vm.loading }, nativeOn: { "click": function($event) {
    $event.preventDefault();
    return _vm.handleSignUp.apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_login_text2 || _vm.$t("login.text2")) + " ")])], 1), _c("p", { staticClass: "have_account" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_login_text13 || _vm.$t("login.text13")) + " "), _c("span", { staticStyle: { "color": "#f6497f" }, on: { "click": _vm.handleSignIn } }, [_vm._v(_vm._s(_vm.elementContentList.portal_login_text5 || _vm.$t("login.text5")))])])])]), _vm.showTerms ? _c("terms") : _vm._e(), _vm.showPrivacy ? _c("privacyPolicy") : _vm._e()], 1);
};
var _sfc_staticRenderFns$o = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "logo flex_c_c" }, [_c("img", { attrs: { "src": __$_require_34d9fc4f__ } }), _c("img", { attrs: { "src": __$_require_1aca421e__ } })]);
}];
var __component__$o = /* @__PURE__ */ normalizeComponent(
  _sfc_main$o,
  _sfc_render$o,
  _sfc_staticRenderFns$o,
  false,
  null,
  null
);
const register = __component__$o.exports;
const register$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register
}, Symbol.toStringTag, { value: "Module" }));
function proDetail(params) {
  return service({
    url: "/product/detail",
    method: "get",
    params
  });
}
function proSerch(params) {
  return service({
    url: "/product/search",
    method: "get",
    params
  });
}
function checkProductSkuStock$1(params) {
  return service({
    url: "/product/checkProductSkuStock",
    method: "get",
    params
  });
}
function getVisibleSkuAttrValues$1(params) {
  return service({
    url: "/product/getVisibleSkuAttrValues",
    method: "get",
    params
  });
}
function getSkuDetail$1(params) {
  return service({
    url: "/product/getSkuDetail",
    method: "get",
    params
  });
}
function customPage(params) {
  return service({
    url: "/product/custom/page",
    method: "get",
    params
  });
}
function productSkuList(params) {
  return service({
    url: "product/sku/list",
    method: "get",
    params
  });
}
const _sfc_main$n = {
  props: {
    productSKUDetail: {
      type: Object,
      default: () => {
      }
    },
    productUid: {
      type: String,
      default: ""
    },
    productQuantity: {
      type: Number,
      default: 1
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      quantity: 1,
      attributeGroupValueVOs: [],
      productDetail: "",
      imageUrl: "",
      elementContentList: "",
      stock: 0,
      disabled: false,
      skuDetail: "",
      loading: false
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.quantity = this.productQuantity;
    this.getProDetail();
    this.getskuStock();
  },
  methods: {
    getProDetail() {
      const params = {
        productUid: this.productUid
      };
      proDetail(params).then((res) => {
        if (res.code == 200) {
          this.productDetail = res.data;
          this.imageUrl = res.data.picResourceVOs[0].preViewUrl;
          this.productDetail.attributeGroupValueVOs.map((item) => {
            let arr = [];
            item.attributeValueVOS.forEach((attr) => {
              let check = false;
              this.productSKUDetail.attributeValueVOs.map((sku) => {
                if (attr.productAttributeValueUid == sku.productAttributeValueUid) {
                  check = true;
                }
              });
              let obj = {
                ...attr,
                check
              };
              arr.push(obj);
            });
            let obj2 = {
              ...item,
              attributeValueVOS: arr
            };
            this.attributeGroupValueVOs.push(obj2);
          });
        }
      });
    },
    getskuStock() {
      let arr = [];
      this.productSKUDetail.attributeValueVOs.forEach((item) => {
        arr.push(item.productAttributeValueUid);
      });
      const params = {
        productAttributeValueUidList: arr,
        productBaseUid: this.productSKUDetail.productBaseUid
      };
      getVisibleSkuAttrValues$1(params).then((res) => {
      });
      getSkuDetail$1(params).then((res) => {
        this.skuDetail = res.data;
        this.stock = res.data.realStock;
      });
      checkProductSkuStock$1(params).then((res) => {
        if (!res.data) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      });
    },
    handleClose() {
      this.$parent.showProInfo = false;
    },
    handleConfirm() {
      this.loading = true;
      const params = {
        productBaseUid: this.productSKUDetail.productBaseUid,
        productSkuUid: this.skuDetail.productSkuStockUid,
        productUid: this.productUid,
        quantity: this.quantity
      };
      cartEdit(this.productSKUDetail.id, params).then((res) => {
        if (res.code == 200) {
          this.$parent.showProInfo = false;
          this.$message.success({ message: this.elementContentList.portal_cart_msg4 || this.$t("cart.msg4"), duration: 1500 });
          this.$emit("changeSKUUid", this.skuDetail, this.quantity, this.index);
        } else {
          this.$message.success({ message: res.message, duration: 1500 });
        }
      });
    },
    handleChangeAttr(parent, index2, val, idx) {
      this.attributeGroupValueVOs[index2].attributeValueVOS.forEach((item) => {
        if (item.productAttributeValueUid == val.productAttributeValueUid) {
          item.check = true;
        } else {
          item.check = false;
        }
      });
      let arr = [];
      let arr2 = [];
      this.attributeGroupValueVOs.forEach((item) => {
        item.attributeValueVOS.forEach((attr) => {
          if (attr.check) {
            arr.push(attr.productAttributeValueUid);
            arr2.push(attr.check);
          }
        });
      });
      const params = {
        productAttributeValueUidList: arr,
        productBaseUid: this.productDetail.productBaseUid
      };
      getVisibleSkuAttrValues$1(params).then((res) => {
      });
      getSkuDetail$1(params).then((res) => {
        this.skuDetail = res.data;
        if (arr2.length == this.attributeGroupValueVOs.length) {
          this.stock = res.data.realStock || 0;
        } else {
          this.stock = this.productDetail.realStock || this.totalStock;
        }
      });
      checkProductSkuStock$1(params).then((res) => {
        if (!res.data) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      });
    },
    handleInput() {
      this.quantity = this.quantity.replace(/[^\d]/g, "");
      if (this.quantity < 1) return this.quantity = 1;
      if (this.quantity >= 999) return this.quantity = 999;
    },
    handleMinusNum() {
      if (this.quantity <= 1) return false;
      this.quantity--;
    },
    handleAddNum() {
      if (this.quantity >= 999) return false;
      this.quantity++;
    }
  }
};
var _sfc_render$n = function render15() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "productInfo flex_c_c" }, [_c("div", { staticClass: "info_card" }, [_c("p", { staticClass: "dia_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text14 || _vm.$t("order.text14"))), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("div", { staticClass: "info_container" }, [_c("div", { staticClass: "info_left" }, [_c("div", { staticClass: "info_image" }, [_c("img", { attrs: { "src": _vm.imageUrl } })])]), _c("div", { staticClass: "info_right" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(" " + _vm._s(_vm.productDetail.name) + " ")]), _c("p", { staticClass: "unit_price" }, [_vm._v(" £ "), _c("span", [_vm._v(_vm._s(_vm.productDetail.price))])]), _vm._l(_vm.attributeGroupValueVOs, function(item, index2) {
    return _c("div", { key: index2 + "attribute" }, [_c("p", { staticClass: "spec_label" }, [_vm._v(_vm._s(item.productAttributeName))]), _c("div", { staticClass: "spec_color" }, _vm._l(item.attributeValueVOS, function(attr, idx) {
      return _c("div", { key: attr.productAttributeValueUid, staticClass: "spec_color_item flex", class: attr.check == true ? "active" : "", on: { "click": function($event) {
        return _vm.handleChangeAttr(item, index2, attr, idx);
      } } }, [_c("span", [_vm._v(_vm._s(attr.value))]), _c("div", { staticClass: "active_border" })]);
    }), 0)]);
  }), _c("p", { staticClass: "spec_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_product_text1 || _vm.$t("product.text1")))]), _c("div", { staticStyle: { "padding": "8px", "border": "1px solid #dfe2e5", "border-radius": "4px", "width": "fit-content", "min-width": "40px", "text-align": "center" } }, [_vm._v(" " + _vm._s(_vm.stock) + " ")]), _c("p", { staticClass: "spec_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text33 || _vm.$t("order.text33")) + " ")]), _c("p", { staticClass: "qty_btns flex" }, [_c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-minus" }, on: { "click": _vm.handleMinusNum } }), _c("el-input", { on: { "input": _vm.handleInput }, model: { value: _vm.quantity, callback: function($$v) {
    _vm.quantity = $$v;
  }, expression: "quantity" } }), _c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-plus" }, on: { "click": _vm.handleAddNum } })], 1), _c("p", { staticClass: "buy_btns" }, [_c("el-button", { staticClass: "btn", attrs: { "loading": _vm.loading, "disabled": _vm.disabled }, on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)], 2)])])]);
};
var _sfc_staticRenderFns$n = [];
var __component__$n = /* @__PURE__ */ normalizeComponent(
  _sfc_main$n,
  _sfc_render$n,
  _sfc_staticRenderFns$n,
  false,
  null,
  null
);
const productInfo$2 = __component__$n.exports;
const __$_require_5cbca94a__ = "/static/noData-j777ZXRm.png";
const _sfc_main$m = {
  name: "cart",
  components: {
    productInfo: productInfo$2
  },
  data() {
    return {
      subtotal: 1,
      priceTotal: 0,
      cartList: [],
      checkedList: [],
      productUid: "",
      productQuantity: "",
      showProInfo: false,
      elementContentList: "",
      isOpen: false,
      productSKUDetail: "",
      index: "",
      typeArr: []
    };
  },
  mounted() {
    this.elementContentList = window.elementContentList;
    this.getCartList();
  },
  methods: {
    changeSKUUid(val, qty, index2) {
      this.cartList[index2].attributeValueVOs = val.attributeValueVOs;
      this.cartList[index2].priceTotal = val.attributeValueVOs;
      this.cartList[index2] = {
        ...this.cartList[index2],
        ...val,
        productSkuUid: val.productSkuStockUid,
        priceTotal: val.price * qty,
        quantity: qty
      };
    },
    handleEdit(val, index2) {
      this.productUid = val.productUid;
      this.productQuantity = val.quantity;
      this.productSKUDetail = val;
      this.index = index2;
      this.showProInfo = true;
    },
    getCartList() {
      fetchList({ pageNum: 1, pageSize: 1e3 }).then((res) => {
        if (res.code == 200) {
          let data = [];
          res.data.list.map((item) => {
            let obj = {
              ...item,
              priceTotal: item.price * item.quantity,
              check: false
            };
            data.push(obj);
          });
          this.cartList = data;
          this.getPriceTotal();
        }
      });
    },
    handleToCheckout() {
      let isGroup = false;
      if (this.typeArr.length > 1) isGroup = true;
      this.$router.push({ path: "/settlement", query: { from: "cart", cartIds: JSON.stringify(this.checkedList), isGroup } });
    },
    handleChange() {
      let arr = [], arr2 = [];
      this.cartList.forEach((item) => {
        if (item.check) {
          arr.push(Number(item.id));
          arr2.push(item.productType);
        }
      });
      this.checkedList = arr;
      this.typeArr = [...new Set(arr2)];
      this.getPriceTotal();
    },
    getPriceTotal() {
      let price = 0;
      this.cartList.forEach((item) => {
        if (item.check) {
          price = price + item.quantity * item.price;
        }
      });
      this.priceTotal = price;
    },
    handleMinusNum(idx, val) {
      if (this.cartList[idx].quantity <= 1) return false;
      const params = {
        productBaseUid: val.productBaseUid,
        productSkuUid: val.productSkuUid,
        productUid: val.productUid,
        quantity: val.quantity--
      };
      cartEdit(val.id, params).then((res) => {
        if (res.code == 200) {
          this.cartList[idx].quantity--;
          this.cartList[idx].priceTotal = this.cartList[idx].quantity * this.cartList[idx].price;
          if (this.cartList[idx].check) {
            this.getPriceTotal();
          }
        } else {
          this.$message.success({ message: res.message, duration: 1500 });
        }
      });
    },
    handleAddNum(idx, val) {
      if (this.cartList[idx].quantity >= 999) return false;
      const params = {
        productBaseUid: val.productBaseUid,
        productSkuUid: val.productSkuUid,
        productUid: val.productUid,
        quantity: val.quantity++
      };
      cartEdit(val.id, params).then((res) => {
        if (res.code == 200) {
          this.cartList[idx].quantity++;
          this.cartList[idx].priceTotal = this.cartList[idx].quantity * this.cartList[idx].price;
          if (this.cartList[idx].check) {
            this.getPriceTotal();
          }
        } else {
          this.$message.success({ message: res.message, duration: 1500 });
        }
      });
    },
    handleInput(idx, val) {
      this.cartList[idx].quantity = this.cartList[idx].quantity.replace(/[^\d]/g, "");
      if (this.cartList[idx].quantity < 1) {
        this.cartList[idx].quantity = 1;
        return false;
      }
      if (this.cartList[idx].quantity >= 999) {
        this.cartList[idx].quantity = 999;
        return false;
      }
      const params = {
        productBaseUid: val.productBaseUid,
        productSkuUid: val.productSkuUid,
        productUid: val.productUid,
        quantity: val.quantity
      };
      cartEdit(val.id, params).then((res) => {
        if (res.code == 200) {
          this.cartList[idx].priceTotal = this.cartList[idx].quantity * this.cartList[idx].price;
          if (this.cartList[idx].check) {
            this.getPriceTotal();
          }
        } else {
          this.$message.success({ message: res.message, duration: 1500 });
        }
      });
    },
    handleRemove(val, idx) {
      if (val.productType == "custom") {
        const h = this.$createElement;
        let text1 = this.elementContentList.portal_cart_msg2 || this.$t("cart.msg2");
        let text2 = this.elementContentList.portal_cart_msg3 || this.$t("cart.msg3");
        let text3 = this.elementContentList.portal_btns_remove || this.$t("btns.remove");
        let text4 = this.elementContentList.portal_btns_cancel || this.$t("btns.cancel");
        this.$msgbox({
          message: h("div", null, [
            h("p", { style: "font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;" }, text1),
            h("p", null, text2)
          ]),
          cancelButtonClass: "cancel_btn",
          confirmButtonClass: "confirm_btn",
          showCancelButton: true,
          confirmButtonText: text3,
          cancelButtonText: text4,
          type: "warning"
        }).then(() => {
          cartDelete(val.id).then((res) => {
            if (res.code == 200) {
              this.cartList.splice(idx, 1);
              this.$message.success({ message: this.elementContentList.portal_cart_msg1 || this.$t("cart.msg1"), duration: 1500 });
              this.$store.dispatch("UpdateCartNum");
            }
          });
        }).catch(() => {
        });
      } else {
        cartDelete(val.id).then((res) => {
          if (res.code == 200) {
            this.cartList.splice(idx, 1);
            this.$message.success({ message: this.elementContentList.portal_cart_msg1 || this.$t("cart.msg1"), duration: 1500 });
            this.$store.dispatch("UpdateCartNum");
          }
        });
      }
    }
  }
};
var _sfc_render$m = function render16() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "shopping_cart" }, [_c("div", { staticClass: "cart" }, [_c("h1", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text1 || _vm.$t("cart.text1")))]), _c("div", { staticClass: "cart_main" }, [_vm.cartList.length > 0 ? _c("div", { staticClass: "cart_list" }, _vm._l(_vm.cartList, function(item, idx) {
    return _c("div", { key: idx + "c", staticClass: "cart_item" }, [item.productType == "normal" ? _c("div", { staticClass: "item" }, [_c("div", { staticClass: "flex" }, [_c("el-checkbox", { on: { "change": _vm.handleChange }, model: { value: item.check, callback: function($$v) {
      _vm.$set(item, "check", $$v);
    }, expression: "item.check" } })], 1), _c("div", { staticClass: "pro_img" }, [_c("img", { attrs: { "src": item.productPicUrl } })]), _c("div", { staticClass: "pro_detail" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(item.productName))]), _vm._l(item.attributeValueVOs, function(it) {
      return _c("p", { key: it.productAttributeUid, staticClass: "pro_style" }, [_vm._v(" " + _vm._s(it.productAttributeName) + ": "), _c("span", [_vm._v(_vm._s(it.value))])]);
    }), _c("p", { staticClass: "quantity" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text4 || _vm.$t("cart.text4")))]), _c("el-input", { on: { "input": function($event) {
      return _vm.handleInput(idx, item);
    } }, model: { value: item.quantity, callback: function($$v) {
      _vm.$set(item, "quantity", $$v);
    }, expression: "item.quantity" } }), _c("el-button", { staticClass: "btn btn3", attrs: { "icon": "el-icon-arrow-up" }, on: { "click": function($event) {
      return _vm.handleAddNum(idx, item);
    } } }), _c("el-button", { staticClass: "btn btn2", attrs: { "icon": "el-icon-arrow-down" }, on: { "click": function($event) {
      return _vm.handleMinusNum(idx, item);
    } } })], 1)], 2), _c("div", { staticClass: "price" }, [_c("p", [_vm._v("£ " + _vm._s(item.priceTotal))]), _c("div", [_c("span", { staticClass: "edit", on: { "click": function($event) {
      return _vm.handleEdit(item, idx);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))]), _c("span", { on: { "click": function($event) {
      return _vm.handleRemove(item, idx);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_remove || _vm.$t("btns.remove")))])])])]) : _vm._e(), item.productType == "package" ? _c("div", { staticClass: "item" }, [_c("div", { staticClass: "flex" }, [_c("el-checkbox", { on: { "change": _vm.handleChange }, model: { value: item.check, callback: function($$v) {
      _vm.$set(item, "check", $$v);
    }, expression: "item.check" } })], 1), _c("div", { staticClass: "pro_img" }, [_c("img", { attrs: { "src": item.productPicUrl } })]), _c("div", { staticClass: "pro_detail" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(item.productName))]), _vm._l(item.packageProductVOList, function(it) {
      return _c("div", { key: it.packageProductSkuUid, staticClass: "pro_package" }, [_c("div", { staticClass: "pack_item flex_b_c" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "pack_img" }, [_c("img", { attrs: { "src": it.productSkuStockThumbnail } })]), _c("div", [_c("span", [_vm._v(_vm._s(it.packageProductName + ":"))]), _vm._l(it.attributeValueVOs, function(attr, idx2) {
        return _c("span", { key: attr.productAttributeUid }, [_vm._v(_vm._s(attr.value + (idx2 == it.attributeValueVOs.length - 1 ? "" : ",")))]);
      })], 2)]), _c("div", [_vm._v(_vm._s("x" + it.num))])])]);
    }), _c("p", { staticClass: "quantity" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text4 || _vm.$t("cart.text4")))]), _c("el-input", { on: { "input": function($event) {
      return _vm.handleInput(idx);
    } }, model: { value: item.quantity, callback: function($$v) {
      _vm.$set(item, "quantity", $$v);
    }, expression: "item.quantity" } }), _c("el-button", { staticClass: "btn btn3", attrs: { "icon": "el-icon-arrow-up" }, on: { "click": function($event) {
      return _vm.handleAddNum(idx);
    } } }), _c("el-button", { staticClass: "btn btn2", attrs: { "icon": "el-icon-arrow-down" }, on: { "click": function($event) {
      return _vm.handleMinusNum(idx);
    } } })], 1)], 2), _c("div", { staticClass: "price" }, [_c("p", [_vm._v("£ " + _vm._s(item.priceTotal))]), _c("div", [_c("span", { staticClass: "edit", on: { "click": function($event) {
      return _vm.handleEdit(item, idx);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))]), _c("span", { on: { "click": function($event) {
      return _vm.handleRemove(item, idx);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_remove || _vm.$t("btns.remove")))])])])]) : _vm._e(), item.productType == "custom" ? _c("div", { staticClass: "item" }, [_c("div", { staticClass: "flex" }, [_c("el-checkbox", { on: { "change": _vm.handleChange }, model: { value: item.check, callback: function($$v) {
      _vm.$set(item, "check", $$v);
    }, expression: "item.check" } })], 1), _vm._m(0, true), _c("div", { staticClass: "pro_detail" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(item.productName))]), _vm._l(item.cartCusObjItemVOS, function(it) {
      return _c("p", { key: it.cartCusItemId, staticClass: "pro_style" }, [_c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.objNickname))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s((it.height ? it.height + "cm" : "") + (it.weight ? it.weight + "kg" : "")))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.ratio))]), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v("£ " + _vm._s(it.price))])]);
    }), _c("div", { staticClass: "pro_info" }, [_c("p", { on: { "click": function($event) {
      _vm.isOpen = !_vm.isOpen;
    } } }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text11 || _vm.$t("cart.text11")))]), !_vm.isOpen ? _c("i", { staticClass: "el-icon-arrow-down" }) : _c("i", { staticClass: "el-icon-arrow-up" })]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.isOpen, expression: "isOpen" }], staticStyle: { "margin-top": "16px" } }, _vm._l(item.cartCusServiceItemVOS, function(pro) {
      return _c("div", { key: pro.cartCusItemId, staticClass: "pro_item flex" }, [_c("div", { staticClass: "flex_c_c img" }, [_c("img", { attrs: { "src": pro.productPicUrl } })]), _c("div", { staticClass: "pro_name" }, [_c("div", { staticClass: "name" }, [_vm._v(_vm._s(pro.productName))]), _c("div", [_c("span", [_vm._v(_vm._s("x " + pro.quantity))]), _c("span", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(pro.price))])])])]);
    }), 0)])], 2), _c("div", { staticClass: "price" }, [_c("p", [_vm._v("£ " + _vm._s(item.priceTotal))]), _c("div", [_c("span", { on: { "click": function($event) {
      return _vm.handleRemove(item, idx);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_remove || _vm.$t("btns.remove")))])])])]) : _vm._e()]);
  }), 0) : _vm._e(), _vm.cartList.length == 0 ? _c("div", { staticClass: "cart_list nodata flex_c_c" }, [_vm._m(1), _c("p", { staticStyle: { "margin": "22px 0" } }, [_vm._v(_vm._s("Shopping cart is empty"))])]) : _vm._e(), _c("div", { staticClass: "settlement" }, [_c("p", { staticClass: "subtotal" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_cart_text7 || _vm.$t("cart.text7")) + " (" + _vm._s(_vm.subtotal) + _vm._s(_vm.elementContentList.portal_cart_text8 || _vm.$t("cart.text8")) + ") ")]), _c("hr"), _c("p", { staticClass: "price_total" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_cart_text9 || _vm.$t("cart.text9")) + _vm._s(_vm.priceTotal) + " ")]), _c("el-button", { staticClass: "checkout", attrs: { "disabled": _vm.checkedList.length == 0 }, on: { "click": _vm.handleToCheckout } }, [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text10 || _vm.$t("cart.text10")))])], 1)])]), _vm.showProInfo ? _c("productInfo", { attrs: { "productUid": _vm.productUid, "productQuantity": _vm.productQuantity, "productSKUDetail": _vm.productSKUDetail, "index": _vm.index }, on: { "changeSKUUid": _vm.changeSKUUid } }) : _vm._e()], 1);
};
var _sfc_staticRenderFns$m = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "pro_img flex_c_c", staticStyle: { "background": "linear-gradient(0deg, #ffe0e0 2%, #ffdce9 100%)" } }, [_c("img", { staticStyle: { "width": "120px", "height": "120px" }, attrs: { "src": __$_require_6d02fb8e__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", [_c("img", { attrs: { "src": __$_require_5cbca94a__ } })]);
}];
var __component__$m = /* @__PURE__ */ normalizeComponent(
  _sfc_main$m,
  _sfc_render$m,
  _sfc_staticRenderFns$m,
  false,
  null,
  null
);
const index$c = __component__$m.exports;
const index$d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = {
  setup() {
  }
};
var _sfc_render$l = function render17() {
  var _vm = this, _c = _vm._self._c;
  return _c("div");
};
var _sfc_staticRenderFns$l = [];
var __component__$l = /* @__PURE__ */ normalizeComponent(
  _sfc_main$l,
  _sfc_render$l,
  _sfc_staticRenderFns$l,
  false,
  null,
  "e938b04a"
);
const _404 = __component__$l.exports;
const _404$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _404
}, Symbol.toStringTag, { value: "Module" }));
const __$_require_c74407d4__ = "/static/indexTop-90GaTCtn.png";
const _sfc_main$k = {
  name: "footerBar",
  components: {
    terms,
    privacyPolicy
  },
  data() {
    return {
      elementContentList: "",
      showTerms: false,
      showPrivacy: false
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
  },
  methods: {
    // 查看协议
    handleShowAgreement(val) {
      if (val == "service") {
        this.showTerms = true;
      } else {
        this.showPrivacy = true;
      }
    }
  }
};
var _sfc_render$k = function render18() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "footer_bar" }, [_c("div", { staticClass: "footer_container" }, [_vm._m(0), _c("div", { staticClass: "cooperate" }, _vm._l(3, function(item) {
    return _c("div", { key: item, staticClass: "Navigation" }, [_c("p", [_vm._v("Navigation")]), _c("p", [_vm._v("Navigation")]), _c("p", [_vm._v("Navigation")]), _c("p", [_vm._v("Navigation")])]);
  }), 0)]), _c("div", { staticClass: "company" }, [_c("span", { staticClass: "link", on: { "click": function($event) {
    return _vm.handleShowAgreement("service");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_foot_text1 || _vm.$t("foot.text1")))]), _c("span", [_vm._v("|")]), _c("span", { staticClass: "link", on: { "click": function($event) {
    return _vm.handleShowAgreement("privacy");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_foot_text2 || _vm.$t("foot.text2")))])]), _vm.showTerms ? _c("terms") : _vm._e(), _vm.showPrivacy ? _c("privacyPolicy") : _vm._e()], 1);
};
var _sfc_staticRenderFns$k = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "footer_logo" }, [_c("p", [_c("img", { attrs: { "src": __$_require_c74407d4__ } })]), _c("p", [_vm._v("Print Your Magic Moments")])]);
}];
var __component__$k = /* @__PURE__ */ normalizeComponent(
  _sfc_main$k,
  _sfc_render$k,
  _sfc_staticRenderFns$k,
  false,
  null,
  null
);
const footerBar = __component__$k.exports;
function buyGenerateConfirmOrder(data) {
  return service({
    url: "/order/buy/generateConfirmOrder",
    method: "post",
    data
  });
}
function buyGenerateOrder(data) {
  return service({
    url: "/order/buy/generateOrder",
    method: "post",
    data
  });
}
function generateConfirmOrder(cartIds) {
  return service({
    url: `/order/generateConfirmOrder?cartIds=${cartIds}`,
    method: "post"
  });
}
function generateOrder(data) {
  return service({
    url: "/order/generateOrder",
    method: "post",
    data
  });
}
function groupGenerateOrder(data) {
  return service({
    url: "/order/group/generateOrder",
    method: "post",
    data
  });
}
function groupGenerateConfirmOrder(cartIds) {
  return service({
    url: `/order/group/generateConfirmOrder?cartIds=${cartIds}`,
    method: "post"
  });
}
function confirmReceiveOrder(orderId) {
  return service({
    url: `/order/confirmReceiveOrder?orderId=${orderId}`,
    method: "post"
  });
}
function deleteOrder(orderId) {
  return service({
    url: `/order/deleteOrder?orderId=${orderId}`,
    method: "post"
  });
}
function cancelUserOrder(orderId) {
  return service({
    url: `/order/cancelUserOrder?orderId=${orderId}`,
    method: "post"
  });
}
function orderDetail(orderId) {
  return service({
    url: `/order/detail/${orderId}`,
    method: "get"
  });
}
function orderSearch(data) {
  return service({
    url: "/order/search",
    method: "post",
    data
  });
}
function afterApply(data) {
  return service({
    url: "/order/after/apply",
    method: "post",
    data
  });
}
function afterDetail(params) {
  return service({
    url: "/order/after/detail",
    method: "get",
    params
  });
}
function customGenerateConfirmOrder(customUid) {
  return service({
    url: `/order/buy/custom/generateConfirmOrder?customUid=${customUid}`,
    method: "post"
  });
}
function customGenerateOrder(data) {
  return service({
    url: `/order/buy/custom/generateOrder`,
    method: "post",
    data
  });
}
function confirmPrint(orderId) {
  return service({
    url: `/order/confirmPrint?orderId=${orderId}`,
    method: "post"
  });
}
function refusePrint(orderId) {
  return service({
    url: `/order/refusePrint?orderId=${orderId}`,
    method: "post"
  });
}
const _sfc_main$j = {
  name: "Video",
  props: {
    src: {
      // 视频文件url，必传，支持网络地址 https 和相对地址 require('@/assets/files/Bao.mp4')
      type: String,
      required: true,
      default: ""
    },
    poster: {
      // 视频封面url，支持网络地址 https 和相对地址 require('@/assets/images/Bao.jpg')
      type: String,
      default: ""
    },
    second: {
      // 在未设置封面时，自动截取视频第 second 秒对应帧作为视频封面
      type: Number,
      default: 0.5
    },
    width: {
      // 视频播放器宽度
      type: Number,
      default: 800
    },
    height: {
      // 视频播放器高度
      type: Number,
      default: 450
    },
    /*
      参考 MDN 自动播放指南：https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide
      Autoplay 功能
      据新政策，媒体内容将在满足以下至少一个的条件下自动播放：
      1.音频被静音或其音量设置为 0
      2.用户和网页已有交互行为（包括点击、触摸、按下某个键等等）
      3.网站已被列入白名单；如果浏览器确定用户经常与媒体互动，这可能会自动发生，也可能通过首选项或其他用户界面功能手动发生
      4.自动播放策略应用到<iframe>或者其文档上
      autoplay：由于目前在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，
      已不再允许自动播放音频和视频。就算你为video或audio标签设置了autoplay属性也一样不能自动播放！
      解决方法：设置视频 autoplay 时，视频必须设置为静音 muted: true 即可实现自动播放，
      然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑
    */
    autoplay: {
      // 视频就绪后是否马上播放
      type: Boolean,
      default: false
    },
    controls: {
      // 是否向用户显示控件，比如进度条，全屏
      type: Boolean,
      default: true
    },
    loop: {
      // 视频播放完成后，是否循环播放
      type: Boolean,
      default: false
    },
    muted: {
      // 是否静音
      type: Boolean,
      default: false
    },
    preload: {
      // 是否在页面加载后载入视频，如果设置了autoplay属性，则preload将被忽略；
      type: String,
      default: "metadata"
      // auto:一旦页面加载，则开始加载视频; metadata:当页面加载后仅加载视频的元数据 none:页面加载后不应加载视频
    },
    showPlay: {
      // 播放暂停时是否显示播放器中间的暂停图标
      type: Boolean,
      default: true
    },
    playWidth: {
      // 中间播放暂停按钮的边长
      type: Number,
      default: 96
    },
    zoom: {
      // video的poster默认图片和视频内容缩放规则
      type: String,
      default: "contain"
      // none:(默认)保存原有内容，不进行缩放; fill:不保持原有比例，内容拉伸填充整个内容容器; contain:保存原有比例，内容以包含方式缩放; cover:保存原有比例，内容以覆盖方式缩放
    }
  },
  data() {
    return {
      veoPoster: this.poster,
      originPlay: true,
      hidden: false
    };
  },
  mounted() {
    if (this.autoplay) {
      this.hidden = true;
      this.originPlay = false;
    }
  },
  methods: {
    /*
      loadeddata 事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发
      preload为none时不会触发
    */
    getPoster() {
      this.$refs.veo.currentTime = this.second;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = this.$refs.veo.videoWidth;
      canvas.height = this.$refs.veo.videoHeight;
      ctx.drawImage(this.$refs.veo, 0, 0, canvas.width, canvas.height);
      this.veoPoster = canvas.toDataURL("image/png");
    },
    onPlay() {
      if (this.originPlay) {
        this.$refs.veo.currentTime = 0;
        this.originPlay = false;
      }
      if (this.autoplay) {
        this.$refs.veo.pause();
      } else {
        this.hidden = true;
        this.$refs.veo.play();
      }
    },
    onPause() {
      this.hidden = false;
    },
    onPlaying() {
      this.hidden = true;
    }
  }
};
var _sfc_render$j = function render19() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "m-video", class: { "u-video-hover": !_vm.hidden }, style: `width: ${_vm.width}px; height: ${_vm.height}px;` }, [_c("video", _vm._b({ ref: "veo", style: `object-fit: ${_vm.zoom};`, attrs: { "src": _vm.src, "poster": _vm.veoPoster, "width": _vm.width, "height": _vm.height, "autoplay": _vm.autoplay, "controls": !_vm.originPlay && _vm.controls, "loop": _vm.loop, "preload": _vm.preload, "crossorigin": "anonymous" }, domProps: { "muted": _vm.autoplay || _vm.muted }, on: { "loadeddata": function($event) {
    _vm.poster ? () => false : _vm.getPoster();
  }, "pause": function($event) {
    _vm.showPlay ? _vm.onPause() : () => false;
  }, "playing": function($event) {
    _vm.showPlay ? _vm.onPlaying() : () => false;
  }, "~click": function($event) {
    $event.preventDefault();
    return _vm.onPlay.apply(null, arguments);
  } } }, "video", _vm.$attrs, false), [_vm._v(" 您的浏览器不支持video标签。 ")]), _c("svg", { directives: [{ name: "show", rawName: "v-show", value: _vm.originPlay || _vm.showPlay, expression: "originPlay || showPlay" }], staticClass: "u-play", class: { "hidden": _vm.hidden }, style: `width: ${_vm.playWidth}px; height: ${_vm.playWidth}px;`, attrs: { "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", "d": "M15.25 12L9.75 8.75V15.25L15.25 12Z" } })])]);
};
var _sfc_staticRenderFns$j = [];
var __component__$j = /* @__PURE__ */ normalizeComponent(
  _sfc_main$j,
  _sfc_render$j,
  _sfc_staticRenderFns$j,
  false,
  null,
  "7f508e47"
);
const Video = __component__$j.exports;
const _sfc_main$i = {
  name: "product",
  components: {
    footerBar,
    Video
  },
  data() {
    return {
      imageAct: 0,
      imageUrl: "",
      videoUrl: "",
      mediaList: [],
      quantity: 1,
      showIndex: 0,
      multipleIdx: 1,
      multiple: 1,
      recommendList: [],
      Loading: false,
      coverLayerStyle: {
        transform: ""
      },
      coverLayerImg: {},
      coverLayerShow: false,
      productDetail: "",
      skuDetail: "",
      attributeGroupValueVOs: [],
      poster: "",
      showSkuList: false,
      stock: 0,
      disabled: true,
      elementContentList: "",
      totalStock: 0
    };
  },
  watch: {
    "stock": (val) => {
    }
  },
  mounted() {
    this.elementContentList = window.elementContentList;
    this.getProDetail();
  },
  methods: {
    getProDetail() {
      const params = {
        productUid: this.$route.query.uid
      };
      proDetail(params).then((res) => {
        if (res.code == 200) {
          this.productDetail = res.data;
          this.recommendList = res.data.recFormVOs || [];
          this.stock = res.data.totalStock;
          this.totalStock = res.data.totalStock;
          this.mediaList = this.productDetail.picResourceVOs;
          this.mediaList.splice(1, 0, res.data.videoResourceVOs[0]);
          this.poster = res.data.videoResourceVOs[0].masterPic;
          this.imageUrl = this.mediaList[0].preViewUrl;
          this.productDetail.attributeGroupValueVOs.map((item) => {
            let arr = [];
            item.attributeValueVOS.forEach((attr) => {
              let obj = {
                ...attr,
                check: false
              };
              arr.push(obj);
            });
            let obj2 = {
              ...item,
              attributeValueVOS: arr
            };
            this.attributeGroupValueVOs.push(obj2);
          });
          if (this.attributeGroupValueVOs.length == 0 || this.attributeGroupValueVOs.length == 1 && this.attributeGroupValueVOs[0].attributeValueVOS.length <= 1) {
            this.showSkuList = false;
            this.handleChangeAttr2();
          } else {
            this.showSkuList = true;
          }
        }
      });
    },
    getProSku() {
      const params = {
        productBaseUid: 0
      };
      proSku(params).then((res) => {
      });
    },
    // 鼠标进入原图空间函数
    enterHandler() {
      this.coverLayerShow = true;
    },
    // 鼠标移动函数
    moveHandler(event) {
      let x = event.offsetX;
      let y = event.offsetY;
      let topX = x - 100 < 0 ? 0 : x - 100;
      let topY = y - 100 < 0 ? 0 : y - 100;
      if (topX > 250) {
        topX = 250;
      }
      if (topY > 250) {
        topY = 250;
      }
      this.coverLayerStyle.transform = `translate(${topX}px,${topY}px)`;
      this.coverLayerImg.transform = `translate(-${topX}px,-${topY}px)`;
    },
    // 鼠标移出函数
    outHandler() {
      this.coverLayerShow = false;
    },
    handleMinusIndx() {
      if (this.showIndex == 1) return false;
      this.showIndex = this.showIndex - 4;
      this.multiple--;
    },
    handleAddIndx() {
      if (this.showIndex == Math.ceil(this.recommendList.length / 4)) return false;
      this.showIndex = this.showIndex + 4;
      this.multiple++;
    },
    handleChangeAttr2() {
      let arr = [];
      this.attributeGroupValueVOs.forEach((item) => {
        item.attributeValueVOS.forEach((attr) => {
          arr.push(attr.productAttributeValueUid);
        });
      });
      const params = {
        productAttributeValueUidList: arr,
        productBaseUid: this.productDetail.productBaseUid
      };
      getVisibleSkuAttrValues$1(params).then((res) => {
      });
      getSkuDetail$1(params).then((res) => {
        this.skuDetail = res.data;
      });
      checkProductSkuStock$1(params).then((res) => {
        if (!res.data) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      });
    },
    handleBuyNow() {
      if (!this.showSkuList) {
        this.handleChangeAttr2();
      }
      const params = {
        productBaseUid: this.productDetail.productBaseUid,
        productSkuUid: this.skuDetail.productSkuStockUid,
        productUid: this.productDetail.productUid,
        quantity: this.quantity
      };
      buyGenerateConfirmOrder(params).then((res) => {
        if (res.code == 200) {
          this.$router.push({ path: "/settlement", query: { from: "now", params: JSON.stringify(res.data) } });
        }
      });
    },
    handleAddToCart() {
      if (!this.showSkuList) {
        this.handleChangeAttr2();
      }
      const params = {
        productBaseUid: this.productDetail.productBaseUid,
        productSkuUid: this.skuDetail.productSkuStockUid,
        productUid: this.productDetail.productUid,
        quantity: this.quantity
      };
      cartAdd(params).then((res) => {
        if (res.code == 200) {
          this.$message.success({ message: this.elementContentList.portal_product_text6 || this.$t("product.text6"), duration: 1500 });
          this.$store.dispatch("UpdateCartNum");
        }
      });
    },
    handleInput() {
      this.quantity = this.quantity.replace(/[^\d]/g, "");
      if (this.quantity < 1) return this.quantity = "";
    },
    handleMinusQty() {
      if (this.quantity <= 1) return false;
      this.quantity--;
    },
    handleAddQty() {
      this.quantity++;
    },
    handleChangeAttr(parent, index2, val, idx) {
      this.attributeGroupValueVOs[index2].attributeValueVOS.forEach((item) => {
        if (item.productAttributeValueUid == val.productAttributeValueUid) {
          item.check = true;
        } else {
          item.check = false;
        }
      });
      let arr = [];
      let arr2 = [];
      this.attributeGroupValueVOs.forEach((item) => {
        item.attributeValueVOS.forEach((attr) => {
          if (attr.check) {
            arr.push(attr.productAttributeValueUid);
            arr2.push(attr.check);
          }
        });
      });
      const params = {
        productAttributeValueUidList: arr,
        productBaseUid: this.productDetail.productBaseUid
      };
      getVisibleSkuAttrValues$1(params).then((res) => {
      });
      getSkuDetail$1(params).then((res) => {
        this.skuDetail = res.data;
        if (arr2.length == this.attributeGroupValueVOs.length) {
          this.stock = res.data.realStock || 0;
        } else {
          this.stock = this.productDetail.realStock || this.totalStock;
        }
      });
      checkProductSkuStock$1(params).then((res) => {
        if (!res.data) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      });
    },
    handleChangeImage(val, index2) {
      if (val.playUrl) {
        this.videoUrl = val.playUrl;
        this.imageUrl = "";
      } else {
        this.imageUrl = val.preViewUrl;
        this.videoUrl = "";
      }
      this.imageAct = index2;
    }
  }
};
var _sfc_render$i = function render20() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "product" }, [_c("div", { staticClass: "pro_container" }, [_c("div", { staticClass: "pro_basic_info" }, [_c("div", { staticClass: "image_info" }, [_c("div", { staticClass: "image_view" }, [_vm.videoUrl ? _c("video", { attrs: { "src": _vm.videoUrl, "autoplay": "", "controls": "" } }) : _vm._e(), _vm.imageUrl ? _c("img", { attrs: { "src": _vm.imageUrl } }) : _vm._e(), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.coverLayerShow && _vm.imageUrl, expression: "coverLayerShow && imageUrl" }], staticClass: "coverLayerMouse", style: _vm.coverLayerStyle }), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageUrl, expression: "imageUrl" }], staticClass: "coverLayerMaskTop", on: { "mouseenter": _vm.enterHandler, "mousemove": _vm.moveHandler, "mouseout": _vm.outHandler } }), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.coverLayerShow && _vm.imageUrl, expression: "coverLayerShow && imageUrl" }], staticClass: "coverLayerRight" }, [_c("img", { staticClass: "coverLayerRightImg", style: _vm.coverLayerImg, attrs: { "src": _vm.imageUrl, "fit": "contain" } })])]), _c("div", { staticClass: "image_list" }, _vm._l(_vm.productDetail.picResourceVOs, function(item, index2) {
    return _c("div", { key: index2 + "img", staticClass: "image_item", class: _vm.imageAct == index2 ? "active" : "" }, [item.playUrl ? _c("video", { attrs: { "src": item.playUrl }, on: { "click": function($event) {
      return _vm.handleChangeImage(item, index2);
    } } }) : _c("img", { attrs: { "src": item.thumbnailViewUrl }, on: { "click": function($event) {
      return _vm.handleChangeImage(item, index2);
    } } }), _c("div", { staticClass: "active_border" })]);
  }), 0)]), _c("div", { staticClass: "spec_info" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(_vm.productDetail.name))]), _c("p", { staticClass: "unit_price" }, [_vm._v(" £ "), _c("span", [_vm._v(_vm._s(_vm.productDetail.price))])]), _vm._l(_vm.attributeGroupValueVOs, function(item, index2) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showSkuList, expression: "showSkuList" }], key: index2 + "attribute" }, [_c("p", { staticClass: "spec_label" }, [_vm._v(_vm._s(item.productAttributeName))]), _c("div", { staticClass: "spec_color" }, _vm._l(item.attributeValueVOS, function(attr, idx) {
      return _c("div", { key: attr.productAttributeValueUid, staticClass: "spec_color_item flex_c_c", class: attr.check == true ? "active" : "", on: { "click": function($event) {
        return _vm.handleChangeAttr(item, index2, attr, idx);
      } } }, [_c("span", [_vm._v(_vm._s(attr.value))]), _c("div", { staticClass: "active_border" })]);
    }), 0)]);
  }), _c("p", { staticClass: "spec_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_product_text1 || _vm.$t("product.text1")) + " ")]), _c("div", { staticStyle: { "padding": "8px", "border": "1px solid #dfe2e5", "border-radius": "4px", "width": "fit-content", "min-width": "40px", "text-align": "center" } }, [_vm._v(" " + _vm._s(_vm.stock) + " ")]), _c("p", { staticClass: "spec_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_product_text2 || _vm.$t("product.text2")) + " ")]), _c("p", { staticClass: "qty_btns flex" }, [_c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-minus" }, on: { "click": _vm.handleMinusQty } }), _c("el-input", { on: { "input": _vm.handleInput }, model: { value: _vm.quantity, callback: function($$v) {
    _vm.quantity = $$v;
  }, expression: "quantity" } }), _c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-plus" }, on: { "click": _vm.handleAddQty } })], 1), _c("p", { staticClass: "buy_btns" }, [_c("el-button", { staticClass: "btn", attrs: { "disabled": _vm.disabled }, on: { "click": _vm.handleBuyNow } }, [_vm._v(_vm._s(_vm.elementContentList.portal_product_btns_btn1 || _vm.$t("product.btns.btn1")))]), _c("el-button", { staticClass: "btn btn2", attrs: { "disabled": _vm.disabled }, on: { "click": _vm.handleAddToCart } }, [_vm._v(_vm._s(_vm.elementContentList.portal_product_btns_btn2 || _vm.$t("product.btns.btn2")))])], 1)], 2)]), _c("div", { staticClass: "pro_details_info" }, [_c("div", { staticClass: "pro_about" }, [_c("p", { staticClass: "pro_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_product_text3 || _vm.$t("product.text3")) + " ")]), _c("p", { staticClass: "pro_subtitle" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_product_text4 || _vm.$t("product.text4")) + " ")]), _c("div", { staticClass: "pro_desc" }, _vm._l(_vm.productDetail.detailVOs, function(item, index2) {
    return _c("p", { key: index2 + "detail" }, [item.type == "word" ? _c("span", [_vm._v(_vm._s(item.detailDesc))]) : _c("img", { attrs: { "src": item.detailImageUrl } })]);
  }), 0), _vm.recommendList.length > 0 ? _c("p", { staticClass: "pro_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_product_text5 || _vm.$t("product.text5")) + " ")]) : _vm._e(), _vm.recommendList.length > 0 ? _c("div", { staticClass: "recommend" }, [_c("div", { staticClass: "recommend_roll flex" }, [_vm.recommendList.length > 4 ? _c("div", { staticClass: "to_left", class: _vm.multiple == 1 ? "disabled" : "" }, [_c("i", { staticClass: "el-icon-arrow-left", on: { "click": _vm.handleMinusIndx } })]) : _vm._e(), _c("div", { staticClass: "rec_list" }, _vm._l(_vm.recommendList, function(item, idx) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showIndex <= idx, expression: "showIndex <= idx" }], key: idx + "r", staticClass: "rec_item" }, [_c("div", { staticClass: "rec_iamge" }, [_c("img", { attrs: { "src": item.masterPicUrl } })]), _c("p", { staticClass: "rec_title" }, [_vm._v(_vm._s(item.recProductName))]), _c("div", { staticClass: "rec_label flex" }), _c("div", { staticClass: "rec_btn flex_b_c" }, [_c("span", { staticClass: "price" }, [_vm._v("£ " + _vm._s(item.price))]), _c("el-button", { staticClass: "btn" }, [_vm._v(_vm._s(_vm.elementContentList.portal_product_btns_btn2 || _vm.$t("product.btns.btn2")))])], 1)]);
  }), 0), _vm.recommendList.length > 4 ? _c("div", { staticClass: "to_right", class: _vm.multiple == Math.ceil(this.recommendList.length / 4) ? "disabled" : "", on: { "click": _vm.handleAddIndx } }, [_c("i", { staticClass: "el-icon-arrow-right" })]) : _vm._e()])]) : _vm._e()])])]), _c("footerBar")], 1);
};
var _sfc_staticRenderFns$i = [];
var __component__$i = /* @__PURE__ */ normalizeComponent(
  _sfc_main$i,
  _sfc_render$i,
  _sfc_staticRenderFns$i,
  false,
  null,
  null
);
const index$a = __component__$i.exports;
const index$b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$a
}, Symbol.toStringTag, { value: "Module" }));
function qrcode(data) {
  return service({
    url: "/payment/qrcode",
    method: "post",
    data
  });
}
function groupQrcode(data) {
  return service({
    url: "/payment/group/qrcode",
    method: "post",
    data
  });
}
function ispay(payBillUid) {
  return service({
    url: `/payment/ispay?payBillUid=${payBillUid}`,
    method: "get"
  });
}
const _sfc_main$h = {
  data() {
    return {
      actIdx: 0,
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
  },
  methods: {
    handleConfirm() {
      this.$emit("payment", "PAYPAL");
    },
    handleChange(val) {
      this.actIdx = val;
    },
    handleClosePay() {
      this.$parent.showPayMethod = false;
    }
  }
};
var _sfc_render$h = function render21() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "pay flex_c_c" }, [_c("div", { staticClass: "pay_card" }, [_c("p", { staticClass: "pay_title" }, [_vm._v(_vm._s(_vm.elementContentList.portal_pay_title || _vm.$t("pay.title"))), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClosePay } })]), _c("div", { staticClass: "method_list" }, _vm._l(1, function(item, index2) {
    return _c("div", { key: item, staticClass: "m_item", class: index2 % 2 == 1 ? "mr_0" : "", on: { "click": function($event) {
      return _vm.handleChange(index2);
    } } }, [_c("p", { staticClass: "card_name" }, [_vm._v(_vm._s("paypal"))]), _c("p", [_vm._v(_vm._s("paypal"))]), _c("div", { staticClass: "border", class: _vm.actIdx == index2 ? "active" : "" }), _vm.actIdx == index2 ? _c("div", [_c("i", { staticClass: "el-icon-success" })]) : _vm._e()]);
  }), 0), _c("p", { staticClass: "btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleClosePay } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]), _c("el-button", { staticClass: "btn btn2", on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)])]);
};
var _sfc_staticRenderFns$h = [];
var __component__$h = /* @__PURE__ */ normalizeComponent(
  _sfc_main$h,
  _sfc_render$h,
  _sfc_staticRenderFns$h,
  false,
  null,
  null
);
const pay = __component__$h.exports;
const __$_require_3a8b7ec4__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAm8SURBVHicxVzdjhtJFf5O2zOJYZLYT0DnCfBecYVwEEiAFjJ7hxBIzhPsmM3AZrO7bhOUBG528gTx3q0IEKPcjLhgvEJoIy2svLxAmieIBVnNZOyujwv3f1fbXe2250jWqNrtOud89dU5p6q6R3CBcv6zw7ZYbFLEBtis0brmKf4HADxF9zLqrnzy0L1IG2Wbymbd2x2LuEmgDaIDCEj/S/rmpNvgFJQxwU93Ts+HMjqabtPmjQPE7oE9g9WxKH1A7AAA0lcdApJq+2Axe8+YlEeX/vBgtGHTAys2I+we2Ar1twkeZJyn6BzPgAPAZ5iOWXBBGew+uT/clA+hpqpl3v1lF5A+KDaAhHOMOwtkwTEET4AxRHq7T+5PqvbD11adLFhT6xPobog1uf2R7F3+84OjKv2JaV1f2D2wPdROQNhaZ4F8cNLg6cApAJ4Awx2105ORU1kgrwQgdg/bCuopM1NKIp/zHMtz3P+9tr800In+ONnFzo2qQFoboPPuYduiOgGkGXduZZby2yzAmjB2FekPgBCTXalXApK1zo/ZPbAtqqcJcCgp4wu0E2Ck24ja4ScHLP8aKe1zz3u8jm+BlAaI3YOmYv1pvLYJpgDjjsQdi9U2jGe0nPtJARPFZAy88P5IJ2ODQ2D/9Zsf9sv6F0hpgBTrfb8iRsCKKD7ksCaXJTntVf0FzZzfE3C++vH7+2V9BErGoFn3dkcUToAlWSUVbNdO8an20v5iU45K3Mu78kbZeFQv8yNLyUcE8w0rGHgBmYjiSBFfKuEUc7iow4aiXbNq34RCl0BT5/iqrBi2Bfb5ubwNYFDGV2MGnf/isGuBjwtnFZ1zwNATDBoFVuqn++93LOHjoCrP9JczGEyDRbneOHZW6kuLMYMsoJ+d7zFDlk83FwqD3ScPh0X1NUa/HQO4fr7/wUckD0wr7Jh9fQC3iuoNxChIz35+u0PA1o6in1UW2SSVpRb3uJ7ghgk4cdkd3espJbfy0n+QxaIMimRWBDpl9BoBJCL9wrVNPGspmXoWbhSZUsuk8ezeUBG91VnQtyEuFPvV952uqc7CALF70CTRztQ2TNY2GUMpoPJurQtOIF97du9IwGGCOYGu8G/WRhKwxLppqq8wQPN5vQ1KM2lEPP7kjur40p9+X+nmlprVBqC4CaYGg7WUWeyY6io+xWjdzK2Ic1gFAh5ZKr0uk8ax4xIYa7drQ2bF4iEQgNX83/ecjokugxgkbdOKmIDb+OPDsYlBhcWTQREb0mtDgdU2UVM8BinaSdYgniEyf0lAiI3tGzeOHRcUNxNrAH2t5H9vAd8w0VMYIIHYobJ01qKeWZ6SL02MMRUBJnF9ufYl2mLEoEKFIn/6rj0LhmVFYZiofZRyTYwxFRLTgNV5TI4VqQGrjaQQQGcAagV2+7TtDYoQU2biT44N/mASaJroKL7UyFk+LNsqtSBGxpgKYTVJaoCIbMjGIzObzNZihqt3wrKN+jcUku0irElNN6Ntj0JBuvHJw1S2gL6CTX0E8h0TY0yEHaeZPXeLwNLWZwuwXBM9JoXiNDKmYD0E7HPf2cg0e1VHG+FeUYG1YWRf9QzyNU2g2yNOrJglUYuQgjPPW2vLM09qsPrpqj2xokfcJkT3KBqVHgYMCmqOoK2Z+xrDRNA//YFjmxi1ShbLBenksia0L8tq1mh0RF28kiY+1Z5W+MqTFXZi1Gxrx+ubGLVMXnacZo3W43gWTbI6oz9u33QObzMA7Xqn48yoFNwXIqX7+s3B2iC97DjNS7XaSXjUlFPBa9sLeyatsdnmffGlxuhoCsgoPaXCtU/OFAvaisp5/aPyIJ12HHsBzuKoKdQb6MupoBPZVvEvpnrNzsWU97F2rhfbF4KCck5/6JyYxqRX3/1Nl1Y9BGdplgoGK2ODNZ3tnA9N9AY9G8nZ/t0X0WlqPmv051vRNSFGFDy6fIaJaGj/suM0dyxr3wL6ENHvg8f6C65lTjPCthzt/ePdnqm/xgCd7r/XFdYeRwZqjM6cLMRUpRylwhQCVygTAPCfEGkiZAvyHdf1lwPkzMP11vM7rqG75U5Wz37ywQsAtq68L3wyugLgoM1U/yv704Gn5GjvM3P2ACXP5kkMtLHAJKtA8/tV7SK7h9l9oens9GxQxk+gJECNZ/eGIMKMZliLRKxIfR9Vw1hdEev6Q7Y/j2rQmpR/Tqj84y/zWg+A/6DU6lENi8wMS5DfBpLgpNuJrKXrTybXPntvrecWSwPUOHZcUoY6FqSDdXLtFrs/BlZ0EpszpUIWrn5eKOyPqlTcictaT5gtThbELR1bltYtGqBW9RfeD4AYX3l+Z7yWf1gToMax43rKf6wkEX+iWIK8j39vyDDNd2FfKNZfEI+oZDoHb63jWyDrMQjA3rEzRLAJFY83sXaCWTEmZKYUcphklrUAwVGZmkcnawMEAEotHigIRxnQB85UlsrGo6gdPxldFog1/U3nZ6ePqvALqAigr//VGQEyBJAIlIXihQlrCvRHpXrrpPW0VAIQAEDUIK8WQXqUg3s06Xola3T9ReCNr35+Z1iZT6gQoMax4wrFKZZlSsaWVW3PK10x50l1DAKAufcxCDeZgZask8LaJspAmnSdYg1S/S3+imB45Z/rp/W0VApQY+y4KrZOy5565tQ+ywL7kiwY1VMynb2unj1A1QwCsPe3D4eAuIVrm/C6fvkQ1jY5azf/c9SaVJPW01I5QACglLwFQJ+lTLPWiqxIwJ3P65Wl9bRsBKC98d0JKMNCWSpnioWsAZBhTXANAij2WpPexl703QhAAHCO2aBwRVx+X2h89V+/3ujLvRsDqDV2XBBO4lnBJbVNZh8ohzVBViSBecnXC0xENq3gq2/ff0HALr/ZHlyLgjYAiMLRlS8O197OWCUbY1AgHjjIY83KCjtoZ2PXdK7qG2cPsAWArv797hCQSZUVNsnBJgNzXDYOEADM5nwrUw0D2opYWzkn73GvfXFY+evfebIVgBZ7M/72LIAiWYs5zPJUNRthRWUrAAHATHGAxb+TWFYR69du0ffj1uRwvC2bgS0C1Hp+Z7HJD+TXOivij8fZVtkTWLVV+e+3fvdCKHZ4YVWKD6ccnGuTd7aSueKyNQaFooJ3LGCQtTBVsDa23lomWwfo6ue/GgoxjFfE8dV7el1GAgrYWlpPy/YZBGA28/TrNM3qXSDj1uSdraX1tFwIQK3JHVeAo6WreT82edjMRlhRuRCAAGA+r/tvDfqim2JKnG2n9bRcGECtSW/qKesNAKPEih4AKS4ozrV/9y6UPcAFpHmdvGw/sIHdDoAmPLqo1cYXFZTT8n/LXY1Gg4+DxgAAAABJRU5ErkJggg==";
const __$_require_2d971d39__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAXbSURBVHic7ZxbctpIFIb/0yIXUqSKWUE0K4iyA/khVSIvmawgeAVjr4BmBSYrCF6BKy8xVXmAWYHJCkZZAVSZRPbE6jMPtGZkqdsCcwlI/l5suiXR/HX6qC/nNGFHiIJuR5E6IqCpi0L9dwwgVFDfcOOMGl/keJvtom1+mY3LQPoO8XCRaxmYEjBWUJ9+Rk7/t5GcbrJtOyFQFHQ7TEre8/bRJsUS637gfVDEX1e43RcQJ4/r/HcUdDsTXzaLb1mcnbAgwOiD7gUDU8Gid3XFH9ZhUTsjUMIkkG7y/2OCx4ymIH4JwGPAW0LAMGY6fD6Qo1Xas3MCFaEd+lsG2guK1buOqHtfa9o7gdJosToA/IJLQ2I6qA9kuOx37LVACbPX0hM1PsEdQjEwVUzvlu1ypRAoQVvUCQDPdo1iOmwMZH/RZ5ZKoIRZSx4J8ImtnljI+qDTXeRZpRQIAGZvpCeYzwC4pnoFOm6cy17Rc0orEABEgXSZ+AyWLhczHRT5pFILBAATXzaf1HkIg0jzQSW9uuvtVnqBEn60OhcwW1L47Lz7u+2+nZiLbYPriA7w/xJKGvdHq2N36Btr0Q6ifdIQBsdt80eVsSAAqA9kqIjemeoc4o+m8koJBACNz3JMLKShyo2CbidbWKkuluZHq/M38l0tN2ernAUlqBtjV3MBep8uqKxAjS9yTEz9bDmTaqc/V1YgjWk+5s4C2U4+VFqg+kCGJisSwPvU/9XmBjjNFRL7kV76rbxAenAYZstjvfhWeYEAgJhG2bKkmz0IBHM3Y2IPqPBAMcv3VmeS3SWJmQ4eLEhDTLmgCKLYexAogTgnkIB48SCQRjHl4wOYHiwogU2LacTNGgB8b8k/BNPLG/Bfq+5l7ysUY4parrgpZi15ROAzJiUd4qFpTaQK/HRg2rt3BYFvCbJCIFMpEaYIiXQIStV5cNIFCBi896N4tSivEhEKIO+c2KmeQI/JvD0twJQTiCwb/mWG2WgUY2EcYs9jAiuF5TeHQkF9yxUzWQOQSkzuNyumr4LZyVlQshZSJdgU2BBjLExTCwKal4H0t9CuneAykH52PMjAtPFFjufjIMOSYy21sl92HOK32TKaJ9HMB4rKvOTob7xlOwID7WyZgvoEaIEcYGS4z61CNzN1LwD4GTl9QAtUH8iwqt1MB6JnGSWR+f/NxSzdrB2VeOI6ey09GILPk+4FpATSwdWh4TmlXR/S0fm3YGCadC8gM5snFv3cDcRtrXSp0P7Vz5YLFr104ktmuYNPYbAiUeOzNbfvl6NTFm7BwPTqij+ky24JNI92yFsRLOFp+8qsJY9gGDlnrQew7KxawtOgiF41Pm8363jd6BSFC0NVeB3Rq6xAxhXFmOnQVC6Yz/b5rRYF0tX5GzlipkNT0p1RID0/MyV6uEw8XHfi7DaY+LKp8zZcQ3XPtt1lXZO+jqgLS2S6zn3YK2z5Gph3LWtq1J3RHVEgXUV8YckNHV9HdLDpxP5VWTWZ5c5djfpAhorNkekAvCd1Hu6yT4oC6T6psy2JBYrpXVEea+G2z/OBHCnQsaXaY+Lh7M3uDSRnb6Rny8sA5qmZi2yzL7Qv1jiXPUv4PgC4gvlCjy12gijodvSr3DXVEwu5aN7qUhFms0C2hSXpQzOOmY5/VQCEzn62pmECi6diJiwdgncZSF8QnxUk9Y/UDR1v6ygb7Qc7TNy2XbPVtPC78q4yjGKm7qYs6jKQfg14f5cwmu0fLKBfnx0Ahb5Hn/nTj5k+rSpWShQfi21w9p6dd20vmUJWjnLVyfwfseBubHJAEoCxYvpKhOk/jFxXfBSjyQ6aBLiC+CWYPCbez8NNJr5sPn1Kf67jeJs1EBKL/qIHBxSx1jjpXyyUXqrh0/v4GhsbCSSf+LL5qB63BcRbFJ/MshpMIwWcLnMexzJsPNI+LdaSByTZ0aI4wGid1mJi66kIs9fSQy32BcQLzB17Mk1xM5eGAKZgmoJ4rKC+MTvjbQ9C/wVBm5rK5iikNwAAAABJRU5ErkJggg==";
const __$_require_018479ae__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAXNSURBVHic7ZxNVuNGEMf/JRkYA0nMCUY3iHOCyIu8J7MZ5gSYEwT2YdxOsoc5AcwJgM3g97IYzwlwToBuYE8w9hBsVRaWg7E+3C3LUjPP/2W7VS1+dLX6o6qBlVZaaaX8RHk0OnCE9UjDsgGyTDZ/ZOISGCUmlIjRfXo5cgFyH+nxb2NYcLf/Eu2s3zUTQGyLUu8VygVgn4ltAFYiO0CXgJbHdPUItHaawk3zPcO0VEB3jrBN4jcM1AgoLaGJyyFGH76//vNyCbYBLAmQD6YOwF6G/RC5HlNjuynO0zacKiC2RWlQ5DMAe2naVZD7wFRJ0/WMtAz1qseH/SLfIj84AGBtEN/2q/WTtAwu3IM06DVRSqU3LQSo4whrg/gTEn6Vli0GugAdbF2LxIN4Yhfr7YryOvENNIUDAASUCHzRqx4fJrWRCFBvV5SJ+dOSPt2py4Bxcu+8qyd5VtnFOo6w1olvXgqcaXlMB6pTASVAuo85MhoxVb5ripZsfSUXe+lwAMAgvug4wpKuL1vR92Fpw7qKgNIG8ZlsfSlA/1R/2yMikfit9JM9cBpSg7YUoALM1Gamusgj71DG1eYC+lZca1ayrhYLqOMIi4hqqb2VfrLvHGHHVYgFtEajPbyc3uN68I5GTJURU8WDdwTAnfeQvy0Tqdh5UL9av8ULAMSE880+HVFLdKfL/XnbBYBy3PNxc6PIHtRzRA0vBM7Wx8bBLBwA2GkKd8R0NM9GAfRz1G+RgAziN/KvmY8mcOLq+D3DjavjkRe5mA0FxLYoQb/9nWeSgfNUOR4QAaWowToU0F1xGFpZFynBAQCaP1SYER4TCshkU1v3UoXjTwatuXYjDhjCxyCKH/XzknLPwf8L7LkioOwPLc8UCojmfBbzUBI497v1Myh8ie/XgnUDgHq/iG8GDjFqSg2ZwY4RAMSmXjuFmcEBYIJez5YFAJFGk8Ms4Yzb8+TGIB2UNRwAIKYAoMJsgQl6zWAlwwx0DaZLJu6CUQYtdiafB5woBQCNaPjFUOtYp5sDakyvhRbZ3NcJDhDmYmwGFn1RYsb55nUjsIreaQr3gakCie2GZ/Y0gwMsOAb9C2pE/aYKSQ845M6WBAGNIBXmxkB7XmDAFKRYm3rAGQ8vs2UBQKYJWRezZCrtNIVbHERD0gUOAHhgd7YsAKjYFO44KiJeBJRkD+CoJbphkHSCAwDGsOAGysIq0hyXmEjlAG4Wkm5wACAsijYcEBstSZu2vyCU0gQSsSF0gwNGK6w4FNAQ/FnWLjFqypCa9civX5iWDgeAR95VWHkooO2vaMuMQxMRo5ZmXOC0soADABiarbDicBdriS4B54pNHCYNUopSZnCAyCj+yIniiCm0y8WJiERakDKEA4+jJ7yRgPzjkpZqY2lAyhIOADzG/J2xSw2P6UOSBheBlDUcZpzHrQhiAfnxfJEPxykJpKzhAPHrSUBiscqYf3QbJRVIecBhZjFvPSkVxNmv1j9hgcQUZhZbzd9D/1Nsi1J/k0+yhgPALQ7op7Az/WlJbXc8MB2ozItmNe5J9bPZtdudI+xBkW9ygAOPn2/yRUk6DLhXPT40YCw8GfRBuwCsHGOtTzevG1JDh/SG2fb1H6dMypPHgMbpASjnCMctDuIH5mkp7Shu9ukIkit9TeU+MFVkXGsiJUDUEt0HprdI+OnPUwx0PaK3qulRidKhXlpKAgNdJqpsf1TPmk60aZ/01CInuUnhAAsm1GmcbTjRwlmHqST13jvv6rqlKkRFvqoqtaxnXcYlBrrMdJRWinjqefP+hPJX5APqtDiQmyHLaikXC3QcYa3D2/fTGKxltDGRf13F+QPT+2VcVbH0uzt6jqgZ4P1FIz5mxUDbYOPy1Vd+n2aPmVVmt790HGGtAbYfoF6GYs/ye0rbg3fFbLZV0ioXUS7X4wBPN8IQjcomF34AxhFe4yCmcRDBiIZfPLC7xoV2MYObXlZaaaWVdNN/rOXNMwi3CD4AAAAASUVORK5CYII=";
const _sfc_main$g = {
  name: "settlement",
  components: {
    pay
  },
  data() {
    return {
      num: 12,
      addressList: [],
      payList: [{}],
      actAddress: 0,
      normalAddr: "",
      customAddr: "",
      actPay: 0,
      disabled: false,
      isChooseAddr: false,
      ShowChooseAddr: false,
      // 地址弹窗
      showAddressInfo: false,
      ShowChoosePay: true,
      showPayInfo: false,
      isChooseReview: false,
      ShowChooseReview: false,
      showReviewInfo: false,
      showSaveBtn: "",
      step: "pay",
      isOrder: true,
      showEditForm: false,
      formData: {
        country: "United Kingdom",
        name: "",
        phoneNumber: "",
        postCode: "",
        detailAddress: "",
        detailAddressTwo: "",
        city: "",
        region: "",
        defaultStatus: 0,
        memberId: ""
      },
      formRules: {
        name: [{ required: true, trigger: "blur", message: "Please enter a name" }],
        phoneNumber: [{ required: true, trigger: "blur", message: "Please enter a phone number so we can call if there are any issues with delivery" }],
        postCode: [{ required: true, trigger: "blur", message: "Please enter a ZIP or postal code" }],
        detailAddress: [{ required: true, trigger: "blur", message: "Please enter an address" }],
        city: [{ required: true, trigger: "blur", message: "Please enter a city name" }]
      },
      cartIds: [],
      from: "",
      orderDetail: "",
      payCode: "",
      showPayCode: false,
      orderId: "",
      method: 1,
      payResult: "",
      paypalHrefLink: "",
      showPayMethod: false,
      loading: false,
      elementContentList: "",
      customList: [],
      normalList: [],
      type: "normal",
      ActMethod: 1,
      isGroup: false
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.from = this.$route.query.from;
    if (this.from == "cart") {
      this.getGenerateConfirmOrder();
    } else if (this.from == "now") {
      let data = JSON.parse(this.$route.query.params);
      this.orderDetail = data;
      this.normalList = data.confirmOrderItemList;
    } else if (this.from == "nowCustom") {
      let data = JSON.parse(this.$route.query.params);
      this.orderDetail = data;
      this.customList = data.confirmOrderItemList;
    }
    this.getAddressList();
  },
  methods: {
    // 打开地址选择弹窗
    handleShowAddr(val) {
      this.type = val;
      if (this.type == "custom" && this.customAddr != "") {
        this.addressList.map((item, index2) => {
          if (item.id == this.customAddr.id) this.actAddress = index2;
        });
      } else if (this.type == "normal" && this.normalAddr != "") {
        this.addressList.map((item, index2) => {
          if (item.id == this.normalAddr.id) this.actAddress = index2;
        });
      }
      this.ShowChooseAddr = true;
    },
    // 关闭地址选择弹窗
    handleCloseAddr() {
      this.ShowChooseAddr = false;
    },
    // 确认选择地址
    handleConfirmAddr() {
      this.ShowChooseAddr = false;
      if (this.type == "custom") {
        this.customAddr = this.addressList[this.actAddress];
        this.ActMethod = this.method;
      } else {
        this.normalAddr = this.addressList[this.actAddress];
      }
    },
    // 修改定制商品配送方式
    handleChangeMethod(val) {
      this.method = val;
    },
    // 关闭支付弹窗
    handleClose() {
      this.showPayCode = false;
    },
    // 
    getGenerateConfirmOrder() {
      this.cartIds = JSON.parse(this.$route.query.cartIds);
      this.isGroup = JSON.parse(this.$route.query.isGroup);
      ({
        cartIds: this.cartIds + ""
      });
      if (this.isGroup) {
        groupGenerateConfirmOrder(this.cartIds + "").then((res) => {
          this.orderDetail = res.data;
          this.orderDetail.calcAmount = res.data.calcGroupAmount;
          this.customList = [];
          this.normalList = [];
          res.data.orderResultVOS.forEach((item) => {
            if (item.confirmCartItemList[0].productType == "custom") {
              this.customList = item.confirmCartItemList;
            } else {
              this.normalList = item.confirmCartItemList;
            }
          });
        });
      } else {
        generateConfirmOrder(this.cartIds + "").then((res) => {
          this.orderDetail = res.data;
          this.customList = [];
          this.normalList = [];
          res.data.confirmCartItemList.forEach((item) => {
            if (item.productType == "custom") {
              this.customList.push(item);
            } else {
              this.normalList.push(item);
            }
          });
        });
      }
    },
    handleToOrder() {
      this.$router.push({ path: "/my/order", query: { orderId: this.orderId } });
    },
    handleChangeAgain(val) {
      this.disabled = true;
      this.ShowChoosePay = true;
      this.ShowChooseReview = false;
      this.showReviewInfo = true;
      this.showSaveBtn = "pay";
    },
    handleSaveAgain() {
      this.disabled = false;
      this.ShowChoosePay = false;
      this.ShowChooseReview = true;
      this.showReviewInfo = false;
      this.showSaveBtn = "";
    },
    handleSavePay() {
      this.ShowChoosePay = false;
      this.isChooseReview = true;
      this.ShowChooseReview = true;
      this.showReviewInfo = false;
      this.showSaveBtn = "";
      this.step = "review";
    },
    handleCheckResult() {
      ispay(this.payResult.payBillId).then((res) => {
        let settlemenData = {
          orderId: this.orderId,
          addressInfo: this.normalAddr,
          productList: this.orderDetail,
          payResult: this.payResult
        };
        if (res.data) {
          this.$router.push({ path: "/order/pay/success", query: { settlemenData: JSON.stringify(settlemenData) } });
        } else {
          this.$router.push({ path: "/order/pay/fail", query: { settlemenData: JSON.stringify(settlemenData) } });
        }
      });
    },
    handleSaveRev() {
      this.loading = true;
      if (this.from == "cart") {
        if (this.isGroup) {
          let orderRequests = [];
          if (this.customList.length > 0) {
            let obj = {
              cartIds: [this.customList[0].id],
              deliveryType: this.ActMethod,
              memberAddressId: this.ActMethod == 1 ? Number(this.customAddr.id) : "",
              note: "",
              payType: 1,
              sourceType: 0
            };
            orderRequests.push(obj);
          }
          if (this.normalList.length > 0) {
            let cartIds = [];
            this.normalList.map((item) => {
              cartIds.push(item.id);
            });
            let obj = {
              cartIds,
              deliveryType: 1,
              memberAddressId: this.ActMethod == 1 ? Number(this.normalAddr.id) : "",
              note: "",
              payType: 1,
              sourceType: 0
            };
            orderRequests.push(obj);
          }
          const params = {
            orderRequests,
            payType: 1
          };
          groupGenerateOrder(params).then((res) => {
            this.showSaveBtn = "";
            this.orderId = res.data;
            this.$store.dispatch("UpdateCartNum");
            const params2 = {
              orderGroupId: res.data,
              payToolType: "PAYPAL"
            };
            groupQrcode(params2).then((resp) => {
              this.loading = false;
              this.showPayCode = true;
              this.payResult = resp.data;
              this.paypalHrefLink = resp.data.paypalHrefLink;
              window.open(resp.data.paypalHrefLink);
            }).catch(() => {
              this.loading = false;
            });
          }).catch(() => {
            this.loading = false;
          });
        } else {
          const params = {
            cartIds: this.cartIds,
            memberAddressId: this.normalAddr ? Number(this.normalAddr.id) : Number(this.customAddr.id),
            note: "",
            payType: 1,
            sourceType: 0,
            deliveryType: this.ActMethod
          };
          generateOrder(params).then((res) => {
            this.showSaveBtn = "";
            this.orderId = res.data;
            this.$store.dispatch("UpdateCartNum");
            const params2 = {
              orderId: res.data,
              payToolType: "PAYPAL"
            };
            qrcode(params2).then((resp) => {
              this.loading = false;
              this.showPayCode = true;
              this.payResult = resp.data;
              this.paypalHrefLink = resp.data.paypalHrefLink;
              window.open(resp.data.paypalHrefLink);
            }).catch(() => {
              this.loading = false;
            });
          }).catch(() => {
            this.loading = false;
          });
        }
      } else if (this.from == "now") {
        const params = {
          deliveryType: this.method,
          memberAddressId: Number(this.normalAddr.id),
          note: "",
          payType: 10,
          sourceType: 0,
          productBaseUid: this.orderDetail.confirmOrderItemList[0].productBaseUid,
          productSkuUid: this.orderDetail.confirmOrderItemList[0].productSkuUid,
          productUid: this.orderDetail.confirmOrderItemList[0].productUid,
          quantity: this.orderDetail.confirmOrderItemList[0].quantity,
          deliveryType: this.method
        };
        buyGenerateOrder(params).then((res) => {
          this.showSaveBtn = "";
          this.orderId = res.data;
          this.$store.dispatch("UpdateCartNum");
          const params2 = {
            orderId: res.data,
            payToolType: "PAYPAL"
          };
          qrcode(params2).then((resp) => {
            this.loading = false;
            this.showPayCode = true;
            this.payResult = resp.data;
            this.paypalHrefLink = resp.data.paypalHrefLink;
            window.open(resp.data.paypalHrefLink);
          }).catch(() => {
            this.loading = false;
          });
        }).catch(() => {
          this.loading = false;
        });
      } else if (this.from == "nowCustom") {
        const params = {
          customUid: this.orderDetail.customUid,
          deliveryType: this.method,
          memberAddressId: Number(this.customAddr.id),
          note: "",
          payType: 10,
          sourceType: 0
        };
        customGenerateOrder(params).then((res) => {
          this.showSaveBtn = "";
          this.orderId = res.data;
          this.$store.dispatch("UpdateCartNum");
          const params2 = {
            orderId: res.data,
            payToolType: "PAYPAL"
          };
          qrcode(params2).then((resp) => {
            this.loading = false;
            this.showPayCode = true;
            this.payResult = resp.data;
            this.paypalHrefLink = resp.data.paypalHrefLink;
            window.open(resp.data.paypalHrefLink);
          }).catch(() => {
            this.loading = false;
          });
        }).catch(() => {
          this.loading = false;
        });
      }
    },
    handleMinusNum(idx) {
    },
    handleAddNum(idx) {
    },
    handleInput(idx) {
    },
    handleChangePay(val, idx) {
      this.actPay = idx;
    },
    handleConfirm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const params = {
            ...this.formData,
            defaultStatus: this.formData.defaultStatus ? 1 : 0
          };
          updateAddress(params, this.formData.id).then((res) => {
            if (res.code == 200) {
              this.getAddressList();
              this.showEditForm = false;
              this.$message.success({ message: this.elementContentList.portal_settlement_msg1 || this.$t("settlement.msg1"), duration: 1500 });
            }
          });
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.showEditForm = false;
    },
    getAddressList() {
      addressList().then((res) => {
        let data = res.data;
        let index2 = "";
        let defaultAdd = "";
        data.forEach((item, idx) => {
          if (item.defaultStatus) {
            defaultAdd = item;
            index2 = idx;
          }
        });
        data.splice(index2, 1);
        data.unshift(defaultAdd);
        this.addressList = data;
      });
    },
    handleEditAddress(val, idx) {
      addressInfo(val.id).then((res) => {
        if (res.code == 200) {
          this.formData = res.data;
          this.showEditForm = true;
        }
      });
    },
    handleChangeAddress(val, idx) {
      this.actAddress = idx;
    }
  }
};
var _sfc_render$g = function render22() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "settlement" }, [_vm.isOrder ? _c("div", { staticClass: "settlement_container" }, [_vm._m(0), _c("div", { staticClass: "set_main" }, [_c("div", { staticClass: "main_left" }, [_c("div", { staticClass: "pay_card" }, [_c("div", { staticClass: "card_head" }, [_c("div", { staticClass: "card_title" }, [_c("span", [_vm._v("1")]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_title2 || _vm.$t("settlement.title2")))])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: !_vm.ShowChoosePay, expression: "!ShowChoosePay" }], staticClass: "add_info" }, [_c("div", { staticClass: "info_left" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_settlement_text5 || _vm.$t("settlement.text5")) + " ")])]), _c("div", { staticClass: "info_right" }, [_c("el-button", { staticClass: "btn", attrs: { "type": "text" }, on: { "click": function($event) {
    return _vm.handleChangeAgain("pay");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_change || _vm.$t("btns.change")))])], 1)]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showSaveBtn == "pay", expression: "showSaveBtn == 'pay'" }] }, [_c("el-button", { staticStyle: { "padding": "0", "color": "#f6497f" }, attrs: { "type": "text" }, on: { "click": function($event) {
    return _vm.handleSaveAgain();
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_save || _vm.$t("btns.save")))])], 1)]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.ShowChoosePay, expression: "ShowChoosePay" }], staticClass: "pay_list" }, _vm._l(_vm.payList, function(item, index2) {
    return _c("div", { key: index2 + "ad", staticClass: "addr_item", class: _vm.actPay == index2 ? "active" : "", style: index2 % 3 == 2 ? { marginRight: 0 } : "", on: { "click": function($event) {
      return _vm.handleChangePay(item, index2);
    } } }, [_vm._m(1, true), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_settlement_text5 || _vm.$t("settlement.text5")) + " ")]), _c("p", { staticClass: "pay_de" }, [index2 == 0 ? _c("span", { staticClass: "defualt" }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_default || _vm.$t("btns.default")))]) : _vm._e()])]);
  }), 0)]), _c("div", { staticClass: "review_card" }, [_c("div", { staticClass: "card_head", class: _vm.isChooseReview ? "" : "not_choose" }, [_c("div", { staticClass: "card_title" }, [_c("span", [_vm._v("2")]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_title3 || _vm.$t("settlement.title3")))])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showReviewInfo, expression: "showReviewInfo" }], staticClass: "review_info" }, [_vm._m(2), _vm._l(_vm.customList, function(item, idx) {
    return _c("div", { key: idx + "qc", staticClass: "pro_info" }, [_vm._m(3, true), _c("div", { staticClass: "pro_title" }, [_c("p", [_vm._v(_vm._s(item.productName))])])]);
  }), _vm._l(_vm.normalList, function(item, idx) {
    return _c("div", { key: idx + "q", staticClass: "pro_info" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [item.productPicUrl ? _c("img", { attrs: { "src": item.productPicUrl } }) : _c("img", { staticStyle: { "width": "48px", "height": "48px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_title" }, [_c("p", [_vm._v(_vm._s(item.productName))])])]);
  })], 2)]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.ShowChooseReview, expression: "ShowChooseReview" }], staticClass: "review_list" }, [_vm.customList.length > 0 ? _c("div", { staticClass: "border" }, [_c("span", { staticClass: "title2" }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text12 || _vm.$t("settlement.text12")))]), _c("div", { staticClass: "addr_card" }, [!_vm.customAddr ? _c("p", { staticStyle: { "text-align": "center" } }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text14 || _vm.$t("settlement.text14")))]), _c("span", { staticStyle: { "color": "#f6497f", "margin-left": "12px", "cursor": "pointer" }, on: { "click": function($event) {
    return _vm.handleShowAddr("custom");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text15 || _vm.$t("settlement.text15")))])]) : _c("div", { staticClass: "flex card_info" }, [_c("img", { attrs: { "src": __$_require_3a8b7ec4__ } }), _c("div", { staticClass: "addr_info" }, [_vm.ActMethod == 1 ? _c("p", [_vm._v(" " + _vm._s(_vm.customAddr.detailAddress + (_vm.customAddr.detailAddress ? "," : "") + _vm.customAddr.detailAddressTwo + (_vm.customAddr.detailAddressTwo ? "," : "") + _vm.customAddr.city + (_vm.customAddr.city ? "," : "") + _vm.customAddr.country) + " ")]) : _vm._e(), _vm.ActMethod == 1 ? _c("p", { staticStyle: { "margin-top": "8px" } }, [_c("span", [_vm._v(_vm._s(_vm.customAddr.name))]), _c("span", { staticStyle: { "margin-left": "24px", "color": "#646873" } }, [_vm._v(_vm._s(_vm.customAddr.phoneNumber))])]) : _vm._e(), _vm.ActMethod == 2 ? _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_settlement_text16 || _vm.$t("settlement.text16")) + " ")]) : _vm._e()]), _c("el-button", { attrs: { "type": "text" }, on: { "click": function($event) {
    return _vm.handleShowAddr("custom");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))])], 1)]), _vm._l(_vm.customList, function(item, idx) {
    return _c("div", { key: idx + "c", staticClass: "pro_item" }, [_c("div", { staticClass: "cus_item item" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [item.productPicUrl ? _c("img", { attrs: { "src": item.productPicUrl } }) : _c("img", { staticStyle: { "width": "60px", "height": "60px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_info" }, [_c("p", [_vm._v(_vm._s(item.productName))]), _vm._l(item.cartCusObjItemVOS, function(it) {
      return _c("p", { key: it.cartCusItemId }, [_c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.objNickname))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s((it.height ? it.height + "cm" : "") + (it.weight ? it.weight + "kg" : "")))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.ratio))]), _c("span", { staticStyle: { "margin-right": "24px", "color": "#f6497f" } }, [_vm._v("£ " + _vm._s(it.price))])]);
    }), _c("div", { staticClass: "pro_info2" }, [_c("div", { staticStyle: { "margin-top": "16px" } }, _vm._l(item.cartCusServiceItemVOS, function(pro) {
      return _c("div", { key: pro.cartCusItemId, staticClass: "pro_item flex" }, [_c("div", { staticClass: "flex_c_c img" }, [_c("img", { attrs: { "src": pro.productPicUrl } })]), _c("div", { staticClass: "pro_name" }, [_c("div", { staticClass: "name" }, [_vm._v(_vm._s(pro.productName))]), _c("div", [_c("span", [_vm._v(_vm._s("x " + pro.quantity))]), _c("span", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(pro.price))])])])]);
    }), 0)]), _c("p", { staticClass: "pro_price", staticStyle: { "text-align": "right", "margin-top": "12px" } }, [_vm._v(" £ " + _vm._s(item.price) + " ")])], 2)])]);
  })], 2) : _vm._e(), _vm.normalList.length > 0 ? _c("div", { staticClass: "border", staticStyle: { "margin-top": "16px" } }, [_c("span", { staticClass: "title2" }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text13 || _vm.$t("settlement.text13")))]), _c("div", { staticClass: "addr_card" }, [!_vm.normalAddr ? _c("p", { staticStyle: { "text-align": "center" } }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text14 || _vm.$t("settlement.text14")))]), _c("span", { staticStyle: { "color": "#f6497f", "margin-left": "12px", "cursor": "pointer" }, on: { "click": function($event) {
    return _vm.handleShowAddr("normal");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text15 || _vm.$t("settlement.text15")))])]) : _c("div", { staticClass: "flex card_info" }, [_c("img", { attrs: { "src": __$_require_3a8b7ec4__ } }), _c("div", { staticClass: "addr_info" }, [_c("p", [_vm._v(" " + _vm._s(_vm.normalAddr.detailAddress + (_vm.normalAddr.detailAddress ? "," : "") + _vm.normalAddr.detailAddressTwo + (_vm.normalAddr.detailAddressTwo ? "," : "") + _vm.normalAddr.city + (_vm.normalAddr.city ? "," : "") + _vm.normalAddr.country) + " ")]), _c("p", { staticStyle: { "margin-top": "8px" } }, [_c("span", [_vm._v(_vm._s(_vm.normalAddr.name))]), _c("span", { staticStyle: { "margin-left": "24px", "color": "#646873" } }, [_vm._v(_vm._s(_vm.normalAddr.phoneNumber))])])]), _c("el-button", { attrs: { "type": "text" }, on: { "click": function($event) {
    return _vm.handleShowAddr("normal");
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))])], 1)]), _vm._l(_vm.normalList, function(item, idx) {
    return _c("div", { key: idx + "n", staticClass: "pro_item" }, [_c("div", { staticClass: "item" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [item.productPicUrl ? _c("img", { attrs: { "src": item.productPicUrl } }) : _c("img", { staticStyle: { "width": "60px", "height": "60px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_info" }, [_c("p", [_vm._v(_vm._s(item.productName))]), _vm._l(item.attributeValueVOs, function(attr) {
      return _c("p", { key: attr.productAttributeValueUid }, [_c("span", [_vm._v(_vm._s(attr.productAttributeName) + "：")]), _vm._v(_vm._s(attr.value) + " ")]);
    }), _c("p", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(item.price))]), item.productType != "custom" ? _c("p", { staticClass: "quantity" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text4 || _vm.$t("cart.text4")))]), _c("el-input", { attrs: { "disabled": "" }, on: { "input": function($event) {
      return _vm.handleInput(idx);
    } }, model: { value: item.quantity, callback: function($$v) {
      _vm.$set(item, "quantity", $$v);
    }, expression: "item.quantity" } }), _c("el-button", { staticClass: "btn btn3", attrs: { "disabled": "", "icon": "el-icon-arrow-up" }, on: { "click": function($event) {
      return _vm.handleAddNum(idx);
    } } }), _c("el-button", { staticClass: "btn btn2", attrs: { "disabled": "", "icon": "el-icon-arrow-down" }, on: { "click": function($event) {
      return _vm.handleMinusNum(idx);
    } } })], 1) : _vm._e()], 2)])]);
  })], 2) : _vm._e()])])]), _c("div", { staticClass: "main_right" }, [_c("div", { staticClass: "total_card" }, [_c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text6 || _vm.$t("settlement.text6")))]), _c("span", [_vm._v("£ " + _vm._s(_vm.orderDetail ? _vm.orderDetail.calcAmount.totalAmount : 0))])]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text7 || _vm.$t("settlement.text7")))]), _c("span", [_vm._v("£ " + _vm._s(_vm.orderDetail ? _vm.orderDetail.calcAmount.freightAmount ? _vm.orderDetail.calcAmount.freightAmount : 0 : 0))])]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text8 || _vm.$t("settlement.text8")))]), _c("span", [_vm._v("£ "), _c("span", { staticStyle: { "font-weight": "600" } }, [_vm._v(_vm._s(_vm.orderDetail ? _vm.orderDetail.calcAmount.payAmount : 0))])])]), _c("p", [_c("el-button", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == "pay", expression: "step == 'pay'" }], staticClass: "set_btn", class: _vm.disabled ? "btn_disabled" : "", attrs: { "disabled": _vm.disabled }, on: { "click": _vm.handleSavePay } }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_btns_btn2 || _vm.$t("settlement.btns.btn2")))]), _c("el-button", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == "review", expression: "step == 'review'" }], staticClass: "set_btn", class: _vm.disabled ? "btn_disabled" : "", attrs: { "disabled": _vm.disabled }, on: { "click": _vm.handleSaveRev } }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_btns_btn3 || _vm.$t("settlement.btns.btn3")))])], 1)])])])]) : _vm._e(), _vm.showEditForm ? _c("div", { staticClass: "dialog flex_c_c" }, [_c("div", { staticClass: "form_card" }, [_c("p", { staticClass: "dia_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text10 || _vm.$t("address.text10")) + " ")]), _c("el-form", { ref: "formData", attrs: { "model": _vm.formData, "label-position": "top", "rules": _vm.formRules } }, [_c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text11 || _vm.$t("address.text11") } }, [_c("el-input", { attrs: { "disabled": "" }, model: { value: _vm.formData.country, callback: function($$v) {
    _vm.$set(_vm.formData, "country", $$v);
  }, expression: "formData.country" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text12 || _vm.$t("address.text12"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.name, callback: function($$v) {
    _vm.$set(_vm.formData, "name", $$v);
  }, expression: "formData.name" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text13 || _vm.$t("address.text13"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.phoneNumber, callback: function($$v) {
    _vm.$set(_vm.formData, "phoneNumber", $$v);
  }, expression: "formData.phoneNumber" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text14 || _vm.$t("address.text14"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.postCode, callback: function($$v) {
    _vm.$set(_vm.formData, "postCode", $$v);
  }, expression: "formData.postCode" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text15 || _vm.$t("address.text15"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.detailAddress, callback: function($$v) {
    _vm.$set(_vm.formData, "detailAddress", $$v);
  }, expression: "formData.detailAddress" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text16 || _vm.$t("address.text16") } }, [_c("el-input", { model: { value: _vm.formData.detailAddressTwo, callback: function($$v) {
    _vm.$set(_vm.formData, "detailAddressTwo", $$v);
  }, expression: "formData.detailAddressTwo" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text17 || _vm.$t("address.text17"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.city, callback: function($$v) {
    _vm.$set(_vm.formData, "city", $$v);
  }, expression: "formData.city" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text18 || _vm.$t("address.text18") } }, [_c("el-input", { model: { value: _vm.formData.region, callback: function($$v) {
    _vm.$set(_vm.formData, "region", $$v);
  }, expression: "formData.region" } })], 1), _c("el-form-item", { staticClass: "checkbox", attrs: { "label": "" } }, [_c("el-checkbox", { model: { value: _vm.formData.defaultStatus, callback: function($$v) {
    _vm.$set(_vm.formData, "defaultStatus", $$v);
  }, expression: "formData.defaultStatus" } }), _c("span", { staticStyle: { "margin-left": "8px" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_address_text19 || _vm.$t("address.text19")))])], 1), _c("el-form-item", { attrs: { "label": "" } }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_address_text20 || _vm.$t("address.text20")))]), _c("el-button", { staticClass: "btn btn2", on: { "click": _vm.handleCancel } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))])], 1)], 1)], 1)]) : _vm._e(), _vm.showPayCode ? _c("div", { staticClass: "dia_pay flex_c_c" }, [_c("div", { staticClass: "pay_code" }, [_c("div", { staticClass: "close", on: { "click": _vm.handleClose } }, [_c("i", { staticClass: "el-icon-close" })]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text29 || _vm.$t("order.text29")) + " ")]), _c("div", { staticClass: "url" }, [_vm._v(_vm._s(_vm.paypalHrefLink))]), _c("p", { staticClass: "check_btn" }, [_c("el-button", { on: { "click": _vm.handleCheckResult } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_text30 || _vm.$t("order.text30")))])], 1)])]) : _vm._e(), _vm.loading ? _c("div", { staticClass: "my_loading flex_c_c" }, [_c("img", { attrs: { "src": __$_require_2d971d39__ } }), _c("p", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text31 || _vm.$t("order.text31")))])]) : _vm._e(), _vm.ShowChooseAddr ? _c("div", { staticClass: "address flex_c_c" }, [_c("div", { staticClass: "address_card" }, [_c("div", { staticClass: "card_head" }, [_c("div", { staticClass: "addr_title" }, [_vm.type == "custom" ? _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_title4 || _vm.$t("settlement.title4")))]) : _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_title5 || _vm.$t("settlement.title5")))])])]), _c("div", { staticClass: "address_list" }, [_vm.type == "custom" ? _c("div", { staticClass: "method flex", on: { "click": function($event) {
    return _vm.handleChangeMethod(1);
  } } }, [_c("div", { staticClass: "item flex", class: _vm.method == 1 ? "active" : "" }, [_c("div", { staticClass: "check" }, [_vm.method == 1 ? _c("i", { staticClass: "el-icon-success" }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text1 || _vm.$t("settlement.text1")))]), _c("div", { staticClass: "border" })]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text2 || _vm.$t("settlement.text2")))])]) : _vm._e(), _vm.type == "custom" ? _c("div", { staticClass: "method flex", on: { "click": function($event) {
    return _vm.handleChangeMethod(2);
  } } }, [_c("div", { staticClass: "item flex", class: _vm.method == 2 ? "active" : "" }, [_c("div", { staticClass: "check" }, [_vm.method == 2 ? _c("i", { staticClass: "el-icon-success" }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text3 || _vm.$t("settlement.text3")))]), _c("div", { staticClass: "border" })]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_text4 || _vm.$t("settlement.text4")))])]) : _vm._e(), _vm._l(_vm.addressList, function(item, index2) {
    return _c("div", { key: index2 + "ad", staticClass: "addr_item", class: _vm.actAddress == index2 ? "active" : "", style: index2 % 3 == 2 ? { marginRight: 0 } : "", on: { "click": function($event) {
      return _vm.handleChangeAddress(item, index2);
    } } }, [_vm._m(4, true), _c("p", [_vm._v(_vm._s(item.name))]), _c("p", [_vm._v(" " + _vm._s(item.detailAddress + "," + item.city + "," + item.country) + " ")]), _c("p", [_vm._v(_vm._s(item.phoneNumber))]), _c("p", { staticClass: "flex_b_c" }, [_c("el-button", { staticStyle: { "color": "#f6497f", "padding": "0" }, attrs: { "type": "text" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.handleEditAddress(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))]), index2 == 0 ? _c("span", { staticClass: "defualt" }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_default || _vm.$t("btns.default")))]) : _vm._e()], 1)]);
  })], 2), _c("p", { staticClass: "addr_bnts" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleCloseAddr } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]), _c("el-button", { staticClass: "btn2 btn", on: { "click": _vm.handleConfirmAddr } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)])]) : _vm._e()]);
};
var _sfc_staticRenderFns$g = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "set_title flex_b_c" }, [_c("img", { attrs: { "src": __$_require_368ed4ee__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "checked" }, [_c("img", { attrs: { "src": __$_require_018479ae__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "info_head" }, [_c("div", { staticClass: "info_left" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "pro_img flex_c_c" }, [_c("img", { staticStyle: { "width": "48px", "height": "48px" }, attrs: { "src": __$_require_6d02fb8e__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "checked" }, [_c("img", { attrs: { "src": __$_require_018479ae__ } })]);
}];
var __component__$g = /* @__PURE__ */ normalizeComponent(
  _sfc_main$g,
  _sfc_render$g,
  _sfc_staticRenderFns$g,
  false,
  null,
  null
);
const index$8 = __component__$g.exports;
const index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  components: {
    footerBar
  },
  data() {
    return {
      searchData: {
        keyword: "",
        pageNum: 1,
        pageSize: 40
      },
      loading: true,
      proList: [],
      total: 0,
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.handleSearch();
  },
  methods: {
    handleToDetail(val) {
      this.$router.push({ path: "/product", query: { uid: val.productUid } });
    },
    handleScroll(e) {
      if (this.total - 0 == this.proList.length) return false;
      if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight - 1) {
        if (!this.loading) {
          this.searchData.pageNum++;
          proSerch(this.searchData).then((res) => {
            this.proList.push(...res.data.list);
            this.loading = false;
          }).catch((err) => {
            this.loading = false;
            this.searchData.pageNum--;
          });
        }
      }
    },
    handleSearch() {
      this.loading = true;
      proSerch(this.searchData).then((res) => {
        this.proList = res.data.list;
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
      });
    }
  }
};
var _sfc_render$f = function render23() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "general", on: { "scroll": _vm.handleScroll } }, [_c("div", { staticClass: "general_container" }, [_c("p", { staticClass: "title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_general_title || _vm.$t("general.title")) + " ")]), _c("p", { staticClass: "search" }, [_c("el-input", { model: { value: _vm.searchData.keyword, callback: function($$v) {
    _vm.$set(_vm.searchData, "keyword", $$v);
  }, expression: "searchData.keyword" } }), _c("el-button", { staticClass: "search_btn", attrs: { "icon": "el-icon-search" }, on: { "click": _vm.handleSearch } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_search || _vm.$t("btns.search")))])], 1), _c("div", { staticClass: "pro_list" }, [_vm._l(_vm.proList, function(item, index2) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: !_vm.loading, expression: "!loading" }], key: item.productBaseUid, staticClass: "pro_item", style: (index2 + 1) % 4 == 0 ? { marginRight: 0 } : "", on: { "click": function($event) {
      return _vm.handleToDetail(item, index2);
    } } }, [_c("div", { staticClass: "pro_img" }, [_c("img", { attrs: { "src": item.masterPicUrl } })]), _c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(item.name))]), _c("p", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(item.price))])]);
  }), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.loading, expression: "loading" }], staticClass: "loading flex_c_c" }, [_c("p", { staticClass: "flex_c_c" }, [_c("img", { attrs: { "src": __$_require_2d971d39__ } }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_general_loading || _vm.$t("general.loading")))])])])], 2)]), _c("footerBar")], 1);
};
var _sfc_staticRenderFns$f = [];
var __component__$f = /* @__PURE__ */ normalizeComponent(
  _sfc_main$f,
  _sfc_render$f,
  _sfc_staticRenderFns$f,
  false,
  null,
  null
);
const index$6 = __component__$f.exports;
const index$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  props: {
    // productDetail: {
    //   type: Object,
    //   default: () => { }
    // },
    editServiceProduct: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      quantity: "",
      attributeGroupValueVOs: [],
      productDetail: "",
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    proDetail({ productUid: this.editServiceProduct.productUid }).then((res) => {
      this.productDetail = res.data;
      this.productDetail.attributeGroupValueVOs.map((item) => {
        let arr = [];
        item.attributeValueVOS.forEach((attr) => {
          let obj = {
            ...attr,
            check: false
          };
          arr.push(obj);
        });
        let obj2 = {
          ...item,
          attributeValueVOS: arr
        };
        this.attributeGroupValueVOs.push(obj2);
      });
    });
  },
  methods: {
    handleClose() {
      this.$parent.showProInfo = false;
    },
    handleConfirm() {
    },
    handleChangeAttr(parent, index2, val, idx) {
      this.attributeGroupValueVOs[index2].attributeValueVOS.forEach((item) => {
        if (item.productAttributeValueUid == val.productAttributeValueUid) {
          item.check = true;
        } else {
          item.check = false;
        }
      });
      let arr = [];
      this.attributeGroupValueVOs.forEach((item) => {
        item.attributeValueVOS.forEach((attr) => {
          if (attr.check) {
            arr.push(attr.productAttributeValueUid);
          }
        });
      });
      const params = {
        productAttributeValueUidList: arr,
        productBaseUid: this.productDetail.productBaseUid
      };
      getVisibleSkuAttrValues(params).then((res) => {
      });
      getSkuDetail(params).then((res) => {
        this.skuDetail = res.data;
      });
      checkProductSkuStock(params).then((res) => {
      });
    },
    handleInput() {
      this.quantity = this.quantity.replace(/[^\d]/g, "");
      if (this.quantity < 1) return this.quantity = "";
    },
    handleMinusQty() {
      if (this.quantity <= 1) return false;
      this.quantity--;
    },
    handleAddQty() {
      this.quantity++;
    }
  }
};
var _sfc_render$e = function render24() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "productInfo flex_c_c" }, [_c("div", { staticClass: "info_card" }, [_c("p", { staticClass: "dia_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_productInfo_title || _vm.$t("custom.basic.productInfo.title"))), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("div", { staticClass: "info_container" }, [_c("div", { staticClass: "info_left" }, [_c("div", { staticClass: "info_image" }, [_c("img", { attrs: { "src": _vm.productDetail.masterPicUrl } })])]), _c("div", { staticClass: "info_right" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(_vm.productDetail.name))]), _c("p", { staticClass: "unit_price" }, [_vm._v(" £ "), _c("span", [_vm._v(_vm._s(_vm.productDetail.price))])]), _vm._l(_vm.attributeGroupValueVOs, function(item, index2) {
    return _c("div", { key: index2 + "attribute" }, [_c("p", { staticClass: "spec_label" }, [_vm._v(_vm._s(item.productAttributeName))]), _c("div", { staticClass: "spec_color" }, _vm._l(item.attributeValueVOS, function(attr, idx) {
      return _c("div", { key: attr.productAttributeValueUid, staticClass: "spec_color_item flex", class: attr.check == true ? "active" : "", on: { "click": function($event) {
        return _vm.handleChangeAttr(item, index2, attr, idx);
      } } }, [_c("span", [_vm._v(_vm._s(attr.value))]), _c("div", { staticClass: "active_border" })]);
    }), 0)]);
  }), _c("p", { staticClass: "spec_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text33 || _vm.$t("order.text33")) + " ")]), _c("p", { staticClass: "qty_btns flex" }, [_c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-minus" }, on: { "click": _vm.handleMinusQty } }), _c("el-input", { on: { "input": _vm.handleInput }, model: { value: _vm.quantity, callback: function($$v) {
    _vm.quantity = $$v;
  }, expression: "quantity" } }), _c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-plus" }, on: { "click": _vm.handleAddQty } })], 1), _c("p", { staticClass: "buy_btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)], 2)])])]);
};
var _sfc_staticRenderFns$e = [];
var __component__$e = /* @__PURE__ */ normalizeComponent(
  _sfc_main$e,
  _sfc_render$e,
  _sfc_staticRenderFns$e,
  false,
  null,
  null
);
const productInfo$1 = __component__$e.exports;
const _sfc_main$d = {
  props: {
    disabled: Boolean,
    step: Number,
    onBtnClick: Function
  },
  data: () => {
    return {
      elementContentList: {}
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
  }
};
var _sfc_render$d = function render25() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "custom-footer" }, [_c("div", { staticClass: "btn-group" }, [_c("el-button", { attrs: { "disabled": _vm.disabled }, on: { "click": _vm.onBtnClick } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_next || _vm.$t("btns.next")))])], 1)]);
};
var _sfc_staticRenderFns$d = [];
var __component__$d = /* @__PURE__ */ normalizeComponent(
  _sfc_main$d,
  _sfc_render$d,
  _sfc_staticRenderFns$d,
  false,
  null,
  null
);
const footer = __component__$d.exports;
const _sfc_main$c = {
  props: {
    step: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    onAddClick: {
      type: Function,
      default: () => {
      },
      required: false
    },
    handleBack: {
      type: Function,
      default: () => {
      },
      required: false
    }
  },
  data: () => {
    return {};
  },
  computed: {
    elementContentList() {
      return JSON.parse(sessionStorage.getItem("elementContentMap"));
    }
  },
  mounted() {
    console.log(this.label);
  },
  methods: {
    handleBack() {
      if (this.step === 1) {
        this.$confirm(
          this.$t("custom.header.backTips"),
          this.$t("custom.header.confirmTitle"),
          {
            confirmButtonText: this.$t("btns.confirm"),
            cancelButtonText: this.$t("btns.cancel")
          }
        ).then(() => {
          this.$router.go(-1);
        }).catch(() => {
        });
      } else {
        this.$emit("handleBack");
      }
    }
  }
};
var _sfc_render$c = function render26() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "custom-header" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "back flex", on: { "click": function($event) {
    return _vm.handleBack(2);
  } } }, [_c("i", { staticClass: "el-icon-arrow-left" }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label11 || _vm.$t("custom.basic.label11")))])]), _c("span", { staticStyle: { "font-size": "16px" } }, [_vm._v(_vm._s(_vm.label))])]), _c("p", { staticClass: "subtitle m_t" }, [_vm._v(" " + _vm._s(_vm.title) + " "), _vm.step === 2 ? _c("el-button", { staticClass: "add_btn", attrs: { "icon": "el-icon-plus" }, on: { "click": _vm.onAddClick } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_add || _vm.$t("btns.add")))]) : _vm._e()], 1)]);
};
var _sfc_staticRenderFns$c = [];
var __component__$c = /* @__PURE__ */ normalizeComponent(
  _sfc_main$c,
  _sfc_render$c,
  _sfc_staticRenderFns$c,
  false,
  null,
  "d7383412"
);
const header = __component__$c.exports;
function checkExist(params) {
  return service({
    url: "/custom/check/exist",
    method: "get",
    params
  });
}
function detail(params) {
  return service({
    url: "/custom/detail",
    method: "get",
    params
  });
}
function objSave(customProductId, data) {
  return service({
    url: `/custom/obj/save/${customProductId}`,
    method: "post",
    data
  });
}
function objSkuSave(customProductId, data) {
  return service({
    url: `/custom/objSku/save/${customProductId}`,
    method: "post",
    data
  });
}
function save(data) {
  return service({
    url: "/custom/save",
    method: "post",
    data
  });
}
function serviceSave(customProductId, customServiceUid) {
  return service({
    url: `/custom/service/save/${customProductId}?customServiceUid=${customServiceUid}`,
    method: "post"
  });
}
function serviceSkuSave(customProductId, data) {
  return service({
    url: `/custom/service/sku/save/${customProductId}`,
    method: "post",
    data
  });
}
function storeSave(customProductId, data) {
  return service({
    url: `/custom/store/save/${customProductId}`,
    method: "post",
    data
  });
}
function storePage(data) {
  return service({
    url: `/store/page`,
    method: "post",
    data
  });
}
function servicePage(data) {
  return service({
    url: `/custom/service/page`,
    method: "post",
    data
  });
}
function serviceProductPage(data) {
  return service({
    url: `/custom/service/product/page`,
    method: "post",
    data
  });
}
function calculate(data) {
  return service({
    url: `/custom/height/weight/calculate`,
    method: "post",
    data
  });
}
const __$_require_42bcc112__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAJMSURBVFiF7ZhBbuIwFIb/96irWfYIOUK5AayHGTUnmCK1lVhVnADNCVpWSIAEPQEImDVzg/YIPkLWmPjNhlTpEEJMjKgqfikLO37Pn7zwe/4JAKQ3CaxSHQDXm+/U0iBMeWW61Ao1bQCXAIJTk2VIszF1tpfqEZ8TEAACq1SHIbg5Ncke3TA8nmIsaFfuGmRF6gC0p7RX7CkRxNrm5X3jGQDU/Y+/bIw3UB+QEVuqXjz8HKcnqRVqX6BlISO2VKeH729ZP32BloHMBUxErVBzxVQB5K7L06GQmo2p7gNMRM0w4oqp40DQQyA1G1OnVqjTk+v+7DY9NoN5TXqTIBmXAXWFzASMh4sRmH+l50gksEots0AJND0epKCbCQjc7ojIBCWzah8P8j/tAUy0BYpviFz2uXCiIjyu+7NIiHSFqCNArWBkYJVamsG8KcKRxPJ0PEggIOYRARDHQAABEy1B4hzrrSweU2dIXzpD+tIZ0pfOkL70JSEjCNpibRPufaEWSLiJ1S6BTrVbrG0nDy4ZTaY2VksUs2U+9KHr/gzEPCq6r9tJMr23WA6d9najnMpTaFuXxQR62vEkGBcFlNHkikCdo0FiR6dduWs0Ye1LeqEQbQP2JoGN1SscnTuKh4sDWsPst06eyrh3h15B20+CHJW1F8vck4VAffifZS/zXFBfBq2PipMJ6tNB9lUWA6vUqxnMawAg/T/XPi1uiocL5ythjzT82tuaUcLt2qHAazbClNmY3/BnHfuW5pXp8rvRSXjG54F9AzBOCsY/nkA0q/yZBI8AAAAASUVORK5CYII=";
const _sfc_main$b = {
  components: {
    productInfo: productInfo$1,
    customFooter: footer,
    customHeader: header
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
          modelWeight: ""
        }
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
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1e3;
        }
      },
      showDateTip: false,
      showTimeTip: false
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
    handleEditServiceProduct(val, index2) {
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
          this.storeList.forEach((item, index2) => {
            if (item.storeUid == this.detailInfo.storeUid) {
              this.storeIdx = index2;
              this.imageAct2 = index2;
              this.storeInfo = respo.data.list[index2];
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
        customServiceUid: this.detailInfo.customServiceUid
      };
      serviceProductPage(params).then((res) => {
        if (this.serviceData.type == "combined_scene") {
          let arr = [], arr2 = [];
          res.data.list.forEach((item, index2) => {
            let obj2 = {
              productName: item.productName,
              productUid: item.productUid
            };
            arr2.push(obj2);
            let obj = {
              ...item,
              check: false
            };
            arr.push(obj);
          });
          this.packageProList = arr;
          let uniqueItems = arr2.filter(
            (item, index2, self2) => self2.findIndex((i) => i.productUid === item.productUid) === index2
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
              check: true
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
        productBaseUid: this.detailInfo.cusProductBaseUid
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
        productBaseUid: this.detailInfo.cusProductBaseUid
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
            value: item.productSkuStockUid
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
          let modelHeight = "", modelWeight = "";
          if (item.height && item.weight && item.ratio) {
            const params = {
              height: item.height,
              ratio: item.ratio,
              type: 1,
              weight: item.weight
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
            modelWeight
          };
          arr.push(obj);
        });
        this.objectList = arr;
        console.log("this.objectList", this.objectList);
      }
    },
    getDetail() {
      detail().then((res) => {
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
      }).catch(() => {
      });
    },
    handleChangePackIdx(val, index2) {
      this.packIdx = index2;
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
    handleChangeImage(val, index2) {
      this.imageAct = index2;
      if (val.playUrl) {
        this.videoUrl = val.playUrl;
        this.imageUrl = "";
      } else {
        this.imageUrl = val.preViewUrl;
        this.videoUrl = "";
      }
    },
    handleChangeTab(val, index2) {
      this.tab = index2;
      this.serviceData = val;
      this.serviceDesc = val.serviceDesc;
    },
    getCalculate(weight, height, ratio, index2) {
      const params = {
        height,
        ratio,
        type: 1,
        weight
      };
      calculate(params).then((res) => {
        this.objectList[index2].modelHeight = res.data.modelHeight;
        this.objectList[index2].modelWeight = res.data.modelWeight;
      });
    },
    handleChange(val, index2) {
      if (val.height && val.weight && val.ratio) {
        this.getCalculate(val.weight, val.height, val.ratio, index2);
      }
    },
    handleBlur3(val, index2) {
      if (val.sku != "") {
        val.showTip3 = false;
        this.customSkuList.forEach((item) => {
          if (item.value == val.sku) {
            this.objectList[index2].ratio = item.label;
          }
        });
      } else {
        val.showTip3 = true;
      }
      if (val.height && val.weight && val.ratio) {
        this.getCalculate(val.weight, val.height, val.ratio, index2);
      }
    },
    handleBlur2(val, index2) {
      if (val.weight) {
        val.showTip2 = false;
      } else {
        val.showTip2 = true;
      }
    },
    handleBlur(val, index2) {
      if (val.height) {
        val.showTip1 = false;
      } else {
        val.showTip1 = true;
      }
    },
    handleRight(val, index2) {
      if (index2 == this.serviceData.picResourceVOList.length - 1) return false;
      this.imageAct = index2 + 1;
    },
    handleLeft(val, index2) {
      if (index2 == 0) return false;
      this.imageAct = index2 - 1;
    },
    handleRight2(val, index2) {
      if (index2 == this.storeInfo.picResourceVOs.length - 1) return false;
      this.imageAct2 = index2 + 1;
    },
    handleLeft2(val, index2) {
      if (index2 == 0) return false;
      this.imageAct2 = index2 - 1;
    },
    handleDelete(val, index2) {
      this.objectList.splice(index2, 1);
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
        modelWeight: ""
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
            productUid: this.customPro.productUid
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
            if (item.height) {
              item.showTip1 = false;
            } else {
              item.showTip1 = true;
            }
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
            let arr42 = [];
            this.objectList.forEach((item, idx) => {
              let obj = {
                customObjId: item.customObjId,
                customProductId: this.customProductId,
                height: item.height,
                weight: item.weight,
                objNickname: item.objNickname ? item.objNickname : "扫描对象" + (idx + 1),
                objNo: item.objNo ? item.objNo : "objNo" + (idx + 1)
              };
              let obj2 = {
                customObjId: item.customObjId,
                customProductId: this.customProductId,
                productSkuUid: item.sku,
                ratio: item.ratio
              };
              arr3.push(obj);
              arr42.push(obj2);
            });
            objSave(this.customProductId, { requestBaseList: arr3 }).then(
              (res) => {
                detail().then((resp) => {
                  resp.data.customProductObjVOs.forEach((item, index2) => {
                    this.objectList[index2].customObjId = item.customObjId;
                  });
                  this.objectList.forEach((item, idx) => {
                    let obj2 = {
                      customObjId: item.customObjId,
                      customProductId: this.customProductId,
                      productSkuUid: item.sku,
                      ratio: item.ratio
                    };
                    arr42.push(obj2);
                  });
                  objSkuSave(this.customProductId, {
                    requestSkuList: arr42
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
                recProductUid: item.productUid
              };
              arr4.push(obj);
            }
          });
          const params3 = {
            requestList: arr4
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
            storeUid: this.storeInfo.storeUid
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
    handleChangeType(val, index2) {
      this.type = index2;
      this.customPro = val;
    },
    handleAddCart() {
      customAdd(this.detailInfo.customProductUid).then((res) => {
        if (res.data) {
          this.$message.success({
            message: this.elementContentList.portal_custom_basic_msg1 || this.$t("custom.basic.msg1"),
            duration: 1500
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
            let data = {
              ...res.data,
              customUid: this.detailInfo.customProductUid
            };
            this.$router.push({
              path: "/settlement",
              query: { from: "nowCustom", params: JSON.stringify(data) }
            });
          }
        }
      );
    }
  }
};
var _sfc_render$b = function render27() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "basic" }, [_vm.showStep ? _c("div", [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 1, expression: "step == 1" }], staticClass: "one" }, [_c("p", { staticClass: "title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_title1 || _vm.$t("custom.basic.title1")) + " ")]), _c("p", { staticClass: "subtitle" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_title2 || _vm.$t("custom.basic.title2")) + " ")]), _c("div", { staticClass: "types flex_c_c" }, _vm._l(_vm.customProList, function(item, index2) {
    return _c("div", { key: item.productBaseUid, staticClass: "item" }, [_c("div", { staticClass: "image flex_c_c", on: { "click": function($event) {
      return _vm.handleChangeType(item, index2);
    } } }, [_c("img", { attrs: { "src": __$_require_6d02fb8e__ } }), _c("div", { staticClass: "border", class: _vm.type == index2 ? "active" : "" }), _vm.type == index2 ? _c("div", [_c("i", { staticClass: "el-icon-success" })]) : _vm._e()]), _c("p", [_vm._v(_vm._s(item.name))]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_label14 || _vm.$t("custom.basic.label14")) + " ")])]);
  }), 0)]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 2, expression: "step == 2" }], staticClass: "two" }, [_c("custom-header", { attrs: { "onAddClick": _vm.handleAdd, "label": _vm.elementContentList.portal_custom_basic_title4 || _vm.$t("custom.basic.title4"), "title": _vm.elementContentList.portal_custom_basic_title4 || _vm.$t("custom.basic.title4"), "step": _vm.step }, on: { "handleBack": _vm.handleBack } }), _c("div", { staticClass: "info" }, _vm._l(_vm.objectList, function(item, index2) {
    return _c("div", { key: "o" + index2, staticClass: "item" }, [_c("p", { staticClass: "label flex_b_c" }, [_c("span", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_label5 || _vm.$t("custom.basic.label5") + (index2 + 1)) + " ")]), index2 > 0 ? _c("span", { on: { "click": function($event) {
      return _vm.handleDelete(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_delete || _vm.$t("btns.delete")))]) : _vm._e()]), _c("div", { staticClass: "flex" }, [_c("div", { staticClass: "inputs" }, [_c("div", { staticClass: "m_r flex" }, [_c("div", { staticClass: "input" }, [_c("span", { staticClass: "text4" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label12 || _vm.$t("custom.basic.label12")) + " (cm)")]), _c("el-input", { attrs: { "placeholder": _vm.elementContentList.portal_custom_basic_placeholder1 || _vm.$t("custom.basic.placeholder1") }, on: { "blur": function($event) {
      return _vm.handleBlur(item, index2);
    }, "change": function($event) {
      return _vm.handleChange(item, index2);
    } }, model: { value: item.height, callback: function($$v) {
      _vm.$set(item, "height", $$v);
    }, expression: "item.height" } })], 1), item.showTip1 ? _c("p", { staticClass: "tips tips2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_tip1 || _vm.$t("custom.basic.tip1")) + " ")]) : _vm._e()]), _c("div", { staticClass: "m_r flex" }, [_c("div", { staticClass: "input" }, [_c("span", { staticClass: "text4" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label13 || _vm.$t("custom.basic.label13")) + " (kg)")]), _c("el-input", { attrs: { "placeholder": _vm.elementContentList.portal_custom_basic_placeholder2 || _vm.$t("custom.basic.placeholder2") }, on: { "blur": function($event) {
      return _vm.handleBlur2(item, index2);
    }, "change": function($event) {
      return _vm.handleChange(item, index2);
    } }, model: { value: item.weight, callback: function($$v) {
      _vm.$set(item, "weight", $$v);
    }, expression: "item.weight" } })], 1), item.showTip2 ? _c("p", { staticClass: "tips tips2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_tip2 || _vm.$t("custom.basic.tip2")) + " ")]) : _vm._e()]), _c("div", { staticClass: "m_r2 flex" }, [_c("div", { staticClass: "input" }, [_c("span", { staticClass: "text4" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label16 || _vm.$t("custom.basic.label16")))]), _c("el-select", { attrs: { "popper-append-to-body": false, "placeholder": _vm.elementContentList.portal_custom_basic_placeholder3 || _vm.$t("custom.basic.placeholder3") }, on: { "change": function($event) {
      return _vm.handleBlur3(item, index2);
    } }, model: { value: item.sku, callback: function($$v) {
      _vm.$set(item, "sku", $$v);
    }, expression: "item.sku" } }, _vm._l(_vm.customSkuList, function(attr) {
      return _c("el-option", { key: attr.value, attrs: { "label": attr.label, "value": attr.value } });
    }), 1)], 1), item.showTip3 ? _c("p", { staticClass: "tips tips2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_tip3 || _vm.$t("custom.basic.tip3")) + " ")]) : _vm._e()])]), _c("div", { staticClass: "results" }, [item.modelWeight ? _c("div", [_c("p", { staticClass: "res flex" }, [_c("img", { attrs: { "src": __$_require_42bcc112__ } }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label18 || _vm.$t("custom.basic.label18")))]), _c("span", [_vm._v(_vm._s(item.modelHeight) + " ")]), _c("span", [_vm._v("cm")])]), _c("p", { staticClass: "res flex" }, [_c("img", { attrs: { "src": __$_require_42bcc112__ } }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label19 || _vm.$t("custom.basic.label19")))]), _c("span", [_vm._v(_vm._s(item.modelWeight) + " ")]), _c("span", [_vm._v("g")])])]) : _c("p", { staticClass: "no_res" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_label17 || _vm.$t("custom.basic.label17")) + " ")])])])]);
  }), 0)], 1), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 4, expression: "step == 4" }], staticClass: "four" }, [_c("custom-header", { attrs: { "onAddClick": _vm.handleAdd, "label": _vm.elementContentList.portal_custom_basic_title4 || _vm.$t("custom.basic.step4.label1"), "title": _vm.elementContentList.portal_custom_basic_title4 || _vm.$t("custom.basic.step4.title"), "step": _vm.step }, on: { "handleBack": _vm.handleBack } }), _c("div", { staticClass: "four_main flex_b_c" }, [_c("div", { staticClass: "left" }, [_c("div", { staticClass: "tabs flex" }, _vm._l(_vm.serviceList, function(item, index2) {
    return _c("div", { key: item.customServiceUid, staticClass: "tab_item", class: _vm.tab == index2 ? "active" : "", on: { "click": function($event) {
      return _vm.handleChangeTab(item, index2);
    } } }, [_c("p", [_vm._v(_vm._s(item.name))]), _c("p", [_vm._v(_vm._s(item.serviceDesc))]), _c("div", { staticClass: "border" })]);
  }), 0), _c("div", { staticClass: "style" }, [_c("p", { staticClass: "style_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step4_label8 || _vm.$t("custom.basic.step4.label8")) + " ")]), _c("div", { staticClass: "desc" }, [_vm._v(_vm._s(_vm.serviceDesc))])])]), _c("div", { staticClass: "right image_pre" }, [_vm._l(_vm.serviceData.picResourceVOList, function(item, idx) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageAct == idx, expression: "imageAct == idx" }], key: item.ossNo, staticClass: "images flec_c_c" }, [_c("img", { attrs: { "src": item.preViewUrl } }), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_left flex_c_c", on: { "click": function($event) {
      return _vm.handleLeft(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-left" })]) : _vm._e(), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_right flex_c_c", on: { "click": function($event) {
      return _vm.handleRight(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-right" })]) : _vm._e()]);
  }), _c("div", { staticClass: "image_list" }, _vm._l(_vm.serviceData.picResourceVOList, function(item, index2) {
    return _c("div", { key: index2 + "img", staticClass: "image_item", class: _vm.imageAct == index2 ? "active" : "", on: { "click": function($event) {
      return _vm.handleChangeImage(item, index2);
    } } }, [item.playUrl ? _c("video", { attrs: { "src": item.playUrl } }) : _c("img", { attrs: { "src": item.thumbnailViewUrl } }), _c("div", { staticClass: "active_border" })]);
  }), 0)], 2)])], 1), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 5, expression: "step == 5" }], staticClass: "five" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "back flex", on: { "click": function($event) {
    return _vm.handleBack(5);
  } } }, [_c("i", { staticClass: "el-icon-arrow-left" }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label11 || _vm.$t("custom.basic.label11")))])]), _c("span", { staticStyle: { "font-size": "16px" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step5_label5 || _vm.$t("custom.basic.step5.label5")))])]), _c("p", { staticClass: "subtitle m_t2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step5_label1 || _vm.$t("custom.basic.step5.label1")) + " "), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step5_label2 || _vm.$t("custom.basic.step5.label2")))])]), _c("div", { staticClass: "five_main flex_a_c" }, [_c("div", { staticClass: "left image_pre" }, [_vm._l(_vm.serviceData.picResourceVOList, function(item, idx) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageAct == idx, expression: "imageAct == idx" }], key: item.ossNo, staticClass: "images flec_c_c" }, [_c("img", { attrs: { "src": item.preViewUrl } }), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_left flex_c_c", on: { "click": function($event) {
      return _vm.handleLeft(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-left" })]) : _vm._e(), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_right flex_c_c", on: { "click": function($event) {
      return _vm.handleRight(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-right" })]) : _vm._e()]);
  }), _c("div", { staticClass: "image_list" }, _vm._l(_vm.serviceData.picResourceVOList, function(item, index2) {
    return _c("div", { key: index2 + "img", staticClass: "image_item", class: _vm.imageAct == index2 ? "active" : "", on: { "click": function($event) {
      return _vm.handleChangeImage(item, index2);
    } } }, [item.playUrl ? _c("video", { attrs: { "src": item.playUrl } }) : _c("img", { attrs: { "src": item.thumbnailViewUrl } }), _c("div", { staticClass: "active_border" })]);
  }), 0)], 2), _c("div", { staticClass: "right" }, [_c("p", { staticClass: "text3" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step5_label3 || _vm.$t("custom.basic.step5.label3")) + " ")]), _c("div", { staticClass: "pro_list" }, _vm._l(_vm.serviceProductList, function(item, index2) {
    return _c("div", { key: index2 + "pro", staticClass: "pro_item flex" }, [_c("div", { staticClass: "pro_card flex_b_c" }, [_c("div", { staticClass: "check" }, [_c("el-checkbox", { model: { value: item.check, callback: function($$v) {
      _vm.$set(item, "check", $$v);
    }, expression: "item.check" } })], 1), _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": item.productPicUrl } })]), _c("div", { staticClass: "pro_info" }, [_c("div", { staticStyle: { "flex": "1" } }, [_c("p", [_vm._v(_vm._s(item.productName))]), _vm._l(item.attributeValueVOs, function(attr) {
      return _c("p", { key: attr.productAttributeUid }, [_vm._v(" " + _vm._s(attr.productAttributeName + ":" + attr.value) + " ")]);
    }), _c("p", { staticClass: "qty" }, [_c("span", [_vm._v("Qty")]), _c("el-input", { on: { "input": function($event) {
      item.productQuantity = item.productQuantity.replace(
        /[^\d]/g,
        ""
      );
    } }, model: { value: item.productQuantity, callback: function($$v) {
      _vm.$set(item, "productQuantity", $$v);
    }, expression: "item.productQuantity" } })], 1)], 2), _c("div", { staticClass: "price" }, [_c("span", [_vm._v("£ " + _vm._s(item.productPrice * item.productQuantity))])])])]), _c("span", { staticClass: "btn", on: { "click": function($event) {
      return _vm.handleEditServiceProduct(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step5_label4 || _vm.$t("custom.basic.step5.label4")))])]);
  }), 0)])])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 6, expression: "step == 6" }], staticClass: "six" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "back flex", on: { "click": function($event) {
    return _vm.handleBack(6);
  } } }, [_c("i", { staticClass: "el-icon-arrow-left" }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label11 || _vm.$t("custom.basic.label11")))])]), _c("span", { staticStyle: { "font-size": "16px" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step6_label1 || _vm.$t("custom.basic.step6.label1")))])]), _c("p", { staticClass: "subtitle m_t2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step6_title || _vm.$t("custom.basic.step6.title")) + " ")]), _c("div", { staticClass: "six_main" }, [_c("div", { staticClass: "six_left" }, _vm._l(_vm.storeList, function(item, index2) {
    return _c("div", { key: index2 + "store", staticClass: "store_item", class: _vm.storeIdx == index2 ? "active" : "", style: item == 2 ? { background: "#F8F9FC" } : "", on: { "click": function($event) {
      return _vm.handleChangeStoreIdx(item, index2);
    } } }, [_c("p", { staticClass: "name" }, [_vm._v(" " + _vm._s(item.name) + " "), _c("span", { staticClass: "flex" }, [_c("i", { staticClass: "el-icon-star-on" }), _vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step6_label2 || _vm.$t("custom.basic.step6.label2")))])]), _c("p", { staticClass: "addr" }, [_c("span", [_vm._v(_vm._s("-"))]), _c("span", [_vm._v(_vm._s(item.address))]), _c("span", [_vm._v(_vm._s(item.contact))])]), _c("p", { staticClass: "status", style: item.status == 0 ? "" : { color: "#646873" } }, [_vm._v(" " + _vm._s(item.status == 0 ? _vm.elementContentList.portal_custom_basic_step6_status1 || _vm.$t("custom.basic.step6.status1") : _vm.elementContentList.portal_custom_basic_step6_status2 || _vm.$t("custom.basic.step6.status2")) + " "), _c("span", [_vm._v(_vm._s(item.status == 0 ? item.businessHours : ""))])]), _c("div", { staticClass: "border" })]);
  }), 0), _c("div", { staticClass: "six_right" }, [_c("div", { staticClass: "image_pre" }, _vm._l(_vm.storeInfo.picResourceVOs, function(pic, idx) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageAct2 == idx, expression: "imageAct2 == idx" }], key: pic.ossNo, staticClass: "images flec_c_c" }, [_c("img", { attrs: { "src": pic.preViewUrl } }), _vm.imageAct2 == idx ? _c("div", { staticClass: "arrow_left flex_c_c", on: { "click": function($event) {
      return _vm.handleLeft2(_vm.item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-left" })]) : _vm._e(), _vm.imageAct2 == idx ? _c("div", { staticClass: "arrow_right flex_c_c", on: { "click": function($event) {
      return _vm.handleRight2(_vm.item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-right" })]) : _vm._e()]);
  }), 0), _c("div", { staticClass: "introduce" }, [_c("p", { staticClass: "in_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step6_label3 || _vm.$t("custom.basic.step6.label3")) + " ")]), _c("div", { staticClass: "in_detail" }, [_vm._v(" " + _vm._s(_vm.storeInfo.storeDesc) + " ")])]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step6_label4 || _vm.$t("custom.basic.step6.label4")) + " ")]), _c("div", { staticClass: "time flex_b_c" }, [_c("div", { staticClass: "flex" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step6_label5 || _vm.$t("custom.basic.step6.label5")))]), _c("el-date-picker", { attrs: { "type": "date", "format": "yyyy-MM-dd", "value-format": "yyyy-MM-dd", "picker-options": _vm.pickerOptions, "placeholder": _vm.elementContentList.portal_custom_basic_step6_placeholder1 || _vm.$t("custom.basic.step6.placeholder1") }, on: { "blur": _vm.handleChangeData }, model: { value: _vm.arrivalDateStr, callback: function($$v) {
    _vm.arrivalDateStr = $$v;
  }, expression: "arrivalDateStr" } }), _vm.showDateTip ? _c("p", { staticClass: "err_tip" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_label20 || _vm.$t("custom.basic.label20")) + " ")]) : _vm._e()], 1), _c("div", { staticClass: "flex" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step6_label6 || _vm.$t("custom.basic.step6.label6")))]), _c("el-time-picker", { attrs: { "type": "date", "format": "HH:mm", "value-format": "HH:mm", "placeholder": _vm.elementContentList.portal_custom_basic_step6_placeholder2 || _vm.$t("custom.basic.step6.placeholder2") }, on: { "blur": _vm.handleChangeTime }, model: { value: _vm.arrivalTime, callback: function($$v) {
    _vm.arrivalTime = $$v;
  }, expression: "arrivalTime" } }), _vm.showTimeTip ? _c("p", { staticClass: "err_tip" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_label21 || _vm.$t("custom.basic.label21")) + " ")]) : _vm._e()], 1)])])])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 7, expression: "step == 7" }], staticClass: "seven five" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "back flex", on: { "click": function($event) {
    return _vm.handleBack(7);
  } } }, [_c("i", { staticClass: "el-icon-arrow-left" }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label11 || _vm.$t("custom.basic.label11")))])]), _c("span", { staticStyle: { "font-size": "16px" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step5_label5 || _vm.$t("custom.basic.step5.label5")))])]), _c("p", { staticClass: "subtitle m_t2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step5_label1 || _vm.$t("custom.basic.step5.label1")) + " "), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step7_label1 || _vm.$t("custom.basic.step7.label1")))])]), _c("div", { staticClass: "five_main flex_a_c" }, [_c("div", { staticClass: "pack_tabs" }, _vm._l(_vm.packageNameList, function(item, index2) {
    return _c("div", { key: index2 + "p", staticClass: "tabs_item flex_c_c", class: _vm.packIdx == index2 ? "active" : "" }, [_vm._v(" " + _vm._s(item.productName) + " "), _c("div", { staticClass: "border", on: { "click": function($event) {
      return _vm.handleChangePackIdx(item, index2);
    } } })]);
  }), 0), _c("div", { staticClass: "left image_pre" }, [_vm._l(_vm.serviceData.picResourceVOList, function(item, idx) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageAct == idx, expression: "imageAct == idx" }], key: item.ossNo, staticClass: "images flec_c_c" }, [_c("img", { attrs: { "src": item.preViewUrl } }), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_left flex_c_c", on: { "click": function($event) {
      return _vm.handleLeft(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-left" })]) : _vm._e(), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_right flex_c_c", on: { "click": function($event) {
      return _vm.handleRight(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-right" })]) : _vm._e()]);
  }), _c("div", { staticClass: "image_list" }, _vm._l(_vm.serviceData.picResourceVOList, function(item, index2) {
    return _c("div", { key: index2 + "img", staticClass: "image_item", class: _vm.imageAct == index2 ? "active" : "", on: { "click": function($event) {
      return _vm.handleChangeImage(item, index2);
    } } }, [item.playUrl ? _c("video", { attrs: { "src": item.playUrl } }) : _c("img", { attrs: { "src": item.thumbnailViewUrl } }), _c("div", { staticClass: "active_border" })]);
  }), 0), _c("div", { staticClass: "text1" }, [_c("span", [_vm._v(" " + _vm._s("") + " ")])])], 2), _c("div", { staticClass: "right" }, [_c("p", { staticClass: "text3" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step7_label2 || _vm.$t("custom.basic.step7.label2")) + " ")]), _c("div", { staticClass: "pro_list" }, _vm._l(_vm.serviceProductList, function(item, index2) {
    return _c("div", { key: index2 + "pro", staticClass: "pro_item flex" }, [_c("div", { staticClass: "pro_card flex_b_c" }, [_c("div", { staticClass: "check" }, [_c("el-checkbox", { model: { value: item.check, callback: function($$v) {
      _vm.$set(item, "check", $$v);
    }, expression: "item.check" } })], 1), _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": item.productPicUrl } })]), _c("div", { staticClass: "pro_info" }, [_c("div", { staticStyle: { "flex": "1" } }, [_c("p", [_vm._v(_vm._s(item.productName))]), _vm._l(item.attributeValueVOs, function(attr) {
      return _c("p", { key: attr.productAttributeUid }, [_vm._v(" " + _vm._s(attr.productAttributeName + ":" + attr.value) + " ")]);
    }), _c("p", { staticClass: "qty" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step7_label3 || _vm.$t("custom.basic.step7.label3")))]), _c("el-input", { on: { "input": function($event) {
      item.productQuantity = item.productQuantity.replace(
        /[^\d]/g,
        ""
      );
    } }, model: { value: item.productQuantity, callback: function($$v) {
      _vm.$set(item, "productQuantity", $$v);
    }, expression: "item.productQuantity" } })], 1)], 2), _c("div", { staticClass: "price" }, [_c("span", [_vm._v("£ " + _vm._s(item.productPrice * item.productQuantity))])])])]), _c("span", { staticClass: "btn", on: { "click": function($event) {
      return _vm.handleEditServiceProduct(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step5_label4 || _vm.$t("custom.basic.step5.label4")))])]);
  }), 0)])])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 8, expression: "step == 8" }], staticClass: "five" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "back flex", on: { "click": function($event) {
    return _vm.handleBack(8);
  } } }, [_c("i", { staticClass: "el-icon-arrow-left" }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_label11 || _vm.$t("custom.basic.label11")))])]), _c("span", { staticStyle: { "font-size": "16px" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step8_label1 || _vm.$t("custom.basic.step8.label1")))])]), _c("p", { staticClass: "subtitle m_t2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step5_label1 || _vm.$t("custom.basic.step5.label1")) + " "), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v(_vm._s(_vm.detailInfo ? _vm.detailInfo.customServiceName : ""))])]), _c("div", { staticClass: "five_main flex_a_c" }, [_c("div", { staticClass: "left image_pre" }, [_vm._l(_vm.serviceData.picResourceVOList, function(item, idx) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageAct == idx, expression: "imageAct == idx" }], key: item.ossNo, staticClass: "images flec_c_c" }, [_c("img", { attrs: { "src": item.preViewUrl } }), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_left flex_c_c", on: { "click": function($event) {
      return _vm.handleLeft(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-left" })]) : _vm._e(), _vm.imageAct == idx ? _c("div", { staticClass: "arrow_right flex_c_c", on: { "click": function($event) {
      return _vm.handleRight(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-arrow-right" })]) : _vm._e()]);
  }), _c("div", { staticClass: "image_list" }, _vm._l(_vm.serviceData.picResourceVOList, function(item, index2) {
    return _c("div", { key: index2 + "img", staticClass: "image_item", class: _vm.imageAct == index2 ? "active" : "", on: { "click": function($event) {
      return _vm.handleChangeImage(item, index2);
    } } }, [item.playUrl ? _c("video", { attrs: { "src": item.playUrl } }) : _c("img", { attrs: { "src": item.thumbnailViewUrl } }), _c("div", { staticClass: "active_border" })]);
  }), 0)], 2), _c("div", { staticClass: "right" }, [_c("p", { staticClass: "text3" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_step5_label3 || _vm.$t("custom.basic.step5.label3")) + " ")]), _c("div", { staticClass: "pro_list" }, _vm._l(_vm.serviceProductList, function(item, index2) {
    return _c("div", { key: index2 + "pro", staticClass: "pro_item flex" }, [_c("div", { staticClass: "pro_card flex_b_c" }, [_c("div", { staticClass: "check" }, [_c("el-checkbox", { model: { value: item.check, callback: function($$v) {
      _vm.$set(item, "check", $$v);
    }, expression: "item.check" } })], 1), _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": item.productPicUrl } })]), _c("div", { staticClass: "pro_info" }, [_c("div", { staticStyle: { "flex": "1" } }, [_c("p", [_vm._v(_vm._s(item.productName))]), _vm._l(item.attributeValueVOs, function(attr) {
      return _c("p", { key: attr.productAttributeUid }, [_vm._v(" " + _vm._s(attr.productAttributeName + ":" + attr.value) + " ")]);
    }), _c("p", { staticClass: "qty" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step7_label3 || _vm.$t("custom.basic.step7.label3")))]), _c("el-input", { on: { "input": function($event) {
      item.productQuantity = item.productQuantity.replace(
        /[^\d]/g,
        ""
      );
    } }, model: { value: item.productQuantity, callback: function($$v) {
      _vm.$set(item, "productQuantity", $$v);
    }, expression: "item.productQuantity" } })], 1)], 2), _c("div", { staticClass: "price" }, [_c("span", [_vm._v("£ " + _vm._s(item.productPrice * item.productQuantity))])])])]), _c("span", { staticClass: "btn", on: { "click": function($event) {
      return _vm.handleEditServiceProduct(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_step5_label4 || _vm.$t("custom.basic.step5.label4")))])]);
  }), 0)])])])]) : _c("div", { staticClass: "confirm_order" }, [_c("p", { staticClass: "con_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_custom_basic_confirm_label1 || _vm.$t("custom.basic.confirm.label1")) + " "), _c("span", { on: { "click": _vm.handleEditInfo } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))])]), _c("div", { staticClass: "cus_info" }, [_c("div", { staticClass: "in_left" }, [_c("p", [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label2 || _vm.$t("custom.basic.confirm.label2")))]), _c("span", [_vm._v(_vm._s(_vm.detailInfo ? _vm.detailInfo.cusProductName : ""))])]), _c("p", [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label3 || _vm.$t("custom.basic.confirm.label3")))]), _vm._l(_vm.detailInfo.customProductObjVOs, function(obj, idx) {
    return _c("span", { key: idx + "p" }, [_vm._v(_vm._s(obj.height + "cm, " + obj.weight + (idx == _vm.detailInfo.customProductObjVOs.length - 1 ? "kg" : "kg / ")))]);
  })], 2), _c("p", [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label4 || _vm.$t("custom.basic.confirm.label4")))]), _vm._l(_vm.detailInfo.customProductObjVOs, function(obj, idx) {
    return _c("span", { key: idx + "p2" }, [_vm._v(_vm._s(idx == _vm.detailInfo.customProductObjVOs.length - 1 ? obj.ratio : obj.ratio + ","))]);
  })], 2), _c("p", [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label5 || _vm.$t("custom.basic.confirm.label5")))]), _c("span", [_vm._v(_vm._s(_vm.detailInfo.customServiceName))])]), _c("div", { staticClass: "in_pro" }, [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label6 || _vm.$t("custom.basic.confirm.label6")))]), _c("div", _vm._l(_vm.detailInfo.customServiceProductVOs, function(pro, idx) {
    return _c("p", { key: idx + "c" }, [_c("span", { staticClass: "text2" }, [_vm._v(_vm._s(pro.productName))]), _vm._l(pro.attributeValueVOs, function(attr) {
      return _c("span", { key: attr.productAttributeUid, staticClass: "text2" }, [_vm._v(_vm._s(attr.value))]);
    }), _c("span", { staticClass: "text2" }, [_vm._v(_vm._s("x" + pro.num))])], 2);
  }), 0)])]), _c("div", { staticClass: "in_right" }, [_c("div", [_c("p", [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label7 || _vm.$t("custom.basic.confirm.label7")))]), _c("span", [_vm._v(_vm._s(_vm.detailInfo.storeName))])]), _c("p", [_c("span", { staticClass: "in_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label8 || _vm.$t("custom.basic.confirm.label8")))]), _c("span", [_vm._v(_vm._s(_vm.detailInfo.arrivalDateStr + " " + _vm.detailInfo.arrivalTime))])])]), _c("div", [_c("p", { staticClass: "in_price" }, [_c("span", { staticClass: "in_label", staticStyle: { "margin-right": "0" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label9 || _vm.$t("custom.basic.confirm.label9")))]), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v(_vm._s(" £ " + (_vm.detailInfo.cusTotalPrice - _vm.detailInfo.serviceProductTotalPrice)))])]), _c("p", { staticClass: "in_price" }, [_c("span", { staticClass: "in_label", staticStyle: { "margin-right": "0" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label10 || _vm.$t("custom.basic.confirm.label10")))]), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v(_vm._s(" £ " + _vm.detailInfo.serviceProductTotalPrice))])]), _c("p", { staticClass: "in_total" }, [_c("span", { staticClass: "in_label", staticStyle: { "margin-right": "0" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label11 || _vm.$t("custom.basic.confirm.label11")))]), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v(_vm._s(" £ " + _vm.detailInfo.cusTotalPrice))])])])])]), _c("p", { staticClass: "con_btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleBuyNow } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label12 || _vm.$t("custom.basic.confirm.label12")))]), _c("el-button", { staticClass: "btn btn2", on: { "click": _vm.handleAddCart } }, [_vm._v(_vm._s(_vm.elementContentList.portal_custom_basic_confirm_label13 || _vm.$t("custom.basic.confirm.label13")))])], 1)]), _c("customFooter", { attrs: { "on-btn-click": _vm.handleClickBtn, "disabled": _vm.step === 1 && _vm.type === -1 } }), _vm.showProInfo ? _c("productInfo", { attrs: { "editServiceProduct": _vm.editServiceProduct } }) : _vm._e()], 1);
};
var _sfc_staticRenderFns$b = [];
var __component__$b = /* @__PURE__ */ normalizeComponent(
  _sfc_main$b,
  _sfc_render$b,
  _sfc_staticRenderFns$b,
  false,
  null,
  null
);
const basic = __component__$b.exports;
const _sfc_main$a = {
  name: "productInfo",
  components: {
    basic
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {}
};
var _sfc_render$a = function render28() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "custom" }, [_c("div", { staticClass: "custom_container" }, [_c("basic")], 1)]);
};
var _sfc_staticRenderFns$a = [];
var __component__$a = /* @__PURE__ */ normalizeComponent(
  _sfc_main$a,
  _sfc_render$a,
  _sfc_staticRenderFns$a,
  false,
  null,
  null
);
const index$4 = __component__$a.exports;
const index$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  data() {
    return {};
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
    }
  }
};
var _sfc_render$9 = function render29() {
  var _vm = this;
  _vm._self._c;
  return _vm._m(0);
};
var _sfc_staticRenderFns$9 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm._v(" three "), _c("canvas", { attrs: { "id": "three" } })]);
}];
var __component__$9 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$9,
  _sfc_render$9,
  _sfc_staticRenderFns$9,
  false,
  null,
  null
);
const three = __component__$9.exports;
const three$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: three
}, Symbol.toStringTag, { value: "Module" }));
const __$_require_9adc3a5c__ = "/static/success-wOr3uSSt.png";
const _sfc_main$8 = {
  data() {
    return {
      settlemenData: {},
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.settlemenData = JSON.parse(this.$route.query.settlemenData);
  },
  methods: {
    handleToOrder() {
      this.$router.push({ path: "/my/order", query: { orderId: this.settlemenData.orderId } });
    }
  }
};
var _sfc_render$8 = function render30() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "order_placed" }, [_vm._m(0), _c("p", { staticStyle: { "font-size": "24px", "font-weight": "600", "line-height": "32px" } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_settlement_text10 || _vm.$t("settlement.text10")) + " ")]), _c("div", { staticClass: "order_card" }, [_vm.settlemenData.addressInfo ? _c("div", [_c("p", { staticClass: "order_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_settlement_text11 || _vm.$t("settlement.text11")) + " ")]), _c("p", [_vm._v(_vm._s(_vm.settlemenData.addressInfo.name))]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(" " + _vm._s(_vm.settlemenData.addressInfo.detailAddress + (_vm.settlemenData.addressInfo.detailAddress ? "," : "") + _vm.settlemenData.addressInfo.detailAddressTwo + (_vm.settlemenData.addressInfo.detailAddressTwo ? "," : "") + _vm.settlemenData.addressInfo.city + (_vm.settlemenData.addressInfo.city ? "," : "") + _vm.settlemenData.addressInfo.country) + " ")]), _c("span", [_vm._v(_vm._s(_vm.settlemenData.addressInfo.phoneNumber))])])]) : _vm._e(), _c("p", { staticClass: "detail_btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleToOrder } }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_btns_btn4 || _vm.$t("settlement.btns.btn4")))])], 1)])]);
};
var _sfc_staticRenderFns$8 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "suc_img" }, [_c("img", { attrs: { "src": __$_require_9adc3a5c__ } })]);
}];
var __component__$8 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  null
);
const success = __component__$8.exports;
const success$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: success
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  data() {
    return {
      settlemenData: {},
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.settlemenData = JSON.parse(this.$route.query.settlemenData);
  },
  methods: {
    handleToOrder() {
      this.$router.push({ path: "/my/order", query: { orderId: this.settlemenData.payResult.orderId } });
    }
  }
};
var _sfc_render$7 = function render31() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "order_placed" }, [_vm._m(0), _c("p", { staticStyle: { "font-size": "24px", "font-weight": "600", "line-height": "32px" } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_settlement_text9 || _vm.$t("settlement.text9")) + " ")]), _c("div", { staticClass: "order_card" }, [_c("p", { staticClass: "detail_btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleToOrder } }, [_vm._v(_vm._s(_vm.elementContentList.portal_settlement_btns_btn4 || _vm.$t("settlement.btns.btn4")))])], 1)])]);
};
var _sfc_staticRenderFns$7 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "suc_img" }, [_c("i", { staticClass: "el-icon-error" })]);
}];
var __component__$7 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  null
);
const fail = __component__$7.exports;
const fail$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fail
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  name: "home",
  components: {
    footerBar
  },
  data() {
    return {
      productList: [],
      activeIdx: 0,
      playUrl: "",
      pictureList: [],
      sectionList: [],
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.getskuPage();
    this.getData();
  },
  methods: {
    handleToCustom() {
      checkExist().then((res) => {
        if (res.data == false) {
          this.$router.push("/custom");
        }
      });
    },
    handleGeneral() {
      this.$router.push("/general");
    },
    group(array, subNum) {
      let index2 = 0;
      let newArray = [];
      while (index2 < array.length) {
        newArray.push(array.slice(index2, index2 += subNum));
      }
      return newArray;
    },
    getData() {
      videoList().then((res) => {
        if (res.data) {
          this.playUrl = res.data[0].playUrl;
        }
      });
      picList().then((res) => {
        this.pictureList = this.group(res.data, 5);
      });
      sectionPicList().then((res) => {
        this.sectionList = res.data;
      });
    },
    getskuPage() {
      const params = {
        pageNum: 1,
        pageSize: 10,
        keyword: ""
      };
      productPage(params).then((res) => {
        this.productList = res.data.list;
      });
    },
    handleChangeProItem(index2, val) {
      this.activeIdx = index2;
      this.$router.push({ path: "/product", query: { uid: val.recProductUid } });
    }
  }
};
var _sfc_render$6 = function render32() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "app_home" }, [_c("div", { staticClass: "top_card" }, [_c("div", { staticClass: "top_card_main" }, [_c("div", { staticClass: "card_left" }, [_vm._m(0), _c("p", { staticClass: "top_text" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_home_text1 || _vm.$t("home.text1")) + " ")]), _c("p", { staticClass: "top_text" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_home_text2 || _vm.$t("home.text2")) + " ")]), _c("p", [_c("el-button", { staticClass: "top_btn", on: { "click": _vm.handleToCustom } }, [_vm._v(_vm._s(_vm.elementContentList.portal_home_btns_btn1 || _vm.$t("home.btns.btn1")))])], 1)]), _c("div", { staticClass: "card_right" }, [_c("div", { staticClass: "right_main" }, [_c("video", { attrs: { "src": _vm.playUrl, "controls": "" } })])])])]), _c("div", { staticClass: "home_container" }, [_c("div", { staticClass: "part_two" }, [_c("p", { staticClass: "part_two_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_home_text3 || _vm.$t("home.text3")) + " ")]), _c("div", { staticStyle: { "display": "flex", "margin-top": "64px" } }, _vm._l(_vm.sectionList, function(item, index2) {
    return _c("div", { key: index2 + "se", staticClass: "part_two_left" }, [_c("div", { staticStyle: { "width": "430px" } }, [_c("p", { staticClass: "sub_title" }, [_c("span", [_vm._v(_vm._s("0" + (index2 + 1)))]), _c("span", [_vm._v(_vm._s(item.title))])]), _c("p", { staticClass: "describe" }, [_vm._v(_vm._s(item.description))]), _c("div", { staticClass: "op_card flex_b_c" }, [_c("div", { staticClass: "image" }, [_c("img", { attrs: { "src": item.thumbnailViewUrl } })]), _c("div", { staticClass: "btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleToCustom } }, [_vm._v(_vm._s(_vm.elementContentList.portal_home_text6 || _vm.$t("home.text6"))), _c("svg-icon", { staticStyle: { "width": "16px", "height": "16px", "position": "relative", "top": "-2px" }, attrs: { "icon-class": "arrow" } })], 1)], 1)])])]);
  }), 0)])]), _c("div", { staticClass: "part_three" }, [_c("div", { staticClass: "part_main" }, [_c("p", { staticClass: "part_three_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_home_title || _vm.$t("home.title")) + " ")]), _c("div", { staticClass: "product_list" }, _vm._l(_vm.productList, function(item, index2) {
    return _c("div", { key: index2.recProductSkuUid, staticClass: "pro_item", class: _vm.activeIdx == index2 ? "active" : "", style: index2 % 4 == 3 ? { marginRight: "0px" } : "", on: { "click": function($event) {
      return _vm.handleChangeProItem(index2, item);
    } } }, [_c("div", { staticClass: "active_border" }), _c("div", { staticClass: "pro_img" }, [_c("img", { attrs: { "src": item.skuPicUrl } })]), _c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(item.productName || "-"))]), _c("p", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(item.skuPrice))])]);
  }), 0)])]), _c("div", { staticClass: "part_four" }, [_c("p", { staticClass: "part_four_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_home_text4 || _vm.$t("home.text4")) + " ")]), _c("div", { staticClass: "part_four_container" }, [_c("div", { staticClass: "image_main" }, _vm._l(_vm.pictureList, function(item, index2) {
    return _c("div", { directives: [{ name: "show", rawName: "v-show", value: item.length == 5, expression: "item.length == 5" }], key: index2 + "pic", staticClass: "image_list" }, [_c("div", { staticClass: "image_list2" }, [_c("div", { staticClass: "img_ani" }, _vm._l(item, function(child) {
      return _c("div", { key: child.ossNo, staticClass: "image_item" }, [_c("img", { attrs: { "src": child.preViewUrl } })]);
    }), 0), _c("div", { staticClass: "img_ani" }, _vm._l(item, function(child) {
      return _c("div", { key: child.ossNo, staticClass: "image_item" }, [_c("img", { attrs: { "src": child.preViewUrl } })]);
    }), 0), _c("div", { staticClass: "img_ani" }, _vm._l(item, function(child) {
      return _c("div", { key: child.ossNo, staticClass: "image_item" }, [_c("img", { attrs: { "src": child.preViewUrl } })]);
    }), 0)])]);
  }), 0)])]), _c("footerBar")], 1);
};
var _sfc_staticRenderFns$6 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "index_top" }, [_c("img", { attrs: { "src": __$_require_c74407d4__ } })]);
}];
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  null
);
const index$2 = __component__$6.exports;
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2
}, Symbol.toStringTag, { value: "Module" }));
const __$_require_2caf23c9__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAHhSURBVHic7du/UsJAEIDxzz8z6bDSzs6XwM7O3re08wl4A19CK6ikS2cBN5MZheRyu3e7Yb8GiuQIv5kL5AgQRVEURVFktk5z8BvNwSu0Bt6APbDTeAHPQGvg+fj8CSUkr0BDnJQKkkeg/3BS4kjegM7hpESRPAFNwUmJIXkBysFJiSB5AJqDkypGsg5UgpMqQrIMJIGTmo1kFUgSJzULySKQBk4qG+la6UDmpomTeszZ2BJQDZwtsMnZ4UrpQHKrhfMO9Dk7WQAyiwPtgUzjQFsg8zjQDsgFDrQBcoMD9YFc4UBdIHc4UA/IJQ7UAXKLA/pArnFAF8g9DugBLQIHdIAWgwPyQIvCAVmgxeGA3ILZPQvEATmgO6FxTtUEB+SAstZ5M2uGA7JTTKOmOCAHtBIaZ1hzHJAB6pA/B5nAARkg6ellBgdkgB4ExkiZwgEZIKnpZQ4H7EwxkzhgY4qZxYFyoBVld7qbxgG4Ldx/Lk7PAecDwzhQDrTn8AZPQfXAD4f7cbbH7b8wjjJMYrljBbweH7/5CxJFURRFOk39FOvQWxRr1Y4JXzemANX4taJVG+Dz3AZTLjWWigPwwsjVwBiQxlKqtYqALr4AGjlRTzlJdyj/eb9xcb0YRVEURZfZLyyVh+pTagW+AAAAAElFTkSuQmCC";
const _sfc_main$5 = {
  name: "",
  data() {
    return {
      personalInfo: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        birthday: ""
      },
      personalName: "",
      birthday: "",
      newPhone: "",
      showDialog: false,
      showEmail: true,
      edit: "",
      authCode: "",
      disabled: false,
      isSend: false,
      remaining: 60,
      timer: null,
      newEmail: "",
      newAuthCode: "",
      newPassword: "",
      checkPwd: "",
      tips: "",
      tips2: "",
      pwdType: "password",
      pwdType2: "password",
      elementContentList: ""
    };
  },
  mounted() {
    this.elementContentList = window.elementContentList;
    this.getUserInfo();
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    showPwd2() {
      if (this.pwdType2 === "password") {
        this.pwdType2 = "";
      } else {
        this.pwdType2 = "password";
      }
    },
    getUserInfo() {
      getInfo().then((res) => {
        this.personalInfo = res.data;
      });
    },
    handleBlur3() {
      if (this.newEmail == "") {
        return this.tips = this.elementContentList.portal_login_form_validate1 || this.$t("login.form.validate1");
      } else if (!isvalidateEmail(this.newEmail)) {
        return this.tips = this.elementContentList.portal_login_form_validate2 || this.$t("login.form.validate2");
      } else {
        this.tips = "";
      }
    },
    handleBlur4() {
      if (this.newAuthCode == "") {
        return this.tips2 = this.elementContentList.portal_login_form_validate3 || this.$t("login.form.validate3");
      } else {
        this.tips2 = "";
      }
    },
    handlePwdConfirm() {
      if (this.checkPwd.length == "") {
        return this.tips2 = this.elementContentList.portal_login_form_validate8 || this.$t("login.form.validate8");
      } else if (this.newPassword != this.checkPwd) {
        return this.tips2 = this.elementContentList.portal_login_form_validate9 || this.$t("login.form.validate9");
      } else {
        this.tips2 = "";
      }
      if (this.newPassword.length == "") {
        return this.tips = this.elementContentList.portal_login_form_validate3 || this.$t("login.form.validate3");
      } else if (this.newPassword.length < 8) {
        return this.tips = this.elementContentList.portal_login_form_validate4 || this.$t("login.form.validate4");
      } else {
        this.tips = "";
      }
      updatePassword(this.authCode, this.newPassword).then((res) => {
        if (res.code == 200) {
          this.$message.success({ message: "success", duration: 1500 });
          this.showDialog = false;
        }
      });
    },
    handleBlur2() {
      if (this.checkPwd.length == "") {
        return this.tips2 = this.elementContentList.portal_login_form_validate8 || this.$t("login.form.validate8");
      } else if (this.newPassword != this.checkPwd) {
        return this.tips2 = this.elementContentList.portal_login_form_validate9 || this.$t("login.form.validate9");
      } else {
        this.tips2 = "";
      }
    },
    handleBlur() {
      if (this.newPassword.length == "") {
        return this.tips = this.elementContentList.portal_login_form_validate3 || this.$t("login.form.validate3");
      } else if (this.newPassword.length < 8) {
        return this.tips = this.elementContentList.portal_login_form_validate4 || this.$t("login.form.validate4");
      } else {
        this.tips = "";
      }
    },
    handleSendCode() {
      this.disabled = true;
      this.isSend = true;
      this.remaining = 60;
      this.timer = null;
      this.timer = setInterval(() => {
        this.remaining--;
        if (this.remaining == 0) {
          clearInterval(this.timer);
          this.disabled = false;
          this.isSend = false;
          this.remaining = 60;
        }
      }, 1e3);
      if (this.edit == "password") {
        updatePasswordAuthCodeSend().then(() => {
        });
      } else {
        updateMailAuthCodeSendOld().then(() => {
        });
      }
    },
    handleSendNewCode() {
      this.disabled = true;
      this.isSend = true;
      this.remaining = 60;
      this.timer = null;
      this.timer = setInterval(() => {
        this.remaining--;
        if (this.remaining == 0) {
          clearInterval(this.timer);
          this.disabled = false;
          this.isSend = false;
          this.remaining = 60;
        }
      }, 1e3);
      updateMailAuthCodeSendNew(this.newEmail).then((res) => {
      });
    },
    handleShowEmail() {
      if (!this.authCode) return false;
      updateMailCheckOldAuthCode(this.authCode).then((res) => {
        if (res.code == 200) {
          this.showEmail = false;
          this.disabled = false;
          this.isSend = false;
        }
      });
    },
    handleEmailConfirm() {
      if (this.newEmail == "") {
        return this.tips = this.elementContentList.portal_login_form_validate1 || this.$t("login.form.validate1");
      } else if (!isvalidateEmail(this.newEmail)) {
        return this.tips = this.elementContentList.portal_login_form_validate2 || this.$t("login.form.validate2");
      } else {
        this.tips = "";
      }
      if (this.newAuthCode == "") {
        return this.tips2 = this.elementContentList.portal_login_form_validate5 || this.$t("login.form.validate5");
      } else {
        this.tips2 = "";
      }
      updateMailCheckNewAuthCode(this.newAuthCode).then((res) => {
        if (res.code == 200) {
          updateMail(this.newEmail, this.newAuthCode, this.authCode).then((resp) => {
            if (resp.code == 200) {
              this.getUserInfo();
              this.handleClose();
            }
          });
        }
      });
    },
    handleEdit(val) {
      switch (val) {
        case "nickname":
          this.edit = "name";
          this.personalName = this.personalInfo.nickname;
          break;
        case "email":
          this.edit = "email";
          break;
        case "phoneNum":
          this.edit = "phoneNum";
          this.newPhone = this.personalInfo.phone;
          break;
        case "password":
          this.edit = "password";
          break;
        case "birthday":
          this.edit = "birthday";
          this.birthday = this.personalInfo.birthday;
          break;
      }
      this.showDialog = true;
    },
    handleSavePhoneNum() {
      if (!this.newPhone) return false;
      const params = {
        phone: this.newPhone,
        nickname: this.personalInfo.nickname,
        birthday: this.personalInfo.birthday
      };
      updateInfo(params).then((res) => {
        if (res.code == 200) {
          this.getUserInfo();
          this.handleClose();
        }
      });
    },
    handleSavebirthday() {
      const params = {
        birthday: this.birthday,
        nickname: this.personalInfo.nickname
        // phone: this.personalInfo.nickname
      };
      updateInfo(params).then((res) => {
        if (res.code == 200) {
          this.getUserInfo();
          this.handleClose();
        }
      });
    },
    handleSaveName() {
      if (!this.personalName) return false;
      const params = {
        nickname: this.personalName
        // email: this.personalInfo.email,
      };
      updateInfo(params).then((res) => {
        if (res.code == 200) {
          this.getUserInfo();
          this.handleClose();
        }
      }).catch(() => {
      });
    },
    handleClose() {
      this.showDialog = false;
      this.showEmail = true;
      this.isSend = false;
      this.disabled = false;
      this.personalName = "";
      this.birthday = "";
      this.edit = "";
      this.remaining = 60;
      this.newEmail = "";
      this.newAuthCode = "";
      this.authCode = "";
    }
  }
};
var _sfc_render$5 = function render33() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "baseInfo" }, [_c("div", { staticClass: "info_card" }, [_c("p", { staticClass: "per_name" }, [_c("span", [_vm._v(_vm._s(_vm.personalInfo.nickname))]), _c("img", { attrs: { "src": __$_require_2caf23c9__ }, on: { "click": function($event) {
    return _vm.handleEdit("nickname");
  } } })]), _c("hr"), _c("p", { staticClass: "per_detail flex" }, [_c("span", { staticClass: "per_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text1 || _vm.$t("baseInfo.text1")))]), _c("span", [_vm._v(_vm._s(_vm.personalInfo.email ? _vm.personalInfo.email : _vm.elementContentList.portal_baseInfo_text3 || _vm.$t("baseInfo.text3")))]), _c("img", { attrs: { "src": __$_require_2caf23c9__ }, on: { "click": function($event) {
    return _vm.handleEdit("email");
  } } })]), _c("p", { staticClass: "per_detail flex" }, [_c("span", { staticClass: "per_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text2 || _vm.$t("baseInfo.text2")))]), _c("span", [_vm._v(_vm._s(_vm.personalInfo.phone ? _vm.personalInfo.phone : _vm.elementContentList.portal_baseInfo_text3 || _vm.$t("baseInfo.text3")))]), _c("img", { attrs: { "src": __$_require_2caf23c9__ }, on: { "click": function($event) {
    return _vm.handleEdit("phoneNum");
  } } })]), _c("p", { staticClass: "per_detail flex" }, [_c("span", { staticClass: "per_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text4 || _vm.$t("baseInfo.text4")))]), _c("span", [_vm._v(_vm._s(_vm.personalInfo.password ? "" : "********"))]), _c("img", { attrs: { "src": __$_require_2caf23c9__ }, on: { "click": function($event) {
    return _vm.handleEdit("password");
  } } })]), _c("p", { staticClass: "per_detail flex" }, [_c("span", { staticClass: "per_label" }, [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text5 || _vm.$t("baseInfo.text5")))]), _c("span", [_vm._v(_vm._s(_vm.personalInfo.birthday ? _vm.personalInfo.birthday.split(" ")[0] : _vm.elementContentList.portal_baseInfo_text3 || _vm.$t("baseInfo.text3")))]), _c("img", { attrs: { "src": __$_require_2caf23c9__ }, on: { "click": function($event) {
    return _vm.handleEdit("birthday");
  } } })])]), _vm.showDialog ? _c("div", { staticClass: "my_dialog" }, [_vm.edit == "name" ? _c("div", { staticClass: "dialog_card" }, [_c("p", { staticClass: "dia_title flex_b_c" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_baseInfo_text6 || _vm.$t("baseInfo.text6")) + " "), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("p", { staticClass: "name_input" }, [_c("el-input", { model: { value: _vm.personalName, callback: function($$v) {
    _vm.personalName = $$v;
  }, expression: "personalName" } })], 1), _c("p", { staticClass: "dia_btns" }, [_c("el-button", { staticClass: "cancel", on: { "click": _vm.handleClose } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]), _c("el-button", { staticClass: "save", on: { "click": _vm.handleSaveName } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_save || _vm.$t("btns.save")))])], 1)]) : _vm._e(), _vm.edit == "birthday" ? _c("div", { staticClass: "dialog_card" }, [_c("p", { staticClass: "dia_title flex_b_c" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_baseInfo_text7 || _vm.$t("baseInfo.text7")) + " "), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("p", { staticClass: "name_input" }, [_c("el-date-picker", { attrs: { "type": "date", "value-format": "yyyy-MM-dd", "placeholder": "Select Date" }, model: { value: _vm.birthday, callback: function($$v) {
    _vm.birthday = $$v;
  }, expression: "birthday" } })], 1), _c("p", { staticClass: "dia_btns" }, [_c("el-button", { staticClass: "cancel", on: { "click": _vm.handleClose } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]), _c("el-button", { staticClass: "save", on: { "click": _vm.handleSavebirthday } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_save || _vm.$t("btns.save")))])], 1)]) : _vm._e(), _vm.edit == "phoneNum" ? _c("div", { staticClass: "dialog_card" }, [_c("p", { staticClass: "dia_title flex_b_c" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_baseInfo_text8 || _vm.$t("baseInfo.text8")) + " "), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("p", { staticClass: "name_input" }, [_c("el-input", { model: { value: _vm.newPhone, callback: function($$v) {
    _vm.newPhone = $$v;
  }, expression: "newPhone" } })], 1), _c("p", { staticClass: "dia_btns" }, [_c("el-button", { staticClass: "cancel", on: { "click": _vm.handleClose } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]), _c("el-button", { staticClass: "save", on: { "click": _vm.handleSavePhoneNum } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_save || _vm.$t("btns.save")))])], 1)]) : _vm._e(), _vm.edit == "email" || _vm.edit == "password" ? _c("div", { staticClass: "dialog_card" }, [_vm.showEmail ? _c("div", [_c("p", { staticClass: "dia_title flex_b_c" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_baseInfo_text9 || _vm.$t("baseInfo.text9")) + " "), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("p", { staticStyle: { "font-size": "14px", "line-height": "22px", "margin-top": "23px" } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_baseInfo_text10 || _vm.$t("baseInfo.text10")) + " ")]), _c("p", { staticStyle: { "font-size": "16px", "font-weight": "500", "line-height": "24px", "margin-top": "35px" } }, [_vm._v(" " + _vm._s(this.personalInfo.email) + " ")]), _c("p", { staticClass: "auth_code flex_b_c" }, [_c("el-input", { attrs: { "placeholder": _vm.elementContentList.portal_baseInfo_placeholder1 || _vm.$t("baseInfo.placeholder1") }, model: { value: _vm.authCode, callback: function($$v) {
    _vm.authCode = $$v;
  }, expression: "authCode" } }), _c("el-button", { staticClass: "send_code", class: _vm.disabled ? "disabled" : "", attrs: { "disabled": _vm.disabled }, on: { "click": _vm.handleSendCode } }, [_vm._v(_vm._s(_vm.isSend ? _vm.elementContentList.portal_login_text7 || _vm.$t("login.text7") + ` (${_vm.remaining} s)` : _vm.elementContentList.portal_login_text6 || _vm.$t("login.text6")))])], 1), _c("p", { staticClass: "continue" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleShowEmail } }, [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text11 || _vm.$t("baseInfo.text11")))])], 1)]) : _vm._e(), !_vm.showEmail && _vm.edit == "email" ? _c("div", [_c("p", { staticClass: "dia_title flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text12 || _vm.$t("baseInfo.text12")))]), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("p", { staticClass: "new_email" }, [_c("el-input", { attrs: { "placeholder": _vm.elementContentList.portal_baseInfo_placeholder2 || _vm.$t("baseInfo.placeholder2") }, on: { "blur": _vm.handleBlur3 }, model: { value: _vm.newEmail, callback: function($$v) {
    _vm.newEmail = $$v;
  }, expression: "newEmail" } })], 1), _c("p", { staticClass: "err_tip" }, [_vm._v(_vm._s(_vm.tips))]), _c("p", { staticClass: "auth_code flex_b_c" }, [_c("el-input", { attrs: { "placeholder": _vm.elementContentList.portal_baseInfo_placeholder3 || _vm.$t("baseInfo.placeholder3") }, on: { "blur": _vm.handleBlur4 }, model: { value: _vm.newAuthCode, callback: function($$v) {
    _vm.newAuthCode = $$v;
  }, expression: "newAuthCode" } }), _c("el-button", { staticClass: "send_code", class: _vm.disabled ? "disabled" : "", attrs: { "disabled": _vm.disabled }, on: { "click": _vm.handleSendNewCode } }, [_vm._v(_vm._s(_vm.isSend ? _vm.elementContentList.portal_login_text7 || _vm.$t("login.text7") + ` (${_vm.remaining} s)` : _vm.elementContentList.portal_login_text6 || _vm.$t("login.text6")))])], 1), _c("p", { staticClass: "err_tip" }, [_vm._v(_vm._s(_vm.tips2))]), _c("p", { staticClass: "continue" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleEmailConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)]) : _vm._e(), !_vm.showEmail && _vm.edit == "password" ? _c("div", [_c("p", { staticClass: "dia_title flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_baseInfo_text13 || _vm.$t("baseInfo.text13")) + " ")]), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("p", { staticClass: "new_email" }, [_c("el-input", { attrs: { "type": _vm.pwdType, "placeholder": _vm.elementContentList.portal_baseInfo_placeholder4 || _vm.$t("baseInfo.placeholder4") }, on: { "blur": _vm.handleBlur }, model: { value: _vm.newPassword, callback: function($$v) {
    _vm.newPassword = $$v;
  }, expression: "newPassword" } }, [_c("span", { attrs: { "slot": "suffix" }, on: { "click": _vm.showPwd }, slot: "suffix" }, [_c("i", { staticClass: "el-icon-view" })])])], 1), _c("p", { staticClass: "err_tip" }, [_vm._v(_vm._s(_vm.tips))]), _c("p", { staticClass: "new_email" }, [_c("el-input", { attrs: { "type": _vm.pwdType2, "placeholder": _vm.elementContentList.portal_baseInfo_placeholder5 || _vm.$t("baseInfo.placeholder5") }, on: { "blur": _vm.handleBlur2 }, model: { value: _vm.checkPwd, callback: function($$v) {
    _vm.checkPwd = $$v;
  }, expression: "checkPwd" } }, [_c("span", { attrs: { "slot": "suffix" }, on: { "click": _vm.showPwd2 }, slot: "suffix" }, [_c("i", { staticClass: "el-icon-view" })])])], 1), _c("p", { staticClass: "err_tip" }, [_vm._v(_vm._s(_vm.tips2))]), _c("p", { staticClass: "continue" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handlePwdConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)]) : _vm._e()]) : _vm._e()]) : _vm._e()]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  null
);
const baseInfo = __component__$5.exports;
const baseInfo$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: baseInfo
}, Symbol.toStringTag, { value: "Module" }));
const __$_require_26cec958__ = "/static/visa-DpQhmH71.png";
const _sfc_main$4 = {
  name: "",
  data() {
    return {
      paymentList: [],
      showAddForm: false,
      formData: {
        name: "",
        number: "",
        month: "01",
        year: "",
        code: ""
      },
      formRules: {
        name: [{ required: true, message: elementContentList.portal_pay_msg1 || this.$t("pay.msg1"), trigger: "blur" }],
        number: [{ required: true, message: elementContentList.portal_pay_msg2 || this.$t("pay.msg2"), trigger: "blur" }],
        month: [{ required: true, message: "", trigger: "change" }],
        year: [{ required: true, message: "", trigger: "change" }],
        code: [{ required: true, message: elementContentList.portal_pay_msg3 || this.$t("pay.msg3"), trigger: "blur" }]
      },
      monthList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      yearList: [],
      elementContentList: ""
    };
  },
  mounted() {
    this.elementContentList = window.elementContentList;
    this.getYearList();
  },
  methods: {
    getYearList() {
      let date = /* @__PURE__ */ new Date();
      let y = date.getFullYear();
      this.formData.year = y;
      let arr = [y];
      for (let i = 0; i < 20; i++) {
        y++;
        arr.push(y);
      }
      this.yearList = arr;
    },
    handleCancel() {
      this.showAddForm = false;
    },
    handleConfirm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.showAddForm = false;
        }
      });
    },
    handleAddNew() {
      this.showAddForm = true;
    }
  }
};
var _sfc_render$4 = function render34() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "payments" }, [_c("div", { staticClass: "title flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_pay_text1 || _vm.$t("pay.text1")))]), this.paymentList.length > 0 ? _c("el-button", { staticClass: "btn", on: { "click": _vm.handleAddNew } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_addNew || _vm.$t("btns.addNew")))]) : _vm._e()], 1), this.paymentList.length > 0 ? _c("div", { staticClass: "payments_container" }, _vm._l(4, function(item, idx) {
    return _c("div", { key: idx, staticClass: "payments_item" }, [_c("div", { staticClass: "item_top" }, [_c("div", [_c("div", { staticStyle: { "font-size": "20px", "line-height": "28px", "font-weight": "500" } }, [_vm._v(" " + _vm._s("Visa") + " ")]), _c("div", { staticStyle: { "padding": "17px 0 9px" } }, [_vm._v(_vm._s("****2132"))])]), _vm._m(0, true)]), _c("div", { staticClass: "flex_b_c", staticStyle: { "margin-top": "10px" } }, [_c("div", { staticClass: "default" }, [_vm._v(_vm._s("Defualt"))]), _c("el-button", { staticStyle: { "color": "#f6497f", "padding": "0" }, attrs: { "type": "text" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_edit || _vm.$t("btns.edit")))])], 1)]);
  }), 0) : _vm._e(), this.paymentList.length == 0 ? _c("div", { staticClass: "nodata flex_c_c" }, [_vm._m(1), _c("p", [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleAddNew } }, [_vm._v(_vm._s(_vm.elementContentList.portal_pay_text2 || _vm.$t("pay.text2")))])], 1)]) : _vm._e(), _vm.showAddForm ? _c("div", { staticClass: "dialog flex_c_c" }, [_c("div", { staticClass: "form_card" }, [_c("p", { staticClass: "dia_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_pay_text3 || _vm.$t("pay.text3")) + " ")]), _c("el-form", { ref: "formData", attrs: { "model": _vm.formData, "label-position": "top", "rules": _vm.formRules } }, [_c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_pay_text4 || _vm.$t("pay.text4") } }), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_pay_text5 || _vm.$t("pay.text5"), "prop": "number" } }, [_c("el-input", { model: { value: _vm.formData.number, callback: function($$v) {
    _vm.$set(_vm.formData, "number", $$v);
  }, expression: "formData.number" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_pay_text6 || _vm.$t("pay.text6"), "prop": "name" } }, [_c("el-input", { model: { value: _vm.formData.name, callback: function($$v) {
    _vm.$set(_vm.formData, "name", $$v);
  }, expression: "formData.name" } })], 1), _c("el-form-item", { staticClass: "date", attrs: { "label": _vm.elementContentList.portal_pay_text7 || _vm.$t("pay.text7"), "prop": "month" } }, [_c("el-select", { staticClass: "month", attrs: { "placeholder": "" }, model: { value: _vm.formData.month, callback: function($$v) {
    _vm.$set(_vm.formData, "month", $$v);
  }, expression: "formData.month" } }, _vm._l(_vm.monthList, function(item) {
    return _c("el-option", { key: item, attrs: { "label": item, "value": item } });
  }), 1)], 1), _c("el-form-item", { staticClass: "date", attrs: { "prop": "year" } }, [_c("el-select", { staticClass: "year", attrs: { "placeholder": "" }, model: { value: _vm.formData.year, callback: function($$v) {
    _vm.$set(_vm.formData, "year", $$v);
  }, expression: "formData.year" } }, _vm._l(_vm.yearList, function(item) {
    return _c("el-option", { key: item, attrs: { "label": item, "value": item } });
  }), 1)], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_pay_text8 || _vm.$t("pay.text8"), "prop": "code" } }, [_c("el-input", { model: { value: _vm.formData.code, callback: function($$v) {
    _vm.$set(_vm.formData, "code", $$v);
  }, expression: "formData.code" } })], 1), _c("el-form-item", { staticStyle: { "margin-top": "64px" }, attrs: { "label": "" } }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_pay_text9 || _vm.$t("pay.text9")))]), _c("el-button", { staticClass: "btn btn2", on: { "click": _vm.handleCancel } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))])], 1)], 1)], 1)]) : _vm._e()]);
};
var _sfc_staticRenderFns$4 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("img", { attrs: { "src": __$_require_26cec958__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", [_c("img", { attrs: { "src": __$_require_5cbca94a__ } })]);
}];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null
);
const payments = __component__$4.exports;
const payments$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: payments
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  name: "",
  data() {
    return {
      showAddForm: false,
      formData: {
        country: "United Kingdom",
        name: "",
        phoneNumber: "",
        postCode: "",
        detailAddress: "",
        detailAddressTwo: "",
        city: "",
        region: "",
        defaultStatus: 0,
        memberId: ""
      },
      formRules: {
        name: [{ required: true, trigger: "blur", message: elementContentList.portal_address_text21 || this.$t("address.text21") }],
        phoneNumber: [{ required: true, trigger: "blur", message: elementContentList.portal_address_text22 || this.$t("address.text22") }],
        postCode: [{ required: true, trigger: "blur", message: elementContentList.portal_address_text23 || this.$t("address.text23") }],
        detailAddress: [{ required: true, trigger: "blur", message: elementContentList.portal_address_text24 || this.$t("address.text24") }],
        city: [{ required: true, trigger: "blur", message: elementContentList.portal_address_text25 || this.$t("address.text25") }]
      },
      addressList: [],
      userInfo: "",
      status: "add",
      elementContentList: ""
    };
  },
  mounted() {
    this.elementContentList = window.elementContentList;
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.formData.memberId = this.userInfo.id;
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      addressList().then((res) => {
        let data = res.data;
        let index2 = "";
        let defaultAdd = "";
        data.forEach((item, idx) => {
          if (item.defaultStatus) {
            defaultAdd = item;
            index2 = idx;
          }
        });
        data.splice(index2, 1);
        data.unshift(defaultAdd);
        this.addressList = data;
      });
    },
    handleEdit(val) {
      this.status = "edit";
      addressInfo(val.id).then((res) => {
        if (res.code == 200) {
          this.formData = res.data;
          this.showAddForm = true;
        }
      });
    },
    handleRemove(val, index2) {
      const h = this.$createElement;
      let text1 = this.elementContentList.portal_address_text26 || this.$t("address.text26");
      let text2 = this.elementContentList.portal_address_text27 || this.$t("address.text27");
      let text3 = this.elementContentList.portal_btns_ok || this.$t("btns.ok");
      let text4 = this.elementContentList.portal_btns_cancel || this.$t("btns.cancel");
      this.$msgbox({
        message: h("div", null, [
          h("p", { style: "font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;" }, text1),
          h("p", null, text2)
        ]),
        cancelButtonClass: "cancel_btn",
        confirmButtonClass: "confirm_btn",
        showCancelButton: true,
        confirmButtonText: text3,
        cancelButtonText: text4,
        type: "warning"
      }).then(() => {
        delleteAddress(val.id).then((res) => {
          if (res.code == 200) {
            this.getAddressList();
          }
        });
      }).catch(() => {
      });
    },
    handleConfirm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const params = {
            ...this.formData,
            defaultStatus: this.formData.defaultStatus ? 1 : 0
          };
          if (this.status == "add") {
            addAddress(params).then((res) => {
              if (res.code == 200) {
                this.getAddressList();
                this.showAddForm = false;
                this.$message.success({ message: this.elementContentList.portal_address_text28 || this.$t("address.text28"), duration: 1500 });
              }
            });
          } else {
            updateAddress(params, this.formData.id).then((res) => {
              if (res.code == 200) {
                this.getAddressList();
                this.showAddForm = false;
                this.$message.success({ message: this.elementContentList.portal_address_text28 || this.$t("address.text28"), duration: 1500 });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.showAddForm = false;
    },
    handleAddNew() {
      this.status = "add";
      this.showAddForm = true;
      this.formData = {
        country: "United Kingdom",
        name: "",
        phoneNumber: "",
        postCode: "",
        detailAddress: "",
        detailAddressTwo: "",
        city: "",
        region: "",
        defaultStatus: 0,
        memberId: ""
      };
    }
  }
};
var _sfc_render$3 = function render35() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "addresses" }, [_c("div", { staticClass: "title flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_address_text1 || _vm.$t("address.text1")))]), this.addressList.length > 0 ? _c("el-button", { staticClass: "btn", on: { "click": _vm.handleAddNew } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_addNew || _vm.$t("btns.addNew")))]) : _vm._e()], 1), this.addressList.length > 0 ? _c("div", { staticClass: "addresses_container" }, _vm._l(_vm.addressList, function(item, index2) {
    return _c("div", { key: index2 + "a", staticClass: "addr_item", style: index2 % 2 == 1 ? { marginRight: 0 } : "" }, [_c("div", { staticClass: "addr_row", staticStyle: { "font-weight": "500" } }, [_c("div", { staticClass: "addr_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text2 || _vm.$t("address.text2")) + " ")]), _c("div", { staticClass: "addr_val" }, [_vm._v(_vm._s(item.name))])]), _c("div", { staticClass: "addr_row" }, [_c("div", { staticClass: "addr_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text3 || _vm.$t("address.text3")) + " ")]), _c("div", { staticClass: "addr_val" }, [_vm._v(_vm._s(item.country))])]), _c("div", { staticClass: "addr_row" }, [_c("div", { staticClass: "addr_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text4 || _vm.$t("address.text4")) + " ")]), _c("div", { staticClass: "addr_val" }, [_vm._v(_vm._s(item.detailAddress))])]), _c("div", { staticClass: "addr_row" }, [_c("div", { staticClass: "addr_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text5 || _vm.$t("address.text5")) + " ")]), _c("div", { staticClass: "addr_val" }, [_vm._v(_vm._s(item.postCode))])]), _c("div", { staticClass: "addr_row" }, [_c("div", { staticClass: "addr_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text6 || _vm.$t("address.text6")) + " ")]), _c("div", { staticClass: "addr_val" }, [_vm._v(_vm._s(item.phoneNumber))])]), _c("div", { staticClass: "btns" }, [item.defaultStatus ? _c("div", { staticClass: "default" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_btns_default || _vm.$t("btns.default")) + " ")]) : _vm._e(), _c("div", { staticStyle: { "float": "right" } }, [_c("el-button", { staticStyle: { "color": "#f6497f", "padding": "0" }, attrs: { "type": "text" }, on: { "click": function($event) {
      return _vm.handleRemove(item, index2);
    } } }, [_vm._v(_vm._s("Remove"))]), _c("span", { staticStyle: { "color": "#fde1e6", "margin": "0 10px" } }, [_vm._v(" | ")]), _c("el-button", { staticStyle: { "color": "#f6497f", "padding": "0" }, attrs: { "type": "text" }, on: { "click": function($event) {
      return _vm.handleEdit(item);
    } } }, [_vm._v(_vm._s("Edit"))])], 1)])]);
  }), 0) : _vm._e(), this.addressList.length == 0 ? _c("div", { staticClass: "nodata flex_c_c" }, [_vm._m(0), _c("p", { staticStyle: { "margin": "22px 0" } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_address_text7 || _vm.$t("address.text7")) + " ")]), _c("p", [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleAddNew } }, [_vm._v(_vm._s(_vm.elementContentList.portal_address_text8 || _vm.$t("address.text8")))])], 1)]) : _vm._e(), _vm.showAddForm ? _c("div", { staticClass: "dialog flex_c_c" }, [_c("div", { staticClass: "form_card" }, [_c("p", { staticClass: "dia_title" }, [_vm._v(" " + _vm._s(_vm.status == "add" ? _vm.elementContentList.portal_address_text9 || _vm.$t("address.text9") : _vm.elementContentList.portal_address_text10 || _vm.$t("address.text10")) + " ")]), _c("el-form", { ref: "formData", attrs: { "model": _vm.formData, "label-position": "top", "rules": _vm.formRules } }, [_c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text11 || _vm.$t("address.text11") } }, [_c("el-input", { attrs: { "disabled": "" }, model: { value: _vm.formData.country, callback: function($$v) {
    _vm.$set(_vm.formData, "country", $$v);
  }, expression: "formData.country" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text12 || _vm.$t("address.text12"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.name, callback: function($$v) {
    _vm.$set(_vm.formData, "name", $$v);
  }, expression: "formData.name" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text13 || _vm.$t("address.text13"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.phoneNumber, callback: function($$v) {
    _vm.$set(_vm.formData, "phoneNumber", $$v);
  }, expression: "formData.phoneNumber" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text14 || _vm.$t("address.text14"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.postCode, callback: function($$v) {
    _vm.$set(_vm.formData, "postCode", $$v);
  }, expression: "formData.postCode" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text15 || _vm.$t("address.text15"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.detailAddress, callback: function($$v) {
    _vm.$set(_vm.formData, "detailAddress", $$v);
  }, expression: "formData.detailAddress" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text16 || _vm.$t("address.text16") } }, [_c("el-input", { model: { value: _vm.formData.detailAddressTwo, callback: function($$v) {
    _vm.$set(_vm.formData, "detailAddressTwo", $$v);
  }, expression: "formData.detailAddressTwo" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text17 || _vm.$t("address.text17"), "required": "" } }, [_c("el-input", { model: { value: _vm.formData.city, callback: function($$v) {
    _vm.$set(_vm.formData, "city", $$v);
  }, expression: "formData.city" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_address_text18 || _vm.$t("address.text18") } }, [_c("el-input", { model: { value: _vm.formData.region, callback: function($$v) {
    _vm.$set(_vm.formData, "region", $$v);
  }, expression: "formData.region" } })], 1), _c("el-form-item", { staticClass: "checkbox", attrs: { "label": "" } }, [_c("el-checkbox", { model: { value: _vm.formData.defaultStatus, callback: function($$v) {
    _vm.$set(_vm.formData, "defaultStatus", $$v);
  }, expression: "formData.defaultStatus" } }), _c("span", { staticStyle: { "margin-left": "8px" } }, [_vm._v(_vm._s(_vm.elementContentList.portal_address_text19 || _vm.$t("address.text19")))])], 1), _c("el-form-item", { attrs: { "label": "" } }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.status == "add" ? _vm.elementContentList.portal_address_text8 || _vm.$t("address.text8") : _vm.elementContentList.portal_address_text20 || _vm.$t("address.text20")))]), _c("el-button", { staticClass: "btn btn2", on: { "click": _vm.handleCancel } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))])], 1)], 1)], 1)]) : _vm._e()]);
};
var _sfc_staticRenderFns$3 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", [_c("img", { attrs: { "src": __$_require_5cbca94a__ } })]);
}];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
const addresses = __component__$3.exports;
const addresses$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: addresses
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  props: {
    // productDetail: {
    //   type: Object,
    //   default: () => { }
    // },
    afterSalePro: {
      type: Object,
      default: () => {
      }
    },
    title: {
      type: String,
      default: ""
    },
    productUid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      quantity: "",
      attributeGroupValueVOs: [],
      productDetail: "",
      imageUrl: "",
      elementContentList: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.getProDetail();
  },
  methods: {
    getProDetail() {
      const params = {
        productUid: this.productUid
      };
      proDetail(params).then((res) => {
        if (res.code == 200) {
          this.productDetail = res.data;
          this.imageUrl = res.data.picResourceVOs[0].preViewUrl;
          this.productDetail.attributeGroupValueVOs.map((item) => {
            let arr = [];
            item.attributeValueVOS.forEach((attr) => {
              let obj = {
                ...attr,
                check: false
              };
              arr.push(obj);
            });
            let obj2 = {
              ...item,
              attributeValueVOS: arr
            };
            this.attributeGroupValueVOs.push(obj2);
          });
        }
      });
    },
    handleClose() {
      this.$parent.showProInfo = false;
    },
    handleConfirm() {
      this.$parent.showProInfo = false;
      this.$emit("changeUid", this.skuDetail.productSkuStockUid);
    },
    handleChangeAttr(parent, index2, val, idx) {
      this.attributeGroupValueVOs[index2].attributeValueVOS.forEach((item) => {
        if (item.productAttributeValueUid == val.productAttributeValueUid) {
          item.check = true;
        } else {
          item.check = false;
        }
      });
      let arr = [];
      this.attributeGroupValueVOs.forEach((item) => {
        item.attributeValueVOS.forEach((attr) => {
          if (attr.check) {
            arr.push(attr.productAttributeValueUid);
          }
        });
      });
      const params = {
        productAttributeValueUidList: arr,
        productBaseUid: this.productDetail.productBaseUid
      };
      getVisibleSkuAttrValues$1(params).then((res) => {
      });
      getSkuDetail$1(params).then((res) => {
        this.skuDetail = res.data;
      });
      checkProductSkuStock$1(params).then((res) => {
      });
    },
    handleInput() {
      this.quantity = this.quantity.replace(/[^\d]/g, "");
      if (this.quantity < 1) return this.quantity = "";
    }
  }
};
var _sfc_render$2 = function render36() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "productInfo flex_c_c" }, [_c("div", { staticClass: "info_card" }, [_c("p", { staticClass: "dia_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text14 || _vm.$t("order.text14"))), _c("i", { staticClass: "el-icon-close", on: { "click": _vm.handleClose } })]), _c("div", { staticClass: "info_container" }, [_c("div", { staticClass: "info_left" }, [_c("div", { staticClass: "info_image" }, [_c("img", { attrs: { "src": _vm.imageUrl } })])]), _c("div", { staticClass: "info_right" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(" " + _vm._s(_vm.productDetail.name) + " ")]), _c("p", { staticClass: "unit_price" }, [_vm._v(" £ "), _c("span", [_vm._v(_vm._s(_vm.productDetail.price))])]), _vm._l(_vm.attributeGroupValueVOs, function(item, index2) {
    return _c("div", { key: index2 + "attribute" }, [_c("p", { staticClass: "spec_label" }, [_vm._v(_vm._s(item.productAttributeName))]), _c("div", { staticClass: "spec_color" }, _vm._l(item.attributeValueVOS, function(attr, idx) {
      return _c("div", { key: attr.productAttributeValueUid, staticClass: "spec_color_item flex", class: attr.check == true ? "active" : "", on: { "click": function($event) {
        return _vm.handleChangeAttr(item, index2, attr, idx);
      } } }, [_c("span", [_vm._v(_vm._s(attr.value))]), _c("div", { staticClass: "active_border" })]);
    }), 0)]);
  }), _c("p", { staticClass: "spec_label" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text33 || _vm.$t("order.text33")) + " ")]), _c("p", { staticClass: "qty_btns flex" }, [_c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-minus", "disabled": "" } }), _c("el-input", { attrs: { "disabled": "" }, on: { "input": _vm.handleInput }, model: { value: _vm.afterSalePro.productQuantity, callback: function($$v) {
    _vm.$set(_vm.afterSalePro, "productQuantity", $$v);
  }, expression: "afterSalePro.productQuantity" } }), _c("el-button", { staticClass: "btn", attrs: { "icon": "el-icon-plus", "disabled": "" } })], 1), _c("p", { staticClass: "buy_btns" }, [_c("el-button", { staticClass: "btn", on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_confirm || _vm.$t("btns.confirm")))])], 1)], 2)])])]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null
);
const productInfo = __component__$2.exports;
const __$_require_740a2a7a__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA1VSURBVHic7Z1bctvGEob/BsXIVOQ69AqMrCDKCgw9uAr0i6UVmF6BpRVwWGcBslcgegW2XyJW5UHwCsyzgiArIFOiRTkW0OeBgELzMhfcKeGr8ouJy4g/p2emp7sHqKmpqampqampqampqal5OFDZDciCsSvsHcAmwAaABugpADCFbWZqWyAfAAK6/RvcmADAd8DDDSZPPDEpq91FsHUCX7nCIQoOLFjPANg8F7ad4pE+gBEAn0Gf/5nBu0+iV17gmSvsgIIjC9YzBpyUYuriARgFTJ8eD4VXwPtyo5ICz1xhB4BjAa9A7JTZFgYmFltvb8Gft1HsSgl85QqnQfwGwFHZbdmAR2x5Nzf8blvMeCUEnrqiW4Xeqkvcq7dB6FIFnrqiaxH3EM1+t41tELoUgWeusAH0mLhbxvtzwA+YXldxjC5c4Jnb7zGFIstnMjAhphGIR8TWBPhxzQv8uDbG3GIcIHvL4RHT69ZQ+Bk/NzGFCTxzhc3El0j5pcZihhR8Ym6Mbm8wSmMex66wm/Pl1zOazwFSt49B/f0L8TbNc7KiEIGnHXFigc9SPMInJu8WeJ+3GRy7wm7O190vATgpHvXx24xelz025yrw2BHtR49wlnSsJaZBSPj084X4mHHTtJg+FweNBr0MKTxJ6GDxQ6Lj/d/FKPPGaZKbwGlMMjENAPSrMpaNHdFutoKuBesNEvw9Iei0LJOdi8BJxa2asOtIurQjtkRr2Ovn0yrJe7N+4PSFOCDmS0OT9pGYTqss7CLzoYfemJruMkTOVODo131ucIsfMvX3h2KQZTuKIrJU5zCYjDFh8PPv/df5tepHMhM4Qc+t3JoxKaarhCJ7ciYCz1xhh8RfdMUtazzKk2ij5ByaY3NR30FqgU0mVAxMmOiwzGVDnowd0d5t8SXmXjIlRYicSuDoD/oCvV+tT0yH98Ekyxg7ov3THp8Ro6tzPYOO81znW2lu/mmPz1CL+wNPPDGJJlFa614Cn0WbL7mQWOBpR5xo/kofjLiL7F30T4ktoXFpPBPPhUQm2mDG/CDFXeTri965TkfIazxO1IMt5g8qcaNdnwctLgBE5tpTXccUijxMtbHAM7ev5aYLmY4furgx32Z0jHl4rpRoNZIpRgLP17vhieo6YktUMbqhLJ54YkJMhwyotg7taUcov18TjARm4nONcde7b06MLGgNhc8g5fdigd9kaaq1Bb5yhQOFzzUadwvzs24b+xfibbRjJsMG0Mvqndqz6OtO7xIKgUOm13lsHETesnjN7QdM77IeAhYCAQ8ATIitXCyRruePmH7JYg6jJXDkZ1VNALy9i/5h2gYts8mRn+WyYvpCHFjMH7D6pY/2Lvq/ZfGOH96nsetGTIPWUKS2hlomujHf4JYSEp2mbcwyY0e0CevfzRSKry96qR0E8Zoe63vUQdaTHgCIrJwvu4aJu1mMxUqBdcZeYkvksYHwU0uebEaMbhqRdRw2FuNl0ufLCG/pWOOy1GOxUmALeKW65uaG36VtSFKSijx1RddijS1O4sRtk7H/hxiByZNdExIfjR2RKptSKvDYEW0QSxPBiGmQV2ioxdCyCrHIul+GSeQJseXpXJeEAJDOIQhoNx+lS8STCtxsBV2NdW9ua97WUPiaDnsQo7vb4kuVyIZhRX6e1unxUHiqXqxjQRX3yz60VOOPl7c7sjXs9XVFBnAgE3naEScm4hLTYd6B6yHwXnoBsZNmsrVR4OhLcmQ3B6z2zGRBFiLP3H7PIG6qsF0wnRl1QEFiM71RYJXtZ2Bye6M3RmZBEpHjX75hwlvhW5ykMtPcSDyT3ygwAc9kNxKQ2+RqE6YiM/Hldad3VmVxAeBWw0wnnU1vHoMVs+eA6VOSF6bFUGQbgK6jorTghMjtKn3vziO9QL5l1go8doW0NFHR5nkZQ5F1qELkifT7bBAnMtNrBW4qBnVCupzcLMhQ5NG3Gf1WdnBCqLKITNn1YOLGr7Kb8lz8m9Aa9vphuu3J0bdZ/kshHRqKsJ5ol8uY9QIT27KbbsGfk7wsD/aHYpBQ5MqIC8QBAZsjPghojxOshzdNsqQPutWILyqSBCJ/rJK4McQkHYd3EuQmrwgcTcc3PoiByZMKBtPtD8WAod6hYcJg76J/XDVxAQDEUoGJAmMzvSJws6mINKhY711EIwXELzJ105QQ4V+yzy1YT02fuSIwNxTxzgozUpMc5ob0u2UmY2fHzvJ/UAI7nzcL8VIO0rXPvu70VBu8PrE1qGL1uiTarAisIi6uXRRjR7SzqK9lgM0Uit0WugB+KeidAAAKMDFXRM7qLJqCIuoxa7PbKq2WpT11RbfIF35vKALjiY21WRG4wTv/kd0QgKUTgRworbSwldA9mJgbZeZD+jG4glRqHNRhKY57EoI+lVUnyzj5LC7qWRSqxX+ehAiNPXZXrnCY+E/MLc8BAMcCn113eupgg0fKHmr8Y18RuAQTrKKPctbeo/2L/xr3usbmkKCT1GM6U3qB1e8IC52EtYbC/zaj3zAvieAX8MoRsSWSZDREvmJ70+eqALpmoMy59k3btDIGqx6SZLGdlmg9ehr9k6JY5/p7F/3clj7NAG3prCYKoNu0NUk72a8WjHtwFR0hVWH/DzGCupdtzFZgBLbsxiQ+iBWBVZEaSfclHwqqADpZzlESX7OKFYPyxBOTr53eZFPIDgHtsSPaZbnx1Huick+k6v4Mdsr6gLzoSjAPRx6s+ciW32c+AV47YkTnHzgbb5oHgHmmL0vKzBU2A+fzNqXKFbJ350uYjUQ/bi9ptfbWUPjXrvBk319Ujniw5iOpdfy+4TuPsjXeYN4p/ZDpfZynvX4MJpb+YUn2JZMS18Es6kylyHId7bb4S9JQVWW2AmBHWZt3JNmHn7nCvu70/oyyNeJDRhyL+DwqlrNeYNUCPzoYshCY+CxhOf202M1W0E1yo062ws7SkkmVaEBLvXfqim5Im8tIxmWZ1gqs3JdMd1iFKaVN6tJkFISKtJ7lyZZFLA10RPSDGTuiPXPFuaVREOcWWC/w46HwVAFgyyYmR0rzRSdxLMSooiQBgOfjZowiVYg+z1xh77b4i+4hJ7RJ4OhDaQN3QEWZaWk78oSBxNGj89RXZUWdI+CuioKtaMzLyMctv+7ucky+3+DjRoFV4zBT2NV5UVq+zagsX7SXtmKQMuco2nPW6SxkeDQRg/pPPDHZWGVn+lwcWDv8RfaQgOmwiIp28SEYTKED9S9Y9bkv/ZTJD4H3WZWDuu705L2OycM8Dn3zNQYsn7wmLaN03el9gWSSk1Wpnywp0xe9jgQHlaRhJcdK6osOmaTlCzhl9vlDQGfJlAXRDthK8TSpwBozQRugVDUkHgIq/3RKfAYdbyoKJxW4NRS+qkgIU5hJwa57Ti6lLohpQEyHsoB/5XahjtstKNbxsXXodBRT5qUchfLcKaXAOmOIRdyre7EcjY6iiz8vVKpXp1Nrw1/ldkPGJXDvIxlNtt6um0jJ0BJYt3jm9LmogwEkaHSUTfgh0+u9i75xwVftkB2dxlk7/MG0AQVTaoy1jn96DR4xHSZ1vGgLrGli7HgfsjQkk5myMyM1/dN3RGvbVMVhjILuiElZ8JspFEXn9CyyqcAnAxMrx7qaumj4pwHDiZQMI4F1f4FlzqofD4UXzH+Ii711ZHH5lXSAu5pYskT1t1lW/dE+syHG4LTR0mtPxSE3VcvzjQ71/IAf/Qe5HJZtLDBg5ECvVCWbqnHlCocoOCA0/LxOIE0kMGBU4PPj3kVfp3x9TQ4kFhjQ2OuMYMLgn2s6rXty8aQ6PziaVfvq6/SqsddkT6oeDNydOSSN/Fig9IlX3iwVjEHZBV1S9WAA2P9djAyqzNlMfFlgRGahTDvihIn/jKIebdwVdMn+VFFdUvfgGMOq6rkdiFwGC722u+mavI79U5GZwIC5yJj7WZV7mlUmWjKqKwExeXtDofQEZk2mAgPmIjMwsdh6W8XCYzKuXOHsAK90g9BR0nIx9Ri8jGkNZwLa0Tj1ZRvG5pkr7JkrzhvElwbigtgqZaMj8x4cc+UKxyL+kCBxzFtMf6wKOuOshNI8erkJDBj5rdfhhwjffZ81Cj/dZZGvHXFkzdNGugkfUeo8I1eBgTvHeg/6p5+swwuY+rc3xZwVsTC+OkiRcVCFlULuAsdMO+KEwL00ub4MTGhe5si7BX/OKm0mdvo3uPFrBhVtgXms8mleGwgmFCYwcGeyz5FRmG0k+ISZPCKehEz/I8IkZEwowCQu7hmXwrcIbWa0G6CnUb0vBxnnH0f75f2qLP0KFTgmOjL+HPepJBOTFwD9IpLxTChFYODfjMGQwpOSSjRkQtV67DKlCRyzrUJXXdiY0gWO2Raht0XYmMoIvMiVKxwLeAXio0qIzeSFwPtGAQdiZ00lBY4ZO6LdbAVd4savhYu9xaIuUmmBl5k+FwfYCZyoTldc+CsLRph7zj4zN0ZFOVSKYKsEXmbsiHazCRsNHDRAT0P8e+biSlVc4gkzTeKKrQH4Lwb8+yRmTU1NTU1NTU1NTU1NTc1D5/+xEdQ0VJnPCwAAAABJRU5ErkJggg==";
const __$_require_70a0793c__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAASHSURBVHic7d1dTttYGMbx53ValQhGCisYL6GzgjF3pjdlB4UVjFhBDitoWUHDDjo3EGkuyA6GJXgHsQQUpCF+e0HooBBq5+RE9nn1/C7z4RzlLzsfto8BIiIiIiIiIiKiGIjPk6aZG2ALg9CDoV/bHbti1ec0DnyXuxTAsBI9EDBuGxQoBRiJymm/YexGgW8+uPeiesmw3aBAqSJ7O+fuqu6xtYGnmRu86+u/ANIQg6NgClHZq1uTk7qlbG3JX2DcLkpnQFb3oNrAKtX7IMOh4BLgU91j3jRYzrLAk0rlbPUhka9E9BMW11jR2u9ETQK/oCrFztiNfJ5Lfm5z96eILt5cG7h2E01xY2DjGNg4BjaOgY1jYOMY2DgGNo6BjWNg4xjYOAY2joGNY2DjmuwuLBdvENH0OndZ+OHQa6TBvt9l6gOrlHi5HzLriWY+L0hB1R50V7uJFsgkyFAoONFk/cCAngEo1h8OhaRAeX+vp3WPqw3cH7tCIce65LOY2vHYQo52J662SaNv0dsX7puK7AGYrDs4WpPKJFH5Y/vCfWvy8JXPTZpmbvC2PztMkHxevG+msvfAzfla3gBpT/Ry8fYK1fF/d71Rk7V2YXmr2Z248iZ3y75Z4wEofE6Qov9Nc4fesju0V64aF+AfHeYxsHEMbBwDG8fAxjGwcQxsHAMbx8DGMbBxDGwcAxvHwMYxsHEMbBwDG8fAxnnNk9Wmm9wdJqIfodLZiVEVKCD4u+lxU5sUTeC73KUqegloCgDLDhnqivmBboff94eNJgzdpCg20dPMDR7jRjcpaqqil/O5tlsRReB3fR0ivrhP0pngoK0XjyKwAodtj2EdCbR2VthN6fxn8DRzA8HSM+uuoNK9sy1EU7zc2rQ2JXPnA7928Y9K5bSLM97e5SdDlcq1PY4nUWyiyR8DG8fAxjGwcQxsHAMb1/2fSQFMA/xVGOtpsaYDz3+THv7cQbGG2/1hqSrHXfzt/StmN9HXucvmfzikIZYnwCAR/drmjgMfZgOLzDby92Al7f3t6MNuYPSKTSy30rhmGzIb+HFmIIxCLlM0cb+N3STkMjfN9Jes7fOTo+vcnUmIz+EZrnb+GdbOLNc1pgMDQGxrXGhmN9H0iIGNY2DjGNg4BjaOgY2L9mdSIvrxLj/5ve1xLFKpsrbH8FznA++OXfF9f7jsrgOVqrUDyldUtPXCcWyiNfrrRrR2EloUgQU4ansMvhQoRaX22gqbEkXg/tgVFeS47XGs6unaCjy7sIGdC/dlprKnKiN0/7IBV6IyWuXaCpvS+S9Zz813HExaHkZUolmDyQ8DG8fAxjGwcQxsHAMbx8DGMbBxDGwcAxvHwMYxsHFBdza8ldnBTb76NW7pGZkNQq53XoH1ld11CZLPXZ4FNg7L4772nvstrcbDPaI7CStmCpS+77lX4N2JK0UT5/NcWl2iyRefy7sDP+eu9nP7YfhVNO6ZYLtOBaPt8xPvY9LW+jTfPj85mh8rxU12eFeVytE6cYE11+BFIaYroninbCIiIiIiIiIiIvL3Aw5PO0ks7RjLAAAAAElFTkSuQmCC";
const __$_require_725551db__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAApWSURBVHic7Z1dUhtJEsf/2YIxstkI+QTuGyw+wTYPjhDzYuYEFiewfQIVsQcAn8D4BOCXRRH7YM0JzJxge04gbZhB2KY790GlNWB1VXZ39YdE/V67pC74K+sjKysT8Hg8Ho/H4/F4PB6Px+PxeDwej6daqOkO3OeyrwYB8UtmmjIlf2yf//O46T6Z0P19zUBIwAUxHXRHKm66XwtaI7D+Rw0BhPceXXyd0e7TsZo20C0jl3vqTQA+WvLo+PH54dvaO7SExgWe9VXIxEcA9rPaENNJd6QOauyWlVlfhSnxZwJ6GU3Gj88Pd2vt1BKCJl8+6x8Omfg/MIgLAEy8U1OX8jA0iAsA0WVfDerqTBYbTbxUW+0pI22jcFYmkeqlxPu24S8AXgE4qaFLpj7Uy197ap+JPwEQi0scnFXYpfxsoWex3jnEYfWdMVOrwLP+4ZDAp/h5IWXi4vqa31XUpUI8na+SY0HTi2p7Yqc2ga/2hkdMqcrzGWI6aesKOmU6ZMDYr4Sp8R9m5avoSaR6j7r8HpaF1D1iYtpt035yGZNI9Ta7ySBA8BJAdOtRzKC3T85V41NLpQJrcfPOt6o7Gh5W2K1K+NJXEQEhEabfZhi3ZdSpTOAC4q6E1a4alc3BvzzmI8jFPf46o+deXPdUsg++2hsegTGQtF3VIXlVcC7w5Z56A/AbSduU6WB7NDxx3QfPD5zOwV/6KurMnRhGGJgy0e72v1Tj+8R1x5nAelH1GRYnRlPizvoqTICIgfhvIzWu8902vvRVBAA317hwvfp2JvDV3vAT7u4FlzIfltWJq/dKmB9q3HGyxAnTQdNCa5/8J9w1iuOvMzp0JbSTVfR83hWIC3pbt7hz3/dPHrSwQ/xp1ldhnX25zSRSvSXiAsCbrS0sO2MuRGmBJ5HqEXgoaHq8fa5qj84g8CvDY0m/K2Fri14jYzpj4oGro8bSAj/qsu1cFJgffjcV4ZC5F+d8hx5OYXBkeh4QD12MMKUE1osD45aIgSkxtSoaY0UIATKNPiJKCdwhydDcriC0tpACH2xtmFJV1ooLC6ytN7I0G7fhRKWN6MVmLGhaap1QWGCb9fqh2U7KZHXRMvGgjBUXElhivQEHx35oNqOtWDLCFbbiQgJ3iF+bnjMwbVuYTVshJuvuoowV5xZ4EqkeC6y3LQfebac7UjExnQiaFrLi3AJvdpOBad/rrTc/SQLr/4vJvG/OIrfAOv4o+7m33txs/1tdwB6BGRbxbuUSeDKfByJTG2+9xUgFEZg6kD4XuQTepMQWGdmaYLNVY3ukTmxhuCCO8i62cglsG54ZzccBrzIBk3XLlAhO7e58p7ShXj2bHPfTbzOM87zcc5eU8NHWJu8wLRZ4Yws7ptUzwX00wkPjybk6kwzTeb5TLDBRYgyBTZFaf30eO8RkDWVahPhIEAscIPiH6fl37vhDBQeklFgNZQNk1OI2eRZZxvn3qfc7O4G5Y7VgW7DAbUQCTyLVgyH6geAXV66QBALmyXggEnhz0xraEktf6BFhtGICetrorIgEpg2zwCnTH5Lv8YiJbQ02tmT3vkQCM5uD6thbsFOIA+s8TMKAQdHdpA7oGYMzn9+UEFgHpe8jxx1iZxBHV3vD7D+sIAxMyyRFS+jmv4HF9jqgZ5Lvklkwpebx/tqyOc/gVlqHlcy2k4V2CEUp8eciB/WETuyqL8IhmowCF/Fg6UWC6BbiqkJAj4lP834uZbvBpJBl8GksEZp0kbAG7EhXvFXQnMB+YVYLjQncHakYTOOm3l8jjR7CNJqrkoADrLklM+yxz1Ui2iYRsfEXOIlUr8ivtDtS8SRSzze7yYC48/e8n5dAxIOsZwxMIThkL0IAigH+8LjANkmyx7VpskAmMAdTpjS7wRZ6sJ1jZqB/GJVdK73aG0bI+IcR08XjlqUplkIciP7foiE6Af9per7R4DXMdUTixLBpskC2D7bMk1K3mUeGZI9LJBsxZYcNifnLAuJK5s+HCgmOA7+xLJOtSGAdmJ0N00NxWtSCKPOA0D2cZ5uUKXJLU+6vJJcvlDG4URNLdy15BI6zHhDQu3yhvMgu2EgiWxPO4SASC5wi/d3YoPNgfMuVIvEHMCXiAAu5Bd90xsYvIjbeevAIIbYnTrdocRuxwHqhFWc9t90Z9tjRScVt0TNT66L3Frl80WQY+wnotaFO0CrTkYyCOV2ruQROAOM87Ifp4ui7XwNbO7ZocJ9cAn+/tiYM2W8y/+Mq80sXouFZoMEdcgms917GF7AlQYtnOQT7/63IBb/c58EMsmVoy1M+xwNxUjkkgrxa98ktsM5cFxuaFMol8ZCRpIRkYFokv3WhiI7UcpPfVabUh4DUegMOCp2ZF0uExtaJPnSRKfUhILXeosltCgksSd7lIlPquqOnssjWrkxqqjJBd5JEmu9LfP9aM4lUj2hpefg7lE0sV1hgfefGNi9Eup6D5x6PuvxeUoO4bGK5UmGzNE/eFRvboOEFF1Oc+UwYmega/aO3biddpIUsJXB3pGJbzmN9P+dTU9c3yHSOLbim6ZpZX4XCIiZglC+vUzrwXec8tuZZ1DWEmyCrkHPtlcUXpXRE5eGBsYsqNU5uNhDTb4Jm+7P+Ye1lbLojFQdMzwGMtdBxU5XFdbnd0NbOZbZ8Z5XPllQXW/7CB1pt9K9fh+9JWJE1Bb11VWPKaXHKq73hKQSLh4cmch5xMa8xtevq3U4vn+n09LGt3dwJUv9w3QQ5xY2/zkTTnRjnJd5nfRWmxJ8lC4l1tmRdePIUwvQUVVVldS4wMC8ISRCnLjj7OqODdUpkmlFV1EhVVVkruR/85FydEQdK2Hz/UZc/X/66HnHVl301SMleR/k2xIGqqiprJRa8QLqyXuBy9Vg32ls3ZMN95GVUPU1VKjCQX2QA44TpsOnizXm47KtBMD/2C/N8ro41SOUCA4VEBhxXwq4CPdceoUCYUl0LzFoEBuYO9gD247HbMDANODi+vuZ3bRK66HC8oM6pqDaBgXl4SkB8KvTF/h+dGvAkYfrY5ND9pa8iXdavaGBhnDAd1Pk31CowkH9/uIRxivTj91nnpA6rvnyhdoINfoW5qGGJr4qJabfugp21CwzMT1UedXmI8qkMx8TB+Ab8+821m3xUc0cNdgLGS11OLiz7nQCOmypx34jAC/SQ9x7ucnzEzDQOQHEC/pMIU75B/L3z83HhInEMUbITIHgGph0Qhw77AgBxynRY1R5XQqMCA06tuW0cE9O7pmsoNy7wAm3NQ6z+NdQLYvqtaWEXtEbgBSssdOPD8TJaJ/CClRGaaZwCH9om7ILWCrxAC/2SAWNh6jqZO2DoLEnwLs9t+yZovcALJpHqbW5hPyB+xTDXUayQs5Tp4/drnLXJs2ZiZQS+zSRSvY0t7OiUBzuoahhnGoP4omkPWhlWUuD7TCLV29xEiA52dFrFED88ZaHps9oNGoNpCuKLFOmfzJ0LV46TplkLgW1MItXTKY9/cI3pOgjo8Xg8Ho/H4/F4PB6Px+PxeDwrwP8AD5+BVySa7yoAAAAASUVORK5CYII=";
const _sfc_main$1 = {
  props: {
    afterSaleProduct: {
      type: Object,
      default: () => {
      }
    },
    orderInfo: {
      type: Object,
      default: () => {
      }
    }
  },
  components: {
    productInfo
  },
  data() {
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_order_form_tip3 || this.$t("order.form.tip3")));
      } else if (Number(value) <= 0 || Number(value) > Number(this.afterSalePro.productPrice)) {
        callback(new Error(this.elementContentList.portal_order_form_tip2 || this.$t("order.form.tip2")));
      } else {
        callback();
      }
    };
    const validate2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.elementContentList.portal_order_form_tip1 || this.$t("order.form.tip1")));
      } else {
        callback();
      }
    };
    return {
      type: 1,
      afterType: "JUST_REFUND",
      // 售后类型:JUST_REFUND=仅退款；RETURN_REFUND=退货退款；EXCHANGE=换货；PATCH=补件
      reasonType: "",
      // 退款原因:JUST_REFUND_NOT_WANT=不想要此商品、JUST_REFUND_WRONG_PRODUCT=买错商品" + "、JUST_REFUND_NO_DELIVERY=快递一直未送到、RETURN_REFUND_NOT_LIKE=不喜欢此商品、RETURN_REFUND_NOT_MATCH=商品与描述不符" + "、RETURN_REFUND_WRONG_PRODUCT_AGAIN=商家发错商品、EXCHANGE_WRONG_PRODUCT_AGAIN=商家发错商品、EXCHANGE_WRONG_SIZE=买错商品规格" + "、PATCH_BROKEN=收到商品破损或变形、PATCH_LESS_PRODUCT=商家少发商品
      status: 0,
      // 0=发起售后申请；1=商家处理中；2=完成退款；3=完成换货；4=完成补件；5=售后已关闭；
      showType: true,
      formData: {
        reasonType: "",
        refundAmount: "",
        remark: ""
      },
      rules: {
        reasonType: [
          { required: true, trigger: "change", validator: validate2 }
        ],
        refundAmount: [
          { required: true, trigger: "blur", validator: validate }
        ],
        remark: ""
      },
      reasonList: [],
      BASE_API: "",
      headers: {
        "Authorization-Portal": getToken()
      },
      imageList: [],
      showSuccess: false,
      isNew: true,
      labelList: {},
      showProInfo: false,
      exchangeProductSkuUid: "",
      afterId: "",
      elementContentList: "",
      afterSalePro: ""
    };
  },
  created() {
    this.elementContentList = window.elementContentList;
    this.BASE_API = "http://47.109.137.136:7010";
    console.log("this.orderInfo", this.orderInfo);
    console.log("this.afterSaleProduct", this.afterSaleProduct);
    this.afterSalePro = this.afterSaleProduct;
    if (this.orderInfo.order.hasAfter) {
      this.isNew = false;
      this.showType = false;
      if (this.orderInfo.afterList) {
        this.afterId = this.orderInfo.afterList[0].afterId;
      } else {
        this.afterId = this.afterSaleProduct.orderAfterVO.afterId;
      }
      this.getDetails();
    }
    this.changeReasonList();
    this.formData.refundAmount = this.afterSalePro.productPrice;
  },
  methods: {
    getDetails() {
      afterDetail({ afterId: this.afterId }).then((res) => {
        this.formData.reasonType = res.data.reasonType;
        this.formData.refundAmount = res.data.refundAmount;
        this.formData.remark = res.data.remark;
        this.afterType = res.data.afterType;
        this.afterSalePro = res.data.orderItemVO;
        let arr = [];
        res.data.afterResourceVOS.forEach((item) => {
          let obj = {
            fileRequest: {
              ossNo: item.ossNo,
              preViewUrl: item.preViewUrl
            },
            sort: item.sort
          };
          arr.push(obj);
        });
        this.imageList = arr;
        let currNode = res.data.currNode;
        switch (currNode) {
          case "APPLY_JUST_REFUND":
          case "APPLY_RETURN_REFUND":
          case "APPLY_EXCHANGE":
          case "APPLY_PATCH":
            this.status = 0;
            break;
          case "PROCESS_JUST_REFUND":
          case "PROCESS_RETURN_REFUND":
          case "PROCESS_EXCHANGE":
          case "PROCESS_PATCH":
            this.status = 1;
            break;
          case "RETURN_RETURN_REFUND":
            this.status = 2;
            break;
          case "DELIVER_EXCHANGE":
            this.status = 3;
            break;
          case "FINISH_REFUND_JUST_REFUND":
          case "FINISH_REFUND_RETURN_REFUND":
          case "FINISH_EXCHANGE":
          case "FINISH_PATCH":
            this.status = 4;
            break;
        }
      });
    },
    getUid(val) {
      this.exchangeProductSkuUid = val;
    },
    handleChoosePro() {
      this.showProInfo = true;
    },
    changeReasonList() {
      switch (this.afterType) {
        case "JUST_REFUND":
          this.reasonList = [
            { label: this.elementContentList.portal_order_select_op1 || this.$t("order.select.op1"), value: "JUST_REFUND_NOT_WANT" },
            { label: this.elementContentList.portal_order_select_op2 || this.$t("order.select.op2"), value: "JUST_REFUND_WRONG_PRODUCT" },
            { label: this.elementContentList.portal_order_select_op3 || this.$t("order.select.op3"), value: "JUST_REFUND_NO_DELIVERY" }
          ];
          this.labelList = {
            label1: this.elementContentList.portal_order_formt_label3 || this.$t("order.form.label3"),
            label2: this.elementContentList.portal_order_formt_label4 || this.$t("order.form.label4"),
            label3: this.elementContentList.portal_order_formt_label5 || this.$t("order.form.label5")
          };
          break;
        case "RETURN_REFUND":
          this.reasonList = [
            { label: this.elementContentList.portal_order_select_op4 || this.$t("order.select.op4"), value: "RETURN_REFUND_NOT_LIKE" },
            { label: this.elementContentList.portal_order_select_op5 || this.$t("order.select.op5"), value: "RETURN_REFUND_NOT_MATCH" },
            { label: this.elementContentList.portal_order_select_op6 || this.$t("order.select.op6"), value: "RETURN_REFUND_WRONG_PRODUCT_AGAIN" }
          ];
          this.labelList = {
            label1: this.elementContentList.portal_order_form_label7 || this.$t("order.form.label7"),
            label2: this.elementContentList.portal_order_form_label8 || this.$t("order.form.label4"),
            label3: this.elementContentList.portal_order_form_label9 || this.$t("order.form.label8")
          };
          break;
        case "EXCHANGE":
          this.reasonList = [
            { label: this.elementContentList.portal_order_select_op7 || this.$t("order.select.op7"), value: "EXCHANGE_WRONG_PRODUCT_AGAIN" },
            { label: this.elementContentList.portal_order_select_op8 || this.$t("order.select.op8"), value: "EXCHANGE_WRONG_SIZE" }
          ];
          this.labelList = {
            label1: this.elementContentList.portal_order_form_label9 || this.$t("order.form.label9"),
            label2: this.elementContentList.portal_order_form_label4 || this.$t("order.form.label4"),
            label3: this.elementContentList.portal_order_form_label10 || this.$t("order.form.label10")
          };
          break;
        case "PATCH":
          this.reasonList = [
            { label: this.elementContentList.portal_order_select_op9 || this.$t("order.select.op9"), value: "PATCH_BROKEN" },
            { label: this.elementContentList.portal_order_select_op10 || this.$t("order.select.op10"), value: "PATCH_LESS_PRODUCT" }
          ];
          this.labelList = {
            label1: this.elementContentList.portal_order_form_label12 || this.$t("order.form.label12"),
            label2: this.elementContentList.portal_order_form_label4 || this.$t("order.form.label4"),
            label3: this.elementContentList.portal_order_form_label13 || this.$t("order.form.label13")
          };
          break;
      }
    },
    handleChooseType(val) {
      this.afterType = val;
      this.showType = false;
      this.changeReasonList();
    },
    handleRevoke() {
      const h = this.$createElement;
      let text1 = this.elementContentList.portal_order_box_text1 || this.$t("order.box.text1");
      let text2 = this.elementContentList.portal_order_box_text2 || this.$t("order.box.text2");
      let text3 = this.elementContentList.portal_btns_confirm || this.$t("btns.confirm");
      let text4 = this.elementContentList.portal_btns_cancel || this.$t("btns.cancel");
      this.$msgbox({
        message: h("div", null, [
          h("p", { style: "font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;" }, text1),
          h("p", null, text2)
        ]),
        cancelButtonClass: "cancel_btn",
        confirmButtonClass: "confirm_btn",
        showCancelButton: true,
        confirmButtonText: text3,
        cancelButtonText: text4,
        type: "warning"
      }).then(() => {
        this.$parent.showAfterSale = false;
        this.$parent.getOrderList();
      }).catch(() => {
      });
    },
    handleSubmit() {
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
            refundAmount: this.formData.refundAmount
          };
          afterApply(params).then((res) => {
            if (res.code == 200) {
              this.showSuccess = true;
              this.afterId = res.data;
            }
          });
        } else {
          return false;
        }
      });
    },
    handleToDetail() {
      this.isNew = false;
      this.showSuccess = false;
      afterDetail(this.afterId).then((res) => {
      });
    },
    handleBack() {
      this.$parent.showAfterSale = false;
    },
    handleInput(val) {
      this.formData.refundAmount = this.formData.refundAmount.replace(/[^\d]/g, "");
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 500) {
        this.$message.error({ message: res.message, duration: 1500 });
        return false;
      }
      let obj = {
        fileRequest: {
          fileName: res.data.fileName,
          fileSize: res.data.fileSize,
          ossNo: res.data.ossNo,
          preViewUrl: res.data.preViewUrl
        }
      };
      this.imageList.push(obj);
    },
    handleRemoveImage(val, idx) {
      this.imageList.splice(idx, 1);
    },
    handleOnExceed() {
      this.$message.error({ message: this.elementContentList.portal_order_text32 || this.$t("order.text32"), duration: 1500 });
    }
  }
};
var _sfc_render$1 = function render37() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "afterSale" }, [_c("div", { staticClass: "back flex" }, [_c("i", { staticClass: "el-icon-arrow-left", on: { "click": _vm.handleBack } }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text1 || _vm.$t("order.text1")))])]), !_vm.showSuccess ? _c("div", { staticStyle: { "height": "calc(100% - 36px)" } }, [_vm.showType ? _c("div", [_c("p", { staticClass: "subtitle" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text2 || _vm.$t("order.text2")) + " ")]), _vm.afterSalePro.productType != "custom" ? _c("div", { staticClass: "pro_info flex" }, [_c("div", { staticClass: "image" }, [_vm.afterSalePro.productPicUrl ? _c("img", { attrs: { "src": _vm.afterSalePro.productPicUrl } }) : _c("img", { staticStyle: { "width": "70px", "height": "70px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "info" }, [_c("p", [_vm._v(" " + _vm._s(_vm.afterSalePro.productName) + " ")]), _c("p", _vm._l(_vm.afterSalePro.attributeValueVOs, function(attr) {
    return _c("span", { key: attr.productAttributeUid, staticStyle: { "margin-right": "8px" } }, [_vm._v(_vm._s(attr.productAttributeName + ":" + attr.value))]);
  }), 0), _c("p", [_vm._v(_vm._s("x" + _vm.afterSalePro.productQuantity))]), _c("p", [_vm._v(_vm._s("£" + _vm.afterSalePro.productPrice))])])]) : _c("div", { staticClass: "pro_info flex" }, [_c("div", { staticClass: "image flex_c_c" }, [_vm.afterSalePro.productPicUrl ? _c("img", { attrs: { "src": _vm.afterSalePro.productPicUrl } }) : _c("img", { staticStyle: { "width": "70px", "height": "70px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_detail" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(_vm.afterSalePro.productName))]), _vm._l(_vm.afterSalePro.orderPageCusObjItemVOs, function(it) {
    return _c("p", { key: it.cartCusItemId, staticClass: "pro_style" }, [_c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.objNickname))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s((it.height ? it.height + "cm, " : "") + (it.weight ? it.weight + "kg" : "")))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.ratio))]), _c("span", { staticStyle: { "color": "#F6497F" } }, [_vm._v("£ " + _vm._s(it.productPrice))])]);
  }), _c("div", { staticClass: "pro_info2" }, _vm._l(_vm.afterSalePro.orderPageCusServiceItemVOs, function(pro) {
    return _c("div", { key: pro.cartCusItemId, staticClass: "pro_item flex" }, [_c("div", { staticClass: "flex_c_c img" }, [_c("img", { attrs: { "src": pro.productPicUrl } })]), _c("div", { staticClass: "pro_name" }, [_c("div", { staticClass: "name" }, [_vm._v(_vm._s(pro.productName))]), _c("div", [_c("span", [_vm._v(_vm._s("x " + pro.productQuantity))]), _c("span", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(pro.productPrice))])])])]);
  }), 0)], 2)]), _c("p", { staticClass: "subtitle" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text3 || _vm.$t("order.text3")) + " ")]), _c("div", { staticClass: "types flex" }, [_vm.orderInfo.order.status == 1 || _vm.orderInfo.order.status == 7 || _vm.orderInfo.order.status == 6 ? _c("div", { staticClass: "type_item flex", on: { "click": function($event) {
    return _vm.handleChooseType("JUST_REFUND");
  } } }, [_vm._m(0), _c("div", { staticClass: "name" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text4 || _vm.$t("order.text4")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text5 || _vm.$t("order.text5")) + " ")])])]) : _vm._e(), _vm.afterSalePro.productType != "custom" && _vm.orderInfo.order.status == 2 ? _c("div", { staticClass: "type_item flex", staticStyle: { "margin-right": "0" }, on: { "click": function($event) {
    return _vm.handleChooseType("RETURN_REFUND");
  } } }, [_vm._m(1), _c("div", { staticClass: "name" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text6 || _vm.$t("order.text6")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text7 || _vm.$t("order.text7")) + " ")])])]) : _vm._e(), _vm.afterSalePro.productType != "custom" && _vm.orderInfo.order.status == 2 ? _c("div", { staticClass: "type_item flex", on: { "click": function($event) {
    return _vm.handleChooseType("EXCHANGE");
  } } }, [_vm._m(2), _c("div", { staticClass: "name" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text8 || _vm.$t("order.text8")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text9 || _vm.$t("order.text9")) + " ")])])]) : _vm._e(), _vm.afterSalePro.productType != "custom" && _vm.orderInfo.order.status == 2 ? _c("div", { staticClass: "type_item flex", staticStyle: { "margin-right": "0" }, on: { "click": function($event) {
    return _vm.handleChooseType("PATCH");
  } } }, [_vm._m(3), _c("div", { staticClass: "name" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text10 || _vm.$t("order.text10")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text11 || _vm.$t("order.text11")) + " ")])])]) : _vm._e()])]) : _c("div", { staticClass: "apply" }, [_c("div", { staticClass: "sted flex_a_c" }, [_c("div", { staticClass: "step_item", class: _vm.status < 7 ? "completed" : "" }, [_vm._m(4), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_status_status1 || _vm.$t("order.status.status1")) + " ")])]), _c("div", { staticClass: "step_item", class: _vm.status < 7 && _vm.status > 0 ? "completed" : "" }, [_vm._m(5), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_status_status2 || _vm.$t("order.status.status2")) + " ")])]), _vm.afterType == "RETURN_REFUND" || _vm.afterType == "EXCHANGE" ? _c("div", { staticClass: "step_item", class: _vm.status < 7 && _vm.status > 1 ? "completed" : "" }, [_vm._m(6), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_status_status3 || _vm.$t("order.status.status3")) + " ")])]) : _vm._e(), _vm.afterType == "EXCHANGE" ? _c("div", { staticClass: "step_item", class: _vm.status < 7 && _vm.status > 2 ? "completed" : "" }, [_vm._m(7), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_status_status4 || _vm.$t("order.status.status4")) + " ")])]) : _vm._e(), _c("div", { staticClass: "step_item", class: _vm.status < 7 && _vm.status > 3 ? "completed" : "" }, [_vm._m(8), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.afterType == "JUST_REFUND" ? _vm.elementContentList.portal_order_status_status5_1 || _vm.$t("order.status.status5_1") : _vm.afterType == "RETURN_REFUND" ? _vm.elementContentList.portal_order_status_status5_2 || _vm.$t("order.status.status5_2") : _vm.afterType == "EXCHANGE" ? _vm.elementContentList.portal_order_status_status5_3 || _vm.$t("order.status.status5_3") : _vm.elementContentList.portal_order_status_status5_4 || _vm.$t("order.status.status5_4")) + " ")])]), _vm.status == 5 ? _c("div", { staticClass: "step_item", class: _vm.status < 7 && _vm.status == 5 ? "completed" : "" }, [_vm._m(9), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_status_status6 || _vm.$t("order.status.status6")) + " ")])]) : _vm._e()]), _c("el-form", { ref: "formData", attrs: { "model": _vm.formData, "label-width": "80px", "rules": _vm.rules } }, [_c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_order_form_label1 || _vm.$t("order.form.label1") } }, [_vm.afterSalePro.productType != "custom" ? _c("div", { staticClass: "pro_info flex" }, [_c("div", { staticClass: "image" }, [_c("img", { attrs: { "src": _vm.afterSalePro.productPicUrl } })]), _c("div", { staticClass: "info" }, [_c("p", [_vm._v(" " + _vm._s(_vm.afterSalePro.productName) + " ")]), _c("p", _vm._l(_vm.afterSalePro.attributeValueVOs, function(attr) {
    return _c("span", { key: attr.productAttributeUid, staticStyle: { "margin-right": "8px" } }, [_vm._v(_vm._s(attr.productAttributeName + ":" + attr.value))]);
  }), 0), _c("p", [_vm._v(_vm._s("x" + _vm.afterSalePro.productQuantity))]), _c("p", [_vm._v(_vm._s("£" + _vm.afterSalePro.productPrice))])])]) : _c("div", { staticClass: "pro_info cus_info flex" }, [_c("div", { staticClass: "image flex_c_c" }, [_vm.afterSalePro.productPicUrl ? _c("img", { attrs: { "src": _vm.afterSalePro.productPicUrl } }) : _c("img", { staticStyle: { "width": "70px", "height": "70px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_detail" }, [_c("p", { staticClass: "pro_title" }, [_vm._v(_vm._s(_vm.afterSalePro.productName))]), _vm._l(_vm.afterSalePro.orderPageCusObjItemVOs, function(it) {
    return _c("p", { key: it.cartCusItemId, staticClass: "pro_style" }, [_c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.objNickname))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s((it.height ? it.height + "cm, " : "") + (it.weight ? it.weight + "kg" : "")))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(it.ratio))]), _c("span", { staticStyle: { "color": "#F6497F" } }, [_vm._v("£ " + _vm._s(it.productPrice))])]);
  }), _c("div", { staticClass: "pro_info2" }, _vm._l(_vm.afterSalePro.orderPageCusServiceItemVOs, function(pro) {
    return _c("div", { key: pro.cartCusItemId, staticClass: "pro_item flex" }, [_c("div", { staticClass: "flex_c_c img" }, [_c("img", { attrs: { "src": pro.productPicUrl } })]), _c("div", { staticClass: "pro_name" }, [_c("div", { staticClass: "name" }, [_vm._v(_vm._s(pro.productName))]), _c("div", [_c("span", [_vm._v(_vm._s("x " + pro.productQuantity))]), _c("span", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(pro.productPrice))])])])]);
  }), 0), _c("p", { staticStyle: { "color": "#F6497F" } }, [_vm._v("£ " + _vm._s(_vm.afterSalePro.productPrice))])], 2)])]), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_order_form_label2 || _vm.$t("order.form.label2") } }, [_c("span", [_vm._v(_vm._s(_vm.afterType == "JUST_REFUND" ? _vm.elementContentList.portal_order_text4 || _vm.$t("order.text4") : _vm.afterType == "RETURN_REFUND" ? _vm.elementContentList.portal_order_text6 || _vm.$t("order.text6") : _vm.afterType == "EXCHANGE" ? _vm.elementContentList.portal_order_text8 || _vm.$t("order.text8") : _vm.elementContentList.portal_order_text10 || _vm.$t("order.text10")))])]), _c("el-form-item", { attrs: { "label": _vm.labelList.label1, "prop": "reasonType" } }, [_c("el-select", { attrs: { "placeholder": _vm.elementContentList.portal_order_form_placeholder2 || _vm.$t("order.form.placeholder2"), "disabled": !_vm.isNew }, model: { value: _vm.formData.reasonType, callback: function($$v) {
    _vm.$set(_vm.formData, "reasonType", $$v);
  }, expression: "formData.reasonType" } }, _vm._l(_vm.reasonList, function(item) {
    return _c("el-option", { key: item.value, attrs: { "value": item.value, "label": item.label } });
  }), 1)], 1), _vm.afterType == "JUST_REFUND" || _vm.afterType == "RETURN_REFUND" ? _c("el-form-item", { staticClass: "money", attrs: { "label": _vm.labelList.label2, "prop": "refundAmount" } }, [_c("el-input", { attrs: { "disabled": !_vm.isNew }, on: { "input": _vm.handleInput }, model: { value: _vm.formData.refundAmount, callback: function($$v) {
    _vm.$set(_vm.formData, "refundAmount", $$v);
  }, expression: "formData.refundAmount" } }, [_c("i", { staticStyle: { "font-style": "normal", "margin-right": "10px" }, attrs: { "slot": "prefix" }, slot: "prefix" }, [_vm._v("£")])]), _c("span", { staticClass: "productPrice" }, [_vm._v(_vm._s((_vm.elementContentList.portal_order_text13 || _vm.$t("order.text13")) + _vm.afterSalePro.productPrice))])], 1) : _vm._e(), _vm.afterType == "EXCHANGE" || _vm.afterType == "PATCH" ? _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_order_form_label11 || _vm.$t("order.form.label11") } }, [_c("el-button", { staticClass: "choose_btn", on: { "click": _vm.handleChoosePro } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn4 || _vm.$t("order.btns.btn4")))])], 1) : _vm._e(), _c("el-form-item", { attrs: { "label": _vm.labelList.label3 } }, [_c("el-input", { attrs: { "type": "textarea", "disabled": !_vm.isNew, "placeholder": _vm.elementContentList.portal_order_form_placeholder1 || _vm.$t("order.form.placeholder1") }, model: { value: _vm.formData.remark, callback: function($$v) {
    _vm.$set(_vm.formData, "remark", $$v);
  }, expression: "formData.remark" } })], 1), _c("el-form-item", { attrs: { "label": _vm.elementContentList.portal_order_form_label6 || _vm.$t("order.form.label6") } }, [_c("div", { staticClass: "upload_image" }, [_vm.isNew ? _c("el-upload", { attrs: { "action": _vm.BASE_API + "/file/img/upload", "list-type": "picture", "accept": "image/*", "headers": _vm.headers, "file-list": _vm.imageList, "show-file-list": false, "limit": 5, "on-success": _vm.handleSuccess, "on-exceed": _vm.handleOnExceed } }, [_c("div", { staticClass: "upload flex_c_c" }, [_c("i", { staticClass: "el-icon-plus" }), _c("span", [_vm._v("Upload")]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text12 || _vm.$t("order.text12")))])])]) : _vm._e(), _c("div", { staticClass: "image_list" }, _vm._l(_vm.imageList, function(item, idx) {
    return _c("div", { key: idx + "img", staticClass: "image_item" }, [_c("img", { attrs: { "src": item.fileRequest.preViewUrl } }), _vm.isNew ? _c("div", { staticClass: "delete_mask flex_c_c" }, [_c("span", { on: { "click": function($event) {
      return _vm.handleRemoveImage(item, idx);
    } } }, [_c("i", { staticClass: "el-icon-delete" })])]) : _vm._e()]);
  }), 0)], 1)])], 1), _c("p", { staticClass: "btns" }, [_vm.isNew ? _c("el-button", { staticClass: "sub_btn", on: { "click": _vm.handleSubmit } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_submit || _vm.$t("btns.submit")))]) : _c("el-button", { staticClass: "re_btn", on: { "click": _vm.handleRevoke } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn3 || _vm.$t("order.btns.btn3")))]), _vm.isNew ? _c("el-button", { staticClass: "re_btn", on: { "click": _vm.handleSubmit } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]) : _vm._e()], 1)], 1)]) : _c("div", { staticClass: "success" }, [_vm._m(10), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_success_text1 || _vm.$t("order.success.text1")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_success_text2 || _vm.$t("order.success.text2")) + " ")]), _c("p", [_c("el-button", { on: { "click": _vm.handleToDetail } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn2 || _vm.$t("order.btns.btn2")))])], 1)]), _vm.showProInfo ? _c("productInfo", { attrs: { "productUid": _vm.afterSalePro.productUid, "afterSalePro": _vm.afterSalePro }, on: { "changeUid": _vm.getUid } }) : _vm._e()], 1);
};
var _sfc_staticRenderFns$1 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": __$_require_740a2a7a__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": __$_require_70a0793c__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": __$_require_70a0793c__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "img" }, [_c("img", { attrs: { "src": __$_require_725551db__ } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", [_c("i", { staticClass: "el-icon-success" })]);
}];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
const afterSale = __component__$1.exports;
const _sfc_main = {
  name: "",
  components: {
    afterSale,
    pay
  },
  data() {
    return {
      isList: true,
      actNav: -1,
      orderList: [],
      orderDetails: "",
      orderStatusList: [],
      processStatus: 101,
      status: 0,
      hasCustom: 1,
      showPayCode: false,
      payCode: "",
      payOrderInfo: "",
      showAfterSale: false,
      orderInfo: {},
      afterSaleProduct: {},
      showPayMethod: false,
      paypalHrefLink: "",
      loading: false,
      elementContentList: "",
      orderStatus: {},
      payArr: [],
      normalList: [],
      customList: []
    };
  },
  mounted() {
    this.elementContentList = window.elementContentList;
    this.orderStatus = {
      0: this.elementContentList.portal_order_orderStatus_status1 || this.$t("order.orderStatus.status1"),
      1: this.elementContentList.portal_order_orderStatus_status2 || this.$t("order.orderStatus.status2"),
      2: this.elementContentList.portal_order_orderStatus_status3 || this.$t("order.orderStatus.status3"),
      3: this.elementContentList.portal_order_orderStatus_status4 || this.$t("order.orderStatus.status4"),
      4: this.elementContentList.portal_order_orderStatus_status5 || this.$t("order.orderStatus.status5"),
      5: this.elementContentList.portal_order_orderStatus_status6 || this.$t("order.orderStatus.status6"),
      6: this.elementContentList.portal_order_orderStatus_status7 || this.$t("order.orderStatus.status7"),
      7: this.elementContentList.portal_order_orderStatus_status8 || this.$t("order.orderStatus.status8"),
      8: this.elementContentList.portal_order_orderStatus_status9 || this.$t("order.orderStatus.status9"),
      9: this.elementContentList.portal_order_orderStatus_status10 || this.$t("order.orderStatus.status10")
    };
    if (this.$route.query.orderId) {
      this.isList = false;
      this.detailId = this.$route.query.orderId;
      this.getOrderDetail();
    }
    this.getOrderList();
  },
  methods: {
    // 定制商品接收打印
    handleAccept(val, index2) {
      const h = this.$createElement;
      let text1 = this.elementContentList.portal_order_box_text3 || this.$t("order.box.text3");
      let text2 = this.elementContentList.portal_order_box_text4 || this.$t("order.box.text4");
      let text3 = this.elementContentList.portal_btns_confirm || this.$t("btns.confirm");
      let text4 = this.elementContentList.portal_btns_cancel || this.$t("btns.cancel");
      this.$msgbox({
        message: h("div", null, [
          h("p", { style: "font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;" }, text1),
          h("p", null, text2)
        ]),
        cancelButtonClass: "cancel_btn",
        confirmButtonClass: "confirm_btn",
        showCancelButton: true,
        confirmButtonText: text3,
        cancelButtonText: text4,
        type: "warning"
      }).then(() => {
        confirmPrint(val.order.id).then((res) => {
          if (res.data) {
            this.$message.success({ message: this.elementContentList.portal_order_msg4 || this.$t("order.msg4"), duration: 1500 });
          } else {
            this.$message.error({ message: this.elementContentList.portal_order_msg5 || this.$t("order.msg5"), duration: 1500 });
          }
        });
      }).catch(() => {
      });
    },
    // 定制商品拒绝打印
    handleDecline(val, index2) {
      const h = this.$createElement;
      let text1 = this.elementContentList.portal_order_box_text5 || this.$t("order.box.text5");
      let text2 = this.elementContentList.portal_order_box_text6 || this.$t("order.box.text6");
      let text3 = this.elementContentList.portal_btns_confirm || this.$t("btns.confirm");
      let text4 = this.elementContentList.portal_btns_cancel || this.$t("btns.cancel");
      this.$msgbox({
        message: h("div", null, [
          h("p", { style: "font-size: 16px;font-weight: 500;line-height: 24px;margin-bottom:8px;" }, text1),
          h("p", null, text2)
        ]),
        cancelButtonClass: "cancel_btn",
        confirmButtonClass: "confirm_btn",
        showCancelButton: true,
        confirmButtonText: text3,
        cancelButtonText: text4,
        type: "warning"
      }).then(() => {
        refusePrint(val.order.id).then((res) => {
          if (res.data) {
            this.$message.success({ message: this.elementContentList.portal_order_msg4 || this.$t("order.msg4"), duration: 1500 });
          } else {
            this.$message.error({ message: this.elementContentList.portal_order_msg5 || this.$t("order.msg5"), duration: 1500 });
          }
        });
      }).catch(() => {
      });
    },
    // 查看支付结果
    handleCheckResult() {
      ispay(this.payResult.payBillId).then((res) => {
        let settlemenData = {
          orderId: this.payOrderInfo.order.orderId,
          // addressInfo: this.checkAddr,
          // productList: this.productList,
          payResult: this.payResult
        };
        if (res.data) {
          this.$router.push({ path: "/order/pay/success", query: { settlemenData: JSON.stringify(settlemenData) } });
        } else {
          this.$router.push({ path: "/order/pay/fail", query: { settlemenData: JSON.stringify(settlemenData) } });
        }
      });
    },
    changePayment(val) {
      this.payMethod = val;
      this.loading = true;
      const params = {
        orderId: this.payOrderInfo.order.id,
        payToolType: this.payMethod
      };
      qrcode(params).then((resp) => {
        this.showPayMethod = false;
        this.showPayCode = true;
        this.payResult = resp.data;
        this.paypalHrefLink = resp.data.paypalHrefLink;
        window.open(resp.data.paypalHrefLink);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    // 支付
    handlePayment(val, index2) {
      this.payOrderInfo = val;
      this.showPayMethod = true;
    },
    handleClose() {
      this.showPayCode = false;
    },
    // 售后
    handleAfterSales(val, item) {
      console.log(val);
      this.afterSaleProduct = val;
      this.orderInfo = item;
      this.showAfterSale = true;
    },
    // 详情取消订单
    handleCancelDetail() {
      cancelUserOrder(this.orderDetails.order.id).then((res) => {
        if (res.code == 200) {
          this.$message.success({ message: this.elementContentList.portal_order_msg1 || this.$t("order.msg1"), duration: 1500 });
          this.getOrderDetail();
        }
      });
    },
    // 详情确认收货
    handleConfirReceipt() {
      confirmReceiveOrder(this.orderDetails.order.id).then((res) => {
        if (res.code == 200) {
          this.$message.success({ message: this.elementContentList.portal_order_msg2 || this.$t("order.msg2"), duration: 2e3 });
          this.getOrderDetail();
        }
      });
    },
    // 确认收货
    handleConfirm(val) {
      confirmReceiveOrder(val.order.id).then((res) => {
        if (res.code == 200) {
          this.$message.success({ message: this.elementContentList.portal_order_msg2 || this.$t("order.msg2"), duration: 1500 });
          this.getOrderList();
        }
      });
    },
    // 删除订单
    handleDelete(val, index2) {
      deleteOrder(val.id).then((res) => {
        if (res.code == 200) {
          this.orderList.splice(index2, 1);
          this.$message.success({ message: this.elementContentList.portal_order_msg3 || this.$t("order.msg3"), duration: 1500 });
        }
      });
    },
    // 取消订单
    handleCancel(val, index2) {
      cancelUserOrder(val.id).then((res) => {
        if (res.code == 200) {
          this.$message.success({ message: this.elementContentList.portal_order_msg1 || this.$t("order.msg1"), duration: 1500 });
          this.getOrderDetail();
        }
      });
    },
    // 
    getPayRemainTime() {
      setInterval(() => {
        this.payArr.forEach((i) => {
          let time = this.orderList[i].order.payRemainTime;
          let arr = time.split(" ");
          let s = arr[arr.length - 2];
          let m = arr[arr.length - 4];
          let h = arr[arr.length - 5];
          let d = arr[arr.length - 8];
          s--;
          if (s < 0) {
            s = 59;
            m--;
          }
          if (m < 0) {
            m = 59;
            h--;
          }
          if (h < 0) {
            h = 59;
            d--;
          }
          arr[arr.length - 2] = s;
          arr[arr.length - 4] = m;
          arr[arr.length - 6] = h;
          arr[arr.length - 8] = d;
          this.orderList[i].order.payRemainTime = arr.join(" ");
          if (s == 0 && m == 0 && h == 0 && d == 0) {
            this.orderList[i].order.needCancelPay = true;
          }
        });
      }, 1e3);
    },
    getOrderList() {
      const params = {
        keyword: "",
        orderStatusList: this.orderStatusList,
        pageNum: 1,
        pageSize: 1e4,
        productCategoryUid: ""
      };
      orderSearch(params).then((res) => {
        if (res.code == 200) {
          let arr = [];
          this.payArr = [];
          res.data.list.forEach((item, idx) => {
            let hasCustom = false;
            item.orderItemList.forEach((it) => {
              if (it.productType == "custom") {
                hasCustom = true;
              }
            });
            let obj = {
              ...item,
              hasCustom
            };
            arr.push(obj);
            if (!item.order.needCancelPay) {
              this.payArr.push(idx);
            }
          });
          this.orderList = arr;
          console.log("this.payArr", this.payArr);
          if (this.payArr.length > 0) {
            this.getPayRemainTime();
          }
        }
      });
    },
    handleGoback() {
      this.isList = true;
    },
    handleShowOrderDetails(val, index2) {
      this.detailId = val.order.id;
      this.getOrderDetail();
    },
    getOrderDetail() {
      orderDetail(this.detailId).then((res) => {
        if (res.code == 200) {
          this.isList = false;
          this.customList = [];
          this.normalList = [];
          this.orderDetails = res.data;
          this.hasCustom = res.data.order.hasCustom;
          this.status = res.data.order.status;
          if (this.hasCustom) {
            this.processStatus = res.data.orderCustomProcessList[res.data.orderCustomProcessList.length - 1].processStatus;
          } else {
            this.processStatus = res.data.orderProcessList[res.data.orderProcessList.length - 1].processStatus;
          }
          this.orderDetails.orderItemList.forEach((item) => {
            if (item.productType == "custom") {
              this.customList.push(item);
            } else {
              this.normalList.push(item);
            }
          });
        }
      });
    },
    handleChangeNav(val) {
      this.actNav = val;
      if (val == -1) {
        this.orderStatusList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      } else {
        this.orderStatusList = [val];
      }
      this.getOrderList();
    }
  }
};
var _sfc_render = function render38() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "order" }, [!_vm.showAfterSale ? _c("div", [_vm.isList ? _c("div", { staticClass: "order_container" }, [_c("div", { staticClass: "order_title" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_title1 || _vm.$t("order.title1")))])]), _c("div", { staticClass: "order_nav flex" }, [_c("div", { staticClass: "nav_item", class: _vm.actNav == -1 ? "active" : "", on: { "click": function($event) {
    return _vm.handleChangeNav(-1);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_tabs_tab1 || _vm.$t("order.tabs.tab1")) + " ")]), _c("div", { staticClass: "nav_item", class: _vm.actNav == 0 ? "active" : "", on: { "click": function($event) {
    return _vm.handleChangeNav(0);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_tabs_tab2 || _vm.$t("order.tabs.tab2")) + " ")]), _c("div", { staticClass: "nav_item", class: _vm.actNav == 1 ? "active" : "", on: { "click": function($event) {
    return _vm.handleChangeNav(1);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_tabs_tab3 || _vm.$t("order.tabs.tab3")) + " ")]), _c("div", { staticClass: "nav_item", class: _vm.actNav == 2 ? "active" : "", on: { "click": function($event) {
    return _vm.handleChangeNav(2);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_tabs_tab4 || _vm.$t("order.tabs.tab4")) + " ")]), _c("div", { staticClass: "nav_item", class: _vm.actNav == 3 ? "active" : "", on: { "click": function($event) {
    return _vm.handleChangeNav(3);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_tabs_tab5 || _vm.$t("order.tabs.tab5")) + " ")]), _c("div", { staticClass: "nav_item", class: _vm.actNav == 4 ? "active" : "", on: { "click": function($event) {
    return _vm.handleChangeNav(4);
  } } }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_tabs_tab6 || _vm.$t("order.tabs.tab6")) + " ")])]), _c("div", { staticClass: "order_list" }, _vm._l(_vm.orderList, function(item, index2) {
    return _c("div", { key: item.id, staticClass: "order_item" }, [_c("div", { staticClass: "order_head flex_b_c" }, [_c("div", { staticClass: "head_left flex" }, [_c("div", { staticClass: "head_item" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text15 || _vm.$t("order.text15")) + " ")]), _c("p", [_vm._v(_vm._s(item.order.createTimeStr))])]), _c("div", { staticClass: "head_item" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text16 || _vm.$t("order.text16")) + " ")]), _c("p", [_vm._v(_vm._s(item.order.orderSn))])]), _c("div", { staticClass: "head_item" }, [_c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text17 || _vm.$t("order.text17")) + " ")]), _c("p", [_vm._v("£ " + _vm._s(item.order.totalAmount))])])]), _c("div", { staticClass: "to_details" }, [_c("el-button", { staticClass: "btn", attrs: { "type": "text" }, on: { "click": function($event) {
      return _vm.handleShowOrderDetails(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_text18 || _vm.$t("order.text18")))])], 1)]), _c("div", { staticClass: "pro_details" }, [_c("div", { staticClass: "det_left" }, _vm._l(item.orderItemList, function(it, idx) {
      return _c("div", { key: idx + "p", staticClass: "pro_item" }, [it.productType != "custom" ? _c("div", { staticClass: "item" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [it.productPicUrl ? _c("img", { attrs: { "src": it.productPicUrl } }) : _c("img", { staticStyle: { "width": "80px", "height": "80px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_name" }, [_c("p", { staticClass: "it_name" }, [_vm._v(" " + _vm._s(it.productName) + " ")]), _c("p", { staticClass: "it_attr" }, _vm._l(it.attributeValueVOs, function(attr) {
        return _c("span", { key: attr.productAttributeUid, staticStyle: { "margin-right": "8px" } }, [_vm._v(_vm._s(attr.productAttributeName + ": " + attr.value))]);
      }), 0), _c("p", { staticClass: "it_qty" }, [_vm._v("x " + _vm._s(it.productQuantity))]), _c("p", { staticClass: "it_price" }, [_vm._v("£ " + _vm._s(it.productPrice))])])]) : _vm._e(), it.productType == "custom" ? _c("div", { staticClass: "item" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [it.productPicUrl ? _c("img", { attrs: { "src": it.productPicUrl } }) : _c("img", { staticStyle: { "width": "80px", "height": "80px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_name" }, [_c("p", { staticClass: "it_name" }, [_vm._v(" " + _vm._s(it.productName) + " ")]), _vm._l(it.orderPageCusObjItemVOs, function(obj) {
        return _c("p", { key: obj.cartCusItemId, staticClass: "pro_style" }, [_c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(obj.objNickname))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s((obj.height ? obj.height + "cm, " : "") + (obj.weight ? obj.weight + "kg" : "")))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(obj.ratio))]), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v("£ " + _vm._s(obj.productPrice))])]);
      }), _c("div", { staticClass: "pro_info" }, [_c("p", [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text11 || _vm.$t("cart.text11")))])]), _c("div", { staticStyle: { "margin-top": "16px" } }, _vm._l(it.orderPageCusServiceItemVOs, function(pro) {
        return _c("div", { key: pro.cartCusItemId, staticClass: "pro_item2 flex" }, [_c("div", { staticClass: "flex_c_c img" }, [_c("img", { attrs: { "src": pro.productPicUrl } })]), _c("div", { staticClass: "pro_name" }, [_c("div", { staticClass: "name" }, [_vm._v(_vm._s(pro.productName))]), _c("div", [_c("span", [_vm._v(_vm._s("x " + pro.productQuantity))]), _c("span", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(pro.productPrice))])])])]);
      }), 0)]), _c("p", { staticClass: "it_price" }, [_vm._v("£ " + _vm._s(it.productPrice))])], 2)]) : _vm._e(), _c("div", { staticClass: "after_btn flex" }, [item.order.status == 1 || item.order.status == 2 || item.order.status == 7 || item.order.status == 6 ? _c("el-button", { staticClass: "btn", on: { "click": function($event) {
        return _vm.handleAfterSales(it, item);
      } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn1 || _vm.$t("order.btns.btn1")))]) : _vm._e()], 1)]);
    }), 0), _c("div", { staticClass: "right_btns" }, [item.order.status == 2 || item.order.status == 8 ? _c("el-button", { staticClass: "btn btn2", on: { "click": function($event) {
      return _vm.handleConfirm(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn4 || _vm.$t("order.btns.btn4")))]) : _vm._e(), item.order.status == 0 && !item.order.needCancelPay ? _c("div", [_c("el-button", { staticClass: "btn btn2", on: { "click": function($event) {
      return _vm.handlePayment(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn5 || _vm.$t("order.btns.btn5")))]), _c("p", [_c("i", { staticClass: "el-icon-time" }), _c("span", [_vm._v(_vm._s(item.order.payRemainTime))])])], 1) : _vm._e(), item.hasCustom && item.order.status != 0 ? _c("el-button", { staticClass: "btn btn2", on: { "click": function($event) {
      return _vm.handleAccept(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn6 || _vm.$t("order.btns.btn6")))]) : _vm._e(), item.hasCustom && item.order.status != 0 ? _c("el-button", { staticClass: "btn", on: { "click": function($event) {
      return _vm.handleDecline(item, index2);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn7 || _vm.$t("order.btns.btn7")))]) : _vm._e()], 1)])]);
  }), 0)]) : _c("div", { staticClass: "order_details" }, [_c("div", { staticClass: "details_title" }, [_c("i", { staticClass: "el-icon-arrow-left", on: { "click": _vm.handleGoback } }), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_tabs_tab1 || _vm.$t("order.tabs.tab1")))]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text18 || _vm.$t("order.text18")))])]), _c("p", { staticClass: "details_title2" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text18 || _vm.$t("order.text18")) + " ")]), _c("p", { staticClass: "order_date" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text19 || _vm.$t("order.text19")))]), _c("span", [_vm._v(_vm._s(_vm.orderDetails.order.createTimeStr))]), _c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text20 || _vm.$t("order.text20")))]), _c("span", [_vm._v(_vm._s(_vm.orderDetails.order.orderSn))]), _c("span", { staticStyle: { "display": "flex", "float": "right" } }, [_vm.orderDetails.order.status == 0 ? _c("el-button", { staticClass: "btns", on: { "click": function($event) {
    return _vm.handleCancelDetail();
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_btns_cancel || _vm.$t("btns.cancel")))]) : _vm._e(), _vm.orderDetails.order.status == 2 || _vm.orderDetails.order.status == 8 ? _c("el-button", { staticClass: "btns btn2", on: { "click": function($event) {
    return _vm.handleConfirReceipt();
  } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn4 || _vm.$t("order.btns.btn4")))]) : _vm._e()], 1)]), _c("div", { staticClass: "order_info" }, [_c("div", { staticClass: "pay_info" }, [_c("p", { staticClass: "my_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text23 || _vm.$t("order.text23")) + " ")]), _c("p", [_vm._v(" " + _vm._s(_vm.orderDetails.order.payType == 1 ? "paypal" : _vm.orderDetails.order.payType == 2 ? "weChat" : _vm.elementContentList.portal_order_text37 || _vm.$t("order.text37")) + " ")])]), _c("div", { staticClass: "summary" }, [_c("p", { staticClass: "my_title" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text24 || _vm.$t("order.text24")) + " ")]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text25 || _vm.$t("order.text25")))]), _c("span", [_vm._v("£ " + _vm._s(_vm.orderDetails.order.totalAmount))])]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text26 || _vm.$t("order.text26")))]), _c("span", [_vm._v("£ " + _vm._s(_vm.orderDetails.order.freightAmount))])]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text27 || _vm.$t("order.text27")))]), _c("span", [_vm._v("£ " + _vm._s(_vm.orderDetails.order.discountAmount))])]), _c("p", { staticClass: "flex_b_c" }, [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text28 || _vm.$t("order.text28")))]), _c("span", [_vm._v("£ " + _vm._s(_vm.orderDetails.order.payAmount))])])])]), _vm.customList.length > 0 ? _c("div", { staticClass: "pro_details2" }, [_c("div", { staticClass: "det_left2" }, [_c("div", { staticClass: "pro_item" }, [_c("p", { staticClass: "type" }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_text34 || _vm.$t("order.text34")))]), _c("div", { staticClass: "addr_card" }, [_c("p", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text22 || _vm.$t("order.text22")))]), _vm.orderDetails.order.deliveryType != 2 ? _c("div", [_c("p", [_c("span", [_vm._v(_vm._s(_vm.orderDetails.order.receiverName))]), _c("span", { staticStyle: { "margin-left": "12px" } }, [_vm._v(_vm._s(_vm.orderDetails.order.receiverPhone))])]), _c("p", { staticStyle: { "margin-top": "4px" } }, [_vm._v(" " + _vm._s(_vm.orderDetails.order.receiverDetailAddress + (_vm.orderDetails.order.receiverDetailAddress ? "," : "") + _vm.orderDetails.order.receiverDetailAddressTwo + (_vm.orderDetails.order.receiverDetailAddressTwo ? "," : "") + _vm.orderDetails.order.receiverCity + (_vm.orderDetails.order.receiverCity ? "," : "") + _vm.orderDetails.order.receiverCountry) + " ")])]) : _vm._e(), _vm.orderDetails.order.deliveryType == 2 ? _c("p", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text36 || _vm.$t("order.text36")))]) : _vm._e()]), _c("div", { staticClass: "sted flex_a_c" }, [_c("div", { staticClass: "step_item", class: _vm.processStatus == 101 || _vm.processStatus == 102 || _vm.processStatus == 103 || _vm.processStatus == 104 || _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(0), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step1 || _vm.$t("order.steps.step1")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 101 ? item.createTimeStr : ""))]);
  }), 0)]), _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 102 || _vm.processStatus == 103 || _vm.processStatus == 104 || _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(1), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step2 || _vm.$t("order.steps.step2")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 102 || item.processStatus == 103 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.hasCustom == 1 && _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 104 || _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(2), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step3 || _vm.$t("order.steps.step3")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 104 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.hasCustom == 1 && _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(3), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step4 || _vm.$t("order.steps.step4")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 105 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(4), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step5 || _vm.$t("order.steps.step5")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 106 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(5), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step6 || _vm.$t("order.steps.step6")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 107 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.status == 4 ? _c("div", { staticClass: "step_item cancel_pay" }, [_vm._m(6), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step7 || _vm.$t("order.steps.step7")) + " ")]), _c("p", { staticClass: "time" }, [_vm._v(_vm._s(""))])]) : _vm._e()]), _vm._l(_vm.customList, function(it, idx) {
    return _c("div", { key: idx + "cp", staticClass: "item" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [it.productPicUrl ? _c("img", { attrs: { "src": it.productPicUrl } }) : _c("img", { staticStyle: { "width": "80px", "height": "80px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_name" }, [_c("p", { staticClass: "it_name" }, [_vm._v(" " + _vm._s(it.productName) + " ")]), _vm._l(it.orderCusObjItemVOS, function(obj) {
      return _c("p", { key: obj.cartCusItemId, staticClass: "pro_style" }, [_c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(obj.objNickname))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s((obj.height ? obj.height + "cm, " : "") + (obj.weight ? obj.weight + "kg" : "")))]), _c("span", { staticStyle: { "margin-right": "24px" } }, [_vm._v(_vm._s(obj.ratio))]), _c("span", { staticStyle: { "color": "#f6497f" } }, [_vm._v("£ " + _vm._s(obj.productPrice))])]);
    }), _c("div", { staticClass: "pro_info" }, [_c("p", [_c("span", [_vm._v(_vm._s(_vm.elementContentList.portal_cart_text11 || _vm.$t("cart.text11")))])]), _c("div", { staticStyle: { "margin-top": "16px" } }, _vm._l(it.orderCusServiceItemVOS, function(pro) {
      return _c("div", { key: pro.cartCusItemId, staticClass: "pro_item2 flex" }, [_c("div", { staticClass: "flex_c_c img" }, [_c("img", { attrs: { "src": pro.productPicUrl } })]), _c("div", { staticClass: "pro_name" }, [_c("div", { staticClass: "name" }, [_vm._v(_vm._s(pro.productName))]), _c("div", [_c("span", [_vm._v(_vm._s("x " + pro.productQuantity))]), _c("span", { staticClass: "pro_price" }, [_vm._v("£ " + _vm._s(pro.productPrice))])])])]);
    }), 0)]), _c("p", { staticClass: "it_price" }, [_vm._v("£ " + _vm._s(it.productPrice))])], 2), _c("div", { staticClass: "right_btns right_btns2 flex_c_c" }, [_vm.orderDetails.order.status == 2 || _vm.orderDetails.order.status == 8 ? _c("el-button", { staticClass: "btn btn2", on: { "click": function($event) {
      return _vm.handleConfirm(_vm.orderDetails);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn4 || _vm.$t("order.btns.btn4")))]) : _vm._e(), _vm.orderDetails.order.status == 6 || _vm.orderDetails.order.status == 7 ? _c("el-button", { staticClass: "btn", on: { "click": function($event) {
      return _vm.handleAfterSales(it, _vm.orderDetails);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn1 || _vm.$t("order.btns.btn1")))]) : _vm._e()], 1)]);
  })], 2)])]) : _vm._e(), _vm.normalList.length > 0 ? _c("div", { staticClass: "pro_details2" }, [_c("div", { staticClass: "det_left2" }, [_c("div", { staticClass: "pro_item" }, [_c("p", { staticClass: "type" }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_text35 || _vm.$t("order.text35")))]), _c("div", { staticClass: "addr_card" }, [_c("p", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text22 || _vm.$t("order.text22")))]), _vm.orderDetails.order.deliveryType != 2 ? _c("div", [_c("p", [_c("span", [_vm._v(_vm._s(_vm.orderDetails.order.receiverName))]), _c("span", { staticStyle: { "margin-left": "12px" } }, [_vm._v(_vm._s(_vm.orderDetails.order.receiverPhone))])]), _c("p", { staticStyle: { "margin-top": "4px" } }, [_vm._v(" " + _vm._s(_vm.orderDetails.order.receiverDetailAddress + (_vm.orderDetails.order.receiverDetailAddress ? "," : "") + _vm.orderDetails.order.receiverDetailAddressTwo + (_vm.orderDetails.order.receiverDetailAddressTwo ? "," : "") + _vm.orderDetails.order.receiverCity + (_vm.orderDetails.order.receiverCity ? "," : "") + _vm.orderDetails.order.receiverCountry) + " ")])]) : _vm._e(), _vm.orderDetails.order.deliveryType == 2 ? _c("p", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text36 || _vm.$t("order.text36")))]) : _vm._e()]), _c("div", { staticClass: "sted flex_a_c" }, [_c("div", { staticClass: "step_item", class: _vm.processStatus == 101 || _vm.processStatus == 102 || _vm.processStatus == 104 || _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 1072 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(7), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step1 || _vm.$t("order.steps.step1")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 101 ? item.createTimeStr : ""))]);
  }), 0)]), _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 102 || _vm.processStatus == 104 || _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 1072 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(8), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step2 || _vm.$t("order.steps.step2")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 102 || item.processStatus == 103 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.hasCustom == 1 && _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 104 || _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 1072 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(9), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step3 || _vm.$t("order.steps.step3")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 104 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.hasCustom == 1 && _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 105 || _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 1072 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(10), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step4 || _vm.$t("order.steps.step4")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 105 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 106 || _vm.processStatus == 107 || _vm.processStatus == 1072 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(11), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step5 || _vm.$t("order.steps.step5")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(item.processStatus == 106 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.status != 4 ? _c("div", { staticClass: "step_item", class: _vm.processStatus == 1072 || _vm.processStatus == 107 || _vm.processStatus == 108 ? "completed" : "" }, [_vm._m(12), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step6 || _vm.$t("order.steps.step6")) + " ")]), _c("p", { staticClass: "time" }, _vm._l(_vm.orderDetails.orderProcessList, function(item) {
    return _c("span", { key: item.processId }, [_vm._v(_vm._s(_vm.processStatus == 1072 || item.processStatus == 107 ? item.createTimeStr : ""))]);
  }), 0)]) : _vm._e(), _vm.status == 4 ? _c("div", { staticClass: "step_item cancel_pay" }, [_vm._m(13), _c("p", { staticClass: "sted_status" }, [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_steps_step7 || _vm.$t("order.steps.step7")) + " ")]), _c("p", { staticClass: "time" }, [_vm._v(_vm._s(""))])]) : _vm._e()]), _vm._l(_vm.normalList, function(it, idx) {
    return _c("div", { key: idx + "np", staticClass: "item" }, [_c("div", { staticClass: "pro_img flex_c_c" }, [it.productPicUrl ? _c("img", { attrs: { "src": it.productPicUrl } }) : _c("img", { staticStyle: { "width": "80px", "height": "80px" }, attrs: { "src": __$_require_6d02fb8e__ } })]), _c("div", { staticClass: "pro_name" }, [_c("p", { staticClass: "it_name" }, [_vm._v(" " + _vm._s(it.productName) + " ")]), _c("p", { staticClass: "it_attr" }, _vm._l(it.attributeValueVOs, function(attr) {
      return _c("span", { key: attr.productAttributeUid, staticStyle: { "margin-right": "8px" } }, [_vm._v(_vm._s(attr.productAttributeName + ": " + attr.value))]);
    }), 0), _c("p", { staticClass: "it_qty" }, [_vm._v("x " + _vm._s(it.productQuantity))]), _c("p", { staticClass: "it_price" }, [_vm._v("£ " + _vm._s(it.productPrice))])]), _c("div", { staticClass: "right_btns right_btns2 flex_c_c" }, [_vm.orderDetails.order.status == 2 ? _c("el-button", { staticClass: "btn btn2", on: { "click": function($event) {
      return _vm.handleConfirm(_vm.orderDetails);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn4 || _vm.$t("order.btns.btn4")))]) : _vm._e(), _vm.orderDetails.order.status == 1 || _vm.orderDetails.order.status == 2 ? _c("el-button", { staticClass: "btn", on: { "click": function($event) {
      return _vm.handleAfterSales(it, _vm.orderDetails);
    } } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_btns_btn1 || _vm.$t("order.btns.btn1")))]) : _vm._e()], 1)]);
  })], 2)])]) : _vm._e()]), _vm.showPayCode ? _c("div", { staticClass: "dia_pay flex_c_c" }, [_c("div", { staticClass: "pay_code" }, [_c("div", { staticClass: "close", on: { "click": _vm.handleClose } }, [_c("i", { staticClass: "el-icon-close" })]), _c("p", [_vm._v(" " + _vm._s(_vm.elementContentList.portal_order_text29 || _vm.$t("order.text29")) + " ")]), _c("div", { staticClass: "url" }, [_vm._v(_vm._s(_vm.paypalHrefLink))]), _c("p", { staticClass: "check_btn" }, [_c("el-button", { on: { "click": _vm.handleCheckResult } }, [_vm._v(_vm._s(_vm.elementContentList.portal_order_text30 || _vm.$t("order.text30")))])], 1)])]) : _vm._e()]) : _c("afterSale", { ref: "afterSale", attrs: { "afterSaleProduct": _vm.afterSaleProduct, "orderInfo": _vm.orderInfo } }), _vm.loading ? _c("div", { staticClass: "my_loading flex_c_c" }, [_c("img", { attrs: { "src": __$_require_2d971d39__ } }), _c("p", [_vm._v(_vm._s(_vm.elementContentList.portal_order_text31 || _vm.$t("order.text31")))])]) : _vm._e(), _vm.showPayMethod ? _c("pay", { on: { "payment": _vm.changePayment } }) : _vm._e()], 1);
};
var _sfc_staticRenderFns = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "schedule" }, [_c("span", { staticClass: "left_line" }), _c("span", { staticClass: "round" }), _c("span", { staticClass: "right_line" })]);
}];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
const index = __component__.exports;
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
export {
  getDefaultExportFromCjs as a,
  commonjsGlobal as c,
  getAugmentedNamespace as g
};
//# sourceMappingURL=index-CPF2yMi2.js.map
