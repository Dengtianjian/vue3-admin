<template>
  <n-layout content-style="display: flex; flex-direction: column; height: 100vh">
    <n-layout-header>
      <YHeader />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider bordered :show-trigger="false" collapse-mode="width" :collapsed-width="62" :width="240">
        <YMenu></YMenu>
      </n-layout-sider>
      <n-layout content-style="background-color: var(--background-color)">
        <YPageTabs />
        <n-layout-content style="padding: 20px; background-color: var(--background-color)">
          <pageLayout></pageLayout>
        </n-layout-content>
        <n-layout-footer>
          <YFooter></YFooter>
        </n-layout-footer>
      </n-layout>
    </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
} from "naive-ui";
import pageLayout from "./pageLayout.vue";
import { YHeader, YMenu, YPageTabs, YFooter } from "#/index";
import { onMounted, ref } from "vue";

</script>

<style scoped>
</style>
