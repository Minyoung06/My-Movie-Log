import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './userStore';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const wishlist = ref([]);

  const userStore = useUserStore();
  const user = userStore.userInfo();

  // 위시리스트 읽기
  async function R_wishList(userId) {
    const res = await axios.get(`/api/users/${user.id}`);
    return res.data.wishlist;
  }

  // 위시리스트 추가
  async function C_wishList(movieId) {
    const res = await axios.get(`/api/users/${user.id}`);
    const userData = res.data;

    if (!userData.wishlist.includes(movieId)) {
      const newWishList = [...userData.wishlist, movieId];
      await axios.patch(`/api/users/${user.id}`, {
        wishlist: newWishList,
      });

      wishlist.value = newWishList;
    }
  }

  // 위시리스트 삭제
  async function D_wishList(movieId) {
    const res = await axios.get(`/api/users/${user.id}`);

    const currentUser = res.data;
    const currentWishList = [...currentUser.wishlist];

    const removedWishList = currentWishList.filter((id) => id !== movieId);

    try {
      await axios.patch(`/api/users/${user.id}`, {
        wishlist: removedWishList,
      });
    } catch (err) {
      console.log(err);
    }
  }
});
