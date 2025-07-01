// netlify/functions/getCharacters.js
const crypto = require('crypto')
const axios  = require('axios')

exports.handler = async function(event) {
  // 1) Extrae limit y offset de la query
  const { limit = '20', offset = '0' } = event.queryStringParameters || {}

  // 2) Declara ts, pub y priv
  const ts   = Date.now().toString()
  const pub  = process.env.MARVEL_PUBLIC_KEY
  const priv = process.env.MARVEL_PRIVATE_KEY

  // 3) Debug (opcional)
  console.log(`PUB [${pub}] (len=${pub?.length})`)
  console.log(`PRIV[${priv}] (len=${priv?.length})`)

  // 4) Genera hash MD5
  const hash = crypto.createHash('md5')
                     .update(ts + priv + pub)
                     .digest('hex')
  console.log('hash →', hash)

  // 5) Construye la URL
  const url = `https://gateway.marvel.com/v1/public/characters` +
              `?ts=${ts}` +
              `&apikey=${pub}` +
              `&hash=${hash}` +
              `&limit=${limit}` +
              `&offset=${offset}`

  try {
    // 6) Llama a Marvel con axios
    const response = await axios.get(url)
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(response.data.data.results),
    }
  } catch (err) {
    console.error('API error:', err.response?.data || err.message)
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify(err.response?.data || { message: err.message }),
    }
  }
}
