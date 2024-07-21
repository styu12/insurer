import {
  ClockIcon,
} from '@heroicons/react/20/solid'
import CalendarHeader from './header/CalendarHeader.tsx'
import CalendarMonthView from './body/CalendarMonthView.tsx'
import { useState } from 'react'
import { View, VIEWS } from '../constants'
import CalendarWeekView from './body/CalendarWeekView.tsx'
import CalendarYearView from './body/CalendarYearView.tsx'
import { toKST } from '../utils/date.ts'

export interface Event {
  id: string;
  name: string;
  href: string;
  datetime: string;
  time: string;
}

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [view, setView] = useState<View>(VIEWS.MONTH);

  const today = new Date()
  const allEvents: Event[] = [
    {
      id: '1',
      name: '한승오 고객님 계약 완료',
      href: '#',
      datetime: '2024-07-14T12:00',
      time: '12:00 PM',
    },
    {
      id: '2',
      name: '김기덕 고객님 계약 완료',
      href: '#',
      datetime: '2024-07-14T12:00',
      time: '12:00 PM',
    },
    {
      id: '3',
      name: '임문규 고객님 계약 완료',
      href: '#',
      datetime: '2024-07-14T13:00',
      time: '13:00 PM',
    },
    {
      id: '4',
      name: '테디 고객님 계약 완료',
      href: '#',
      datetime: '2024-07-17T12:00',
      time: '12:00 PM',
    },
    {
      id: '5',
      name: '좌니 고객님 계약 완료',
      href: '#',
      datetime: '2024-07-17T13:00',
      time: '12:00 PM',
    },
    {
      id: '5',
      name: '크리스 고객님 계약 완료',
      href: '#',
      datetime: '2024-07-17T14:00',
      time: '12:00 PM',
    },
    {
      id: '6',
      name: '나재성 고객님 계약 청구일 시작',
      href: '#',
      datetime: '2024-07-21T10:00',
      time: '10:00 AM',
    },
  ].map((event) => ({
    ...event,
    datetime: toKST(new Date(event.datetime)).toISOString(),
  }));

  const renderCalendarView = () => {
    switch (view) {
      case VIEWS.MONTH:
        return <CalendarMonthView date={date} events={allEvents} today={today} />;
      case VIEWS.WEEK:
        return <CalendarWeekView date={date} events={allEvents} today={today} />;
      case VIEWS.YEAR:
        return <CalendarYearView date={date} events={allEvents} today={today} />;
      default:
        return <CalendarMonthView date={date} events={allEvents} today={today} />;
    }
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };


  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader
        view={'month'}
        date={new Date()}
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
      />

      {renderCalendarView()}

      {/* only mobile */}
      {events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {events.map((event) => (
              <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time dateTime={event.datetime} className="mt-2 flex items-center text-gray-700">
                    <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      <button onClick={() => setDate(new Date())}>
        Set Date
      </button>

      <button onClick={() => setEvents(allEvents)}>
        Set Events
      </button>
    </div>
  )
}

export default Calendar;
