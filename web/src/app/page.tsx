import { ThemeSwitch } from '@/components/theme-switch'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function Home() {
  return (
    <main className={'min-h-screen'}>
      <div className={'fixed right-4 top-4'}>
        <ThemeSwitch />
      </div>
      <div className={'container mx-auto p-24'}>
        <div className={'grid grid-cols-3 gap-10'}>
          {[...new Array(12)].map((_, i) => (
            <AspectRatio className={'rounded-lg bg-secondary'} key={i} ratio={16 / 9} />
          ))}
        </div>
      </div>
    </main>
  )
}
