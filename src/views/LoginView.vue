<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import UsersService from '../service/users.service'
import { COOKIE_KEY } from '../constants'
import SideCover from '../components/SideCover.vue'

const initialState = {
  email: '',
  password: ''
}
const formRef = ref()
const formState = reactive({
  ...initialState
})
const formError = ref('')
const loading = ref(false)
const router = useRouter()

async function login({ email, password }) {
  loading.value = true
  try {
    const response = await UsersService.signIn({ email, password })
    document.cookie = `${COOKIE_KEY}=${response.data.token}; expires=${response.data.exp}; SameSite=None; Secure`
    setTimeout(() => {
      router.push({
        path: `/myTodos`
      })
    }, 1000)
  } catch (err) {
    formError.value = err.response.data.message
    loading.value = false
  }
}
</script>

<template>
  <main>
    <div class="container">
      <SideCover />
      <div class="form">
        <a-typography-title :level="3">最實用的線上代辦服務</a-typography-title>
        <a-alert v-if="formError" :message="formError" type="error" show-icon />
        <br />
        <a-form
          ref="formRef"
          :model="formState"
          name="login"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="login"
        >
          <a-form-item
            label="Email"
            name="email"
            :rules="[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' }
            ]"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item
            label="密碼"
            name="password"
            has-feedback
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button html-type="submit" :loading="loading">登入</a-button>
          </a-form-item>
        </a-form>
        <a-flex justify="center">
          <a-typography-text><RouterLink to="/signup">註冊帳號</RouterLink></a-typography-text>
        </a-flex>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-image: linear-gradient(75deg, #ffd370 60%, #fff 40%);
}
.container {
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
}
.form {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 40px;
  width: 400px;
}
@media (max-width: 834px) {
  .container {
    flex-direction: column;
    justify-content: center;
  }
  .form {
    width: 80%;
  }
}
</style>
