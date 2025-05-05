'use client'

import { useAuth, User } from '@/store/useAuth'
import { useRouter } from 'next/navigation'
import { useTasks } from '@/service/api'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from 'next-auth/react'

interface Task {
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

  const accessToken = session?.accessToken as string
  const { isLoading, data, error } = useTasks(accessToken)
  const router = useRouter()

  if (!accessToken) {
    router.push('/login')
    return null
  }

  if (isLoading) {
    return (
      <div className="bg-[#131a26] text-white min-h-screen flex items-center justify-center px-4">
        Loading...
      </div>
    )
  }

  return (
    <div className="bg-[#131a26] text-white min-h-screen px-4">
      <div className='py-10 px-10'>
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>

        <Button
          onClick={() => router.push("/dashboard/create")}
          className="mb-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          + Create Task
        </Button>
        {
          error && <div className='text-red-500'>{error.message}</div>
        }
        <Table className='text-white'>
          <TableCaption>A list of your uptime tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-white">URL</TableHead>
              <TableHead className='text-white'>Status</TableHead>
              <TableHead className='text-white'>Interval (min)</TableHead>
              <TableHead className="text-white">Max Failures</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.tasks?.map((task: Task) => (
              <TableRow
                onClick={() => router.push(`/dashboard/bot/${task._id}`)}
                key={task._id}
                className='cursor-pointer'
              >
                <TableCell className="font-medium">{task.url}</TableCell>
                <TableCell>{task.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{task.interval}</TableCell>
                <TableCell className="">{task.max}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard
