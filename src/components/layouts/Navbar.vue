<template>
  <nav class="nav-bg py-4">
    <div class="container">
      <div class="row align-items-center flex-md-nowrap">
        <div class="col-12 col-md-6 mb-2 mb-md-0">
          <router-link
            to="/"
            class="text-decoration-none fs-1"
            style="color: var(--color-text-primary)"
            >My Movie Log</router-link
          >
        </div>

        <div class="col-12 col-md-6 text-end">
          <!-- 로그인 -->
          <div
            v-if="userStore.isLogin"
            class="d-flex justify-content-end align-items-center flex-wrap flex-md-nowrap"
          >
            <router-link
              to="/profile"
              class="text-decoration-none fs-6 me-3 link-nowrap"
              style="color: var(--color-text-primary)"
              >{{ userStore.userInfo.nickname }}</router-link
            >
            <router-link
              to="/favorites"
              class="text-decoration-none fs-6 me-3 link-nowrap"
              style="color: var(--color-text-primary)"
              >찜 목록</router-link
            >
            <div>
              <button class="logout" @click="logout">로그아웃</button>
            </div>
          </div>

          <!-- 로그인 X -->
          <div
            v-else
            class="d-flex justify-content-end align-items-center flex-nowrap"
          >
            <router-link
              to="/login"
              class="text-decoration-none fs-6 me-3 link-nowrap"
              style="color: var(--color-text-primary)"
              >로그인</router-link
            >
            <router-link
              to="/signup"
              class="text-decoration-none fs-6 me-3 link-nowrap"
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
import router from '@/router';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  alert('로그아웃 되었습니다.');
  router.push('/');
};
</script>

<style scoped>
.nav-bg {
  background-color: var(--color-background-light);
}
span {
  vertical-align: middle;
}
.link-nowrap {
  white-space: nowrap;
  display: inline-block;
}
.logout {
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: var(--color-text-primary);
}
</style>
