import { useState, type DragEvent } from "react"
import Swal from "sweetalert2"
import { useTaskStore } from "../stores"
import type { TaskStatus } from "../interfaces"

interface Options {
  status: TaskStatus
}

export const useTask = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId)
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop)
  const addTask = useTaskStore((state) => state.addTask)

  const [onDragOver, setOnDragOver] = useState(false)

  const handleAddTask = async () => {
    const { value, isConfirmed } = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (status) => {
        if (!status) return "Debe de ingresar un nombre para la tarea"
      },
    })
    if (isConfirmed) {
      addTask(value, status)
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
  }

  const handleDropEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
    onTaskDrop(status)
  }

  return {
    isDragging,
    onDragOver,

    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDropEvent,
  }
}
