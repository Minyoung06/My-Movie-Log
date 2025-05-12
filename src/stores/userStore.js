import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref({
    id: '',
    password: '',
    nickname: '',
  });

  // 로그인 확인
  const isLogin = computed(
    () => !!userInfo.value.id && !!userInfo.value.password
  );

  // 로그인기능
  async function login(id, password) {
    try {
      const res = await axios.get('/api/users');
      const check = res.data.find(
        (user) => user.id === id && user.password === password
      );
      if (check) {
        userInfo.value = check;
        return true;
      } else {
        throw new Error('로그인에 실패하셨습니다.');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // 로그아웃 기능
  function logout() {
    userInfo.value = {
      id: '',
      password: '',
      nickname: '',
    };
  }

  // 회원가입 기능
  async function signup(id, password, nickname) {
    try {
      const res = await axios.post('/api/users', {
        id,
        password,
        nickname,
        wishlist: [],
        ratings: [],
      });
      return true;
    } catch (err) {
      console.log('로그인에 실패했습니다', err);
      return false;
    }
  }

  return {
    userInfo,
    isLogin,
    login,
    logout,
    signup,
  };
});
