import { create, type StateCreator } from "zustand"
import type { AuthStatus, User } from "../../interfaces"

interface AuthState {
  status: AuthStatus
  token?: string
  user?: User
}

const storeApi: StateCreator<AuthState> = () => ({
  status: "unauthenticated",
  token: undefined,
  user: undefined,
})

export const useAuthStore = create<AuthState>()(storeApi)
