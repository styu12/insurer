import CalendarHeader from '../components/CalendarHeader.tsx'
import CalendarMonthView from '../components/CalendarMonthView.tsx'
import { useState } from 'react'
import { EVENT_TYPES, EventType, View, VIEWS } from '../constants'
import CalendarWeekView from '../components/CalendarWeekView.tsx'
import CalendarYearView from '../components/CalendarYearView.tsx'

export interface Event {
  id: string;
  customerName: string;
  href: string;
  date: string;
  type: EventType;
}

const PageContractList = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(VIEWS.MONTH);

  const today = new Date()
  const allEvents: Event[] = [
    {
      id: '1',
      customerName: '제리',
      href: '#',
      date: '2024-07-29T12:00',
      type: EVENT_TYPES.CONTRACT_START,
    },
    {
      id: '2',
      customerName: '테디',
      href: '#',
      date: '2024-07-02T12:00',
      type: EVENT_TYPES.CONTRACT_START,
    },
    {
      id: '3',
      customerName: '테디',
      href: '#',
      date: '2024-07-08T13:00',
      type: EVENT_TYPES.CLAIM_START,
    },
    {
      id: '4',
      customerName: '좌니',
      href: '#',
      date: '2024-07-10T12:00',
      type: EVENT_TYPES.CONTRACT_START,
    },
    {
      id: '5',
      customerName: '좌니',
      href: '#',
      date: '2024-07-14T13:00',
      type: EVENT_TYPES.CLAIM_START,
    },
    {
      id: '5',
      customerName: '크리스',
      href: '#',
      date: '2024-07-17T14:00',
      type: EVENT_TYPES.CONTRACT_START,
    },
    {
      id: '6',
      customerName: '크리스',
      href: '#',
      date: '2024-07-19T14:00',
      type: EVENT_TYPES.CLAIM_START,
    },
  ];

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
        view={view}
        date={date}
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
      />

      {renderCalendarView()}

    </div>
  )
}

export default PageContractList;
