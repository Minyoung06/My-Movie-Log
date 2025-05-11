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
            @focus="clearOnFocus"
            type="text"
            class="form-control border-start-0"
            placeholder="Search"
          />
        </div>
      </form>
    </div>

    <div class="my-1 py-3">
      <h2>검색 결과: {{ route.query.q }}</h2>
    </div>

    <div v-if="searchResults.length">
      <div class="movie-grid">
        <MovieCard v-for="movie in paginated" :key="movie.id" :movie="movie" />
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="currentPage = $event"
        class="pagination-wrapper"
      />
    </div>
    <div v-else>검색 결과가 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchMovies } from '@/api/tmdb';

import MovieCard from '@/components/MovieCard.vue';
import Pagination from '@/components/Pagination.vue';

const searchQuery = ref('');
const hasFocused = ref(false);
const route = useRoute();
const router = useRouter();
const searchResults = ref([]);
const currentPage = ref(1);
const pageSize = 5;

const clearOnFocus = () => {
  if (!hasFocused.value) {
    searchQuery.value = '';
    hasFocused.value = true;
  }
};

const search = () => {
  if (searchQuery.value.trim() === '') {
    alert('검색어를 입력해주세요.');
    return;
  }
  router.push({ path: '/search', query: { q: searchQuery.value } });
};

watch(
  () => route.query.q,
  async (newQuery) => {
    if (newQuery) {
      searchResults.value = await searchMovies(newQuery, 5);
      currentPage.value = 1;
      searchQuery.value = newQuery; // 입력창에도 반영
    } else {
      searchResults.value = [];
    }
  },
  { immediate: true } // 페이지 새로고침에도 실행되도록
);

const paginated = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return searchResults.value.slice(start, start + pageSize);
});

const totalPages = computed(() =>
  Math.ceil(searchResults.value.length / pageSize)
);
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
