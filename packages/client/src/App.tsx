import AppLayout from './_app/components/layout/AppLayout'
import MainLayout from './_app/components/layout/MainLayout'
import Sidebar from './_app/components/side-bar/Sidebar'
const App = () => {
  return (
    <AppLayout>
      <Sidebar />
      <MainLayout>hello-world</MainLayout>
    </AppLayout>
  )
}

export default App
