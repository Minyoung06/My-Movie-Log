<!-- components/ConfirmModal.vue -->
<template>
  <div class="modal-overlay" @click.self="onCancel">
    <div class="modal-box">
      <p>{{ message }}</p>
      <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn btn-secondary" @click="onCancel">취소</button>
        <button class="btn btn-danger" @click="onConfirm">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  onConfirm: Function,
  onCancel: Function,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: var(--color-background-light);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  color: var(--color-text-primary);
  font-weight: bold;
}

.modal-box button {
  background: transparent;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--color-text-primary);
}

.modal-box .btn-danger {
  border: 1px solid var(--color-text-primary);
}

.modal-box .btn-secondary {
  border: 1px solid var(--color-background-dark);
}
</style>
