import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { LazyLoadRetryOnce } from '../_app/components/lazyload/LazyLoad'
import { createNavigationPath } from '../_app/router/createNavigationPath'
import { PathParams } from '../_app/router/path.config'

export const contractPaths = {
  constract: {
    id: 'contract',
    path: '/contract',
    element: LazyLoadRetryOnce(() => import('./pages/PageContractList')),
  },
  'constract-create': {
    id: 'contract-create',
    path: '/contract/create',
    element: LazyLoadRetryOnce(() => import('./pages/PageContractCreate')),
  },
  'constract-edit': {
    id: 'contract-edit',
    path: '/contract/edit/:contractId',
    element: LazyLoadRetryOnce(() => import('./pages/PageContractEdit')),
  },
} as const

export const contractNavigationPaths = createNavigationPath({
  id: contractPaths.constract.id,
  label: '계약관리',
  path: contractPaths.constract.path,
  icon: CalendarDaysIcon,
})
export type ContractEditPathParamsType = PathParams<
  typeof contractPaths,
  'constract-edit'
>
