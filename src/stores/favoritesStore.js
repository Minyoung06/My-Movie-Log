import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './userStore';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const wishlist = ref([]);
  const userStore = useUserStore();
  const isProd = import.meta.env.MODE === 'production';

  // 위시리스트 불러오기 (userId로 해당 유저 정보 조회 후 wishlist 할당)
  async function R_wishList(userId) {
    if (!userId) {
      console.error('[ERROR] userId가 없습니다.');
      wishlist.value = [];
      return [];
    }

    try {
      if (isProd) {
        const res = await fetch('/My-Movie-Log/users.json');
        const data = await res.json();
        const user = data.users.find((u) => u.id === userId);
        wishlist.value = user?.wishlist || [];
      } else {
        const res = await axios.get(`/api/users/${userId}`);
        wishlist.value = res.data.wishlist || [];
      }
      return wishlist.value;
    } catch (err) {
      console.error('[ERROR] 위시리스트 불러오기 실패', err);
      wishlist.value = [];
      return [];
    }
  }

  // 위시리스트에 영화 추가
  async function C_wishList(movieId) {
    if (isProd) {
      alert('데모 페이지에서는 찜 추가가 불가능합니다.');
      return;
    }

    const userId = userStore.userInfo.id;
    if (!userId) {
      console.error('[ERROR] userId가 없습니다.');
      return;
    }

    try {
      const res = await axios.get(`/api/users/${userId}`);
      const userData = res.data;

      if (!userData) {
        console.error('[ERROR] 유저 정보를 찾을 수 없습니다.');
        return;
      }

      const currentWishlist = userData.wishlist || [];
      if (currentWishlist.includes(movieId)) return;

      const newWishList = [...currentWishlist, movieId];
      await axios.patch(`/api/users/${userId}`, { wishlist: newWishList });
      wishlist.value = newWishList;
    } catch (err) {
      console.error('[ERROR] PATCH 실패', err);
    }
  }

  // 위시리스트에서 영화 삭제
  async function D_wishList(movieId) {
    if (isProd) {
      alert('데모 페이지에서는 찜 삭제가 불가능합니다.');
      return;
    }
    const userId = userStore.userInfo.id;
    if (!userId) {
      console.error('[ERROR] userId가 없습니다.');
      return;
    }

    try {
      const res = await axios.get(`/api/users/${userId}`);
      const userData = res.data;

      if (!userData) {
        console.error('[ERROR] 유저 정보를 찾을 수 없습니다.');
        return;
      }

      const currentWishlist = userData.wishlist || [];
      const removedWishList = currentWishlist.filter((id) => id !== movieId);

      await axios.patch(`/api/users/${userId}`, { wishlist: removedWishList });
      wishlist.value = removedWishList;
    } catch (err) {
      console.error('[ERROR] PATCH 실패', err);
    }
  }

  return {
    wishlist,
    R_wishList,
    C_wishList,
    D_wishList,
  };
});
