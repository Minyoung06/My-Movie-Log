<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    style="height: 100vh; background-color: #9a7dff"
  >
    <!-- 입력창 및 표지 -->
    <div class="d-flex justify-content-center align-items-centers mb-3">
      <img src="" alt="" />
    </div>
    <div class="row input_style g-0 mb-3">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-user" style="color: #ffffff"></i>
      </div>
      <div class="col-10">
        <input type="text" id="id" placeholder="ID" v-model="id" />
      </div>
    </div>
    <div class="row input_style g-0 mb-5">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-lock" style="color: #ffffff"></i>
      </div>
      <div class="col-10">
        <input
          type="text"
          id="password"
          placeholder="PASSWORD"
          v-model="password"
        />
      </div>
    </div>
    <!-- 버튼 -->
    <div class="mb-3">
      <button class="badge" @click="login">LOGIN</button>
    </div>
    <div>
      <router-link
        to="/signup"
        class="badge border"
        style="text-decoration: none"
        >SIGNUP</router-link
      >
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const userStore = useUserStore();

const id = ref('');
const password = ref('');

async function login() {
  const success = await userStore.login(id.value, password.value);
  if (success) {
    router.push('/');
    id.value = '';
    password.value = '';
  } else {
    alert('로그인 실패!');
    id.value = '';
    password.value = '';
  }
}
</script>

<style scoped>
/* input 태그 관련 */
input {
  background-color: transparent;
  color: white;
  width: 100%;
  height: 100%;

  border: none;
  outline: none;
  box-shadow: none;
}

input:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input_style {
  border: 2px solid white;

  width: 400px;
  height: 50px;
}

/* 버튼 관련 */
a,
button {
  background-color: white;
  color: #9a7dff;
  border-color: white;

  font-size: 20px;

  width: 400px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
