import { apiClient } from './client'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  userName: string
  password: string
}

export interface AuthResponse {
  token: string
  email: string
  userName: string
  expiresAt: string
}

export const authApi = {
  login(data: LoginRequest) {
    return apiClient.post<AuthResponse>('/api/auth/login', data)
  },
  register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>('/api/auth/register', data)
  },
  me() {
    return apiClient.get<{ userId: string; email: string; userName: string }>('/api/auth/me')
  },
}
