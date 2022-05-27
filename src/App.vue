<template>
  <y-provider>
    <RouterView />
  </y-provider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { YProvider } from "#/index";
</script>

<style>
@import url("./assets/css/reset.css");
@import url("./assets/css/base.css");
</style>
