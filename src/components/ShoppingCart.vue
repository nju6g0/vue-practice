<script setup>
import { defineComponent, defineProps, defineEmits, computed, ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

defineComponent({
  components: {
    CloseOutlined
  }
})
const inputValue = ref('')
const props = defineProps(['data'])
const emit = defineEmits(['onRemoveCartItem', 'onSubmit'])

const columns = [
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate'
  },
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
    title: '數量',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: '單價',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '小計',
    dataIndex: 'subtotal',
    key: 'subtotal'
  }
]

const handleRemoveItem = (id) => {
  emit('onRemoveCartItem', id)
}
const handleSubmit = () => {
  emit('onSubmit', { total: getTotal.value, memo: inputValue.value })
  inputValue.value = ''
}
const getTotal = computed(() => props.data.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))
</script>

<template>
  <a-table
    :dataSource="data"
    :columns="columns"
    :pagination="false"
    :local="{ emptyText: '請選擇商品' }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operate'">
        <span class="remove" @click="handleRemoveItem(record.id)"><close-outlined /></span>
      </template>
      <template v-if="column.key === 'quantity'">
        <select v-model="record.quantity">
          <option v-for="item in 10" :key="item" selected="record.quantity">
            {{ item }}
          </option>
        </select>
      </template>
      <template v-if="column.key === 'subtotal'">
        <span>{{ record.quantity * record.price }}</span>
      </template>
    </template>
  </a-table>
  <a-flex gap="middle" :justify="'flex-end'">
    <p class="total">總計: ${{ getTotal }}</p>
  </a-flex>
  <a-textarea v-model:value="inputValue" show-count :maxlength="100" />
  <br />
  <a-flex gap="middle" :justify="'flex-end'">
    <a-button type="primary" :disabled="data.length === 0" @click="handleSubmit">送出</a-button>
  </a-flex>
</template>

<style scoped>
.remove {
  cursor: pointer;
}
.total {
  font-size: 20px;
  font-weight: bold;
}
</style>
