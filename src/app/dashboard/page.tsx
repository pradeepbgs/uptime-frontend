'use client'

import { useAuth, User } from '@/store/useAuth'
import { useRouter } from 'next/navigation'
import { deleteTask, updateTask, useTasks } from '@/service/api'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { DeleteConfirmationDialog } from '@/components/Alert'
import { UpdateTaskModal } from '@/components/UpdateModal'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import {mutate} from 'swr'

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
  const { isLoading, data, error } = useTasks(accessToken)
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="bg-[#131a26] text-white min-h-screen flex items-center justify-center px-4">
        Loading...
      </div>
    )
  }

  if (!accessToken) return null

  const handleDelete = async (taskId: string) => {
    await deleteTask(accessToken, taskId);
    mutate(['/api/tasks', accessToken])
  }

  const handleUpdate = async (taskId: string, updatedData: any) => {
    updateTask(accessToken, taskId, updatedData);
    mutate(['/api/tasks', accessToken])
  }


  return (
    <div className="bg-[#131a26] text-white min-h-screen p-4">
      <div className='py-8'>
        <h1 className="text-2xl font-bold mb-4 md:text-3xl">Welcome, {user?.username || 'User'}!</h1>

        <Button
          onClick={() => router.push("/dashboard/create")}
          className="mb-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          + Create Task
        </Button>

        {error && <div className='text-red-500'>{error.message}</div>}

        <Table className='text-white'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] md:w-[200px] text-white">URL</TableHead>
              <TableHead className='hidden md:table-cell text-white'>Status</TableHead>
              <TableHead className='hidden md:table-cell text-white'>Interval (min)</TableHead>
              <TableHead className="text text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.tasks?.map((task: Task) => (
              <TableRow
                key={task._id}
                className="group hover:bg-[#1e293b] transition duration-150 cursor-pointer"
              >
                <TableCell className="font-medium truncate">{task.url}</TableCell>
                <TableCell className="hidden md:table-cell">{task.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell className="hidden md:table-cell">{task.interval}</TableCell>
                <TableCell className="">
                  <div className="flex justify-end gap-2 md:gap-4">
                    <UpdateTaskModal
                      task={task}
                      onUpdate={handleUpdate}
                      trigger={
                        <button className="p-2 rounded-md hover:bg-gray-700">
                          <FaPen size={20} />
                        </button>
                      }
                    />
                    <DeleteConfirmationDialog
                      onConfirm={() => handleDelete(task._id)}
                      trigger={
                        <button className="p-2 rounded-md hover:bg-red-700">
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