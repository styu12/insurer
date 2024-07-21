import { HomeIcon } from '@heroicons/react/24/outline'
import { LazyLoadRetryOnce } from '../_app/components/lazyload/LazyLoad'
import { createNavigationPath } from '../_app/router/createNavigationPath'
import { PathParams } from '../_app/router/path.config'

export const customerPaths = {
  customer: {
    id: 'customer',
    path: '/customer',
    element: LazyLoadRetryOnce(() => import('./pages/PageCustomerList')),
  },
  'customer-create': {
    id: 'customer-create',
    path: '/customer/create',
    element: LazyLoadRetryOnce(() => import('./pages/PageCustomerEdit')),
  },
  'customer-edit': {
    id: 'customer-edit',
    path: '/customer/edit/:customerId',
    element: LazyLoadRetryOnce(() => import('./pages/PageCustomerEdit')),
  },
} as const

export const customerNavigationPaths = createNavigationPath({
  id: customerPaths.customer.id,
  label: '고객관리',
  path: customerPaths.customer.path,
  icon: HomeIcon,
})

export type CustomerEditPathParamsType = PathParams<
  typeof customerPaths,
  'customer-edit'
>
