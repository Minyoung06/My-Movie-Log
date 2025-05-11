<template>
  <div class="page-wrapper d-flex flex-column min-vh-100">
    <slot v-if="!route.meta.hideLayout" name="navbar"></slot>
    <div class="content flex-grow-1">
      <slot></slot>
    </div>
    <slot v-if="!route.meta.hideLayout" name="footer"></slot>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
