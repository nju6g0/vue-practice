<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'

const pushId = ref('abc')
</script>

<template>
  <main>
    <NavBar />
    <h1>巢狀路由-我是父層</h1>
    <input v-model="pushId" />
    <RouterLink to="/nest/child1">child1</RouterLink>|
    <RouterLink to="/nest/child2">child2</RouterLink>|
    <RouterLink :to="`/nest/${pushId}`">go page id:{{ pushId }}</RouterLink
    >|
    <RouterView />
  </main>
</template>
