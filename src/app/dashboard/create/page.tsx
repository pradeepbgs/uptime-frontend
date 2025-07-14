'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createTask } from '@/service/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Spinner from '@/components/spinner'

function Page() {
  const [loading, setLoading] = useState(false)
  const { data: session }: { data: any } = useSession()

  const [url, setUrl] = useState('')
  const [interval, setInterval] = useState<number>(0)
  const [unit, setUnit] = useState<'seconds' | 'minutes'>('seconds')
  const [webhook, setWebhook] = useState('')
  const [err, setErr] = useState('')

  const router = useRouter()

  const handleCreateTask = async () => {
    setLoading(true)
    if (!url || interval <= 0) {
      toast('Please enter a valid URL and interval')
      setLoading(false)
      return
    }

    try {
      const accessToken = session?.accessToken
      if (!accessToken) {
        router.push('/login')
        return
      }

      const intervalInSeconds = unit === 'minutes' ? interval * 60 : interval

      const res = await createTask(url, intervalInSeconds, webhook, accessToken)
      if (res) {
        setUrl('')
        setInterval(0)
        setWebhook('')
        toast('✅ Task created successfully')
      }
    } catch (error: any) {
      setErr(error?.message)
      toast(error?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" min-h-screen px-4 py-12 flex justify-center items-center">
      <div className="w-full max-w-lg bg-[#1e293b] p-6 rounded-2xl shadow-lg space-y-3">
        <h1 className="text-2xl font-semibold text-center">Create a New Task</h1>

        {err && (
          <div className="bg-red-600/20 text-red-400 px-3 py-2 rounded">{err}</div>
        )}

        <div className="space-y-2">
          <label className="block text-sm ">URL to monitor</label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Interval *</label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={1}
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              placeholder="e.g., 120"
              className="flex-1"
            />
            <Select value={unit} onValueChange={(val: any) => setUnit(val)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="minutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seconds">Seconds</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-gray-400 text-sm">
            Final interval: {unit === 'minutes' ? interval * 60 : interval} seconds
          </p>
        </div>

        {/* <div className="space-y-2">
          <label className="block text-sm">Discord Webhook (optional)</label>
          <Input
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
            placeholder="https://discord-webhook.com"
          />
        </div> */}

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          onClick={handleCreateTask}
          disabled={loading || !url || interval <= 0}
        >
          {

            loading ? <Spinner />
              : 'Create Task'
          }
        </Button>
      </div>
    </div>
  )
}

export default Page
