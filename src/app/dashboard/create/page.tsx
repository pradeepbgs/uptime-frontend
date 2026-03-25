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
        toast('Task created successfully')
      }
    } catch (error: any) {
      setErr(error?.message)
      toast(error?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12 flex justify-center items-start md:items-center">
      <div className="w-full max-w-lg">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">New Monitor</h1>
          <p className="text-sm text-white/40 mt-1">Set up a URL to start monitoring</p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-xl p-6 space-y-5">

          {err && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {err}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm text-white/60">URL to monitor</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-white/40 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-white/60">Check interval</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={1}
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                placeholder="e.g. 120"
                className="flex-1 bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-white/40 focus:ring-0"
              />
              <Select value={unit} onValueChange={(val: any) => setUnit(val)}>
                <SelectTrigger className="w-[120px] bg-white/5 border-white/15 text-white">
                  <SelectValue placeholder="seconds" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/15 text-white">
                  <SelectItem value="seconds" className="focus:bg-white/10 focus:text-white">Seconds</SelectItem>
                  <SelectItem value="minutes" className="focus:bg-white/10 focus:text-white">Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-white/30">
              Every {unit === 'minutes' ? interval * 60 : interval} seconds
            </p>
          </div>

          <Button
            className="w-full bg-white text-black hover:bg-white/90 font-medium rounded-lg cursor-pointer transition-all duration-200 disabled:opacity-30"
            onClick={handleCreateTask}
            disabled={loading || !url || interval <= 0}
          >
            {loading ? <Spinner /> : 'Create Monitor'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
