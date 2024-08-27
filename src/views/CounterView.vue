<script setup>
import NavBar from '../components/NavBar.vue'
import { useCounterStore } from '../stores/counterStore'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
// 非函式的值需要使用 storeToRefs
const { count, doubleCount } = storeToRefs(counterStore)

// 函式則不需要
const { increment, decrement } = counterStore
</script>

<template>
  <NavBar />
  <main>
    <h1>counter - pinia 練習</h1>
    <!-- <h2>count: {{ counterStore.count }}</h2>
    <h2>doubleCount: {{ counterStore.doubleCount }}</h2>
    <button type="button" @click="counterStore.increment">increase</button>
    <button type="button" @click="counterStore.decrement" :disabled="counterStore.count <= 0">
      decrease
    </button> -->
    <h2>count: {{ count }}</h2>
    <h2>doubleCount: {{ doubleCount }}</h2>
    <button type="button" @click="increment">increase</button>
    <button type="button" @click="decrement" :disabled="count <= 0">decrease</button>
  </main>
</template>
