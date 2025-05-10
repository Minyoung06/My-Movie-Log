<template>
  <div class="card">
    <div class="card-body">
      <img :src="imageUrl" />
    </div>
    <div class="card-footer">
      <span>{{ movie.title }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const imageUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;
</script>

<style scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: none;
  box-shadow: none;
}

.card-body {
  padding: 0;
  height: 240px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: none;
}

.card-body img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: none;
}

.card-footer {
  flex: 0 1 auto;
  padding: 8px;
  text-align: center;
  word-wrap: break-word;
  background-color: transparent;
  border: none;
}
</style>
