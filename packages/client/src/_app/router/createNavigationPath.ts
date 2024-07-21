import type { HeroIconType } from '../types'

export type NavigationValueType = {
  id: string
  label: string
  path: string
  icon: HeroIconType
}
export type NavigationPathType = {
  [key: string]: NavigationValueType
}
export const createNavigationPath = ({
  id,
  label,
  path,
  icon,
}: NavigationValueType): NavigationPathType => {
  return {
    [id]: {
      id,
      label,
      path,
      icon,
    },
  }
}
