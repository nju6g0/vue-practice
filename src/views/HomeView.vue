<script setup></script>

<template>
  <main>
    <h1>六角學院 - vue 新手直播班作業們</h1>
    <ul>
      <li>
        <RouterLink to="/order">第一週-餐點管理工具 </RouterLink>
      </li>
      <li>
        <RouterLink to="/todo">第二週-串接 Todo List API </RouterLink>
      </li>
      <li>
        <RouterLink to="/orderingService">第三週- 餐點管理工具</RouterLink>
      </li>
      <li>
        <RouterLink to="/nest">第四週- 路由</RouterLink>
      </li>
      <li>
        <RouterLink to="/counter">第四週- pinia 練習</RouterLink>
      </li>
      <li>
        <RouterLink to="/myTodos">最終挑戰 - Todolist API 整合證書任務</RouterLink>
      </li>
      <li>
        <RouterLink to="/login">login</RouterLink>
      </li>
      <li>
        <RouterLink to="/signup">signup</RouterLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  padding: 20px 0;
}
h1 {
  font-size: 20px;
  margin-bottom: 20px;
}
li {
  margin-top: 10px;
}
</style>
