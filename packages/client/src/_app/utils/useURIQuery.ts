import { useLocation } from 'react-router-dom'
import qs from 'qs'

export function useUriQueries<T>() {
  const location = useLocation()
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })

  return queries as Partial<T>
}
