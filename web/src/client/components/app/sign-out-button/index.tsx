'use client'

import { Button } from '@/client/components/ui/button'
import { useAuth } from '@/client/features/auth/hooks/use-auth'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LogOutIcon } from 'lucide-react'

export function SignOutButton() {
  const { isLoading, isLoggedIn } = useAuth()

  const onClick = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
    location.href = '/'
  }

  if (isLoading) {
    return <Button className={'animate-pulse'} size={'icon'} variant={'secondary'} />
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <Button onClick={onClick} size={'icon'} variant={'outline'}>
      <LogOutIcon className={'h-4 w-4'} />
    </Button>
  )
}
