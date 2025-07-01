// netlify/functions/getCharacters.js

const crypto = require('crypto')

// handler en CommonJS
exports.handler = async function(event, context) {
  const { limit = '20', offset = '0' } = event.queryStringParameters || {}

  const ts   = Date.now().toString()
  const pub  = process.env.MARVEL_PUBLIC_KEY
  const priv = process.env.MARVEL_PRIVATE_KEY

  // debug de bordes invisibles
  console.log(`PUB [${pub}] (len=${pub?.length})`)
  console.log(`PRIV[${priv}] (len=${priv?.length})`)

  const hash = crypto
    .createHash('md5')
    .update(ts + priv + pub)
    .digest('hex')

  console.log('hash →', hash)

  const url = `https://gateway.marvel.com/v1/public/characters` +
    `?ts=${ts}` +
    `&apikey=${pub}` +
    `&hash=${hash}` +
    `&limit=${limit}` +
    `&offset=${offset}`

  try {
    // fetch global de Node 18+
    const apiRes = await fetch(url)
    const json   = await apiRes.json()

    if (!apiRes.ok) {
      return {
        statusCode: apiRes.status,
        body: JSON.stringify(json),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(json.data.results),
    }
  } catch (err) {
    console.error('Fetch error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    }
  }
}
