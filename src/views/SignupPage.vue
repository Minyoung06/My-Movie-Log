<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    style="height: 100vh; background-color: #9a7dff"
  >
    <!-- 뒤로가기 버튼 -->
    <div>
      <RouterLink to="/login" class="back-button"><</RouterLink>
    </div>
    <!-- 입력창 및 표지 -->
    <div class="row input_style g-0 mb-3">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <i class="fa-regular fa-circle-user" style="color: #ffffff"></i>
      </div>
      <div class="col-10">
        <input
          type="text"
          id="nickname"
          placeholder="NICKNAME"
          v-model="nickname"
        />
      </div>
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
      <button class="badge" @click="signup">SIGNUP</button>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const userStore = useUserStore();

const nickname = ref('');
const id = ref('');
const password = ref('');

async function signup() {
  const success = await userStore.signup(
    nickname.value,
    id.value,
    password.value
  );
  if (success) {
    alert('회원가입 성공!');
    router.push('/login');
  } else {
    alert('회원가입 실패');
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

.back-button {
  position: absolute;
  top: 1px;
  left: 40px;
  z-index: 10; /* 겹치는 요소 위에 뜨게 */

  color: white;
  text-decoration: none;
  font-size: 50px;
}
</style>
