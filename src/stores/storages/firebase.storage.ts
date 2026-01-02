import { createJSONStorage, type StateStorage } from "zustand/middleware"

const firebaseUrl =
  "https://flutter-notifications-36d33-default-rtdb.firebaseio.com/zustand"

const getStorage = async (name: string): Promise<string | null> => {
  const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
    res.json()
  )
  return JSON.stringify(data)
}

const setStorage = async (name: string, value: string): Promise<void> => {
  await fetch(`${firebaseUrl}/${name}.json`, {
    method: "PUT",
    body: value,
  })
}

const removeStorage = async (name: string): Promise<void> => {
  await fetch(`${firebaseUrl}/${name}.json`, {
    method: "DELETE",
  })
}

const storageAPI: StateStorage = {
  getItem: getStorage,
  setItem: setStorage,
  removeItem: removeStorage,
}

export const firebaseStorage = createJSONStorage(() => storageAPI)
