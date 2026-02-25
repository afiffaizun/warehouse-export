import type { User, UserRole, UserStatus } from '@/types/pengguna'

export const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'staff', label: 'Staff' },
  { value: 'warehouse', label: 'Warehouse' }
]

export const statusOptions: { value: UserStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'emerald' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'suspended', label: 'Suspended', color: 'red' }
]

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin Sistem',
    email: 'admin@exporthub.com',
    role: 'admin',
    status: 'active',
    phone: '+62 812 3456 7890',
    department: 'IT',
    lastLogin: '2024-02-20T09:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-20T09:30:00Z'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    email: 'budi@exporthub.com',
    role: 'manager',
    status: 'active',
    phone: '+62 812 3456 7891',
    department: 'Operations',
    lastLogin: '2024-02-19T14:22:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-02-19T14:22:00Z'
  },
  {
    id: 3,
    name: 'Siti Aminah',
    email: 'siti@exporthub.com',
    role: 'staff',
    status: 'active',
    phone: '+62 812 3456 7892',
    department: 'Sales',
    lastLogin: '2024-02-20T08:15:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-20T08:15:00Z'
  },
  {
    id: 4,
    name: 'Ahmad Wijaya',
    email: 'ahmad@exporthub.com',
    role: 'warehouse',
    status: 'active',
    phone: '+62 812 3456 7893',
    department: 'Warehouse',
    lastLogin: '2024-02-18T16:45:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-18T16:45:00Z'
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    email: 'dewi@exporthub.com',
    role: 'staff',
    status: 'active',
    phone: '+62 812 3456 7894',
    department: 'Finance',
    lastLogin: '2024-02-20T10:00:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z'
  },
  {
    id: 6,
    name: 'Rudi Hermawan',
    email: 'rudi@exporthub.com',
    role: 'warehouse',
    status: 'inactive',
    phone: '+62 812 3456 7895',
    department: 'Warehouse',
    lastLogin: '2024-02-01T09:00:00Z',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 7,
    name: 'Lisa Permata',
    email: 'lisa@exporthub.com',
    role: 'manager',
    status: 'active',
    phone: '+62 812 3456 7896',
    department: 'Marketing',
    lastLogin: '2024-02-19T11:30:00Z',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-19T11:30:00Z'
  },
  {
    id: 8,
    name: 'Doni Kusuma',
    email: 'doni@exporthub.com',
    role: 'staff',
    status: 'suspended',
    phone: '+62 812 3456 7897',
    department: 'Operations',
    lastLogin: '2024-01-28T14:00:00Z',
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  }
]

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(u => u.id === id)
}

export const getRoleInfo = (role: UserRole) => {
  const found = roleOptions.find(r => r.value === role)
  return found || { value: role, label: role }
}

export const getStatusInfo = (status: UserStatus) => {
  const found = statusOptions.find(s => s.value === status)
  return found || { value: status, label: status, color: 'gray' }
}

export const getTotalActiveUsers = (): number => {
  return mockUsers.filter(u => u.status === 'active').length
}

export const getTotalAdmins = (): number => {
  return mockUsers.filter(u => u.role === 'admin').length
}
