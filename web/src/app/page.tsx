import { ThemeSwitch } from '@/components/theme-switch'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function Home() {
  return (
    <main className={'min-h-screen'}>
      <div className={'fixed top-4 right-4'}>
        <ThemeSwitch />
      </div>
      <div className={'container p-24 mx-auto'}>
        <div className={'grid grid-cols-3 gap-10'}>
          {[...new Array(12)].map((_, i) => (
            <AspectRatio className={'bg-secondary rounded-lg'} ratio={16 / 9} key={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
