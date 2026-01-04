export type Role = "user" | "admin" | "super"

export interface User {
  email: string
  fullName: string
  id: string
  isActive: boolean
  roles: Role[]
}
