<template>
  <div class="movie-grid">
    <MovieCard v-for="movie in paginated" :key="movie.id" :movie="movie" />
  </div>
  <Pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @update:currentPage="currentPage = $event"
    class="pagination-wrapper"
  />
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favoritesStore';
import { computed, onMounted, ref } from 'vue';
import { getMovieDetails } from '@/api/tmdb';

import MovieCard from '@/components/MovieCard.vue';
import Pagination from '@/components/Pagination.vue';

import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const favoritesStore = useFavoritesStore();
const currentPage = ref(1);
const pageSize = 8;
const fullMovieList = ref([]);

// 영화 위시리스트 가져오기 (상세정보로 변환)
async function fetchFavoritesMovies() {
  fullMovieList.value = [];

  for (const movieID of favoritesStore.wishlist) {
    try {
      const movie = await getMovieDetails(movieID);
      fullMovieList.value.push(movie);
    } catch (err) {
      console.log(err);
    }
  }
}

// 페이지네이션
const paginated = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return fullMovieList.value.slice(start, start + pageSize);
});

// 총 페이지 계산
const totalPages = computed(() => {
  return Math.ceil(fullMovieList.value.length / pageSize);
});

onMounted(async () => {
  if (userStore.isLogin) {
    await favoritesStore.R_wishList(userStore.userInfo.id); // userId 전달 필수!
    await fetchFavoritesMovies();
  } else {
    console.log('로그인 안 됨 - 위시리스트 요청 안 함');
  }
});
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-block: 2rem;
  padding: 1rem;
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
  background-color: transparent;
  border: 1px solid var(--color-text-primary);
  border-radius: 20px 0 0 20px;
}

.search-form .btn {
  background-color: transparent;
  border: 1px solid var(--color-text-primary);
  border-radius: 0 20px 20px 0;
}

.search-form .form-control::placeholder {
  color: var(--color-text-primary);
  opacity: 0.6;
}

.search-form i {
  color: var(--color-text-primary);
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem;
  padding: 2rem;
}
</style>
