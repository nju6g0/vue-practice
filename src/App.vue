<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>|
        <RouterLink to="/order">第一週-餐點管理工具 </RouterLink>|
        <RouterLink to="/todo">第二週-串接 Todo List API </RouterLink>|
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 0 40px;
}
nav {
  padding: 20px 0;
}
nav > a {
  margin-right: 10px;
}
</style>
