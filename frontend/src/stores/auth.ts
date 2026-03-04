import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const savedUser = localStorage.getItem(USER_KEY)
  const user = ref<{ email: string; userName: string } | null>(
    savedUser ? JSON.parse(savedUser) : null
  )

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(res: { token: string; email: string; userName: string }) {
    token.value = res.token
    user.value = { email: res.email, userName: res.userName }
    localStorage.setItem(TOKEN_KEY, res.token)
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  async function login(email: string, password: string) {
    const { data } = await authApi.login({ email, password })
    setAuth(data)
    return data
  }

  async function register(email: string, userName: string, password: string) {
    const { data } = await authApi.register({ email, userName, password })
    setAuth(data)
    return data
  }

  async function fetchMe() {
    const { data } = await authApi.me()
    user.value = { email: data.email, userName: data.userName }
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    return data
  }

  function logout() {
    clearAuth()
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    fetchMe,
    logout,
  }
})
