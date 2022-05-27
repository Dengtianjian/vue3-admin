import pageStorage from "@/storage/pageStorage";
import type { Router } from "vue-router";

export default function routerGuardForMenu(router: Router) {
  router.beforeEach((to, from, next) => {
    pageStorage.path = to.fullPath;
    next();
  })
}