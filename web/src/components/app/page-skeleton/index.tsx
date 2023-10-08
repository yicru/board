import { AspectRatio } from '@/components/ui/aspect-ratio'
import { clsx } from 'clsx'

type Props = {
  className?: string
}

export function PageSkeleton({ className }: Props) {
  return (
    <div
      className={clsx(
        'rounded-tl-lg border border-zinc-300 bg-zinc-200 shadow dark:border-none dark:bg-zinc-900',
        className,
      )}
    >
      <div className={'flex gap-1 p-2'}>
        <div className={'h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700'} />
        <div className={'h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700'} />
        <div className={'h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700'} />
      </div>
      <div className={'mx-auto grid w-32 grid-cols-3 gap-1.5 p-4'}>
        <AspectRatio className={'rounded-sm bg-zinc-300 dark:bg-zinc-800'} ratio={4 / 3} />
        <AspectRatio className={'rounded-sm bg-zinc-300 dark:bg-zinc-800'} ratio={4 / 3} />
        <AspectRatio className={'rounded-sm bg-zinc-300 dark:bg-zinc-800'} ratio={4 / 3} />
        <AspectRatio className={'rounded-sm bg-zinc-300 dark:bg-zinc-800'} ratio={4 / 3} />
        <AspectRatio className={'rounded-sm bg-zinc-300 dark:bg-zinc-800'} ratio={4 / 3} />
      </div>
    </div>
  )
}
