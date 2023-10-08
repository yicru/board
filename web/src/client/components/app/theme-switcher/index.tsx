'use client'

import { Button } from '@/client/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button onClick={toggle} size={'icon'} variant={'outline'}>
      <SunIcon className={'h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'} />
      <MoonIcon
        className={'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'}
      />
      <span className={'sr-only'}>Toggle theme</span>
    </Button>
  )
}
