<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 2000)
})
</script>

<template>
  <main>
    <h1>oops!! 404 not found</h1>
    <p>即將轉址前往首頁…</p>
  </main>
</template>
