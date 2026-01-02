import { CircleCheckBig, Plus } from "lucide-react"
import type { Task, TaskStatus } from "../../interfaces"

import { useState, type DragEvent } from "react"
import { SingleTask } from "./SingleTask"
import classNames from "classnames"
import { useTaskStore } from "../../stores"
import Swal from "sweetalert2"

interface Props {
  title: string
  status: TaskStatus
  tasks: Task[]
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
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

  return (
    <div
      className={classNames(
        "text-black! border-4 border-dotted relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full p-4! 3xl:p-![18px]",
        {
          "border-transparent": !(isDragging || onDragOver),
          "border-blue-500": isDragging,
          "border-red-500": onDragOver,
        }
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropEvent}
    >
      {/* Task Header */}
      <div className='relative flex flex-row justify-between'>
        <div className='flex items-center justify-center'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100'>
            <span className='flex justify-center items-center h-6 w-6 text-brand-500'>
              <CircleCheckBig style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className='ml-4 text-xl font-bold text-navy-700'>{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <Plus />
        </button>
      </div>

      {/* Task Items */}
      <div className='h-full w-full'>
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
