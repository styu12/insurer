import classNames from 'classnames'
const BASE = [
  'inline-flex',
  'items-center',
  'border-t-2',
  'border-transparent',
  'px-4',
  'pt-4',
  'text-sm',
  'font-medium',
  'text-gray-500',
]
const EllipsisPageNumber = () => {
  return <span className={classNames(BASE)}>...</span>
}

export default EllipsisPageNumber
