import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from './_app/components/layout/AppLayout'
import MainLayout from './_app/components/layout/MainLayout'
import Sidebar from './_app/components/side-bar/Sidebar'
import GlobalErrorFallback from './_error/components/GlobalErrorFallback'
import Calendar from './calendar/components/Calendar'

const App = () => {
  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>
      <AppLayout>
        <Sidebar />
        <MainLayout>
          <Calendar />
        </MainLayout>
      </AppLayout>
    </ErrorBoundary>
  )
}

export default App
