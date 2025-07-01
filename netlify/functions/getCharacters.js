// netlify/functions/getCharacters.js
import axios from 'axios'
import md5   from 'blueimp-md5'

const PUB  = process.env.MARVEL_PUBLIC_KEY
const PRIV = process.env.MARVEL_PRIVATE_KEY

export async function handler(event) {
  const { limit = 20, offset = 0 } = event.queryStringParameters || {}
  const ts   = Date.now().toString()
  const hash = md5(ts + PRIV + PUB)

  try {
    const { data } = await axios.get(
      'https://gateway.marvel.com/v1/public/characters',
      { params: { ts, apikey: PUB, hash, limit, offset } }
    )
    return { statusCode: 200, body: JSON.stringify(data.data) }
  } catch (err) {
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify(err.response?.data || { message: err.message })
    }
  }
}
