import { redirect } from 'next/navigation'

export default async function Home() {
  return redirect('/auth/sign-in')
}
