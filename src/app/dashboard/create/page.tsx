'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createTask } from '@/service/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function Page() {
  const [loading, setLoading] = useState(false)
  const { data: session }: { data: any } = useSession()

  const [url, setUrl] = useState('')
  const [interval, setInterval] = useState(0)
  const [err, setErr] = useState('')

  const router = useRouter()

  const handleCreateTask = async () => {
    setLoading(true)
    if (!url || !interval) {
      return
    }
    try {
      const accessToken = session?.accessToken
      if (!accessToken) {
        router.push('/login')
      }
      const res = await createTask(url, interval, accessToken)
      if (res) {
        setUrl('')
        setInterval(0)
        toast('Task created successfully')
      }
    } catch (error: any) {
      setErr(error?.message)
      toast(error?.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#131a26] text-white min-h-screen flex justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Enter Task Details</h1>
        {
          err && (
            <div className="text-red-500">{err}</div>
          )
        }

        <div>
          <label className="block mb-1 text-sm">URL *</label>
          <Input
            value={url}
            required={true}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
          <p className="mt-1 text-sm text-gray-400">Entered URL: {url}</p>
        </div>

        <div>
          <label className="block mb-1 text-sm">Interval (minute) *</label>
          <Input
            type="number"
            value={interval}
            required={true}
            onChange={(e) => setInterval(Number(e.target.value))}
            placeholder="e.g., 5000"
          />
          <p className="mt-1 text-sm text-gray-400">Interval: {interval} minute</p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md  cursor-pointer"
          onClick={handleCreateTask}
          disabled={url && interval ? false : true}
        >
          {
            loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              'Create Task'
            )
          }
        </Button>
      </div>
    </div>
  )
}

export default Page
