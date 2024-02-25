import { dbMiddleware } from '@/middleware/db.middleware'
import { Hono } from 'hono'

const app = new Hono()

app.use(dbMiddleware)

// TODO: remove
app.get('/', async (c) => {
  const users = await c.var.db.selectFrom('users').selectAll().execute()
  return c.json({ users })
})

export default app
