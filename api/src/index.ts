import { DB } from '@/db/types'
import { dbMiddleware } from '@/middleware/db.middleware'
import { Hono } from 'hono'
import { Kysely } from 'kysely'

export type HonoEnv = {
  Bindings: {
    DATABASE_URL: string
  }
  Variables: {
    db: Kysely<DB>
  }
}

const app = new Hono<HonoEnv>()

app.use(dbMiddleware)

// TODO: remove
app.get('/', async (c) => {
  const users = await c.var.db.selectFrom('users').selectAll().execute()
  return c.json({ users })
})

export default app
