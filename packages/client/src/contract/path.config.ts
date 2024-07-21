import { HomeIcon } from '@heroicons/react/24/outline'
import { LazyLoadRetryOnce } from '../_app/components/lazyload/LazyLoad'
import { createNavigationPath } from '../_app/router/createNavigationPath'

export const contractPaths = {
  constract: {
    id: 'contract',
    path: '/contract',
    element: LazyLoadRetryOnce(() => import('./pages/PageContractList')),
  },
  "constract-edit": {
    id: 'contract',
    path: '/contract/edit',
    element: LazyLoadRetryOnce(() => import('./pages/PageContractEdit')),
  },
} as const

export const contractNavigationPaths = createNavigationPath({
  id: contractPaths.constract.id,
  label: '계약관리',
  path: contractPaths.constract.path,
  icon: HomeIcon,
})
