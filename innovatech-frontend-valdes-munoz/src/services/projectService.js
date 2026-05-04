import axios from 'axios'

const client = axios.create({ baseURL: '/api/projects', timeout: 10000 })

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('innovatech_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function getProjects() {
  const { data } = await client.get('/')
  return data
}

export async function createProject(project) {
  const { data } = await client.post('/', project)
  return data
}

// ESTA FUNCIÓN ES LA QUE SUELE DAR ERROR SI FALTA
export async function deleteProject(id) {
  await client.delete(`/${id}`)
}

// ESTA FUNCIÓN ES PARA EL BOTÓN DE EDITAR ESTADO
export async function updateProjectStatus(id, status) {
  const { data } = await client.patch(`/${id}/status`, { status })
  return data
}