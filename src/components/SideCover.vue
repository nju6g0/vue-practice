<template>
  <div class="cover">
    <img
      class="logoImg"
      src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
      alt="logo"
    />
    <img
      class="d-m-n"
      src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
      alt="workImg"
    />
  </div>
</template>

<style lang="scss" scoped>
.cover {
  width: 460px;
}
@media (max-width: 1024px) {
  .cover {
    width: 400px;
  }
}
@media (max-width: 834px) {
  .cover {
    width: 80%;
    img:last-child {
      display: none;
    }
  }
}
</style>
