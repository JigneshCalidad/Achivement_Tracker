export interface User {
  id: number
  email: string
  display_name: string
  avatar_url: string | null
  quote: string | null
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: number
  user_id: number
  title: string
  notes: string | null
  date: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface Todo {
  id: number
  user_id: number
  title: string
  notes: string | null
  date: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  due_time: string | null
  created_at: string
  updated_at: string
}

export interface DayView {
  date: string
  achievements: Achievement[]
  todos: Todo[]
}

