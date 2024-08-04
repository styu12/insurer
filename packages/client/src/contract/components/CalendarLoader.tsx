import { useMemo, useState } from 'react'
import CalendarHeader from './CalendarHeader'
import { useNavigate } from 'react-router-dom'
import { EVENT_TYPES, VIEW_TYPES } from '../constants'
import type { ViewTypes, EventTypes } from '../constants'
import CalendarMonthView from './CalendarMonthView'
import CalendarYearView from './CalendarYearView'
import SwitchCase from '../../_app/components/switch-case/SwitchCase'
import { useSuspenseQueryContractList } from '../stores/useQueryContract'

export interface Event {
  id: string
  contractId: number
  title: string
  description: string
  customerId: number
  customerName: string
  productId: number
  date: string
  type: EventTypes
}

const CalendarLoader = () => {
  const navigate = useNavigate()
  const payload = useSuspenseQueryContractList()
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<ViewTypes>(VIEW_TYPES.MONTH)
  const today = useMemo(() => new Date(), [])
  const events: Event[] = useMemo(() => {
    return payload.data?.flatMap((contract) => {
      return [
        {
          id: `${contract.id}_${EVENT_TYPES.CONTRACT_START.id}`,
          contractId: contract.id || 0,
          title: contract.customerName || '',
          description: contract.description || '',
          customerId: contract.customerId || 0,
          customerName: contract.customerName || '',
          productId: contract.productId || 0,
          date: contract.startDate || '',
          type: EVENT_TYPES.CONTRACT_START,
        },
        {
          id: `${contract.id}_${EVENT_TYPES.CLAIM_START.id}`,
          contractId: contract.id || 0,
          title: contract.customerName || '',
          description: contract.description || '',
          customerId: contract.customerId || 0,
          customerName: contract.customerName || '',
          productId: contract.productId || 0,
          date: contract.claimDate || '',
          type: EVENT_TYPES.CLAIM_START,
        },
        {
          id: `${contract.id}_${EVENT_TYPES.CONTRACT_END.id}`,
          contractId: contract.id || 0,
          title: contract.customerName || '',
          description: contract.description || '',
          customerId: contract.customerId || 0,
          customerName: contract.customerName || '',
          productId: contract.productId || 0,
          date: contract.endDate || '',
          type: EVENT_TYPES.CONTRACT_END,
        },
      ]
    })
  }, [payload])

  const handleDateChange = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: ViewTypes) => {
    setView(newView)
  }

  const handleAddContract = () => {
    navigate('/contract/create')
  }

  return (
    <>
      <CalendarHeader
        view={view}
        date={date}
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
        onAdd={handleAddContract}
      />
      <SwitchCase
        value={view}
        defaultComponent={
          <CalendarMonthView
            date={date}
            events={events}
            today={today}
            onDateChange={handleDateChange}
          />
        }
        caseBy={{
          [VIEW_TYPES.YEAR]: (
            <CalendarYearView date={date} events={events} today={today} />
          ),
          [VIEW_TYPES.MONTH]: (
            <CalendarMonthView
              date={date}
              events={events}
              today={today}
              onDateChange={handleDateChange}
            />
          ),
        }}
      />
    </>
  )
}
export default CalendarLoader
