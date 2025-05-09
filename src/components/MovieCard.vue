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
