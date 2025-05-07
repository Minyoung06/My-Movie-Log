<template>
  <DefaultLayout>
    <template v-slot:navbar><NavBar /></template>
    <template v-slot:default><RouterView /></template>
    <template v-slot:footer><Footer /></template>
  </DefaultLayout>
</template>

<script setup>
import { RouterView } from 'vue-router';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import NavBar from './components/layouts/Navbar.vue';
import Footer from './components/layouts/Footer.vue';
</script>
