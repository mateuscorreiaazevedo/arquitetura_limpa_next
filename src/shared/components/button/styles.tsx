import { type VariantProps, tv } from 'tailwind-variants'

export const buttonVariantsStyles = tv({
  base: 'rounded-md px-4 py-2 text-base font-medium transition-all',
  variants: {
    color: {
      default: '',
      primary: '',
      secondary: '',
      danger: '',
      success: '',
      warning: '',
    },
    variant: {
      light: '',
      solid: '',
      outline: '',
    },
  },

  defaultVariants: {
    color: 'default',
    variant: 'solid',
  },

  compoundVariants: [
    { color: 'primary', variant: 'solid', className: 'bg-blue-500 text-white hover:bg-blue-700' },
    { color: 'primary', variant: 'light', className: 'bg-blue-200 text-blue-600' },
    { color: 'primary', variant: 'outline', className: 'bg-white text-blue-600 border border-blue-600' },
    { color: 'default', variant: 'solid', className: 'bg-zinc-400 text-zinc-800' },
    { color: 'default', variant: 'light', className: 'bg-white text-zinc-500' },
    { color: 'default', variant: 'outline', className: 'bg-white text-zinc-600 border border-zinc-600' },
    { color: 'danger', variant: 'solid', className: 'bg-red-500 text-white' },
    { color: 'danger', variant: 'light', className: 'bg-red-200 text-red-600' },
    { color: 'danger', variant: 'outline', className: 'bg-white text-red-600 border border-red-600' },
    { color: 'success', variant: 'solid', className: 'bg-green-500 text-white' },
    { color: 'success', variant: 'light', className: 'bg-green-200 text-green-600' },
    { color: 'success', variant: 'outline', className: 'bg-white text-green-600 border border-green-600' },
    { color: 'warning', variant: 'solid', className: 'bg-yellow-500 text-white' },
    { color: 'warning', variant: 'light', className: 'bg-yellow-200 text-yellow-600' },
    { color: 'warning', variant: 'outline', className: 'bg-white text-yellow-600 border border-yellow-600' },
  ],
})

export type ButtonVariants = VariantProps<typeof buttonVariantsStyles>
