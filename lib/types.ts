export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  created_at: string
}

export interface Habit {
  id: string
  user_id: string
  name: string
  icon: string
  color: string
  target_days: number[]
  created_at: string
}

export interface HabitLog {
  id: string
  habit_id: string
  user_id: string
  date: string
  completed: boolean
  created_at: string
}

export interface StudySession {
  id: string
  user_id: string
  subject: string
  duration_minutes: number
  date: string
  created_at: string
}

export interface HealthLog {
  id: string
  user_id: string
  date: string
  water_ml: number
  sleep_hours: number
  weight_kg?: number
  steps?: number
  created_at: string
}

export interface Routine {
  id: string
  user_id: string
  title: string
  time?: string
  days: number[]
  created_at: string
}

export interface ChecklistItem {
  id: string
  user_id: string
  routine_id?: string
  title: string
  completed: boolean
  date: string
  created_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  category: 'finance' | 'study' | 'health' | 'routine' | 'other'
  target_value: number
  current_value: number
  unit: string
  deadline?: string
  created_at: string
}

export type ModuleColor = 'finance' | 'study' | 'health' | 'routine'
