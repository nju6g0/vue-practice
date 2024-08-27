<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>|
      <RouterLink to="/order">第一週-餐點管理工具 </RouterLink>|
      <RouterLink to="/todo">第二週-串接 Todo List API </RouterLink>|
      <RouterLink to="/orderingService">第三週- 餐點管理工具</RouterLink>|
      <RouterLink to="/nest">第四週- 路由</RouterLink>|
      <RouterLink to="/counter">第四週- pinia 練習</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
nav {
  padding: 20px 0;
}
nav > a {
  margin-right: 10px;
}
</style>
