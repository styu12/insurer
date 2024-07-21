// index.ts
export const VIEWS = {
  // DAY: 'day', 현재 상황으로는 Day View 필요하지 않을 듯.
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type View = typeof VIEWS[keyof typeof VIEWS];
