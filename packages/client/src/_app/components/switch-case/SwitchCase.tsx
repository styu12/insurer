import type { ReactNode } from 'react'

interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, ReactNode | null>>
  value: Case
  defaultComponent?: ReactNode | null
}

const SwitchCase = <Case extends string | number>({
  value,
  caseBy,
  defaultComponent = null,
}: Props<Case>) => {
  if (!value) {
    return <>{defaultComponent}</>
  }

  return <>{caseBy[value] ?? defaultComponent}</>
}

export default SwitchCase
