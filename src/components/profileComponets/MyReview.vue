<template>
  <div class="h-100">
    <h2 id="header">나의 리뷰 목록</h2>
    <div class="movie-grid">
      <div class="movie-card" v-for="item in myReviews" :key="item.movieId">
        <img
          :src="`https://image.tmdb.org/t/p/w500${item.movie.poster_path}`"
          alt="포스터"
          class="movie-image"
        />
        <h5>{{ item.movie.title }}</h5>
        <p>⭐ {{ item.score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMovieDetails } from '@/api/tmdb';
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const myReviews = ref([]);

onMounted(async () => {
  const ratings = userStore.userInfo.ratings || [];

  const latets3 = ratings.slice(-3).reverse();

  const enriched = await Promise.all(
    latets3.map(async (r) => {
      const movie = await getMovieDetails(r.movieId);
      return movie
        ? {
            movieId: r.movieId,
            score: r.score,
            movie,
          }
        : null;
    })
  );

  myReviews.value = enriched.filter(Boolean);
});
</script>

<style scoped>
#header {
  color: #6200e8;
  margin: 1rem 0; /* 위아래 균형 있게 */
}

/* 3열 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 1rem;
}

/* 카드 스타일 */
.movie-card {
  background-color: #f4f4fc;
  padding: 0.75rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상하 요소 간 거리 유지 */
  height: 320px; /* ✅ 세로 길이 줄임 */
  margin-bottom: 1rem; /* ✅ 카드 아래쪽 여백 추가 */
}

/* 이미지 사이즈 조정 */
.movie-image {
  width: 100%;
  height: 180px; /* ✅ 이미지 높이 고정 */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

/* 반응형 - 모바일 대응 */
@media (max-width: 992px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .movie-grid {
    grid-template-columns: 1fr;
  }
}
</style>
