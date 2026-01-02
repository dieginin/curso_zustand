import { create, type StateCreator } from "zustand"
import type { Task, TaskStatus } from "../../interfaces"
import { devtools, persist } from "zustand/middleware"
import { v4 as uuidV4 } from "uuid"
// import { produce } from "immer"
import { immer } from "zustand/middleware/immer"

interface TaskState {
  draggingTaskId?: string
  tasks: Record<string, Task>

  getTaskByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, status: TaskStatus) => void
  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
    "ABC-5": { id: "ABC-5", title: "Task 5", status: "done" },
  },

  getTaskByStatus: (status: TaskStatus) =>
    Object.values(get().tasks).filter((task) => task.status === status),
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidV4(), title, status }
    set((state) => {
      state.tasks[newTask.id] = newTask
      return state
    })

    // ? Forma nativa
    // set({ tasks: { ...get().tasks, [newTask.id]: newTask } })
    // ? Esto requiere npm install immer
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask
    //   })
    // )
  },
  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    set((state) => {
      state.tasks[taskId].status = status
      return state
    })

    // ? Forma nativa
    // const task = get().tasks[taskId]
    // task.status = status
    // set({ tasks: { ...get().tasks, [taskId]: task } })
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId
    if (!taskId) return

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  },
})

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: "task-store" }))
)
