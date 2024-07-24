import classNames from 'classnames'
import Button from '../button/Button'
const BASE = [
  'inline-flex',
  'items-center',
  'border-t-2',
  'px-4',
  'pt-4',
  'text-sm',
  'font-medium',
]
const CURRENT = ['bold', 'border-sky-500', 'text-sky-700']
const DEFAULT = [
  'border-transparent',
  'text-gray-500',
  'hover:text-gray-700',
  'hover:border-gray-300',
]

const ButtonPageNumber = ({
  navigateTo,
  pageNumber,
  isCurrent,
}: {
  navigateTo: () => void
  pageNumber: number
  isCurrent: boolean
}) => {
  return (
    <Button
      onClick={navigateTo}
      data-current={isCurrent}
      DANGEROUSLY_ovveride_style
      className={classNames(BASE, isCurrent ? CURRENT : DEFAULT)}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {pageNumber}
    </Button>
  )
}
export default ButtonPageNumber
