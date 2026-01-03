import { devtools } from "zustand/middleware"
import { createPersonSlice, type PersonSlice } from "./person.slice"
import { create } from "zustand"

type WeddingSlice = PersonSlice

export const useWeddingBoundStore = create<WeddingSlice>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
  }))
)
