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
  
  export function UpdateTaskModal({ trigger, task, onUpdate }: { trigger:React.ReactNode, task: Task, onUpdate: (taskId: string, updatedData: any) => void }) {
    const [url, setUrl] = useState(task.url)
    const [interval, setInterval] = useState(task.interval)
    const [max, setMax] = useState(task.max)
  
    const handleSubmit = () => {
      const updated = { url, interval, max }
      onUpdate(task?._id, updated)
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent className="bg-[#1f2937] text-white">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription className="text-white">Update your task&apos;s information below.</DialogDescription>
          </DialogHeader>
  
          <div className="flex flex-col gap-4 mt-4">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
            <Input type="number" value={interval} onChange={(e) => setInterval(Number(e.target.value))} placeholder="Interval" />
            <Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} placeholder="Max Failures" />
          </div>
  
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="secondary" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} className="cursor-pointer">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  