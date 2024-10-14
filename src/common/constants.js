// 订单状态 需要展示的订单状态，订单详情页进度条节点状态
export const ORDER_STATUS = {
  UNPAID: 0, // 待付款
  WAIT_DELIVERY: 1, // 待发货
  DELIVERED: 2, // 已发货
  FINISHED: 3, // 已完成
  CLOSED: 4, // 已关闭
  INVALID: 5, // 无效订单

  WAIT_SCAN: 6, // 等待扫描
  WAIT_CONFIRM: 7, // 等待确认
  WAIT_PRINT: 8, // 等待打印
  WAIT_AFTER_SALE: 9, // 售后中
  WAIT_PAY_TAIL: 10, // 待支付尾款
}

// 订单子状态  订单中扫描对象的状态 
export const ORDER_SUB_STATUS = {
  INIT: 0, // 初始化
  IGNORE: -1, // 忽略 非扫描对象的定制商品则忽略该状态
  WAIT_SCAN: 2001, // 等待扫描
  SCANNING: 2002, // 扫描中
  SCAN_DONE: 2003, // 扫描完成
  WAIT_BUILD: 2004, // 等待建模
  BUILDING: 2005, // 建模中
  BUILD_DONE: 2006, // 建模完成
  WAIT_MODELER_ASSIGN: 2007, // 等待分配建模师
  WAIT_MODELER_CONFIRM: 2008, // 等待建模师处理
  MODELER_CONFIRMING: 2009, // 建模处理中
  MODELER_CONFIRM_DONE: 2010, // 建模师处理完成

  WAIT_PRINT_CONFIRM: 1041, // 等待打印员处理
  PRINTING: 1042, // 打印员处理中
  PRINT_DONE: 1043, // 打印完成
}

// 订单进度状态
export const ORDER_PROCESS_STATUS = {
  WAIT_CONFIRM: 101, // 提交订单
  NORMAL_WAIT_PAY: 102, // 支付订单
  CUSTOM_WAI_PAY: 103, // 支付订单
  WAIT_SCAN: 104, // 等待扫描 -> 完成扫描
  MODEL_CONFIRM: 10400, // 模型确认
  PRINT_DONE: 105, // 完成打印
  WAIT_TAIL_PAY: 10500, // 等待用户支付尾款
  WAIT_DELIVERY: 106, // 等待发货
  WAIT_RECEIVE: 107, // 等待收货
  WAIT_PICKUP: 1072, // 完成取货
  FINISHED: 108, // 结束
  WAIT_SCAN_TIEMOUT: 1082, // 超时未扫描
  REFUSE_PRINT: 1083, // 拒绝打印
}

// 订单进度子状态
export const ORDER_PROCESS_NODE_STATUS = {
  WAIT_SCAN: 10041, // 等待扫描
  SCANNING: 10042, // 扫描中
  SCAN_DONE: 10043, // 扫描完成
  WAIT_BUILD: 10044, // 等待建模
  BUILDING: 10045, // 建模中
  BUILD_DONE: 10046, // 建模完成
  WAIT_MODELER_ASSIGN: 10047, // 等待分配建模师
  WAIT_MODELER_CONFIRM: 10048, // 等待建模师处理
  MODELER_CONFIRMING: 10049, // 建模处理中
  MODELER_CONFIRM_DONE: 100410, // 建模师处理完成

  WAIT_PRINT: 10051, // 等待打印
  WAIT_PRINT_CONFIRM: 10052, // 等待打印员处理
  PRINTING: 10053, // 打印员处理中
  PRINT_DONE: 10054, // 打印完成

  SET_MODEL_PRICE: 105001, // 管理员设置模型总价
  WAIT_TAIL_PAY: 105002, // 等待用户支付尾款
  TAIL_PAY_DONE: 105003, // 尾款支付完成
}