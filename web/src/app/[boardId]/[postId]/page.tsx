import { Separator } from '@/client/components/ui/separator'
import { ArticlePost } from '@/client/features/post/components/article-post'
import UpdatePostMetaForm from '@/client/features/post/components/update-post-meta-form'
import { createServerComponentClient } from '@/client/lib/sc-client'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { boardId: string; postId: string } }) {
  const client = createServerComponentClient()

  const { data: board, isOwner } = await client.api.boards[':boardId']
    .$get({
      param: { boardId: params.boardId },
    })
    .then((res) => res.json())

  const { data: post } = await client.api.boards[':boardId'].posts[':postId']
    .$get({
      param: { boardId: params.boardId, postId: params.postId },
    })
    .then((res) => res.json())

  if (!board || !post) {
    return notFound()
  }

  return (
    <div className={'grid items-start gap-10 md:grid-cols-[192px,1fr,192px]'}>
      <div className={'sticky md:top-24'}>
        <Link className={'flex items-center gap-2'} href={`/${params.boardId}`}>
          <ChevronLeftIcon className={'h-4 w-4'} />
          <span className={'text-sm font-medium'}>Back to board</span>
        </Link>
      </div>
      <div className={'space-y-10'}>
        {isOwner && (
          <>
            <UpdatePostMetaForm board={board} key={post.updatedAt.toString()} post={post} />
            <Separator />
          </>
        )}
        <ArticlePost post={post} />
      </div>
    </div>
  )
}
