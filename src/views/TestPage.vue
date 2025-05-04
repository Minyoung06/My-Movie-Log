<template>
  <div>
    <h1>🔥 TMDB 영화 검색 테스트</h1>
    <input
      v-model="query"
      @keyup.enter="search"
      placeholder="검색어 입력 후 엔터"
    />
    <button @click="search">검색</button>

    <div v-if="movies.length">
      <h2>검색 결과</h2>
      <div
        v-for="movie in movies"
        :key="movie.id"
        style="margin-bottom: 16px; border-bottom: 1px solid #ccc; padding: 8px"
      >
        <h3>{{ movie.title }} ({{ movie.release_date }})</h3>
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
          alt="포스터"
        />
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { searchMovies } from '@/api/tmdb';

const query = ref('');
const movies = ref([]);

const search = async () => {
  movies.value = await searchMovies(query.value);
};
</script>
