import axios from 'axios'

// Apunta al proxy configurado en Vite
const api = axios.create({ baseURL: '/api' })

export async function getCharacters(limit = 20, offset = 0) {
  const response = await api.get('/characters', { params: { limit, offset } })
  return response.data.results
}

export async function getCharacterById(id) {
  const response = await api.get(`/characters/${id}`)
  return response.data
}