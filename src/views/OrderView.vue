<script setup>
import { ref } from 'vue'
import data from '../service/data'
import NavBar from '../components/NavBar.vue'

const columns = [
  {
    title: '品項',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '價格',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '庫存',
    dataIndex: 'stock',
    key: 'stock'
  }
]
const menu = ref(
  data.map((el) => {
    el.isEditing = false
    el.tempName = el.name
    return el
  })
)

const handleDecrease = (id) => {
  const index = menu.value.findIndex((item) => item.id === id)
  if (menu.value[index].stock <= 0) return
  menu.value[index].stock--
}

const handleIncrease = (id) => {
  const index = menu.value.findIndex((item) => item.id === id)
  menu.value[index].stock++
}

const handleEdit = (id) => {
  const index = menu.value.findIndex((item) => item.id === id)
  menu.value[index].isEditing = true
}

const handleConfirm = (id) => {
  const index = menu.value.findIndex((item) => item.id === id)
  menu.value[index].name = menu.value[index].tempName
  menu.value[index].isEditing = false
}

const handleCancel = (id) => {
  const index = menu.value.findIndex((item) => item.id === id)
  menu.value[index].tempName = menu.value[index].name
  menu.value[index].isEditing = false
}
</script>

<template>
  <NavBar />
  <h1>六角學院 vue 直播班 - 第一週作業</h1>
  <a-table :data-source="menu" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a-flex v-if="record.isEditing">
          <a-input v-model:value="record.tempName" />
          <a-button @click="handleConfirm(record.id)">確定 </a-button>
          <a-button @click="handleCancel(record.id)">取消 </a-button>
        </a-flex>
        <a-flex v-else gap="middle">
          <span>{{ record.name }}</span>
          <a-button @click="handleEdit(record.id)">編輯 </a-button>
        </a-flex>
      </template>
      <template v-if="column.key === 'stock'">
        <a-button @click="handleDecrease(record.id)" :disabled="record.stock <= 0" :size="'small'">
          -
        </a-button>
        {{ record.stock }}
        <a-button @click="handleIncrease(record.id)" :size="'small'">+</a-button>
      </template>
    </template>
  </a-table>
</template>
