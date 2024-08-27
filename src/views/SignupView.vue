<script setup>
import { reactive, ref } from 'vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import UsersService from '../service/users.service'
import SideCover from '../components/SideCover.vue'

const initialState = {
  email: '',
  nickname: '',
  password: '',
  checkPass: ''
}
const formRef = ref()
const formState = reactive({
  ...initialState
})
const formError = ref('')
const loading = ref(false)
const open = ref(false)
const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password')
  } else {
    if (formState.checkPass !== '') {
      formRef.value.validateFields('checkPass')
    }
    return Promise.resolve()
  }
}
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}
const rules = {
  email: [
    { required: true, message: 'Please input your email!' },
    { type: 'email', message: 'The input is not valid E-mail!' }
  ],
  nickname: [{ required: true, message: 'Please input your nickname!' }],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change'
    }
  ],
  checkPass: [
    {
      validator: validatePass2,
      trigger: 'change'
    }
  ]
}

async function signUp({ email, nickname, password }) {
  loading.value = true
  try {
    await UsersService.signUp({ email, nickname, password })
    open.value = true
  } catch (err) {
    formError.value = err.response.data.message
  }
  loading.value = false
}
const hideModal = () => {
  formRef.value.resetFields()
  formError.value = ''
  open.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <SideCover />
      <div class="form">
        <a-typography-title :level="3">註冊帳號</a-typography-title>
        <a-alert v-if="formError" :message="formError" type="error" show-icon />
        <br />
        <a-form
          ref="formRef"
          :model="formState"
          name="signup"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :rules="rules"
          autocomplete="off"
          @finish="signUp"
        >
          <a-form-item label="Email" name="email">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item label="您的暱稱" name="nickname">
            <a-input v-model:value="formState.nickname" />
          </a-form-item>
          <a-form-item label="密碼" name="password" has-feedback>
            <a-input-password
              v-model:value="formState.password"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item label="再次輸入密碼" name="checkPass" has-feedback>
            <a-input-password
              v-model:value="formState.checkPass"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button html-type="submit" :loading="loading">註冊帳號</a-button>
          </a-form-item>
        </a-form>
        <a-flex justify="center">
          <a-typography-text
            >已有帳號？前往<RouterLink to="/login">登入</RouterLink></a-typography-text
          >
        </a-flex>
      </div>
    </div>
    <a-modal v-model:open="open" centered :footer="null" :closable="false">
      <a-flex gap="middle" align="center" vertical>
        <CheckCircleOutlined style="color: green; font-size: 50px" />
        <a-typography-title :level="3">註冊成功</a-typography-title>
        <p>Welcome! {{ formState.nickname }}, 請前往<RouterLink to="/login">登入</RouterLink></p>
        <a-button @click="hideModal">關閉</a-button>
      </a-flex>
    </a-modal>
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background-image: linear-gradient(75deg, #ffd370 60%, #fff 40%);
  position: relative;
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
}
@media (max-width: 834px) {
  .container {
    flex-direction: column;
    justify-content: center;
  }
  .form {
    width: 80%;
    padding: 20px 16px;
  }
}
</style>
