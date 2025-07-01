// src/api/marvel.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/.netlify/functions'
})

// Listado de personajes
export function getCharacters(limit, offset) {
  return api
    .get('/getCharacters', { params: { limit, offset } })
    .then(res => res.data.results)
}

// Detalle de personaje por ID
export function getCharacterById(id) {
  return api
    .get('/getCharacterById', { params: { id } })
    .then(res => res.data)
}
