import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix! Using Vite and Cloudflare!',
    },
  ]
}

export default function Index() {
  return (
    <div className={'text-center'}>
      <h1 className={'text-xl font-bold'}>Hello, Tailwind!</h1>
    </div>
  )
}
