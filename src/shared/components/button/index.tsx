import type { ComponentProps } from 'react'
import { type ButtonVariants, buttonVariantsStyles } from './styles'

export type ButtonProps = ComponentProps<'button'> & ButtonVariants

export function Button({ className, color = 'default', variant = 'solid', ...props }: ButtonProps) {
  return <button className={buttonVariantsStyles({ className, color, variant })} {...props} />
}
