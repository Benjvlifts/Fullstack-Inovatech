import axios from 'axios'

const client = axios.create({ baseURL: '/api/auth', timeout: 10000 })

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('innovatech_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

function parseError(err) {
  if (err.response) return { message: err.response.data?.message ?? 'Error del servidor', status: err.response.status }
  return { message: 'No se pudo conectar con el servidor', status: 0 }
}

export async function login(credentials) {
  try {
    const { data } = await client.post('/login', credentials)
    return data
  } catch (e) { throw parseError(e) }
}

export async function register(userData) {
  try {
    const { data } = await client.post('/register', userData)
    return data
  } catch (e) { throw parseError(e) }
}