import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Button from '../../_app/components/button/Button'
import classNames from 'classnames'

interface CalendarHeaderBackFowardButtonProps {
  onClickPrevButton: () => void
  onClickNextButton: () => void
  onClickTodayButton: () => void
}

const BUTTON_BASE_STYLE = [
  'flex',
  'h-9',
  'w-12',
  'items-center',
  'justify-center',
  'border-y',
  'border-gray-300',
  'text-gray-400',
  'hover:text-gray-500',
  'focus:relative',
  'md:w-9',
  'md:hover:bg-gray-50',
]
const BUTTON_NEXT_STYLE = ['rounded-r-md', 'border-r', 'pl-1', 'md:pl-0']
const BUTTON_PREV_STYLE = ['rounded-l-md', 'border-l', 'pr-1', 'md:pr-0']
const CalendarHeaderBackFowardButton = (
  props: CalendarHeaderBackFowardButtonProps
) => {
  return (
    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
      <Button
        type="button"
        onClick={props.onClickPrevButton}
        DANGEROUSLY_ovveride_style
        className={classNames(BUTTON_BASE_STYLE, BUTTON_PREV_STYLE)}
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        onClick={props.onClickTodayButton}
        DANGEROUSLY_ovveride_style
        className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
      >
        Today
      </Button>
      <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
      <Button
        type="button"
        onClick={props.onClickNextButton}
        DANGEROUSLY_ovveride_style
        className={classNames(BUTTON_BASE_STYLE, BUTTON_NEXT_STYLE)}
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  )
}
export default CalendarHeaderBackFowardButton
