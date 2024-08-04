import { authPaths } from '../../auth/path.config'
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
  ...authPaths,
} as const

export const navigationPaths = {
  ...homeNavigationPaths,
  ...contractNavigationPaths,
  ...customerNavigationPaths,
} as const

type HasPath = { path: string }
type PathKeys<T> = keyof T
type ExtractPathParams<Path> =
  Path extends `${string}/:${infer Param}/${infer Rest}`
    ? Param | ExtractPathParams<`/${Rest}`>
    : Path extends `${string}/:${infer Param}`
      ? Param
      : never

export type PathParams<
  T extends Record<string, HasPath>,
  K extends PathKeys<T>,
> = ExtractPathParams<T[K]['path']>
