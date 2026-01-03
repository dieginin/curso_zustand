import type { StateCreator } from "zustand"

export interface DateSlice {
  eventDate: Date

  getEventDate: () => string
  getEventTime: () => string

  setEventDate: (eventDate: string) => void
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),

  getEventDate: () =>
    `${get().eventDate.getFullYear()}-${(get().eventDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${get()
      .eventDate.getDate()
      .toString()
      .padStart(2, "0")}`,
  getEventTime: () =>
    `${get().eventDate.getHours().toString().padStart(2, "0")}:${get()
      .eventDate.getMinutes()
      .toString()
      .padStart(2, "0")}`,

  setEventDate: (eventDate: string) => {
    const [year, month, day] = eventDate.split("-").map(Number)
    const date = new Date(get().eventDate)

    date.setFullYear(year, month - 1, day)

    console.log({ date })
    console.log({ year, month, day })
    set({ eventDate: date })
  },
})
