import type { MenuOption } from "naive-ui/es";
import { reactive } from "vue";

export default reactive<{
  path: string,
  fullPath: string,
  menuPathKeyMap: Map<string, string[]>,
  menu: MenuOption[],
  routeKey: string,
  menuExpandedKeys: string[],

  //* page标签页块
  pageTabMap: Map<string, {
    name: string,
    path: string,
    keys: string[],
    label: string
  }>,
  pageTabKey: string,
  pageRefreshing: boolean
}>({
  path: "",
  fullPath: "",
  routeKey: "",
  menuPathKeyMap: new Map(),
  menu: [],
  menuExpandedKeys: [],
  pageTabMap: new Map(),
  pageTabKey: "",
  pageRefreshing: false
});