import React from 'react';
import { Event } from '../Calendar.tsx'
import { isSameDay } from '../../utils/date.ts'
import classNames from 'classnames';

interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: Event[];
}

interface CalendarMonthViewProps {
  date: Date;
  events: Event[];
  today: Date;
}

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
  date,
  events,
 today,
}) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const days: Day[] = getDaysInMonth(year, month).map(day => ({
    date: day.toISOString().split('T')[0],
    isCurrentMonth: day.getMonth() === month,
    isToday: isSameDay(day, today),
    isSelected: isSameDay(day, date),
    events: events.filter(event => isSameDay(new Date(event.datetime), day)),
  }));

  return (
    <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div
        className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div className="bg-white py-2">
          M<span className="sr-only sm:not-sr-only">on</span>
        </div>
        <div className="bg-white py-2">
          T<span className="sr-only sm:not-sr-only">ue</span>
        </div>
        <div className="bg-white py-2">
          W<span className="sr-only sm:not-sr-only">ed</span>
        </div>
        <div className="bg-white py-2">
          T<span className="sr-only sm:not-sr-only">hu</span>
        </div>
        <div className="bg-white py-2">
          F<span className="sr-only sm:not-sr-only">ri</span>
        </div>
        <div className="bg-white py-2">
          S<span className="sr-only sm:not-sr-only">at</span>
        </div>
        <div className="bg-white py-2">
          S<span className="sr-only sm:not-sr-only">un</span>
        </div>
      </div>
      <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {days.map((day) => (
            <div
              key={day.date}
              className={classNames(
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                'relative px-3 py-2',
              )}
            >
              <time
                dateTime={day.date}
                className={
                  day.isToday
                    ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                    : undefined
                }
              >
                {day.date.split('-').pop()?.replace(/^0/, '')}
              </time>
              {day.events.length > 0 && (
                <ol className="mt-2">
                  {day.events.slice(0, 2).map((event) => (
                    <li key={event.id}>
                      <a href={event.href} className="group flex">
                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                          {event.name}
                        </p>
                        <time
                          dateTime={event.datetime}
                          className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                        >
                          {event.time}
                        </time>
                      </a>
                    </li>
                  ))}
                  {day.events.length > 2 && <li className="text-gray-500">+ {day.events.length - 2} more</li>}
                </ol>
              )}
            </div>
          ))}
        </div>
        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              className={classNames(
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                (day.isSelected || day.isToday) ? 'font-semibold' : '',
                day.isSelected ? 'text-white' : '',
                !day.isSelected && day.isToday ? 'text-indigo-600' : '',
                !day.isSelected && day.isCurrentMonth && !day.isToday ? 'text-gray-900' : '',
                !day.isSelected && !day.isCurrentMonth && !day.isToday ? 'text-gray-500' : '',
                'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  day.isSelected ? 'flex h-6 w-6 items-center justify-center rounded-full' : '',
                  day.isSelected && day.isToday ? 'bg-indigo-600' : '',
                  day.isSelected && !day.isToday ? 'bg-gray-900' : '',
                  'ml-auto',
                )}
              >
                {day.date.split('-').pop()?.replace(/^0/, '')}
              </time>
              <span className="sr-only">{day.events.length} events</span>
              {day.events.length > 0 && (
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span key={event.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    ))}
                  </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarMonthView
