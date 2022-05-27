<template>
  <n-space justify="center">
    <section class="version">
      vue3-admin {{ config.version }}
    </section>
  </n-space>
</template>

<script lang="ts" setup>
import config from "@/config";
</script>

<style scoped>
.version {
  color: #999;
  font-size: 12px;
}
</style>
