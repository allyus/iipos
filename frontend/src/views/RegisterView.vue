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
    <div class="auth-card">
      <h1 class="auth-card__title">회원가입</h1>
      <form @submit.prevent="onSubmit" class="auth-form">
        <div v-if="error" class="error-msg">{{ error }}</div>
        <div class="field">
          <label for="email" class="field__label">이메일</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="field__input"
            required
            autocomplete="email"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div class="field">
          <label for="userName" class="field__label">사용자명</label>
          <input
            id="userName"
            v-model="userName"
            type="text"
            class="field__input"
            required
            minlength="2"
            autocomplete="username"
            placeholder="사용자명을 입력하세요 (2자 이상)"
          />
        </div>
        <div class="field">
          <label for="password" class="field__label">비밀번호</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="field__input"
            required
            minlength="6"
            autocomplete="new-password"
            placeholder="비밀번호를 입력하세요 (6자 이상)"
          />
        </div>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? '처리 중...' : '가입하기' }}
        </button>
      </form>
      <p class="auth-card__link">
        이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: #f5f6f8;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  padding: 2rem 1.5rem;
}

.auth-card__title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a2236;
  margin: 0 0 1.5rem;
  letter-spacing: -0.03em;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-msg {
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.field__input {
  padding: 0.7rem 0.875rem;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 0.9rem;
  background: #f8f9fc;
  color: #1a2236;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.field__input:focus {
  outline: none;
  border-color: #00b87a;
  background: #fff;
}

.field__input::placeholder {
  color: rgba(60, 60, 60, 0.35);
}

.btn-submit {
  margin-top: 0.5rem;
  padding: 0.8rem;
  background: #00b87a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.btn-submit:hover:not(:disabled) {
  background: #00a06a;
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.auth-card__link {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgba(60, 60, 60, 0.6);
}

.auth-card__link a {
  color: #00b87a;
  font-weight: 600;
  text-decoration: none;
}

.auth-card__link a:hover {
  text-decoration: underline;
}
</style>
