import type { ViewTypes } from '../constants'
import { VIEW_TYPES } from '../constants'
import CalendarHeaderTitle from './CalendarHeaderTitle'
import CalendarHeaderBackFowardButton from './CalendarHeaderBackFowardButton'
import SplitVeritcal from '../../_app/components/split/SplitVeritcal'
import Button from '../../_app/components/button/Button'
import CalendarHeaderViewMenu from './CalendarHeaderViewMenu'
import { useCallback } from 'react'

interface CalendarHeaderProps {
  view: ViewTypes
  date: Date
  onDateChange: (_newDate: Date) => void
  onViewChange: (_newView: ViewTypes) => void
  onAdd: () => void
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { onDateChange, onViewChange } = props
  const handlePrevious = useCallback(() => {
    const newDate = new Date(props.date)
    if (props.view === VIEW_TYPES.MONTH) {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (props.view === VIEW_TYPES.YEAR) {
      newDate.setFullYear(newDate.getFullYear() - 1)
    }
    onDateChange(newDate)
  }, [onDateChange, props.date, props.view])
  const handleNext = useCallback(() => {
    const newDate = new Date(props.date)
    if (props.view === VIEW_TYPES.MONTH) {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (props.view === VIEW_TYPES.YEAR) {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    onDateChange(newDate)
  }, [onDateChange, props.date, props.view])

  const handleToday = useCallback(() => {
    onDateChange(new Date())
  }, [onDateChange])

  const handleViewChange = useCallback(
    (newView: ViewTypes) => {
      onViewChange(newView)
    },
    [onViewChange]
  )

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <CalendarHeaderTitle view={props.view} date={props.date} />
      <div className="flex items-center">
        <CalendarHeaderBackFowardButton
          onClickPrevButton={handlePrevious}
          onClickNextButton={handleNext}
          onClickTodayButton={handleToday}
        />
        <div className="hidden md:ml-4 md:flex md:items-center">
          <CalendarHeaderViewMenu
            view={props.view}
            onViewChange={handleViewChange}
          />
          <SplitVeritcal className="ml-6 mr-6" />
          <Button onClick={props.onAdd}>Add event</Button>
        </div>
      </div>
    </div>
  )
}

export default CalendarHeader
