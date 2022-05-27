<template>
  <div class="header">
    <div class="logo">{{ config.siteName }}</div>
    <div class="header-user">
      <ul class="menu">
        <li @click="userLogout">退出</li>
      </ul>
      <div class="user-operations" v-if="userStorage.logged">
        <!-- <n-avatar round></n-avatar> -->
        {{ userStorage.account }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userStorage from "@/storage/userStorage";
import config from "@/config";
import { useRouter } from "vue-router";
const R = useRouter();

function userLogout() {
  userStorage.account = "";
  userStorage.logged = false;
  userStorage.token = "";

  localStorage.removeItem("account");
  localStorage.removeItem("token");

  R.replace("/user/login");
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.header-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
}
.menu {
  display: flex;
  align-items: center;
  column-gap: 10px;
  list-style-type: none;
}
.menu > li {
  padding: 0 10px;
  cursor: pointer;
}
.menu > li:hover {
  color: var(--primary-color);
}
.user-operations {
  display: contents;
}
</style>
