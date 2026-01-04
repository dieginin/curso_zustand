import { create, type StateCreator } from "zustand"
import type { AuthStatus, Role, User } from "../../interfaces"
import { AuthService } from "../../services"
import { devtools, persist } from "zustand/middleware"

interface AuthState {
  status: AuthStatus
  token?: string
  user?: User

  login: (email: string, password: string) => Promise<void>
  checkStatus: () => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    try {
      const { token, roles, ...data } = await AuthService.login(email, password)

      const user = { ...data, roles: roles as Role[] }
      set({ status: "authenticated", token, user })
    } catch {
      set({ status: "unauthenticated", token: undefined, user: undefined })
      throw new Error("Unauthorized")
    }
  },
  checkStatus: async () => {
    try {
      const { token, roles, ...data } = await AuthService.checkStatus()
      const user = { ...data, roles: roles as Role[] }
      set({ status: "authenticated", token, user })
    } catch {
      set({ status: "unauthenticated", token: undefined, user: undefined })
      throw new Error("Unauthorized")
    }
  },
})

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-store" }))
)
