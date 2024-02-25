import { DB } from '@/db/types'
import { Kysely } from 'kysely'

declare module 'hono' {
  interface Env {
    Bindings: {
      DATABASE_URL: string
    }
    Variables: {
      db: Kysely<DB>
    }
  }
}
