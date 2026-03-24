import router from '@/router'
import type { User } from './models'

const url = import.meta.env.VITE_BACKEND_URL
const apiUrl = `${url}/api`
const tokenKey = 'accessToken'
const bearerToken = () => `Bearer ${getAccessToken()}`

async function request<T>(
  path: string,
  method: string = 'GET',
  body: object = {},
  authorize: boolean = true,
): Promise<T> {
  path = path.startsWith('/') ? path : `/${path}`

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const options: RequestInit = {
    headers,
    method,
  }

  if (authorize && options.headers) {
    headers.append('Authorization', bearerToken())
  }

  if (method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  const res = await fetch(`${apiUrl}${path}`, options)

  if (res.status === 200) return res.json() as Promise<T>
  else if (res.status === 401) throw new Error(`UNAUTHORIZED ${path}`)
  else if (res.status === 404) throw new Error(`NOTFOUND ${path}`)
  else throw new Error(`ERROR ${path}`)
}

export interface LoginResponse {
  token: string
}

export async function login(facebookAccessToken: string) {
  const response = await request<LoginResponse>('auth/login', 'POST', {
    facebookAccessToken,
  })

  setAccessToken(response.token)

  router.push({ name: 'home' })
}

export async function logout() {
  removeAccessToken()

  router.push({ name: 'home' })
}

export async function currentUser() {
  return request<User>('/user')
}

function setAccessToken(accessToken: string) {
  localStorage.setItem(tokenKey, accessToken)
}

function getAccessToken() {
  return localStorage.getItem(tokenKey)
}

function removeAccessToken() {
  localStorage.removeItem(tokenKey)
}
