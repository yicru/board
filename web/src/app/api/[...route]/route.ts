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
    '/boards/:id',
    zValidator(
      'param',
      z.object({
        id: z.string().min(1),
      }),
    ),
    async (c) => {
      const authUser = await getAuthUser()
      const param = c.req.valid('param')

      const board = await prisma.board.findUnique({
        include: {
          posts: true,
        },
        where: {
          uid: param.id,
        },
      })

      return c.jsonT({
        data: board,
        isOwner: board && authUser && board.userId === authUser.id,
      })
    },
  )
  .get(
    '/boards/:id/posts',
    zValidator(
      'param',
      z.object({
        id: z.string().min(1),
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
            uid: param.id,
          },
        },
      })

      return c.jsonT({
        data: posts,
      })
    },
  )
  .post(
    '/boards/:id/posts',
    zValidator(
      'param',
      z.object({
        id: z.string().min(1),
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
          uid: param.id,
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

const fetch = app.fetch

export { fetch as GET, fetch as PUT, fetch as POST, fetch as DELETE }

export type AppType = typeof route
