import { create, type StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeAPI: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
})

export const usePersonStore = create<PersonState & Actions>()(
  persist(devtools(storeAPI), {
    name: "person-storage",
    // storage: firebaseStorage,
  })
)
