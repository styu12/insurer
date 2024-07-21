import React, { useEffect, useRef } from 'react'
import { isSameDay } from '../../../utils/date.ts'
import { Event } from '../../../pages/PageContractCustomerList.tsx'

interface CalendarWeekViewProps {
  date: Date;
  events: Event[];
  today: Date;
}

const getDaysInWeek = (startDate: Date) => {
  const days = [];
  const day = new Date(startDate);
  day.setDate(day.getDate() - day.getDay()); // start from Sunday
  for (let i = 0; i < 7; i++) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return days;
};

const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  date,
  events,
  today,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    if (container.current && containerNav.current && containerOffset.current) {
      container.current.scrollTop =
        ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }
  }, []);

  const days = getDaysInWeek(date).map(day => ({
    date: day.toISOString().split('T')[0],
    isCurrentMonth: day.getMonth() === date.getMonth(),
    isToday: isSameDay(day, today),
    isSelected: isSameDay(day, date),
    events: events.filter(event => isSameDay(new Date(event.datetime), day)),
  }));

  return (
    <div className="flex h-full flex-col">
      <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {days.map((day) => (
                <button key={day.date} type="button" className="flex flex-col items-center pb-3 pt-2">
                  {new Date(day.date).toLocaleDateString('ko-KR', { weekday: 'short' }).charAt(0)}{' '}
                  <span
                    className={`mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900 ${day.isToday ? 'rounded-full bg-indigo-600 text-white' : ''
                    }`}
                  >
                    {new Date(day.date).getDate()}
                  </span>
                </button>
              ))}
            </div>

            <div
              className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {days.map((day) => (
                <div key={day.date} className="flex items-center justify-center py-3">
                  <span className="flex items-baseline">
                    {new Date(day.date).toLocaleDateString('ko-KR', { weekday: 'short' })}{' '}
                    <span
                      className={`ml-1.5 flex h-8 w-8 items-center justify-center font-semibold text-gray-900 ${day.isToday ? 'rounded-full bg-indigo-600 text-white' : ''
                      }`}
                    >
                      {new Date(day.date).getDate()}
                    </span>
                  </span>
                </div>
              ))}
            </div>

          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div key={hour}>
                    <div
                      className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 ? 'AM' : 'PM'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vertical lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                {days.map((_, index) => (
                  <div key={index} className="col-start-1 row-span-full" />
                ))}
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {events.map((event) => {
                  const eventDate = new Date(event.datetime);
                  const dayIndex = days.findIndex(day => isSameDay(new Date(day.date), eventDate));
                  const start = (eventDate.getHours() * 60 + eventDate.getMinutes()) / 1440 * 48;
                  const duration = 12; // 예제에서는 모든 이벤트가 1시간으로 가정

                  return (
                    <li
                      key={event.id}
                      className={`relative mt-px flex ${dayIndex !== -1 ? `sm:col-start-${dayIndex + 2}` : ''}`}
                      style={{ gridRow: `${Math.floor(start)} / span ${duration}` }}
                    >
                      <a
                        href={event.href}
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                      >
                        <p className="order-1 font-semibold text-blue-700">{event.name}</p>
                        <p className="text-blue-500 group-hover:text-blue-700">
                          <time dateTime={event.datetime}>{event.time}</time>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarWeekView;
