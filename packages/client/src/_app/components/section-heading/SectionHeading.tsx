import { ReactNode } from 'react'

interface SectionHeadingProps {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}
const SectionHeading = (props: SectionHeadingProps) => {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {props.title}
        </h3>
        {props.description ? (
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            {props.description}
          </p>
        ) : null}
      </div>
      {props.actions ? (
        <div className="mt-3 flex sm:ml-4 sm:mt-0">{props.actions}</div>
      ) : null}
    </div>
  )
}
export default SectionHeading
