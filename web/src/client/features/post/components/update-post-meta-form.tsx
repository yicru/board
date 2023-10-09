'use client'

import { Button } from '@/client/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/client/components/ui/form'
import { Input } from '@/client/components/ui/input'
import { Textarea } from '@/client/components/ui/textarea'
import { useToast } from '@/client/components/ui/use-toast'
import { client } from '@/client/lib/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Board, Post } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  summary: z.string(),
  title: z.string(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  board: Board
  post: Post
}

export default function UpdatePostMetaForm({ board, post }: Props) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    defaultValues: {
      summary: post.summary,
      title: post.title,
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: FormValues) => {
    const result = await client.api.boards[':boardId'].posts[':postId'].meta.$post({
      json: {
        summary: values.summary,
        title: values.title,
      },
      param: { boardId: board.uid, postId: post.id },
    })

    if (!result.ok) {
      const error = await result.text()
      toast({
        description: error,
        title: 'Failed to create post',
      })
      return
    }

    router.refresh()
  }

  return (
    <Form {...form}>
      <form className={'mt-4'} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'space-y-4'}>
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'text-xs'}>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'summary'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'text-xs'}>Summary</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.formState.isDirty && (
          <Button className={'mt-6 w-full tracking-wide'} type={'submit'} variant={'secondary'}>
            Save
          </Button>
        )}
      </form>
    </Form>
  )
}
