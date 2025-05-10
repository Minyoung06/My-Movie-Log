<template>
  <div class="container my-4">
    <div class="search-bar my-4">
      <form @submit.prevent="search" class="search-form">
        <div class="input-group">
          <button type="submit" class="btn btn-outline-secondary border-end-0">
            <i class="fas fa-search"></i>
          </button>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control border-start-0"
            placeholder="Search"
          />
        </div>
      </form>
    </div>
    <div class="populars">
      <div class="title my-4" style="color: var(--color-text-primary)">
        <h2>오늘의 BEST 영화!</h2>
      </div>
      <div class="movie-grid">
        <MovieCard
          v-for="movie in populars.slice(0, 10)"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPopularMovies } from '@/api/tmdb';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MovieCard from '@/components/MovieCard.vue';

const searchQuery = ref('');
const router = useRouter();
const populars = ref([]);

const search = () => {
  if (searchQuery.value.trim() === '') {
    alert('검색어를 입력해주세요.');
    return;
  }
  router.push({ path: '/search', query: { q: searchQuery.value } });
};

onMounted(async () => {
  populars.value = await getPopularMovies();
});
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* ⭐ 1줄 5개 */
  gap: 16px; /* 카드 사이 간격 */
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .movie-grid {
    grid-template-columns: 1fr;
  }
}

.search-form .form-control {
  background-color: transparent; /* ✅ 배경 투명 */
  border: 1px solid var(--color-text-primary);
  border-radius: 20px 0 0 20px;
}

.search-form .btn {
  background-color: transparent; /* ✅ 버튼 배경 투명 */
  border: 1px solid var(--color-text-primary);
  border-radius: 0 20px 20px 0;
}

.search-form .form-control::placeholder {
  color: var(--color-text-primary);
  opacity: 0.6;
}

.search-form i {
  color: var(--color-text-primary); /* ✅ 아이콘 색 */
}
</style>
