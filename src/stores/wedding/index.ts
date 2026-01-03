import { devtools } from "zustand/middleware"
import { createPersonSlice, type PersonSlice } from "./person.slice"
import { create } from "zustand"
import { createGuestSlice, type GuestSlice } from "./guest.slice"
import { createDateSlice, type DateSlice } from "./date.slice"

type WeddingSlice = PersonSlice & GuestSlice & DateSlice

export const useWeddingBoundStore = create<WeddingSlice>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
  }))
)
