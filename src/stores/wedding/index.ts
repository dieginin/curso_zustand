import { createPersonSlice, type PersonSlice } from "./person.slice"
import { create } from "zustand"

type WeddingSlice = PersonSlice

export const useWeddingBoundStore = create<WeddingSlice>()((...a) => ({
  ...createPersonSlice(...a),
}))
