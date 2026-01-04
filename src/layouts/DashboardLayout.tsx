import { Navigate, Outlet } from "react-router"

import { LoaderCircle } from "lucide-react"
import { SideMenu } from "../components"
import { useAuthStore } from "../stores"

export const DashboardLayout = () => {
  const status = useAuthStore((state) => state.status)
  const checkStatus = useAuthStore((state) => state.checkStatus)

  if (status === "pending") {
    checkStatus()
    return (
      <div className='flex justify-center flex-col min-h-svh'>
        <LoaderCircle className='animate-spin w-96 h-96 mx-auto' />
        <h1 className='text-center'>Cargando...</h1>
      </div>
    )
  }

  if (status == "unauthenticated") return <Navigate to='/auth/login' />

  return (
    <div className='bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-row relative w-screen'>
        <SideMenu />

        <div className='w-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
