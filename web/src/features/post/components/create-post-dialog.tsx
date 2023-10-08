'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FilePicker } from '@/features/file/components/file-picker'
import { cn } from '@/lib/utils'
import { FileCodeIcon } from 'lucide-react'
import { ReactElement } from 'react'

type Props = {
  trigger: ReactElement
}

export function CreatePostDialog(props: Props) {
  return (
    <Dialog>
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
            onChange={(v) => console.log(v)}
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
