<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// useRoute(只能取值) => https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96
// https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96
const route = useRoute()
const id = ref(route.params.id)

watch(
  () => route.params.id,
  (newId, oldId) => {
    // 对路由变化做出响应...
    id.value = newId
  }
)

// useRouter(可使用方法) => https://router.vuejs.org/zh/guide/advanced/composition-api.html#%E5%9C%A8-setup-%E4%B8%AD%E8%AE%BF%E9%97%AE%E8%B7%AF%E7%94%B1%E5%92%8C%E5%BD%93%E5%89%8D%E8%B7%AF%E7%94%B1
const router = useRouter()
const page = ref(1)

const goBack = () => {
  router.back()
}
const goPage = () => {
  router.go(page)
}
const push = () => {
  // https://router.vuejs.org/guide/essentials/navigation.html
  router.push({
    path: `/`
  })
}
</script>

<template>
  <main>
    <h1>動態路由</h1>
    <p>id: {{ id }}</p>
    <button type="button" @click="goBack">goBack</button>
    <br /><br />
    <input v-model="page" />
    <button type="button" @click="goPage">goPage</button>
    <br /><br />
    <button type="button" @click="push">push go home</button>
  </main>
</template>
