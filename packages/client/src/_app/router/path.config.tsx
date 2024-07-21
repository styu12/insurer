import { homeNavigationPaths, homePaths } from '../../home/path.config'
import {
  templateNavigationPaths,
  templatePaths,
} from '../../template/path.config'


export const routePaths = {
  ...homePaths,
  ...templatePaths,
} as const

export const navigationPaths = {
  ...homeNavigationPaths,
  ...templateNavigationPaths,
}
