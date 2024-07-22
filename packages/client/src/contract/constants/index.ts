// index.ts
export const VIEWS = {
  // DAY: 'day', 현재 상황으로는 Day View 필요하지 않을 듯.
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const

export type View = (typeof VIEWS)[keyof typeof VIEWS]

export const EVENT_TYPES = {
  CONTRACT_START: 'CONTRACT_START',
  CLAIM_START: 'CLAIM_START',
  CONTRACT_END: 'CONTRACT_END',
}

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES]

export const convertEventTypeToKorean = (type: EventType) => {
  switch (type) {
    case EVENT_TYPES.CONTRACT_START:
      return '계약 시작'
    case EVENT_TYPES.CLAIM_START:
      return '청구 시작'
    case EVENT_TYPES.CONTRACT_END:
      return '계약 종료'
    default:
      return ''
  }
}
