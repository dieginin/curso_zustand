import { devtools } from "zustand/middleware"
import { createPersonSlice, type PersonSlice } from "./person.slice"
import { create } from "zustand"
import { createGuestSlice, type GuestSlice } from "./guest.slice"
import { createDateSlice, type DateSlice } from "./date.slice"
import {
  createConfirmationSlice,
  type ConfirmationSlice,
} from "./confirmation.slice"

type WeddingSlice = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice

export const useWeddingBoundStore = create<WeddingSlice>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
)
