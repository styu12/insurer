import axios from 'axios'

export const isLocalDevMode = import.meta.env.VITE_STAGE === 'development'
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

export function makeBaseUrl() {
  if (isLocalDevMode) {
    return `http://localhost:${SERVER_PORT ?? 3000}`
  }

  return 'http://localhost:3000'
}

// export const useRemoteWithAuth = () => {
//   const { user } = useOidcAuth()
//
//   return axios.create({
//     baseURL: makeBaseUrl(),
//     headers: {
//       Authorization: `Bearer ${user?.access_token}`,
//     },
//   })
// }

export const createRemote = () => {
  return axios.create({
    baseURL: makeBaseUrl(),
    withCredentials: true,
  })
}
