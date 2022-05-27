import pageService from "@/service/pageService";
import pageStorage from "@/storage/pageStorage";

//* 黑名单，如果路径存在黑名单列表里，就不添加
const blackList: string[] = [

];

export function useSwitchPageTab(name: string, path: string, keys: string[], label: string) {
  useAddTab(name, path, keys, label);
  pageService.switchPage(name, path);
}

export function useAddTab(name: string, path: string, keys: string[], label: string) {
  if (blackList.includes(name)) return;
  if (pageStorage.pageTabMap.has(name)) {
    return;
  }
  pageStorage.pageTabMap.set(name, {
    name,
    path,
    keys,
    label
  });
}

export function useRemoveTab(key: string) {
  if (!pageStorage.pageTabMap.has(key)) {
    return;
  }
  pageStorage.pageTabMap.delete(key);
}