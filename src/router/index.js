import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/storeSetting', component: () => import('@/views/login/initStore'), hidden: true },
  // {
  //   path: '/userInfo',
  //   component: Layout,
  //   hidden: true,
  //   children: [{
  //     path: '',
  //     name: 'userInfo',
  //     component: () => import('@/views//ums/userInfo/userInfo'),
  //   }],
  // },
]

export const asyncRouterMap = []

// export const asyncRouterMap1 = [
//   {
//     path: '',
//     component: Layout,
//     redirect: '/home',
//     name: 'home',
//     meta: { title: i18n.t('router.overview'), icon: 'home2' },
//     children: [{
//       path: 'home',
//       name: 'home',
//       component: () => import('@/views/home/index'),
//       meta: { title: i18n.t('router.overview'), icon: 'home2' }
//     }]
//   },
//   // 打印端 - 门店订单
//   {
//     path: '/printingOrder',
//     component: Layout,
//     redirect: '/printingOrder/list',
//     name: 'printing_order_list',
//     meta: { title: '订单管理', icon: 'customer' },
//     children: [{
//       path: 'list',
//       name: 'printing_order_list',
//       component: () => import('@/views/printing/order'),
//       meta: { title: '订单管理', icon: 'customer' },
//     }]
//   },
//   // 门店端 - 门店订单
//   {
//     path: '/storeOrder',
//     component: Layout,
//     redirect: '/storeOrder/list',
//     name: 'store_order_list',
//     meta: { title: '订单管理', icon: 'customer' },
//     children: [{
//       path: 'list',
//       name: 'store_order_list',
//       component: () => import('@/views/storeOrder/list'),
//       meta: { title: '订单管理', icon: 'customer' },
//     },
//     {
//       path: 'detail',
//       name: 'storeOrderDetail',
//       component: () => import('@/views/storeOrder/detail'),
//       meta: { title: '订单详情', icon: 'customer' },
//       hidden: true
//     }
//     ]
//   },
//   // 门店端 - 门店信息
//   {
//     path: '/storeInformation',
//     component: Layout,
//     redirect: '/storeInformation/index',
//     name: 'store_info',
//     meta: { title: '', icon: 'sms' },
//     children: [{
//       path: 'index',
//       name: 'store_info',
//       component: () => import('@/views/storeManage/index'),
//       meta: { title: '', icon: 'sms' },
//     }]
//   },
//   // 客户端管理
//   {
//     path: '/client',
//     component: Layout,
//     redirect: '/client/index',
//     name: 'client',
//     meta: { title: '', icon: 'client' },
//     children: [{
//       path: 'index',
//       name: 'client',
//       component: () => import('@/views/client/index'),
//       meta: { title: '', icon: 'client' },
//     }]
//   },
//   // 财务管理
//   {
//     path: '/financial',
//     component: Layout,
//     redirect: '/financial/index',
//     name: 'financial',
//     meta: { title: '', icon: 'financial' },
//     children: [{
//       path: 'index',
//       name: 'financial',
//       component: () => import('@/views/financial/index'),
//       meta: { title: '', icon: 'financial' },
//     }]
//   },
//   // 会员
//   {
//     path: '/customer',
//     component: Layout,
//     redirect: '/customer/index',
//     name: 'customer',
//     meta: { title: '', icon: 'customer' },
//     children: [{
//       path: 'index',
//       name: 'customer',
//       component: () => import('@/views/customer/index'),
//       meta: { title: '', icon: 'customer' },
//     }]
//   },
//   // 定制服务
//   {
//     path: '/customservices',
//     component: Layout,
//     redirect: '/customservices/index',
//     name: 'custom_services',
//     meta: { title: '', icon: 'customer' },
//     children: [
//       {
//         path: 'index',
//         name: 'custom_services',
//         component: () => import('@/views/customServices/index'),
//         meta: { title: '', icon: 'custome' },
//       },
//       {
//         path: 'servicesdetail',
//         name: 'services_detail',
//         component: () => import('@/views/customServices/detail'),
//         hidden: true
//       },
//     ]
//   },
//   // 订单管理
//   {
//     path: '/transaction',
//     component: Layout,
//     redirect: '/transaction/order',
//     name: 'order',
//     meta: { title: i18n.t('router.order'), icon: 'order2' },
//     children: [
//       {
//         path: 'order',
//         name: 'order_list',
//         component: () => import('@/views/transaction/index'),
//         meta: { title: i18n.t('router.order'), icon: 'order2' },
//       },
//       {
//         path: 'orderDetails',
//         name: 'orderDetails',
//         component: () => import('@/views/transaction/orderDetails'),
//         meta: { title: i18n.t('router.orderDetails'), icon: 'order2' },
//         hidden: true
//       },
//       {
//         path: 'afterSale',
//         name: 'afterSale',
//         component: () => import('@/views/transaction/afterSale'),
//         hidden: true
//       },
//       {
//         path: 'orderSetting',
//         name: 'order_setting',
//         component: () => import('@/views/transaction/setting'),
//         meta: { title: 'setting', icon: 'order2' },
//       },
//     ]
//   },
//   // 商品管理
//   {
//     path: '/pms',
//     component: Layout,
//     redirect: '/pms/product',
//     name: 'pms',
//     meta: { title: '商品', icon: 'product' },
//     children: [
//       {
//         path: 'product',
//         redirect: '/pms/product',
//         component: () => import('@/views/pms/product/index'),
//         name: 'product_list',
//         meta: { title: 'Product List', icon: 'product-list' },
//         children: [
//           {
//             path: '',
//             component: () => import('@/views/pms/product/list'),
//             meta: { title: 'product List  ', icon: 'product-cate' },
//           },
//           {
//             path: 'addProduct',
//             redirect: '/pms/product/addProduct',
//             component: () => import('@/views/pms/product/add/index'),
//             meta: { title: 'Add product' },
//             children: [
//               {
//                 path: '',
//                 name: 'addProduct',
//                 component: () => import('@/views/pms/product/add/add'),
//                 meta: { title: 'Add product' },
//                 hidden: true,
//               },
//               {
//                 path: 'normalProduct',
//                 name: 'normalProduct',
//                 component: () => import('@/views/pms/product/add/normalProduct'),
//                 meta: { title: 'Add normal product' },
//                 hidden: true,
//               },
//               {
//                 path: 'packageProduct',
//                 name: 'packageProduct',
//                 component: () => import('@/views/pms/product/add/packageProduct'),
//                 meta: { title: 'Add package product' },
//                 hidden: true,
//               },
//               {
//                 path: 'customProduct',
//                 name: 'customProduct',
//                 component: () => import('@/views/pms/product/add/customProduct'),
//                 meta: { title: 'Add custom product' },
//                 hidden: true,
//               },
//             ]
//           },
//           {
//             path: 'updateNormalProduct',
//             name: 'updateNormalProduct',
//             component: () => import('@/views/pms/product/update/updateNormalProduct'),
//             meta: { title: 'Update normal product' },
//           },
//           {
//             path: 'updatePackageProduct',
//             name: 'updatePackageProduct',
//             component: () => import('@/views/pms/product/update/updatePackageProduct'),
//             meta: { title: 'Update package product' },
//           },
//           {
//             path: 'updateCustomProduct',
//             name: 'updateCustomProduct',
//             component: () => import('@/views/pms/product/update/updateCustomProduct'),
//             meta: { title: 'Update custom product' },
//           },
//         ]
//       },
//       {
//         path: 'productCate',
//         redirect: '/pms/product/productCate',
//         component: () => import('@/views/pms/productCate/index'),
//         name: 'product_cate',
//         meta: { title: '', icon: '' },
//         children: [
//           {
//             path: '',
//             component: () => import('@/views/pms/productCate/productCate'),
//           },
//           {
//             path: 'lower',
//             name: 'lower',
//             component: () => import('@/views/pms/productCate/lower'),
//             meta: { title: '下级分类' },
//             // hidden: true
//           },
//           {
//             path: 'parameter',
//             name: 'parameter',
//             component: () => import('@/views/pms/productCate/parameter'),
//             meta: { title: 'Parameter', icon: 'product-add' }
//           },
//           {
//             path: 'specification',
//             name: 'specification',
//             component: () => import('@/views/pms/productCate/specification'),
//             meta: { title: 'Specification', icon: 'product-add' }
//           },
//         ]
//       },
//     ]
//   },
//   // 门店管理
//   {
//     path: '/sms',
//     component: Layout,
//     redirect: '/sms/shoplist',
//     name: 'sms',
//     meta: { title: i18n.t('router.sms'), icon: 'customer' },
//     children: [
//       {
//         path: 'shoplist',
//         name: 'shop_list',
//         component: () => import('@/views/sms/index'),
//         meta: { title: i18n.t('router.smsList'), icon: 'customer' },
//       },
//       {
//         path: 'shopDetail',
//         name: 'shop_detail',
//         component: () => import('@/views/sms/detail'),
//         meta: { title: i18n.t('router.smsDetail'), icon: 'customer' },
//       }
//     ]
//   },
//   // 系统管理
//   {
//     path: '/ums',
//     component: Layout,
//     redirect: '/ums/admin',
//     name: 'ums',
//     meta: { title: '权限', icon: 'setting' },
//     children: [
//       {
//         path: 'admin',
//         name: 'admin',
//         component: () => import('@/views/ums/admin/index'),
//         meta: { title: 'User list', icon: 'ums-admin' }
//       },
//       {
//         path: 'role',
//         name: 'role',
//         component: () => import('@/views/ums/role/index'),
//         meta: { title: 'role list', icon: 'ums-role' }
//       },
//       {
//         path: 'allocMenu',
//         name: 'allocMenu',
//         component: () => import('@/views/ums/role/allocMenu'),
//         meta: { title: '分配菜单' },
//         hidden: true
//       },
//       {
//         path: 'allocResource',
//         name: 'allocResource',
//         component: () => import('@/views/ums/role/allocResource'),
//         meta: { title: '分配资源' },
//         hidden: true
//       },
//       {
//         path: 'menu',
//         name: 'menu',
//         component: () => import('@/views/ums/menu/index'),
//         meta: { title: '菜单列表', icon: 'ums-menu' }
//       },
//       {
//         path: 'addMenu',
//         name: 'addMenu',
//         component: () => import('@/views/ums/menu/add'),
//         meta: { title: '添加菜单' },
//         hidden: true
//       },
//       {
//         path: 'updateMenu',
//         name: 'updateMenu',
//         component: () => import('@/views/ums/menu/update'),
//         meta: { title: '修改菜单' },
//         hidden: true
//       },
//       {
//         path: 'resource',
//         name: 'resource',
//         component: () => import('@/views/ums/resource/index'),
//         meta: { title: '资源列表', icon: 'ums-resource' }
//       },
//       {
//         path: 'resourceCategory',
//         name: 'resourceCategory',
//         component: () => import('@/views/ums/resource/categoryList'),
//         meta: { title: '资源分类' },
//         hidden: true
//       },
//       {
//         path: 'dict',
//         name: 'dict',
//         component: () => import('@/views/ums/dict/index'),
//         meta: { title: 'Dict' },
//       },
//       {
//         path: 'addDict',
//         name: 'addDict',
//         component: () => import('@/views/ums/dict/add'),
//         meta: { title: 'Add dict' },
//         hidden: true
//       },
//       {
//         path: 'updateDict',
//         name: 'updateDict',
//         component: () => import('@/views/ums/dict/update'),
//         meta: { title: 'Update dict' },
//         hidden: true
//       },
//       {
//         path: 'addDictItem',
//         name: 'addDictItem',
//         component: () => import('@/views/ums/dict/addItem'),
//         meta: { title: 'Add dict item' },
//         hidden: true
//       },
//       {
//         path: 'updateDictItem',
//         name: 'updateDictItem',
//         component: () => import('@/views/ums/dict/updateItem'),
//         meta: { title: 'Update dict item' },
//         hidden: true
//       },
//       {
//         path: 'language',
//         name: 'language_management',
//         component: () => import('@/views/ums/language/index'),
//         meta: { title: 'language' },
//       },
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]


const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})



