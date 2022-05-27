<template>
  <n-empty description="页面未找到" :show-icon="false">
    <section class="status-code">
      404
      <p>~页面不存在喔🤦‍♂️</p>
    </section>
    <n-button @click="backToPreviousPage" style="display: block; margin: 0 auto"
      >返回上一页</n-button
    >
  </n-empty>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const R = useRouter();
function backToPreviousPage() {
  R.go(-1);
}
</script>

<style scoped>
.status-code {
  margin-top: calc(50vh - 100%);
  font-size: 200px;
  text-align: center;
}
.status-code > p {
  font-size: 20px;
  color: #000;
}
</style>
