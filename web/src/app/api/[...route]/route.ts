import { getAuthUser } from '@/server/functions/get-auth-user'
import { prisma } from '@/server/lib/prisma'
import { env } from '@/shared/lib/env'
import { zValidator } from '@hono/zod-validator'
import { createClient } from '@supabase/supabase-js'
import { Hono } from 'hono'
import { marked } from 'marked'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { match } from 'ts-pattern'
import { z } from 'zod'

const app = new Hono().basePath('/api')

const route = app
  .get('/hello', async (c) => {
    return c.jsonT({
      data: 'Hello World',
    })
  })
  .get('/me', async (c) => {
    const authUser = await getAuthUser()
    return c.jsonT({
      data: authUser,
    })
  })
  .get(
    '/boards/:boardId',
    zValidator(
      'param',
      z.object({
        boardId: z.string().min(1),
      }),
    ),
    async (c) => {
      const authUser = await getAuthUser()
      const param = c.req.valid('param')

      const board = await prisma.board.findUnique({
        where: {
          uid: param.boardId,
        },
      })

      return c.jsonT({
        data: board,
        isOwner: board && authUser && board.userId === authUser.id,
      })
    },
  )
  .get(
    '/boards/:boardId/posts',
    zValidator(
      'param',
      z.object({
        boardId: z.string().min(1),
      }),
    ),
    async (c) => {
      const param = c.req.valid('param')

      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          board: {
            uid: param.boardId,
          },
        },
      })

      return c.jsonT({
        data: posts,
      })
    },
  )
  .post(
    '/boards/:boardId/posts',
    zValidator(
      'param',
      z.object({
        boardId: z.string().min(1),
      }),
    ),
    zValidator(
      'form',
      z.object({
        file: z.custom<File>(),
      }),
    ),
    async (c) => {
      const param = c.req.valid('param')
      const form = c.req.valid('form')

      const board = await prisma.board.findUniqueOrThrow({
        where: {
          uid: param.boardId,
        },
      })

      const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

      const { data: bucket } = await supabase.storage.getBucket(board.uid)
      if (!bucket) {
        await supabase.storage.createBucket(board.uid, {
          public: true,
        })
      }

      const extension = path.extname(form.file.name)
      const fileName = `${randomUUID()}${extension}`
      const body = await form.file.text()

      const content = match(extension)
        .with('.md', () => marked(body))
        .run()

      const upploadResult = await supabase.storage.from(board.uid).upload(`public/${fileName}`, form.file)

      if (upploadResult.error) {
        throw upploadResult.error
      }

      const upload = await prisma.upload.create({
        data: {
          boardId: board.id,
          name: fileName,
          path: upploadResult.data.path,
          post: {
            create: {
              boardId: board.id,
              content: content,
              summary: '',
              title: '',
            },
          },
        },
        include: {
          post: true,
        },
      })

      return c.jsonT({
        data: upload.post,
      })
    },
  )
  .get(
    '/boards/:boardId/posts/:postId',
    zValidator(
      'param',
      z.object({
        boardId: z.string().min(1),
        postId: z.string().min(1),
      }),
    ),
    async (c) => {
      const param = c.req.valid('param')

      const board = await prisma.board.findFirst({
        where: {
          uid: param.boardId,
        },
      })

      const post = await prisma.post.findFirst({
        where: {
          boardId: board?.id,
          id: param.postId,
        },
      })

      return c.jsonT({
        data: post,
      })
    },
  )
  .post(
    '/boards/:boardId/posts/:postId/meta',
    zValidator(
      'param',
      z.object({
        boardId: z.string().min(1),
        postId: z.string().min(1),
      }),
    ),
    zValidator(
      'json',
      z.object({
        summary: z.string(),
        title: z.string(),
      }),
    ),
    async (c) => {
      const param = c.req.valid('param')
      const json = c.req.valid('json')

      const board = await prisma.board.findUniqueOrThrow({
        where: {
          uid: param.boardId,
        },
      })

      const post = await prisma.post.update({
        data: {
          summary: json.summary,
          title: json.title,
        },
        where: {
          boardId: board.id,
          id: param.postId,
        },
      })

      return c.jsonT({
        data: post,
      })
    },
  )

const fetch = app.fetch

export { fetch as GET, fetch as PUT, fetch as POST, fetch as DELETE }

export type AppType = typeof route
