import type { Router } from "vue-router";
import routerGuardForAuth from "./auth";
import routerGuardForMenu from "./menu";

function setupPageGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title ?? "";
    next();
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  routerGuardForAuth(router);
  routerGuardForMenu(router);
}