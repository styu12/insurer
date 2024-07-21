import CalendarHeader from '../components/CalendarHeader.tsx'
import CalendarMonthView from '../components/CalendarMonthView.tsx'
import { useState } from 'react'
import { View, VIEWS } from '../constants'
import CalendarWeekView from '../components/CalendarWeekView.tsx'
import CalendarYearView from '../components/CalendarYearView.tsx'
import { toKST } from '../utils/date.ts'

export interface Event {
  id: string;
  name: string;
  href: string;
  datetime: string;
  time: string;
}

const PageContractList = () => {
  const [date, setDate] = useState(new Date());
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
        return <CalendarMonthView date={date} events={allEvents} today={today} onDateChange={handleDateChange} />;
      case VIEWS.WEEK:
        return <CalendarWeekView date={date} events={allEvents} today={today} />;
      case VIEWS.YEAR:
        return <CalendarYearView date={date} events={allEvents} today={today} />;
      default:
        return <CalendarMonthView date={date} events={allEvents} today={today} onDateChange={handleDateChange} />;
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

    </div>
  )
}

export default PageContractList;
