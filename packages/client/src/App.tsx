import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from './_app/components/layout/AppLayout'
import MainLayout from './_app/components/layout/MainLayout'
import Sidebar from './_app/components/side-bar/Sidebar'
import GlobalErrorFallback from './_error/components/GlobalErrorFallback'
import PageRoutes from './_app/router/PageRoutes'

const App = () => {
  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>
      <BrowserRouter>
        <AppLayout>
          <Sidebar />
          <MainLayout>
            <PageRoutes />
          </MainLayout>
        </AppLayout>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
