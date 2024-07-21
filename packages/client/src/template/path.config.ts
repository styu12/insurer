import { FolderIcon } from '@heroicons/react/24/outline'
import { LazyLoadRetryOnce } from '../_app/components/lazyload/LazyLoad'
import { createNavigationPath } from '../_app/router/createNavigationPath'

export const templatePaths = {
  test: {
    id: 'test',
    path: '/test',
    element: LazyLoadRetryOnce(() => import('./pages/PageTemplate')),
  },
} as const

export const templateNavigationPaths = createNavigationPath({
  id: templatePaths.test.id,
  label: 'Test-Page',
  path: templatePaths.test.path,
  icon: FolderIcon,
})
