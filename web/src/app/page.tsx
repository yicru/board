import { StickyNote } from '@/components/app/sticky-note'
import { Separator } from '@/components/ui/separator'
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
            <div className={'p-4'}>
              <p className={'text-zinc-600 dark:text-foreground'}>Lorem ipsum</p>
              <Separator className={'my-2 dark:bg-zinc-700'} />
              <p className={'line-clamp-4 text-sm leading-relaxed tracking-wide text-zinc-400'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Netus et malesuada fames ac turpis egestas maecenas pharetra. Consequat ac felis
                donec et odio. Nulla facilisi cras fermentum odio eu. Sit amet mauris commodo quis imperdiet massa.
                Laoreet id donec ultrices tincidunt arcu non. Egestas pretium aenean pharetra magna ac placerat
                vestibulum. Ornare massa eget egestas purus viverra accumsan in. Euismod nisi porta lorem mollis aliquam
                ut porttitor leo a. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. A diam maecenas sed
                enim ut. Neque sodales ut etiam sit amet nisl. Tellus cras adipiscing enim eu turpis egestas pretium
                aenean pharetra. Ornare arcu odio ut sem nulla pharetra. Cursus sit amet dictum sit amet justo donec
                enim diam. Pulvinar sapien et ligula ullamcorper malesuada. Fermentum odio eu feugiat pretium nibh ipsum
                consequat nisl vel. Fringilla est ullamcorper eget nulla facilisi etiam.
              </p>
            </div>
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
