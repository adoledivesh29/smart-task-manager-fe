import axios from 'axios'
import { getCookie, removeAllCookies } from './Utils/helper'
import paths from './Routes/paths'

const getBaseURL = () => {
  return (
    import.meta.env.VITE_API_ENDPOINT ||
    import.meta.env.VITE_API_ENDPOINT_DEV ||
    import.meta.env.VITE_API_ENDPOINT_STAGING ||
    ''
  )
}

const Axios = axios.create({
  baseURL: getBaseURL(),
  timeout: 40000, // default its 30 seconds
})

Axios.interceptors.request.use(
  (req) => {
    const token = getCookie(import.meta.env.VITE_TOKEN_KEY)
    if (!req.headers.Authorization && token) {
      req.headers.Authorization = token
      return req
    }
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)
Axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if ((err?.response && err?.response?.status === 417) || err?.response?.status === 401) {
      removeAllCookies()
      window.location.href = paths.public.auth.login
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

export default Axios
