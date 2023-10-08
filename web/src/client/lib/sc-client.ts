import { type AppType } from '@/app/api/[...route]/route'
import { env } from '@/shared/lib/env'
import { hc } from 'hono/client'
import { cookies } from 'next/headers'

export const createServerComponentClient = () => {
  return hc<AppType>(env.NEXT_PUBLIC_APP_ORIGIN, {
    headers: {
      cookie: cookies().toString(),
    },
  })
}
