import Vue from "vue";
import Router from "vue-router";
import i18n from "@/lang";

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

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
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/login/register"),
    hidden: true,
  },
  // { path: '/password_find', component: () => import('@/views/login/forget'), hidden: true },
  {
    path: "/cart",
    component: () => import("@/views/cart/index"),
    hidden: true,
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },
  {
    path: "/product",
    component: () => import("@/views/product/index"),
    hidden: true,
  },
  { path: '/settlement', component: () => import('@/views/settlement/index'), hidden: true },
  { path: '/general', component: () => import('@/views/general/index'), hidden: true },
  { path: '/custom', component: () => import('@/views/custom/index'), hidden: true },
  { path: '/three', component: () => import('@/views/three/three'), hidden: true },
  { path: '/order/pay/success', component: () => import('@/views/settlement/success'), hidden: true },
  { path: '/order/pay/fail', component: () => import('@/views/settlement/fail'), hidden: true },
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/views/home/index"),
    hidden: true,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index"),
      },
    ],
  },
  {
    path: "/my",
    component: Layout,
    redirect: "/my",
    children: [
      {
        path: "baseInfo",
        name: "baseInfo",
        component: () => import("@/views/my/baseInfo"),
        meta: { title: i18n.t("router.baseInfo"), icon: "user2" },
      },
      {
        path: "payments",
        name: "payments",
        component: () => import("@/views/my/payments"),
        meta: { title: i18n.t("router.payments"), icon: "product-list" },
      },
      {
        path: "addresses",
        name: "addresses",
        component: () => import("@/views/my/addresses"),
        meta: { title: i18n.t("router.addresses"), icon: "address" },
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/my/order/index"),
        meta: { title: i18n.t("router.order"), icon: "orders" },
      },
    ],
  },
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
