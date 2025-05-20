import axios from 'axios';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './userStore';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const wishlist = ref([]);

  const userStore = useUserStore();
  const user = computed(() => userStore.userInfo);

  // 위시리스트 읽기
  async function R_wishList(userId) {
    try {
      const res = await axios.get(`/api/users?id=${userId}`);
      const userData = res.data[0];

      if (!userData) {
        console.error('[ERROR] 유저 정보를 찾을 수 없습니다.');
        return;
      }
      wishlist.value = userData.wishlist || [];
    } catch (err) {
      console.error('[R_wishList] 오류 발생:', err);
    }
  }

  // 위시리스트 추가
  async function C_wishList(movieId) {
    const res = await axios.get(`/api/users?id=${user.value.id}`);
    const userData = res.data[0];

    if (!userData) {
      console.error('[ERROR] 유저 정보를 찾을 수 없습니다.');
      return;
    }

    const currentWishlist = userData.wishlist || [];
    if (currentWishlist.includes(movieId)) return;
    const newWishList = [...currentWishlist, movieId];
    try {
      await axios.patch(`/api/users/${userData.id}`, {
        wishlist: newWishList,
      });
      wishlist.value = newWishList;
    } catch (err) {
      console.error('[ERROR] PATCH 실패', err);
    } finally {
      console.log('[C_wishList] 최종 wishlist 상태:', wishlist.value);
    }
  }

  // 위시리스트 삭제
  async function D_wishList(movieId) {
    const res = await axios.get(`/api/users?id=${user.value.id}`);

    const userData = res.data[0];

    if (!userData) {
      console.error('[ERROR] 유저 정보를 찾을 수 없습니다.');
      return;
    }
    const currentWishList = userData.wishlist || [];

    const removedWishList = currentWishList.filter((id) => id !== movieId);

    try {
      await axios.patch(`/api/users/${userData.id}`, {
        wishlist: removedWishList,
      });

      wishlist.value = removedWishList;
    } catch (err) {
      console.log('[ERROR] PATCH 실패', err);
    } finally {
      console.log('[D_wishList] 최종 wishlist 상태:', wishlist.value);
    }
  }

  return {
    wishlist,
    R_wishList,
    C_wishList,
    D_wishList,
  };
});
