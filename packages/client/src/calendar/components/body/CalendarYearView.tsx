import React from 'react';
import { Event } from '../Calendar.tsx';

// TODO: className function 공통 utils 함수로 빼기
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: Event[];
}

interface Month {
  name: string;
  days: Day[];
}

interface YearViewProps {
  date: Date;
  events: Event[];
  today: Date;
}

const getMonthDays = (year: number, month: number, today: Date, events: Event[]): Day[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days: Day[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthDate = new Date(year, month, i - firstDayOfMonth + 1);
    days.push({
      date: prevMonthDate.toISOString().split('T')[0],
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      events: [],
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateString = date.toISOString().split('T')[0];
    days.push({
      date: dateString,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: false,
      events: events.filter(event => event.datetime.startsWith(dateString)),
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    days.push({
      date: nextMonthDate.toISOString().split('T')[0],
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      events: [],
    });
  }

  return days;
};

const getMonths = (year: number, today: Date, events: Event[]): Month[] => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return monthNames.map((name, monthIndex) => ({
    name,
    days: getMonthDays(year, monthIndex, today, events),
  }));
};

const CalendarYearView: React.FC<YearViewProps> = ({ date, events, today }) => {
  const year = date.getFullYear();
  const months = getMonths(year, today, events);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        {months.map((month) => (
          <section key={month.name} className="text-center">
            <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {month.days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                    dayIdx === 0 ? 'rounded-tl-lg' : '',
                    dayIdx === 6 ? 'rounded-tr-lg' : '',
                    dayIdx === month.days.length - 7 ? 'rounded-bl-lg' : '',
                    dayIdx === month.days.length - 1 ? 'rounded-br-lg' : '',
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isToday ? 'bg-indigo-600 font-semibold text-white' : '',
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    )}
                  >
                    {day.date.split('-').pop()?.replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CalendarYearView;
