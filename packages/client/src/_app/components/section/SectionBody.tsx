import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

const BASE = ['lg:flex', 'lg:h-full', 'lg:flex-col']
interface SectionBodyProps extends PropsWithChildren {
  className?: string
}
const SectionBody = (props: SectionBodyProps) => {
  return (
    <div className={classNames(BASE, props.className)}>{props.children}</div>
  )
}
export default SectionBody
