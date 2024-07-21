import { LazyLoadRetryOnce } from '../components/lazyload/LazyLoad'

export const routes = [
  {
    path: '/',
    element: LazyLoadRetryOnce(() => import('../../home/pages/PageHome')),
  },
]
