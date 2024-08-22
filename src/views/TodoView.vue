<script setup>
import { onMounted, ref, createVNode } from 'vue'
import NavBar from '../components/NavBar.vue'
import { COOKIE_KEY } from '../constants'
import { getToken } from '../service/common'
import UsersService from '../service/users.service'
import TodosService from '../service/todo.service'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const signupValues = ref({})
const signupResponse = ref({})
const signInValues = ref({})
const signinResponse = ref({})
const checkoutResponse = ref({})
const signoutResponse = ref({})

async function signUp() {
  try {
    const response = await UsersService.signUp(signupValues.value)
    signupResponse.value = response.data
    signupValues.value = {}
  } catch (error) {
    signupResponse.value = error.response.data
  }
}
async function signIn() {
  try {
    const response = await UsersService.signIn(signInValues.value)
    signinResponse.value = response.data
    signInValues.value = {}
    signoutResponse.value = {}
    document.cookie = `${COOKIE_KEY}=${response.data.token}; expires=${response.data.exp}; SameSite=None; Secure`
  } catch (error) {
    signinResponse.value = error.response.data
  }
}
async function checkout() {
  try {
    const response = await UsersService.checkout()
    const res = await TodosService.getTodos()
    checkoutResponse.value = response.data
    todos.value = res.data.data
  } catch (error) {
    checkoutResponse.value = error.response.data
  }
}
async function signout() {
  try {
    const response = await UsersService.signOut()
    signoutResponse.value = response.data
    signinResponse.value = {}
    todos.value = []
    checkoutResponse.value = {}
    document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure`
  } catch (error) {
    signoutResponse.value = error.response.data
  }
}

const todos = ref([])
const newTodo = ref('')
const todoInput = ref({})

async function addTodo() {
  try {
    await TodosService.addTodo({ content: newTodo.value })
    const newTodos = await TodosService.getTodos()
    todos.value = newTodos.data.data
    newTodo.value = ''
  } catch (err) {
    alert(err.response.data.message)
  }
}
async function editTodo({ id }) {
  try {
    await TodosService.editTodo({ id, content: todoInput.value.content })
    const index = todos.value.findIndex((el) => el.id === id)
    todos.value[index].content = todoInput.value.content
    todoInput.value = {}
  } catch (err) {
    alert(err.response.data.message)
  }
}
function cancelEdit() {
  todoInput.value = {}
}
function handleEdit(todo) {
  todoInput.value = { ...todo }
}
function handleDelete({ id, content }) {
  Modal.confirm({
    title: `確定要刪除「${content}] ?`,
    icon: createVNode(ExclamationCircleOutlined),
    content: '刪掉的內容就像十年前的體重，再也回不去了',
    onOk() {
      return deleteTodo(id)
    },
    onCancel() {}
  })
}
async function deleteTodo(id) {
  try {
    await TodosService.deleteTodo(id)
    const index = todos.value.findIndex((el) => el.id === id)
    todos.value.splice(index, 1)
  } catch (err) {
    alert(err.response.data.message)
  }
}
async function toggleTodo({ id, status }) {
  try {
    await TodosService.toggleTodo(id)
    const index = todos.value.findIndex((el) => el.id === id)
    todos.value[index].status = !status
  } catch (err) {
    alert(err.response.data.message)
  }
}

onMounted(() => {
  async function fetchTodos() {
    try {
      const response = await UsersService.checkout()
      const res = await TodosService.getTodos()
      signinResponse.value.token = token
      checkoutResponse.value = response.data
      todos.value = res.data.data
    } catch (err) {
      console.log(err)
    }
  }
  const token = getToken()
  if (token) {
    fetchTodos()
  }
})
</script>

<template>
  <NavBar />
  <main>
    <div>
      <h3>註冊</h3>
      <input type="email" placeholder="Email" v-model="signupValues.email" />
      <input type="password" placeholder="Password" v-model="signupValues.password" />
      <input type="text" placeholder="Nickname" v-model="signupValues.nickname" />
      <button type="button" @click="signUp">sign up</button>
      <p v-if="!signupResponse.status">{{ signupResponse.message }}</p>
      <p v-else>{{ signupResponse.uid }}</p>
    </div>
    <br />
    <div>
      <h3>登入</h3>
      <input type="email" placeholder="Email" v-model="signInValues.email" />
      <input type="password" placeholder="Password" v-model="signInValues.password" />
      <button type="button" @click="signIn">sign in</button>
      <p v-if="!signinResponse.status">{{ signinResponse.message }}</p>
      <p v-else>
        welcome {{ signinResponse.nickname }} !! your token is: {{ signinResponse.token }}
      </p>
    </div>
    <br />
    <div>
      <h3>驗證</h3>
      <input type="text" placeholder="token" v-model="signinResponse.token" disabled />
      <button type="button" @click="checkout">Check out</button>
      <p v-if="!checkoutResponse.status">{{ checkoutResponse.message }}</p>
      <p v-else>{{ checkoutResponse.nickname }} 驗證成功!!</p>
    </div>
    <br />
    <div>
      <h3>登出</h3>
      <input type="text" placeholder="token" v-model="signinResponse.token" disabled />
      <button type="button" @click="signout">Sign out</button>
      <p v-if="!signoutResponse.status">{{ signoutResponse.message }}</p>
      <p v-else>{{ signoutResponse.nickname }} 成功登出!!</p>
    </div>

    <br />
    <hr />

    <div>
      <h2>
        <span v-if="checkoutResponse.nickname">這是{{ checkoutResponse.nickname }}的</span>TODOS
      </h2>
      <div>
        <input stype="text" v-model="newTodo" />
        <button type="button" @click="addTodo">add todo</button>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <td>cotent</td>
            <td>createTime</td>
            <td>status</td>
            <td>operation</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <td class="content">
              <div v-if="todoInput.id === todo.id">
                <input type="text" v-model="todoInput.content" />
                <div>
                  <button type="button" @click="editTodo(todo)">save</button>
                  <button type="button" @click="cancelEdit">cancel</button>
                </div>
              </div>
              <div v-else>
                <p>{{ todo.content }}</p>
                <button type="button" @click="handleEdit(todo)">edit</button>
              </div>
            </td>
            <td>{{ todo.createTime }}</td>
            <td>
              <button type="button" @click="toggleTodo(todo)">
                {{ todo.status ? 'completed' : 'Unfinished' }}
              </button>
            </td>
            <td><button type="button" @click="handleDelete(todo)">delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-bottom: 40px;
}
p {
  word-break: break-all;
  margin: 0;
}
input {
  margin-right: 12px;
}
table,
th,
td {
  border: 1px solid #ccc;
}
thead td {
  font-weight: 600;
}
td {
  padding: 10px;
}
.content {
  min-width: 360px;
}
.content > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
