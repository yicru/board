import { Hono } from 'hono'

const app = new Hono().basePath('/api')

const route = app.get('/hello', async (c) => {
  return c.jsonT({
    data: 'Hello World',
  })
})

const fetch = app.fetch

export { fetch as GET, fetch as PUT, fetch as POST, fetch as DELETE }

export type AppType = typeof route
