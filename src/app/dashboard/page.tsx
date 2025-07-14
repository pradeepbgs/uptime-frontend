'use client'

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
import Spinner from '@/components/spinner'

export interface Task {
  _id: string
  url: string
  isActive: boolean
  interval: number
  max: number
  createdAt: string
  updatedAt: string
  lastLatency?: number
  pingCount?: number
}

function Dashboard() {
  const { data: session }: any = useSession()

  const accessToken = useMemo(() => session?.accessToken as string, [session])
  const { isLoading, data, error, refetch } = useTasks(accessToken)
  const [spinning, setSpinning] = useState(false);
  const [adding, setAdding] = useState(false)
  const router = useRouter()

  if (isLoading) return <Spinner />

  // if (!accessToken) return null

  const handleDelete = async (taskId: string) => {
    await deleteTask(accessToken, taskId);
    await refetch()
  }

  const handleUpdate = async (taskId: string, updatedData: any) => {
    await updateTask(accessToken, taskId, updatedData);
    await refetch()
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
    <div className="min-h-screen">
      <div className='md:py-3 py-15'>
        {/* <h1 className="text-2xl font-bold mb-4 md:text-3xl">Welcome {session.user.name || 'User'}</h1> */}

          <Button
            onClick={handleRefresh}
            className=" cursor-pointer relative bg-indigo-600 hover:bg-indigo-700 text-white"
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
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Interval (seconds)</TableHead>
              <TableHead className="text-white">Latency (ms)</TableHead>
              <TableHead className="text-white">Ping Count</TableHead>
              <TableHead className="text-white">Actions</TableHead>
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
                      handleUpdate(task?._id, {
                        ...task,
                        isActive: true
                      })
                      setTimeout(() => setAdding(false), 300)
                    }}
                  >
                    {adding ? <p>...</p> : <IoMdRefresh
                      size={17}
                      className={`transition-transform duration-500 ${spinning ? 'animate-spin' : ''}`}
                    />}
                  </Button>
                  {task.url}
                </TableCell>

                <TableCell>
                  {task.isActive
                    ? <p className='text-green-400'>Active</p>
                    : <p className='text-red-400'>Inactive</p>
                  }
                </TableCell>

                <TableCell>{task.interval}</TableCell>
                <TableCell>{task.lastLatency ?? '-'}</TableCell>
                <TableCell>{task.pingCount ?? 0}</TableCell>

                <TableCell>
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