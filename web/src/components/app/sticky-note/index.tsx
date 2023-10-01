import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

import styles from './sticky-note.module.css'

type Props = {
  children: ReactNode
}

export function StickyNote(props: Props) {
  return (
    <AspectRatio
      className={cn(
        'relative cursor-pointer rounded-lg border backdrop-blur-md transition',
        'hover:brightness-95 dark:hover:brightness-125',
        styles.wrapper,
      )}
      ratio={16 / 9}
    >
      <div className={cn('absolute right-0 top-0 h-px w-[50%]', styles.line)} />
      <div className={cn('absolute left-0 bottom-0 h-px w-[50%]', styles.line)} />
      <div>{props.children}</div>
    </AspectRatio>
  )
}
