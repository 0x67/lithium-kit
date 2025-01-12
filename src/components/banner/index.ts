import { type VariantProps, cva } from 'class-variance-authority'

export { default as UiBanner } from './Banner.vue'

export const buttonVariants = cva(
  `
    border-2rpx
  `,
  {
    variants: {
      variant: {
        primary: `border-primary-shimmer-payplus bg-primary-gray-25`,
        warning: `border-primary-orange-500 bg-primary-orange-50`,
        danger: `border-primary-red-500 bg-primary-red-50`,
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export type Variants = ButtonVariants['variant']
