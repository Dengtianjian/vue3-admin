import userService from "@/service/userService";
import userStorage from "@/storage/userStorage";
import type { Router } from "vue-router";

const authWhiteList: string[] = [
  "/user/login"
];

export default function routerGuardForAuth(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (userStorage.sessionAuthVerified === false) {
      await userService.slientLogin();
    }
    if ((to.meta.auth === undefined || to.meta.auth === false) && !authWhiteList.includes(to.fullPath)) {
      if (userStorage.logged === false) {
        return next("/user/login");
      }
    }

    if (to.fullPath === "/user/login" && userStorage.logged) {
      return next("/");
    }

    next();
  });
}