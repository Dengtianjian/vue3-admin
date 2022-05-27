<template>
  <ul class="page-tabs" ref="pageTabsEl">
    <li v-for="(tabItem, index) in pageStorage.pageTabMap" :key="tabItem[1].path" @click="switchPage(tabItem[1], index)"
      @dblclick="refreshPage(tabItem[1])" :class="{ active: pageStorage.pageTabKey === tabItem[1].name }">
      <span :title="pageStorage.pageTabKey === tabItem[1].name ? '双击刷新页面' : '切换页面'">{{ tabItem[1].label }}</span>
      <n-icon title="删除标签页" @click.stop="removePage(tabItem[1].name, index)" v-show="pageStorage.pageTabMap.size > 1">
        <CloseOutlined />
      </n-icon>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import { CloseOutlined } from "@vicons/antd";
import pageStorage from "@/storage/pageStorage";
import { useRemoveTab, useSwitchPageTab } from "@/hooks/pageTabsHook";
import { useRouter } from "vue-router";
const R = useRouter();

const pageTabsEl = ref<HTMLUListElement>(null);

type TTab = {
  name: string;
  path: string;
  keys: string[];
  label: string;
}

function switchPage(
  tabItem: TTab,
  elIndex: number
): void {
  useSwitchPageTab(tabItem.name, tabItem.path, tabItem.keys, tabItem.label);
  R.push({
    name: tabItem.name,
  });

  const lis: HTMLLIElement[] = Array.from(
    pageTabsEl.value.children
  ) as HTMLLIElement[];

  const targetLiElement: HTMLLIElement = lis[elIndex];
  const targetElIndex: number = elIndex === 0 ? 0 : elIndex - 1;
  pageTabsEl.value.scrollTo(
    targetLiElement.offsetLeft - lis[targetElIndex].clientWidth - 20,
    0
  );
}
function removePage(tabName: string, elIndex: number): void {
  if (pageStorage.pageTabMap.size === 1) {
    return;
  }
  let previousKey = "";
  pageStorage.pageTabMap.forEach((tabItem, itemKey) => {
    if (tabItem.name !== tabName) {
      previousKey = itemKey;
    }
  });

  useRemoveTab(tabName);

  if (tabName !== pageStorage.pageTabKey) return;
  const previousPageTab = pageStorage.pageTabMap.get(previousKey);
  useSwitchPageTab(
    previousPageTab.name,
    previousPageTab.path,
    previousPageTab.keys,
    previousPageTab.label
  );
  R.replace({
    name: previousKey,
  });
}

function refreshPage(tabItem: TTab) {
  if (tabItem.name !== pageStorage.routeKey) {
    return;
  }
  pageStorage.pageRefreshing = true;
  nextTick(() => {
    pageStorage.pageRefreshing = false;
  });
}
</script>

<style scoped>
.page-tabs {
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 6px;
  width: 100%;
  font-size: 12px;
  scroll-behavior: smooth;
  user-select: none;
  overflow: auto hidden;
  box-sizing: border-box;
}

.page-tabs::-webkit-scrollbar {
  height: 4px;
}

.page-tabs::-webkit-scrollbar-track {
  background-color: transparent;
}

.page-tabs::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.page-tabs::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
  border-radius: 4px;
}

.page-tabs li {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  column-gap: 6px;
  padding: 3px 10px;
  background-color: white;
}

.page-tabs li:hover,
.page-tabs li.active {
  color: var(--primary-color);
  cursor: pointer;
}
</style>
