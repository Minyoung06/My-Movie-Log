<template>
  <nav class="nav-bg py-4">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-6">
          <router-link
            to="/"
            class="text-decoration-none fs-1"
            style="color: var(--color-text-primary)"
            >My Movie Log</router-link
          >
        </div>
        <div class="col-3"></div>

        <div class="col-3 text-end">
          <!-- 로그인 -->
          <div
            v-if="isLoggedIn"
            class="d-flex justify-content-end align-items-center"
          >
            <router-link
              to="/profile"
              class="text-decoration-none fs-6 me-3"
              style="color: var(--color-text-primary)"
              >{{ nickname }}</router-link
            >
            <router-link
              to="/favorites"
              class="text-decoration-none fs-6 me-3"
              style="color: var(--color-text-primary)"
              >찜 목록</router-link
            >
            <!-- 로그아웃 기능 미구현. store 완성 후 추가 -->
            <router-link
              to="/"
              class="text-decoration-none fs-6 me-3"
              style="color: var(--color-text-primary)"
              >로그아웃</router-link
            >
          </div>

          <!-- 로그인 X -->
          <div v-else class="d-flex justify-content-end align-items-center">
            <router-link
              to="/login"
              class="text-decoration-none fs-6 me-3"
              style="color: var(--color-text-primary)"
              >로그인</router-link
            >
            <router-link
              to="/signup"
              class="text-decoration-none fs-6 me-3"
              style="color: var(--color-text-primary)"
              >회원가입</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// 임시
// const isLoggedIn = false;
const isLoggedIn = true;

const nickname = ref('홍길동');
</script>

<style scoped>
.nav-bg {
  background-color: var(--color-background-light);
}
span {
  vertical-align: middle;
}
</style>
