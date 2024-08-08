<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/order">餐點管理工具 </RouterLink>
        <RouterLink to="/todo">串接 Todo List API </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  padding: 20px 0;
}
nav > a {
  margin-right: 10px;
}
</style>
