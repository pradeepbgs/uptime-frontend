'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Task } from "@/app/dashboard/page"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function UpdateTaskModal({
  trigger, task, onUpdate
}: {
  trigger: React.ReactNode,
  task: Task,
  onUpdate: (taskId: string, updatedData: any) => void
}) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(task.url)

  const initialUnit = task.interval % 60 === 0 ? 'minutes' : 'seconds'
  const [unit, setUnit] = useState<'seconds' | 'minutes'>(initialUnit)

  const [interval, setInterval] = useState(() =>
    initialUnit === 'minutes' ? task.interval / 60 : task.interval
  )

  const [isActive, setIsActive] = useState(task.isActive)

  const handleSubmit = async () => {
    try {
      const intervalInSeconds = unit === 'minutes' ? interval * 60 : interval
      const updated = {
        url,
        interval: intervalInSeconds,
        isActive,
      }

      await onUpdate(task._id, updated)
      setOpen(false)
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-[#111111] border border-white/15 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Monitor</DialogTitle>
          <DialogDescription className="text-white/40 text-sm">
            Update your monitor settings below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-white/40"
          />

          <div className="flex gap-2">
            <Input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              placeholder="Interval"
              className="flex-1 bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-white/40"
              min={unit === 'seconds' ? 30 : 1}
            />
            <Select value={unit} onValueChange={(val: any) => setUnit(val)}>
              <SelectTrigger className="w-[130px] bg-white/5 border-white/15 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-white/15 text-white">
                <SelectItem value="seconds" className="focus:bg-white/10 focus:text-white">Seconds</SelectItem>
                <SelectItem value="minutes" className="focus:bg-white/10 focus:text-white">Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select
            value={isActive ? "active" : "inactive"}
            onValueChange={(value) => setIsActive(value === "active")}
          >
            <SelectTrigger className="bg-white/5 border-white/15 text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-white/15 text-white">
              <SelectItem value="active" className="focus:bg-white/10 focus:text-white">Active</SelectItem>
              <SelectItem value="inactive" className="focus:bg-white/10 focus:text-white">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-white text-black hover:bg-white/90 cursor-pointer font-medium"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
