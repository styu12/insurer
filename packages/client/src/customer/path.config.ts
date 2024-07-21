import { HomeIcon } from '@heroicons/react/24/outline'
import { LazyLoadRetryOnce } from '../_app/components/lazyload/LazyLoad'
import { createNavigationPath } from '../_app/router/createNavigationPath'

export const customerPaths = {
  customer: {
    id: 'customer',
    path: '/customer',
    element: LazyLoadRetryOnce(() => import('./pages/PageCustomerList')),
  },
  'customer-edit': {
    id: 'customer',
    path: '/customer/edit',
    element: LazyLoadRetryOnce(() => import('./pages/PageCustomerEdit')),
  },
} as const

export const customerNavigationPaths = createNavigationPath({
  id: customerPaths.customer.id,
  label: '고객관리',
  path: customerPaths.customer.path,
  icon: HomeIcon,
})
