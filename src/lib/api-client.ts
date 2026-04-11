import axios, { type AxiosError } from 'axios'
import { getCookie } from './cookies'

const ACCESS_TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN || 'akses_token'
const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'FE Project',
  },
})

function getAuthToken(): string | null {
  const tokenCookie = getCookie(ACCESS_TOKEN)

  if (tokenCookie === undefined) {
    handleLogout()
    return null
  }

  if (tokenCookie && tokenCookie !== 'undefined') {
    try {
      const token = JSON.parse(tokenCookie)
      return token
    } catch {
      handleLogout()
      return null
    }
  }

  handleLogout()
  return null
}

async function handleLogout() {
  try {
    const { useAuthStore } = await import('@/stores/auth-store')
    useAuthStore.getState().auth.reset()
  } catch {
    // Silent fail - user will be redirected on next navigation
  }
}

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { auth, setErrorAuthMessage } =
      await import('@/stores/auth-store').then((m) => m.useAuthStore.getState())

    if (error.response?.status === 401 || error.response?.status === 403) {
      setErrorAuthMessage(error.response?.data?.message || 'Autentikasi Error')
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      auth.refreshToken
    ) {
      originalRequest._retry = true

      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken: auth.refreshToken,
        })

        const { accessToken: accessToken, refreshToken: refreshToken } =
          response.data.data

        auth.setTokens(accessToken, refreshToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return apiClient(originalRequest)
      } catch (refreshError) {
        const err = refreshError as AxiosError<{ message?: string }>

        auth.reset()
        setErrorAuthMessage(err.response?.data?.message || 'Autentikasi Error')

        return Promise.reject(refreshError)
      }
    }

    if (error.response?.status === 401) {
      setErrorAuthMessage(error.response?.data?.message || 'Autentikasi Error')
      auth.reset()
    }

    return Promise.reject(error)
  },
)

export default apiClient
