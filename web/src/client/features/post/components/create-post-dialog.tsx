'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/client/components/ui/dialog'
import { useToast } from '@/client/components/ui/use-toast'
import { FilePicker } from '@/client/features/file/components/file-picker'
import { client } from '@/client/lib/client'
import { cn } from '@/client/lib/utils'
import { Board } from '@prisma/client'
import { FileCodeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactElement, useState } from 'react'

type Props = {
  board: Board
  trigger: ReactElement
}

export function CreatePostDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const onPickedFile = async (file: File) => {
    const result = await client.api.boards[':boardId'].posts.$post({
      form: { file },
      param: { boardId: props.board.uid },
    })

    if (!result.ok) {
      const error = await result.text()
      toast({
        description: error,
        title: 'Failed to create post',
      })
      return
    }

    setIsOpen(false)
    router.refresh()
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className={'glass'}>
        <DialogHeader>
          <DialogTitle className={'font-bold'}>Start from a file</DialogTitle>
        </DialogHeader>
        <div className={'pt-2'}>
          <FilePicker
            className={cn(
              'flex items-center gap-4 rounded-lg px-4 py-3 cursor-pointer',
              'bg-gradient-to-r from-pink-300/20 via-purple-300/20 to-indigo-400/20 border-2 border-dashed border-purple-300/50',
            )}
            onChange={onPickedFile}
          >
            <FileCodeIcon className={'h-6 w-6 text-purple-400 dark:text-purple-200'} />
            <div>
              <p className={'font-medium'}>markdown</p>
              <p className={'mt-1 text-xs text-zinc-600 dark:text-zinc-300'}>extension: .md,.mdx</p>
            </div>
          </FilePicker>
        </div>
      </DialogContent>
    </Dialog>
  )
}
