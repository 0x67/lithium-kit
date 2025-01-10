import { type VariantProps, cva } from 'class-variance-authority'

export { default as UiButton } from './Button.vue'

export const buttonVariants = cva(
  `center flex-grow-0 flex-shrink-0 whitespace-nowrap rounded-full
   cursor-pointer border-0 transition duration-300 ease-in-out
  text-primary-raisin font-600 text-md line-height-md
  disabled:(text-primary-gray-400 bg-primary-gray-50 cursor-not-allowed)
  `,
  {
    variants: {
      variant: {
        primary:
          `bg-primary-yellow-400 hover:(bg-primary-yellow-700)`,
        secondary:
          `bg-white hover:(bg-primary-yellow-50) outline-none border border-3rpx border-primary-yellow-400 disabled:(border-none)`,
        ghost: `bg-transparent text-primary-gray-600  hover:(bg-primary-gray-50)`,
        danger: ` bg-primary-red-400 text-white hover:(bg-primary-red-500)`,
      },
      size: {
        primary: 'w-full h-96rpx px-48rpx py-24rpx',
        small: 'w-320rpx h-72rpx px-24rpx py-12rpx',
      },

    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export type Variants = ButtonVariants['variant']
