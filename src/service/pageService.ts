import { useMenuInit } from "@/hooks/menuHook"
import pageStorage from "@/storage/pageStorage";
import type { Router, RouteRecordRaw } from "vue-router";
import { useSwitchPageTab } from "@/hooks/pageTabsHook";

function getFirstMenu(routes: RouteRecordRaw[]): RouteRecordRaw {
  let first: RouteRecordRaw = null;
  for (const routeItem of routes) {
    if (routeItem.meta?.addToMenu) {
      first = routeItem;
      break;
    }
    if (routeItem?.children) {
      first = getFirstMenu(routeItem.children);
      if (first) break;
    }
  }

  return first;
}

let initPage = false;

export default {
  initMenu(routes: RouteRecordRaw[], router: Router): void {
    useMenuInit(routes);
    const firstRoute: RouteRecordRaw = getFirstMenu(routes);

    router.beforeEach((to, from, next) => {
      if (initPage) {
        next();
        return;
      }

      initPage = true;

      if (to.name !== firstRoute.name) {
        if (to.meta?.addToMenu) {
          useSwitchPageTab(to.name.toString(), to.path, [], to.meta.title);
          pageStorage.pageTabKey = to.name.toString();

          next({
            name: to.name
          });
          return;
        }
      }
      useSwitchPageTab(firstRoute.name.toString(), firstRoute.path, [], firstRoute.meta.title);
      pageStorage.pageTabKey = firstRoute.name.toString();

      initPage = true;
      next({
        name: firstRoute.name
      });
    })
  },
  switchPage(routerName: string, routePath: string): void {
    if (pageStorage.pageTabKey === routerName) {
      return;
    }
    pageStorage.pageTabKey = routerName;
    pageStorage.routeKey = routerName;
    pageStorage.menuExpandedKeys = pageStorage.menuPathKeyMap.get(routePath) ?? [];
  }
}