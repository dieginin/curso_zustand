import { create, type StateCreator } from "zustand"
import type { AuthStatus, Role, User } from "../../interfaces"
import { AuthService } from "../../services"
import { devtools, persist } from "zustand/middleware"

interface AuthState {
  status: AuthStatus
  token?: string
  user?: User

  login: (email: string, password: string) => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthenticated",
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    set({ status: "pending" })
    try {
      const { token, roles, ...data } = await AuthService.login(email, password)

      const user = { ...data, roles: roles as Role[] }
      set({ status: "authenticated", token, user })
    } catch {
      set({ status: "unauthenticated", token: undefined, user: undefined })
    }
  },
})

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-store" }))
)
