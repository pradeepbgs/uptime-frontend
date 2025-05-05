'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createTask } from '@/service/api'
import {  useSession } from 'next-auth/react'
import React, { useState } from 'react'

function Page() {
  const { data: session }:{data:any} = useSession()

  const [url, setUrl] = useState('')
  const [interval, setInterval] = useState(0)
  const [err, setErr] = useState('')

  const handleCreateTask = async () => {
    if(!url || !interval){
      return
    }
    try {
    const accessToken = session?.accessToken
    if (!accessToken) {
      alert('Please login first')
    }
      await createTask(url, interval, accessToken)
    } catch (error:any) {
      setErr(error?.message)
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
          disabled = { url && interval ? false : true}
        >
          Create Task
        </Button>
      </div>
    </div>
  )
}

export default Page
