<template>
  <div>
    <h2 id="header">나의 정보</h2>
    <div id="body">안녕하세요! {{ userStore.userInfo.nickname }} 님!</div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

console.log(userStore.userInfo);
</script>

<style scoped>
#header {
  color: #6200e8;
}

#body {
  background-color: #e6e6fa;
  height: 450px;

  padding: 30px;

  color: #6200e8;
  font-size: large;
}
</style>
