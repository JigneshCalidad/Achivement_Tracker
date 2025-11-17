import axios from 'axios'
import { User, Achievement, Todo, DayView } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ access_token: string; token_type: string }>('/api/auth/login', {
      email,
      password,
    }),
}

// User API
export const userApi = {
  getMe: () => api.get<User>('/api/user/me'),
  updateMe: (data: Partial<User>) => api.patch<User>('/api/user/me', data),
}

// Days API
export const daysApi = {
  getDay: (date: string) => api.get<DayView>(`/api/days/${date}`),
}

// Achievements API
export const achievementsApi = {
  create: (date: string, data: { title: string; notes?: string }) =>
    api.post<Achievement>(`/api/achievements/${date}`, { ...data, completed: false }),
  update: (id: number, data: Partial<Achievement>) =>
    api.patch<Achievement>(`/api/achievements/${id}`, data),
  delete: (id: number) => api.delete(`/api/achievements/${id}`),
}

// Todos API
export const todosApi = {
  create: (date: string, data: { title: string; notes?: string; priority?: string; due_time?: string }) =>
    api.post<Todo>(`/api/todos/${date}`, { ...data, completed: false }),
  update: (id: number, data: Partial<Todo>) =>
    api.patch<Todo>(`/api/todos/${id}`, data),
  delete: (id: number) => api.delete(`/api/todos/${id}`),
}

