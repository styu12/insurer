import { HomeIcon } from '@heroicons/react/24/outline'
import { LazyLoadRetryOnce } from '../_app/components/lazyload/LazyLoad'
import { createNavigationPath } from '../_app/router/createNavigationPath'

export const homePaths = {
  home: {
    id: 'home',
    path: '/',
    element: LazyLoadRetryOnce(() => import('./pages/PageHome')),
  },
} as const

export const homeNavigationPaths = createNavigationPath({
  id: homePaths.home.id,
  label: '대시보드',
  path: homePaths.home.path,
  icon: HomeIcon,
})
