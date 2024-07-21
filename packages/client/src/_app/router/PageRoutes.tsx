import { Navigate, Route, Routes } from 'react-router-dom'
import { routePaths } from './path.config'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import PageErrorFallback from '../../_error/components/PageErrorFallback'

const PageRoutes = () => {
  return (
    <Routes>
      {Object.values(routePaths).map((route) => {
        const PageComponent = route.element
        return (
          <Route
            path={route.path}
            element={
              <ErrorBoundary fallback={<PageErrorFallback />}>
                <Suspense>
                  <PageComponent />
                </Suspense>
              </ErrorBoundary>
            }
          />
        )
      })}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default PageRoutes
