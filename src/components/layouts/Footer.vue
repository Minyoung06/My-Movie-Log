<template>
  <footer class="footer-bg py-4 border-top">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <!-- 왼쪽: MyMovieLog -->
        <div class="col-auto">
          <a
            href="https://github.com/Minyoung06/My-Movie-Log"
            target="_blank"
            rel="noopener noreferrer"
            class="text-decoration-none d-flex align-items-center fs-4"
            style="color: #ffffff"
          >
            GitHub
          </a>
        </div>

        <!-- 오른쪽: 팀원 정보 -->
        <div class="col">
          <div class="d-flex justify-content-end flex-wrap">
            <div
              v-for="member in team"
              :key="member.name"
              class="d-flex align-items-center me-3"
            >
              <a
                v-if="member.link"
                :href="member.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none fs-6 align-items-center"
                style="color: var(--color-text-white)"
                ><i class="fab fa-github fa-xl me-1"></i>
                <span>{{ member.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const team = [
  { name: '양민영', link: 'https://github.com/Minyoung06' },
  { name: '윤예림', link: 'https://github.com/StarWhale0w0' },
];
</script>

<style scoped>
.footer-bg {
  background-color: var(--color-background-dark);
  color: var(--color-text-white);
}
</style>
