<script setup>
import { defineProps, defineEmits, ref, createVNode } from 'vue'
import {
  CloseOutlined,
  CheckOutlined,
  BorderOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const props = defineProps(['todo', 'loading'])
const emit = defineEmits(['onToggle', 'onPressEnter', 'onDelete'])
const isEditing = ref(false)
const editTodoInput = ref(props.todo.content)

const toggleTodo = () => {
  emit('onToggle', { id: props.todo.id, status: !props.todo.status })
}
const handleEdit = () => {
  isEditing.value = true
}
const editTodo = () => {
  const newContent = editTodoInput.value.trim()
  if (editTodoInput.value.trim().length !== 0 && props.todo.content !== newContent) {
    emit('onPressEnter', { id: props.todo.id, content: newContent })
  }
  isEditing.value = false
}
const handleDelete = () => {
  Modal.confirm({
    title: `確定要刪除「${props.todo.content}] ?`,
    icon: createVNode(ExclamationCircleOutlined),
    content: '刪掉的內容就像十年前的體重，再也回不去了',
    onOk() {
      return emit('onDelete', { id: props.todo.id })
    }
  })
}
</script>

<template>
  <div :class="`listItem ${todo.status && 'finished'}`">
    <label class="toggleButton" @click="toggleTodo">
      <input type="checkbox" :value="todo.status" />
      <CheckOutlined v-if="todo.status" />
      <BorderOutlined v-else />
    </label>
    <a-input
      v-if="isEditing || loading"
      :disabled="loading"
      v-model:value="editTodoInput"
      @pressEnter="editTodo"
    />
    <p v-else @dblclick="handleEdit">
      <a-tooltip>
        <template #title>雙擊滑鼠兩下可修改內容</template>
        {{ todo.content }}
      </a-tooltip>
    </p>
    <div class="deleteButton">
      <CloseOutlined style="font-size: 20px" @click="handleDelete" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.listItem {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(223, 222, 222);
  padding: 10px 16px;
  .toggleButton {
    margin-right: 16px;
    cursor: pointer;
    input[type='checkbox'] {
      display: none;
    }
  }
  > p {
    flex-grow: 1;
    margin: 0;
  }
  > .deleteButton {
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
    margin-left: 16px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    > .deleteButton {
      visibility: visible;
      opacity: 1;
    }
  }
}
.listItem.finished {
  > p {
    text-decoration: line-through;
  }
}
</style>
