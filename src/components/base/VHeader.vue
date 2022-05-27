<template>
  <div class="header">
    <div class="logo">Dashboard</div>
    <div class="header-user">
      <ul class="menu">
        <li>退出</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

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
