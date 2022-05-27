import type { RouteRecordRaw } from "vue-router";

export default {
  name: "organization",
  path: "",
  component: () => import("#/base/YRouterView.vue"),
  meta: {
    addToMenu: true,
    title: "企业管理"
  },
  children: [
    {
      name: "employees",
      path: "employees",
      component: () => import("!/organization/employees.vue"),
      meta: {
        addToMenu: true,
        title: "员工管理"
      }
    }
  ]
} as RouteRecordRaw