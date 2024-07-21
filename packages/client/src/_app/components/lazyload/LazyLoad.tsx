import to from 'await-to-js'
import type { ComponentType } from 'react'
import { lazy } from 'react'
import { LOCAL_STORAGE_REFRESH_CHUNK_LOAD_FAILED_FLAG_KEY } from '../../constants/storage'

export const LazyLoadRetryOnce = <T extends ComponentType>(
  componentImport: () => Promise<{ default: T }>
) => {
  const loadComponent = async () => {
    const pageAlreadyRefreshed =
      localStorage.getItem(LOCAL_STORAGE_REFRESH_CHUNK_LOAD_FAILED_FLAG_KEY) ??
      'false'

    const [error, component] = await to(componentImport())
    localStorage.setItem(
      LOCAL_STORAGE_REFRESH_CHUNK_LOAD_FAILED_FLAG_KEY,
      'false'
    )

    if (!component || error) {
      if (pageAlreadyRefreshed === 'false') {
        localStorage.setItem(
          LOCAL_STORAGE_REFRESH_CHUNK_LOAD_FAILED_FLAG_KEY,
          'true'
        )
        window.location.reload()
      }
      throw error
    }

    return component
  }

  return lazy(loadComponent)
}
