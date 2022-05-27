<template>
1
  <v-provider>
    <RouterView />
  </v-provider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { VProvider } from "@Components/index";
</script>

<style>
@import url("./assets/css/reset.css");
@import url("./assets/css/base.css");
</style>
