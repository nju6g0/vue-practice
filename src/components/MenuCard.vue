<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['data', 'disabled'])
const emit = defineEmits(['onClick'])

const handleClick = () => {
  emit('onClick', props.data)
}
</script>

<template>
  <div class="card" :class="{ disabled: disabled }" @click="handleClick">
    <a-flex gap="middle" :justify="'space-between'" :align="'center'">
      <p class="name">{{ data.name }}</p>
      <p>${{ data.price }}</p>
    </a-flex>
    <p>{{ data.description }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
.card {
  border-bottom: 1px solid #ccc;
  padding: 10px 16px;
  cursor: pointer;
}
.disabled {
  background-color: #ccc;
  cursor: no-drop;
  color: #fff;
}
.name {
  font-size: 20px;
}
</style>
