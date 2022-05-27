<template>
  <n-space justify="center">
    <section class="version">
      袁云科技有限公司©yuanyunest.com {{ config.version }}
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
