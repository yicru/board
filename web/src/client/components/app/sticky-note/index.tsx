import { cn } from '@/client/lib/utils'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  withShine?: boolean
}

export function StickyNote(props: Props) {
  const { children, className, withShine } = props

  return (
    <div
      className={cn(
        'rounded-lg border transition overflow-hidden',
        'hover:brightness-95 dark:hover:brightness-125',
        'glass',
        {
          'with-glass-shine': withShine,
        },
        className,
      )}
    >
      <div>{children}</div>
    </div>
  )
}
