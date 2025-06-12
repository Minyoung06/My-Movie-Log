<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    style="height: 100vh; background-color: #9a7dff"
  >
    <div class="title_404">404</div>

    <div class="text mb-3">
      <p>페이지를 찾을 수 가 없습니다.</p>
      <p>요청하신 페이지가 존재하지 않거나, 주소가 잘못되었어요 :)</p>
    </div>

    <router-link
      to="/"
      class="badge home-button border text-decoration-none"
      style="text-decoration: none"
      >HOME</router-link
    >
  </div>
</template>

<script setup></script>

<style setup>
.title_404 {
  font-size: 10rem;
  color: white;
  text-align: center;
}
.text {
  font-size: 1.5rem;
  color: white;
  text-align: center;
}
.home-button {
  font-size: 20px;
  color: var(--color-background-dark);
  background-color: white;
  border-color: white;
  width: 100%;
  max-width: 400px;

  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
