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
import { useNavigate } from 'react-router-dom'

export interface Event {
  id: number
  contractId: number
  customerName: string
  date: string
  type: EventType
}

const PageContractList = () => {
  const navigate = useNavigate()

  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(VIEWS.MONTH)
  const [events, setEvents] = useState<Event[]>([])
  const { contractsWithCustomer, loading, error, fetchAllContracts } =
    useListContracts()

  useEffect(() => {
    fetchAllContracts()
  }, [fetchAllContracts])

  useEffect(() => {
    if (
      Array.isArray(contractsWithCustomer) &&
      contractsWithCustomer.length > 0
    ) {
      let eventId = 0
      const newEvents: Event[] = contractsWithCustomer.flatMap((contract) => [
        {
          id: eventId++,
          contractId: contract.id || 0,
          customerName: contract.customerName || '',
          date: contract.startDate || '',
          type: EVENT_TYPES.CONTRACT_START,
        },
        {
          id: eventId++,
          contractId: contract.id || 0,
          customerName: contract.customerName || '',
          date: contract.claimDate || '',
          type: EVENT_TYPES.CLAIM_START,
        },
        {
          id: eventId++,
          contractId: contract.id || 0,
          customerName: contract.customerName || '',
          date: contract.endDate || '',
          type: EVENT_TYPES.CONTRACT_END,
        },
      ])

      setEvents(newEvents)
    }
  }, [contractsWithCustomer])

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

  const handleAddContract = () => {
    navigate('/contract/create')
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
          onAdd={handleAddContract}
        />

        {renderCalendarView()}
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractList
