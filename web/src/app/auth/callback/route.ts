import type { NextRequest } from 'next/server'

import { prisma } from '@/server/lib/prisma'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { paramCase } from 'change-case'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)

    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()

    if (!supabaseUser?.email) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const [username] = supabaseUser.email.split('@')
    const boardUid = username ? paramCase(username) : supabaseUser.id

    await prisma.user.upsert({
      create: {
        Board: {
          create: {
            uid: boardUid,
          },
        },
        email: supabaseUser.email,
      },
      update: {},
      where: {
        email: supabaseUser.email,
      },
    })

    return NextResponse.redirect(new URL(`/${boardUid}`, request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}
