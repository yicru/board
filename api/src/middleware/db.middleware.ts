import { DB } from '@/db/types'
import { HonoEnv } from '@/index'
import { createMiddleware } from 'hono/factory'
import { Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'

export const dbMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const db = new Kysely<DB>({
    dialect: new PostgresJSDialect({
      postgres: postgres(c.env.DATABASE_URL),
    }),
  })

  c.set('db', db)

  await next()
})
