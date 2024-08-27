import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore =  defineStore('counter', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    function decrement(){
        if(count.value <= 0) return
        count.value--
    }
  
    return { count, doubleCount, increment, decrement }
})