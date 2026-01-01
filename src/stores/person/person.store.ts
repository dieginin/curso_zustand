import { create, type StateCreator } from "zustand"
import type { StateStorage } from "zustand/middleware"
import { createJSONStorage, persist } from "zustand/middleware"

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

type PersonStoreState = PersonState & Actions

const storeAPI: StateCreator<PersonStoreState> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),
})

const sessionStorage: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    console.log("getItem", name)
    return null
  },
  setItem: function (name: string, value: string): void | Promise<void> {
    console.log("setItem", name, value)
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", name)
  },
}

export const usePersonStore = create<PersonStoreState>()(
  persist(storeAPI, {
    name: "person-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
)
