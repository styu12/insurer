import { useMemo } from 'react'
import { VIEW_TYPES } from '../constants'
import type { ViewTypes } from '../constants'

interface CalendarHeaderTitleProps {
  view: ViewTypes
  date: Date
}
const CalendarHeaderTitle = (props: CalendarHeaderTitleProps) => {
  const title = useMemo(() => {
    switch (props.view) {
      case VIEW_TYPES.MONTH: {
        const month = props.date.toLocaleString('ko-KR', { month: 'long' })
        const year = props.date.getFullYear()
        return `${month} ${year}`
      }
      case VIEW_TYPES.YEAR: {
        return props.date.getFullYear().toString()
      }
      default: {
        return ''
      }
    }
  }, [props.date, props.view])

  const dateTime = useMemo(() => {
    const year = props.date.getFullYear()
    const month = String(props.date.getMonth() + 1).padStart(2, '0')

    return `${year}-${month}`
  }, [props.date])

  return (
    <h1 className="text-base font-semibold leading-6 text-gray-900">
      <time dateTime={dateTime}>{title}</time>
    </h1>
  )
}
export default CalendarHeaderTitle
