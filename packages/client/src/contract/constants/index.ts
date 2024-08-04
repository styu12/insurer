export const VIEW_TYPES = {
  MONTH: 'month',
  YEAR: 'year',
} as const

export type ViewTypes = (typeof VIEW_TYPES)[keyof typeof VIEW_TYPES]

export const EVENT_TYPES = {
  CONTRACT_START: {
    id: 'CONTRACT_START',
    label: '계약 시작',
  },
  CLAIM_START: {
    id: 'CLAIM_START',
    label: '청구 시작',
  },
  CONTRACT_END: {
    id: 'CONTRACT_END',
    label: '계약 종료',
  },
} as const

export type EventTypes = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES]
