import type { PropsWithChildren } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'
import styles from './style.module.scss'

const titleVariants = tv({
  base: styles['title-h1'],
  variants: {
    color: {
      base: 'text-white',
      primary: 'text-blue-500 font-bold',
      secondary: 'text-zinc-200',
    },
  },
  defaultVariants: {
    color: 'base',
  },
})

type TitleProps = PropsWithChildren<VariantProps<typeof titleVariants> & { className?: string }>

export function Title({ children, color, className }: TitleProps) {
  return <h1 className={titleVariants({ color, className })}>{children}</h1>
}
