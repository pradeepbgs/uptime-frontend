"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type DeleteDialogProps = {
  onConfirm: () => void
  trigger: React.ReactNode
}

export const DeleteConfirmationDialog = ({ onConfirm, trigger }: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#111111] border border-white/15 text-white shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete monitor?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/40">
            This action cannot be undone. The task will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="bg-white/10 hover:bg-white/20 text-white border-white/15 cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
