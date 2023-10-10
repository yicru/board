import type { NextRequest } from 'next/server'

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const url = new URL(req.url)

  if (!url.pathname.startsWith('/auth/callback')) {
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()
  }

  return res
}
