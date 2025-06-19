<template>
  <div class="container">
    <button class="back-btn" @click="goBack"><</button>
    <div v-if="movie" class="movie mt-2 mb-4 d-flex align-items-center gap-3">
      <!-- 포스터 -->
      <div>
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
          alt="포스터"
        />
      </div>
      <!-- 상세 정보 -->
      <div class="details my-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 style="color: var(--color-text-primary)">{{ movie.title }}</h1>
          </div>
          <div>
            <button class="fav-btn" @click="toggleWish">
              <i
                :class="isWished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
              ></i>
            </button>
          </div>
        </div>
        <div class="me-3">
          {{ movie.overview }}
        </div>
        <!-- 상세 정보 내 -->
        <div
          class="my-3"
          style="color: var(--color-text-primary); font-size: 1.5rem"
        >
          평점:
          <span v-if="avgScore !== null">{{ avgScore }} / 5</span>
          <span v-else>리뷰 없음</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>영화 정보를 불러오는 중입니다...</p>
    </div>
    <div class="review my-3">
      <div class="review-bar my-4">
        <!-- 리뷰 존재 경우 -->
        <div v-if="myReview" class="mb-3 p-3 bg-light rounded border">
          <div class="d-flex justify-content-between align-items-start">
            <p class="mb-1 fw-bold" style="color: var(--color-text-primary)">
              이미 이 영화에 리뷰를 남기셨습니다.
            </p>
            <button @click="showModal = true" class="btn btn-sm ms-2">
              삭제
            </button>
          </div>
          <p class="mb-0 small">평점: {{ '⭐'.repeat(myReview.score) }}</p>
          <p class="mb-0 small">내용: {{ myReview.review || '(내용 없음)' }}</p>
        </div>

        <!-- 입력폼 -->
        <form v-if="isLogin" @submit.prevent="addReview" class="review-form">
          <div class="input-group">
            <!-- 리뷰 입력창 -->
            <input
              type="text"
              class="form-control border-end-0"
              placeholder="Review"
              v-model="ratingStore.reviews.review"
            />
            <!-- 별점 선택 -->
            <select
              v-model.number="ratingStore.reviews.score"
              class="form-select"
              style="max-width: 100px"
            >
              <option disabled value="0">평점</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }}점</option>
            </select>
            <!-- 추가 버튼 -->
            <button
              type="submit"
              class="btn btn-outline-secondary border-start-0"
            >
              {{ myReview ? '수정' : '추가' }}
            </button>
          </div>
        </form>
        <!-- 로그인하지 않은 경우 안내 -->
        <p v-else class="text-muted" style="margin-top: 1rem">
          리뷰 작성을 원하시면 <strong>로그인</strong>해주세요.
        </p>
      </div>
      <div class="review-list my-3 p-3 bg-light rounded">
        <h4 style="color: var(--color-text-primary)">Reviews</h4>

        <div
          v-for="(review, index) in ratingStore.topReviews"
          :key="index"
          class="p-3 mb-2 rounded"
        >
          <p class="mb-1 fw-bold">
            {{ review.user }} | 평점: {{ review.score }}
          </p>
          <p class="mb-0 small">{{ review.review }}</p>
        </div>
      </div>
    </div>

    <ConfirmModal
      v-if="showModal"
      :message="'정말 이 리뷰를 삭제하시겠습니까?'"
      :onConfirm="confirmDelete"
      :onCancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMovieDetails } from '@/api/tmdb';
import { useRatingStore } from '@/stores/ratingStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useUserStore } from '@/stores/userStore';

import ConfirmModal from '@/components/ConfirmModal.vue';

const route = useRoute();
const router = useRouter();
const movie = ref(null);

const movieId = Number(route.params.id);

const myReview = ref(null);

const ratingStore = useRatingStore();
const favoritesStore = useFavoritesStore();
const userStore = useUserStore();
const isLogin = computed(() => userStore.isLogin);

const showModal = ref(false);

function resetReviewInputs() {
  ratingStore.reviews.review = '';
  ratingStore.reviews.score = 0;
}

watch(
  () => route.params.id,
  () => {
    resetReviewInputs();
  }
);

watch(
  () => route.params.id,
  async (id) => {
    const newMovieId = Number(id);

    myReview.value = null;
    ratingStore.reviews.review = '';
    ratingStore.reviews.score = 0;

    movie.value = await getMovieDetails(newMovieId);
    await ratingStore.F_TopReviews(newMovieId);

    if (userStore.isLogin) {
      const res = await ratingStore.R_Review(newMovieId);
      if (res) {
        myReview.value = res;
        ratingStore.reviews.review = res.review;
        ratingStore.reviews.score = res.score;
      }
    }
  },
  { immediate: true }
);

const isWished = computed(
  () => isLogin.value && favoritesStore.wishlist.includes(movieId)
);

const avgScore = computed(() => {
  const reviews = ratingStore.topReviews;
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.score, 0);
  return (total / reviews.length).toFixed(1);
});

const toggleWish = async () => {
  if (!isLogin.value) {
    alert('찜 기능은 로그인 후 이용할 수 있습니다.');
    return;
  }

  if (isWished.value) {
    await favoritesStore.D_wishList(movieId);
  } else {
    await favoritesStore.C_wishList(movieId);
  }
};

const addReview = async () => {
  if (!userStore.isLogin) {
    alert('리뷰를 작성하려면 로그인이 필요합니다.');
    return;
  }

  const { review, score } = ratingStore.reviews;

  if (score === 0) {
    alert('별점을 입력해주세요.');
    return;
  }
  await ratingStore.CU_Review(movieId);
  await ratingStore.F_TopReviews(movieId);

  myReview.value = {
    movieId,
    review,
    score,
  };

  userStore.userInfo.ratings = [
    ...userStore.userInfo.ratings.filter((r) => r.movieId !== movieId),
    { movieId, review, score },
  ];

  localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo));
};

const confirmDelete = async () => {
  if (import.meta.env.MODE === 'production') {
    alert('데모 페이지에서는 리뷰 삭제가 불가능합니다.');
    showModal.value = false;
    return;
  }
  await ratingStore.D_review(movieId);
  myReview.value = null;
  ratingStore.reviews.review = '';
  ratingStore.reviews.score = 0;
  await ratingStore.F_TopReviews(movieId);
  showModal.value = false;
};

const cancelDelete = () => {
  showModal.value = false;
};

onMounted(async () => {
  movie.value = await getMovieDetails(movieId);
  await ratingStore.F_TopReviews(movieId);

  const user = userStore.userInfo;
  if (user?.id) {
    const res = await ratingStore.R_Review(movieId);
    if (res) {
      myReview.value = res;
      ratingStore.reviews.review = res.review;
      ratingStore.reviews.score = res.score;
    }
  }
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.review-form .form-control {
  background-color: transparent;
  border: 1px solid var(--color-text-primary);
  border-radius: 0 20px 20px 0;
}

.review-form .btn {
  background-color: transparent;
  border: 1px solid var(--color-text-primary);
  border-radius: 20px 0 0 20px;
}

.review-form .form-control::placeholder {
  color: var(--color-text-primary);
  opacity: 0.6;
}

.review-form i {
  color: var(--color-text-primary);
}

button {
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  background: transparent;
}
.back-btn {
  font-size: 2rem;
  border: none;
}

.fav-btn {
  font-size: 2rem;
  margin-right: 1rem;
}

.form-select {
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid var(--color-text-primary);
  border-bottom: 1px solid var(--color-text-primary);
  background-color: transparent;
  color: var(--color-text-primary);
}
</style>
