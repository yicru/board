import type { Metadata } from 'next'

import { ThemeSwitcher } from '@/client/components/app/theme-switcher'
import { Toaster } from '@/client/components/ui/toaster'
import { ThemeProvider } from '@/client/providers/theme-provider'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'board',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'}>
      <body className={inter.className}>
        <ThemeProvider attribute={'class'} defaultTheme={'dark'} disableTransitionOnChange enableSystem>
          <header className={'fixed inset-x-0 z-10 flex justify-end p-4'}>
            <ThemeSwitcher />
          </header>

          <main>
            <div className={'container mx-auto w-full max-w-5xl py-24'}>{children}</div>
          </main>

          <footer className={'fixed inset-x-0 bottom-0 flex items-center justify-end p-4'}>
            <a
              className={'flex items-center gap-2 opacity-25 transition-opacity hover:opacity-100'}
              href={'https://github.com/yicru/board'}
              rel={'noreferrer'}
              target={'_blank'}
            >
              <span className={'text-sm font-semibold'}>board</span>
              <span className={'text-xs font-semibold text-gray-600 dark:text-gray-400'}>by</span>
              <span className={'text-sm font-semibold'}>yicru</span>
            </a>
          </footer>

          <div className={'fixed inset-0 -z-10'}>
            <img alt={''} className={'h-full w-full object-cover object-center'} src={'/blob.webp'} />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
