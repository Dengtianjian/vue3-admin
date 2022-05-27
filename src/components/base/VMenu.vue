<template>
  <n-scrollbar>
    <n-menu ref="menuInstRef" :options="pageStorage.menu" :collapsed-width="62" :collapsed-icon-size="22"
      @update:value="selectMenu" :value="pageStorage.routeKey" :accordion="true"
      :expanded-keys="pageStorage.menuExpandedKeys" @update:expanded-keys="expandMenu" style="user-select:none;">
    </n-menu>
  </n-scrollbar>
</template>

<script lang="ts" setup>
import type { MenuOption, MenuInst } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import pageStorage from "@/storage/pageStorage";
import { useSwitchPageTab } from "@/hooks/pageTabsHook";
import { ref } from "vue";
import { watch } from "vue";
import { onMounted } from "vue";
const R = useRouter();
const RR = useRoute();
const menuInstRef = ref<MenuInst | null>(null);

function selectMenu(key: string, item: MenuOption) {
  R.push(item.path);
  useSwitchPageTab(
    item.key as string,
    item.path as string,
    item.keys as string[] || [],
    item.label as string
  );
}
watch(() => pageStorage.routeKey, (v) => {
  menuInstRef.value.showOption(v);
});

function expandMenu(keys: string[]) {
  pageStorage.menuExpandedKeys = keys;
}

onMounted(() => {
  menuInstRef.value.showOption(RR.name.toString());
})
</script>

<style scoped>
</style>
