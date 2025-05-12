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
            <button class="fav-btn" @click="fav.value = !fav.value">
              <i
                :class="fav.value ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
              ></i>
            </button>
          </div>
        </div>
        <div class="me-3">
          {{ movie.overview }}
        </div>
        <div
          class="my-3"
          style="color: var(--color-text-primary); font-size: 1.5rem"
        >
          평점:
        </div>
      </div>
    </div>
    <div v-else>
      <p>영화 정보를 불러오는 중입니다...</p>
    </div>
    <div class="review my-3">
      <div class="review-bar my-4">
        <form @submit.prevent="addReview" class="review-form">
          <div class="input-group">
            <input
              type="text"
              class="form-control border-end-0"
              placeholder="Review"
            />
            <button
              type="submit"
              class="btn btn-outline-secondary border-start-0"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div class="review-list my-3 p-3 bg-light rounded">
        <h4 style="color: var(--color-text-primary)">Reviews</h4>

        <div
          v-for="review in exReviews"
          :key="review.id"
          class="p-3 mb-2 rounded"
        >
          <p class="mb-1 fw-bold">
            {{ review.user }} | 평점: {{ review.rating }}
          </p>
          <p class="mb-0 small">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMovieDetails } from '@/api/tmdb';

const route = useRoute();
const router = useRouter();
const movie = ref(null);
const fav = ref(false);

onMounted(async () => {
  const id = route.params.id;
  movie.value = await getMovieDetails(id);
});

// onMounted(() => {
//   fav.value = favoritesStore.has(movie.id)
// });

const exReviews = ref([
  {
    id: 1,
    user: '김철수',
    comment: '정말 최고의 영화였어요. 감동적이고 눈물이 납니다.',
    rating: 9.5,
  },
  {
    id: 2,
    user: '홍길동',
    comment: '스토리와 연출이 모두 훌륭합니다. 강력 추천!',
    rating: 9.3,
  },
  {
    id: 3,
    user: '세번째',
    comment: '배우들의 연기가 몰입감을 높여줍니다.',
    rating: 9.1,
  },
]);

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
</style>
