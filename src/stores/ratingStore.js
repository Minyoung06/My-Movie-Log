import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './userStore';
import axios from 'axios';

export const useRatingStore = defineStore('ratingStore', () => {
  const reviews = ref({
    review: '',
    score: 0,
  });

  const topReviews = ref([]);

  const userStore = useUserStore();

  // 리뷰 생성 + 수정
  async function CU_Review(movieId) {
    const user = userStore.userInfo;
    const newRating = {
      movieId,
      review: reviews.value.review,
      score: reviews.value.score,
    };

    const res = await axios.get(`/api/users/${user.id}`);
    const currentUser = res.data;
    const currentUserRating = [...currentUser.ratings];

    // 같은 영화 리뷰가 존재하는지 확인
    const movieIndex = currentUserRating.findIndex(
      (rating) => rating.movieId === movieId
    );

    if (movieIndex !== -1) {
      currentUserRating[movieIndex] = {
        ...currentUserRating[movieIndex],
        ...newRating,
      };
    } else {
      currentUserRating.push(newRating);
    }

    // 수정 or 생성을  db에 업데이트
    try {
      await axios.patch(`/api/users/${user.id}`, {
        ratings: currentUserRating,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 리뷰 가져오기
  async function R_Review(movieId) {
    const user = userStore.userInfo;

    try {
      const res = await axios.get(`/api/users/${user.id}`);
      const currentUser = res.data;
      const currentUserRating = currentUser.ratings;

      const movieIndex = currentUserRating.findIndex(
        (rating) => rating.movieId === movieId
      );

      return movieIndex.review || null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // 특정 영화의 상위 3개 리뷰 가져오기
  async function F_TopReviews(movieId) {
    try {
      const res = await axios.get('/api/users');
      const users = res.data;
      const reviews = users.flatMap((user) => {
        const rating = user.ratings?.find((r) => r.movieId === movieId);
        return rating && rating.review
          ? [
              {
                user: user.nickname || user.id,
                review: rating.review,
                score: rating.score,
              },
            ]
          : [];
      });
      topReviews.value = reviews.sort((a, b) => b.score - a.score).slice(0, 3);
    } catch (err) {
      console.error('리뷰 로딩 실패:', err);
      topReviews.value = [];
    }
  }

  // 리뷰 삭제하기
  async function D_review(movieId) {
    const user = userStore.userInfo;

    const res = await axios.get(`/api/users/${user.id}`);
    const currentUser = res.data;
    const currentUserRating = [...currentUser.ratings];

    const removedRating = currentUserRating.filter(
      (rating) => rating.movieId !== movieId
    );

    try {
      await axios.patch(`/api/users/${user.id}`, {
        ratings: removedRating,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    reviews,
    userStore,
    topReviews,
    CU_Review,
    R_Review,
    F_TopReviews,
    D_review,
  };
});
