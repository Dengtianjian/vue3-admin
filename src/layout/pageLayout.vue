<template>
  <router-view v-slot="{ Component, route }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" v-if="!pageStorage.pageRefreshing && route.meta.ignoreCache" />
      <keep-alive v-else>
        <section :key="route.fullPath">
          <component :is="Component" v-if="!pageStorage.pageRefreshing" />
        </section>
      </keep-alive>
    </transition>
    <!-- <router-view v-slot="{ Component, route }" v-else>
      <transition name="page-fade" mode="out-in">
        <component
          :is="Component"
          :key="route.fullPath"
          v-if="route.meta.ignoreCache"
        />
        <keep-alive v-else>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view> -->
  </router-view>
</template>

<script lang="ts" setup>
import pageStorage from "../storage/pageStorage";
</script>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
