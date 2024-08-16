<script setup>
import { defineProps } from 'vue'

defineProps(['orderList', 'memo', 'total'])

const columns = [
  {
    title: '品項',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '數量',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: '小計',
    dataIndex: 'subtotal',
    key: 'subtotal'
  }
]
</script>

<template>
  <p>訂單</p>
  <a-table :dataSource="orderList" :columns="columns" :pagination="false" />
  <a-flex gap="middle" col :align="'flex-end'" vertical>
    <p>備註：{{ memo }}</p>
    <p class="total">總計：${{ total }}</p>
  </a-flex>
</template>

<style scoped>
.total {
  font-size: 20px;
  font-weight: bold;
}
</style>
