import type { NavigationValueType } from '../../router/createNavigationPath'
import { COMPANY_META } from '../../constants/meta'
import { USER_PROFILE } from '../../constants/mock'
import { Container } from '../container/Container'
import SiderbarNavLink from './SiderbarNavLink'

interface SidebarStaticProps {
  navigation: NavigationValueType[]
  currentPath: string
}
const SidebarStatic = (props: SidebarStaticProps) => {
  return (
    <>
      <Container className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Container className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <Container className="flex h-16 shrink-0 items-center">
            <img
              alt={COMPANY_META.NAME}
              src={COMPANY_META.LOGO_URL}
              className="h-8 w-auto"
            />
          </Container>
          <Container as="nav" className="flex-1 flex flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {props.navigation.map((item) => (
                    <li key={item.label}>
                      <SiderbarNavLink
                        to={item.path}
                        icon={item.icon}
                        current={props.currentPath === item.path}
                      >
                        {item.label}
                      </SiderbarNavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <img
                    alt=""
                    src={USER_PROFILE.IMAGE_URL}
                    className="h-8 w-8 rounded-full bg-gray-50"
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{USER_PROFILE.NAME}</span>
                </a>
              </li>
            </ul>
          </Container>
        </Container>
      </Container>

      {/* Sidebar component, swap this element with another sidebar if you like */}
    </>
  )
}
export default SidebarStatic
