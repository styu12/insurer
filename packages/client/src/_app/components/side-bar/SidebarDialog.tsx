import { useCallback, useMemo, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import type { NavigationValueType } from '../../router/createNavigationPath'
import { COMPANY_META } from '../../constants/meta'
import { USER_PROFILE } from '../../constants/mock'
import SiderbarNavLink from './SiderbarNavLink'
import { Container } from '../container/Container'

interface SidebarDialogProps {
  navigation: NavigationValueType[]
  currentPath: string
}

const SidebarDialog = (props: SidebarDialogProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentNavigation = useMemo(() => {
    const currentNav = props.navigation.filter((item) => {
      return item.path === props.currentPath
    })
    if (currentNav.length > 0) {
      return currentNav[0]
    }
  }, [props.navigation, props.currentPath])

  const currnetNavigationLabel = useMemo(() => {
    return currentNavigation?.label ?? ''
  }, [currentNavigation])

  const onCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const onOpenSidebar = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  return (
    <>
      <Container className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
        <Container className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          {currnetNavigationLabel}
        </Container>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            alt=""
            src={USER_PROFILE.IMAGE_URL}
            className="h-8 w-8 rounded-full bg-gray-50"
          />
        </a>
      </Container>

      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <Container className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <Container className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={onCloseSidebar}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </Container>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <Container className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <Container className="flex h-16 shrink-0 items-center">
                <img
                  alt={COMPANY_META.NAME}
                  src={COMPANY_META.LOGO_URL}
                  className="h-8 w-auto"
                />
              </Container>
              <Container as='nav' className="flex flex-1 flex-col">
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
                </ul>
              </Container>
            </Container>
          </DialogPanel>
        </Container>
      </Dialog>
    </>
  )
}
export default SidebarDialog
