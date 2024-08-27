<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'

import TodoListItem from '../components/ListItem.vue'
import { COOKIE_KEY } from '../constants'
import { getToken } from '../service/common'
import UsersService from '../service/users.service'
import TodosService from '../service/todo.service'

const TABS_KEY = {
  ALL: 'all',
  INCOMPLETE: 'incomplete',
  COMPLETED: 'completed'
}
const router = useRouter()
const isInitialing = ref(true)
const activeKey = ref(TABS_KEY.ALL)
const loading = ref(false)

const user = ref()
const todos = ref([])
const newTodo = ref('')
const errorMessage = ref('')

const naviToLogin = () => {
  router.push({
    path: `/login`
  })
}
async function addTodo() {
  loading.value = true
  try {
    await TodosService.addTodo({ content: newTodo.value })
    const newTodos = await TodosService.getTodos()
    todos.value = newTodos.data.data
    newTodo.value = ''
  } catch (err) {
    errorMessage.value = err.response.data.message
  }
  loading.value = false
}
const handleAddTodo = () => {
  if (loading.value) return
  if (newTodo.value.trim().length === 0) {
    errorMessage.value = '內容不可為空'
    return
  }
  errorMessage.value = ''
  addTodo()
}
async function logout() {
  try {
    await UsersService.signOut()
    document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure`
    naviToLogin()
  } catch (error) {
    // do nothing
  }
}
async function deleteTodo({ id }) {
  if (loading.value) return

  loading.value = true
  try {
    await TodosService.deleteTodo(id)
    const index = todos.value.findIndex((el) => el.id === id)
    todos.value.splice(index, 1)
  } catch (err) {
    errorMessage.value = err.response.data.message
  }
  loading.value = false
}
async function toggleTodo({ id, status }) {
  if (loading.value) return

  loading.value = true
  try {
    await TodosService.toggleTodo(id)
    const index = todos.value.findIndex((el) => el.id === id)
    todos.value[index].status = status
  } catch (err) {
    errorMessage.value = err.response.data.message
  }
  loading.value = false
}
async function editTodo({ id, content }) {
  if (loading.value) return

  loading.value = true
  try {
    await TodosService.editTodo({
      id,
      content
    })
    const index = todos.value.findIndex((el) => el.id === id)
    todos.value[index].content = content
  } catch (err) {
    errorMessage.value = err.response.data.message
  }
  loading.value = false
}
const incompleteCount = computed(() =>
  todos.value.reduce((acc, cur) => {
    if (!cur.status) {
      return (acc += 1)
    }
    return acc
  }, 0)
)

onMounted(() => {
  async function fetchTodos() {
    try {
      const todoRes = await TodosService.getTodos()
      todos.value = todoRes.data.data
      isInitialing.value = false
    } catch (err) {
      errorMessage.value = err.response.data.message
    }
  }
  async function checkUser() {
    try {
      const userRes = await UsersService.checkout()
      user.value = userRes.data
      await fetchTodos()
    } catch (err) {
      naviToLogin()
    }
  }
  const token = getToken()
  if (token) {
    checkUser()
  } else {
    naviToLogin()
  }
})
</script>

<template>
  <main>
    <nav>
      <a-flex justify="space-between">
        <a-typography-title :level="3">My Todos</a-typography-title>
        <div v-if="!isInitialing">
          <a-typography-text strong>{{ user?.nickname }}的代辦</a-typography-text>
          <a-button type="text" @click="logout">登出</a-button>
        </div>
      </a-flex>
    </nav>
    <div class="body">
      <div class="loading" v-if="isInitialing">
        <a-skeleton active />
      </div>
      <div v-else>
        <div>
          <a-alert v-if="errorMessage" :message="errorMessage" type="error" show-icon />
          <a-input-search
            v-model:value="newTodo"
            placeholder="新增待辦事項"
            size="large"
            :disabled="loading"
            @search="handleAddTodo"
          >
            <template #enterButton>
              <a-button :loading="loading"><PlusOutlined v-if="!loading" /></a-button>
            </template>
          </a-input-search>
        </div>
        <br />
        <a-alert v-if="todos.length === 0" message="目前尚無待辦事項" type="info" show-icon />
        <div v-else class="list">
          <a-tabs v-model:activeKey="activeKey" type="card">
            <a-tab-pane :key="TABS_KEY.ALL" tab="全部">
              <TodoListItem
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                :loading="loading"
                @onToggle="toggleTodo"
                @onPressEnter="editTodo"
                @onDelete="deleteTodo"
              />
              <p>未完成項目：{{ incompleteCount }}</p>
            </a-tab-pane>
            <a-tab-pane :key="TABS_KEY.INCOMPLETE" tab="未完成">
              <TodoListItem
                v-for="todo in todos.filter((el) => !el.status)"
                :key="todo.id"
                :todo="todo"
                :loading="loading"
                @onToggle="toggleTodo"
                @onPressEnter="editTodo"
                @onDelete="deleteTodo"
              />
            </a-tab-pane>
            <a-tab-pane :key="TABS_KEY.COMPLETED" tab="已完成">
              <TodoListItem
                v-for="todo in todos.filter((el) => el.status)"
                :key="todo.id"
                :todo="todo"
                :loading="loading"
                @onToggle="toggleTodo"
                @onPressEnter="editTodo"
                @onDelete="deleteTodo"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background-image: linear-gradient(175deg, #ffd370 60%, #fff 40%);
}
nav {
  padding: 24px 32px 0 32px;
  max-width: 1280px;
  margin: 0 auto;
}
.body {
  padding: 20px 0;
  max-width: 576px;
  margin: 0 auto;
}
.loading {
  padding-top: 50px;
}
.list {
  margin-top: 20px;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
}
@media (max-width: 576px) {
  main {
    background-image: linear-gradient(175deg, #ffd370 100%, #fff 0%);
  }
}
</style>
