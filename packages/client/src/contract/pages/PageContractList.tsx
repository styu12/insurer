import CalendarHeader from '../components/CalendarHeader.tsx'
import CalendarMonthView from '../components/CalendarMonthView.tsx'
import { useEffect, useState } from 'react'
import { EVENT_TYPES, EventType, View, VIEWS } from '../constants'
import CalendarWeekView from '../components/CalendarWeekView.tsx'
import CalendarYearView from '../components/CalendarYearView.tsx'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import { useListContracts } from '../hooks/useContractService.ts'

export interface Event {
  id: number
  customerName: string
  href: string
  date: string
  type: EventType
}

const PageContractList = () => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(VIEWS.MONTH)
  const [events, setEvents] = useState<Event[]>([])
  const { contracts, loading, error, fetchAllContracts } = useListContracts()

  useEffect(() => {
    fetchAllContracts()
  }, [fetchAllContracts])

  useEffect(() => {
    if (Array.isArray(contracts) && contracts.length > 0) {
      const newEvents: Event[] = contracts.flatMap((contract) => [
        {
          id: contract.id || 0,
          customerName: contract.customerName || '',
          href: `/contracts/${contract.id}`,
          date: contract.startDate || '',
          type: EVENT_TYPES.CONTRACT_START,
        },
        {
          id: contract.id || 0,
          customerName: contract.customerName || '',
          href: `/contracts/${contract.id}`,
          date: contract.claimDate || '',
          type: EVENT_TYPES.CLAIM_START,
        },
        {
          id: contract.id || 0,
          customerName: contract.customerName || '',
          href: `/contracts/${contract.id}`,
          date: contract.endDate || '',
          type: EVENT_TYPES.CONTRACT_END,
        },
      ]);
      setEvents(newEvents);
    }
  }, [contracts])

  const today = new Date()

  const renderCalendarView = () => {
    switch (view) {
      case VIEWS.MONTH:
        return (
          <CalendarMonthView
            date={date}
            events={events}
            today={today}
            onDateChange={handleDateChange}
          />
        )
      case VIEWS.WEEK:
        return <CalendarWeekView date={date} events={events} today={today} />
      case VIEWS.YEAR:
        return <CalendarYearView date={date} events={events} today={today} />
      default:
        return (
          <CalendarMonthView
            date={date}
            events={events}
            today={today}
            onDateChange={handleDateChange}
          />
        )
    }
  }

  const handleDateChange = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  if (loading) {
    return (
      <SectionPage>
        <SectionHeading title="계약관리" />
        <SectionBody>
          <div>Loading...</div>
        </SectionBody>
      </SectionPage>
    )
  }

  if (error) {
    return (
      <SectionPage>
        <SectionHeading title="계약관리" />
        <SectionBody>
          <div>Error: {error.message}</div>
        </SectionBody>
      </SectionPage>
    )
  }

  return (
    <SectionPage>
      <SectionHeading title="계약관리" />
      <SectionBody>
        <CalendarHeader
          view={view}
          date={date}
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />

        {renderCalendarView()}
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractList
