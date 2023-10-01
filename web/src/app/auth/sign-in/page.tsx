'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
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
    })

    if (error) {
      toast({
        description: error.message,
        title: 'Failed to sign in',
      })
      return
    }
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <Card className={'mx-auto w-full max-w-md bg-neutral-900/60 backdrop-blur'}>
      <CardHeader className={'gap-1'}>
        <CardTitle className={'tracking-wide'}>Sign in</CardTitle>
        <CardDescription className={'text-xs'}>to continue to board</CardDescription>
      </CardHeader>

      <CardContent>
        <div className={'space-y-4'}>
          <Button
            className={'w-full bg-neutral-900/50 tracking-wide'}
            onClick={signInWithGoogle}
            size={'lg'}
            variant={'outline'}
          >
            <img alt={''} className={'mr-4 h-4 w-4'} src={'/google.svg'} />
            Continue with Google
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
                      <Input required type={'email'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className={'mt-6 w-full tracking-wide'} type={'submit'} variant={'outline'}>
              Continue with OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
