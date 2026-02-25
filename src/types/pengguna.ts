export type UserRole = 'admin' | 'manager' | 'staff' | 'warehouse'

export type UserStatus = 'active' | 'inactive' | 'suspended'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  phone?: string
  department?: string
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface UserFormData {
  name: string
  email: string
  role: UserRole
  status: UserStatus
  phone?: string
  department?: string
  password?: string
}
