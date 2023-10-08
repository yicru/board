import { client } from '@/client/lib/client'
import useSWR from 'swr'

export const useAuth = () => {
  const { data, isLoading } = useSWR('me', async () => {
    const result = await client.api.me.$get()
    return await result.json()
  })

  const authUser = data?.data
  const isLoggedIn = authUser != null

  return {
    authUser,
    isLoading,
    isLoggedIn,
  }
}
