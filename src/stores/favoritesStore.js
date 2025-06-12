import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './userStore';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const wishlist = ref([]);
  const userStore = useUserStore();

  // 위시리스트 불러오기 (userId로 해당 유저 정보 조회 후 wishlist 할당)
  async function R_wishList(userId) {
    if (!userId) {
      console.error('[ERROR] userId가 없습니다.');
      wishlist.value = [];
      return [];
    }

    try {
      const res = await axios.get(`/api/users/${userId}`);

      if (!res.data) {
        console.error(
          '[ERROR] API 응답이 비어있거나 잘못되었습니다:',
          res.data
        );
        wishlist.value = [];
        return [];
      }

      // res.data가 단일 유저 객체임을 반영하여 수정
      wishlist.value = res.data.wishlist || [];
      return wishlist.value;
    } catch (err) {
      console.error('[ERROR] 위시리스트 불러오기 실패', err);
      wishlist.value = [];
      return [];
    }
  }

  // 위시리스트에 영화 추가
  async function C_wishList(movieId) {
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
