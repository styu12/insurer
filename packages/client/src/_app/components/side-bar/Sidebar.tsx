import { useMemo } from 'react'
import SidebarDialog from './SidebarDialog'
import SidebarStatic from './SidebarStatic'
import { navigationPaths } from '../../router/path.config'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const navigation = useMemo(() => {
    return Object.values(navigationPaths)
  }, [])

  const currentPath = useMemo(() => {
    return location.pathname
  }, [location])

  return (
    <>
      <SidebarStatic navigation={navigation} currentPath={currentPath} />
      <SidebarDialog navigation={navigation} currentPath={currentPath} />
    </>
  )
}

export default Sidebar
