import type { RouteRecordRaw } from "vue-router";

export default {
  name: "store",
  path: "stores",
  component: () => import("#/base/YRouterView.vue"),
  meta: {
    addToMenu: true,
    title: "门店设置"
  },
  children: [
    {
      name: "storeSign",
      path: "",
      component: () => import("!/store/sign.vue"),
      meta: {
        addToMenu: true,
        title: "门店签收情况"
      }
    }, {
      name: "storeSet",
      path: "set",
      component: () => import("!/store/set.vue"),
      meta: {
        addToMenu: true,
        title: "门店设置"
      }
    }
  ]
} as RouteRecordRaw