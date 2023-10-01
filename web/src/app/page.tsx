import { StickyNote } from '@/components/app/sticky-note'

export default function Home() {
  return (
    <div className={'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
      {[...new Array(12)].map((_, i) => (
        <StickyNote key={`sticky-note-${i}`}>
          <div className={'p-4'}>{i}</div>
        </StickyNote>
      ))}
    </div>
  )
}
