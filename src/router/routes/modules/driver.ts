import type { RouteRecordRaw } from "vue-router";

export default {
  name: "driver",
  path: "",
  component: () => import("#/base/YRouterView.vue"),
  meta: {
    // addToMenu: true,
    // title: "司机管理",
    // key: "driverManagement"
  },
  children: [
    {
      name: "management",
      path: "management",
      component: () => import("!/driver/management.vue"),
      meta: {
        addToMenu: true,
        title: "司机管理",
        key: "management"
      }
    }
  ]
} as RouteRecordRaw