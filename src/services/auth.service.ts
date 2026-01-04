import { AxiosError } from "axios"
import type { LoginResponse } from "../interfaces"
import { tesloApi } from "../apis"

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const resp = await tesloApi.post("/auth/login", { email, password })

      console.log(resp.data)
      return resp.data
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data)
      throw new Error("Unable to login")
    }
  }
}
