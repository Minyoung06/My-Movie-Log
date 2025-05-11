<template>
  <div class="pagination text-center mt-4">
    <button
      @click="$emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="page-button move mx-2"
    >
      &lt;
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('update:currentPage', page)"
      :class="{ active: page === currentPage }"
      class="page-button mx-2"
    >
      {{ page }}
    </button>
    <button
      @click="$emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="page-button move mx-2"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

defineEmits(['update:currentPage']);

const visiblePages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const maxButtons = 5;

  let start = Math.max(1, current - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
console.log('[Pagination.vue] totalPages:', props.totalPages);
</script>

<style scoped>
.page-button {
  min-width: 36px;
  padding: 6px 0;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
}
.move {
  background-color: var(--color-background-dark);
}

.page-button.active {
  font-weight: bold;
  border: 1px solid var(--color-background-dark);
  background-color: var(--color-background-dark);
}
button:disabled {
  opacity: 0.6;

  background-color: var(--color-background-light);
}
</style>
