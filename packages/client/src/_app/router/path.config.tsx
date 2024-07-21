import {
  contractNavigationPaths,
  contractPaths,
} from '../../contract/path.config'
import {
  customerNavigationPaths,
  customerPaths,
} from '../../customer/path.config'
import { homeNavigationPaths, homePaths } from '../../home/path.config'

export const routePaths = {
  ...homePaths,
  ...contractPaths,
  ...customerPaths,
} as const

export const navigationPaths = {
  ...homeNavigationPaths,
  ...contractNavigationPaths,
  ...customerNavigationPaths,
} as const
