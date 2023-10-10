'use client'

import { Button } from '@/client/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/client/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/client/components/ui/form'
import { Input } from '@/client/components/ui/input'
import { Separator } from '@/client/components/ui/separator'
import { useToast } from '@/client/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type FormValues = z.infer<typeof formSchema>

export default function SignInPage() {
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const signInWithEmail = async (values: FormValues) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast({
        description: error.message,
        title: 'Failed to sign in',
      })
      return
    }

    toast({
      description: 'Check your email for the sign in link',
      title: 'Email sent',
    })
  }

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
      provider: 'github',
    })
  }

  return (
    <Card className={'mx-auto w-full max-w-md backdrop-blur dark:border-zinc-900 dark:bg-card/50'}>
      <CardHeader className={'gap-1'}>
        <CardTitle className={'tracking-wide'}>Sign in</CardTitle>
        <CardDescription className={'text-xs'}>to continue to board</CardDescription>
      </CardHeader>

      <CardContent>
        <div className={'space-y-4'}>
          <Button className={'w-full tracking-wide'} onClick={signInWithGitHub} size={'lg'} variant={'secondary'}>
            <img alt={''} className={'mr-4 block h-4 w-4 dark:hidden'} src={'/github.svg'} />
            <img alt={''} className={'mr-4 hidden h-4 w-4 dark:block'} src={'/github-white.svg'} />
            Continue with GitHub
          </Button>
        </div>

        <div className={'mt-6 grid grid-cols-[1fr,50px,1fr] items-center'}>
          <Separator />
          <p className={'text-center text-xs font-medium text-gray-500'}>or</p>
          <Separator />
        </div>

        <Form {...form}>
          <form className={'mt-4'} onSubmit={form.handleSubmit(signInWithEmail)}>
            <div className={'space-y-4'}>
              <FormField
                control={form.control}
                name={'email'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-xs'}>Email</FormLabel>
                    <FormControl>
                      <Input className={'dark:bg-input'} required type={'email'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className={'mt-6 w-full tracking-wide'} type={'submit'} variant={'secondary'}>
              Continue with OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
