import { PropsWithChildren } from 'react'
import { HeroIconType } from '../../types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

interface SiderbarNavLinkProps extends PropsWithChildren {
  to: string
  current: boolean
  icon?: HeroIconType
}
const SiderbarNavLink = (props: SiderbarNavLinkProps) => {
  return (
    <>
      <Link
        to={props.to}
        className={classNames([
          {
            'bg-gray-50 text-indigo-600': props.current,
            'text-gray-700 hover:bg-gray-50 hover:text-indigo-600':
              !props.current,
          },
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        ])}
      >
        {props.icon ? (
          <>
            <props.icon
              aria-hidden="true"
              className={classNames([
                {
                  'text-indigo-600': props.current,
                  'text-gray-400 group-hover:text-indigo-600': !props.current,
                },
                'h-6 w-6 shrink-0',
              ])}
            />
            {props.children}
          </>
        ) : (
          props.children
        )}
      </Link>
    </>
  )
}
export default SiderbarNavLink
