<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const userName = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await authStore.register(email.value, userName.value, password.value)
    router.push('/')
  } catch (e: unknown) {
    const err = e as { response?: { data?: { message?: string } } }
    error.value = err.response?.data?.message ?? '회원가입에 실패했습니다.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <h1>회원가입</h1>
    <form @submit.prevent="onSubmit" class="auth-form">
      <div v-if="error" class="error">{{ error }}</div>
      <div class="field">
        <label for="email">이메일</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" />
      </div>
      <div class="field">
        <label for="userName">사용자명</label>
        <input id="userName" v-model="userName" type="text" required minlength="2" autocomplete="username" />
      </div>
      <div class="field">
        <label for="password">비밀번호</label>
        <input id="password" v-model="password" type="password" required minlength="6" autocomplete="new-password" />
      </div>
      <button type="submit" :disabled="loading">{{ loading ? '처리 중...' : '가입하기' }}</button>
    </form>
    <p class="link">
      이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
    </p>
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.field label {
  font-weight: 500;
}
.field input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
.error {
  color: #c00;
  font-size: 0.9rem;
}
button {
  padding: 0.6rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}
</style>
