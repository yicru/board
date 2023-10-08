import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  children: ReactNode
  className?: string
  onChange: (file: File) => void
}

export function FilePicker({ children, className, onChange }: Props) {
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      'text/markdown': ['.md', '.mdx'],
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const target = acceptedFiles[0]
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (target) {
        onChange(target)
      }
    },
  })

  return (
    <div className={cn(className)} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
