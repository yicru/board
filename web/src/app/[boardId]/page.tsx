import { PageSkeleton } from '@/client/components/app/page-skeleton'
import { StickyNote } from '@/client/components/app/sticky-note'
import { CreatePostDialog } from '@/client/features/post/components/create-post-dialog'
import { sanitize } from '@/client/lib/sanitize'
import { createServerComponentClient } from '@/client/lib/sc-client'
import { convert } from 'html-to-text'
import { FileIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Home({ params }: { params: { boardId: string } }) {
  const client = createServerComponentClient()

  const { data: board, isOwner } = await client.api.boards[':boardId']
    .$get({
      param: { boardId: params.boardId },
    })
    .then((res) => res.json())

  const { data: posts } = await client.api.boards[':boardId'].posts
    .$get({
      param: { boardId: params.boardId },
    })
    .then((res) => res.json())

  if (!board) {
    return notFound()
  }

  return (
    <div className={'space-y-10'}>
      {isOwner && (
        <div className={'grid grid-cols-1 gap-6 border-b pb-10 sm:grid-cols-2'}>
          <CreatePostDialog
            board={board}
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
      )}

      <div className={'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
        {posts.map((post) => (
          <Link href={`/${params.boardId}/${post.id}`} key={post.id}>
            <StickyNote withShine>
              <div className={'min-h-[147px] p-4'}>
                {post.title && (
                  <p
                    className={
                      'mb-2 border-b pb-2 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-foreground'
                    }
                  >
                    {post.title}
                  </p>
                )}
                <p className={'line-clamp-4 text-xs leading-relaxed tracking-wide text-zinc-400'}>
                  {post.summary ? post.summary : convert(sanitize(post.content))}
                </p>
              </div>
            </StickyNote>
          </Link>
        ))}
      </div>
    </div>
  )
}
