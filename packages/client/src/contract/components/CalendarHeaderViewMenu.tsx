import { useCallback, useMemo } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { VIEW_TYPES } from '../constants'
import type { ViewTypes } from '../constants'
import Button from '../../_app/components/button/Button'

interface CalendarHeaderViewMenuProps {
  view: ViewTypes
  onViewChange: (_view: ViewTypes) => void
}
const CalendarHeaderViewMenu = (props: CalendarHeaderViewMenuProps) => {
  const getViewLabel = useCallback((view: ViewTypes) => {
    return `${view.charAt(0).toUpperCase()}${view.slice(1)} view`
  }, [])
  const currentViewLabel = useMemo(() => {
    return getViewLabel(props.view)
  }, [props.view, getViewLabel])

  return (
    <Menu as="div" className="relative">
      <MenuButton
        type="button"
        className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {currentViewLabel}
        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          {Object.values(VIEW_TYPES).map((viewOption) => (
            <MenuItem key={viewOption}>
              <Button
                onClick={() => props.onViewChange(viewOption)}
                DANGEROUSLY_ovveride_style
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {getViewLabel(viewOption)}
              </Button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default CalendarHeaderViewMenu
