import { StickyNote } from '@/components/app/sticky-note'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()

  return (
    <div>
      <div className={'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
        {[...new Array(12)].map((_, i) => (
          <StickyNote key={`sticky-note-${i}`}>
            <div className={'p-4'}>{i}</div>
          </StickyNote>
        ))}
      </div>

      {data.user && (
        <div className={'fixed inset-x-0 bottom-0 grid place-content-center p-4'}>
          <p className={'text-xs font-medium'}>Hi, {data.user.user_metadata.user_name} 👋</p>
        </div>
      )}
    </div>
  )
}
