import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import classNames from 'classnames'

const BASE = [
  'inline-flex',
  'items-center',
  'rounded-md',
  'px-3',
  'py-2',
  'text-sm',
  'font-semibold',
  'shadow-sm',
]
const PRIMARY_UNIQUE = [
  'bg-indigo-600',
  'text-white',
  'hover:bg-indigo-500',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-indigo-600',
]

const SECONDARY_UNIQUE = [
  'bg-white',
  'text-gray-900',
  'ring-1',
  'ring-inset',
  'ring-gray-300',
  'hover:bg-gray-50',
]

const PRIMARY = [...BASE, ...PRIMARY_UNIQUE]
const SECONDARY = [...BASE, ...SECONDARY_UNIQUE]

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  key?: string | number
  primary?: boolean
  secondary?: boolean
}

const Button = (props: ButtonProps) => {
  const { key, className, primary, secondary, ...defaultButtonProps } = props

  const buttonClasses = useMemo(() => {
    if (secondary) {
      return SECONDARY
    }
    // Default to primary style if neither or primary is provided
    return PRIMARY
  }, [secondary])

  return (
    <button
      key={key}
      className={classNames(buttonClasses, className)}
      {...defaultButtonProps}
    >
      {props.children}
    </button>
  )
}
export default Button
