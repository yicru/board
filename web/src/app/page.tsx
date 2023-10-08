import { PageSkeleton } from '@/components/app/page-skeleton'
import { StickyNote } from '@/components/app/sticky-note'
import { Separator } from '@/components/ui/separator'
import { CreatePostDialog } from '@/features/post/components/create-post-dialog'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { FileIcon } from 'lucide-react'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()

  return (
    <div className={'space-y-10'}>
      {data.user && (
        <>
          <div>
            <p className={'text-xl font-medium'}>Hi, {data.user.user_metadata.user_name} 👋</p>
          </div>

          <div className={'grid grid-cols-1 gap-6 sm:grid-cols-2'}>
            <CreatePostDialog
              trigger={
                <StickyNote>
                  <div className={'relative p-6'}>
                    <FileIcon className={'h-5 w-5 text-zinc-600 dark:text-foreground'} />
                    <p className={'mt-3 font-medium text-zinc-600 dark:text-foreground'}>Start from a file</p>
                    <p
                      className={
                        'mt-0.5 line-clamp-4 text-sm leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-400'
                      }
                    >
                      Import content from a file to post notes on a board
                    </p>
                    <PageSkeleton className={'absolute -bottom-2 -right-2 -z-10 h-24 w-40'} />
                  </div>
                </StickyNote>
              }
            />
          </div>

          <Separator />
        </>
      )}

      <div className={'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
        {[...new Array(12)].map((_, i) => (
          <StickyNote key={`sticky-note-${i}`} withShine>
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
    </div>
  )
}
