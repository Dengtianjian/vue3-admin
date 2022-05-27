import pageStorage from "@/storage/pageStorage";
import type { MenuOption } from "naive-ui/es";
import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export function useMenuInit(route: RouteRecordRaw[], parentPath: string[] = [], parentMenuOption: MenuOption = null, parentKeys: string[] = []): void {
  route.forEach(childRoute => {
    const fullPath: string[] = [...parentPath];
    if (childRoute.path) {
      fullPath.push(childRoute.path);
    }

    const fullPathString: string = (fullPath.length ? "/" : "") + fullPath.join("/");
    const key: string = childRoute.name.toString() ?? Date.now().toString();
    const option = {
      label: childRoute.meta?.title ?? "",
      key,
      path: fullPathString,
    };
    if (childRoute.meta?.addToMenu) {
      if (parentMenuOption) {
        if (!parentMenuOption.children) {
          parentMenuOption.children = [];
        }
        parentMenuOption.children.push(option);
      } else {
        pageStorage.menu.push(option);
      }
      parentKeys.push(key);
      pageStorage.menuPathKeyMap.set(fullPathString, [...parentPath]);
    }
    if (childRoute.children?.length) {
      useMenuInit(childRoute.children, [...fullPath], childRoute.meta?.addToMenu ? option : parentMenuOption, [...parentKeys]);
    }
  });
}