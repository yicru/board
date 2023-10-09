import { sanitize } from '@/client/lib/sanitize'
import { cn } from '@/client/lib/utils'
import { Post } from '@prisma/client'

type Props = {
  className?: string
  post: Post
}

export function ArticlePost({ className, post }: Props) {
  return (
    <article
      className={cn('prose prose-sm prose-zinc dark:prose-invert', className)}
      dangerouslySetInnerHTML={{
        __html: sanitize(post.content),
      }}
    />
  )
}
