// src/api/marvel.js
import axios from 'axios'
const api = axios.create({ baseURL: '/.netlify/functions' })

export function getCharacters(limit, offset) {
  return api
    .get('/getCharacters', { params: { limit, offset } })
    .then(res => res.data.results)
}

// --- AÑADE ESTO: ---
export function getCharacterById(id) {
  return api
    .get('/getCharacterById', { params: { id } })
    .then(res => res.data)        // o res.data.results[0] si devuelves el array completo
}
