'use client'

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

  if (isLoading) return <Spinner />

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
      <div className="md:py-3 py-12">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Monitors</h1>
            <p className="text-sm text-white/40 mt-0.5">
              {data?.tasks?.length ?? 0} task{data?.tasks?.length !== 1 ? 's' : ''} tracked
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/15 px-3 py-2 rounded-lg text-sm transition-all duration-200"
          >
            <IoMdRefresh
              size={16}
              className={`transition-transform duration-500 ${spinning ? 'animate-spin' : ''}`}
            />
          </Button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error.message}
          </div>
        )}

        <div className="rounded-xl border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/40 text-xs uppercase tracking-wider font-medium">URL</TableHead>
                <TableHead className="text-white/40 text-xs uppercase tracking-wider font-medium">Status</TableHead>
                <TableHead className="text-white/40 text-xs uppercase tracking-wider font-medium">Interval</TableHead>
                <TableHead className="text-white/40 text-xs uppercase tracking-wider font-medium">Latency</TableHead>
                <TableHead className="text-white/40 text-xs uppercase tracking-wider font-medium">Pings</TableHead>
                <TableHead className="text-white/40 text-xs uppercase tracking-wider font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.tasks?.length === 0 && (
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableCell colSpan={6} className="text-center text-white/30 py-12 text-sm">
                    No monitors yet. Create your first task.
                  </TableCell>
                </TableRow>
              )}
              {data?.tasks?.map((task: Task) => (
                <TableRow
                  key={task._id}
                  className="border-white/10 hover:bg-white/5 transition-colors duration-150"
                >
                  <TableCell className="font-medium text-white/80">
                    <div className="flex items-center gap-2">
                      <Button
                        className="h-7 w-7 p-0 bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 rounded cursor-pointer transition-all duration-200"
                        onClick={() => {
                          setAdding(true)
                          handleUpdate(task?._id, {
                            ...task,
                            isActive: true
                          })
                          setTimeout(() => setAdding(false), 300)
                        }}
                      >
                        {adding ? <span className="text-xs">…</span> : <IoMdRefresh size={13} />}
                      </Button>
                      <span className="truncate max-w-[200px] text-sm">{task.url}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                      task.isActive
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${task.isActive ? 'bg-green-400' : 'bg-white/30'}`} />
                      {task.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>

                  <TableCell className="text-white/60 text-sm">{task.interval}s</TableCell>
                  <TableCell className="text-white/60 text-sm">{task.lastLatency ? `${task.lastLatency}ms` : '—'}</TableCell>
                  <TableCell className="text-white/60 text-sm">{task.pingCount ?? 0}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <UpdateTaskModal
                        task={task}
                        onUpdate={handleUpdate}
                        trigger={
                          <button className="p-2 rounded-md text-white/40 hover:text-white hover:bg-white/10 cursor-pointer transition-all duration-200">
                            <FaPen size={13} />
                          </button>
                        }
                      />
                      <DeleteConfirmationDialog
                        onConfirm={() => handleDelete(task._id)}
                        trigger={
                          <button className="p-2 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-all duration-200">
                            <MdDelete size={17} />
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
    </div>
  )
}

export default Dashboard
