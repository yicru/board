import { prisma } from '@/server/lib/prisma'
import { User } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getAuthUser = async (): Promise<User | null> => {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser()

  if (!supabaseUser?.email) {
    return null
  }

  return prisma.user.findUnique({
    where: {
      email: supabaseUser.email,
    },
  })
}
