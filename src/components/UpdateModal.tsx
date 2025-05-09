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
  const [interval, setInterval] = useState(task.interval)
  const [isActive, setIsActive] = useState(task.isActive);

  const handleSubmit = async () => {
    try {
      const updated = { url, interval, isActive };
      await onUpdate(task?._id, updated)
      setOpen(false)
    } catch (error:any) {
      console.log(error?.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Select value={isActive ? "active" : "inactive"} onValueChange={(value) => setIsActive(value === "active")}>
            <SelectTrigger className="bg-gray-800 border border-gray-600 text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
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
