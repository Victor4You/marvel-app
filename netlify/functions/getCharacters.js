// netlify/functions/getCharacters.js

import crypto from 'crypto'
import fetch from 'node-fetch'

export async function handler(event) {
  // 1. Extrae limit y offset de la query
  const { limit = '20', offset = '0' } = event.queryStringParameters || {}

  // 2. Genera ts y hash MD5 de ts + PRIVATE + PUBLIC
  const ts = Date.now().toString()
  const pub = process.env.MARVEL_PUBLIC_KEY
  const priv = process.env.MARVEL_PRIVATE_KEY
  const hash = crypto
    .createHash('md5')
    .update(ts + priv + pub)
    .digest('hex')

  // 3. Construye la URL con todos los params
  const url = `https://gateway.marvel.com/v1/public/characters` +
    `?ts=${ts}` +
    `&apikey=${pub}` +
    `&hash=${hash}` +
    `&limit=${limit}` +
    `&offset=${offset}`

  // 4. Llama a Marvel y parsea JSON
  const apiRes = await fetch(url)
  const json  = await apiRes.json()

  if (!apiRes.ok) {
    return {
      statusCode: apiRes.status,
      body: JSON.stringify(json)
    }
  }

  // 5. Devuelve sólo los resultados
  return {
    statusCode: 200,
    body: JSON.stringify(json.data.results),
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}
