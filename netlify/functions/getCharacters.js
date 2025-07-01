import axios from 'axios'
import md5   from 'blueimp-md5'

export async function handler(event) {
  try {
    const { limit = 20, offset = 0 } = event.queryStringParameters || {}
    const ts   = Date.now().toString()
    const PUB  = process.env.MARVEL_PUBLIC_KEY
    const PRIV = process.env.MARVEL_PRIVATE_KEY
    if (!PUB || !PRIV) throw new Error('Missing API keys')

    const hash = md5(ts + PRIV + PUB)
    const { data } = await axios.get(
      'https://gateway.marvel.com/v1/public/characters',
      { params: { ts, apikey: PUB, hash, limit, offset } }
    )

    return {
      statusCode: 200,
      body: JSON.stringify(data.data)
    }
  } catch (err) {
    console.error('Function error:', err)
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({ message: err.message })
    }
  }
}
