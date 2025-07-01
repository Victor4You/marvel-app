// src/api/marvel.js
import axios from 'axios'
const api = axios.create({ baseURL: '/.netlify/functions' })

export function getCharacters(limit, offset) {
  return api
    .get('/getCharacters', { params: { limit, offset } })
    .then(res => res.data.results)
}
