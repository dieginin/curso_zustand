type Role = "user" | "admin" | "super"

export interface User {
  id: string
  email: string
  fullName: string
  isActive: boolean
  roles: Role[]
  token: string
}
