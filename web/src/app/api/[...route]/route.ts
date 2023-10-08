import { getAuthUser } from '@/server/functions/get-auth-user'
import { Hono } from 'hono'

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

const fetch = app.fetch

export { fetch as GET, fetch as PUT, fetch as POST, fetch as DELETE }

export type AppType = typeof route
