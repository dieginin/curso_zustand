import { createJSONStorage, type StateStorage } from "zustand/middleware"

const getStorage = (name: string): string | Promise<string | null> | null => {
  return sessionStorage.getItem(name)
}

const setStorage = (name: string, value: string): void => {
  sessionStorage.setItem(name, value)
}

const removeStorage = (name: string): void => {
  sessionStorage.removeItem(name)
}

const storageAPI: StateStorage = {
  getItem: getStorage,
  setItem: setStorage,
  removeItem: removeStorage,
}

export const customStorage = createJSONStorage(() => storageAPI)
