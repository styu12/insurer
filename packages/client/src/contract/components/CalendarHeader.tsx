import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import { View, VIEWS } from '../constants'

interface CalendarHeaderProps {
  view: View;
  date: Date;
  onDateChange: (newDate: Date) => void;
  onViewChange: (newView: View) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  date,
  onDateChange,
  onViewChange,
}) => {
  const handlePrevious = () => {
    const newDate = new Date(date);
    if (view === VIEWS.MONTH) {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === VIEWS.WEEK) {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === VIEWS.YEAR) {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    if (view === VIEWS.MONTH) {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === VIEWS.WEEK) {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === VIEWS.YEAR) {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const handleViewChange = (newView: View) => {
    onViewChange(newView);
  };

  const formatTitle = () => {
    switch (view) {
      case VIEWS.MONTH: {
        return `${date.toLocaleString('ko-KR', { month: 'long' })} ${date.getFullYear()}`;
      }
      case VIEWS.WEEK: {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleString('ko-KR', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleString('ko-KR', { month: 'short', day: 'numeric' })} ${date.getFullYear()}`;
      }
      case VIEWS.YEAR: {
        return date.getFullYear().toString();
      }
      default: {
        return '';
      }
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time dateTime={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`}>
          {formatTitle()}
        </time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            onClick={handlePrevious}
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleToday}
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            onClick={handleNext}
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <MenuButton
              type="button"
              className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} view
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                {Object.values(VIEWS).map((viewOption) => (
                  <MenuItem key={viewOption}>
                    <a
                      href="#"
                      onClick={() => handleViewChange(viewOption as View)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)} view
                    </a>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add event
          </button>
        </div>
        <Menu as="div" className="relative ml-6 md:hidden">
          <MenuButton
            className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Create event
                </a>
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Go to today
                </a>
              </MenuItem>
            </div>
            <div className="py-1">
              {Object.values(VIEWS).map((viewOption) => (
                <MenuItem key={viewOption}>
                  <a
                    href="#"
                    onClick={() => handleViewChange(viewOption as View)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)} view
                  </a>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  )
}

export default CalendarHeader;
