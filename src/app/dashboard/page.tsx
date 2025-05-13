'use client'

import { useAuth, User } from '@/store/useAuth'
import { useRouter } from 'next/navigation'
import { deleteTask, updateTask, useTasks } from '@/service/api'
import { Button } from '@/components/ui/button'
import { IoMdRefresh } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { DeleteConfirmationDialog } from '@/components/Alert'
import { UpdateTaskModal } from '@/components/UpdateModal'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

export interface Task {
  _id: string
  url: string
  isActive: boolean
  interval: number
  max: number
  createdAt: string
  updatedAt: string
}

function Dashboard() {
  const { data: session }: any = useSession()
  const user: User | null = useAuth((state) => state.user)
  const accessToken = useMemo(() => session?.accessToken as string, [session])
  const { isLoading, data, error, refetch } = useTasks(accessToken)
  const [spinning, setSpinning] = useState(false);
  const [adding, setAdding] = useState(false)

  const router = useRouter()

  if (isLoading) {
    return (
      <div className="bg-[#131a26] text-white min-h-screen flex items-center justify-center px-4">
        Loading...
      </div>
    )
  }

  // if (!accessToken) return null

  const handleDelete = async (taskId: string) => {
    await deleteTask(accessToken, taskId);
    await refetch()
  }

  const handleUpdate = async (taskId: string, updatedData: any) => {
    await updateTask(accessToken, taskId, updatedData);
    await refetch()
  }

  const goToCreateTaskPage = () => {
    if (!accessToken) return router.push("/login")
    router.push("/dashboard/create")
  }

  const handleRefresh = async () => {
    setSpinning(true)
    try {
      await refetch()
    } catch (error: any) {
      console.error("Refresh failed", error?.message)
    } finally {
      setTimeout(() => {
        setSpinning(false)
      }, 300);
    }
  }


  return (
    <div className="bg-[#131a26] text-white min-h-screen p-4">
      <div className='py-8'>
        <h1 className="text-2xl font-bold mb-4 md:text-3xl">Welcome, {user?.username || 'User'}!</h1>

        <Button
          onClick={goToCreateTaskPage}
          className="mb-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          + Create Task
        </Button>

        <Button
          onClick={handleRefresh}
          className="ml-10 cursor-pointer relative bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <IoMdRefresh
            size={20}
            className={`transition-transform duration-500 ${spinning ? 'animate-spin' : ''}`}
          />
        </Button>


        {error && <div className='text-red-500'>{error.message}</div>}

        <Table className='text-white'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] md:w-[200px] text-white">URL</TableHead>
              <TableHead className='md:table-cell text-white'>Status</TableHead>
              <TableHead className='md:table-cell text-white'>Interval (min)</TableHead>
              <TableHead className="text text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.tasks?.map((task: Task) => (
              <TableRow
                key={task._id}
                className="group hover:bg-[#1e293b] transition duration-150"
              >
                <TableCell className="font-medium truncate">
                  <Button 
                  className='mr-3 cursor-pointer'
                  onClick={() => {
                    setAdding(true)
                    handleUpdate(task?._id,{
                      ...task,
                      isActive:true
                    })
                    setTimeout(() => {
                      setAdding(false)
                    }, 300);
                  }}
                  >
                    {
                      adding
                        ? <p>...</p>
                        : <p>Re-add</p>
                    }
                  </Button>
                  {task.url}
                </TableCell>
                <TableCell className="md:table-cell">
                  {
                    task.isActive
                      ? <p className='text-green-400'>Active</p>
                      : <p className='text-red-400'>Inactive</p>
                  }
                  
                </TableCell>
                
                <TableCell className="md:table-cell">{task.interval}</TableCell>
                <TableCell className="">
                  <div className="flex justify gap-2 md:gap-4">
                    <UpdateTaskModal
                      task={task}
                      onUpdate={handleUpdate}
                      trigger={
                        <button className="p-2 rounded-md hover:bg-gray-700 cursor-pointer">
                          <FaPen size={20} />
                        </button>
                      }
                    />
                    <DeleteConfirmationDialog
                      onConfirm={() => handleDelete(task._id)}
                      trigger={
                        <button className="p-2 rounded-md hover:bg-red-700 cursor-pointer">
                          <MdDelete size={25} />
                        </button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard