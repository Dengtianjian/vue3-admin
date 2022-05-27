import pageService from '@/service/pageService';
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from "../layout/defaultLayout.vue";
import createRouteGuard from "./guard";

import appRoutes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: DefaultLayout,
      children: appRoutes
    },
    {
      name: "login",
      path: "/user/login",
      component: () => import("!/user/login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/system/not-found.vue")
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
});

pageService.initMenu(appRoutes, router);

createRouteGuard(router);

export default router
