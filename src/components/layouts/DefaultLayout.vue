<template>
  <div class="container-fluid">
    <slot v-if="!route.meta.hideLayout" name="navbar"></slot>
    <div class="content">
      <slot></slot>
    </div>
    <slot v-if="!route.meta.hideLayout" name="footer"></slot>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
