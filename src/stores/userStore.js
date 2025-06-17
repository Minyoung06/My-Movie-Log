import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref({
    id: '',
    password: '',
    nickname: '',
  });

  // 환경에 따른 데이터 fetch 함수
  async function fetchUsers() {
    // GitHub Pages 환경일 경우 정적 JSON 사용
    if (import.meta.env.MODE === 'production') {
      const res = await fetch('/My-Movie-Log/users.json');
      return await res.json();
    } else {
      // 로컬에서는 json-server 사용
      const res = await axios.get('/api/users');
      return res.data;
    }
  }

  // 시작 시 localStorage 복원
  const saved = localStorage.getItem('userInfo');
  if (saved) {
    try {
      userInfo.value = JSON.parse(saved);
    } catch (e) {
      console.error('저장된 로그인 정보 복원 실패:', e);
    }
  }

  // 로그인 확인
  const isLogin = computed(
    () => !!userInfo.value.id && !!userInfo.value.password
  );

  // 로그인기능
  async function login(id, password) {
    try {
      const users = await fetchUsers();
      const check = users.find(
        (user) => user.id === id && user.password === password
      );
      if (check) {
        userInfo.value = check;

        localStorage.setItem('userInfo', JSON.stringify(check));

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
    localStorage.removeItem('userInfo');
  }

  // 회원가입 기능
  async function signup(id, password, nickname) {
    try {
      if (import.meta.env.MODE === 'production') {
        alert('데모 페이지에서는 회원가입이 불가능합니다.');
        return false;
      }

      const res = await axios.post('/api/users', {
        id,
        password,
        nickname,
        wishlist: [],
        ratings: [],
      });
      return true;
    } catch (err) {
      console.log('회원가입에 실패했습니다', err);
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
