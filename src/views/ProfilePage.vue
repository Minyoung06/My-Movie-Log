<template>
  <div class="container py-3">
    <div class="row justify-content-center align-items-stretch g-3">
      <!-- 왼쪽 설정 메뉴 -->
      <div class="col-md-3">
        <div id="nav">
          <nav>
            <h3>설정</h3>
            <ul class="nav mt-3 flex-column">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  @click.prevent="changeView('UserInfo')"
                  >유저 프로필</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  @click.prevent="changeView('MyReview')"
                  >내가 적은 리뷰</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- 오른쪽 컴포넌트 -->
      <div class="col-md-8">
        <div id="profile-right">
          <component :is="componentToRender" :key="componentKey" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, ref, computed } from 'vue';
import UserInfo from '@/components/profileComponets/UserInfo.vue';
import MyReview from '@/components/profileComponets/MyReview.vue';

const currentComponent = shallowRef(UserInfo);
const componentKey = ref(0);

const componentToRender = computed(() => currentComponent.value);

function changeView(viewName) {
  currentComponent.value = viewName === 'UserInfo' ? UserInfo : MyReview;
  componentKey.value++;
}
</script>

<style scoped>
#nav,
#profile-right {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1.5rem;
  height: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* 추가적인 여백 */
.container {
  max-width: 1200px;
}

h3 {
  color: #6200e8;
}

.nav-link {
  color: #333;
}

.nav-link:hover {
  color: #6200e8;
  text-decoration: underline;
}
</style>
