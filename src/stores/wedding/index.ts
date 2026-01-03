import { devtools } from "zustand/middleware"
import { createPersonSlice, type PersonSlice } from "./person.slice"
import { create } from "zustand"
import { createGuestSlice, type GuestSlice } from "./guest.slice"

type WeddingSlice = PersonSlice & GuestSlice

export const useWeddingBoundStore = create<WeddingSlice>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
  }))
)
