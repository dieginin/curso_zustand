import { Accessibility, Heart, Info, List, Lock, PawPrint } from "lucide-react"
import { RequestInfo, WhiteCard } from "../../components"
import {
  useAuthStore,
  useBearStore,
  usePersonStore,
  useTaskStore,
} from "../../stores"

export const Dashboard = () => {
  const totalBears = useBearStore((state) => state.totalBears)
  const firstName = usePersonStore((state) => state.firstName)
  const tasksLength = useTaskStore((state) => Object.keys(state.tasks).length)
  const user = useAuthStore((state) => state.user)

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <WhiteCard centered>
          <PawPrint size={50} className='text-indigo-600' />
          <h2>Osos</h2>
          <p>{totalBears()}</p>
        </WhiteCard>

        <WhiteCard centered>
          <Accessibility size={50} className='text-indigo-600' />
          <h2>Persona</h2>
          <p>{firstName}</p>
        </WhiteCard>

        <WhiteCard centered>
          <List size={50} className='text-indigo-600' />
          <h2>Tareas</h2>
          <p>{tasksLength}</p>
        </WhiteCard>

        <WhiteCard centered>
          <Heart size={50} className='text-indigo-600' />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <Lock size={50} className='text-indigo-600' />
          <h2>Auth</h2>
          <p>{user?.fullName}</p>
        </WhiteCard>

        <WhiteCard className='col-span-3' centered>
          <Info size={50} className='text-indigo-600' />
          <RequestInfo />
        </WhiteCard>
      </div>
    </>
  )
}
